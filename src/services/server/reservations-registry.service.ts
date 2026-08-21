import 'server-only';
import { eq, ilike, or } from 'drizzle-orm';
import { db } from '../../lib/server/db/client';
import { reservations, creneaux, users, billets, paiements } from '../../../drizzle/schema';
import { PORT_LABELS, ACTIVITE_LABELS } from '../../utils/slot-rules';
import { calculerRecapitulatifTarifaire } from '../../utils/pricing-rules';
import type { ReservationRegistreLigne } from '../../schemas/types/reservations-registre.types';

async function chargerBilletsEtPaiements(reservationId: string) {
  const [lignesBillets, lignesPaiements] = await Promise.all([
    db.select({ typeBillet: billets.type_billet }).from(billets).where(eq(billets.reservation_id, reservationId)),
    db
      .select({ typePaiement: paiements.type_paiement, montant: paiements.montant })
      .from(paiements)
      .where(eq(paiements.reservation_id, reservationId)),
  ]);
  return { lignesBillets, lignesPaiements };
}

function calculerMontants(
  lignesBillets: { typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION' }[],
  lignesPaiements: { typePaiement: 'ACOMPTE' | 'SOLDE'; montant: string }[],
  port: 'SAINT_GILLES' | 'SAINT_LEU',
  activite: 'BALEINES' | 'DAUPHINS' | 'PRIVATISATION_TIKAP' | 'PRIVATISATION_GRAND_BLEU'
) {
  const recapitulatif = calculerRecapitulatifTarifaire(lignesBillets, { port, activite });
  const montantAcompteVerse = lignesPaiements
    .filter((p) => p.typePaiement === 'ACOMPTE')
    .reduce((total, p) => total + Number(p.montant), 0);
  const montantSoldeVerse = lignesPaiements
    .filter((p) => p.typePaiement === 'SOLDE')
    .reduce((total, p) => total + Number(p.montant), 0);
  return {
    montantTotal: recapitulatif.montantTotal,
    montantAcompteVerse,
    soldeRestantDu: Math.max(0, recapitulatif.montantTotal - montantAcompteVerse - montantSoldeVerse),
  };
}

function chargerLignesBase(recherche?: string) {
  const filtre = recherche
    ? or(ilike(reservations.reference, `%${recherche}%`), ilike(users.email, `%${recherche}%`), ilike(users.nom, `%${recherche}%`))
    : undefined;

  return db
    .select({
      id: reservations.id,
      reference: reservations.reference,
      statut: reservations.statut,
      dateCreation: reservations.date_creation,
      clientNom: users.nom,
      clientPrenom: users.prenom,
      clientEmail: users.email,
      clientTelephone: users.telephone,
      port: creneaux.port,
      activite: creneaux.activite,
      dateDepart: creneaux.date,
      heureDepart: creneaux.heure_depart,
    })
    .from(reservations)
    .innerJoin(users, eq(users.id, reservations.user_id))
    .innerJoin(creneaux, eq(creneaux.id, reservations.creneau_id))
    .where(filtre);
}

type LigneBase = Awaited<ReturnType<typeof chargerLignesBase>>[number];

async function composerLigneRegistre(ligne: LigneBase): Promise<ReservationRegistreLigne> {
  const { lignesBillets, lignesPaiements } = await chargerBilletsEtPaiements(ligne.id);
  const montants = calculerMontants(lignesBillets, lignesPaiements, ligne.port, ligne.activite);
  return {
    reference: ligne.reference,
    statut: ligne.statut,
    dateCreation: ligne.dateCreation,
    clientNom: ligne.clientNom,
    clientPrenom: ligne.clientPrenom,
    clientEmail: ligne.clientEmail,
    clientTelephone: ligne.clientTelephone,
    port: PORT_LABELS[ligne.port],
    activite: ACTIVITE_LABELS[ligne.activite],
    dateDepart: new Date(ligne.dateDepart),
    heureDepart: ligne.heureDepart.slice(0, 5),
    adultesActifs: lignesBillets.filter((b) => b.typeBillet === 'ADULTE').length,
    enfantsActifs: lignesBillets.filter((b) => b.typeBillet === 'ENFANT').length,
    ...montants,
  };
}

/** Registre complet des réservations avec recherche libre (SPEC-ADMIN-02/03). */
export async function listerRegistreReservations(recherche?: string): Promise<ReservationRegistreLigne[]> {
  const lignes = await chargerLignesBase(recherche);
  return Promise.all(lignes.map(composerLigneRegistre));
}
