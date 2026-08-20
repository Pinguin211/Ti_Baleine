/**
 * Test de CASE-ADMIN-026 — Réduction ramenant le nombre de billets actifs à
 * 0 avec basculement automatique vers l'annulation (SPEC-ADMIN-03,
 * Scénario 2, AC-3, Cas limite #2).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-026.md :
 * une assertion par ligne « Alors »/« Et », soit cinq.
 *
 * Ne simule pas le basculement vers l'annulation, le calcul indicatif de
 * remboursement ni la libération des billets (objet du cas) : seuls la
 * persistance des billets et l'envoi du SMS sont représentés par des
 * dépôts/passerelles en mémoire (ce qui entoure le calcul).
 */
import { expect, test } from 'vitest';
import type { Billet } from '../../../src/schemas/types/cancellation.types';
import { reduireBilletsReservation } from '../../../src/services/server/cancellation/reduire-billets-reservation.service';
import { confirmerAnnulationApresReduction } from '../../../src/services/server/cancellation/confirmer-annulation-apres-reduction.service';

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
  montantAcompteVerse: number;
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

class EnvoiSMSEnMemoire {
  public messagesEnvoyes: Array<{ destinataireTelephone: string; message: string }> = [];
  envoyer(notification: { destinataireTelephone: string; message: string }): void {
    this.messagesEnvoyes.push(notification);
  }
}

// Étant donné une réservation détenant 2 billets, montant total 80,00 €, acompte versé 24,00 €
const RESERVATION: ReservationPourReduction = {
  reference: 'RESA-CASE-ADMIN-026',
  statut: 'PAYEE_PARTIELLEMENT',
  creneau: { date: new Date(2026, 8, 15), heureDepart: '10h00', port: 'SAINT_GILLES' },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
  montantTotal: 80,
  montantAcompteVerse: 24,
};

test('test_CASE_ADMIN_026_reduction_a_0_billet_bascule_automatique_annulation_sms', () => {
  const depotBillets = new DepotBilletsEnMemoire([...RESERVATION.billets]);

  // Quand l'administrateur demande le retrait des 2 billets depuis l'écran de réduction
  const resultat: {
    succes: boolean;
    type?: string;
    calculRemboursementIndicatif?: unknown;
    motifRequis?: boolean;
  } = reduireBilletsReservation(
    { reservation: RESERVATION, adultesARetirer: 2, enfantsARetirer: 0 },
    { depotBillets }
  );

  // Alors le système bascule sur le flux d'annulation complète
  expect(resultat.type).toBe('BASCULE_ANNULATION_REQUISE');

  // Et affiche à l'administrateur le calcul indicatif de remboursement (SPEC-ADMIN-02)
  expect(resultat.calculRemboursementIndicatif).toBeDefined();

  // Et invite l'administrateur à sélectionner le motif de notification
  expect(resultat.motifRequis).toBe(true);

  const envoiSMS = new EnvoiSMSEnMemoire();

  // Quand l'administrateur sélectionne le motif et valide (« Annulation standard »,
  // catalogue de motifs de SPEC-ADMIN-02)
  confirmerAnnulationApresReduction(
    { reservation: RESERVATION, motifAnnulation: 'Annulation standard' },
    { depotBillets, envoiSMS }
  );

  // Et après confirmation, la réservation est conservée à 0 billet actif
  expect(depotBillets.billetsActifs).toHaveLength(0);

  // Et le SMS de notification d'annulation est envoyé au client sans aucune mention du calcul financier
  expect(envoiSMS.messagesEnvoyes[0]?.message.toLowerCase()).not.toMatch(/remboursement|€/);
});
