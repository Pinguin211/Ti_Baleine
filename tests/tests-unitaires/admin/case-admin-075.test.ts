/**
 * CASE-ADMIN-075 — Blocage de l'encaissement sur une réservation déjà « Payée complètement »
 * SPEC-ADMIN-08 | Scénario 2, Cas limite #1, AC-1, REQ-022
 */
import { it, expect, vi, afterEach } from 'vitest';

const emettreFactureApresPaiementMock = vi.hoisted(() =>
  vi.fn(async () => ({ envoyeAvecSucces: true }))
);

// Code existant réutilisable en lecture seule (SPEC-FAC-02) : simulé, ce n'est pas l'objet de ce cas.
vi.mock('../../../src/actions/emettre-facture-apres-paiement', () => ({
  emettreFactureApresPaiement: emettreFactureApresPaiementMock,
}));

import { obtenirEtatEncaissementSoldeSurPlace } from '../../../src/services/server/payment/etat-encaissement-solde-sur-place';
import { encaisserSoldeCbSurPlace } from '../../../src/actions/encaisser-solde-cb-sur-place';

interface ReservationSoldeDu {
  reference: string;
  statut: 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT';
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
    return { referenceTransaction: 'TX-CASE-ADMIN-075' };
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

it('test_CASE_ADMIN_075_blocage_encaissement_solde_reservation_deja_payee_completement', async () => {
  // Étant donné une réservation déjà à l'état « Payée complètement » (solde réglé en ligne ou déjà
  // encaissé sur place)
  const reservation: ReservationSoldeDu = {
    reference: 'RESA-CASE-ADMIN-075',
    statut: 'PAYEE_COMPLETEMENT',
    soldeRestantDu: 0,
    emailClient: 'client.case-admin-075@test.re',
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const passerelleCb = new PasserelleCbEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 8, 0));

  // Quand l'administrateur consulte la fiche de la réservation
  const etat = obtenirEtatEncaissementSoldeSurPlace(reservation);

  // Alors le bouton « Encaisser le solde (CB sur place) » est désactivé
  expect(etat.boutonEncaisserActif).toBe(false);

  // Et le statut affiché indique « Solde déjà réglé »
  expect(etat.mentionStatut).toBe('Solde déjà réglé');

  // Et aucune action d'encaissement supplémentaire n'est réalisable
  await expect(
    encaisserSoldeCbSurPlace(
      { referenceReservation: reservation.reference, montant: 0 },
      { depotReservation, passerelleCb, horloge }
    )
  ).rejects.toThrow();
});
