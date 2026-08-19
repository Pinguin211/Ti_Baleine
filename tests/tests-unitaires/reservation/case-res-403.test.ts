/**
 * Test unitaire du cas CASE-RES-403 — Privatisation demi-journée du Tikap à
 * Saint-Leu (SPEC-RESERVATION-03, AC-5, AC-8).
 *
 * Portée unitaire : le forfait Tikap de 600 €, strictement forfaitaire —
 * l'ajout d'une majoration géographique de + 10 € / personne fait échouer
 * l'assertion —, la disponibilité du Tikap à la privatisation le mardi matin
 * à Saint-Leu, et le passage du créneau à « complet » une fois privatisé.
 *
 * Non couvert à ce niveau : le passage effectif à l'état « payée » après
 * débit bancaire, effet d'orchestration relevant de l'intégration ou de l'E2E.
 *
 * Fonctions visées : `src/utils/tarification.ts` →
 * `calculerForfaitPrivatisation(navire)` ; `src/utils/planning.ts` →
 * `naviresPrivatisables(demande)` ; `src/utils/jauge.ts` →
 * `determinerStatutCreneau(etat)`.
 */
import { expect, test } from 'vitest';
import { determinerStatutCreneau } from '../../src/utils/jauge';
import { naviresPrivatisables } from '../../src/utils/planning';
import { calculerForfaitPrivatisation } from '../../src/utils/tarification';

const PORT = 'saint-leu';
const DATE_MARDI = '2026-09-08';
const HEURE_DEPART = '09h00';
const NAVIRE = 'tikap';
const FORFAIT_TIKAP = 600;

test('test_CASE_RES_403_privatisation_tikap_saint_leu_forfait_600_capacite_bloquee', () => {
  expect(calculerForfaitPrivatisation(NAVIRE)).toBe(FORFAIT_TIKAP);
  expect(naviresPrivatisables({ port: PORT, date: DATE_MARDI, heure: HEURE_DEPART })).toContain(
    NAVIRE,
  );
  expect(
    determinerStatutCreneau({ placesRestantes: 0, clos: false, privatise: true }),
  ).toBe('complet');
});
