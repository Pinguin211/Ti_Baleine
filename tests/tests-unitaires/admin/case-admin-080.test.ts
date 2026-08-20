/**
 * CASE-ADMIN-080 — Perte temporaire de connexion internet lors de la validation du pointage et de
 * l'encaissement du solde sur place
 * SPEC-ADMIN-08 | Cas limite #3, AC-1
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

// Simule la perte temporaire de connexion internet pendant la transmission de la validation du
// pointage (passerelle CB inaccessible) — ce qui entoure le cas, pas l'objet du cas.
class PasserelleCbCoupureReseau implements PasserelleCbSurPlace {
  async validerEncaissement(): Promise<{ referenceTransaction: string }> {
    throw new Error('Perte temporaire de connexion internet : transmission du paiement non confirmée');
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

it('test_CASE_ADMIN_080_perte_connexion_pointage_encaissement_solde_sur_place', async () => {
  // Étant donné une réservation « Payée partiellement » avec un solde dû de 105,00 €
  // Et l'administrateur validant l'encaissement du solde par carte bancaire sur place à
  // l'embarcadère
  const reservation: ReservationSoldeDu = {
    reference: 'RESA-CASE-ADMIN-080',
    statut: 'PAYEE_PARTIELLEMENT',
    soldeRestantDu: 105,
    emailClient: 'client.case-admin-080@test.re',
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const passerelleCb = new PasserelleCbCoupureReseau();
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 8, 0));

  // Quand une perte temporaire de connexion internet survient pendant la transmission de la
  // validation du pointage
  let erreurRencontree: Error | undefined;
  try {
    await encaisserSoldeCbSurPlace(
      { referenceReservation: reservation.reference, montant: 105 },
      { depotReservation, passerelleCb, horloge }
    );
  } catch (erreur) {
    erreurRencontree = erreur as Error;
  }

  // Alors un message d'erreur explicite est affiché à l'administrateur (transmission du paiement
  // non confirmée)
  expect(erreurRencontree?.message.length).toBeGreaterThan(0);

  // Et l'état antérieur de la réservation (« Payée partiellement », solde dû 105,00 €) est
  // conservé sans bascule prématurée vers « Payée complètement »
  expect(depotReservation.chargerReservation(reservation.reference)).toMatchObject({
    statut: 'PAYEE_PARTIELLEMENT',
    soldeRestantDu: 105,
  });

  // Et aucune facture de solde n'est générée tant que la confirmation de la transmission réseau
  // n'est pas reçue
  expect(emettreFactureApresPaiementMock).not.toHaveBeenCalled();
});
