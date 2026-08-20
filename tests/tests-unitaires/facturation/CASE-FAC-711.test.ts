/**
 * CASE-FAC-711 — Mention explicite du port d'embarquement (Saint-Gilles ou Saint-Leu) sur les
 * factures PDF (acompte et solde)
 * SPEC-FAC-02 | AC-3, Scénario 1
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

it('test_CASE_FAC_711_mention_explicite_port_embarquement_sur_factures_acompte_et_solde', () => {
  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Étant donné une réservation individuelle pour laquelle le client a choisi le port de départ
  // « Saint-Leu »
  const reservationStLeu: ReservationFacturable = {
    id: 'RESA-CASE-FAC-711-ST-LEU',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.saint-leu@test.re',
  };

  // Quand le paiement en ligne de l'acompte est validé avec succès et la facture d'acompte PDF
  // générée
  const factureAcompteStLeu = emettreFactureAcompteApresPaiement(
    { reservation: reservationStLeu, paiement: { montantRegle: 45, statut: 'validé avec succès' } },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le document mentionne obligatoirement et sans équivoque le port d'embarquement
  // « Saint-Leu »
  expect(factureAcompteStLeu.portEmbarquement).toBe('Saint-Leu');

  // Quand le solde est réglé et que la facture de solde PDF est générée
  const factureSoldeStLeu = emettreFactureSoldeApresPaiement(
    {
      reservation: reservationStLeu,
      paiement: { montantRegle: 105, statut: 'validé avec succès' },
      acompteRegle: factureAcompteStLeu.acompteRegle,
    },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors ce second document mentionne également et sans équivoque le même port d'embarquement
  expect(factureSoldeStLeu.portEmbarquement).toBe('Saint-Leu');

  // Le test configure une seconde réservation au départ de Saint-Gilles et vérifie la mention
  // « Saint-Gilles » sur les deux factures
  const reservationStGilles: ReservationFacturable = {
    id: 'RESA-CASE-FAC-711-ST-GILLES',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 20, 7, 0),
    portEmbarquement: 'Saint-Gilles',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 0,
    emailClient: 'client.saint-gilles@test.re',
  };

  const factureAcompteStGilles = emettreFactureAcompteApresPaiement(
    { reservation: reservationStGilles, paiement: { montantRegle: 39, statut: 'validé avec succès' } },
    { envoiCourriel, depotEmission, horloge }
  );
  expect(factureAcompteStGilles.portEmbarquement).toBe('Saint-Gilles');

  const factureSoldeStGilles = emettreFactureSoldeApresPaiement(
    {
      reservation: reservationStGilles,
      paiement: { montantRegle: 91, statut: 'validé avec succès' },
      acompteRegle: factureAcompteStGilles.acompteRegle,
    },
    { envoiCourriel, depotEmission, horloge }
  );
  expect(factureSoldeStGilles.portEmbarquement).toBe('Saint-Gilles');
});
