/**
 * Test de CASE-ADMIN-022 — Absence de flux financier sortant automatisé lors de l'annulation
 * (SPEC-ADMIN-02, Portée §7, Contrainte C-10, R-27, R-28).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-022.md :
 * une assertion par ligne « Alors » / « Et », soit trois.
 *
 * La persistance et la passerelle SMS sont simulées (ce qui entoure le cas). L'absence de tout
 * appel à la passerelle bancaire et le renvoi explicite d'un traitement manuel hors système sont
 * l'objet même du cas et ne sont pas simulés.
 *
 * Hypothèse : `docs/uml/domain.puml` ne modélise pas de passerelle de remboursement bancaire en
 * tant qu'entité ; ce port technique (`passerelleBancaire`) est traité comme une dépendance externe
 * injectable au même titre que la passerelle SMS, uniquement pour prouver qu'elle n'est jamais
 * sollicitée par le service (Contrainte C-10).
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

interface PasserelleBancaire {
  rembourser(montant: number, reference: string): void;
}

class DepotReservationEnMemoire implements DepotReservationAnnulation {
  public soldeBancaireSysteme: number;
  constructor(private reservation: ReservationAnnulation) {
    this.soldeBancaireSysteme = reservation.montantAcompte;
  }
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

class PasserelleBancaireEnMemoire implements PasserelleBancaire {
  public appelsRembourser: Array<{ montant: number; reference: string }> = [];
  rembourser(montant: number, reference: string): void {
    this.appelsRembourser.push({ montant, reference });
  }
}

it('test_CASE_ADMIN_022_absence_flux_financier_sortant_automatique_annulation', async () => {
  // Étant donné une réservation payée de 260 € faisant l'objet d'une annulation administrative
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-022',
    billetsActifs: [
      { id: 'B1', typeBillet: 'ADULTE' },
      { id: 'B2', typeBillet: 'ADULTE' },
    ],
    montantTotal: 260,
    montantAcompte: 260,
    telephoneMobileClient: '+262692009900',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-022',
    dateDepart: new Date(2026, 7, 29, 10, 0),
    sousPreAlerte: false,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();
  const passerelleBancaire = new PasserelleBancaireEnMemoire();

  // Quand l'annulation est validée dans le back-office
  const resultat = await annulerReservationService(
    { reservation, creneau, motif: 'Annulation administrative', regimeDerogatoireAlerte: false },
    { depotReservation, depotCreneau, passerelleSms, passerelleBancaire }
  );

  // Alors aucun appel d'API de remboursement vers la passerelle bancaire n'est émis
  expect(passerelleBancaire.appelsRembourser).toHaveLength(0);

  // Et le solde bancaire de la commande reste inchangé dans le système
  expect(depotReservation.soldeBancaireSysteme).toBe(260);

  // Et l'opération de remboursement effectif est laissée au traitement manuel de l'entreprise
  expect(resultat.remboursement.modeTraitement).toBe('MANUEL_HORS_SYSTEME');
});
