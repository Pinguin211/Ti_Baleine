/**
 * Adaptateur PostgreSQL de facturation (table `paiements`). SPEC-FAC-02 —
 * alimente `actions/emettre-facture-acompte-apres-paiement.ts` et
 * `actions/emettre-facture-solde-apres-paiement.ts` (non modifiés) depuis
 * les pages `reservation/page.tsx` et `admin/reservations/detail/page.tsx`.
 * Remplace `services/server/demo/demo-ports-facturation.ts`.
 *
 * L'envoi du courriel reste simulé (journalisé) : aucun SMTP n'est configuré
 * dans ce périmètre (hors périmètre : intégration `nodemailer` réelle). Le
 * statut d'idempotence (`depotEmission.obtenirStatutEmission`) est lu
 * *synchronement* par `verifierIdempotenceEmissionFacture` — il est donc
 * pré-chargé avant l'appel du service pur ; `enregistrerStatutEmission`
 * capture l'intention et `persister()` l'écrit réellement en base.
 */
import 'server-only';
import { and, eq } from 'drizzle-orm';
import { db, schema } from '../../../lib/server/db/client';
import { depuisDateSql, depuisHeureSql } from '../../../lib/server/db/format';
import { convertirEnHorodatageDepart, PORT_LABELS, ACTIVITE_LABELS } from '../../../utils/slot-rules';
import { calculerRecapitulatifTarifaire } from '../../../utils/pricing-rules';
import { MAJORATION_INDIVIDUELLE_PAR_PORT } from '../../../config/pricing.constants';
import type { TypeFacture } from '../../../schemas/types/facturation-ports.types';

type LigneReservation = typeof schema.reservations.$inferSelect;
type LigneCreneau = typeof schema.creneaux.$inferSelect;
type LigneClient = typeof schema.users.$inferSelect;
type LigneBillet = typeof schema.billets.$inferSelect;
type LignePaiement = typeof schema.paiements.$inferSelect;

/**
 * Convertit une réservation persistée + son créneau en `ReservationFacturable` (SPEC-FAC-02).
 * Porte aussi `nombreEnfants`/`tarifUnitaireEnfant`, consommés par les
 * générateurs de PDF (`ReservationFacturableEtendue`) au-delà du strict
 * contrat de `ReservationFacturable` — non annoté explicitement pour ne pas
 * déclencher la vérification stricte des propriétés excédentaires.
 */
export function versReservationFacturable(
  reservation: LigneReservation,
  creneau: LigneCreneau,
  client: LigneClient,
  billets: LigneBillet[],
) {
  const nombreAdultes = billets.filter((billet) => billet.type_billet === 'ADULTE').length;
  const nombreEnfants = billets.filter((billet) => billet.type_billet === 'ENFANT').length;
  const activite = (creneau.activite ?? 'BALEINES') as keyof typeof ACTIVITE_LABELS;
  const recap = calculerRecapitulatifTarifaire(
    billets.map((billet) => ({ typeBillet: billet.type_billet as 'ADULTE' | 'ENFANT' | 'PRIVATISATION' })),
    { port: creneau.port as 'SAINT_GILLES' | 'SAINT_LEU', activite: activite as 'BALEINES' | 'DAUPHINS' },
  );

  return {
    id: reservation.reference,
    prestation: ACTIVITE_LABELS[activite] ?? 'Sortie Baleines',
    dateDepart: convertirEnHorodatageDepart(depuisDateSql(creneau.date), depuisHeureSql(creneau.heure_depart)),
    portEmbarquement: PORT_LABELS[creneau.port as 'SAINT_GILLES' | 'SAINT_LEU'],
    nombreAdultes,
    nombreEnfants,
    tarifUnitaireAdulte: recap.tarifUnitaireAdulte,
    tarifUnitaireEnfant: recap.tarifUnitaireEnfant,
    majorationGeographiqueParPersonne: MAJORATION_INDIVIDUELLE_PAR_PORT[creneau.port as 'SAINT_GILLES' | 'SAINT_LEU'],
    emailClient: client.email,
  };
}

