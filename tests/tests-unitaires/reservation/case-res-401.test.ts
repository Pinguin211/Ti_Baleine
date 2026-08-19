/**
 * Test unitaire du cas CASE-RES-401 — Réservation individuelle à Saint-Leu
 * avec majoration géographique (SPEC-RESERVATION-03, AC-2, AC-4, AC-8).
 *
 * Portée unitaire : planning restreint de Saint-Leu (mardi matin, départ
 * unique à 9h00), jauge de 12 places du Tikap, majoration de + 10 € par
 * personne sur le tarif individuel, et décompte des places. La suppression de
 * la majoration dans le code fait échouer les assertions 75 € et 150 €.
 *
 * Non couvert à ce niveau : le passage à l'état « payée » après débit
 * bancaire (AC-8), effet d'orchestration relevant de l'intégration ou de l'E2E.
 *
 * Fonctions visées : `src/utils/planning.ts`, `src/utils/tarification.ts`,
 * `src/utils/jauge.ts`.
 */
import { expect, test } from 'vitest';
import { calculerPlacesRestantes } from '../../src/utils/jauge';
import { calculerJaugeMax, listerHeuresDepart } from '../../src/utils/planning';
import { calculerMontantIndividuel } from '../../src/utils/tarification';

const PORT = 'saint-leu';
const ACTIVITE = 'baleines';
const DATE_MARDI = '2026-09-01';
const HEURE_DEPART_UNIQUE = '09h00';
const JAUGE_MAX = 12;
const TARIF_ADULTE_MAJORE = 75;
const NB_ADULTES = 2;
const MONTANT_TOTAL_ATTENDU = 150;

test('test_CASE_RES_401_reservation_saint_leu_majoration_10_euros_par_personne', () => {
  expect(listerHeuresDepart({ port: PORT, date: DATE_MARDI })).toEqual([HEURE_DEPART_UNIQUE]);
  expect(calculerJaugeMax({ port: PORT, date: DATE_MARDI, heure: HEURE_DEPART_UNIQUE })).toBe(
    JAUGE_MAX,
  );

  const montant = calculerMontantIndividuel({
    port: PORT,
    activite: ACTIVITE,
    adultes: NB_ADULTES,
    agesEnfants: [],
  });
  expect(montant.tarifAdulte).toBe(TARIF_ADULTE_MAJORE);
  expect(montant.montantTotal).toBe(MONTANT_TOTAL_ATTENDU);

  expect(calculerPlacesRestantes({ jaugeMax: JAUGE_MAX, placesReservees: NB_ADULTES })).toBe(
    JAUGE_MAX - NB_ADULTES,
  );
});
