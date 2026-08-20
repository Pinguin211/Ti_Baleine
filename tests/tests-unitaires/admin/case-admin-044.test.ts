/**
 * Test de CASE-ADMIN-044 — Affichage d'un créneau à 0 billet actif avec
 * mention explicite 0 % et 0 place réservée
 * (SPEC-ADMIN-05, Cas limite #1).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-044.md :
 * trois assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : le calcul du taux (division par la jauge, y compris
 * le cas 0 billet) est l'objet même du cas.
 */
import { expect, test } from 'vitest';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_044_affichage_creneau_0_billet_actif_taux_0_pourcent', () => {
  // Étant donné un créneau standard de 36 places à Saint-Gilles n'ayant aucun
  // billet actif
  const remplissage = calculerRemplissageCreneau({ jaugeMax: 36, placesReservees: 0 });

  // Alors le décompte affiche 0/36 places
  expect({ placesReservees: remplissage.placesReservees, jaugeMax: remplissage.jaugeMax }).toEqual(
    { placesReservees: 0, jaugeMax: 36 }
  );

  // Et le taux de remplissage affiché est de 0 %
  expect(remplissage.tauxRemplissagePourcent).toBe(0);

  // Et la totalité des 36 places est indiquée comme disponible
  expect(remplissage.placesRestantes).toBe(36);
});
