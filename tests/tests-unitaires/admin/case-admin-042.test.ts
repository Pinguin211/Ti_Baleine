/**
 * Test de CASE-ADMIN-042 — Calcul et affichage du taux de remplissage le
 * mardi et jeudi matin à Saint-Gilles sur jauge de 24 places
 * (SPEC-ADMIN-05, Scénario 2, AC-1, R-10).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-042.md :
 * quatre assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : la détermination de la jauge applicable (R-10) et le
 * calcul du taux sont l'objet même du cas.
 */
import { expect, test } from 'vitest';
import { determinerJaugeCreneau } from '../../../src/services/server/planning/determiner-jauge-creneau';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_042_calcul_taux_remplissage_mardi_jeudi_matin_saint_gilles_jauge_24', () => {
  // Étant donné un créneau du mardi à 07h00 à Saint-Gilles (Tikap détaché à
  // Saint-Leu, Grand Bleu seul)
  // Et 18 billets actifs enregistrés sur ce créneau
  const jaugeMax = determinerJaugeCreneau({
    port: 'SAINT_GILLES',
    jourSemaine: 'MARDI',
    heureDepart: '07:00',
  });
  const remplissage = calculerRemplissageCreneau({ jaugeMax, placesReservees: 18 });

  // Alors la jauge maximale prise en compte est de 24 places
  expect(remplissage.jaugeMax).toBe(24);

  // Et le décompte affiché est de 18/24 places
  expect({ placesReservees: remplissage.placesReservees, jaugeMax: remplissage.jaugeMax }).toEqual(
    { placesReservees: 18, jaugeMax: 24 }
  );

  // Et le taux de remplissage affiché est de 75 % (18 ÷ 24)
  expect(remplissage.tauxRemplissagePourcent).toBe(75);

  // Et la capacité restante affichée est de 6 places
  expect(remplissage.placesRestantes).toBe(6);
});
