/**
 * CASE-RES-405 — Grille tarifaire standard Saint-Gilles sur l'activité Dauphins
 * SPEC-RESERVATION-03 | AC-4, AC-8
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit cinq.
 * Vocabulaire docs/uml/domain.puml : ConfigActivite (Dauphins 50 € / 30 €,
 * acompte 30 %), Activite.DAUPHINS, Creneau.placesRestantes().
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

const VENDREDI = new Date(2026, 8, 18);
const HEURE_DEPART = '07h00';
const RECHERCHE: CriteresRecherche = {
  port: 'SAINT_GILLES',
  activite: 'DAUPHINS',
  date: VENDREDI,
};
const CLIENT: User = {
  nom: 'Técher',
  prenom: 'Alice',
  email: 'alice.techer@test.re',
  telephone: '+262692334455',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_405_grille_tarifaire_dauphins_saint_gilles_acompte_30_pourcent', () => {
  const depot = new DepotReservationsEnMemoire();
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-405' })),
  };
  const placesAvant = listerCreneauxDuJour(RECHERCHE, depot).find(
    (c) => c.heureDepart === HEURE_DEPART
  )?.placesRestantes;

  // Et renseigne 1 adulte et 1 enfant de 7 ans
  const billets: Billet[] = [
    { typeBillet: determinerTypeBillet(30) },
    { typeBillet: determinerTypeBillet(7) },
  ];
  const recapitulatif = calculerRecapitulatifTarifaire(billets, RECHERCHE);

  // Alors le tarif affiché est de 50,00 € pour l'adulte et de 30,00 € pour l'enfant
  expect({
    adulte: recapitulatif.tarifUnitaireAdulte,
    enfant: recapitulatif.tarifUnitaireEnfant,
  }).toEqual({ adulte: 50, enfant: 30 });

  // Et le montant total calculé est de 80,00 €
  expect(recapitulatif.montantTotal).toBe(80);

  // Et le récapitulatif affiche l'acompte obligatoire de 30 % (24,00 €) et le
  // solde restant dû (56,00 €)
  expect(recapitulatif).toMatchObject({ montantAcompte: 24, soldeRestantDu: 56 });

  // Quand il saisit ses coordonnées et valide le paiement CB de 24,00 €
  const resultat = enregistrerReservationApresPaiementAcompte(
    { client: CLIENT, creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART }, billets },
    { depot, passerellePaiement }
  );

  // Alors la réservation est enregistrée à l'état « payée partiellement »
  expect(resultat.reservation?.statut).toBe('PAYEE_PARTIELLEMENT');

  // Et la capacité du créneau est décrémentée de 2 places
  const placesApres = listerCreneauxDuJour(RECHERCHE, depot).find(
    (c) => c.heureDepart === HEURE_DEPART
  )?.placesRestantes;
  expect((placesAvant ?? 0) - (placesApres ?? 0)).toBe(2);
});
