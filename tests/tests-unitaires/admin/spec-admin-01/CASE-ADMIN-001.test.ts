/**
 * CASE-ADMIN-001 — Affichage consolidé de la grille multi-sites sur poste Desktop
 * SPEC-ADMIN-01 | Scénario 1 | AC-1 | REQ-009 | R-01 | C-03 | C-04
 */
import { describe, it, expect } from 'vitest';
import { getConsolidatedPlanningGrid } from '../../../../src/services/server/planning.service';

describe('CASE-ADMIN-001', () => {
  it('test_CASE_ADMIN_001_affichage_consolide_grille_planning_multisites_desktop', () => {
    // Étant donné la date consultée configurée sur le mardi 18 août 2026
    const dateConsultee = new Date(2026, 7, 18);

    // Quand l'administrateur accède à la vue consolidée du planning
    const grille = getConsolidatedPlanningGrid(dateConsultee);

    // Alors la grille affiche de façon distincte les créneaux du port de Saint-Gilles à 7h00, 10h00 et 14h00
    const creneauxSaintGilles = grille.filter((c) => c.port === 'Saint-Gilles').map((c) => c.heure);
    expect(creneauxSaintGilles).toEqual(['7h00', '10h00', '14h00']);

    // Et la grille affiche le créneau du port de Saint-Leu à 9h00 (départ mardi/jeudi)
    const creneauxSaintLeu = grille.filter((c) => c.port === 'Saint-Leu').map((c) => c.heure);
    expect(creneauxSaintLeu).toEqual(['9h00']);

    // Et chaque créneau affiche clairement son port de départ, son horaire et son état opérationnel
    expect(grille.every((c) => Boolean(c.port) && Boolean(c.heure) && Boolean(c.etatOperationnel))).toBe(true);
  });
});
