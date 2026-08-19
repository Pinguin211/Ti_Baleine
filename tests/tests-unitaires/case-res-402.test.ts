/**
 * Test unitaire du cas CASE-RES-402 — Réservation sur un créneau sous alerte
 * de pré-annulation (SPEC-RESERVATION-03, AC-7, AC-8).
 *
 * Portée unitaire : la règle d'affichage de la mention d'avertissement — tout
 * créneau sous alerte émise la veille et disposant encore de places libres
 * doit la porter —, évaluée avant la réservation (4 places libres) puis après
 * (2 places), ainsi que le montant de 2 adultes et le décompte des places.
 * Seule la nécessité d'afficher la mention est vérifiée, jamais son texte,
 * dont la formulation n'est pas validée par la direction.
 *
 * Non couvert à ce niveau : l'émission de l'alerte par l'administrateur
 * (SPEC-ADMIN-06, hors périmètre) et le passage effectif à l'état « payée ».
 *
 * Fonctions visées : `src/utils/alerte-creneau.ts` →
 * `doitAfficherMentionAlerte(etat)` ; `src/utils/tarification.ts` ;
 * `src/utils/jauge.ts`.
 */
import { expect, test } from 'vitest';
import { doitAfficherMentionAlerte } from '../../src/utils/alerte-creneau';
import { calculerPlacesRestantes } from '../../src/utils/jauge';
import { calculerMontantIndividuel } from '../../src/utils/tarification';

const ALERTE_EMISE_LE = new Date('2026-09-01T18:00:00+04:00');
const JAUGE_MAX = 36;
const PLACES_LIBRES_AVANT = 4;
const NB_ADULTES = 2;
const MONTANT_TOTAL_ATTENDU = 130;
const PLACES_LIBRES_APRES = 2;

test('test_CASE_RES_402_creneau_sous_alerte_mention_affichee_avant_et_apres_reservation', () => {
  expect(
    doitAfficherMentionAlerte({
      alerteEmiseLe: ALERTE_EMISE_LE,
      placesRestantes: PLACES_LIBRES_AVANT,
    }),
  ).toBe(true);

  const montant = calculerMontantIndividuel({
    port: 'saint-gilles',
    activite: 'baleines',
    adultes: NB_ADULTES,
    agesEnfants: [],
  });
  expect(montant.montantTotal).toBe(MONTANT_TOTAL_ATTENDU);

  const placesApres = calculerPlacesRestantes({
    jaugeMax: JAUGE_MAX,
    placesReservees: JAUGE_MAX - PLACES_LIBRES_AVANT + NB_ADULTES,
  });
  expect(placesApres).toBe(PLACES_LIBRES_APRES);
  expect(
    doitAfficherMentionAlerte({ alerteEmiseLe: ALERTE_EMISE_LE, placesRestantes: placesApres }),
  ).toBe(true);
});
