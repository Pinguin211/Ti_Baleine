/**
 * CASE-ADMIN-074 — Encaissement du solde par carte bancaire sur place et bascule vers
 * « Payée complètement »
 * SPEC-ADMIN-08 | Scénario 1, AC-1, AC-2, REQ-022, R-07, R-30
 */
import { it, expect, vi, afterEach } from 'vitest';

const emettreFactureApresPaiementMock = vi.hoisted(() =>
  vi.fn(async () => ({ envoyeAvecSucces: true }))
);

// Code existant réutilisable en lecture seule (SPEC-FAC-02) : simulé, ce n'est pas l'objet de ce cas.
vi.mock('../../../src/actions/emettre-facture-apres-paiement', () => ({
  emettreFactureApresPaiement: emettreFactureApresPaiementMock,
}));

import { encaisserSoldeCbSurPlace } from '../../../src/actions/encaisser-solde-cb-sur-place';

interface ReservationSoldeDu {
  reference: string;
  statut: 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT';
  montantTotal: number;
  montantAcompteRegle: number;
  soldeRestantDu: number;
  emailClient: string;
}

interface DepotReservationSolde {
  chargerReservation(reference: string): ReservationSoldeDu;
  enregistrerEncaissementSolde(reference: string, montant: number): ReservationSoldeDu;
}

interface PasserelleCbSurPlace {
  validerEncaissement(montant: number): Promise<{ referenceTransaction: string }>;
}

interface Horloge {
  maintenant(): Date;
}

class DepotReservationEnMemoire implements DepotReservationSolde {
  constructor(private reservation: ReservationSoldeDu) {}
  chargerReservation(): ReservationSoldeDu {
    return this.reservation;
  }
  enregistrerEncaissementSolde(_reference: string, montant: number): ReservationSoldeDu {
    this.reservation = {
      ...this.reservation,
      statut: 'PAYEE_COMPLETEMENT',
      soldeRestantDu: this.reservation.soldeRestantDu - montant,
    };
    return this.reservation;
  }
}

class PasserelleCbEnMemoire implements PasserelleCbSurPlace {
  async validerEncaissement(): Promise<{ referenceTransaction: string }> {
    return { referenceTransaction: 'TX-CASE-ADMIN-074' };
  }
}

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

afterEach(() => {
  vi.clearAllMocks();
});

it('test_CASE_ADMIN_074_encaissement_solde_cb_sur_place_bascule_payee_completement', async () => {
  // Étant donné une réservation pour 2 adultes à Saint-Leu (total : 150,00 €) affichée à l'état
  // « Payée partiellement » avec un acompte réglé de 45,00 € et un solde dû de 105,00 €
  const reservation: ReservationSoldeDu = {
    reference: 'RESA-CASE-ADMIN-074',
    statut: 'PAYEE_PARTIELLEMENT',
    montantTotal: 150,
    montantAcompteRegle: 45,
    soldeRestantDu: 105,
    emailClient: 'client.case-admin-074@test.re',
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const passerelleCb = new PasserelleCbEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 8, 0));

  // Et le client se présentant à l'embarcadère le matin du départ
  // Quand l'administrateur valide le paiement du solde de 105,00 € par carte bancaire sur place
  // via le bouton « Encaisser le solde (CB sur place) »
  const resultat = await encaisserSoldeCbSurPlace(
    { referenceReservation: reservation.reference, montant: 105 },
    { depotReservation, passerelleCb, horloge }
  );

  // Alors la réservation passe à l'état « Payée complètement »
  expect(resultat.reservation.statut).toBe('PAYEE_COMPLETEMENT');

  // Et le solde restant dû affiché est mis à 0,00 €
  expect(resultat.reservation.soldeRestantDu).toBe(0);

  // Et la facture de solde distincte PDF est générée à la volée et envoyée par courriel à
  // l'adresse du client
  expect(emettreFactureApresPaiementMock).toHaveBeenCalledWith(
    expect.objectContaining({
      reservation: expect.objectContaining({
        reference: reservation.reference,
        emailClient: reservation.emailClient,
      }),
    })
  );
});
