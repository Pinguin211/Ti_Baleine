/**
 * Test de CASE-ADMIN-027 — Rejet strict de toute tentative d'ajout de
 * billet sur une réservation existante (SPEC-ADMIN-03, Cas limite #1, AC-2,
 * R-18).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-027.md :
 * une assertion par ligne « Alors »/« Et », soit deux.
 *
 * Ne simule pas le rejet de la tentative d'ajout (objet du cas) : seule la
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
  constructor(public billetsActifs: Billet[]) {}
  supprimerBillets(_reference: string, _billetsASupprimer: Billet[]): void {
    throw new Error('ne doit pas être appelé : la tentative doit être rejetée avant persistance');
  }
}

// Étant donné une réservation existante de 2 passagers
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-027',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
};

test('test_CASE_ADMIN_027_rejet_strict_tentative_ajout_billet_reservation_existante', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);

  // Quand l'administrateur tente d'ajouter 1 passager supplémentaire à cette commande
  const resultat: { succes: boolean; code?: number; message?: string } =
    reduireBilletsReservationAction(
      {
        reservation: RESERVATION,
        requete: {
          reservationReference: RESERVATION.reference,
          operation: 'AJOUT',
          adultesAAjouter: 1,
        },
      },
      { depotBillets }
    );

  // Alors le système bloque l'action et refuse l'ajout (R-18)
  expect(resultat.succes).toBe(false);

  // Et un message informe l'administrateur que tout passager supplémentaire doit faire l'objet d'une nouvelle réservation
  expect(resultat.message).toMatch(/nouvelle réservation/i);
});
