/**
 * booking-contact.schema.ts
 *
 * Validation Zod des coordonnées de contact obligatoires en mode invité :
 * nom, prénom, e-mail et numéro de mobile au format international.
 * Référence : SPEC-RESERVATION-03 (AC-6, C-20, cas limite 8),
 * CASE-RES-407, CASE-RES-415, docs/uml/domain.puml (User).
 */

import { z } from 'zod';

const MESSAGE_NOM_OBLIGATOIRE = 'Le nom de famille est obligatoire';
const MESSAGE_PRENOM_OBLIGATOIRE = 'Le prénom est obligatoire';
const MESSAGE_EMAIL_OBLIGATOIRE = "L'adresse e-mail est obligatoire";
const MESSAGE_EMAIL_INVALIDE = "Le format de l'adresse e-mail est invalide";
const MESSAGE_TELEPHONE_OBLIGATOIRE =
  'Le numéro de téléphone mobile est obligatoire pour recevoir les notifications et le lien de paiement';
const MESSAGE_TELEPHONE_INVALIDE = "Le numéro de mobile n'est pas au format valide";

/** Adresse e-mail : partie locale, arobase, domaine et extension. */
const EXPRESSION_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Mobile réunionnais au format international E.164 (+262 6xx xxxxxx). */
const EXPRESSION_MOBILE_E164 = /^\+262(69|63)\d{7}$/;

export const bookingContactSchema = z.object({
  nom: z.string().min(1, MESSAGE_NOM_OBLIGATOIRE),
  prenom: z.string().min(1, MESSAGE_PRENOM_OBLIGATOIRE),
  email: z
    .string()
    .min(1, MESSAGE_EMAIL_OBLIGATOIRE)
    .regex(EXPRESSION_EMAIL, MESSAGE_EMAIL_INVALIDE),
  telephone: z
    .string()
    .min(1, MESSAGE_TELEPHONE_OBLIGATOIRE)
    .regex(EXPRESSION_MOBILE_E164, MESSAGE_TELEPHONE_INVALIDE),
});

export type ContactClient = z.infer<typeof bookingContactSchema>;
