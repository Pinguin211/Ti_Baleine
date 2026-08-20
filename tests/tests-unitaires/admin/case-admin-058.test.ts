/**
 * CASE-ADMIN-058 — Désactivation du bouton de déclenchement d'envoi lorsque
 * aucun créneau du lendemain n'est sélectionné
 * SPEC-ADMIN-06 | Cas limite #1
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-058.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Rien n'est simulé : le calcul de l'état du bouton et le blocage de la
 * validation sont l'objet même du cas.
 */
import { expect, it } from 'vitest';
import {
  boutonEnvoiAlerteEstActif,
  validerEnvoiAlerte,
} from '../../../src/schemas/validation/alerts/selection-alerte.schema';

it('test_CASE_ADMIN_058_desactivation_bouton_envoi_aucun_creneau_selectionne', () => {
  // Étant donné l'administrateur sur l'écran d'alerte sans avoir coché de
  // créneau (0 créneau sélectionné)
  const selection = { creneauxSelectionnes: [], message: 'Alerte météo.\n\nWeather alert.' };

  // Quand il consulte le bouton d'envoi d'alerte
  const boutonActif = boutonEnvoiAlerteEstActif(selection);

  // Alors le bouton « Envoyer l'alerte » est grisé et désactivé
  expect(boutonActif).toBe(false);

  // Et toute soumission est impossible tant qu'au moins un créneau n'est pas
  // sélectionné
  expect(validerEnvoiAlerte(selection).valide).toBe(false);
});
