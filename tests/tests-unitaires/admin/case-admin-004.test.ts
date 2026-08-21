/**
 * Test de CASE-ADMIN-004 — Affichage d'un état vide explicite lorsqu'aucun créneau n'est programmé
 * SPEC-ADMIN-01 | Cas limite #1
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-004.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * La persistance (0 créneau en base) est simulée par un tableau vide fourni
 * en dur. La production du message d'état vide et l'absence de plantage sont
 * l'objet même du cas et ne sont pas simulées.
 */
import { expect, test } from 'vitest';
import { obtenirGrillePlanningConsolidee } from '../../../src/services/server/planning/obtenir-grille-planning-consolidee.service';

// Date consultée : 25/12/2026 — Nombre de créneaux en base : 0
const DATE_SANS_CRENEAU = new Date(2026, 11, 25);

test('test_CASE_ADMIN_004_affichage_etat_vide_explicite_aucun_creneau_programme', () => {
  // Alors le système affiche un message d'état vide explicite « Aucun créneau programmé pour cette journée »
  const grille = obtenirGrillePlanningConsolidee({ date: DATE_SANS_CRENEAU, creneaux: [] });
  expect(grille.messageEtatVide).toBe('Aucun créneau programmé pour cette journée');

  // Et aucun écran figé, spinner infini ni erreur JavaScript n'apparaît
  expect(() =>
    obtenirGrillePlanningConsolidee({ date: DATE_SANS_CRENEAU, creneaux: [] })
  ).not.toThrow();
});
