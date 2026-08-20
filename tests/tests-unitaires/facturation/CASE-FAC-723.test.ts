/**
 * CASE-FAC-723 — Traitement idempotent d'une notification de paiement reçue en double, contrôlé
 * indépendamment pour la facture d'acompte et la facture de solde
 * SPEC-FAC-02 | AC-8, Cas limite #4
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

it('test_CASE_FAC_723_traitement_idempotent_notification_paiement_double_acompte_et_solde_independants', () => {
  // Étant donné une réservation dont le paiement de l'acompte a déjà été validé et dont la
  // facture d'acompte a déjà été marquée « envoyée avec succès » en base de données
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-723',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.webhook-double@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const envoyerSpy = vi.spyOn(envoiCourriel, 'envoyer');
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  const factureAcompteInitiale = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );
  expect(envoyerSpy).toHaveBeenCalledTimes(1);
  expect(depotEmission.statutsEnregistres).toHaveLength(1);

  // Quand une notification de confirmation de paiement d'acompte identique est reçue une seconde
  // fois (webhook en doublon ou rejeu réseau)
  const resultatDoublon = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le système consulte l'indicateur d'émission de la facture d'acompte déjà présent en
  // base de données et bloque toute nouvelle génération de fichier PDF d'acompte et tout nouvel
  // envoi de courriel correspondant
  expect(resultatDoublon).toBeNull();
  expect(envoyerSpy).toHaveBeenCalledTimes(1);

  // Et l'état d'émission de la facture d'acompte en base reste unique sans création d'entrée en
  // double
  expect(depotEmission.statutsEnregistres).toHaveLength(1);
  expect(depotEmission.statutsEnregistres[0]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'acompte',
    statut: 'envoyée avec succès',
  });

  // Quand le solde est ensuite réglé pour la première fois
  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };
  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompteInitiale.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le système déclenche normalement la génération et l'envoi de la facture de solde,
  // l'indicateur de solde étant contrôlé indépendamment de celui de l'acompte
  expect(factureSolde).toMatchObject({ mentionSolde: 'Acquittée' });
  expect(envoyerSpy).toHaveBeenCalledTimes(2);
  expect(depotEmission.statutsEnregistres).toHaveLength(2);
  expect(depotEmission.statutsEnregistres[1]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'solde',
    statut: 'envoyée avec succès',
  });
});
