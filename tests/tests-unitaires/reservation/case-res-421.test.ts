/**
 * CASE-RES-421 — Non-utilisation du lien SMS de solde et maintien de la réservation
 * SPEC-RESERVATION-03 | AC-10 (cas limite 11)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit quatre.
 * Vocabulaire docs/uml/domain.puml : TokenPaiementSolde.estUtilise,
 * StatutReservation.PAYEE_PARTIELLEMENT, CanalPaiement.SUR_PLACE_CB.
 */
import { it, expect, vi } from 'vitest';
import type { Reservation } from '../../../src/schemas/types/booking.types';
import {
  executerTacheEnvoiSmsSoldeJMoins1,
  evaluerDossierAuDepart,
} from '../../../src/services/server/balance-payment.service';

/** Réservation avec acompte de 39,00 € versé sur 130,00 €, 2 places bloquées. */
const RESERVATION: Reservation = {
  reference: 'RESA-CASE-RES-421',
  statut: 'PAYEE_PARTIELLEMENT',
  dateCreation: new Date(2026, 8, 10, 9, 0),
  creneau: {
    port: 'SAINT_GILLES',
    activite: 'BALEINES',
    date: new Date(2026, 8, 16),
    heureDepart: '10h00',
  },
  billets: [{ typeBillet: 'ADULTE' }, { typeBillet: 'ADULTE' }],
  montantTotal: 130,
  montantAcompte: 39,
};

const EXECUTION_CRON = new Date(2026, 8, 15, 18, 0);
const JOUR_DU_DEPART = new Date(2026, 8, 16, 9, 0);

it('test_CASE_RES_421_non_utilisation_lien_solde_maintien_reservation_payee_partiellement', () => {
  const envoiSms = { envoyer: vi.fn() };

  // Et le SMS avec lien sécurisé de solde transmis à J-1 au client
  executerTacheEnvoiSmsSoldeJMoins1([RESERVATION], EXECUTION_CRON, { envoiSms });

  // Quand le client n'ouvre pas le lien SMS ni n'effectue aucun paiement en ligne
  // avant le départ
  const dossier = evaluerDossierAuDepart(RESERVATION.reference, JOUR_DU_DEPART);

  // Alors la réservation reste active et maintenue à l'état « payée partiellement »
  expect(dossier.statut).toBe('PAYEE_PARTIELLEMENT');

  // Et les places réservées demeurent intégralement garanties sur le créneau
  expect(dossier.placesGaranties).toBe(2);

  // Et aucune annulation automatique ni pénalité n'est appliquée au dossier
  expect({ annule: dossier.annuleAutomatiquement, penalite: dossier.penaliteAppliquee }).toEqual({
    annule: false,
    penalite: false,
  });

  // Et le solde restant dû reste exigible pour un encaissement CB sur place le jour J
  expect(dossier).toMatchObject({
    soldeExigible: 91,
    canalReglementAttendu: 'SUR_PLACE_CB',
  });
});
