/**
 * CASE-FAC-707 — Présence obligatoire et unicité des identifiants de facture d'acompte et de
 * solde
 * SPEC-FAC-02 | AC-1, AC-2, Scénario 1, Portée §1
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

it('test_CASE_FAC_707_presence_obligatoire_et_unicite_identifiants_facture_acompte_solde', () => {
  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Étant donné une réservation dont l'acompte puis le solde ont été réglés avec succès
  const reservationA: ReservationFacturable = {
    id: 'RESA-CASE-FAC-707-A',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.a@test.re',
  };
  const paiementAcompteA: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  const paiementSoldeA: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };

  // Et, pour deux réservations distinctes, les identifiants de facture générés sont également
  // strictement distincts entre eux
  const reservationB: ReservationFacturable = {
    id: 'RESA-CASE-FAC-707-B',
    prestation: 'Sortie Dauphins',
    dateDepart: new Date(2026, 7, 20, 10, 0),
    portEmbarquement: 'Saint-Gilles',
    nombreAdultes: 1,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 50,
    majorationGeographiqueParPersonne: 0,
    emailClient: 'client.b@test.re',
  };
  const paiementAcompteB: PaiementAcompteValide = { montantRegle: 15, statut: 'validé avec succès' };
  const paiementSoldeB: PaiementSoldeValide = { montantRegle: 35, statut: 'validé avec succès' };

  // Quand la facture d'acompte PDF puis la facture de solde PDF sont générées à la volée pour
  // cette réservation
  const factureAcompteA = emettreFactureAcompteApresPaiement(
    { reservation: reservationA, paiement: paiementAcompteA },
    { envoiCourriel, depotEmission, horloge }
  );
  const factureSoldeA = emettreFactureSoldeApresPaiement(
    { reservation: reservationA, paiement: paiementSoldeA, acompteRegle: factureAcompteA.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );
  const factureAcompteB = emettreFactureAcompteApresPaiement(
    { reservation: reservationB, paiement: paiementAcompteB },
    { envoiCourriel, depotEmission, horloge }
  );
  const factureSoldeB = emettreFactureSoldeApresPaiement(
    { reservation: reservationB, paiement: paiementSoldeB, acompteRegle: factureAcompteB.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors chaque facture PDF comporte obligatoirement un identifiant de facture non vide
  const identifiants = [
    factureAcompteA.identifiantUnique,
    factureSoldeA.identifiantUnique,
    factureAcompteB.identifiantUnique,
    factureSoldeB.identifiantUnique,
  ];
  for (const identifiant of identifiants) {
    expect(identifiant).toEqual(expect.stringMatching(/.+/));
  }

  // Et l'identifiant de la facture d'acompte (ex: « FACT-AC-2026-00123 ») est strictement
  // distinct de l'identifiant de la facture de solde (ex: « FACT-SO-2026-00456 »)
  expect(factureAcompteA.identifiantUnique).not.toBe(factureSoldeA.identifiantUnique);
  expect(factureAcompteB.identifiantUnique).not.toBe(factureSoldeB.identifiantUnique);

  // Et, pour deux réservations distinctes, les identifiants de facture générés sont également
  // strictement distincts entre eux
  expect(new Set(identifiants).size).toBe(identifiants.length);
});
