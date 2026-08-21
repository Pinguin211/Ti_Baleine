'use server';

/**
 * Frontière Server Action pour le règlement en ligne du solde
 * (SPEC-RESERVATION-03, CASE-RES-418 à 421). Compose l'infrastructure
 * réelle autour de `payerSoldeEnLigne` (contrat testé — dossiers de solde
 * suivis en mémoire par `balance-payment.service.ts` lui-même, pas par
 * cette action). Persiste le paiement réel en base après confirmation.
 */

import { payerSoldeEnLigne, type PaiementSolde } from '../services/server/balance-payment.service';
import { creerPasserellePaiementAcompteReelle } from '../services/server/payment/passerelle-paiement-acompte.service';
import {
  chargerReservationPourSolde,
  enregistrerPaiementSolde,
} from '../services/server/payment/solde-sur-place-repository.service';

export async function soumettrePaiementSolde(
  token: string
): Promise<{ succes: boolean; message?: string; paiement?: PaiementSolde }> {
  try {
    const paiement = payerSoldeEnLigne(token, new Date(), { passerellePaiement: creerPasserellePaiementAcompteReelle() });

    const reservationDb = await chargerReservationPourSolde(paiement.reservation.reference);
    if (reservationDb) {
      const reference = paiement.referenceTransaction ?? paiement.reservation.reference;
      await enregistrerPaiementSolde(reservationDb.id, paiement.montant, reference, 'EN_LIGNE');
    }

    return { succes: true, paiement };
  } catch (erreur) {
    return { succes: false, message: erreur instanceof Error ? erreur.message : 'Échec du paiement' };
  }
}
