/**
 * CASE-FAC-706 — Émission des factures d'acompte et de solde d'une privatisation forfaitaire au
 * départ de Saint-Leu sans application de majoration géographique
 * SPEC-FAC-02 | AC-1, AC-2, AC-3, Scénario 2, Cas limite #5
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

it('test_CASE_FAC_706_facturation_acompte_solde_privatisation_saint_leu_sans_majoration', () => {
  // Étant donné une réservation pour une prestation « Privatisation demi-journée matin » sur le
  // Tikap, port de départ « Saint-Leu », montant forfaitaire de 600 €, sans majoration
  // géographique par passager
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-706',
    prestation: 'Privatisation demi-journée matin',
    dateDepart: new Date(2026, 7, 18, 7, 0),
    portEmbarquement: 'Saint-Leu',
    montantForfaitaire: 600,
    emailClient: 'contact.privatisation-st-leu@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 7, 5));

  // Quand le paiement en ligne de l'acompte de 50 % (300 €) est confirmé
  const paiementAcompte: PaiementAcompteValide = {
    montantRegle: 300,
    statut: 'validé avec succès',
  };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF est générée à la volée avec un identifiant unique, la mention
  // explicite « Acompte acquitté », le montant total (600 €), l'acompte réglé (300 €) et le solde
  // restant dû (300 €)
  expect(factureAcompte).toMatchObject({
    identifiantUnique: expect.stringMatching(/.+/),
    mentionAcompte: 'Acompte acquitté',
    montantTotalTtc: 600,
    acompteRegle: 300,
    soldeRestantDu: 300,
  });

  // Et la facture d'acompte PDF mentionne le port d'embarquement « Saint-Leu » et la ligne
  // forfaitaire unique sans aucun supplément géographique par passager
  expect(factureAcompte.portEmbarquement).toBe('Saint-Leu');
  expect(
    factureAcompte.lignesTarifaires.some((ligne) => /supplément|majoration/i.test(ligne.libelle))
  ).toBe(false);

  // Quand le solde de 300 € est réglé (en ligne via le lien SMS ou sur place en CB)
  const paiementSolde: PaiementSoldeValide = {
    montantRegle: 300,
    statut: 'validé avec succès',
  };

  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture de solde distincte PDF est générée à la volée avec un identifiant unique
  // distinct, la mention explicite « Acquittée », le rappel de l'acompte (300 €) et
  // l'acquittement complet des 600 €
  expect(factureSolde).toMatchObject({
    identifiantUnique: expect.toSatisfy(
      (valeur: string) => valeur.length > 0 && valeur !== factureAcompte.identifiantUnique
    ),
    mentionSolde: 'Acquittée',
    rappelAcompte: 300,
    montantTotalAcquitte: 600,
  });
  expect(factureSolde.portEmbarquement).toBe('Saint-Leu');
});
