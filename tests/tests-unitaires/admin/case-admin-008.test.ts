/**
 * Test de CASE-ADMIN-008 — Gestion d'une perte de connexion réseau pendant le chargement
 * du planning
 * SPEC-ADMIN-01 | Cas limite #5
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-008.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * Le réseau est simulé (fonction de chargement mockée qui rejette avec une
 * erreur HTTP 503, ce qui entoure le cas). La construction du message
 * d'erreur explicite et l'exposition d'une action de réessai sont l'objet
 * même du cas et ne sont pas simulées.
 */
import { expect, test, vi } from 'vitest';
import { chargerPlanningAvecGestionErreur } from '../../../src/hooks/domain/planning/use-planning-resilience';

test('test_CASE_ADMIN_008_gestion_perte_reseau_chargement_planning_erreur_retry', async () => {
  // État réseau : Erreur HTTP 503 / Déconnexion socket — Action déclenchée : chargement initial du planning
  const chargementPlanning = vi.fn().mockRejectedValue(new Error('HTTP 503'));

  const etat = await chargerPlanningAvecGestionErreur(chargementPlanning);

  // Alors l'interface affiche un message d'erreur explicite (« Impossible de charger le planning »)
  expect(etat.messageErreur).toBe('Impossible de charger le planning');

  // Et un bouton d'action « Réessayer » est mis à disposition de l'administrateur
  expect(typeof etat.reessayer).toBe('function');
});
