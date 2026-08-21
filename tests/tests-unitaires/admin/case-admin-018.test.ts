/**
 * Test de CASE-ADMIN-018 — Rejet strict de la demande d'annulation administrative lorsque le
 * créneau est déjà passé (SPEC-ADMIN-02, Cas limite #3, Ce qui n'est pas défini §1, CDC v5 §11
 * Q1).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-018.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * L'horloge, la persistance et la passerelle SMS sont simulées (ce qui entoure le cas). La règle
 * de rejet après l'heure de départ est l'objet même du cas et n'est pas simulée.
 */
import { expect, it } from 'vitest';
import { annulerReservation } from '../../../src/actions/annuler-reservation';

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

interface Horloge {
  maintenant(): Date;
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
  public supprimerTousLesBilletsAppels = 0;
  constructor(private reservation: ReservationAnnulation) {}
  chargerReservation(): ReservationAnnulation {
    return this.reservation;
  }
  supprimerTousLesBillets(): number {
    this.supprimerTousLesBilletsAppels += 1;
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

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

it('test_CASE_ADMIN_018_rejet_strict_annulation_administrative_creneau_passe', async () => {
  // Étant donné une réservation sur un créneau dont le départ était fixé le 18 août 2026 à 07h00
  // Et l'horloge système indiquant le 18 août 2026 à 07h30 (départ passé de 30 minutes)
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-018',
    billetsActifs: [{ id: 'B1', typeBillet: 'ADULTE' }],
    montantTotal: 65,
    montantAcompte: 20,
    telephoneMobileClient: '+262692002200',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-018',
    dateDepart: new Date(2026, 7, 18, 7, 0),
    sousPreAlerte: false,
  };
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 7, 30));

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'administrateur tente d'annuler la réservation
  let erreurRencontree: Error | undefined;
  try {
    await annulerReservation(
      { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
      { depotReservation, depotCreneau, passerelleSms, horloge }
    );
  } catch (erreur) {
    erreurRencontree = erreur as Error;
  }

  // Alors la demande est strictement rejetée avec le message « Annulation impossible : le départ
  // est déjà passé »
  expect(erreurRencontree?.message).toBe('Annulation impossible : le départ est déjà passé');

  // Et aucun billet n'est supprimé en base
  expect(depotReservation.supprimerTousLesBilletsAppels).toBe(0);
});
