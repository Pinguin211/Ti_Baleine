/**
 * Test de CASE-ADMIN-072 — Calcul et affichage du taux de remplissage le
 * mardi et jeudi après-midi à Saint-Gilles sur jauge pleine de 36 places
 * (SPEC-ADMIN-05, Portée §2, R-01, R-10).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-072.md :
 * trois assertions, une par ligne « Alors »/« Et ».
 *
 * Rien n'est simulé : la restauration de la jauge pleine l'après-midi
 * (retour du Tikap) et le calcul du taux sont l'objet même du cas.
 */
import { expect, test } from 'vitest';
import { determinerJaugeCreneau } from '../../../src/services/server/planning/determiner-jauge-creneau';
import { calculerRemplissageCreneau } from '../../../src/services/server/capacity/calculer-remplissage-creneau';

test('test_CASE_ADMIN_072_calcul_taux_remplissage_mardi_jeudi_apres_midi_saint_gilles_jauge_36', () => {
  // Étant donné le créneau du mardi à 14h00 à Saint-Gilles (Tikap revenu de
  // Saint-Leu + Grand Bleu présents)
  // Et 30 billets actifs enregistrés sur ce créneau
  const jaugeMax = determinerJaugeCreneau({
    port: 'SAINT_GILLES',
    jourSemaine: 'MARDI',
    heureDepart: '14:00',
  });
  const remplissage = calculerRemplissageCreneau({ jaugeMax, placesReservees: 30 });

  // Alors la jauge maximale appliquée est de 36 places (flotte complète réunie)
  expect(remplissage.jaugeMax).toBe(36);

  // Et le décompte affiché est de 30/36 places
  expect({ placesReservees: remplissage.placesReservees, jaugeMax: remplissage.jaugeMax }).toEqual(
    { placesReservees: 30, jaugeMax: 36 }
  );

  // Et le taux de remplissage affiché est de 83,33 %
  expect(remplissage.tauxRemplissagePourcent).toBeCloseTo(83.33, 2);
});
