/**
 * Test unitaire du cas CASE-RES-409 — Consultation des jours de fermeture
 * annuelle (SPEC-RESERVATION-03, AC-2).
 *
 * Portée unitaire : la règle de fermeture annuelle (R-02) — ni le
 * 25 décembre 2026 ni le 1er janvier 2027 ne proposent de créneau à
 * Saint-Gilles, port ouvert tous les jours en temps normal. Vider la liste
 * des jours de fermeture dans le code fait échouer le test.
 *
 * Conformément à la fiche de cas, les veilles et lendemains de ces dates ne
 * sont pas vérifiés ici.
 *
 * Fonction visée : `src/utils/planning.ts` →
 * `listerHeuresDepart({ port, date })`.
 */
import { expect, test } from 'vitest';
import { listerHeuresDepart } from '../../src/utils/planning';

const PORT = 'saint-gilles';
const DATES_DE_FERMETURE = ['2026-12-25', '2027-01-01'];

test('test_CASE_RES_409_fermeture_annuelle_25_decembre_1er_janvier_aucun_creneau', () => {
  for (const date of DATES_DE_FERMETURE) {
    expect(listerHeuresDepart({ port: PORT, date }), `créneaux proposés le ${date}`).toEqual([]);
  }
});
