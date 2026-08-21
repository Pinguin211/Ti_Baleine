/**
 * Adaptateur PostgreSQL du parcours public de réservation (tables `users`,
 * `creneaux`, `reservations`, `billets`, `paiements`). SPEC-RESERVATION-03 —
 * alimente `actions/booking.action.ts` et `actions/booking-lookup.action.ts`.
 * Remplace `services/server/demo/demo-ports-booking.ts`. Le paiement reste
 * simulé : toujours accepté, aucune passerelle bancaire réelle sollicitée
 * (hors périmètre de cette mise en place de la persistance).
 *
 * `enregistrerReservationApresPaiementAcompte` (`booking.service.ts`) appelle
 * `ports.depot.enregistrer(...)` de façon synchrone, sans l'attendre : ce
 * port ne peut donc pas écrire en base lui-même. `enregistrer` capture
 * l'intention (closure), et `persister()` — appelé par l'action après la
 * décision du service pur — exécute l'écriture réelle dans une transaction.
 */
import 'server-only';
import { randomUUID } from 'node:crypto';
import { and, desc, eq, sql } from 'drizzle-orm';
import { db, schema } from '../../../lib/server/db/client';
import { versDateSql, versHeureSql, depuisHeureSql } from '../../../lib/server/db/format';
import type {
  CreneauSousAlerte,
  DepotReservations,
  PasserellePaiement,
  Reservation,
} from '../../../schemas/types/booking.types';

type Port = 'SAINT_GILLES' | 'SAINT_LEU';
type Activite = 'BALEINES' | 'DAUPHINS' | 'PRIVATISATION_TIKAP' | 'PRIVATISATION_GRAND_BLEU';

/** Places déjà réservées (billets actifs, hors réservations annulées) par heure de départ. */
export async function chargerPlacesReserveesParHeure(port: Port, date: Date): Promise<Map<string, number>> {
  const lignes = await db
    .select({ heureDepart: schema.creneaux.heure_depart, nombre: sql<number>`count(${schema.billets.id})` })
    .from(schema.creneaux)
    .leftJoin(
      schema.reservations,
      and(eq(schema.reservations.creneau_id, schema.creneaux.id), sql`${schema.reservations.statut} <> 'ANNULEE'`),
    )
    .leftJoin(schema.billets, eq(schema.billets.reservation_id, schema.reservations.id))
    .where(and(eq(schema.creneaux.port, port), eq(schema.creneaux.date, versDateSql(date))))
    .groupBy(schema.creneaux.heure_depart);

  const compteurs = new Map<string, number>();
  for (const ligne of lignes) {
    compteurs.set(depuisHeureSql(ligne.heureDepart), Number(ligne.nombre));
  }
  return compteurs;
}

/** Créneaux du jour placés sous pré-alerte météo, pour la mention d'avertissement public. */
export async function chargerCreneauxSousAlerte(port: Port, date: Date): Promise<CreneauSousAlerte[]> {
  const lignes = await db
    .select({ heureDepart: schema.creneaux.heure_depart, sousPreAlerte: schema.creneaux.sous_pre_alerte })
    .from(schema.creneaux)
    .where(and(eq(schema.creneaux.port, port), eq(schema.creneaux.date, versDateSql(date))));

  return lignes.map((ligne) => ({ heureDepart: depuisHeureSql(ligne.heureDepart), sousPreAlerte: ligne.sousPreAlerte }));
}

async function trouverOuCreerUtilisateur(client: Reservation['client']): Promise<string> {
  if (!client) throw new Error('Client requis pour enregistrer une réservation');
  const [existant] = await db.select({ id: schema.users.id }).from(schema.users).where(eq(schema.users.email, client.email)).limit(1);
  if (existant) return existant.id;

  const [cree] = await db
    .insert(schema.users)
    .values({
      nom: client.nom,
      prenom: client.prenom,
      email: client.email,
      telephone: client.telephone,
      role: 'CLIENT',
      mot_de_passe: null,
    })
    .returning({ id: schema.users.id });
  return cree.id;
}

