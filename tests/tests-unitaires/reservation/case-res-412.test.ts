/**
 * Test unitaire du cas CASE-RES-412 — Jauge réduite à Saint-Gilles les mardis
 * et jeudis matin (SPEC-RESERVATION-03, AC-2, AC-5).
 *
 * Portée unitaire : la rotation des navires (R-10) — le mardi 15 septembre
 * 2026, les créneaux de 7h00 et 10h00 à Saint-Gilles sont plafonnés à
 * 24 places, le Tikap opérant à Saint-Leu, et n'y sont donc pas
 * privatisables. Le mercredi 16 sert de témoin de la jauge standard de
 * 36 places, comme demandé par la fiche de cas. Supprimer la jauge réduite
 * du code fait échouer le test.
 *
 * Fonctions visées : `src/utils/planning.ts` →
 * `calculerJaugeMax(demande)` et `naviresPrivatisables(demande)`.
 */
import { expect, test } from 'vitest';
import { calculerJaugeMax, naviresPrivatisables } from '../../src/utils/planning';

const PORT = 'saint-gilles';
const DATE_MARDI = '2026-09-15';
const DATE_MERCREDI_TEMOIN = '2026-09-16';
const HEURES_MATIN = ['07h00', '10h00'];
const JAUGE_MATIN_MARDI_JEUDI = 24;
const JAUGE_STANDARD = 36;

test('test_CASE_RES_412_saint_gilles_mardi_jeudi_matin_jauge_24_tikap_indisponible', () => {
  for (const heure of HEURES_MATIN) {
    expect(calculerJaugeMax({ port: PORT, date: DATE_MARDI, heure }), `mardi ${heure}`).toBe(
      JAUGE_MATIN_MARDI_JEUDI,
    );
    expect(
      naviresPrivatisables({ port: PORT, date: DATE_MARDI, heure }),
      `privatisation mardi ${heure}`,
    ).not.toContain('tikap');
  }

  for (const heure of HEURES_MATIN) {
    expect(
      calculerJaugeMax({ port: PORT, date: DATE_MERCREDI_TEMOIN, heure }),
      `témoin mercredi ${heure}`,
    ).toBe(JAUGE_STANDARD);
  }
});
