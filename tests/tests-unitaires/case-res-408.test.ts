/**
 * Test unitaire du cas CASE-RES-408 — Tentative de réservation à moins de
 * 2 heures du départ (SPEC-RESERVATION-03, AC-3).
 *
 * Portée unitaire : la règle de clôture automatique H-2 (R-11), évaluée à
 * 8h15 pour un départ à 10h00, soit 1 h 45 avant. Un second appel à 7h00
 * (3 heures avant) sert de témoin de la même règle — sans lui, une
 * implémentation qui clôturerait tous les créneaux passerait le test.
 * Supprimer le seuil H-2 du code fait échouer l'une ou l'autre assertion.
 *
 * Non couvert à ce niveau : le rejet d'une validation forcée côté serveur et
 * l'intégrité de la jauge, qui découlent de cette règle mais relèvent de
 * l'orchestration. Le comportement au seuil exact de 2 heures reste non
 * précisé par la spécification, donc non testé.
 *
 * Fonction visée : `src/utils/planning.ts` →
 * `estCreneauClos({ depart, maintenant })`.
 */
import { expect, test } from 'vitest';
import { estCreneauClos } from '../../src/utils/planning';

const DEPART = new Date('2026-09-16T10:00:00+04:00');
const INSTANT_1H45_AVANT = new Date('2026-09-16T08:15:00+04:00');
const INSTANT_3H_AVANT = new Date('2026-09-16T07:00:00+04:00');

test('test_CASE_RES_408_reservation_moins_2h_avant_depart_creneau_clos_rejet', () => {
  expect(estCreneauClos({ depart: DEPART, maintenant: INSTANT_1H45_AVANT })).toBe(true);
  expect(estCreneauClos({ depart: DEPART, maintenant: INSTANT_3H_AVANT })).toBe(false);
});
