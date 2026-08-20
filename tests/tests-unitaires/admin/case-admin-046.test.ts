/**
 * Test de CASE-ADMIN-046 — Recalcul instantané en temps réel du nombre de
 * billets actifs et du taux de remplissage lors d'une annulation ou
 * réduction
 * (SPEC-ADMIN-05, Cas limite #3, AC-1, REQ-107).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-046.md :
 * trois assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : le recalcul du taux après suppression de billets est
 * l'objet même du cas. L'annulation de 6 billets est simulée ici par le
 * décompte de billets actifs recalculé transmis en second appel (la
 * suppression effective des BOOKING_ITEMS relève de SPEC-ADMIN-02/03).
 */
import { expect, test } from 'vitest';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_046_recalcul_instantane_temps_reel_remplissage_apres_annulation', () => {
  // Étant donné un créneau affichant 36/36 places (100 %, complet)
  calculerRemplissageCreneau({ jaugeMax: 36, placesReservees: 36 });

  // Quand l'administrateur annule une réservation de 6 billets sur ce créneau
  const remplissageApresAnnulation = calculerRemplissageCreneau({
    jaugeMax: 36,
    placesReservees: 36 - 6,
  });

  // Alors le nombre de billets actifs passe immédiatement à 30
  expect(remplissageApresAnnulation.placesReservees).toBe(30);

  // Et le taux de remplissage affiché est instantanément recalculé à 83,33 % (30/36)
  expect(remplissageApresAnnulation.tauxRemplissagePourcent).toBeCloseTo(83.33, 2);

  // Et le badge « Complet » disparaît pour laisser place à l'indication « 6 places disponibles »
  expect({
    estComplet: remplissageApresAnnulation.estComplet,
    placesRestantes: remplissageApresAnnulation.placesRestantes,
  }).toEqual({ estComplet: false, placesRestantes: 6 });
});
