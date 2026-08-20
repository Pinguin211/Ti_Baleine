/**
 * CASE-RES-414 — Réservation de la dernière place disponible et passage du créneau
 * à l'état « Complet »
 * SPEC-RESERVATION-03 | AC-2, AC-8 (cas limite 7)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit quatre.
 * Vocabulaire docs/uml/domain.puml : Creneau.placesRestantes(), estReservable().
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

const DATE_SORTIE = new Date(2026, 8, 16);
const HEURE_DEPART = '10h00';
const RECHERCHE: CriteresRecherche = {
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  date: DATE_SORTIE,
};
const CLIENT: User = {
  nom: 'Grondin',
  prenom: 'Paul',
  email: 'paul.grondin@test.re',
  telephone: '+262692556677',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_414_reservation_derniere_place_passage_creneau_etat_complet', () => {
  // Étant donné un créneau disposant d'une unique place libre restante
  // (35 places déjà réservées sur 36)
  const depot = new DepotReservationsEnMemoire({ '10h00': 35 });
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-414' })),
  };

  // Et renseigne 1 adulte
  const billets: Billet[] = [{ typeBillet: determinerTypeBillet(30) }];

  // Alors le montant total affiché est de 65,00 €, l'acompte obligatoire de 30 %
  // est de 19,50 € et le solde restant dû est de 45,50 €
  expect(calculerRecapitulatifTarifaire(billets, RECHERCHE)).toMatchObject({
    montantTotal: 65,
    montantAcompte: 19.5,
    soldeRestantDu: 45.5,
  });

  // Quand il saisit ses coordonnées et valide le paiement bancaire de l'acompte
  const resultat = enregistrerReservationApresPaiementAcompte(
    { client: CLIENT, creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART }, billets },
    { depot, passerellePaiement }
  );

  // Alors la réservation est enregistrée à l'état « payée partiellement »
  expect(resultat.reservation?.statut).toBe('PAYEE_PARTIELLEMENT');

  const creneauApres = listerCreneauxDuJour(RECHERCHE, depot).find(
    (c) => c.heureDepart === HEURE_DEPART
  );

  // Et la capacité restante sur le créneau passe à 0 place
  expect(creneauApres?.placesRestantes).toBe(0);

  // Et le créneau est affiché à l'état « Complet » et n'est plus sélectionnable
  expect(creneauApres).toMatchObject({ mention: 'Complet', estReservable: false });
});
