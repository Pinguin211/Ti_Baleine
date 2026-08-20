/**
 * CASE-RES-401 — Réservation individuelle au départ de Saint-Leu avec majoration
 * géographique
 * SPEC-RESERVATION-03 | AC-2, AC-4, AC-8 | Scénario 2
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit six.
 * Vocabulaire docs/uml/domain.puml : ConfigPort.majorationIndividuelle (+10 €),
 * ConfigActivite.tarifBaseAdulte (65 €), Creneau.placesRestantes(), StatutReservation.
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

const MARDI = new Date(2026, 7, 18);
const HEURE_DEPART = '09h00';
const RECHERCHE: CriteresRecherche = {
  port: 'SAINT_LEU',
  activite: 'BALEINES',
  date: MARDI,
};
const CLIENT: User = {
  nom: 'Hoarau',
  prenom: 'Marie',
  email: 'marie.hoarau@test.re',
  telephone: '+262692987654',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_401_reservation_individuelle_saint_leu_majoration_acompte_payee_partiellement', () => {
  const depot = new DepotReservationsEnMemoire();
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-401' })),
  };

  // Quand il choisit le port de départ « Saint-Leu » et l'activité « Sortie Baleines »
  // Alors seuls les créneaux du mardi et jeudi à 9h00 sont proposés
  expect(listerCreneauxDuJour(RECHERCHE, depot)).toEqual([
    { heureDepart: '09h00', placesRestantes: 12 },
  ]);

  // Quand il sélectionne le créneau du mardi 18 août 2026 à 9h00
  // Et renseigne 2 adultes
  const billets: Billet[] = [
    { typeBillet: determinerTypeBillet(35) },
    { typeBillet: determinerTypeBillet(40) },
  ];
  const recapitulatif = calculerRecapitulatifTarifaire(billets, RECHERCHE);

  // Alors le tarif unitaire affiché pour chaque adulte est de 75,00 €
  // (65,00 € base + 10,00 € majoration Saint-Leu)
  expect(recapitulatif.tarifUnitaireAdulte).toBe(75);

  // Et le montant total calculé est de 150,00 €
  expect(recapitulatif.montantTotal).toBe(150);

  // Et le récapitulatif affiche l'acompte obligatoire de 30 % (45,00 €) et le
  // solde restant dû (105,00 €)
  expect(recapitulatif).toMatchObject({ montantAcompte: 45, soldeRestantDu: 105 });

  // Quand il renseigne ses coordonnées et valide le règlement CB de l'acompte de 45,00 €
  const resultat = enregistrerReservationApresPaiementAcompte(
    { client: CLIENT, creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART }, billets },
    { depot, passerellePaiement }
  );

  // Alors la réservation est enregistrée à l'état « payée partiellement »
  expect(resultat.reservation?.statut).toBe('PAYEE_PARTIELLEMENT');

  // Et la capacité restante sur le créneau de Saint-Leu passe à 10 places libres
  expect(
    listerCreneauxDuJour(RECHERCHE, depot).find((c) => c.heureDepart === HEURE_DEPART)
      ?.placesRestantes
  ).toBe(10);
});
