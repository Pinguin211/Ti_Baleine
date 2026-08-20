/**
 * CASE-FAC-708 — Présence obligatoire des mentions explicites « Acompte acquitté » / « Acquittée »
 * et des montants correspondants sur les factures PDF
 * SPEC-FAC-02 | AC-1, AC-2, Règle
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

it('test_CASE_FAC_708_mentions_acompte_acquitte_et_acquittee_montants_ttc_sur_pdf', () => {
  // Étant donné une réservation dont le montant total TTC à régler est de 150 €
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-708',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.mentions@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le paiement en ligne par carte bancaire de l'acompte de 30 % (45 €) est validé avec
  // succès
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF générée comporte obligatoirement et explicitement la mention
  // « Acompte acquitté »
  // Et la facture d'acompte PDF affiche le montant total TTC (150,00 €), l'acompte réglé
  // (45,00 €) et le solde restant dû (105,00 €)
  expect(factureAcompte).toMatchObject({
    mentionAcompte: 'Acompte acquitté',
    montantTotalTtc: 150,
    acompteRegle: 45,
    soldeRestantDu: 105,
  });

  // Quand le solde de 105 € est réglé ultérieurement
  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };

  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture de solde distincte PDF générée comporte obligatoirement et explicitement la
  // mention « Acquittée »
  // Et la facture de solde PDF affiche le rappel de l'acompte perçu (45,00 €) et l'acquittement
  // complet du montant total TTC (150,00 €)
  expect(factureSolde).toMatchObject({
    mentionSolde: 'Acquittée',
    rappelAcompte: 45,
    montantTotalAcquitte: 150,
  });
});
