/**
 * CASE-RES-408 — Clôture automatique des réservations à moins de 2 heures du départ
 * SPEC-RESERVATION-03 | AC-3 (R-11)
 *
 * Une assertion par ligne « Alors » / « Et » conclusive du Gherkin, soit trois.
 * Vocabulaire aligné sur docs/uml/domain.puml (Creneau.estReservable()).
 * L'horloge est simulée — elle entoure le cas ; la règle de clôture ne l'est pas.
 */
import { it, expect } from 'vitest';
import {
  listerCreneauxVendables,
  soumettreDemandeReservation,
} from '../../../src/services/server/booking-slot.service';

const MAINTENANT = new Date(2026, 7, 20, 8, 15);
const CRENEAU = {
  date: new Date(2026, 7, 20),
  heureDepart: '10h00',
  port: 'SAINT_GILLES',
  activite: 'BALEINES',
  placesLibres: 10,
} as const;

it('test_CASE_RES_408_cloture_automatique_reservation_moins_de_2_heures_du_depart', () => {
  // Quand le client consulte les créneaux disponibles pour le jour même
  // Alors le créneau de 10h00 (départ dans 1h45) est affiché comme clos
  // (« Ventes fermées ») et n'est pas sélectionnable
  const creneaux = listerCreneauxVendables([CRENEAU], MAINTENANT);
  expect(creneaux.find((c) => c.heureDepart === '10h00')).toMatchObject({
    estReservable: false,
    mention: 'Ventes fermées',
  });

  // Quand une requête de réservation tente d'être soumise programmatiquement
  // Alors le système rejette la requête avec un message indiquant la clôture des
  // ventes à moins de 2 heures du départ
  const soumission = soumettreDemandeReservation(
    { creneau: CRENEAU, placesDemandees: 2 },
    MAINTENANT
  );
  expect(soumission).toMatchObject({ accepte: false, motif: 'CLOTURE_H_MOINS_2' });

  // Et aucune place n'est réservée
  expect(soumission.placesReservees).toBe(0);
});
