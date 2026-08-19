/**
 * Test unitaire du cas CASE-RES-411 — Consultation de Saint-Leu en dehors des
 * mardis et jeudis matin (SPEC-RESERVATION-03, AC-2).
 *
 * Portée unitaire : le planning restreint de Saint-Leu — aucun créneau le
 * lundi 14 ni le mercredi 16 septembre 2026, et le mardi 15 ne propose que le
 * départ du matin à 9h00, sans créneau d'après-midi, le Tikap regagnant
 * Saint-Gilles. Ce mardi matin sert de témoin de non-régression demandé par
 * la fiche de cas. Rendre Saint-Leu réservable un jour fermé fait échouer le
 * test.
 *
 * Fonction visée : `src/utils/planning.ts` →
 * `listerHeuresDepart({ port, date })`.
 */
import { expect, test } from 'vitest';
import { listerHeuresDepart } from '../../src/utils/planning';

const PORT = 'saint-leu';
const DATES_FERMEES = ['2026-09-14', '2026-09-16'];
const DATE_MARDI = '2026-09-15';
const HEURE_DEPART_UNIQUE = '09h00';

test('test_CASE_RES_411_saint_leu_hors_mardi_jeudi_matin_aucun_creneau', () => {
  for (const date of DATES_FERMEES) {
    expect(listerHeuresDepart({ port: PORT, date }), `créneaux proposés le ${date}`).toEqual([]);
  }
  expect(listerHeuresDepart({ port: PORT, date: DATE_MARDI })).toEqual([HEURE_DEPART_UNIQUE]);
});
