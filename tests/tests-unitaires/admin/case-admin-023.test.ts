/**
 * Test de CASE-ADMIN-023 — Réduction partielle de passagers par suppression
 * sélective de N billets adultes (SPEC-ADMIN-03, Scénario 1, AC-1, REQ-015).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-023.md :
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

// Étant donné une réservation confirmée détenant 3 billets adultes et 1 billet enfant
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-023',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ENFANT' },
  ],
};

test('test_CASE_ADMIN_023_reduction_partielle_passagers_suppression_billet_adulte', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);
  const depotCreneau = new DepotCreneauEnMemoire();

  // Quand l'administrateur sélectionne la réservation et retire 1 billet adulte
  reduireBilletsReservation(
    { reservation: RESERVATION, adultesARetirer: 1, enfantsARetirer: 0 },
    { depotBillets, depotCreneau }
  );

  // Alors 1 billet adulte (BOOKING_ITEM) est supprimé de la base
  expect(depotBillets.appelsSuppression[0]).toEqual([{ typeBillet: 'ADULTE' }]);

  // Et la réservation détient désormais 2 billets adultes et 1 billet enfant
  const compter = (billets: Billet[]) => ({
    adultes: billets.filter((b) => b.typeBillet === 'ADULTE').length,
    enfants: billets.filter((b) => b.typeBillet === 'ENFANT').length,
  });
  expect(compter(depotBillets.billetsActifs)).toEqual({ adultes: 2, enfants: 1 });

  // Et exactement 1 place est immédiatement libérée et remise à disposition sur le créneau
  expect(depotCreneau.placesLibereesCumulees).toBe(1);
});
