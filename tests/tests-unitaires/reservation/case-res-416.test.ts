/**
 * CASE-RES-416 — Rejet du paiement de l'acompte par carte bancaire
 * SPEC-RESERVATION-03 | AC-8 (cas limite 9)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit quatre.
 * Vocabulaire docs/uml/domain.puml : note Paiement « présent uniquement si validé
 * avec succès », Creneau.placesRestantes().
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
  nom: 'Payet',
  prenom: 'Luc',
  email: 'luc.payet@test.re',
  telephone: '+262692112233',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_416_echec_paiement_acompte_cb_aucune_reservation_jauge_intacte', () => {
  // Étant donné un panier de 2 adultes sur un créneau avec 10 places libres
  // (26 déjà réservées sur la jauge standard de 36)
  const depot = new DepotReservationsEnMemoire({ '10h00': 26 });
  const billets: Billet[] = [
    { typeBillet: determinerTypeBillet(30) },
    { typeBillet: determinerTypeBillet(32) },
  ];

  // Quand le client engage le paiement de l'acompte par carte bancaire
  // Et que la transaction est rejetée par la passerelle de paiement
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: false, referenceTransaction: null })),
  };
  const resultat = enregistrerReservationApresPaiementAcompte(
    { client: CLIENT, creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART }, billets },
    { depot, passerellePaiement }
  );

  // Alors le système affiche un message d'erreur de paiement explicite
  expect(resultat.messageErreur).toEqual(expect.stringMatching(/.+/));

  // Et invite le client à renouveler sa tentative
  expect(resultat.renouvellementPossible).toBe(true);

  // Et aucune réservation n'est persistée à l'état « payée » ou « payée partiellement »
  expect(resultat.reservation).toBeNull();

  // Et la jauge du créneau conserve ses 10 places libres disponibles
  expect(
    listerCreneauxDuJour(RECHERCHE, depot).find((c) => c.heureDepart === HEURE_DEPART)
      ?.placesRestantes
  ).toBe(10);
});
