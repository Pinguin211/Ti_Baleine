/**
 * Test de CASE-ADMIN-067 — Alerte et blocage de toute tentative de
 * programmation simultanée de deux sorties Baleines nécessitant le
 * naturaliste unique (SPEC-ADMIN-07, Cas limite #2, R-15, Contrainte C-19).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-067.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seule la persistance des créneaux est simulée (dépôt en mémoire). Le
 * contrôle du conflit de ressource « naturaliste unique » (R-15, C-19,
 * s'appuyant sur ConfigSkipper.naturaliste et ConfigActivite.necessiteNaturaliste
 * du domaine) est l'objet du cas et n'est pas simulé.
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

// Données du CASE : sortie Baleines déjà programmée le mardi 09:00 à Saint-Leu
// (mobilise l'unique naturaliste) ; tentative de seconde sortie Baleines le
// même mardi à 10:00 à Saint-Gilles.
const CRENEAU_SAINT_LEU_ID = 'CRENEAU-067-SAINT-LEU';
const CRENEAU_SAINT_GILLES_ID = 'CRENEAU-067-SAINT-GILLES';
const MARDI = '2026-08-25';

const creneauBaleinesSaintLeu: Creneau = {
  id: CRENEAU_SAINT_LEU_ID,
  date: MARDI,
  heureDepart: '09:00',
  port: 'SAINT_LEU',
  activite: 'BALEINES',
  estOuvert: true,
  sousPreAlerte: false,
};

const creneauSaintGillesTente: Creneau = {
  id: CRENEAU_SAINT_GILLES_ID,
  date: MARDI,
  heureDepart: '10:00',
  port: 'SAINT_GILLES',
  activite: null,
  estOuvert: true,
  sousPreAlerte: false,
};

test('test_CASE_ADMIN_067_blocage_conflit_naturaliste_unique_deux_sorties_baleines_simultanees', () => {
  const depotCreneaux = new DepotCreneauxEnMemoire([
    creneauBaleinesSaintLeu,
    creneauSaintGillesTente,
  ]);

  // Quand l'administrateur tente de programmer une seconde sortie « Baleines »
  // le mardi à 10h00 à Saint-Gilles
  const resultat = configurerActiviteCreneau(
    { creneauId: CRENEAU_SAINT_GILLES_ID, activite: 'BALEINES' },
    { depotCreneaux }
  );

  // Alors le système déclenche une alerte de conflit de ressource et bloque la validation
  expect(resultat.accepte).toBe(false);

  // Et indique que l'unique naturaliste est déjà mobilisé à Saint-Leu
  expect((resultat as { accepte: false; message: string }).message).toBe(
    'Conflit naturaliste : ressource unique déjà allouée sur un autre site'
  );
});
