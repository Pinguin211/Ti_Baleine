/**
 * Test de CASE-ADMIN-007 — Consultation du planning en continu 24h/24 sans restriction horaire
 * SPEC-ADMIN-01 | Cas limite #4, Portée §1
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-007.md :
 * une assertion par ligne « Alors » / « Et », soit une seule (pas de ligne « Et »).
 *
 * L'horloge de consultation est simulée (instant fourni en dur, ce qui
 * entoure le cas). L'absence de restriction horaire pour l'administrateur
 * est l'objet même du cas et n'est pas simulée.
 *
 * Hypothèse : la section Données ne précise que l'heure de consultation
 * (23:45 ou 04:15, à titre d'exemples équivalents) sans jour calendaire ;
 * le jour 19/08/2026 est utilisé uniquement pour construire un objet Date
 * valide et n'est pas une valeur métier vérifiée par ce cas.
 */
import { expect, test } from 'vitest';
import { verifierAccesPlanningContinu } from '../../../src/services/server/planning/verifier-acces-planning-continu.service';

// Heure de consultation : 23h45 (heure nocturne) — Rôle : Administrateur
const INSTANT_CONSULTATION = new Date(2026, 7, 19, 23, 45);

test('test_CASE_ADMIN_007_consultation_planning_continu_24h_24_sans_restriction', () => {
  const acces = verifierAccesPlanningContinu({ instant: INSTANT_CONSULTATION, role: 'Administrateur' });

  // Alors l'ensemble des créneaux passés, présents et futurs de la période s'affiche sans blocage ni restriction
  expect(acces).toEqual({ accesAutorise: true, restrictionHoraireAppliquee: false });
});
