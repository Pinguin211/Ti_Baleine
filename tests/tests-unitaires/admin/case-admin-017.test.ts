/**
 * Test de CASE-ADMIN-017 — Blocage de l'action et désactivation du bouton d'annulation sur une
 * réservation à 0 billet actif (SPEC-ADMIN-02, Cas limite #2).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-017.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * La persistance et la passerelle SMS sont simulées (ce qui entoure le cas). La règle de garde
 * interdisant toute nouvelle annulation sur une réservation déjà à 0 billet actif est l'objet même
 * du cas et n'est pas simulée.
 */
import { expect, it } from 'vitest';
import { verifierReservationAnnulable } from '../../../src/schemas/validation/cancellation/annuler-reservation.schema';
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

it('test_CASE_ADMIN_017_blocage_desactivation_bouton_annulation_reservation_0_billet', async () => {
  // Étant donné une fiche réservation affichant déjà 0 billet actif (déjà annulée)
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-017',
    billetsActifs: [],
    montantTotal: 65,
    montantAcompte: 20,
    telephoneMobileClient: '+262692003311',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-017',
    dateDepart: new Date(2026, 7, 25, 10, 0),
    sousPreAlerte: false,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'administrateur consulte cette fiche dans le back-office
  const verification = verifierReservationAnnulable(reservation, creneau, new Date(2026, 7, 18));

  // Alors le bouton « Annuler toute la réservation » est désactivé et grisé
  expect(verification.autorise).toBe(false);

  // Et toute tentative d'appel direct à l'API d'annulation renvoie une erreur 400 Bad Request sans
  // réexpédier de SMS
  let erreurRencontree: (Error & { statusCode?: number }) | undefined;
  try {
    await annulerReservation(
      { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
      { depotReservation, depotCreneau, passerelleSms }
    );
  } catch (erreur) {
    erreurRencontree = erreur as Error & { statusCode?: number };
  }
  expect({
    statusCode: erreurRencontree?.statusCode,
    smsReexpedies: passerelleSms.messagesEnvoyes.length,
  }).toEqual({ statusCode: 400, smsReexpedies: 0 });
});
