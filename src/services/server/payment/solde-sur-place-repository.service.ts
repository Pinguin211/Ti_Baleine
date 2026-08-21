import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '../../../lib/server/db/client';
import { reservations, creneaux, users, billets, paiements } from '../../../../drizzle/schema';
import { calculerRecapitulatifTarifaire } from '../../../utils/pricing-rules';

export interface ReservationSoldeChargee {
  id: string;
  reference: string;
  statut: 'EN_ATTENTE_PAIEMENT' | 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT' | 'ANNULEE';
  emailClient: string;
  montantTotal: number;
  montantAcompteRegle: number;
  soldeRestantDu: number;
}

export async function chargerReservationPourSolde(reference: string): Promise<ReservationSoldeChargee | null> {
  const [ligne] = await db
    .select({
      id: reservations.id,
      reference: reservations.reference,
      statut: reservations.statut,
      email: users.email,
      port: creneaux.port,
      activite: creneaux.activite,
    })
    .from(reservations)
    .innerJoin(users, eq(users.id, reservations.user_id))
    .innerJoin(creneaux, eq(creneaux.id, reservations.creneau_id))
    .where(eq(reservations.reference, reference))
    .limit(1);
  if (!ligne) return null;

  const [lignesBillets, lignesPaiements] = await Promise.all([
    db.select({ typeBillet: billets.type_billet }).from(billets).where(eq(billets.reservation_id, ligne.id)),
    db.select({ montant: paiements.montant }).from(paiements).where(eq(paiements.reservation_id, ligne.id)),
  ]);

  const recapitulatif = calculerRecapitulatifTarifaire(lignesBillets, { port: ligne.port, activite: ligne.activite });
  const montantRegle = lignesPaiements.reduce((total, p) => total + Number(p.montant), 0);

  return {
    id: ligne.id,
    reference: ligne.reference,
    statut: ligne.statut,
    emailClient: ligne.email,
    montantTotal: recapitulatif.montantTotal,
    montantAcompteRegle: montantRegle,
    soldeRestantDu: Math.max(0, recapitulatif.montantTotal - montantRegle),
  };
}

export async function enregistrerPaiementSolde(
  reservationId: string,
  montant: number,
  referenceTransaction: string,
  canal: 'SUR_PLACE_CB' | 'EN_LIGNE'
): Promise<void> {
  await db.insert(paiements).values({
    reservation_id: reservationId,
    type_paiement: 'SOLDE',
    canal_paiement: canal,
    reference_transaction: referenceTransaction,
    montant: montant.toFixed(2),
    reference_facture: `FACT-${referenceTransaction}`,
  });
  await db.update(reservations).set({ statut: 'PAYEE_COMPLETEMENT' }).where(eq(reservations.id, reservationId));
}
