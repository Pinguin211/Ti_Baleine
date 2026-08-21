import 'server-only';
import { and, eq, inArray } from 'drizzle-orm';
import { db } from '../../../lib/server/db/client';
import { reservations, creneaux, users, billets, paiements } from '../../../../drizzle/schema';

export interface ReservationChargee {
  id: string;
  reference: string;
  statut: 'EN_ATTENTE_PAIEMENT' | 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT' | 'ANNULEE';
  telephone: string;
  creneauId: string;
  dateDepart: Date;
  heureDepart: string;
  port: string;
  billets: { id: string; typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION' }[];
}

function composerHorodatageDepart(date: string, heureDepart: string): Date {
  const [h, m] = heureDepart.split(':').map(Number);
  const horodatage = new Date(`${date}T00:00:00`);
  horodatage.setHours(h, m, 0, 0);
  return horodatage;
}

async function chargerLigneReservation(reference: string) {
  const [ligne] = await db
    .select({
      id: reservations.id,
      reference: reservations.reference,
      statut: reservations.statut,
      telephone: users.telephone,
      creneauId: creneaux.id,
      date: creneaux.date,
      heureDepart: creneaux.heure_depart,
      port: creneaux.port,
    })
    .from(reservations)
    .innerJoin(users, eq(users.id, reservations.user_id))
    .innerJoin(creneaux, eq(creneaux.id, reservations.creneau_id))
    .where(eq(reservations.reference, reference))
    .limit(1);
  return ligne;
}

export async function chargerReservationParReference(reference: string): Promise<ReservationChargee | null> {
  const ligne = await chargerLigneReservation(reference);
  if (!ligne) return null;

  const lignesBillets = await db
    .select({ id: billets.id, typeBillet: billets.type_billet })
    .from(billets)
    .where(eq(billets.reservation_id, ligne.id));

  return {
    id: ligne.id,
    reference: ligne.reference,
    statut: ligne.statut,
    telephone: ligne.telephone,
    creneauId: ligne.creneauId,
    dateDepart: composerHorodatageDepart(ligne.date, ligne.heureDepart),
    heureDepart: ligne.heureDepart.slice(0, 5),
    port: ligne.port,
    billets: lignesBillets,
  };
}

export async function supprimerBilletsParId(billetIds: string[]): Promise<void> {
  if (billetIds.length === 0) return;
  await db.delete(billets).where(inArray(billets.id, billetIds));
}

export async function marquerReservationAnnulee(reservationId: string): Promise<void> {
  await db.update(reservations).set({ statut: 'ANNULEE' }).where(eq(reservations.id, reservationId));
}

export async function chargerMontantAcompteVerse(reservationId: string): Promise<number> {
  const lignes = await db
    .select({ montant: paiements.montant })
    .from(paiements)
    .where(and(eq(paiements.reservation_id, reservationId), eq(paiements.type_paiement, 'ACOMPTE')));
  return lignes.reduce((total, ligne) => total + Number(ligne.montant), 0);
}
