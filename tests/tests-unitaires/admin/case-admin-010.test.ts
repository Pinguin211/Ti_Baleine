/**
 * Test de CASE-ADMIN-010 — Annulation complète d'une réservation à la demande du client suite à
 * pré-alerte météo (SPEC-ADMIN-02, Scénario 1, AC-1, AC-2, AC-3, REQ-013, REQ-014, REQ-020, R-28).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-010.md :
 * une assertion par ligne « Alors » / « Et », soit cinq.
 *
 * Seuls la passerelle SMS, la persistance de la réservation/du créneau et l'horloge sont simulées
 * (ce qui entoure le cas). Le calcul du remboursement indicatif dérogatoire à 100 % et la
 * suppression effective des billets sont l'objet même du cas et ne sont pas simulés.
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

it('test_CASE_ADMIN_010_annulation_complete_reservation_demande_client_suite_pre_alerte', async () => {
  // Étant donné une réservation confirmée détenant 2 billets adultes sur un créneau sous
  // pré-alerte, ayant versé un acompte de 45,00 €
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-010',
    billetsActifs: [
      { id: 'B1', typeBillet: 'ADULTE' },
      { id: 'B2', typeBillet: 'ADULTE' },
    ],
    montantTotal: 100,
    montantAcompte: 45,
    telephoneMobileClient: '+262692001122',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-010',
    dateDepart: new Date(2026, 7, 20, 10, 0),
    sousPreAlerte: true,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'administrateur clique sur « Annuler toute la réservation »
  const calculAffiche = previsualiserAnnulation({
    reservation,
    regimeDerogatoireAlerte: true,
  });

  // Alors le système affiche à l'administrateur le calcul dérogatoire à 100 % : remboursement
  // indicatif de 45,00 € (intégralité des sommes perçues)
  expect(calculAffiche).toMatchObject({
    sommePayee: 45,
    remboursementIndicatif: 45,
    regime: 'DEROGATOIRE_ALERTE',
  });

  // Quand l'administrateur sélectionne le motif « Annulation client par peur suite à alerte
  // météo »
  const resultat = await annulerReservation(
    {
      reservation,
      creneau,
      motif: 'Annulation client par peur suite à alerte météo',
      regimeDerogatoireAlerte: true,
    },
    { depotReservation, depotCreneau, passerelleSms }
  );

  // Alors les 2 billets (BOOKING_ITEMS) rattachés à la commande sont supprimés
  expect(resultat.billetsSupprimes).toBe(2);

  // Et la réservation (BOOKINGS) est conservée en base avec 0 billet actif
  expect(depotReservation.chargerReservation(reservation.reference).billetsActifs).toHaveLength(0);

  // Et les 2 places sont immédiatement remises à disposition sur le créneau
  expect(depotCreneau.placesLiberees).toBe(2);

  // Et un SMS transactionnel d'information est envoyé au numéro mobile du client sans aucune
  // mention du calcul de remboursement
  expect({
    destinataire: passerelleSms.messagesEnvoyes[0]?.destinataireTelephone,
    contientMontant: passerelleSms.messagesEnvoyes[0]?.message.includes('45'),
  }).toEqual({ destinataire: '+262692001122', contientMontant: false });
});
