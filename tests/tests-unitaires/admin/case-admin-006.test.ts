/**
 * Test de CASE-ADMIN-006 — Affichage distinctif d'un créneau sans type d'activité avec le
 * statut « type non renseigné »
 * SPEC-ADMIN-01 | Cas limite #3
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-006.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * La persistance du créneau (activité absente) est simulée par un objet
 * fourni en dur. Le calcul du libellé « type non renseigné » et la stabilité
 * de l'affichage sont l'objet même du cas et ne sont pas simulés.
 */
import { expect, test } from 'vitest';
import type { CreneauPlanningPersiste } from '../../../src/schemas/types/planning.types';
import { obtenirGrillePlanningConsolidee } from '../../../src/services/server/planning/obtenir-grille-planning-consolidee.service';

// Créneau : 21/08/2026 14:00 — Saint-Gilles — Type d'activité : non renseigné (null)
const CRENEAU_SANS_ACTIVITE: CreneauPlanningPersiste = {
  id: 'C-21-08-2026-1400-SG',
  date: new Date(2026, 7, 21),
  heureDepart: '14:00',
  port: 'Saint-Gilles',
  activite: null,
  estOuvert: true,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_006_affichage_creneau_sans_activite_type_non_renseigne', () => {
  // Alors la zone d'activité affiche distinctement le libellé « type non renseigné »
  const grille = obtenirGrillePlanningConsolidee({
    date: CRENEAU_SANS_ACTIVITE.date,
    creneaux: [CRENEAU_SANS_ACTIVITE],
  });
  expect(grille.creneaux[0]?.activiteLabel).toBe('type non renseigné');

  // Et la fiche du créneau reste consultable sans plantage
  expect(() =>
    obtenirGrillePlanningConsolidee({ date: CRENEAU_SANS_ACTIVITE.date, creneaux: [CRENEAU_SANS_ACTIVITE] })
  ).not.toThrow();
});
