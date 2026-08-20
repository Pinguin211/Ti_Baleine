/**
 * Test de CASE-ADMIN-030 — Rejet strict de toute tentative de réduction de
 * passagers sur un créneau déjà passé (SPEC-ADMIN-03, Cas limite #5).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-030.md :
 * une assertion par ligne « Alors »/« Et », soit deux.
 *
 * Ne simule pas le rejet lié à l'échéance dépassée (objet du cas) : seules
 * l'horloge et la persistance des billets sont représentées (ce qui entoure
 * le calcul).
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
  }
}

class HorlogeFixe {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

// Étant donné une réservation dont le départ a eu lieu hier à 14h00
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-030',
  statut: 'PAYEE_COMPLETEMENT',
  creneau: { date: new Date(2026, 7, 19), heureDepart: '14h00', port: 'SAINT_GILLES' },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
};
const HORLOGE = new HorlogeFixe(new Date(2026, 7, 20, 9, 0));

test('test_CASE_ADMIN_030_rejet_strict_reduction_passagers_creneau_deja_passe', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);

  // Quand l'administrateur tente de réduire le nombre de passagers de cette réservation
  const resultat: { succes: boolean; message?: string } = reduireBilletsReservation(
    { reservation: RESERVATION, adultesARetirer: 1, enfantsARetirer: 0 },
    { depotBillets, horloge: HORLOGE }
  );

  // Alors le système refuse l'opération avec un message d'erreur d'échéance dépassée
  expect(resultat).toMatchObject({ succes: false, message: expect.stringMatching(/échéance dépassée/i) });

  // Et les billets restent enregistrés à leur état d'origine
  expect(depotBillets.appelsSuppression).toHaveLength(0);
});
