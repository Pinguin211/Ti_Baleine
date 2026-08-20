/**
 * CASE-RES-420 — Accès à la page de paiement du solde après expiration du token
 * SPEC-RESERVATION-03 | AC-10 (REQ-107, cas limite 10)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit quatre.
 * Vocabulaire docs/uml/domain.puml : TokenPaiementSolde.estValide() / dateExpiration
 * (validité technique 1 heure), StatutReservation.PAYEE_PARTIELLEMENT.
 */
import { it, expect, vi } from 'vitest';
import type { Reservation } from '../../../src/schemas/types/booking.types';
import {
  executerTacheEnvoiSmsSoldeJMoins1,
  ouvrirPagePaiementSolde,
} from '../../../src/services/server/balance-payment.service';

const RESERVATION: Reservation = {
  reference: 'RESA-CASE-RES-420',
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
const MESSAGE_EXPIRATION =
  'Le lien de paiement en ligne a expiré pour des raisons de sécurité. Vous pourrez régler votre solde directement par carte bancaire sur place le jour du départ.';

it('test_CASE_RES_420_acces_page_solde_token_expire_plus_de_1_heure_redirection_sur_place', () => {
  const envoiSms = { envoyer: vi.fn() };
  const { token } = executerTacheEnvoiSmsSoldeJMoins1([RESERVATION], EXECUTION_CRON, {
    envoiSms,
  })[0];

  // Quand le client clique sur le lien sécurisé 75 minutes après son émission
  // (délai > 60 minutes)
  const clicHorsDelai = new Date(EXECUTION_CRON.getTime() + 75 * 60 * 1000);
  const page = ouvrirPagePaiementSolde(token, clicHorsDelai);

  // Alors la page web détecte l'expiration du token technique
  expect(page.tokenValide).toBe(false);

  // Et affiche un message explicite
  expect(page.messageExpiration).toBe(MESSAGE_EXPIRATION);

  // Et aucun formulaire de saisie bancaire n'est affiché
  expect(page.formulaireBancaireAffiche).toBe(false);

  // Et la réservation reste maintenue à l'état « payée partiellement »
  expect(page.reservation.statut).toBe('PAYEE_PARTIELLEMENT');
});
