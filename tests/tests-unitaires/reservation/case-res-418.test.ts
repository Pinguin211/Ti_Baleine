/**
 * CASE-RES-418 — Réception du SMS à J-1 et paiement du solde en ligne dans le délai
 * SPEC-RESERVATION-03 | AC-9, AC-10 | Scénario 4
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit quatre.
 * Vocabulaire docs/uml/domain.puml : TokenPaiementSolde (dateExpiration, estValide()),
 * Paiement.typePaiement = SOLDE, StatutReservation.PAYEE_COMPLETEMENT,
 * NotificationSMS.destinataireTelephone.
 *
 * Sont simulés l'horloge, l'envoi de SMS et la passerelle bancaire — ce qui entoure
 * le cas. La validité du token et la bascule de statut ne le sont pas.
 */
import { it, expect, vi } from 'vitest';
import type { Reservation } from '../../../src/schemas/types/booking.types';
import {
  executerTacheEnvoiSmsSoldeJMoins1,
  ouvrirPagePaiementSolde,
  payerSoldeEnLigne,
} from '../../../src/services/server/balance-payment.service';

/** Réservation à l'état « payée partiellement » : acompte 31,50 € sur 105,00 €. */
const RESERVATION: Reservation = {
  reference: 'RESA-CASE-RES-418',
  statut: 'PAYEE_PARTIELLEMENT',
  dateCreation: new Date(2026, 8, 10, 9, 0),
  creneau: {
    port: 'SAINT_GILLES',
    activite: 'BALEINES',
    date: new Date(2026, 8, 16),
    heureDepart: '10h00',
  },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ENFANT' }],
  montantTotal: 105,
  montantAcompte: 31.5,
};

const EXECUTION_CRON = new Date(2026, 8, 15, 18, 0);

it('test_CASE_RES_418_envoi_sms_j_moins_1_paiement_solde_en_ligne_statut_payee_completement', () => {
  const envoiSms = { envoyer: vi.fn() };
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-SOLDE-418' })),
  };

  // Quand la tâche planifiée automatique de J-1 s'exécute
  // Alors un SMS contenant une URL sécurisée avec un token temporaire est expédié
  // au numéro mobile du client (+262692123456)
  const { token } = executerTacheEnvoiSmsSoldeJMoins1([RESERVATION], EXECUTION_CRON, {
    envoiSms,
  })[0];
  expect(envoiSms.envoyer).toHaveBeenCalledWith(
    expect.objectContaining({
      destinataireTelephone: '+262692123456',
      message: expect.stringContaining(token),
    })
  );

  // Quand le client clique sur le lien reçu 20 minutes après son émission (< 1 heure)
  // Alors il accède à la page de paiement sécurisée affichant le récapitulatif de la
  // réservation et le solde restant dû de 73,50 €
  const clicDansLeDelai = new Date(EXECUTION_CRON.getTime() + 20 * 60 * 1000);
  expect(ouvrirPagePaiementSolde(token, clicDansLeDelai)).toMatchObject({
    tokenValide: true,
    referenceReservation: RESERVATION.reference,
    soldeRestantDu: 73.5,
  });

  // Quand le client valide le paiement par carte bancaire du solde de 73,50 €
  // Alors la transaction bancaire est confirmée avec succès
  const paiement = payerSoldeEnLigne(token, clicDansLeDelai, { passerellePaiement });
  expect(paiement).toMatchObject({
    typePaiement: 'SOLDE',
    canalPaiement: 'EN_LIGNE',
    montant: 73.5,
    referenceTransaction: 'TX-SOLDE-418',
  });

  // Et le statut de la réservation bascule à « payée complètement »
  expect(paiement.reservation.statut).toBe('PAYEE_COMPLETEMENT');
});
