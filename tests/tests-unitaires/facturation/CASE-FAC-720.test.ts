/**
 * CASE-FAC-720 — Non-déclenchement de la facturation en cas de transaction bancaire rejetée ou
 * refusée, sur l'acompte comme sur le solde
 * SPEC-FAC-02 | AC-7, Cas limite #3
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

it('test_CASE_FAC_720_non_declenchement_facturation_transaction_bancaire_rejetee_acompte_ou_solde', () => {
  // Étant donné une réservation en cours de paiement de l'acompte ou du solde
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-720',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.paiement-rejete@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand la tentative de paiement par carte bancaire de l'acompte est rejetée ou refusée par la
  // passerelle de paiement
  const paiementAcompteRejete: PaiementAcompteValide = { montantRegle: 0, statut: 'rejeté' };
  const resultatAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompteRejete },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors aucun document de facture PDF (d'acompte) n'est produit, aucun courriel de facturation
  // n'est envoyé, aucun statut d'émission de facture n'est créé en base de données pour cette
  // étape de paiement
  expect(resultatAcompte).toBeNull();
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(0);
  expect(depotEmission.statutsEnregistres).toHaveLength(0);

  // Quand la tentative de paiement par carte bancaire du solde est rejetée ou refusée par la
  // passerelle de paiement
  const paiementSoldeRejete: PaiementSoldeValide = { montantRegle: 0, statut: 'rejeté' };
  const resultatSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSoldeRejete, acompteRegle: 45 },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors aucun document de facture PDF (de solde) n'est produit, aucun courriel n'est envoyé,
  // aucun statut d'émission n'est créé en base de données pour cette étape de paiement
  expect(resultatSolde).toBeNull();
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(0);
  expect(depotEmission.statutsEnregistres).toHaveLength(0);
});
