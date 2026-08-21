/**
 * Test de CASE-ADMIN-025 — Réduction partielle mixte (adultes et enfants)
 * avec recalcul immédiat et trace d'audit (SPEC-ADMIN-03, Portée §1, AC-1,
 * REQ-015).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-025.md :
 * une assertion par ligne « Alors »/« Et », soit quatre.
 *
 * Hypothèse (voir rapport de run) : docs/uml/domain.puml ne modélise aucune
 * entité « historique »/« audit ». Le port `JournalAudit` ci-dessous est une
 * infrastructure technique supposée (au même titre que l'horloge ou l'envoi
 * de SMS dans les autres cas), introduite pour représenter la trace exigée
 * par le cas sans inventer d'attribut sur les entités du domaine.
 *
 * Ne simule pas le retrait de billets ni la libération de places (objet du
 * cas) : seules la persistance des billets, la jauge du créneau et le
 * journal d'audit sont représentés par des dépôts en mémoire.
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

class JournalAuditEnMemoire {
  public entrees: Array<{ reservationReference: string }> = [];
  consigner(entree: { reservationReference: string }): void {
    this.entrees.push(entree);
  }
}

// Étant donné une réservation comportant 4 adultes et 2 enfants (total 6 billets)
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-025',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ADULTE' },
    { typeBillet: 'ENFANT' },
    { typeBillet: 'ENFANT' },
  ],
};

test('test_CASE_ADMIN_025_reduction_mixte_adultes_enfants_recalcul_audit', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);
  const depotCreneau = new DepotCreneauEnMemoire();
  const journalAudit = new JournalAuditEnMemoire();

  // Quand l'administrateur retire simultanément 2 adultes et 1 enfant
  reduireBilletsReservation(
    { reservation: RESERVATION, adultesARetirer: 2, enfantsARetirer: 1 },
    { depotBillets, depotCreneau, journalAudit }
  );

  // Alors 3 billets au total sont retirés de la réservation active
  expect(depotBillets.appelsSuppression.flat()).toHaveLength(3);

  // Et la réservation conserve 2 adultes et 1 enfant actifs (total 3 billets)
  const compter = (billets: Billet[]) => ({
    adultes: billets.filter((b) => b.typeBillet === 'ADULTE').length,
    enfants: billets.filter((b) => b.typeBillet === 'ENFANT').length,
  });
  expect(compter(depotBillets.billetsActifs)).toEqual({ adultes: 2, enfants: 1 });

  // Et 3 places sont immédiatement remises à disposition sur le créneau
  expect(depotCreneau.placesLibereesCumulees).toBe(3);

  // Et la traçabilité de la réduction (historique ou audit) est conservée
  expect(journalAudit.entrees).toHaveLength(1);
});
