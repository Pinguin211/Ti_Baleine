/**
 * CASE-RES-400 — Réservation individuelle standard au départ de Saint-Gilles
 * SPEC-RESERVATION-03 | AC-2, AC-4, AC-8 | Scénario 1
 *
 * Traduction directe du gherkin de tests/cases/reservation/CASE-RES-400.md :
 * une assertion par ligne « Alors » ou « Et » conclusive, soit cinq.
 *
 * Vocabulaire aligné sur docs/uml/domain.puml : Creneau (heureDepart, port,
 * activite, placesRestantes()), Billet (typeBillet), Reservation (statut),
 * Paiement (referenceTransaction, montant), User (nom, prenom, email, telephone,
 * role, motDePasse), énumérations Port / Activite / TypeBillet / StatutReservation.
 *
 * Sont simulées la passerelle bancaire et la persistance — ce qui entoure le cas.
 * Le planning, la jauge, la tarification, le calcul de l'acompte et le passage de
 * statut sont l'objet même du cas et ne sont pas simulés.
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
/** Client en mode invité : motDePasse null (docs/uml/domain.puml, note User). */
const CLIENT: User = {
  nom: 'Dupont',
  prenom: 'Jean',
  email: 'jean.dupont@test.re',
  telephone: '+262692123456',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_400_reservation_individuelle_saint_gilles_acompte_payee_partiellement', () => {
  const depot = new DepotReservationsEnMemoire();
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-400' })),
  };

  // Quand il choisit le port de départ « Saint-Gilles », l'activité « Sortie
  // Baleines » et la date du mercredi 16 septembre 2026
  // Alors il voit les créneaux de 7h00, 10h00 et 14h00 proposés avec 36 places
  // libres chacun
  expect(listerCreneauxDuJour(RECHERCHE, depot)).toEqual([
    { heureDepart: '07h00', placesRestantes: 36 },
    { heureDepart: '10h00', placesRestantes: 36 },
    { heureDepart: '14h00', placesRestantes: 36 },
  ]);

  // Quand il sélectionne le créneau de 10h00
  // Et renseigne 1 adulte et 1 enfant de 8 ans
  const billets: Billet[] = [
    { typeBillet: determinerTypeBillet(30) },
    { typeBillet: determinerTypeBillet(8) },
  ];
  const recapitulatif = calculerRecapitulatifTarifaire(billets, RECHERCHE);

  // Alors le tarif affiché est de 65,00 € pour l'adulte et de 40,00 € pour l'enfant
  expect({
    adulte: recapitulatif.tarifUnitaireAdulte,
    enfant: recapitulatif.tarifUnitaireEnfant,
  }).toEqual({ adulte: 65, enfant: 40 });

  // Et le récapitulatif affiche un montant total de 105,00 €, un acompte
  // obligatoire de 30 % de 31,50 € et un solde restant dû de 73,50 €
  expect(recapitulatif).toMatchObject({
    montantTotal: 105,
    montantAcompte: 31.5,
    soldeRestantDu: 73.5,
  });

  // Quand il saisit ses coordonnées (« Dupont », « Jean », « jean.dupont@test.re »,
  // « +262692123456 »)
  // Et valide le paiement sécurisé par carte bancaire de l'acompte de 31,50 €
  const resultat = enregistrerReservationApresPaiementAcompte(
    { client: CLIENT, creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART }, billets },
    { depot, passerellePaiement }
  );

  // Alors la réservation est enregistrée à l'état « payée partiellement »
  expect(resultat.reservation?.statut).toBe('PAYEE_PARTIELLEMENT');

  // Et le créneau de 10h00 affiche 34 places libres
  const creneauApres = listerCreneauxDuJour(RECHERCHE, depot).find(
    (creneau) => creneau.heureDepart === HEURE_DEPART
  );
  expect(creneauApres?.placesRestantes).toBe(34);
});
