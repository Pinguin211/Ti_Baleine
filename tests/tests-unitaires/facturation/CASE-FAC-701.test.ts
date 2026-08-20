/**
 * CASE-FAC-701 — Émission des factures d'acompte et de solde après paiement d'une privatisation
 * standard (Tikap, départ Saint-Gilles)
 * SPEC-FAC-02 | AC-1, AC-2, AC-3, AC-6, Scénario 2
 */
import { readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
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

it('test_CASE_FAC_701_emission_facture_acompte_puis_solde_privatisation_forfaitaire', () => {
  // Étant donné une réservation de type « Privatisation demi-journée matin (7h–12h) » sur le
  // Tikap, montant forfaitaire total de 600 €, adresse courriel client « contact@entreprise.re »
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-701',
    prestation: 'Privatisation demi-journée matin (7h–12h)',
    dateDepart: new Date(2026, 7, 18, 7, 0),
    portEmbarquement: 'Saint-Gilles',
    montantForfaitaire: 600,
    emailClient: 'contact@entreprise.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 7, 5));

  const fichiersAvant = readdirSync(tmpdir());

  // Quand le paiement en ligne de l'acompte de 50 % (300 €) est confirmé
  const paiementAcompte: PaiementAcompteValide = {
    montantRegle: 300,
    statut: 'validé avec succès',
  };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF est générée à la volée en mémoire avec un identifiant unique,
  // la mention explicite « Acompte acquitté », le montant total (600 €), l'acompte réglé (300 €)
  // et le solde restant dû (300 €)
  expect(factureAcompte).toMatchObject({
    identifiantUnique: expect.stringMatching(/.+/),
    mentionAcompte: 'Acompte acquitté',
    montantTotalTtc: 600,
    acompteRegle: 300,
    soldeRestantDu: 300,
  });

  // Et un courriel transactionnel contenant la facture d'acompte PDF en pièce jointe et le
  // récapitulatif de la réservation est envoyé à « contact@entreprise.re »
  expect(envoiCourriel.messagesEnvoyes[0]).toMatchObject({
    destinataire: 'contact@entreprise.re',
    pieceJointe: {
      nomFichier: expect.any(String),
      contenu: factureAcompte.contenu,
      typeMime: 'application/pdf',
    },
    recapitulatifReservation: expect.any(String),
  });

  // Et l'état d'émission de la facture d'acompte est persisté en base de données à
  // « envoyée avec succès » avec son horodatage
  expect(depotEmission.statutsEnregistres[0]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'acompte',
    statut: 'envoyée avec succès',
    horodatage: horloge.maintenant(),
  });

  // Quand le solde de 300 € est réglé (en ligne via le lien SMS ou sur place en CB)
  const paiementSolde: PaiementSoldeValide = {
    montantRegle: 300,
    statut: 'validé avec succès',
  };

  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture de solde distincte PDF de 600 € est générée à la volée avec un identifiant
  // unique distinct, la mention explicite « Acquittée », le rappel de l'acompte perçu (300 €) et
  // l'acquittement complet des 600 €
  expect(factureSolde).toMatchObject({
    identifiantUnique: expect.toSatisfy(
      (valeur: string) => valeur.length > 0 && valeur !== factureAcompte.identifiantUnique
    ),
    mentionSolde: 'Acquittée',
    rappelAcompte: 300,
    montantTotalAcquitte: 600,
  });

  // Et un courriel contenant la facture de solde PDF est envoyé à « contact@entreprise.re »
  expect(envoiCourriel.messagesEnvoyes[1]).toMatchObject({
    destinataire: 'contact@entreprise.re',
    pieceJointe: {
      nomFichier: expect.any(String),
      contenu: factureSolde.contenu,
      typeMime: 'application/pdf',
    },
  });

  // Et aucun fichier PDF physique n'est stocké sur le disque du serveur pour l'une ou l'autre
  // facture
  const fichiersApres = readdirSync(tmpdir());
  const nouveauxFichiersPdf = fichiersApres.filter(
    (fichier) => !fichiersAvant.includes(fichier) && fichier.endsWith('.pdf')
  );
  expect(nouveauxFichiersPdf).toHaveLength(0);

  // Et l'état d'émission de la facture de solde est persisté en base de données à
  // « envoyée avec succès » avec son horodatage
  expect(depotEmission.statutsEnregistres[1]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'solde',
    statut: 'envoyée avec succès',
    horodatage: horloge.maintenant(),
  });
});
