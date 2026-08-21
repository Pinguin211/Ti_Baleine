/**
 * Test de CASE-ADMIN-066 — Blocage strict de toute tentative d'affecter deux
 * activités différentes sur le même navire et même créneau (SPEC-ADMIN-07,
 * Cas limite #1, AC-2, R-12).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-066.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seule la persistance des créneaux est simulée (dépôt en mémoire). Le
 * contrôle de la règle d'exclusivité R-12 est l'objet du cas et n'est pas
 * simulé.
 *
 * HYPOTHÈSE (voir rapport de run) : comme pour CASE-ADMIN-065, le champ
 * `navires` sur Creneau est une extension nécessaire non présente telle
 * quelle dans docs/uml/domain.puml.
 */
import { expect, test } from 'vitest';
import type { Creneau } from '../../../src/schemas/types/slots.types';
import type { DepotCreneaux } from '../../../src/schemas/types/slots-ports.types';
import { affecterNaviresCreneau } from '../../../src/actions/affecter-navires-creneau.action';

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

// Données du CASE : navire Grand Bleu déjà affecté à une Sortie Baleines sur
// le créneau de 10:00 ; tentative d'affectation simultanée à une Sortie
// Dauphins sur ce même navire à 10:00 (mixité interdite).
const CRENEAU_BALEINES_ID = 'CRENEAU-066-BALEINES';
const CRENEAU_DAUPHINS_ID = 'CRENEAU-066-DAUPHINS';

const creneauBaleinesAvecGrandBleu: Creneau = {
  id: CRENEAU_BALEINES_ID,
  date: '2026-08-22',
  heureDepart: '10:00',
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  estOuvert: true,
  sousPreAlerte: false,
  navires: ['GRAND_BLEU'],
};

const creneauDauphinsTente: Creneau = {
  id: CRENEAU_DAUPHINS_ID,
  date: '2026-08-22',
  heureDepart: '10:00',
  port: 'SAINT_GILLES',
  activite: 'DAUPHINS',
  estOuvert: true,
  sousPreAlerte: false,
  navires: [],
};

test('test_CASE_ADMIN_066_blocage_mixite_activites_meme_navire_creneau_exclusivite', () => {
  const depotCreneaux = new DepotCreneauxEnMemoire([
    creneauBaleinesAvecGrandBleu,
    creneauDauphinsTente,
  ]);

  // Quand l'administrateur tente d'affecter simultanément l'activité « Sortie Dauphins »
  // sur ce même navire à 10h00
  const resultat = affecterNaviresCreneau(
    { creneauId: CRENEAU_DAUPHINS_ID, navires: ['GRAND_BLEU'] },
    { depotCreneaux }
  );

  // Alors le système bloque formellement la configuration (R-12)
  expect(resultat.accepte).toBe(false);

  // Et affiche le message « Règle d'exclusivité : un navire ne peut accueillir qu'une seule activité par créneau »
  expect((resultat as { accepte: false; message: string }).message).toBe(
    "Règle d'exclusivité : un navire ne peut accueillir qu'une seule activité par créneau"
  );
});
