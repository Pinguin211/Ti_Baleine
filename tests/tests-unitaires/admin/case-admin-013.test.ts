/**
 * Test de CASE-ADMIN-013 — Non-persistance du motif d'annulation sur l'entité réservation en base
 * (SPEC-ADMIN-02, Règle, Portée §4, AC-1, REQ-020).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-013.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * La persistance (dépôt en mémoire) et la passerelle SMS sont simulées (ce qui entoure le cas).
 * L'usage à la volée du motif pour composer le SMS et l'absence de sa persistance sur BOOKINGS
 * sont l'objet même du cas et ne sont pas simulés.
 */
import { expect, it } from 'vitest';
import { annulerReservationService } from '../../../src/services/server/cancellation/annuler-reservation.service';
import { composerMessageAnnulationReservation } from '../../../src/lib/server/sms/composer-message-annulation-reservation';

interface BilletActif {
  id: string;
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface LigneBookings {
  reference: string;
  montantTotal: number;
  montantAcompte: number;
  billetsActifs: BilletActif[];
  [champ: string]: unknown;
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
  obtenirLigneBookings(reference: string): LigneBookings;
}

interface DepotCreneauAnnulation {
  libererPlaces(reference: string, nombre: number): void;
}

interface PasserelleSmsAnnulation {
  envoyer(message: MessageSmsAnnulation): void;
}

class DepotReservationEnMemoire implements DepotReservationAnnulation {
  private ligne: LigneBookings;
  constructor(private reservation: ReservationAnnulation) {
    this.ligne = {
      reference: reservation.reference,
      montantTotal: reservation.montantTotal,
      montantAcompte: reservation.montantAcompte,
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
  obtenirLigneBookings(): LigneBookings {
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

it('test_CASE_ADMIN_013_non_persistance_motif_annulation_table_bookings', async () => {
  // Étant donné l'administrateur annulant une réservation avec le motif « Raison médicale
  // client »
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-013',
    billetsActifs: [{ id: 'B1', typeBillet: 'ADULTE' }],
    montantTotal: 65,
    montantAcompte: 20,
    telephoneMobileClient: '+262692001199',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-013',
    dateDepart: new Date(2026, 7, 22, 10, 0),
    sousPreAlerte: false,
  };
  const motif = 'Raison médicale client';

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Fabrique le corps de SMS que le service est censé transmettre à la passerelle, à partir du
  // motif saisi à la volée (composition non persistée).
  const messageAttendu = composerMessageAnnulationReservation({ motif });

  // Quand la transaction d'annulation est validée avec succès
  await annulerReservationService(
    { reservation, creneau, motif, regimeDerogatoireAlerte: false },
    { depotReservation, depotCreneau, passerelleSms }
  );

  // Alors le motif est injecté dans le message SMS transmis à la passerelle
  expect(passerelleSms.messagesEnvoyes[0]?.message).toBe(messageAttendu);

  // Et aucun champ « motif_annulation » n'est persisté sur la table BOOKINGS en base de données
  expect(depotReservation.obtenirLigneBookings(reservation.reference)).not.toHaveProperty(
    'motif_annulation'
  );
});
