/**
 * Test unitaire du cas CASE-RES-400 — Réservation individuelle standard au
 * départ de Saint-Gilles (SPEC-RESERVATION-03, AC-2, AC-4, AC-8).
 *
 * Portée unitaire : les règles pures que ce parcours met en jeu — planning et
 * jauge de Saint-Gilles, grille tarifaire Baleines, décompte des places.
 *
 * Non couvert à ce niveau : le passage effectif de la réservation à l'état
 * « payée » après débit bancaire (AC-8) est un effet d'orchestration, pas une
 * règle pure ; il relève de la couche d'intégration ou E2E.
 *
 * Fonctions visées :
 * - `src/utils/planning.ts` → `listerHeuresDepart({ port, date })`,
 *   `calculerJaugeMax({ port, date, heure })` ;
 * - `src/utils/tarification.ts` → `calculerMontantIndividuel(demande)` ;
 * - `src/utils/jauge.ts` → `calculerPlacesRestantes(etat)`.
 */
import { expect, test } from 'vitest';
import { calculerPlacesRestantes } from '../../src/utils/jauge';
import { calculerJaugeMax, listerHeuresDepart } from '../../src/utils/planning';
import { calculerMontantIndividuel } from '../../src/utils/tarification';

const PORT = 'saint-gilles';
const ACTIVITE = 'baleines';
const DATE_SORTIE = '2026-09-16';
const HEURES_ATTENDUES = ['07h00', '10h00', '14h00'];
const HEURE_CRENEAU = '10h00';
const JAUGE_MAX = 36;
const TARIF_ADULTE = 65;
const TARIF_ENFANT = 40;
const MONTANT_TOTAL_ATTENDU = 105;
const PLACES_DECOMPTEES = 2;

test('test_CASE_RES_400_reservation_individuelle_saint_gilles_payee_jauge_moins_2', () => {
  expect(listerHeuresDepart({ port: PORT, date: DATE_SORTIE })).toEqual(HEURES_ATTENDUES);
  expect(calculerJaugeMax({ port: PORT, date: DATE_SORTIE, heure: HEURE_CRENEAU })).toBe(
    JAUGE_MAX,
  );

  const montant = calculerMontantIndividuel({
    port: PORT,
    activite: ACTIVITE,
    adultes: 1,
    agesEnfants: [8],
  });
  expect(montant.tarifAdulte).toBe(TARIF_ADULTE);
  expect(montant.tarifEnfant).toBe(TARIF_ENFANT);
  expect(montant.montantTotal).toBe(MONTANT_TOTAL_ATTENDU);

  expect(
    calculerPlacesRestantes({ jaugeMax: JAUGE_MAX, placesReservees: PLACES_DECOMPTEES }),
  ).toBe(JAUGE_MAX - PLACES_DECOMPTEES);
});
