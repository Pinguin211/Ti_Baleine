'use server';

/**
 * Frontière Server Action pour la confirmation de bascule vers l'annulation
 * complète après réduction à 0 billet (SPEC-ADMIN-02/03, CASE-ADMIN-026).
 * Compose l'infrastructure réelle autour de `confirmerAnnulationApresReduction`.
 */

import {
  chargerReservationParReference,
  supprimerBilletsParId,
  marquerReservationAnnulee,
} from '../services/server/cancellation/reservation-repository.service';
import { confirmerAnnulationApresReduction } from '../services/server/cancellation/confirmer-annulation-apres-reduction.service';
import { envoyerSms } from '../services/server/notifications/envoyer-sms.service';

export async function confirmerBasculeAnnulation(
  reference: string,
  motifAnnulation: string
): Promise<{ succes: boolean; message?: string }> {
  const reservation = await chargerReservationParReference(reference);
  if (!reservation) {
    return { succes: false, message: 'Réservation introuvable' };
  }

  confirmerAnnulationApresReduction(
    {
      reservation: {
        reference: reservation.reference,
        billets: reservation.billets.map((b) => ({ typeBillet: b.typeBillet })),
        telephoneMobileClient: reservation.telephone,
      },
      motifAnnulation,
    },
    {
      depotBillets: { supprimerBillets: () => {} },
      envoiSMS: { envoyer: (message) => envoyerSms(message) },
    }
  );

  await Promise.all([
    supprimerBilletsParId(reservation.billets.map((b) => b.id)),
    marquerReservationAnnulee(reservation.id),
  ]);

  return { succes: true };
}
