/**
 * CASE-FAC-712 — Ligne détaillée sur les factures d'acompte et de solde pour le supplément
 * géographique Saint-Leu (10 € par personne)
 * SPEC-FAC-02 | AC-1, AC-2, AC-3, Scénario 1, Cas limite #5
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

it('test_CASE_FAC_712_ligne_detaillee_supplement_saint_leu_facture_acompte_et_solde', () => {
  // Étant donné une réservation individuelle pour 2 passagers adultes au départ de « Saint-Leu »,
  // tarif de base de 65 € par adulte, supplément géographique Saint-Leu de 10 € par personne
  // (montant total TTC de la commande : 150 €)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-712',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.supplement@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le paiement en ligne de l'acompte de 30 % (45 €) est validé avec succès
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF générée comporte une ligne dédiée ou une ventilation explicite
  // pour le supplément géographique Saint-Leu indiquant « 2 × 10 € » (soit 20 €)
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({
      libelle: expect.stringMatching(/supplément|majoration/i),
      quantite: 2,
      montantUnitaire: 10,
      montantLigne: 20,
    })
  );

  // Et le montant total TTC de la commande affiché intègre ce supplément pour atteindre 150 €,
  // avec un acompte réglé de 45 € et un solde restant dû de 105 €
  expect(factureAcompte).toMatchObject({
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

  // Alors le récapitulatif de la facture de solde rappelle également la ventilation du supplément
  // géographique Saint-Leu (20 €) au sein du montant total TTC acquitté (150 €)
  expect(factureSolde.lignesTarifaires).toContainEqual(
    expect.objectContaining({
      libelle: expect.stringMatching(/supplément|majoration/i),
      quantite: 2,
      montantUnitaire: 10,
      montantLigne: 20,
    })
  );
  expect(factureSolde.montantTotalAcquitte).toBe(150);
});
