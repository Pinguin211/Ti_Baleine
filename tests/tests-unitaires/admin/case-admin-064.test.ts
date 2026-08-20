/**
 * Test de CASE-ADMIN-064 — Configuration et modification de l'affectation du
 * type d'activité sur un créneau (SPEC-ADMIN-07, Portée §2, AC-1).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-064.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seule la persistance des créneaux est simulée (dépôt en mémoire). Le
 * calcul/l'enregistrement de l'affectation d'activité est l'objet du cas et
 * n'est pas simulé.
 */
import { expect, test } from 'vitest';
import type { Creneau } from '../../../src/schemas/types/slots.types';
import type { DepotCreneaux } from '../../../src/schemas/types/slots-ports.types';
import { configurerActiviteCreneau } from '../../../src/actions/configurer-activite-creneau.action';

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

// Données du CASE : créneau 22/08/2026 10:00 Saint-Gilles, sans activité affectée.
const CRENEAU_ID = 'CRENEAU-064';
const creneauSansActivite: Creneau = {
  id: CRENEAU_ID,
  date: '2026-08-22',
  heureDepart: '10:00',
  port: 'SAINT_GILLES',
  activite: null,
  estOuvert: true,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_064_configuration_modification_affectation_activite_creneau', () => {
  const depotCreneaux = new DepotCreneauxEnMemoire([creneauSansActivite]);

  // Quand l'administrateur modifie le type d'activité pour « Sortie Baleines »
  const resultat = configurerActiviteCreneau(
    { creneauId: CRENEAU_ID, activite: 'BALEINES' },
    { depotCreneaux }
  );

  // Alors l'activité est enregistrée sur le créneau
  expect(resultat).toMatchObject({ accepte: true, creneau: { activite: 'BALEINES' } });

  // Et la fiche du créneau reflète immédiatement cette affectation au planning
  expect(depotCreneaux.obtenirParId(CRENEAU_ID)?.activite).toBe('BALEINES');
});
