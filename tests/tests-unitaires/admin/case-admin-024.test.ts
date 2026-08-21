/**
 * Test de CASE-ADMIN-024 — Réduction partielle de passagers par suppression
 * sélective de N billets enfants (SPEC-ADMIN-03, AC-1, REQ-015).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-024.md :
 * une assertion par ligne « Alors »/« Et », soit trois.
 *
 * Ne simule pas le retrait de billets ni la libération de places (objet du
 * cas) : seules la persistance des billets et la jauge du créneau sont
 * représentées par des dépôts en mémoire (ce qui entoure le calcul).
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

class DepotBilletsEnMemoire {
  public appelsSuppression: Billet[][] = [];
  constructor(public billetsActifs: Billet[]) {}
  supprimerBillets(_reference: string, billetsASupprimer: Billet[]): void {
    this.appelsSuppression.push(billetsASupprimer);
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

// Étant donné une réservation comprenant 2 adultes et 2 enfants
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-024',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ENFANT' },
    { typeBillet: 'ENFANT' },
  ],
};

test('test_CASE_ADMIN_024_reduction_partielle_passagers_suppression_billet_enfant', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);
  const depotCreneau = new DepotCreneauEnMemoire();

  // Quand l'administrateur retire 1 billet enfant de la réservation
  reduireBilletsReservation(
    { reservation: RESERVATION, adultesARetirer: 0, enfantsARetirer: 1 },
    { depotBillets, depotCreneau }
  );

  // Alors 1 billet enfant (BOOKING_ITEM) est supprimé
  expect(depotBillets.appelsSuppression[0]).toEqual([{ typeBillet: 'ENFANT' }]);

  // Et la réservation compte désormais 2 adultes et 1 enfant
  const compter = (billets: Billet[]) => ({
    adultes: billets.filter((b) => b.typeBillet === 'ADULTE').length,
    enfants: billets.filter((b) => b.typeBillet === 'ENFANT').length,
  });
  expect(compter(depotBillets.billetsActifs)).toEqual({ adultes: 2, enfants: 1 });

  // Et 1 place est synchroniquement libérée sur le créneau
  expect(depotCreneau.placesLibereesCumulees).toBe(1);
});
