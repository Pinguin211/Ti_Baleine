/**
 * Test de CASE-ADMIN-065 — Configuration et affectation des navires mobilisés
 * sur un créneau horaire (SPEC-ADMIN-07, Portée §2, AC-1).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-065.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seule la persistance des créneaux est simulée (dépôt en mémoire). L'analyse
 * matérielle de la flotte (capacité Tikap/Grand Bleu) et l'enregistrement de
 * l'affectation sont l'objet du cas et ne sont pas simulés.
 *
 * HYPOTHÈSE (voir rapport de run) : docs/uml/domain.puml ne modélise pas
 * explicitement de relation Creneau -> Bateau ; seule ConfigBateau expose une
 * capacité par navire. Le champ `navires` sur Creneau et le champ
 * `capaciteMaximale` du résultat sont donc une extension nécessaire, non
 * contredite par le diagramme, à valider avec l'équipe domaine.
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

// Données du CASE : créneau Saint-Gilles 14:00, sans navire affecté au départ.
const CRENEAU_ID = 'CRENEAU-065';
const creneauSansNavire: Creneau = {
  id: CRENEAU_ID,
  date: '2026-08-22',
  heureDepart: '14:00',
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  estOuvert: true,
  sousPreAlerte: false,
  navires: [],
};

test('test_CASE_ADMIN_065_configuration_affectation_navires_mobilises_creneau', () => {
  const depotCreneaux = new DepotCreneauxEnMemoire([creneauSansNavire]);

  // Quand l'administrateur affecte les navires « Tikap » et « Grand Bleu » à ce créneau
  const resultat = affecterNaviresCreneau(
    { creneauId: CRENEAU_ID, navires: ['TIKAP', 'GRAND_BLEU'] },
    { depotCreneaux }
  );

  // Alors la configuration matérielle du créneau est enregistrée avec les deux navires
  expect(resultat).toMatchObject({
    accepte: true,
    creneau: { navires: ['TIKAP', 'GRAND_BLEU'] },
  });

  // Et la capacité maximale du créneau est ajustée en conséquence
  expect((resultat as { accepte: true; capaciteMaximale: number }).capaciteMaximale).toBe(36);
});
