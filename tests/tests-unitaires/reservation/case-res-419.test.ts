/**
 * CASE-RES-419 — Réservation effectuée le jour même : aucun SMS de solde, règlement
 * sur place
 * SPEC-RESERVATION-03 | AC-11 (R-08, Contrainte 26)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive, soit trois.
 * Vocabulaire docs/uml/domain.puml : Reservation.dateCreation (logique du cron J-1),
 * CanalPaiement.SUR_PLACE_CB, TokenPaiementSolde non généré.
 */
import { it, expect, vi } from 'vitest';
import type {
  Billet,
  CriteresRecherche,
  DepotReservations,
  Reservation,
  User,
} from '../../../src/schemas/types/booking.types';
import {
  determinerTypeBillet,
  enregistrerReservationApresPaiementAcompte,
} from '../../../src/services/server/booking.service';
import { executerTacheEnvoiSmsSoldeJMoins1 } from '../../../src/services/server/balance-payment.service';

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

/** Réservation passée le 20/08/2026 à 8h30 pour le créneau du même jour à 14h00. */
const MAINTENANT = new Date(2026, 7, 20, 8, 30);
const HEURE_DEPART = '14h00';
const RECHERCHE: CriteresRecherche = {
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  date: new Date(2026, 7, 20),
};
const CLIENT: User = {
  nom: 'Fontaine',
  prenom: 'Claire',
  email: 'claire.fontaine@test.re',
  telephone: '+262692445566',
  role: 'CLIENT',
  motDePasse: null,
};

it('test_CASE_RES_419_reservation_jour_meme_blocage_envoi_sms_solde_sur_place', () => {
  const depot = new DepotReservationsEnMemoire();
  const envoiSms = { envoyer: vi.fn() };
  const passerellePaiement = {
    debiter: vi.fn(() => ({ accepte: true, referenceTransaction: 'TX-CASE-RES-419' })),
  };
  const billets: Billet[] = [
    { typeBillet: determinerTypeBillet(30) },
    { typeBillet: determinerTypeBillet(32) },
  ];

  // Quand il sélectionne 2 adultes Baleines à Saint-Gilles (total 130,00 €)
  // Et règle en ligne l'acompte obligatoire de 30 % (39,00 €) par carte bancaire
  const resultat = enregistrerReservationApresPaiementAcompte(
    {
      client: CLIENT,
      creneau: { ...RECHERCHE, heureDepart: HEURE_DEPART },
      billets,
      dateCreation: MAINTENANT,
    },
    { depot, passerellePaiement }
  );

  // Alors la réservation est enregistrée à l'état « payée partiellement » avec un
  // solde restant dû de 91,00 €
  expect(resultat.reservation).toMatchObject({
    statut: 'PAYEE_PARTIELLEMENT',
    soldeRestantDu: 91,
  });

  // Et le système exclut strictement cette réservation de la file d'envoi des SMS
  // de solde (0 SMS généré)
  expect(
    executerTacheEnvoiSmsSoldeJMoins1([resultat.reservation!], MAINTENANT, { envoiSms })
  ).toEqual([]);

  // Et la page de confirmation ainsi que l'e-mail récapitulatif indiquent
  // explicitement le règlement du solde sur place
  expect(resultat.reservation?.mentionReglementSolde).toBe(
    'Règlement du solde obligatoire sur place par carte bancaire'
  );
});
