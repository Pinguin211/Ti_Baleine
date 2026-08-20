/**
 * Test de CASE-ADMIN-069 — Rejet et blocage à la saisie lors d'une
 * tentative de suppression d'un nombre de billets supérieur aux billets
 * actifs (SPEC-ADMIN-03, AC-1, REQ-015, R-18, REQ-107).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-069.md :
 * une assertion par ligne « Alors »/« Et », soit trois.
 *
 * Ne simule pas le contrôle de quantité excédentaire (objet du cas) : seule
 * la persistance des billets est représentée par un dépôt en mémoire (ce
 * qui entoure le calcul).
 */
import { expect, test } from 'vitest';
import type { Billet } from '../../../src/schemas/types/cancellation.types';
import { createReductionBilletsSchema } from '../../../src/schemas/validation/cancellation/reduction-billets.schema';
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

// Étant donné une réservation comportant 2 billets adultes et 0 billet enfant
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-069',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
};

test('test_CASE_ADMIN_069_rejet_suppression_nombre_billets_superieur_solde_actif', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);
  const requeteExcedentaire = {
    reservationReference: RESERVATION.reference,
    operation: 'RETRAIT' as const,
    adultesARetirer: 3,
    enfantsARetirer: 0,
  };

  // Quand l'administrateur saisit une demande de retrait de 3 billets adultes
  // Alors le formulaire bloque la validation côté client
  const schemaFormulaire = createReductionBilletsSchema({ adultesActifs: 2, enfantsActifs: 0 });
  expect(schemaFormulaire.safeParse(requeteExcedentaire).success).toBe(false);

  // Et toute requête API directe avec une quantité excédentaire est rejetée avec une erreur 422 Unprocessable Entity
  const resultat: { succes: boolean; code?: number; message?: string } =
    reduireBilletsReservationAction(
      { reservation: RESERVATION, requete: requeteExcedentaire },
      { depotBillets }
    );
  expect(resultat).toMatchObject({
    succes: false,
    code: 422,
    message: 'Quantité de billets à retirer supérieure au solde actif',
  });

  // Et le nombre de billets reste inchangé à 2
  expect(depotBillets.appelsSuppression).toHaveLength(0);
});
