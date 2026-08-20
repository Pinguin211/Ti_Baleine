/**
 * CASE-FAC-700 — Émission des factures d'acompte et de solde après paiement d'une réservation
 * individuelle à Saint-Leu
 * SPEC-FAC-02 | AC-1, AC-2, AC-3, AC-6, Scénario 1
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

it('test_CASE_FAC_700_emission_facture_acompte_puis_solde_reservation_individuelle_saint_leu', () => {
  // Étant donné une réservation individuelle pour une sortie « Baleines » pour 2 adultes au départ
  // de Saint-Leu le mardi 18/08/2026 à 9h00 (montant total TTC : 150 € incluant le tarif de base de
  // 65 € / adulte et le supplément géographique de 10 € / personne)
  // Et l'adresse courriel client renseignée « client.exemple@test.re »
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-700',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.exemple@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le paiement en ligne de l'acompte de 30 % (45 €) est validé avec succès
  const paiementAcompte: PaiementAcompteValide = {
    montantRegle: 45,
    statut: 'validé avec succès',
  };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF est générée à la volée avec un identifiant unique, la mention
  // explicite « Acompte acquitté », le montant total TTC (150 €), l'acompte réglé (45 €) et le
  // solde restant dû (105 €)
  expect(factureAcompte).toMatchObject({
    identifiantUnique: expect.stringMatching(/.+/),
    mentionAcompte: 'Acompte acquitté',
    montantTotalTtc: 150,
    acompteRegle: 45,
    soldeRestantDu: 105,
  });

  // Et un courriel transactionnel contenant la facture d'acompte PDF en pièce jointe et le
  // récapitulatif est envoyé à « client.exemple@test.re »
  expect(envoiCourriel.messagesEnvoyes[0]).toMatchObject({
    destinataire: 'client.exemple@test.re',
    pieceJointe: {
      nomFichier: expect.any(String),
      contenu: factureAcompte.contenu,
      typeMime: 'application/pdf',
    },
    recapitulatifReservation: expect.any(String),
  });

  // Et l'état d'émission de la facture d'acompte est persisté en base de données à
  // « envoyée avec succès »
  expect(depotEmission.statutsEnregistres[0]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'acompte',
    statut: 'envoyée avec succès',
  });

  // Quand le client règle ultérieurement le solde de 105 € (en ligne via le lien SMS ou sur place
  // en CB)
  const paiementSolde: PaiementSoldeValide = {
    montantRegle: 105,
    statut: 'validé avec succès',
  };

  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture de solde distincte PDF est générée à la volée avec un identifiant unique
  // distinct, la mention explicite « Acquittée », le rappel de l'acompte (45 €) et l'acquittement
  // complet des 150 €
  expect(factureSolde).toMatchObject({
    identifiantUnique: expect.toSatisfy(
      (valeur: string) => valeur.length > 0 && valeur !== factureAcompte.identifiantUnique
    ),
    mentionSolde: 'Acquittée',
    rappelAcompte: 45,
    montantTotalAcquitte: 150,
  });

  // Et un courriel contenant la facture de solde PDF en pièce jointe est envoyé à
  // « client.exemple@test.re »
  expect(envoiCourriel.messagesEnvoyes[1]).toMatchObject({
    destinataire: 'client.exemple@test.re',
    pieceJointe: {
      nomFichier: expect.any(String),
      contenu: factureSolde.contenu,
      typeMime: 'application/pdf',
    },
  });

  // Et l'état d'émission de la facture de solde est persisté en base de données à
  // « envoyée avec succès »
  expect(depotEmission.statutsEnregistres[1]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'solde',
    statut: 'envoyée avec succès',
  });
});
