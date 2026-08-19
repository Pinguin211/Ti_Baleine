/**
 * Test unitaire du cas CASE-RES-410 — Saisie d'un participant de moins de
 * 4 ans (SPEC-RESERVATION-03, AC-4).
 *
 * Portée unitaire : la règle d'admissibilité à bord (R-06) — un enfant de
 * 3 ans est refusé pour raison de sécurité. Abaisser la limite d'âge dans le
 * code fait échouer le test.
 *
 * Non couvert à ce niveau : le blocage effectif de l'étape passagers et
 * l'absence de calcul tarifaire pour l'enfant, qui découlent de ce refus mais
 * relèvent de l'orchestration du tunnel. Le motif vérifié est un code
 * machine ; le message d'inadmissibilité affiché relève des composants.
 *
 * Fonction visée : `src/schemas/validation/passagers.schema.ts` →
 * `validerPassagers({ adultes, agesEnfants })` → `{ valide, motifs }`.
 */
import { expect, test } from 'vitest';
import { validerPassagers } from '../../src/schemas/validation/passagers.schema';

const AGE_ENFANT_INADMISSIBLE = 3;
const MOTIF_INADMISSIBILITE = 'enfant-inadmissible-moins-4-ans';

test('test_CASE_RES_410_enfant_moins_4_ans_rejet_immediat_validation_bloquee', () => {
  const resultat = validerPassagers({ adultes: 1, agesEnfants: [AGE_ENFANT_INADMISSIBLE] });
  expect(resultat.valide).toBe(false);
  expect(resultat.motifs).toContain(MOTIF_INADMISSIBILITE);
});
