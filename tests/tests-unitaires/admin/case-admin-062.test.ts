/**
 * Test de CASE-ADMIN-062 — Fermeture administrative manuelle d'un créneau
 * ouvert sans passager (SPEC-ADMIN-07, Scénario 1, AC-1, REQ-011, R-13).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-062.md :
 * une assertion par ligne « Alors » ou « Et », soit trois.
 *
 * Seule la persistance des créneaux est simulée (dépôt en mémoire) — ce qui
 * entoure le cas. La fermeture elle-même (passage FERMÉ, disparition de la
 * liste publique, non-réservabilité) est l'objet du cas et n'est pas simulée :
 * elle est déléguée à l'action et au service réels, non encore implémentés.
 */
import { expect, test } from 'vitest';
import type { Creneau } from '../../../src/schemas/types/slots.types';
import type { DepotCreneaux } from '../../../src/schemas/types/slots-ports.types';
import { fermerCreneau } from '../../../src/actions/fermer-creneau.action';
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

// Données du CASE : créneau ouvert, 0 passager. Date/port/activité ne sont pas
// fournis par la section « Données » du CASE : ils servent uniquement de
// scaffolding technique neutre pour instancier l'objet Creneau et n'influent
// sur aucune assertion.
const CRENEAU_ID = 'CRENEAU-062';
const creneauOuvertSansPassager: Creneau = {
  id: CRENEAU_ID,
  date: '2026-08-22',
  heureDepart: '10:00',
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  estOuvert: true,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_062_fermeture_administrative_manuelle_creneau_sans_passager', () => {
  const depotCreneaux = new DepotCreneauxEnMemoire([creneauOuvertSansPassager]);

  // Quand l'administrateur sélectionne l'action « Fermer le créneau » dans son tableau de bord
  const creneauFerme = fermerCreneau({ creneauId: CRENEAU_ID }, { depotCreneaux });

  // Alors le statut du créneau passe à « FERMÉ »
  expect(creneauFerme.estOuvert).toBe(false);

  // Et le créneau disparaît instantanément de l'interface de réservation publique (REQ-011, R-13)
  expect(
    depotCreneaux.listerCreneauxReservablesPublic().some((creneau) => creneau.id === CRENEAU_ID)
  ).toBe(false);

  // Et aucune réservation ne peut plus être effectuée sur ce créneau
  expect(estCreneauReservable(creneauFerme)).toBe(false);
});
