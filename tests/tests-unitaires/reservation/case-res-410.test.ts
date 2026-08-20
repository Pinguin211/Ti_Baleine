/**
 * CASE-RES-410 — Rejet de la saisie d'un participant de moins de 4 ans
 * SPEC-RESERVATION-03 | AC-4 (R-06)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit trois.
 * Vocabulaire aligné sur docs/uml/domain.puml (Billet, TypeBillet : ADULTE / ENFANT).
 */
import { it, expect } from 'vitest';
import {
  passengerSchema,
  panierPassagersSchema,
} from '../../../src/schemas/validation/passenger.schema';

it('test_CASE_RES_410_rejet_participant_moins_de_4_ans_securite_maritime', () => {
  // Et qu'il tente d'ajouter un enfant en renseignant un âge de 2 ans
  // (ou inférieur à 4 ans)
  // Alors le système bloque l'ajout du passager
  expect([2, 3].map((age) => passengerSchema.safeParse({ age }).success)).toEqual([
    false,
    false,
  ]);

  // Et un message d'alerte explicite s'affiche indiquant que les enfants de moins
  // de 4 ans ne sont pas admis à bord pour des raisons de sécurité
  const rejet = passengerSchema.safeParse({ age: 2 });
  expect(rejet.success ? [] : rejet.error.issues.map((p) => p.message)).toEqual([
    expect.stringMatching(/moins de 4 ans.*sécurité/i),
  ]);

  // Et le bouton de validation du panier reste désactivé tant qu'un participant
  // inadmissible est présent
  expect(
    panierPassagersSchema.safeParse({ passagers: [{ age: 30 }, { age: 2 }] }).success
  ).toBe(false);
});
