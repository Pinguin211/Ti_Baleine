/**
 * CASE-FAC-714 — Expédition immédiate du courriel transactionnel (facture d'acompte ou de solde)
 * à l'adresse e-mail renseignée lors de la commande
 * SPEC-FAC-02 | AC-6, Règle
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

it('test_CASE_FAC_714_expedition_immediate_courriel_transactionnel_adresse_client_acompte_et_solde', () => {
  // Étant donné un client ayant renseigné l'adresse de contact « client.exemple@test.re » lors de
  // sa commande
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-714',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.exemple@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand le paiement de l'acompte de sa réservation est validé avec succès
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le système déclenche immédiatement l'envoi du courriel transactionnel de la facture
  // d'acompte
  // Et le destinataire (« To: ») de ce courriel est exactement « client.exemple@test.re »
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(1);
  expect(envoiCourriel.messagesEnvoyes[0].destinataire).toBe('client.exemple@test.re');

  // Quand le solde est réglé ultérieurement
  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };
  emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le système déclenche immédiatement l'envoi du courriel transactionnel de la facture de
  // solde
  // Et le destinataire (« To: ») de ce second courriel est également exactement
  // « client.exemple@test.re »
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(2);
  expect(envoiCourriel.messagesEnvoyes[1].destinataire).toBe('client.exemple@test.re');
});
