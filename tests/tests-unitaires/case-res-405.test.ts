/**
 * Test unitaire du cas CASE-RES-405 — Grille tarifaire Dauphins à
 * Saint-Gilles (SPEC-RESERVATION-03, AC-4).
 *
 * Portée unitaire : la grille Dauphins (50 € adulte / 30 € enfant) et le
 * décompte de 2 places. L'application de la grille Baleines (65 €/40 €) à la
 * place fait échouer les assertions.
 *
 * Non couvert à ce niveau : le passage à l'état « payée » après débit
 * bancaire, effet d'orchestration relevant de l'intégration ou de l'E2E.
 *
 * Fonctions visées : `src/utils/tarification.ts`, `src/utils/jauge.ts`.
 */
import { expect, test } from 'vitest';
import { calculerPlacesRestantes } from '../../src/utils/jauge';
import { calculerMontantIndividuel } from '../../src/utils/tarification';

const PORT = 'saint-gilles';
const ACTIVITE = 'dauphins';
const TARIF_ADULTE_DAUPHINS = 50;
const TARIF_ENFANT_DAUPHINS = 30;
const MONTANT_TOTAL_ATTENDU = 80;
const JAUGE_MAX = 36;
const PLACES_DECOMPTEES = 2;

test('test_CASE_RES_405_tarif_dauphins_saint_gilles_50_adulte_30_enfant', () => {
  const montant = calculerMontantIndividuel({
    port: PORT,
    activite: ACTIVITE,
    adultes: 1,
    agesEnfants: [9],
  });
  expect(montant.tarifAdulte).toBe(TARIF_ADULTE_DAUPHINS);
  expect(montant.tarifEnfant).toBe(TARIF_ENFANT_DAUPHINS);
  expect(montant.montantTotal).toBe(MONTANT_TOTAL_ATTENDU);

  expect(
    calculerPlacesRestantes({ jaugeMax: JAUGE_MAX, placesReservees: PLACES_DECOMPTEES }),
  ).toBe(JAUGE_MAX - PLACES_DECOMPTEES);
});
