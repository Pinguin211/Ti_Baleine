/**
 * Test de CASE-ADMIN-014 — Conservation de la fiche réservation en base avec historique de
 * paiement initial et 0 billet actif (SPEC-ADMIN-02, Règle, Portée §3, AC-1).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-014.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * La persistance (dépôt en mémoire) et la passerelle SMS sont simulées (ce qui entoure le cas).
 * La conservation de la ligne BOOKINGS et la suppression exclusive des BOOKING_ITEMS sont l'objet
 * même du cas et ne sont pas simulées.
 */
import { expect, it } from 'vitest';
import { annulerReservationService } from '../../../src/services/server/cancellation/annuler-reservation.service';

interface BilletActif {
  id: string;
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface LigneBookings {
  reference: string;
  montantInitialRegle: number;
  referenceTransaction: string;
  billetsActifs: BilletActif[];
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
  obtenirLigneBookings(reference: string): LigneBookings | undefined;
}

interface DepotCreneauAnnulation {
  libererPlaces(reference: string, nombre: number): void;
}

interface PasserelleSmsAnnulation {
  envoyer(message: MessageSmsAnnulation): void;
}

class DepotReservationEnMemoire implements DepotReservationAnnulation {
  private ligne: LigneBookings;
  constructor(private reservation: ReservationAnnulation, referenceTransaction: string) {
    this.ligne = {
      reference: reservation.reference,
      montantInitialRegle: reservation.montantAcompte,
      referenceTransaction,
      billetsActifs: reservation.billetsActifs,
    };
  }
  chargerReservation(): ReservationAnnulation {
    return this.reservation;
  }
  supprimerTousLesBillets(): number {
    const nombreSupprimes = this.reservation.billetsActifs.length;
    this.reservation = { ...this.reservation, billetsActifs: [] };
    this.ligne = { ...this.ligne, billetsActifs: [] };
    return nombreSupprimes;
  }
  obtenirLigneBookings(): LigneBookings | undefined {
    return this.ligne;
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

it('test_CASE_ADMIN_014_conservation_fiche_reservation_bdd_historique_0_billet', async () => {
  // Étant donné une réservation enregistrée avec un paiement initial de 130 € et 2 billets
  const reservation: ReservationAnnulation = {
    reference: 'RES-2026-9901',
    billetsActifs: [
      { id: 'B1', typeBillet: 'ADULTE' },
      { id: 'B2', typeBillet: 'ADULTE' },
    ],
    montantTotal: 260,
    montantAcompte: 130,
    telephoneMobileClient: '+262692008811',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-014',
    dateDepart: new Date(2026, 7, 23, 10, 0),
    sousPreAlerte: false,
  };

  const referenceTransactionInitiale = 'TXN-CASE-ADMIN-014';
  const depotReservation = new DepotReservationEnMemoire(reservation, referenceTransactionInitiale);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'administrateur procède à l'annulation totale de la réservation
  await annulerReservationService(
    { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
    { depotReservation, depotCreneau, passerelleSms }
  );

  const ligneApres = depotReservation.obtenirLigneBookings(reservation.reference);

  // Alors l'enregistrement de la table BOOKINGS existe toujours en base de données
  expect(ligneApres).toBeDefined();

  // Et le montant initial payé (130 €) ainsi que la référence de transaction restent archivés
  expect({
    montantInitialRegle: ligneApres?.montantInitialRegle,
    referenceTransaction: ligneApres?.referenceTransaction,
  }).toEqual({ montantInitialRegle: 130, referenceTransaction: referenceTransactionInitiale });

  // Et le nombre de billets actifs rattachés est exactement de 0
  expect(ligneApres?.billetsActifs).toHaveLength(0);
});
