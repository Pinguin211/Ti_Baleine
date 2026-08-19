/**
 * Test unitaire du cas CASE-RES-413 — Demande de places supérieure aux places
 * restantes (SPEC-RESERVATION-03, AC-2).
 *
 * Portée unitaire : le contrôle de jauge — une demande de 4 places sur un
 * créneau n'en offrant plus que 3 est refusée, et le refus porte le maximum
 * disponible (3) qui alimentera le message affiché au client. Supprimer le
 * contrôle de jauge du code fait échouer le test.
 *
 * Non couvert à ce niveau : l'intégrité effective de la jauge et l'absence
 * de réservation enregistrée, qui découlent de ce refus mais relèvent de
 * l'orchestration.
 *
 * Fonction visée : `src/utils/jauge.ts` →
 * `peutAccueillir({ placesRestantes, placesDemandees })` →
 * `{ accepte, placesMaximum }`.
 */
import { expect, test } from 'vitest';
import { peutAccueillir } from '../../src/utils/jauge';

const PLACES_RESTANTES = 3;
const PLACES_DEMANDEES = 4;

test('test_CASE_RES_413_demande_superieure_aux_places_restantes_blocage_et_message', () => {
  const resultat = peutAccueillir({
    placesRestantes: PLACES_RESTANTES,
    placesDemandees: PLACES_DEMANDEES,
  });
  expect(resultat.accepte).toBe(false);
  expect(resultat.placesMaximum).toBe(PLACES_RESTANTES);
});
