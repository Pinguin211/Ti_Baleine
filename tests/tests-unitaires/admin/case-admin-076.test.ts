/**
 * CASE-ADMIN-076 — Rejet strict de tout encaissement en espèces ou en chèques vacances
 * SPEC-ADMIN-08 | Portée §5, Cas limite #2, AC-3, CDC v5 §6
 */
import { it, expect } from 'vitest';
import { obtenirMoyensReglementSoldeSurPlace } from '../../../src/services/server/payment/moyens-reglement-solde-sur-place';

interface ReservationSoldeDu {
  reference: string;
  statut: 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT';
  soldeRestantDu: number;
}

it('test_CASE_ADMIN_076_rejet_encaissement_especes_cheques_vacances_absent_interface', () => {
  // Étant donné une réservation « Payée partiellement » consultée par l'administrateur sur l'écran
  // d'encaissement du solde
  const reservation: ReservationSoldeDu = {
    reference: 'RESA-CASE-ADMIN-076',
    statut: 'PAYEE_PARTIELLEMENT',
    soldeRestantDu: 105,
  };

  // Quand l'administrateur recherche une option de règlement autre que la carte bancaire
  const moyensDisponibles = obtenirMoyensReglementSoldeSurPlace(reservation);

  // Alors aucune option d'encaissement en espèces n'est proposée dans l'interface
  expect(moyensDisponibles).not.toContain('ESPECES');

  // Et aucune option d'encaissement en chèques vacances n'est proposée dans l'interface
  expect(moyensDisponibles).not.toContain('CHEQUES_VACANCES');

  // Et seul le bouton « Encaisser le solde (CB sur place) » est disponible
  expect(moyensDisponibles).toEqual(['CARTE_BANCAIRE']);
});
