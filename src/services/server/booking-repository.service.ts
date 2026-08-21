import 'server-only';
import { and, eq, ne } from 'drizzle-orm';
import { db } from '../../lib/server/db/client';
import { creneaux, reservations, users, billets, paiements } from '../../../drizzle/schema';
import { formaterDateSql } from '../../utils/formater-date-sql.util';
import type { Reservation } from '../../schemas/types/booking.types';

/** Convertit un horaire « 07h00 » (domaine public) en « 07:00 » (colonne SQL `time`). */
function versHeureSql(heureDepart: string): string {
  return heureDepart.replace('h', ':');
}

export async function compterPlacesReserveesPourCreneau(
  port: 'SAINT_GILLES' | 'SAINT_LEU',
  date: Date,
  heureDepart: string
): Promise<number> {
  const [creneau] = await db
    .select({ id: creneaux.id })
    .from(creneaux)
    .where(
      and(eq(creneaux.port, port), eq(creneaux.date, formaterDateSql(date)), eq(creneaux.heure_depart, versHeureSql(heureDepart)))
    )
    .limit(1);
  if (!creneau) return 0;

  const lignesBillets = await db
    .select({ id: billets.id })
    .from(billets)
    .innerJoin(reservations, eq(reservations.id, billets.reservation_id))
    .where(and(eq(reservations.creneau_id, creneau.id), ne(reservations.statut, 'ANNULEE')));
  return lignesBillets.length;
}

async function trouverOuCreerCreneau(
  port: 'SAINT_GILLES' | 'SAINT_LEU',
  date: Date,
  heureDepart: string,
  activite: 'BALEINES' | 'DAUPHINS' | 'PRIVATISATION_TIKAP' | 'PRIVATISATION_GRAND_BLEU'
): Promise<string> {
  const dateSql = formaterDateSql(date);
  const heureSql = versHeureSql(heureDepart);
  const [existant] = await db
    .select({ id: creneaux.id })
    .from(creneaux)
    .where(and(eq(creneaux.port, port), eq(creneaux.date, dateSql), eq(creneaux.heure_depart, heureSql)))
    .limit(1);
  if (existant) return existant.id;

  const activiteBase = activite.startsWith('PRIVATISATION') ? 'BALEINES' : activite;
  const [cree] = await db
    .insert(creneaux)
    .values({ port, date: dateSql, heure_depart: heureSql, activite: activiteBase })
    .returning({ id: creneaux.id });
  return cree.id;
}

async function trouverOuCreerUtilisateurInvite(client: NonNullable<Reservation['client']>): Promise<string> {
  const [existant] = await db.select({ id: users.id }).from(users).where(eq(users.email, client.email)).limit(1);
  if (existant) return existant.id;

  const [cree] = await db
    .insert(users)
    .values({ nom: client.nom, prenom: client.prenom, email: client.email, telephone: client.telephone, role: 'CLIENT' })
    .returning({ id: users.id });
  return cree.id;
}

/**
 * Persiste une réservation confirmée (acompte accepté) : trouve ou crée le
 * créneau et l'utilisateur invité, insère la réservation, ses billets et le
 * paiement d'acompte.
 */
export async function enregistrerReservationReelle(reservation: Reservation, referenceTransaction: string): Promise<void> {
  if (!reservation.client) {
    throw new Error('Client requis pour enregistrer la réservation');
  }

  const [creneauId, userId] = await Promise.all([
    trouverOuCreerCreneau(reservation.creneau.port, reservation.creneau.date, reservation.creneau.heureDepart, reservation.creneau.activite),
    trouverOuCreerUtilisateurInvite(reservation.client),
  ]);

  const [ligneReservation] = await db
    .insert(reservations)
    .values({ reference: reservation.reference, statut: 'PAYEE_PARTIELLEMENT', creneau_id: creneauId, user_id: userId })
    .returning({ id: reservations.id });

  await db.insert(billets).values(reservation.billets.map((b) => ({ reservation_id: ligneReservation.id, type_billet: b.typeBillet })));

  await db.insert(paiements).values({
    reservation_id: ligneReservation.id,
    type_paiement: 'ACOMPTE',
    canal_paiement: 'EN_LIGNE',
    reference_transaction: referenceTransaction,
    montant: reservation.montantAcompte.toFixed(2),
    reference_facture: `FACT-${referenceTransaction}`,
  });
}
