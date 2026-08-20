/**
 * Test de CASE-ADMIN-029 — Blocage de l'action de réduction sur une
 * réservation n'ayant déjà plus aucun billet actif (SPEC-ADMIN-03, Cas
 * limite #3).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-029.md :
 * une assertion par ligne « Alors »/« Et », soit deux.
 *
 * Ne simule pas le blocage de la réduction (objet du cas) : seule la
 * persistance des billets est représentée par un dépôt en mémoire (ce qui
 * entoure le calcul).
 */
import { expect, test } from 'vitest';
import type { Billet } from '../../../src/schemas/types/cancellation.types';
import { reduireBilletsReservationAction } from '../../../src/actions/reduire-billets-reservation.action';

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
  }
}

// Étant donné une réservation affichant 0 billet actif
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-029',
  statut: 'ANNULEE',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [],
};

test('test_CASE_ADMIN_029_blocage_action_reduction_reservation_0_billet_actif', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);

  // Quand l'administrateur tente d'appliquer une réduction de passagers
  const resultat: { succes: boolean; code?: number } = reduireBilletsReservationAction(
    {
      reservation: RESERVATION,
      requete: {
        reservationReference: RESERVATION.reference,
        operation: 'RETRAIT',
        adultesARetirer: 1,
        enfantsARetirer: 0,
      },
    },
    { depotBillets }
  );

  // Alors l'action est désactivée dans l'interface et rejetée par l'API
  expect(resultat).toMatchObject({ succes: false, code: 400 });

  // Et aucune modification n'est enregistrée
  expect(depotBillets.appelsSuppression).toHaveLength(0);
});
