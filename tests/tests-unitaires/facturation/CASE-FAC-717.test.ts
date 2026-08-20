/**
 * CASE-FAC-717 — Enregistrement de l'état d'émission à « envoyée avec succès » avec horodatage
 * en base, indépendamment pour la facture d'acompte et la facture de solde
 * SPEC-FAC-02 | AC-4, Scénarios 1 et 2
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

it('test_CASE_FAC_717_enregistrement_etat_emission_succes_avec_horodatage_acompte_et_solde', () => {
  // Étant donné une réservation pour laquelle le paiement de l'acompte en ligne a été validé
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-717',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.horodatage@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horlogeAcompte = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  // Quand la facture d'acompte PDF est générée à la volée et que le courriel est accepté par le
  // serveur SMTP
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge: horlogeAcompte }
  );

  // Alors un enregistrement de suivi d'émission de la facture d'acompte est créé ou mis à jour en
  // base de données
  // Et le statut d'émission de la facture d'acompte est égal à « envoyée avec succès » avec un
  // horodatage renseigné
  expect(depotEmission.statutsEnregistres[0]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'acompte',
    statut: 'envoyée avec succès',
    horodatage: horlogeAcompte.maintenant(),
  });

  // Quand le solde est réglé et que la facture de solde PDF est générée puis le courriel accepté
  // par le serveur SMTP (à un instant distinct)
  const horlogeSolde = new HorlogeFixe(new Date(2026, 7, 25, 14, 0));
  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };
  emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge: horlogeSolde }
  );

  // Alors un enregistrement de suivi d'émission distinct est créé pour la facture de solde
  // Et le statut d'émission de la facture de solde est égal à « envoyée avec succès » avec son
  // propre horodatage
  expect(depotEmission.statutsEnregistres[1]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'solde',
    statut: 'envoyée avec succès',
    horodatage: horlogeSolde.maintenant(),
  });
  expect(depotEmission.statutsEnregistres[1].horodatage).not.toEqual(
    depotEmission.statutsEnregistres[0].horodatage
  );
});
