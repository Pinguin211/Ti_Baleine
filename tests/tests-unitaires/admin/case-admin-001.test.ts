/**
 * Test de CASE-ADMIN-001 — Affichage consolidé de la grille multi-sites sur poste Desktop
 * SPEC-ADMIN-01 | Scénario 1, AC-1, REQ-009, R-01, C-03, C-04
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-001.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * La persistance des créneaux est simulée (tableau fourni en dur, ce qui
 * entoure le cas). La consolidation par port/heure et le calcul de l'état
 * opérationnel affiché sont l'objet même du cas et ne sont pas simulés.
 */
import { expect, test } from 'vitest';
import type { CreneauPlanningPersiste } from '../../../src/schemas/types/planning.types';
import { obtenirGrillePlanningConsolidee } from '../../../src/services/server/planning/obtenir-grille-planning-consolidee.service';

// Date consultée : mardi 18 août 2026 (jour de rotation Saint-Leu)
const DATE_CONSULTEE = new Date(2026, 7, 18);

// Créneaux Saint-Gilles attendus : 7h00, 10h00, 14h00 — Créneau Saint-Leu attendu : 9h00 (mardi/jeudi)
const CRENEAUX_PERSISTES: CreneauPlanningPersiste[] = [
  {
    id: 'C-SG-0700',
    date: DATE_CONSULTEE,
    heureDepart: '07:00',
    port: 'Saint-Gilles',
    activite: 'Sortie Baleines',
    estOuvert: true,
    sousPreAlerte: false,
  },
  {
    id: 'C-SG-1000',
    date: DATE_CONSULTEE,
    heureDepart: '10:00',
    port: 'Saint-Gilles',
    activite: 'Sortie Baleines',
    estOuvert: true,
    sousPreAlerte: false,
  },
  {
    id: 'C-SG-1400',
    date: DATE_CONSULTEE,
    heureDepart: '14:00',
    port: 'Saint-Gilles',
    activite: 'Sortie Baleines',
    estOuvert: true,
    sousPreAlerte: false,
  },
  {
    id: 'C-SL-0900',
    date: DATE_CONSULTEE,
    heureDepart: '09:00',
    port: 'Saint-Leu',
    activite: 'Sortie Baleines',
    estOuvert: true,
    sousPreAlerte: false,
  },
];

test('test_CASE_ADMIN_001_affichage_consolide_grille_planning_multisites_desktop', () => {
  const grille = obtenirGrillePlanningConsolidee({
    date: DATE_CONSULTEE,
    creneaux: CRENEAUX_PERSISTES,
  });

  // Alors la grille affiche de façon distincte les créneaux du port de Saint-Gilles à 7h00, 10h00 et 14h00
  expect(
    grille.creneaux.filter((creneau) => creneau.port === 'Saint-Gilles').map((creneau) => creneau.heureDepart)
  ).toEqual(['07:00', '10:00', '14:00']);

  // Et la grille affiche le créneau du port de Saint-Leu à 9h00 (départ mardi/jeudi)
  expect(
    grille.creneaux.filter((creneau) => creneau.port === 'Saint-Leu').map((creneau) => creneau.heureDepart)
  ).toEqual(['09:00']);

  // Et chaque créneau affiche clairement son port de départ, son horaire et son état opérationnel
  expect(
    grille.creneaux.every(
      (creneau) =>
        typeof creneau.port === 'string' &&
        typeof creneau.heureDepart === 'string' &&
        typeof creneau.etatOperationnel === 'string'
    )
  ).toBe(true);
});
