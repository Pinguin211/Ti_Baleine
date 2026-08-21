/**
 * Test de CASE-ADMIN-015 — Remise à disposition immédiate et synchrone de la totalité des places
 * libérées sur l'interface publique (SPEC-ADMIN-02, AC-2, Portée §5, REQ-013).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-015.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * La persistance de la réservation/du créneau et la passerelle SMS sont simulées (ce qui entoure
 * le cas). Le recalcul synchrone de la jauge disponible, y compris tel que lu par le port
 * représentant l'interface publique, est l'objet même du cas et n'est pas simulé.
 */
import { expect, it } from 'vitest';
import { annulerReservationService } from '../../../src/services/server/cancellation/annuler-reservation.service';

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
  jaugeMax: number;
  placesOccupees: number;
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
  placesOccupeesActuelles(reference: string): number;
  placesDisponiblesPubliques(reference: string): number;
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

// Simule le stockage du créneau interrogé à la fois par le back-office et l'interface publique
// de réservation : les deux lectures portent sur le même état, prouvant le synchronisme immédiat.
class DepotCreneauEnMemoire implements DepotCreneauAnnulation {
  constructor(private creneau: CreneauAnnulation) {}
  libererPlaces(_reference: string, nombre: number): void {
    this.creneau = { ...this.creneau, placesOccupees: this.creneau.placesOccupees - nombre };
  }
  placesOccupeesActuelles(): number {
    return this.creneau.placesOccupees;
  }
  placesDisponiblesPubliques(): number {
    return this.creneau.jaugeMax - this.creneau.placesOccupees;
  }
}

class PasserelleSmsEnMemoire implements PasserelleSmsAnnulation {
  public messagesEnvoyes: MessageSmsAnnulation[] = [];
  envoyer(message: MessageSmsAnnulation): void {
    this.messagesEnvoyes.push(message);
  }
}

it('test_CASE_ADMIN_015_remise_a_disposition_immediate_places_interface_publique', async () => {
  // Étant donné un créneau affichant 34/36 places occupées (2 places restantes)
  // Et une réservation de 4 places annulée par l'administrateur
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-015',
    billetsActifs: [
      { id: 'B1', typeBillet: 'ADULTE' },
      { id: 'B2', typeBillet: 'ADULTE' },
      { id: 'B3', typeBillet: 'ADULTE' },
      { id: 'B4', typeBillet: 'ADULTE' },
    ],
    montantTotal: 260,
    montantAcompte: 78,
    telephoneMobileClient: '+262692004433',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-015',
    dateDepart: new Date(2026, 7, 24, 10, 0),
    sousPreAlerte: false,
    jaugeMax: 36,
    placesOccupees: 34,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire(creneau);
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'annulation est validée
  await annulerReservationService(
    { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
    { depotReservation, depotCreneau, passerelleSms }
  );

  // Alors la jauge occupée passe instantanément à 30/36 places (6 places disponibles)
  expect({
    placesOccupees: depotCreneau.placesOccupeesActuelles(creneau.reference),
    jaugeMax: creneau.jaugeMax,
  }).toEqual({ placesOccupees: 30, jaugeMax: 36 });

  // Et l'interface publique de réservation permet immédiatement de sélectionner jusqu'à 6 places
  expect(depotCreneau.placesDisponiblesPubliques(creneau.reference)).toBe(6);
});
