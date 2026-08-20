/**
 * CASE-RES-411 — Indisponibilité des créneaux à Saint-Leu en dehors des mardis et
 * jeudis matin
 * SPEC-RESERVATION-03 | AC-2 (R-01, R-20)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit trois.
 * Vocabulaire aligné sur docs/uml/domain.puml (ConfigPort.joursOuverts, Creneau).
 */
import { it, expect } from 'vitest';
import { listerCreneauxDuJour } from '../../../src/services/server/booking-slot.service';

const LUNDI = new Date(2026, 7, 17);
const MARDI = new Date(2026, 7, 18);
const MERCREDI = new Date(2026, 7, 19);

/** Heures de départ proposées à Saint-Leu pour une date donnée. */
function heuresSaintLeu(date: Date): string[] {
  return listerCreneauxDuJour('SAINT_LEU', date).map((creneau) => creneau.heureDepart);
}

it('test_CASE_RES_411_indisponibilite_creneaux_saint_leu_hors_mardi_jeudi_matin', () => {
  // Et consulte un lundi (17 août 2026) ou un mercredi (19 août 2026)
  // Alors le calendrier indique qu'aucun créneau n'est disponible pour Saint-Leu
  // sur ces journées
  expect([heuresSaintLeu(LUNDI), heuresSaintLeu(MERCREDI)]).toEqual([[], []]);

  // Quand il consulte un mardi (18 août 2026)
  // Alors seul le créneau du matin à 9h00 est proposé
  expect(heuresSaintLeu(MARDI)).toEqual(['09h00']);

  // Et aucun créneau d'après-midi (ex. 14h00) n'est affiché pour Saint-Leu
  expect(heuresSaintLeu(MARDI)).not.toContain('14h00');
});
