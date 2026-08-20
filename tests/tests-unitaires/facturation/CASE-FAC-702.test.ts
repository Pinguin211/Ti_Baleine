/**
 * CASE-FAC-702 — Facturation de l'acompte d'une réservation standard au départ de Saint-Gilles
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

it('test_CASE_FAC_702_facturation_acompte_reservation_standard_saint_gilles_sans_supplement', () => {
  // Étant donné une réservation individuelle pour une sortie « Baleines » au départ du port de
  // « Saint-Gilles », 1 adulte, tarif de base standard de 65 € sans supplément géographique (0 €)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-702',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 7, 0),
    portEmbarquement: 'Saint-Gilles',
    nombreAdultes: 1,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 0,
    emailClient: 'client.saint-gilles@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 7, 5));

  // Quand le paiement en ligne de l'acompte de 30 % (19,50 €) est validé avec succès
  const paiementAcompte: PaiementAcompteValide = {
    montantRegle: 19.5,
    statut: 'validé avec succès',
  };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la facture d'acompte PDF est générée à la volée avec la mention explicite
  // « Acompte acquitté »
  expect(factureAcompte).toMatchObject({ mentionAcompte: 'Acompte acquitté' });

  // Et la facture PDF mentionne explicitement le port d'embarquement « Saint-Gilles »
  expect(factureAcompte.portEmbarquement).toBe('Saint-Gilles');

  // Et la facture PDF détaille la ligne tarifaire 1 adulte à 65 € sans aucune majoration
  // géographique, le montant total TTC de la commande (65 €), l'acompte réglé (19,50 €) et le
  // solde restant dû (45,50 €)
  expect(factureAcompte.lignesTarifaires).toContainEqual(
    expect.objectContaining({ quantite: 1, montantUnitaire: 65, montantLigne: 65 })
  );
  expect(
    factureAcompte.lignesTarifaires.some((ligne) => /supplément|majoration/i.test(ligne.libelle))
  ).toBe(false);
  expect(factureAcompte).toMatchObject({
    montantTotalTtc: 65,
    acompteRegle: 19.5,
    soldeRestantDu: 45.5,
  });
});
