/**
 * Validation de la réduction de billets.
 * SPEC-ADMIN-03 | CASE-ADMIN-069
 */

import { z } from 'zod';

export function createReductionBilletsSchema(actifs: {
  adultesActifs: number;
  enfantsActifs: number;
}) {
  return z
    .object({
      reservationReference: z.string(),
      operation: z.literal('RETRAIT'),
      adultesARetirer: z.number().int().nonnegative(),
      enfantsARetirer: z.number().int().nonnegative(),
    })
    .refine((val) => val.adultesARetirer <= actifs.adultesActifs, {
      message: 'Quantité de billets adultes à retirer supérieure au solde actif',
      path: ['adultesARetirer'],
    })
    .refine((val) => val.enfantsARetirer <= actifs.enfantsActifs, {
      message: 'Quantité de billets enfants à retirer supérieure au solde actif',
      path: ['enfantsARetirer'],
    });
}
