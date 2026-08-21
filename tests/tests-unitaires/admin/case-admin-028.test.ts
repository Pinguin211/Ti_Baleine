/**
 * Test de CASE-ADMIN-028 — Rejet strict de toute tentative de modification
 * de la date ou du port lors d'une réduction (SPEC-ADMIN-03, Cas limite #4,
 * AC-2, R-18).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-028.md :
 * une assertion par ligne « Alors »/« Et », soit deux.
 *
 * Ne simule pas le rejet de la tentative de modification (objet du cas) :
 * seule la persistance des billets est représentée par un dépôt en mémoire
 * (ce qui entoure le calcul).
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

// Étant donné l'administrateur réduisant les passagers d'une réservation du 18/08 à Saint-Gilles
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-028',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 7, 18), heureDepart: '07h00', port: 'SAINT_GILLES' },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
};

test('test_CASE_ADMIN_028_rejet_strict_modification_date_port_lors_reduction', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);

  // Quand il tente simultanément de modifier la date pour le 19/08 ou le port pour Saint-Leu
  const resultat: { succes: boolean; code?: number } = reduireBilletsReservationAction(
    {
      reservation: RESERVATION,
      requete: {
        reservationReference: RESERVATION.reference,
        operation: 'RETRAIT',
        adultesARetirer: 1,
        enfantsARetirer: 0,
        dateDepartSouhaitee: '2026-08-19',
        portSouhaite: 'SAINT_LEU',
      },
    },
    { depotBillets }
  );

  // Alors l'action est formellement bloquée
  expect(resultat.succes).toBe(false);

  // Et la réservation demeure rattachée à sa date et son port initiaux
  expect(RESERVATION.creneau).toMatchObject({ date: new Date(2026, 7, 18), port: 'SAINT_GILLES' });
});
