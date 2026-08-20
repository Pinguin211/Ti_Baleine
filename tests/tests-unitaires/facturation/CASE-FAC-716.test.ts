/**
 * CASE-FAC-716 — Inclusion du récapitulatif de la réservation dans le corps du courriel
 * transactionnel
 * SPEC-FAC-02 | AC-6, Scénario 1
 */
import { it, expect, vi, afterEach } from 'vitest';
import type {
  ReservationFacturable,
  PaiementAcompteValide,
  PaiementSoldeValide,
} from '../../../src/schemas/types/facturation.types';
import type {
  EnvoiCourriel,
  DepotEmissionFacture,
  Horloge,
  CourrielFacturation,
  StatutEmissionFacture,
} from '../../../src/schemas/types/facturation-ports.types';
import { emettreFactureAcompteApresPaiement } from '../../../src/actions/emettre-facture-acompte-apres-paiement';
import { emettreFactureSoldeApresPaiement } from '../../../src/actions/emettre-facture-solde-apres-paiement';

class EnvoiCourrielEnMemoire implements EnvoiCourriel {
  public messagesEnvoyes: CourrielFacturation[] = [];
  envoyer(message: CourrielFacturation): void {
    this.messagesEnvoyes.push(message);
  }
}

class DepotEmissionFactureEnMemoire implements DepotEmissionFacture {
  public statutsEnregistres: StatutEmissionFacture[] = [];
  enregistrerStatutEmission(entree: StatutEmissionFacture): void {
    this.statutsEnregistres.push(entree);
  }
  obtenirStatutEmission(
    reservationId: string,
    typeFacture: 'acompte' | 'solde'
  ): StatutEmissionFacture | undefined {
    return this.statutsEnregistres.find(
      (s) => s.reservationId === reservationId && s.typeFacture === typeFacture
    );
  }
}

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

it('test_CASE_FAC_716_inclusion_recapitulatif_reservation_corps_courriel', () => {
  // Étant donné une réservation confirmée pour une sortie « Baleines » le 18/08/2026 à 9h00 au
  // départ de Saint-Leu pour 2 adultes (montant total TTC de 150 €, acompte de 45 € réglé, solde
  // restant dû de 105 €)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-716',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.recapitulatif@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le courriel transactionnel d'envoi de la facture d'acompte est généré
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le corps du courriel (texte ou HTML) contient le récapitulatif de la réservation
  // Et ce récapitulatif mentionne explicitement la date (18/08/2026), l'horaire (9h00), le port
  // (Saint-Leu), le nombre de passagers (2 adultes), le montant total TTC (150 €), l'acompte
  // réglé (45 €) et le solde restant dû (105 €)
  const recapitulatifAcompte = envoiCourriel.messagesEnvoyes[0].recapitulatifReservation;
  expect(recapitulatifAcompte).toEqual(expect.stringContaining('18/08/2026'));
  expect(recapitulatifAcompte).toEqual(expect.stringContaining('9h00'));
  expect(recapitulatifAcompte).toEqual(expect.stringContaining('Saint-Leu'));
  expect(recapitulatifAcompte).toEqual(expect.stringContaining('2'));
  expect(recapitulatifAcompte).toEqual(expect.stringContaining('150'));
  expect(recapitulatifAcompte).toEqual(expect.stringContaining('45'));
  expect(recapitulatifAcompte).toEqual(expect.stringContaining('105'));

  // Quand le solde est réglé et que le courriel transactionnel d'envoi de la facture de solde est
  // généré
  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };
  emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le récapitulatif de ce second courriel mentionne le rappel de l'acompte perçu (45 €) et
  // l'acquittement complet du montant total TTC (150 €)
  const recapitulatifSolde = envoiCourriel.messagesEnvoyes[1].recapitulatifReservation;
  expect(recapitulatifSolde).toEqual(expect.stringContaining('45'));
  expect(recapitulatifSolde).toEqual(expect.stringContaining('150'));
});
