/**
 * Test de CASE-ADMIN-045 — Affichage d'un créneau complet avec affichage à
 * 100 % et badge « Complet »
 * (SPEC-ADMIN-05, Cas limite #2).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-045.md :
 * quatre assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : le calcul du taux et la détermination du badge
 * « Complet » sont l'objet même du cas.
 */
import { expect, test } from 'vitest';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_045_affichage_creneau_complet_taux_100_pourcent_badge_complet', () => {
  // Étant donné un créneau de Saint-Leu (jauge 12) ayant 12 billets actifs
  // enregistrés
  const remplissage = calculerRemplissageCreneau({ jaugeMax: 12, placesReservees: 12 });

  // Alors le décompte indique 12/12 places
  expect({ placesReservees: remplissage.placesReservees, jaugeMax: remplissage.jaugeMax }).toEqual(
    { placesReservees: 12, jaugeMax: 12 }
  );

  // Et le taux de remplissage affiche 100 %
  expect(remplissage.tauxRemplissagePourcent).toBe(100);

  // Et un badge « Complet » apparaît distinctement sur la fiche du créneau
  expect(remplissage.estComplet).toBe(true);

  // Et la disponibilité restante indiquée est de 0 place
  expect(remplissage.placesRestantes).toBe(0);
});
