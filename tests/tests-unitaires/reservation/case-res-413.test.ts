/**
 * CASE-RES-413 — Blocage de réservation demandant plus de places que le reliquat
 * disponible
 * SPEC-RESERVATION-03 | AC-2
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit trois.
 * Vocabulaire aligné sur docs/uml/domain.puml (Creneau.placesRestantes()).
 */
import { it, expect } from 'vitest';
import { verifierCapaciteDemandee } from '../../../src/services/server/booking-capacity.service';

/** Créneau « Sortie Baleines » à Saint-Gilles : 36 places, 33 déjà vendues. */
const CRENEAU = { jauge: 36, placesReservees: 33 };

it('test_CASE_RES_413_blocage_reservation_places_superieures_au_reliquat_disponible', () => {
  const verdict = verifierCapaciteDemandee(CRENEAU, 4);

  // Alors le système bloque la configuration des passagers
  expect(verdict.accepte).toBe(false);

  // Et un message d'information indique que seules 3 places restent disponibles
  // sur ce créneau
  expect(verdict.placesRestantes).toBe(3);

  // Et la validation du formulaire est désactivée
  expect(verdict.validationAutorisee).toBe(false);
});
