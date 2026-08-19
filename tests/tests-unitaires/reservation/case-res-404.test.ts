/**
 * Test unitaire du cas CASE-RES-404 — Bascule français/anglais sans perte des
 * données saisies (SPEC-RESERVATION-03, AC-1).
 *
 * Portée unitaire : la fonction pure de bascule de langue de l'état du
 * tunnel, appliquée à deux étapes distinctes — vers l'anglais après la saisie
 * des passagers, puis retour au français après celle des coordonnées. Aucune
 * donnée saisie n'est perdue et le montant reste 105 €. Une implémentation
 * qui réinitialiserait le panier fait échouer le test.
 *
 * Non couvert à ce niveau : la qualité de la traduction et le rendu de
 * l'interface, qui relèvent des composants React.
 *
 * Fonction visée : `src/utils/panier.ts` → `basculerLangue(etat, langue)`.
 */
import { expect, test } from 'vitest';
import { basculerLangue } from '../../src/utils/panier';

const SELECTION = {
  port: 'saint-gilles',
  activite: 'baleines',
  date: '2026-09-16',
  heure: '10h00',
};
const PASSAGERS = { adultes: 1, agesEnfants: [8] };
const CONTACT = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@test.re',
  telephoneMobile: '+262692123456',
};
const MONTANT_TOTAL = 105;

const ETAT_INITIAL = {
  langue: 'fr',
  selection: SELECTION,
  passagers: PASSAGERS,
  contact: undefined,
  montantTotal: MONTANT_TOTAL,
};

test('test_CASE_RES_404_bascule_fr_en_conserve_les_donnees_saisies', () => {
  const etatEnAnglais = basculerLangue(ETAT_INITIAL, 'en');
  expect(etatEnAnglais.langue).toBe('en');
  expect(etatEnAnglais.selection).toEqual(SELECTION);
  expect(etatEnAnglais.passagers).toEqual(PASSAGERS);

  const etatFinal = basculerLangue({ ...etatEnAnglais, contact: CONTACT }, 'fr');
  expect(etatFinal.langue).toBe('fr');
  expect(etatFinal.selection).toEqual(SELECTION);
  expect(etatFinal.passagers).toEqual(PASSAGERS);
  expect(etatFinal.contact).toEqual(CONTACT);
  expect(etatFinal.montantTotal).toBe(MONTANT_TOTAL);
});
