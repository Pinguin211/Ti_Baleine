/**
 * Test de CASE-ADMIN-019 — Traitement d'un numéro mobile client invalide ou manquant lors de
 * l'annulation (SPEC-ADMIN-02, Cas limite #4, REQ-106).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-019.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * La persistance et la passerelle SMS (dont l'échec de livraison) sont simulées (ce qui entoure le
 * cas). La poursuite de la suppression des billets/libération des places malgré l'échec SMS, ainsi
 * que la journalisation de cet échec, sont l'objet même du cas et ne sont pas simulées.
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
}

interface MessageSmsAnnulation {
  destinataireTelephone: string;
  message: string;
}

interface EvenementJournal {
  code: string;
  details: string;
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

interface JournalEvenements {
  consignerErreur(evenement: EvenementJournal): void;
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

// Simule le rejet de la passerelle SMS pour un numéro de mobile au format invalide.
class PasserelleSmsNumeroInvalide implements PasserelleSmsAnnulation {
  envoyer(message: MessageSmsAnnulation): void {
    if (message.destinataireTelephone === '00000000') {
      throw new Error('Numéro de mobile invalide');
    }
  }
}

class JournalEnMemoire implements JournalEvenements {
  public erreurs: EvenementJournal[] = [];
  consignerErreur(evenement: EvenementJournal): void {
    this.erreurs.push(evenement);
  }
}

it('test_CASE_ADMIN_019_traitement_numero_mobile_invalide_annulation_log_echec', async () => {
  // Étant donné une réservation avec un numéro mobile client erroné (« 00000000 »)
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-019',
    billetsActifs: [{ id: 'B1', typeBillet: 'ADULTE' }],
    montantTotal: 65,
    montantAcompte: 20,
    telephoneMobileClient: '00000000',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-019',
    dateDepart: new Date(2026, 7, 26, 10, 0),
    sousPreAlerte: false,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsNumeroInvalide();
  const journal = new JournalEnMemoire();

  // Quand l'administrateur valide l'annulation de la réservation
  const resultat = await annulerReservationService(
    { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
    { depotReservation, depotCreneau, passerelleSms, journal }
  );

  // Alors la suppression des billets et la libération des places sont validées en base
  expect({
    billetsSupprimes: resultat.billetsSupprimes,
    placesLiberees: depotCreneau.placesLiberees,
  }).toEqual({ billetsSupprimes: 1, placesLiberees: 1 });

  // Et l'échec d'émission du SMS est capturé et tracé dans les logs applicatifs (REQ-106)
  expect(journal.erreurs).toHaveLength(1);

  // Et un message d'alerte signale à l'administrateur que le SMS n'a pas pu être transmis
  expect(resultat.avertissementAdmin).toMatch(/SMS/);
});
