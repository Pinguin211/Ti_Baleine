/**
 * CASE-FAC-704 — Facturation de l'acompte d'une réservation mixte (adultes et enfants) avec
 * ventilation détaillée des lignes tarifaires sur le PDF
 * SPEC-FAC-02 | AC-1, AC-3
 */
import { it, expect, vi, afterEach } from 'vitest';
import type { ReservationFacturable, PaiementAcompteValide } from '../../../src/schemas/types/facturation.types';
import type {
  EnvoiCourriel,
  DepotEmissionFacture,
  Horloge,
  CourrielFacturation,
  StatutEmissionFacture,
} from '../../../src/schemas/types/facturation-ports.types';
import { emettreFactureAcompteApresPaiement } from '../../../src/actions/emettre-facture-acompte-apres-paiement';

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

it('test_CASE_FAC_704_facturation_acompte_mixte_adultes_enfants_ventilation_detaillee_pdf', () => {
  // Étant donné une réservation individuelle pour une sortie « Baleines » au port de
  // « Saint-Gilles », un groupe composé de 2 adultes et 1 enfant, tarifs unitaires de 65 € par
  // adulte et 40 € par enfant (montant total TTC de la commande : 170 €)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-704',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 7, 0),
    portEmbarquement: 'Saint-Gilles',
    nombreAdultes: 2,
    nombreEnfants: 1,
    tarifUnitaireAdulte: 65,
    tarifUnitaireEnfant: 40,
    majorationGeographiqueParPersonne: 0,
    emailClient: 'client.mixte@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 7, 5));

  // Quand le paiement en ligne de l'acompte de 30 % (51,00 €) est validé avec succès
  const paiementAcompte: PaiementAcompteValide = {
    montantRegle: 51,
    statut: 'validé avec succès',
  };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF est générée à la volée en mémoire avec la mention explicite
  // « Acompte acquitté »
  expect(factureAcompte).toMatchObject({ mentionAcompte: 'Acompte acquitté' });

  // Et la facture PDF présente distinctement une ligne pour 2 adultes (130 €) et une ligne pour
  // 1 enfant (40 €)
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({ quantite: 2, montantUnitaire: 65, montantLigne: 130 })
  );
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({ quantite: 1, montantUnitaire: 40, montantLigne: 40 })
  );

  // Et la facture PDF affiche le montant total TTC de la commande (170 €), l'acompte réglé
  // (51,00 €) et le solde restant dû (119,00 €)
  expect(factureAcompte).toMatchObject({
    montantTotalTtc: 170,
    acompteRegle: 51,
    soldeRestantDu: 119,
  });
});
