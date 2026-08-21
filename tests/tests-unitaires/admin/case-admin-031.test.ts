/**
 * Test de CASE-ADMIN-031 — Garantie de cohérence transactionnelle de la
 * jauge et des billets lors d'une réduction partielle (SPEC-ADMIN-03, Cas
 * limite #6, REQ-107).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-031.md :
 * une assertion par ligne « Alors »/« Et », soit trois.
 *
 * Ne simule pas l'atomicité transactionnelle de la réduction (objet du
 * cas) : seul l'incident de communication avec la base de données est
 * simulé par un dépôt en mémoire dont l'appel échoue (ce qui entoure le
 * calcul).
 */
import { expect, test } from 'vitest';
import type { Billet } from '../../../src/schemas/types/cancellation.types';
import { reduireBilletsReservation } from '../../../src/services/server/cancellation/reduire-billets-reservation.service';

interface CreneauReference {
  date: Date;
  heureDepart: string;
  port: 'SAINT_GILLES' | 'SAINT_LEU';
}

interface ReservationPourReduction {
  reference: string;
  statut: 'EN_ATTENTE_PAIEMENT' | 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT' | 'ANNULEE';
  creneau: CreneauReference;
  billets: Billet[];
}

class DepotBilletsIncidentEnMemoire {
  constructor(public billetsActifs: Billet[]) {}
  supprimerBillets(_reference: string, _billetsASupprimer: Billet[]): void {
    // Et un incident de communication avec la base de données intervenant pendant la requête
    throw new Error('incident de communication avec la base de données');
  }
}

class DepotCreneauEnMemoire {
  public placesLibereesCumulees = 0;
  libererPlaces(_creneau: CreneauReference, nombrePlaces: number): void {
    this.placesLibereesCumulees += nombrePlaces;
  }
}

// Étant donné une réduction partielle initiée pour 1 billet
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-031',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
};

test('test_CASE_ADMIN_031_coherence_transactionnelle_jauge_billets_reduction_partielle', () => {
  const billetsInitiaux = [...RESERVATION.billets];
  const depotBillets = new DepotBilletsIncidentEnMemoire([...billetsInitiaux]);
  const depotCreneau = new DepotCreneauEnMemoire();

  // Quand l'erreur se produit
  const executerReduction = () =>
    reduireBilletsReservation(
      { reservation: RESERVATION, adultesARetirer: 1, enfantsARetirer: 0 },
      { depotBillets, depotCreneau }
    );

  // Alors un rollback complet est exécuté
  expect(executerReduction).toThrow();

  // Et la réservation conserve l'ensemble de ses billets initiaux
  expect(depotBillets.billetsActifs).toEqual(billetsInitiaux);

  // Et la capacité du créneau n'est pas modifiée
  expect(depotCreneau.placesLibereesCumulees).toBe(0);
});
