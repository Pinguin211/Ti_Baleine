/**
 * Test de CASE-ADMIN-002 — Consultation du détail d'un créneau avec activité et navires mobilisés
 * SPEC-ADMIN-01 | Scénario 2, AC-1, REQ-010
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-002.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * Le créneau consulté est fourni en dur (persistance simulée). Le formatage
 * du panneau de détail (activité, navires, port) est l'objet même du cas et
 * n'est pas simulé.
 */
import { expect, test } from 'vitest';
import type { CreneauDetailPersiste } from '../../../src/schemas/types/planning.types';
import { obtenirDetailCreneau } from '../../../src/services/server/planning/obtenir-detail-creneau.service';

// Créneau sélectionné : 19/08/2026 07:00 — Saint-Gilles (Mercredi)
// Activité configurée : Sortie Baleines — Navires affectés : Tikap + Grand Bleu
const CRENEAU: CreneauDetailPersiste = {
  id: 'C-19-08-2026-0700-SG',
  date: new Date(2026, 7, 19),
  heureDepart: '07:00',
  port: 'Saint-Gilles',
  activite: 'Sortie Baleines',
  navires: ['Tikap', 'Grand Bleu'],
  estOuvert: true,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_002_consultation_detail_creneau_activite_navires_mobilises', () => {
  const detail = obtenirDetailCreneau({ creneau: CRENEAU });

  // Alors le panneau de détail indique explicitement l'activité « Sortie Baleines »
  expect(detail.activite).toBe('Sortie Baleines');

  // Et le panneau liste les navires mobilisés « Tikap » et « Grand Bleu »
  expect(detail.navires).toEqual(['Tikap', 'Grand Bleu']);

  // Et le détail du port d'embarquement « Saint-Gilles » est rappelé
  expect(detail.port).toBe('Saint-Gilles');
});
