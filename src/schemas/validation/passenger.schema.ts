/**
 * passenger.schema.ts
 *
 * Validation Zod de l'âge des participants : accès strictement interdit à bord
 * en dessous de 4 ans pour raisons de sécurité maritime, et blocage du panier
 * dès qu'un passager inadmissible y figure.
 * Référence : SPEC-RESERVATION-03 (AC-4, R-06, cas limite 3), CASE-RES-410.
 */

import { z } from 'zod';
import { AGE_MINIMAL_EMBARQUEMENT } from '../../config/pricing.constants';

const MESSAGE_AGE_INADMISSIBLE = `Les enfants de moins de ${AGE_MINIMAL_EMBARQUEMENT} ans ne sont pas admis à bord pour des raisons de sécurité`;

export const passengerSchema = z.object({
  age: z.number().int().min(AGE_MINIMAL_EMBARQUEMENT, MESSAGE_AGE_INADMISSIBLE),
});

export const panierPassagersSchema = z.object({
  passagers: z.array(passengerSchema).min(1),
});

export type Passager = z.infer<typeof passengerSchema>;
