/**
 * CASE-FAC-705 — Application de la majoration géographique Saint-Leu (+10 € / personne) sur le
 * profil tarifaire enfant, avec ventilation distincte sur la facture d'acompte
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

it('test_CASE_FAC_705_majoration_saint_leu_sur_profil_enfant_facture_acompte', () => {
  // Étant donné une réservation individuelle pour une sortie « Baleines » au départ de
  // « Saint-Leu », 1 adulte et 1 enfant, tarifs de base de 65 € (adulte) et 40 € (enfant), et un
  // supplément géographique de 10 € par personne (montant total TTC de la commande : 125 €)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-705',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 1,
    nombreEnfants: 1,
    tarifUnitaireAdulte: 65,
    tarifUnitaireEnfant: 40,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.majoration-enfant@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le paiement en ligne de l'acompte de 30 % (37,50 €) est validé avec succès
  const paiementAcompte: PaiementAcompteValide = {
    montantRegle: 37.5,
    statut: 'validé avec succès',
  };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF est générée à la volée avec la mention explicite
  // « Acompte acquitté »
  expect(factureAcompte).toMatchObject({ mentionAcompte: 'Acompte acquitté' });

  // Et la facture PDF ventile distinctement les montants de base (65 € adulte + 40 € enfant) et
  // les suppléments géographiques (2 × 10 € = 20 €)
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({ quantite: 1, montantUnitaire: 65, montantLigne: 65 })
  );
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({ quantite: 1, montantUnitaire: 40, montantLigne: 40 })
  );
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({
      libelle: expect.stringMatching(/supplément|majoration/i),
      quantite: 2,
      montantUnitaire: 10,
      montantLigne: 20,
    })
  );

  // Et le montant total TTC de la commande affiché sur la facture est de 125 €, l'acompte réglé
  // de 37,50 € et le solde restant dû de 87,50 €
  expect(factureAcompte).toMatchObject({
    montantTotalTtc: 125,
    acompteRegle: 37.5,
    soldeRestantDu: 87.5,
  });
});
