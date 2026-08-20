/**
 * Test de CASE-ADMIN-068 — Cloisonnement de sécurité et interdiction d'accès
 * aux réglages de configuration pour les utilisateurs du site public
 * (SPEC-ADMIN-07, Portée §4, Contrainte C-16, REQ-103).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-068.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seule la persistance des créneaux est simulée (dépôt en mémoire). Le
 * contrôle d'autorisation (rejet 401/403 d'un acteur public non authentifié
 * en admin) est l'objet du cas et n'est pas simulé.
 */
import { expect, test } from 'vitest';
import type { Creneau } from '../../../src/schemas/types/slots.types';
import type { ContexteAcces, DepotCreneaux } from '../../../src/schemas/types/slots-ports.types';
import { configurerCreneau } from '../../../src/actions/configurer-creneau.action';

class DepotCreneauxEnMemoire implements DepotCreneaux {
  private readonly creneaux = new Map<string, Creneau>();

  constructor(creneauxInitiaux: Creneau[]) {
    creneauxInitiaux.forEach((creneau) => this.creneaux.set(creneau.id, creneau));
  }

  obtenirParId(id: string): Creneau | undefined {
    return this.creneaux.get(id);
  }

  enregistrer(creneau: Creneau): void {
    this.creneaux.set(creneau.id, creneau);
  }

  listerCreneauxReservablesPublic(): Creneau[] {
    return Array.from(this.creneaux.values()).filter((creneau) => creneau.estOuvert);
  }
}

// Données du CASE : utilisateur client public non authentifié en admin,
// endpoint cible /api/admin/slots/configure.
const CRENEAU_ID = 'CRENEAU-068';
const creneauInitial: Creneau = {
  id: CRENEAU_ID,
  date: '2026-08-22',
  heureDepart: '10:00',
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  estOuvert: true,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_068_cloisonnement_securite_interdiction_acces_configuration_creneaux_public', () => {
  const depotCreneaux = new DepotCreneauxEnMemoire([creneauInitial]);
  const contexteAccesPublicNonAuthentifie: ContexteAcces = {
    endpoint: '/api/admin/slots/configure',
    estAdministrateurAuthentifie: false,
  };

  // Quand il tente d'émettre des requêtes POST, PUT ou DELETE sur les endpoints
  // de configuration des créneaux (« /api/admin/slots/configure »)
  const resultat = configurerCreneau(
    { creneauId: CRENEAU_ID, commande: 'FERMER' },
    contexteAccesPublicNonAuthentifie,
    { depotCreneaux }
  );

  // Alors le serveur rejette les requêtes avec une erreur HTTP 401 Unauthorized ou 403 Forbidden
  expect([401, 403]).toContain((resultat as { accepte: false; codeHttp: number }).codeHttp);

  // Et aucune modification de créneau n'est opérée
  expect(depotCreneaux.obtenirParId(CRENEAU_ID)).toEqual(creneauInitial);
});
