/**
 * Test de CASE-ADMIN-043 — Calcul et affichage du taux de remplissage le
 * mardi et jeudi matin à Saint-Leu sur jauge de 12 places
 * (SPEC-ADMIN-05, Portée §2, AC-1, R-01).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-043.md :
 * quatre assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : la détermination de la jauge de Saint-Leu (R-01) et le
 * calcul du taux sont l'objet même du cas.
 */
import { expect, test } from 'vitest';
import { determinerJaugeCreneau } from '../../../src/services/server/planning/determiner-jauge-creneau';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_043_calcul_taux_remplissage_mardi_jeudi_matin_saint_leu_jauge_12', () => {
  // Étant donné le créneau du jeudi à 09h00 à Saint-Leu (navire Tikap)
  // Et 9 billets actifs enregistrés sur ce créneau
  const jaugeMax = determinerJaugeCreneau({
    port: 'SAINT_LEU',
    jourSemaine: 'JEUDI',
    heureDepart: '09:00',
  });
  const remplissage = calculerRemplissageCreneau({ jaugeMax, placesReservees: 9 });

  // Alors la jauge maximale appliquée est de 12 places
  expect(remplissage.jaugeMax).toBe(12);

  // Et le décompte affiché est de 9/12 places
  expect({ placesReservees: remplissage.placesReservees, jaugeMax: remplissage.jaugeMax }).toEqual(
    { placesReservees: 9, jaugeMax: 12 }
  );

  // Et le taux de remplissage affiché est de 75 % (9 ÷ 12)
  expect(remplissage.tauxRemplissagePourcent).toBe(75);

  // Et la capacité disponible affichée est de 3 places
  expect(remplissage.placesRestantes).toBe(3);
});
