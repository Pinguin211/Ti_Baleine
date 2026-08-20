/**
 * Test de CASE-ADMIN-078 — Bascule automatique vers « Payée complètement » après validation
 * du webhook bancaire du solde en ligne
 * SPEC-ADMIN-01 | Cas limite #7, AC-3, REQ-023, R-30
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-078.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * La réception du webhook bancaire est simulée (objet de paiement validé
 * fourni en dur, ce qui entoure le cas). La bascule automatique du statut
 * financier et du solde affiché est l'objet même du cas et n'est pas simulée.
 */
import { expect, test } from 'vitest';
import { traiterWebhookSoldePaiement } from '../../../src/services/server/planning/traiter-webhook-solde-paiement.service';

// Statut initial : Payée partiellement — Solde dû avant paiement en ligne : 52,50 €
const RESERVATION_INITIALE = {
  reference: 'RES-ADMIN-078',
  statut: 'PAYEE_PARTIELLEMENT' as const,
  soldeRestantDu: 52.5,
};

// Moyen de règlement : paiement en ligne à distance (webhook bancaire) — Moment : veille du départ
const PAIEMENT_SOLDE_WEBHOOK = { montant: 52.5, statut: 'validé' as const };

test('test_CASE_ADMIN_078_bascule_payee_completement_webhook_bancaire_solde_en_ligne', () => {
  const resultat = traiterWebhookSoldePaiement({
    reservation: RESERVATION_INITIALE,
    paiementSolde: PAIEMENT_SOLDE_WEBHOOK,
  });

  // Alors le statut financier de la réservation bascule immédiatement à « Payée complètement »
  expect(resultat.statutFinancier).toBe('Payée complètement');

  // Et le solde dû affiché sur le détail du créneau est ramené à 0,00 €
  expect(resultat.soldeDu).toBe(0);

  // Et aucune action de l'administrateur sur place n'est requise pour opérer cette bascule
  expect(resultat.interventionAdministrateurRequise).toBe(false);
});
