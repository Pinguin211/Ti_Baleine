/**
 * Test de CASE-ADMIN-079 — Remboursement indicatif nul lorsque le montant payé est insuffisant
 * pour couvrir la pénalité contractuelle (SPEC-ADMIN-02, Cas limite #7, AC-1, R-29).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-079.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * Seules la passerelle SMS et la persistance sont simulées. Le plafonnement à 0 € du calcul
 * indicatif de remboursement est l'objet même du cas et n'est pas simulé.
 */
import { expect, it } from 'vitest';
import {
  annulerReservation,
  previsualiserAnnulation,
} from '../../../src/actions/annuler-reservation';

interface BilletActif {
  id: string;
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface ReservationAnnulation {
  reference: string;
  billetsActifs: BilletActif[];
  montantTotal: number;
  montantAcompte: number;
  telephoneMobileClient: string;
}

interface CreneauAnnulation {
  reference: string;
  dateDepart: Date;
  sousPreAlerte: boolean;
}

interface MessageSmsAnnulation {
  destinataireTelephone: string;
  message: string;
}

interface DepotReservationAnnulation {
  chargerReservation(reference: string): ReservationAnnulation;
  supprimerTousLesBillets(reference: string): number;
}

interface DepotCreneauAnnulation {
  libererPlaces(reference: string, nombre: number): void;
}

interface PasserelleSmsAnnulation {
  envoyer(message: MessageSmsAnnulation): void;
}

class DepotReservationEnMemoire implements DepotReservationAnnulation {
  constructor(private reservation: ReservationAnnulation) {}
  chargerReservation(): ReservationAnnulation {
    return this.reservation;
  }
  supprimerTousLesBillets(): number {
    const nombreSupprimes = this.reservation.billetsActifs.length;
    this.reservation = { ...this.reservation, billetsActifs: [] };
    return nombreSupprimes;
  }
}

class DepotCreneauEnMemoire implements DepotCreneauAnnulation {
  public placesLiberees = 0;
  libererPlaces(_reference: string, nombre: number): void {
    this.placesLiberees += nombre;
  }
}

class PasserelleSmsEnMemoire implements PasserelleSmsAnnulation {
  public messagesEnvoyes: MessageSmsAnnulation[] = [];
  envoyer(message: MessageSmsAnnulation): void {
    this.messagesEnvoyes.push(message);
  }
}

it('test_CASE_ADMIN_079_remboursement_indicatif_nul_montant_paye_insuffisant_penalite', async () => {
  // Étant donné une réservation confirmée de 100,00 € ayant versé un acompte de 30,00 € (2
  // billets)
  // Et l'administrateur recevant une demande d'annulation soumise au barème standard 50 % (
  // pénalité : 50,00 €)
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-079',
    billetsActifs: [
      { id: 'B1', typeBillet: 'ADULTE' },
      { id: 'B2', typeBillet: 'ADULTE' },
    ],
    montantTotal: 100,
    montantAcompte: 30,
    telephoneMobileClient: '+262692007733',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-079',
    dateDepart: new Date(2026, 7, 21, 10, 0),
    sousPreAlerte: false,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'administrateur ouvre l'écran d'annulation
  const calculAffiche = previsualiserAnnulation({
    reservation,
    bareme: { pourcentagePenalite: 50 },
    regimeDerogatoireAlerte: false,
  });

  // Alors le système affiche à l'administrateur le calcul indicatif : « Somme payée : 30,00 € |
  // Pénalité barème : 50,00 € | Remboursement indicatif : 0,00 € »
  expect(calculAffiche).toMatchObject({
    sommePayee: 30,
    penaliteBareme: 50,
    remboursementIndicatif: 0,
  });

  // Quand l'administrateur valide l'annulation avec le motif « Annulation standard »
  await annulerReservation(
    {
      reservation,
      creneau,
      motif: 'Annulation standard',
      bareme: { pourcentagePenalite: 50 },
      regimeDerogatoireAlerte: false,
    },
    { depotReservation, depotCreneau, passerelleSms }
  );

  // Alors aucun complément de paiement n'est réclamé au client au titre de la pénalité non
  // couverte par l'acompte
  expect(depotReservation.chargerReservation(reservation.reference).montantAcompte).toBe(30);

  // Et le SMS informatif transmis au client ne mentionne aucun montant ni complément à régler
  expect(/\d/.test(passerelleSms.messagesEnvoyes[0]?.message ?? '')).toBe(false);
});
