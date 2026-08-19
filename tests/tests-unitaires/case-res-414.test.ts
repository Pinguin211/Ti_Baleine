/**
 * Test unitaire du cas CASE-RES-414 — Réservation de la dernière place
 * disponible d'un créneau (SPEC-RESERVATION-03, AC-2, AC-8).
 *
 * Portée unitaire : la dernière place reste vendable (1 demandée sur
 * 1 restante), le montant d'un adulte est de 65 €, la jauge tombe à 0 et le
 * créneau bascule à « complet » — état sous lequel il n'est plus proposé aux
 * clients suivants. Laisser un créneau complet réservable fait échouer le
 * test.
 *
 * Non couvert à ce niveau : le passage effectif de la réservation à l'état
 * « payée » et le retrait du créneau de la liste publique, qui découlent de
 * ces règles mais relèvent de l'orchestration.
 *
 * Fonctions visées : `src/utils/jauge.ts` → `peutAccueillir`,
 * `calculerPlacesRestantes`, `determinerStatutCreneau` ;
 * `src/utils/tarification.ts` → `calculerMontantIndividuel`.
 */
import { expect, test } from 'vitest';
import {
  calculerPlacesRestantes,
  determinerStatutCreneau,
  peutAccueillir,
} from '../../src/utils/jauge';
import { calculerMontantIndividuel } from '../../src/utils/tarification';

const JAUGE_MAX = 36;
const PLACES_RESERVEES_AVANT = 35;
const TARIF_ADULTE = 65;

test('test_CASE_RES_414_derniere_place_acceptee_creneau_complet_retire_de_l_offre', () => {
  expect(peutAccueillir({ placesRestantes: 1, placesDemandees: 1 }).accepte).toBe(true);

  const montant = calculerMontantIndividuel({
    port: 'saint-gilles',
    activite: 'baleines',
    adultes: 1,
    agesEnfants: [],
  });
  expect(montant.montantTotal).toBe(TARIF_ADULTE);

  const placesApres = calculerPlacesRestantes({
    jaugeMax: JAUGE_MAX,
    placesReservees: PLACES_RESERVEES_AVANT + 1,
  });
  expect(placesApres).toBe(0);
  expect(
    determinerStatutCreneau({ placesRestantes: placesApres, clos: false, privatise: false }),
  ).toBe('complet');
});
