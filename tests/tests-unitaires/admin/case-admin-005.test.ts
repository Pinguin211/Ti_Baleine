/**
 * Test de CASE-ADMIN-005 — Affichage distinctif d'un créneau sans navire affecté avec le
 * statut « non affecté »
 * SPEC-ADMIN-01 | Cas limite #2
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-005.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * La persistance du créneau (navire absent) est simulée par un objet fourni
 * en dur. Le calcul du libellé « non affecté » et de l'indication visuelle
 * d'invitation à compléter l'affectation sont l'objet même du cas et ne sont
 * pas simulés.
 */
import { expect, test } from 'vitest';
import type { CreneauPlanningPersiste } from '../../../src/schemas/types/planning.types';
import { obtenirGrillePlanningConsolidee } from '../../../src/services/server/planning/obtenir-grille-planning-consolidee.service';

// Créneau : 20/08/2026 10:00 — Saint-Gilles — Navire affecté : aucun (null)
const CRENEAU_SANS_NAVIRE: CreneauPlanningPersiste = {
  id: 'C-20-08-2026-1000-SG',
  date: new Date(2026, 7, 20),
  heureDepart: '10:00',
  port: 'Saint-Gilles',
  activite: 'Sortie Baleines',
  navires: [],
  estOuvert: true,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_005_affichage_distinctif_creneau_sans_navire_non_affecte', () => {
  const grille = obtenirGrillePlanningConsolidee({
    date: CRENEAU_SANS_NAVIRE.date,
    creneaux: [CRENEAU_SANS_NAVIRE],
  });
  const [creneauAffiche] = grille.creneaux;

  // Alors le créneau apparaît dans la grille avec la mention explicite « non affecté » dans la section navire
  expect(creneauAffiche.navireLabel).toBe('non affecté');

  // Et une indication visuelle invite l'administrateur à compléter l'affectation
  expect(creneauAffiche.invitationCompleterAffectation).toBe(true);
});
