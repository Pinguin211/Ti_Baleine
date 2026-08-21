/**
 * Service d'évaluation de la disponibilité et de la réservabilité d'un créneau.
 * SPEC-ADMIN-07 | CASE-ADMIN-062, CASE-ADMIN-063
 */

import type { Creneau } from '../../../schemas/types/slots.types';

export function estCreneauReservable(creneau: Creneau): boolean {
  return creneau.estOuvert === true;
}
