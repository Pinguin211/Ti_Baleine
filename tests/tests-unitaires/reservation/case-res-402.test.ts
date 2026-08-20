/**
 * CASE-RES-402 — Réservation sur un créneau sous alerte de pré-annulation météo
 * SPEC-RESERVATION-03 | AC-7, AC-8 | Scénario 6
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit cinq.
 * Vocabulaire docs/uml/domain.puml : Creneau.sousPreAlerte, Alerte.message.
 *
 * Note : specs/reservation.md classe la formulation exacte de la mention parmi
 * « Ce qui n'est pas défini » ; le texte asserté est celui du cas de test.
 */
import { it, expect, vi } from 'vitest';
import type {
  Billet,
  CriteresRecherche,
  DepotReservations,
  Reservation,
  User,
} from '../../../src/schemas/types/booking.types';
import { listerCreneauxDuJour } from '../../../src/services/server/booking-slot.service';
import { calculerRecapitulatifTarifaire } from '../../../src/utils/pricing-rules';
import {
  determinerTypeBillet,
  enregistrerReservationApresPaiementAcompte,
} from '../../../src/services/server/booking.service';

/** Persistance simulée : ce qui entoure le cas, jamais la règle testée. */
class DepotReservationsEnMemoire implements DepotReservations {
  private readonly placesParCreneau = new Map<string, number>();
  constructor(placesDejaReservees: Record<string, number> = {}) {
    for (const [heure, places] of Object.entries(placesDejaReservees)) {
      this.placesParCreneau.set(heure, places);
    }
  }
  enregistrer(reservation: Reservation, placesBloquees: number): void {
    const cle = reservation.creneau.heureDepart;
    this.placesParCreneau.set(cle, this.compterPlacesReservees(cle) + placesBloquees);
  }
  compterPlacesReservees(heureDepart: string): number {
    return this.placesParCreneau.get(heureDepart) ?? 0;
  }
}

const DEMAIN = new Date(2026, 8, 17);
const HEURE_DEPART = '10h00';
const RECHERCHE: CriteresRecherche = {
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  date: DEMAIN,
};
const MENTION =
  'Créneau sous réserve météo — Remboursement à 100 % garanti en cas d\'annulation';
const CLIENT: User = {
  nom: 'Payet',
  prenom: 'Luc',
  email: 'luc.payet@test.re',
  telephone: '+262692112233',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_402_reservation_creneau_sous_alerte_preannulation_meteo_mention_avertissement', () => {
  // Étant donné un créneau à 10h00 disposant de 4 places libres (32 déjà réservées
  // sur la jauge standard de 36) et placé sous alerte de pré-annulation météo
  const depot = new DepotReservationsEnMemoire({ '10h00': 32 });
  const creneauxSousAlerte = [{ heureDepart: HEURE_DEPART, sousPreAlerte: true }];
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-402' })),
  };

  // Quand un client consulte le planning sur le parcours public
  // Alors le créneau de 10h00 est affiché avec une mention textuelle d'avertissement
  expect(
    listerCreneauxDuJour(RECHERCHE, depot, creneauxSousAlerte).find(
      (c) => c.heureDepart === HEURE_DEPART
    )
  ).toMatchObject({ placesRestantes: 4, mentionAvertissement: MENTION });

  // Quand le client sélectionne ce créneau pour 2 adultes
  // Alors le récapitulatif affiche un montant total de 130,00 €, un acompte
  // obligatoire de 30 % (39,00 €) et un solde restant dû de 91,00 €
  const billets: Billet[] = [
    { typeBillet: determinerTypeBillet(30) },
    { typeBillet: determinerTypeBillet(32) },
  ];
  expect(calculerRecapitulatifTarifaire(billets, RECHERCHE)).toMatchObject({
    montantTotal: 130,
    montantAcompte: 39,
    soldeRestantDu: 91,
  });

  // Quand le client renseigne ses coordonnées et valide le paiement de l'acompte
  // de 39,00 € par carte bancaire
  const resultat = enregistrerReservationApresPaiementAcompte(
    { client: CLIENT, creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART }, billets },
    { depot, passerellePaiement }
  );

  // Alors la réservation est enregistrée à l'état « payée partiellement »
  expect(resultat.reservation?.statut).toBe('PAYEE_PARTIELLEMENT');

  const creneauApres = listerCreneauxDuJour(RECHERCHE, depot, creneauxSousAlerte).find(
    (c) => c.heureDepart === HEURE_DEPART
  );

  // Et la jauge du créneau affiche 2 places libres restantes
  expect(creneauApres?.placesRestantes).toBe(2);

  // Et le créneau conserve sa mention d'avertissement affichée sur le site public
  expect(creneauApres?.mentionAvertissement).toBe(MENTION);
});
