/**
 * CASE-ADMIN-053 — Préremplissage instantané de la zone de texte par sélection
 * du template type codé en dur « Incident technique »
 * SPEC-ADMIN-06 | Portée §3, AC-2, REQ-018, R-23
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-053.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Rien n'est simulé : le catalogue de templates et l'adaptation du texte sont
 * l'objet même du cas.
 */
import { expect, it } from 'vitest';
import {
  obtenirTemplateAlerte,
  composerMessageBilingue,
  preremplirZoneMessageAvecTemplate,
  modifierZoneMessageAlerte,
} from '../../../src/services/server/alerts/templates-alerte';

it('test_CASE_ADMIN_053_preremplissage_instantane_template_incident_technique', () => {
  // Étant donné l'administrateur préparant une alerte pour un navire en panne
  const template = obtenirTemplateAlerte('INCIDENT_TECHNIQUE');
  const messageCombineAttendu = composerMessageBilingue(template.texteFr, template.texteEn);

  // Quand il sélectionne le template « Incident technique »
  const zone = preremplirZoneMessageAvecTemplate('INCIDENT_TECHNIQUE');

  // Alors la zone de texte est instantanément remplie avec le modèle bilingue
  // d'incident technique
  expect(zone.valeur).toBe(messageCombineAttendu);

  // Et l'administrateur peut adapter le texte avant diffusion
  const zoneAdaptee = modifierZoneMessageAlerte(zone, `${zone.valeur}\n\nMaintenance imprévue.`);
  expect(zoneAdaptee.valeur).toBe(`${messageCombineAttendu}\n\nMaintenance imprévue.`);
});
