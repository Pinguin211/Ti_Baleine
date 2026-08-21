/**
 * Test de CASE-ADMIN-003 — Présence obligatoire de l'indicateur visuel et du badge
 * « Sous pré-alerte » sur un créneau alerté
 * SPEC-ADMIN-01 | Scénario 2, AC-2, Cas limite #6, R-25
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-003.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * L'état d'alerte du créneau est fourni en dur (persistance simulée). Le
 * calcul du badge et du marqueur de style à partir de l'état sousPreAlerte
 * est l'objet même du cas et n'est pas simulé.
 */
import { expect, test } from 'vitest';
import type { CreneauPlanningPersiste } from '../../../src/schemas/types/planning.types';
import { obtenirGrillePlanningConsolidee } from '../../../src/services/server/planning/obtenir-grille-planning-consolidee.service';

// Créneau : 19/08/2026 07:00 — Saint-Gilles — État système : SOUS_PRE_ALERTE
const CRENEAU_ALERTE: CreneauPlanningPersiste = {
  id: 'C-19-08-2026-0700-SG',
  date: new Date(2026, 7, 19),
  heureDepart: '07:00',
  port: 'Saint-Gilles',
  activite: 'Sortie Baleines',
  estOuvert: true,
  sousPreAlerte: true,
};

test('test_CASE_ADMIN_003_presence_indicateur_badge_sous_pre_alerte_sur_creneau', () => {
  const grille = obtenirGrillePlanningConsolidee({
    date: CRENEAU_ALERTE.date,
    creneaux: [CRENEAU_ALERTE],
  });
  const [creneauAffiche] = grille.creneaux;

  // Alors la carte du créneau comporte un badge visuel distinctif « Sous pré-alerte »
  expect(creneauAffiche.badgePreAlerte).toBe('Sous pré-alerte');

  // Et un style visuel spécifique (icône d'alerte / couleur dédiée) différencie ce créneau des créneaux normaux
  expect(creneauAffiche.styleAlerteApplique).toBe(true);
});