async function trouverOuCreerCreneau(cible: {
  port: Port;
  date: Date;
  heureDepart: string;
  activite: Activite;
}): Promise<string> {
  const dateSql = versDateSql(cible.date);
  const heureSql = versHeureSql(cible.heureDepart);
  const [existant] = await db
    .select({ id: schema.creneaux.id })
    .from(schema.creneaux)
    .where(and(eq(schema.creneaux.port, cible.port), eq(schema.creneaux.date, dateSql), eq(schema.creneaux.heure_depart, heureSql)))
    .limit(1);
  if (existant) return existant.id;

  const [cree] = await db
    .insert(schema.creneaux)
    .values({ date: dateSql, heure_depart: heureSql, port: cible.port, activite: cible.activite, est_ouvert: true })
    .returning({ id: schema.creneaux.id });
  return cree.id;
}

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

async function insererLigneReservation(tx: Transaction, reservation: Reservation, creneauId: string, userId: string) {
  const [ligne] = await tx
    .insert(schema.reservations)
    .values({
      reference: reservation.reference,
      statut: reservation.statut,
      creneau_id: creneauId,
      user_id: userId,
      date_creation: reservation.dateCreation,
      montant_total: reservation.montantTotal.toFixed(2),
      montant_acompte: reservation.montantAcompte.toFixed(2),
    })
    .returning({ id: schema.reservations.id });
  return ligne.id;
}

/** Écrit la réservation confirmée (acompte débité) : client, créneau, billets et paiement d'acompte. */
async function persisterReservation(reservation: Reservation): Promise<void> {
  await db.transaction(async (tx) => {
    const userId = await trouverOuCreerUtilisateur(reservation.client);
    const creneauId = await trouverOuCreerCreneau({
      port: reservation.creneau.port,
      date: reservation.creneau.date,
      heureDepart: reservation.creneau.heureDepart,
      activite: reservation.creneau.activite,
    });
    const reservationId = await insererLigneReservation(tx, reservation, creneauId, userId);

    if (reservation.billets.length > 0) {
      await tx.insert(schema.billets).values(
        reservation.billets.map((billet) => ({ reservation_id: reservationId, type_billet: billet.typeBillet })),
      );
    }

    await tx.insert(schema.paiements).values({
      reservation_id: reservationId,
      type_paiement: 'ACOMPTE',
      canal_paiement: 'EN_LIGNE',
      reference_transaction: reservation.referenceTransactionAcompte ?? `TXN-${reservation.reference}-AC`,
      montant: reservation.montantAcompte.toFixed(2),
      date_paiement: reservation.dateCreation,
      reference_facture: `FAC-${reservation.reference}-AC`,
    });
  }, { isolationLevel: 'serializable' });
}

/** Port `depot` (`DepotReservations`) scopé à un port/date, avec écriture différée via `persister()`. */
export async function construireDepotReservationsPubliquesDb(
  port: Port,
  date: Date,
): Promise<DepotReservations & { persister(): Promise<void> }> {
  const compteurs = await chargerPlacesReserveesParHeure(port, date);
  let intention: Reservation | null = null;

  return {
    compterPlacesReservees: (heureDepart: string) => compteurs.get(heureDepart) ?? 0,
    enregistrer: (reservation: Reservation) => {
      intention = reservation;
    },
    async persister() {
      if (!intention) return;
      await persisterReservation(intention);
    },
  };
}

/** Passerelle de paiement simulée : accepte systématiquement le débit (hors périmètre : intégration bancaire réelle). */
export function construirePasserellePaiementSimuleeDb(): PasserellePaiement {
  return {
    debiter: (debit) => ({
      accepte: true,
      referenceTransaction: `TXN-${debit.referenceReservation}-${randomUUID().slice(0, 8)}`,
    }),
  };
}

/** Charge une réservation persistée par référence, avec son créneau, ses billets et ses paiements. */
export async function chargerReservationParReference(reference: string) {
  const [reservation] = await db
    .select()
    .from(schema.reservations)
    .where(eq(schema.reservations.reference, reference))
    .limit(1);
  if (!reservation) return null;

  const [creneau] = await db.select().from(schema.creneaux).where(eq(schema.creneaux.id, reservation.creneau_id)).limit(1);
  const [client] = await db.select().from(schema.users).where(eq(schema.users.id, reservation.user_id)).limit(1);
  const billets = await db.select().from(schema.billets).where(eq(schema.billets.reservation_id, reservation.id));
  const paiements = await db
    .select()
    .from(schema.paiements)
    .where(eq(schema.paiements.reservation_id, reservation.id))
    .orderBy(desc(schema.paiements.date_paiement));

  return { reservation, creneau, client, billets, paiements };
}
