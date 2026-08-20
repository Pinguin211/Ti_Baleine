/**
 * CASE-ADMIN-057 — Activation immédiate de la mention d'avertissement sur le
 * site public pour les créneaux sous pré-alerte ayant des places ouvertes
 * SPEC-ADMIN-06 | Scénario 1, AC-4, REQ-019, R-25
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-057.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Rien n'est simulé : le calcul de la mention publique et de la disponibilité
 * de nouvelle réservation est l'objet même du cas.
 */
import { expect, it } from 'vitest';
import { obtenirAffichagePublicCreneauAlerte } from '../../../src/services/server/alerts/avertissement-public';

it('test_CASE_ADMIN_057_activation_mention_avertissement_site_public_creneau_pre_alerte', () => {
  // Étant donné un créneau du lendemain disposant de 10 places restantes et
  // passant à l'état « sous pré-alerte »
  const creneau = { sousPreAlerte: true, estOuvert: true };
  const placesRestantes = 10;

  // Quand un client consulte le planning sur le site de réservation public
  const affichage = obtenirAffichagePublicCreneauAlerte(creneau, placesRestantes);

  // Alors le créneau affiche distinctement la mention d'avertissement
  // « Sortie sous pré-alerte météo / risque d'annulation »
  expect(affichage.mention).toBe("Sortie sous pré-alerte météo / risque d'annulation");

  // Et le client est informé du risque avant toute nouvelle réservation
  expect(affichage.reservationEncoreAutorisee).toBe(true);
});
