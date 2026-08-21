/**
 * Test de CASE-ADMIN-041 — Calcul et affichage du taux de remplissage d'un
 * créneau standard à Saint-Gilles sur jauge de 36 places
 * (SPEC-ADMIN-05, Scénario 1, AC-1, REQ-010).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-041.md :
 * trois assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : le calcul du décompte, du taux et de la capacité
 * restante est l'objet même du cas.
 */
import { expect, test } from 'vitest';
import { determinerJaugeCreneau } from '../../../src/services/server/planning/determiner-jauge-creneau';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_041_calcul_taux_remplissage_creneau_standard_saint_gilles_jauge_36', () => {
  // Étant donné un créneau standard du mercredi à 10h00 à Saint-Gilles
  // mobilisant le Tikap et le Grand Bleu (jauge 36 places)
  // Et 27 billets actifs (BOOKING_ITEMS) enregistrés sur ce créneau
  const jaugeMax = determinerJaugeCreneau({
    port: 'SAINT_GILLES',
    jourSemaine: 'MERCREDI',
    heureDepart: '10:00',
  });
  const remplissage = calculerRemplissageCreneau({ jaugeMax, placesReservees: 27 });

  // Alors le décompte affiché est de 27/36 places
  expect({ placesReservees: remplissage.placesReservees, jaugeMax: remplissage.jaugeMax }).toEqual(
    { placesReservees: 27, jaugeMax: 36 }
  );

  // Et le taux de remplissage calculé et affiché est exactement de 75 % (27 ÷ 36)
  expect(remplissage.tauxRemplissagePourcent).toBe(75);

  // Et la capacité restante affichée est de 9 places
  expect(remplissage.placesRestantes).toBe(9);
});
