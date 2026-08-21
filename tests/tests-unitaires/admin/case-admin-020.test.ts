/**
 * Test de CASE-ADMIN-020 — Gestion d'un échec temporaire de la passerelle SMS lors de
 * l'annulation (SPEC-ADMIN-02, Cas limite #5).
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-020.md :
 * une assertion par ligne « Alors » / « Et », soit deux.
 *
 * La persistance et la passerelle SMS (en panne temporaire) sont simulées (ce qui entoure le cas).
 * La poursuite de l'annulation locale malgré la panne externe et la notification de l'incident à
 * l'administrateur sont l'objet même du cas et ne sont pas simulées.
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

// Simule la panne temporaire (HTTP 500 / timeout) du prestataire SMS externe — ce qui entoure le
// cas, pas l'objet du cas.
class PasserelleSmsEnPanne implements PasserelleSmsAnnulation {
  envoyer(): void {
    throw new Error('HTTP 500 : panne temporaire de la passerelle SMS');
  }
}

it('test_CASE_ADMIN_020_gestion_echec_temporaire_passerelle_sms_annulation', async () => {
  // Étant donné l'administrateur annulant une réservation valide
  // Et la passerelle SMS renvoyant une erreur HTTP 500 (panne temporaire du prestataire SMS)
  const reservation: ReservationAnnulation = {
    reference: 'RESA-CASE-ADMIN-020',
    billetsActifs: [{ id: 'B1', typeBillet: 'ADULTE' }],
    montantTotal: 65,
    montantAcompte: 20,
    telephoneMobileClient: '+262692005500',
  };
  const creneau: CreneauAnnulation = {
    reference: 'CRN-CASE-ADMIN-020',
    dateDepart: new Date(2026, 7, 27, 10, 0),
    sousPreAlerte: false,
  };

  const depotReservation = new DepotReservationEnMemoire(reservation);
  const depotCreneau = new DepotCreneauEnMemoire();
  const passerelleSms = new PasserelleSmsEnPanne();

  // Quand la demande d'annulation est soumise
  const resultat = await annulerReservationService(
    { reservation, creneau, motif: 'Annulation standard', regimeDerogatoireAlerte: false },
    { depotReservation, depotCreneau, passerelleSms }
  );

  // Alors les billets sont supprimés en base et les places libérées
  expect({
    billetsSupprimes: resultat.billetsSupprimes,
    placesLiberees: depotCreneau.placesLiberees,
  }).toEqual({ billetsSupprimes: 1, placesLiberees: 1 });

  // Et l'incident SMS est notifié dans l'interface de l'administrateur pour suivi manuel
  expect(resultat.avertissementAdmin).toMatch(/SMS/);
});
