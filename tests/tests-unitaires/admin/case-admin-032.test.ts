/**
 * Test de CASE-ADMIN-032 — Absence de remboursement financier automatique
 * consécutif à une réduction partielle de passagers (SPEC-ADMIN-03, Portée
 * §6, Contrainte C-10).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-032.md :
 * une assertion par ligne « Alors »/« Et », soit trois.
 *
 * Ne simule pas la réduction de billets elle-même (objet du cas) : seules
 * la jauge du créneau et la passerelle de remboursement bancaire (qui ne
 * doit jamais être appelée) sont représentées (ce qui entoure le calcul).
 */
import { expect, test, vi } from 'vitest';
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
  montantTotal: number;
}

class DepotBilletsEnMemoire {
  constructor(public billetsActifs: Billet[]) {}
  supprimerBillets(_reference: string, billetsASupprimer: Billet[]): void {
    for (const billet of billetsASupprimer) {
      const index = this.billetsActifs.findIndex((b) => b.typeBillet === billet.typeBillet);
      if (index !== -1) this.billetsActifs.splice(index, 1);
    }
  }
}

class DepotCreneauEnMemoire {
  public placesLibereesCumulees = 0;
  libererPlaces(_creneau: CreneauReference, nombrePlaces: number): void {
    this.placesLibereesCumulees += nombrePlaces;
  }
}

// Étant donné une réservation de 3 adultes (195 €) réduite à 2 adultes par l'administrateur
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-032',
  statut: 'PAYEE_COMPLETEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
  montantTotal: 195,
};

test('test_CASE_ADMIN_032_absence_remboursement_financier_automatique_reduction_partielle', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleRemboursement = { rembourser: vi.fn() };

  // Quand la réduction est validée
  const resultat: { traitementFinancier?: string } = reduireBilletsReservation(
    { reservation: RESERVATION, adultesARetirer: 1, enfantsARetirer: 0 },
    { depotBillets, depotCreneau, passerelleRemboursement }
  );

  // Alors la place est libérée sur le créneau
  expect(depotCreneau.placesLibereesCumulees).toBe(1);

  // Et aucun flux de remboursement bancaire automatique de 65 € n'est initié par le système
  expect(passerelleRemboursement.rembourser).not.toHaveBeenCalled();

  // Et l'opération financière reste soumise au traitement manuel externe
  expect(resultat.traitementFinancier).toBe('MANUEL_HORS_SYSTEME');
});
