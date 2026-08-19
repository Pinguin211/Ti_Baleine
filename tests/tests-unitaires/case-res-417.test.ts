/**
 * Test unitaire du cas CASE-RES-417 — Verrouillage temporaire des places
 * pendant le paiement (SPEC-RESERVATION-03, AC-2, AC-8).
 *
 * ⚠️ La durée du verrou (10 minutes) est une hypothèse non validée par le
 * client (question ouverte n°12 §11 du CDC v4). Elle est isolée dans la
 * constante `DUREE_VERROU_MINUTES` : si la direction retient une autre durée,
 * seule cette valeur change — le comportement vérifié reste identique.
 *
 * Portée unitaire : les places verrouillées sortent des places disponibles
 * (un concurrent voit 0 place), le verrou tient avant son échéance et est
 * expiré après. Le temps est fourni en paramètre, sans attente réelle. Un
 * verrou jamais libéré fait échouer la dernière assertion.
 *
 * Non couvert à ce niveau : la remise à disposition effective des places et
 * le refus opposé au client concurrent, qui découlent de ces règles mais
 * relèvent de l'orchestration.
 *
 * Fonctions visées : `src/utils/verrou-panier.ts` →
 * `estVerrouExpire({ engageLe, maintenant, dureeMinutes })` ;
 * `src/utils/jauge.ts` → `calculerPlacesRestantes(etat)`.
 */
import { expect, test } from 'vitest';
import { calculerPlacesRestantes } from '../../src/utils/jauge';
import { estVerrouExpire } from '../../src/utils/verrou-panier';

const JAUGE_MAX = 36;
const PLACES_RESERVEES = 34;
const PLACES_VERROUILLEES = 2;
const DUREE_VERROU_MINUTES = 10;
const ENGAGE_LE = new Date('2026-09-15T09:00:00+04:00');
const AVANT_ECHEANCE = new Date('2026-09-15T09:09:00+04:00');
const APRES_ECHEANCE = new Date('2026-09-15T09:11:00+04:00');

test('test_CASE_RES_417_verrou_10_min_pendant_paiement_liberation_a_expiration', () => {
  expect(
    calculerPlacesRestantes({
      jaugeMax: JAUGE_MAX,
      placesReservees: PLACES_RESERVEES,
      placesVerrouillees: PLACES_VERROUILLEES,
    }),
  ).toBe(0);

  expect(
    estVerrouExpire({
      engageLe: ENGAGE_LE,
      maintenant: AVANT_ECHEANCE,
      dureeMinutes: DUREE_VERROU_MINUTES,
    }),
  ).toBe(false);
  expect(
    estVerrouExpire({
      engageLe: ENGAGE_LE,
      maintenant: APRES_ECHEANCE,
      dureeMinutes: DUREE_VERROU_MINUTES,
    }),
  ).toBe(true);
});
