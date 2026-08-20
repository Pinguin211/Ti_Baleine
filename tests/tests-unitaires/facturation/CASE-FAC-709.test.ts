/**
 * CASE-FAC-709 — Présence obligatoire de la date exacte et du créneau horaire de la prestation
 * sur les factures PDF (acompte et solde)
 * SPEC-FAC-02 | AC-3
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

it('test_CASE_FAC_709_presence_date_et_creneau_horaire_sur_factures_acompte_et_solde', () => {
  // Étant donné une réservation confirmée pour une sortie prévue le 18/08/2026, créneau 9h00
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-709',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.date-horaire@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand la facture d'acompte PDF est générée suite à la validation du paiement de l'acompte
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };

  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le document mentionne explicitement la date et l'horaire sous la forme d'une chaîne
  // unique consolidée au format standard strict « 18/08/2026 9h00 » (la séparation en deux champs
  // distincts « 18/08/2026 » et « 9h00 » n'est pas admise)
  expect(factureAcompte.dateEtHoraire).toBe('18/08/2026 9h00');

  // Quand le solde est réglé et que la facture de solde PDF est générée
  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };

  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors ce second document mentionne également la même date et le même horaire au format
  // standard
  expect(factureSolde.dateEtHoraire).toBe('18/08/2026 9h00');
});
