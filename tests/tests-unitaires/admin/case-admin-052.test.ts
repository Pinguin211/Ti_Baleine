/**
 * CASE-ADMIN-052 — Préremplissage instantané de la zone de texte par sélection
 * du template type codé en dur « Météo défavorable »
 * SPEC-ADMIN-06 | Scénario 1, AC-2, REQ-018, R-23
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-052.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Rien n'est simulé : le catalogue de templates codés en dur et le
 * préremplissage de la zone de texte sont l'objet même du cas.
 */
import { expect, it } from 'vitest';
import {
  obtenirTemplateAlerte,
  composerMessageBilingue,
  preremplirZoneMessageAvecTemplate,
} from '../../../src/services/server/alerts/templates-alerte';

it('test_CASE_ADMIN_052_preremplissage_instantane_template_meteo_defavorable', () => {
  // Étant donné l'administrateur sur la fenêtre d'envoi d'alerte avec un champ
  // de message initialement vide
  const template = obtenirTemplateAlerte('METEO_DEFAVORABLE');
  const messageCombineAttendu = composerMessageBilingue(template.texteFr, template.texteEn);

  // Quand il clique sur le bouton de template « Météo défavorable »
  const zone = preremplirZoneMessageAvecTemplate('METEO_DEFAVORABLE');

  // Alors la zone de texte est instantanément préremplie avec le modèle type
  // bilingue météo
  expect(zone.valeur).toBe(messageCombineAttendu);

  // Et le texte demeure entièrement éditable par l'administrateur
  expect(zone.modifiable).toBe(true);
});