export function versPaiementAcompteValide(paiements: LignePaiement[]) {
  const acompte = paiements.find((paiement) => paiement.type_paiement === 'ACOMPTE');
  return { montantRegle: acompte ? Number(acompte.montant) : 0, statut: 'validé avec succès' as const };
}

export function versPaiementSoldeValide(paiements: LignePaiement[]) {
  const solde = paiements.find((paiement) => paiement.type_paiement === 'SOLDE');
  return { montantRegle: solde ? Number(solde.montant) : 0, statut: 'validé avec succès' as const };
}

function versStatutDb(statutDomaine: string): 'ENVOYEE_SUCCES' | 'ECHEC_ENVOI' {
  return statutDomaine === 'envoyée avec succès' ? 'ENVOYEE_SUCCES' : 'ECHEC_ENVOI';
}

type Intention = { typeFacture: TypeFacture; statut: string; horodatage: Date };

async function chargerStatutsExistants(reservationId: string): Promise<Map<TypeFacture, string>> {
  const paiements = await db
    .select({ type: schema.paiements.type_paiement, statut: schema.paiements.statut_emission_facture })
    .from(schema.paiements)
    .where(eq(schema.paiements.reservation_id, reservationId));

  const statuts = new Map<TypeFacture, string>();
  for (const paiement of paiements) {
    if (paiement.type === 'ACOMPTE') statuts.set('acompte', paiement.statut);
    if (paiement.type === 'SOLDE') statuts.set('solde', paiement.statut);
  }
  return statuts;
}

function construireDepotEmission(statutsExistants: Map<TypeFacture, string>, intentions: Intention[]) {
  return {
    enregistrerStatutEmission: (entree: Intention) => {
      intentions.push(entree);
    },
    obtenirStatutEmission: (_reservationId: string, typeFacture: TypeFacture) => {
      const statut = statutsExistants.get(typeFacture);
      return statut === 'ENVOYEE_SUCCES' ? { statut: 'envoyée avec succès' as const } : undefined;
    },
  };
}

async function persisterIntentions(reservationId: string, intentions: Intention[]): Promise<void> {
  for (const intention of intentions) {
    const typePaiementDb = intention.typeFacture === 'acompte' ? 'ACOMPTE' : 'SOLDE';
    await db
      .update(schema.paiements)
      .set({ statut_emission_facture: versStatutDb(intention.statut), date_emission_facture: intention.horodatage })
      .where(and(eq(schema.paiements.reservation_id, reservationId), eq(schema.paiements.type_paiement, typePaiementDb)));
  }
}

/**
 * Ports de facturation scopés à une réservation : statut d'émission
 * pré-chargé (lecture synchrone requise par le service pur), écriture
 * différée via `persister()`.
 */
export async function construirePortsFacturationDb(reservationId: string) {
  const statutsExistants = await chargerStatutsExistants(reservationId);
  const intentions: Intention[] = [];

  const ports = {
    envoiCourriel: {
      envoyer: (message: { destinataire: string; pieceJointe: { nomFichier: string } }) => {
        console.log(`[facturation] courriel simulé → ${message.destinataire} (${message.pieceJointe.nomFichier})`);
      },
    },
    depotEmission: construireDepotEmission(statutsExistants, intentions),
    horloge: { maintenant: () => new Date() },
  };

  return {
    ports,
    persister: () => persisterIntentions(reservationId, intentions),
  };
}

/** Vrai si une facture (acompte ou solde) de cette réservation a déjà été émise avec succès. */
export async function factureDejaEmise(reservationId: string, typeFacture: TypeFacture): Promise<boolean> {
  const typePaiementDb = typeFacture === 'acompte' ? 'ACOMPTE' : 'SOLDE';
  const [paiement] = await db
    .select({ statut: schema.paiements.statut_emission_facture })
    .from(schema.paiements)
    .where(and(eq(schema.paiements.reservation_id, reservationId), eq(schema.paiements.type_paiement, typePaiementDb)))
    .limit(1);
  return paiement?.statut === 'ENVOYEE_SUCCES';
}
