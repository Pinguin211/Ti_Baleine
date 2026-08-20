/**
 * Test de CASE-ADMIN-016 — Annulation administrative autorisée sans délai minimal préalable
 * jusqu'à l'heure exacte du départ (SPEC-ADMIN-02, Cas limite #1, Question ouverte n°1 §11 du
 * CDC v5).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-016.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * L'horloge, la persistance et la passerelle SMS sont simulées (ce qui entoure le cas). La règle
 * d'autorisation jusqu'à H-0 pour l'administrateur est l'objet même du cas et n'est pas simulée.
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

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

it('test_CASE_ADMIN_016_annulation_administrative_autorisee_jusqua_heure_depart_h0', async () => {
  // Étant donné un créneau dont le départ est fixé à 10h00
  // Et l'horloge système indiquant 09h45 le jour même (H-15 minutes avant le départ)
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-016',
    billetsActifs: [{ id: 'B1', typeBillet: 'ADULTE' }],
    montantTotal: 65,
    montantAcompte: 20,
    telephoneMobileClient: '+262692006622',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-016',
    dateDepart: new Date(2026, 7, 18, 10, 0),
    sousPreAlerte: false,
  };
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 45));

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  let erreurRencontree: Error | undefined;
  let resultat: { billetsSupprimes: number } | undefined;

  // Quand l'administrateur déclenche l'annulation d'une réservation
  try {
    resultat = await annulerReservation(
      { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
      { depotReservation, depotCreneau, passerelleSms, horloge }
    );
  } catch (erreur) {
    erreurRencontree = erreur as Error;
  }

  // Alors l'annulation est acceptée et traitée avec succès
  expect(erreurRencontree).toBeUndefined();

  // Et les billets sont supprimés et le SMS envoyé
  expect({
    billetsSupprimes: resultat?.billetsSupprimes,
    smsEnvoye: passerelleSms.messagesEnvoyes.length > 0,
  }).toEqual({ billetsSupprimes: 1, smsEnvoye: true });
});
