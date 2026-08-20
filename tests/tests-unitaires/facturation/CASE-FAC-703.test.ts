/**
 * CASE-FAC-703 — Facturation de l'acompte d'une sortie « Dauphins » au tarif correspondant
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

it('test_CASE_FAC_703_facturation_acompte_sortie_dauphins_tarif_specifique', () => {
  // Étant donné une réservation individuelle pour l'activité « Sortie Dauphins » au départ du port
  // de « Saint-Gilles », 1 adulte, tarif de base adulte spécifique dauphins de 50 €
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-703',
    prestation: 'Sortie Dauphins',
    dateDepart: new Date(2026, 7, 18, 10, 0),
    portEmbarquement: 'Saint-Gilles',
    nombreAdultes: 1,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 50,
    majorationGeographiqueParPersonne: 0,
    emailClient: 'client.dauphins@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 10, 5));

  // Quand le paiement en ligne de l'acompte de 30 % (15,00 €) est validé avec succès
  const paiementAcompte: PaiementAcompteValide = {
    montantRegle: 15,
    statut: 'validé avec succès',
  };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF est générée à la volée avec la mention explicite
  // « Acompte acquitté »
  expect(factureAcompte).toMatchObject({ mentionAcompte: 'Acompte acquitté' });

  // Et la facture PDF mentionne explicitement la prestation « Dauphins »
  expect(factureAcompte.prestation).toContain('Dauphins');

  // Et la facture PDF détaille la ligne tarifaire 1 adulte à 50 €, le montant total TTC de la
  // commande (50 €), l'acompte réglé (15,00 €) et le solde restant dû (35,00 €)
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({ quantite: 1, montantUnitaire: 50, montantLigne: 50 })
  );
  expect(factureAcompte).toMatchObject({
    montantTotalTtc: 50,
    acompteRegle: 15,
    soldeRestantDu: 35,
  });
});
