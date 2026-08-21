/**
 * Test de CASE-ADMIN-012 — Annulation standard d'une réservation hors alerte avec sélection d'un
 * motif informatif et notification SMS (SPEC-ADMIN-02, Portée §4, AC-1, AC-3, R-29).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-012.md :
 * une assertion par ligne « Alors » / « Et », soit quatre.
 *
 * Le cas ne fournit aucun montant numérique attendu pour le calcul indicatif standard (il décrit
 * seulement le régime et le plafonnement) : l'assertion vérifie donc les propriétés qualitatives
 * données par le cas (assise sur le montant total, plafonnée aux sommes perçues) sans inventer de
 * valeur. Seules la passerelle SMS et la persistance sont simulées.
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

it('test_CASE_ADMIN_012_annulation_standard_hors_alerte_motif_sms_client', async () => {
  // Étant donné une réservation confirmée de 1 adulte sur un créneau ordinaire sans alerte,
  // montant total 75,00 €, acompte versé 22,50 €
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-012',
    billetsActifs: [{ id: 'B1', typeBillet: 'ADULTE' }],
    montantTotal: 75,
    montantAcompte: 22.5,
    telephoneMobileClient: '+262692005544',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-012',
    dateDepart: new Date(2026, 7, 20, 14, 0),
    sousPreAlerte: false,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnMemoire();

  // Quand l'administrateur ouvre l'écran d'annulation
  const calculAffiche = previsualiserAnnulation({
    reservation,
    regimeDerogatoireAlerte: false,
  });

  // Alors le système affiche à l'administrateur le calcul indicatif de remboursement standard,
  // assis sur le montant total de la commande et plafonné aux sommes perçues (R-29)
  expect({
    sommePayee: calculAffiche.sommePayee,
    regime: calculAffiche.regime,
    remboursementPlafonneAuxSommesPercues: calculAffiche.remboursementIndicatif <= calculAffiche.sommePayee,
  }).toEqual({ sommePayee: 22.5, regime: 'STANDARD', remboursementPlafonneAuxSommesPercues: true });

  // Quand l'administrateur procède à l'annulation en sélectionnant le motif standard « Annulation
  // standard hors alerte »
  const resultat = await annulerReservation(
    {
      reservation,
      creneau,
      motif: 'Annulation standard hors alerte',
      regimeDerogatoireAlerte: false,
    },
    { depotReservation, depotCreneau, passerelleSms }
  );

  // Alors le billet est supprimé de la réservation
  expect(resultat.billetsSupprimes).toBe(1);

  // Et la place est immédiatement libérée
  expect(depotCreneau.placesLiberees).toBe(1);

  // Et le SMS de notification standard est envoyé au numéro du client sans aucune mention du
  // calcul de remboursement
  expect({
    destinataire: passerelleSms.messagesEnvoyes[0]?.destinataireTelephone,
    contientMontant: passerelleSms.messagesEnvoyes[0]?.message.includes('22,5'),
  }).toEqual({ destinataire: '+262692005544', contientMontant: false });
});
