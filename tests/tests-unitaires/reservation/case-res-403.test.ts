/**
 * CASE-RES-403 — Réservation d'une privatisation (Tikap à Saint-Leu)
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

const DATE_SORTIE = new Date(2026,7,25);
const HEURE_DEPART = '09h00';
const RECHERCHE: CriteresRecherche = {
  port: 'SAINT_LEU',
  activite: 'PRIVATISATION_TIKAP',
  date: DATE_SORTIE,
};
/** Privatisation : billet unique porteur du forfait (domain.puml, note Billet). */
const BILLETS: Billet[] = [{ typeBillet: 'PRIVATISATION' }];
const CLIENT: User = {
  nom: 'Morel',
  prenom: 'Thierry',
  email: 'thierry.morel@test.re',
  telephone: '+262693445566',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_403_reservation_privatisation_tikap_saint_leu_acompte_50_pourcent_jauge_bloquee', () => {
  const depot = new DepotReservationsEnMemoire();
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-403' })),
  };

  const recapitulatif = calculerRecapitulatifTarifaire(BILLETS, RECHERCHE);

  // Alors le montant forfaitaire affiché est de 600,00 € sans majoration géographique
  expect(recapitulatif.montantTotal).toBe(600);

  // Et le récapitulatif affiche l'acompte obligatoire de 50 % et le solde restant dû
  expect(recapitulatif).toMatchObject({
    montantAcompte: 300,
    soldeRestantDu: 300,
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
