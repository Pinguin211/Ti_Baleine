/**
 * Test unitaire du cas CASE-RES-416 — Rejet ou abandon du paiement par carte
 * bancaire (SPEC-RESERVATION-03, AC-8 en négatif).
 *
 * Portée unitaire : la règle de décision sur l'issue du paiement — un rejet
 * bancaire donne « refusée », un abandon donne « abandonnée » — et la règle
 * de décompte qui en découle : aucune place n'est décomptée hors paiement
 * confirmé. Créer une réservation payée sans confirmation bancaire fait
 * échouer le test.
 *
 * Non couvert à ce niveau : l'absence effective de réservation enregistrée et
 * l'intégrité de la jauge après coup, qui sont des effets de bord observables
 * seulement en intégration ou en E2E.
 *
 * Fonctions visées : `src/utils/paiement.ts` → `deciderIssuePaiement(evenement)`
 * et `placesADecompter({ issue, placesDemandees })`.
 */
import { expect, test } from 'vitest';
import { deciderIssuePaiement, placesADecompter } from '../../src/utils/paiement';

const PLACES_DEMANDEES = 2;

test('test_CASE_RES_416_paiement_rejete_ou_abandonne_aucune_reservation_jauge_intacte', () => {
  const issueRejet = deciderIssuePaiement({ type: 'reponse-banque', accepte: false });
  expect(issueRejet).toBe('refusee');
  expect(placesADecompter({ issue: issueRejet, placesDemandees: PLACES_DEMANDEES })).toBe(0);

  const issueAbandon = deciderIssuePaiement({ type: 'abandon' });
  expect(issueAbandon).toBe('abandonnee');
  expect(placesADecompter({ issue: issueAbandon, placesDemandees: PLACES_DEMANDEES })).toBe(0);
});
