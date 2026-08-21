/**
 * Formatage des statuts financiers et badges des réservations le jour J.
 * SPEC-ADMIN-01 | CASE-ADMIN-077
 */

import type { ReservationPersiste, StatutFinancierAffiche } from '../../../schemas/types/planning.types';

export function obtenirStatutsFinanciersReservations(
  reservations: ReservationPersiste[]
): StatutFinancierAffiche[] {
  return reservations.map((res) => {
    if (res.statut === 'PAYEE_COMPLETEMENT') {
      return {
        reference: res.reference,
        badge: 'Payée complètement',
        couleurBadge: 'vert',
        soldeDu: 0,
      };
    }

    return {
      reference: res.reference,
      badge: 'Payée partiellement',
      couleurBadge: 'orange',
      soldeDu: res.soldeRestantDu,
    };
  });
}
