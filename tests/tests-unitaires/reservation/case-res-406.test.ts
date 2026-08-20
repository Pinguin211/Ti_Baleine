/**
 * CASE-RES-406 — Réservation d'une privatisation (Grand Bleu à Saint-Gilles)
 * SPEC-RESERVATION-03 | AC-5, AC-8 | Scénario 3
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit quatre.
 * Vocabulaire docs/uml/domain.puml : ConfigActivite.forfait / tauxAcompte (50 %),
 * TypeBillet.PRIVATISATION, Creneau.placesRestantes().
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
import { enregistrerReservationApresPaiementAcompte } from '../../../src/services/server/booking.service';

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

const DATE_SORTIE = new Date(2026,8,19);
const HEURE_DEPART = '14h00';
const RECHERCHE: CriteresRecherche = {
  port: 'SAINT_GILLES',
  activite: 'PRIVATISATION_GRAND_BLEU',
  date: DATE_SORTIE,
};
/** Privatisation : billet unique porteur du forfait (domain.puml, note Billet). */
const BILLETS: Billet[] = [{ typeBillet: 'PRIVATISATION' }];
const CLIENT: User = {
  nom: 'Leroy',
  prenom: 'Sophie',
  email: 'sophie.leroy@test.re',
  telephone: '+262692778899',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_406_reservation_privatisation_grand_bleu_saint_gilles_acompte_50_pourcent', () => {
  const depot = new DepotReservationsEnMemoire();
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-406' })),
  };

  const recapitulatif = calculerRecapitulatifTarifaire(BILLETS, RECHERCHE);

  // Alors le montant forfaitaire total affiché est de 1 100,00 €
  expect(recapitulatif.montantTotal).toBe(1100);

  // Et le récapitulatif affiche l'acompte obligatoire de 50 % et le solde restant dû
  expect(recapitulatif).toMatchObject({
    montantAcompte: 550,
    soldeRestantDu: 550,
  });

  // Quand le client renseigne ses coordonnées et valide le règlement CB de l'acompte
  const resultat = enregistrerReservationApresPaiementAcompte(
    { client: CLIENT, creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART }, billets: BILLETS },
    { depot, passerellePaiement }
  );

  // Alors la réservation est enregistrée à l'état « payée partiellement »
  expect(resultat.reservation?.statut).toBe('PAYEE_PARTIELLEMENT');

  // Et la jauge du créneau est intégralement bloquée
  expect(
    listerCreneauxDuJour(RECHERCHE, depot).find((c) => c.heureDepart === HEURE_DEPART)
      ?.placesRestantes
  ).toBe(0);
});
