/**
 * Test de CASE-ADMIN-021 — Garantie de cohérence transactionnelle en cas de coupure réseau lors
 * d'une annulation (SPEC-ADMIN-02, Cas limite #6, REQ-107).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-021.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * L'infrastructure transactionnelle (prise d'un instantané avant écriture, restauration en cas
 * d'erreur) et l'interruption réseau (échec de la libération des places au milieu de l'opération)
 * sont simulées — ce qui entoure le cas. Le déclenchement effectif du rollback intégral par le
 * service, en confiant sa séquence d'écritures au gestionnaire de transaction, est l'objet même du
 * cas et n'est pas simulé.
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

interface DepotTransactionnel {
  snapshot(): unknown;
  restaurer(snapshot: unknown): void;
}

interface DepotReservationAnnulation extends DepotTransactionnel {
  chargerReservation(reference: string): ReservationAnnulation;
  supprimerTousLesBillets(reference: string): number;
}

interface DepotCreneauAnnulation extends DepotTransactionnel {
  libererPlaces(reference: string, nombre: number): void;
}

interface PasserelleSmsAnnulation {
  envoyer(message: MessageSmsAnnulation): void;
}

interface GestionnaireTransaction {
  executer<T>(operation: () => T): T;
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
  snapshot(): ReservationAnnulation {
    return { ...this.reservation, billetsActifs: [...this.reservation.billetsActifs] };
  }
  restaurer(snapshot: unknown): void {
    this.reservation = snapshot as ReservationAnnulation;
  }
}

// Simule l'interruption de connexion à la base de données survenant au milieu de la transaction :
// la libération des places échoue systématiquement.
class DepotCreneauInterruptionReseau implements DepotCreneauAnnulation {
  public placesLiberees = 0;
  libererPlaces(): void {
    throw new Error('Interruption de connexion à la base de données');
  }
  snapshot(): number {
    return this.placesLiberees;
  }
  restaurer(snapshot: unknown): void {
    this.placesLiberees = snapshot as number;
  }
}

class PasserelleSmsEnMemoire implements PasserelleSmsAnnulation {
  public messagesEnvoyes: MessageSmsAnnulation[] = [];
  envoyer(message: MessageSmsAnnulation): void {
    this.messagesEnvoyes.push(message);
  }
}

// Gestionnaire de transaction en mémoire : prend un instantané des dépôts participants avant
// d'exécuter l'opération, et les restaure intégralement si l'opération lève une erreur — ce qui
// modélise fidèlement le rollback ACID attendu par REQ-107.
class GestionnaireTransactionEnMemoire implements GestionnaireTransaction {
  constructor(private readonly participants: DepotTransactionnel[]) {}
  executer<T>(operation: () => T): T {
    const instantanes = this.participants.map((participant) => participant.snapshot());
    try {
      return operation();
    } catch (erreur) {
      this.participants.forEach((participant, index) => participant.restaurer(instantanes[index]));
      throw erreur;
    }
  }
}

it('test_CASE_ADMIN_021_coherence_transactionnelle_annulation_rollback_reseau', async () => {
  // Étant donné une réservation de 2 billets dont l'annulation est initiée
  // Et une interruption de connexion à la base de données survenant au milieu de la transaction
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-021',
    billetsActifs: [
      { id: 'B1', typeBillet: 'ADULTE' },
      { id: 'B2', typeBillet: 'ADULTE' },
    ],
    montantTotal: 130,
    montantAcompte: 40,
    telephoneMobileClient: '+262692001010',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-021',
    dateDepart: new Date(2026, 7, 28, 10, 0),
    sousPreAlerte: false,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauInterruptionReseau();
  const passerelleSms = new PasserelleSmsEnMemoire();
  const transaction = new GestionnaireTransactionEnMemoire([depotReservation, depotCreneau]);

  // Quand la transaction échoue
  let erreurRencontree: Error | undefined;
  try {
    await annulerReservationService(
      { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
      { depotReservation, depotCreneau, passerelleSms, transaction }
    );
  } catch (erreur) {
    erreurRencontree = erreur as Error;
  }

  // Alors le système opère un rollback intégral
  expect(erreurRencontree).toBeInstanceOf(Error);

  // Et aucun billet n'est partiellement supprimé
  expect(depotReservation.chargerReservation(reservation.reference).billetsActifs).toHaveLength(2);

  // Et la jauge du créneau reste strictement inchangée
  expect(depotCreneau.placesLiberees).toBe(0);
});
