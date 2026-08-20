/**
 * CASE-FAC-718 — Traitement d'un échec d'envoi SMTP pour la facture d'acompte ou de solde :
 * passage à l'état « échec d'émission » et horodatage en base
 * SPEC-FAC-02 | AC-4, AC-5, Cas limite #1
 */
import { readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
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

class EnvoiCourrielEnPanne implements EnvoiCourriel {
  envoyer(): void {
    throw new Error('Service SMTP indisponible (panne / coupure réseau)');
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

it('test_CASE_FAC_718_echec_envoi_smtp_passage_statut_echec_emission_acompte_ou_solde', () => {
  // Étant donné une réservation dont le paiement de l'acompte (ou du solde) est validé avec
  // succès, et un service d'envoi de courriel indisponible (panne SMTP ou coupure réseau)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-718',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.panne-smtp@test.re',
  };

  const envoiCourrielEnPanne = new EnvoiCourrielEnPanne();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  const fichiersAvant = readdirSync(tmpdir());

  // Quand le système tente d'expédier le courriel avec la facture d'acompte PDF
  // Alors l'échec d'envoi est intercepté sans bloquer le processus global
  expect(() =>
    emettreFactureAcompteApresPaiement(
      { reservation, paiement: { montantRegle: 45, statut: 'validé avec succès' } },
      { envoiCourriel: envoiCourrielEnPanne, depotEmission, horloge }
    )
  ).not.toThrow();

  // Et l'état d'émission de la facture concernée (acompte) en base de données passe à
  // « échec d'émission »
  // Et l'horodatage de la tentative d'émission est enregistré en base pour cette facture
  expect(depotEmission.statutsEnregistres[0]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'acompte',
    statut: 'échec d\'émission',
    horodatage: horloge.maintenant(),
  });

  // Quand le système tente d'expédier le courriel avec la facture de solde PDF
  expect(() =>
    emettreFactureSoldeApresPaiement(
      { reservation, paiement: { montantRegle: 105, statut: 'validé avec succès' }, acompteRegle: 45 },
      { envoiCourriel: envoiCourrielEnPanne, depotEmission, horloge }
    )
  ).not.toThrow();

  // Alors l'état d'émission de la facture de solde passe également à « échec d'émission » avec
  // son horodatage
  expect(depotEmission.statutsEnregistres[1]).toMatchObject({
    reservationId: reservation.id,
    typeFacture: 'solde',
    statut: 'échec d\'émission',
    horodatage: horloge.maintenant(),
  });

  // Et aucun fichier PDF physique n'est conservé sur le disque du serveur
  const fichiersApres = readdirSync(tmpdir());
  const nouveauxFichiersPdf = fichiersApres.filter(
    (fichier) => !fichiersAvant.includes(fichier) && fichier.endsWith('.pdf')
  );
  expect(nouveauxFichiersPdf).toHaveLength(0);
});
