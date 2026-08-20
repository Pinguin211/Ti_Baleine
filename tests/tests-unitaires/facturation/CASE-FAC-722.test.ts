/**
 * CASE-FAC-722 — Non-déclenchement de la facturation lorsque le paiement de l'acompte ou du
 * solde est au statut « en attente » (pending)
 * SPEC-FAC-02 | AC-7
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

it('test_CASE_FAC_722_non_declenchement_facturation_statut_paiement_en_attente_acompte_ou_solde', () => {
  // Étant donné une transaction bancaire de l'acompte signalée avec un statut intermédiaire
  // « en attente » (pending)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-722',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.paiement-en-attente@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le système traite l'état de la réservation
  const paiementAcompteEnAttente: PaiementAcompteValide = { montantRegle: 0, statut: 'en attente' };
  const resultatAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompteEnAttente },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la génération de la facture PDF d'acompte reste suspendue, aucun courriel avec cette
  // facture n'est transmis au client, aucun statut « envoyée avec succès » n'est persisté en base
  // de données pour cette facture
  expect(resultatAcompte).toBeNull();
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(0);
  expect(depotEmission.statutsEnregistres).toHaveLength(0);

  // Étant donné une transaction bancaire du solde signalée avec un statut intermédiaire
  // « en attente » (pending)
  const paiementSoldeEnAttente: PaiementSoldeValide = { montantRegle: 0, statut: 'en attente' };
  const resultatSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSoldeEnAttente, acompteRegle: 45 },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors la génération de la facture PDF de solde reste suspendue, aucun courriel n'est
  // transmis, aucun statut « envoyée avec succès » n'est persisté en base pour cette facture
  expect(resultatSolde).toBeNull();
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(0);
  expect(depotEmission.statutsEnregistres).toHaveLength(0);
});
