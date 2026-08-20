/**
 * CASE-RES-412 — Plafonnement de la jauge à 24 places à Saint-Gilles les mardis et
 * jeudis matin
 * SPEC-RESERVATION-03 | AC-2 (R-10, R-12)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit cinq.
 * Vocabulaire aligné sur docs/uml/domain.puml (ConfigBateau : TIKAP 12 /
 * GRAND_BLEU 24, Creneau.calculerJauge(), Activite).
 */
import { it, expect } from 'vitest';
import {
  calculerJaugeCreneau,
  listerPrivatisationsDisponibles,
} from '../../../src/services/server/booking-capacity.service';

const MARDI = new Date(2026, 7, 18);

/** Jauge maximale d'un créneau de Saint-Gilles ce mardi. */
function jauge(heureDepart: string): number {
  return calculerJaugeCreneau({ port: 'SAINT_GILLES', date: MARDI, heureDepart });
}

it('test_CASE_RES_412_plafonnement_jauge_24_places_saint_gilles_mardi_jeudi_matin', () => {
  // Alors le créneau de 7h00 affiche une jauge maximale de 24 places (Grand Bleu seul)
  expect(jauge('07h00')).toBe(24);

  // Et le créneau de 10h00 affiche une jauge maximale de 24 places (Grand Bleu seul)
  expect(jauge('10h00')).toBe(24);

  // Et le créneau d'après-midi de 14h00 affiche la jauge complète de 36 places
  // (retour du Tikap à Saint-Gilles)
  expect(jauge('14h00')).toBe(36);

  // Quand un client souhaite réserver une formule de privatisation à Saint-Gilles
  // le mardi matin
  // Alors seule la privatisation du « Grand Bleu » est disponible
  const privatisationsMatin = listerPrivatisationsDisponibles({
    port: 'SAINT_GILLES',
    date: MARDI,
    heureDepart: '07h00',
  });
  expect(privatisationsMatin).toEqual(['PRIVATISATION_GRAND_BLEU']);

  // Et la privatisation du « Tikap » est indisponible pour le matin à Saint-Gilles
  expect(privatisationsMatin).not.toContain('PRIVATISATION_TIKAP');
});
