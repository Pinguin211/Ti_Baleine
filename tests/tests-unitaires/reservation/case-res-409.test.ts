/**
 * CASE-RES-409 — Fermeture annuelle les 25 décembre et 1er janvier
 * SPEC-RESERVATION-03 | AC-2 (R-02)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit quatre.
 * Vocabulaire aligné sur docs/uml/domain.puml (Creneau, Port).
 */
import { it, expect } from 'vitest';
import {
  estJourDeFermetureAnnuelle,
  listerCreneauxDuJour,
} from '../../../src/services/server/booking-slot.service';

const NOEL = new Date(2026, 11, 25);
const JOUR_DE_L_AN = new Date(2027, 0, 1);

it('test_CASE_RES_409_fermeture_annuelle_25_decembre_et_1er_janvier_aucun_creneau', () => {
  // Quand il sélectionne la date du 25 décembre 2026
  // Alors le calendrier indique que la date est fermée / indisponible
  expect(estJourDeFermetureAnnuelle(NOEL)).toBe(true);

  // Et aucun créneau de départ (7h00, 10h00, 14h00) n'est affiché ni sélectionnable
  expect([
    listerCreneauxDuJour('SAINT_GILLES', NOEL),
    listerCreneauxDuJour('SAINT_LEU', NOEL),
  ]).toEqual([[], []]);

  // Quand il sélectionne la date du 1er janvier 2027
  // Alors le calendrier indique que la date est fermée / indisponible
  expect(estJourDeFermetureAnnuelle(JOUR_DE_L_AN)).toBe(true);

  // Et aucun créneau de départ n'est affiché ni sélectionnable
  expect([
    listerCreneauxDuJour('SAINT_GILLES', JOUR_DE_L_AN),
    listerCreneauxDuJour('SAINT_LEU', JOUR_DE_L_AN),
  ]).toEqual([[], []]);
});
