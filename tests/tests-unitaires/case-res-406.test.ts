/**
 * Test unitaire du cas CASE-RES-406 — Privatisation du Grand Bleu à
 * Saint-Gilles (SPEC-RESERVATION-03, AC-5).
 *
 * Portée unitaire : le forfait Grand Bleu de 1 100 € — l'application du
 * forfait Tikap (600 €) fait échouer l'assertion —, la disponibilité du
 * Grand Bleu à la privatisation le mercredi après-midi à Saint-Gilles, et le
 * passage du créneau à « complet » une fois privatisé.
 *
 * Non couvert à ce niveau : le passage effectif à l'état « payée » après
 * débit bancaire, effet d'orchestration relevant de l'intégration ou de l'E2E.
 *
 * Fonctions visées : `src/utils/tarification.ts`, `src/utils/planning.ts`,
 * `src/utils/jauge.ts`.
 */
import { expect, test } from 'vitest';
import { determinerStatutCreneau } from '../../src/utils/jauge';
import { naviresPrivatisables } from '../../src/utils/planning';
import { calculerForfaitPrivatisation } from '../../src/utils/tarification';

const PORT = 'saint-gilles';
const DATE_MERCREDI = '2026-09-16';
const HEURE_DEPART = '14h00';
const NAVIRE = 'grand-bleu';
const FORFAIT_GRAND_BLEU = 1100;

test('test_CASE_RES_406_privatisation_grand_bleu_forfait_1100_capacite_bloquee', () => {
  expect(calculerForfaitPrivatisation(NAVIRE)).toBe(FORFAIT_GRAND_BLEU);
  expect(naviresPrivatisables({ port: PORT, date: DATE_MERCREDI, heure: HEURE_DEPART })).toContain(
    NAVIRE,
  );
  expect(
    determinerStatutCreneau({ placesRestantes: 0, clos: false, privatise: true }),
  ).toBe('complet');
});
