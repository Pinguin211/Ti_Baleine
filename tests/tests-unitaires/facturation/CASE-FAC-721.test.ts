/**
 * CASE-FAC-721 — Non-déclenchement de la facturation lors d'un abandon ou d'une expiration de
 * session de paiement de l'acompte ou du solde (Timeout bancaire)
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

it('test_CASE_FAC_721_non_declenchement_facturation_abandon_ou_expiration_session_paiement_acompte_ou_solde', () => {
  // Étant donné une session de paiement de l'acompte ou du solde initiée
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-721',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.session-abandonnee@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le client abandonne la saisie bancaire ou que le délai de session de paiement de
  // l'acompte expire sans confirmation
  const paiementAcompteAbandonne: PaiementAcompteValide = { montantRegle: 0, statut: 'abandonné' };
  const resultatAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompteAbandonne },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le système ne déclenche aucune génération de facture PDF (ni d'acompte, ni de solde)
  // pour cette étape, aucun courriel transactionnel n'est expédié, aucun enregistrement
  // d'émission de facture n'est créé en base de données pour cette étape
  expect(resultatAcompte).toBeNull();
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(0);
  expect(depotEmission.statutsEnregistres).toHaveLength(0);

  // Quand le client abandonne la saisie bancaire ou que le délai de session de paiement du solde
  // expire sans confirmation
  const paiementSoldeAbandonne: PaiementSoldeValide = { montantRegle: 0, statut: 'abandonné' };
  const resultatSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSoldeAbandonne, acompteRegle: 45 },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le système ne déclenche aucune génération de facture PDF, aucun courriel n'est
  // expédié, aucun enregistrement d'émission n'est créé pour cette étape
  expect(resultatSolde).toBeNull();
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(0);
  expect(depotEmission.statutsEnregistres).toHaveLength(0);
});
