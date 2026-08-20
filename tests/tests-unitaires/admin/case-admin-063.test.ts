/**
 * Test de CASE-ADMIN-063 — Réouverture manuelle exceptionnelle d'un créneau
 * précédemment fermé depuis le tableau de bord (SPEC-ADMIN-07, AC-1, REQ-011,
 * R-13).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-063.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seule la persistance des créneaux est simulée (dépôt en mémoire). La
 * réouverture elle-même (passage OUVERT, réapparition sur l'interface
 * publique) est l'objet du cas et n'est pas simulée.
 */
import { expect, test } from 'vitest';
import type { Creneau } from '../../../src/schemas/types/slots.types';
import type { DepotCreneaux } from '../../../src/schemas/types/slots-ports.types';
import { rouvrirCreneau } from '../../../src/actions/rouvrir-creneau.action';
import { estCreneauReservable } from '../../../src/services/server/slots/creneau-disponibilite.service';

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

// Données du CASE : statut initial FERMÉ. Date/port/activité ne sont pas
// fournis par la section « Données » : scaffolding technique neutre, sans
// incidence sur les assertions.
const CRENEAU_ID = 'CRENEAU-063';
const creneauFerme: Creneau = {
  id: CRENEAU_ID,
  date: '2026-08-22',
  heureDepart: '10:00',
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  estOuvert: false,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_063_reouverture_manuelle_exceptionnelle_creneau_ferme', () => {
  const depotCreneaux = new DepotCreneauxEnMemoire([creneauFerme]);

  // Quand l'administrateur clique sur « Rouvrir le créneau »
  const creneauReouvert = rouvrirCreneau({ creneauId: CRENEAU_ID }, { depotCreneaux });

  // Alors le créneau repasse au statut « OUVERT »
  expect(creneauReouvert.estOuvert).toBe(true);

  // Et le créneau redevient immédiatement visible et sélectionnable sur l'interface publique
  const estVisibleEtSelectionnable =
    depotCreneaux.listerCreneauxReservablesPublic().some((creneau) => creneau.id === CRENEAU_ID) &&
    estCreneauReservable(creneauReouvert);
  expect(estVisibleEtSelectionnable).toBe(true);
});
