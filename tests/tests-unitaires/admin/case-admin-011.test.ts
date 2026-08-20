/**
 * Test de CASE-ADMIN-011 — Annulation administrative d'office pour cause météo ou technique
 * (SPEC-ADMIN-02, Scénario 2, AC-1, AC-2, AC-3, REQ-013, REQ-014, R-27).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-011.md :
 * une assertion par ligne « Alors » / « Et », soit cinq.
 *
 * Seuls la passerelle SMS, la persistance de la réservation/du créneau sont simulées (ce qui
 * entoure le cas). Le calcul du remboursement indicatif dérogatoire à 100 % et la suppression
 * effective des billets sont l'objet même du cas et ne sont pas simulés.
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

it('test_CASE_ADMIN_011_annulation_administrative_office_cause_meteo_technique', async () => {
  // Étant donné une réservation confirmée de 3 passagers sur un départ devant être annulé pour
  // cause météo, ayant versé un acompte de 90,00 €
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-011',
    billetsActifs: [
      { id: 'B1', typeBillet: 'ADULTE' },
      { id: 'B2', typeBillet: 'ADULTE' },
      { id: 'B3', typeBillet: 'ENFANT' },
    ],
    montantTotal: 180,
    montantAcompte: 90,
    telephoneMobileClient: '+262692009988',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-011',
    dateDepart: new Date(2026, 7, 20, 7, 0),
    sousPreAlerte: true,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'administrateur déclenche l'annulation d'office
  const calculAffiche = previsualiserAnnulation({
    reservation,
    regimeDerogatoireAlerte: true,
  });

  // Alors le système affiche à l'administrateur le calcul dérogatoire à 100 % : remboursement
  // indicatif de 90,00 € (intégralité des sommes perçues)
  expect(calculAffiche).toMatchObject({
    sommePayee: 90,
    remboursementIndicatif: 90,
    regime: 'DEROGATOIRE_ALERTE',
  });

  // Quand l'administrateur saisit le motif « Annulation administrative météo » et confirme
  const resultat = await annulerReservation(
    {
      reservation,
      creneau,
      motif: 'Annulation administrative météo',
      regimeDerogatoireAlerte: true,
    },
    { depotReservation, depotCreneau, passerelleSms }
  );

  // Alors l'ensemble des 3 billets est supprimé de la réservation
  expect(resultat.billetsSupprimes).toBe(3);

  // Et la réservation est conservée à 0 billet actif
  expect(depotReservation.chargerReservation(reservation.reference).billetsActifs).toHaveLength(0);

  // Et les places sont libérées sur le créneau
  expect(depotCreneau.placesLiberees).toBe(3);

  // Et un SMS explicite d'annulation administrative est transmis au client sans aucune mention du
  // calcul de remboursement
  expect({
    destinataire: passerelleSms.messagesEnvoyes[0]?.destinataireTelephone,
    contientMontant: passerelleSms.messagesEnvoyes[0]?.message.includes('90'),
  }).toEqual({ destinataire: '+262692009988', contientMontant: false });
});
