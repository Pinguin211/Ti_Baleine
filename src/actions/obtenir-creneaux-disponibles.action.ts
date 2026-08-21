'use server';

/**
 * Frontière Server Action de lecture seule : créneaux disponibles d'un
 * port/date, valorisés par la jauge réellement consommée en base
 * (SPEC-RESERVATION-03). Composé autour de `listerCreneauxDuJour` (contrat
 * testé) dont la surcharge `(port, date)` ne connaît pas la jauge —
 * recalculée ici créneau par créneau via `compterPlacesReserveesPourCreneau`.
 */

import { listerCreneauxDuJour } from '../services/server/booking-slot.service';
import { calculerJaugeCreneau } from '../services/server/booking-capacity.service';
import { compterPlacesReserveesPourCreneau } from '../services/server/booking-repository.service';
import type { CreneauDisponible, Port } from '../schemas/types/booking.types';

export async function obtenirCreneauxDisponibles(port: Port, date: Date): Promise<CreneauDisponible[]> {
  const heures = listerCreneauxDuJour(port, date);

  return Promise.all(
    heures.map(async ({ heureDepart }) => {
      const jauge = calculerJaugeCreneau({ port, date, heureDepart });
      const placesReservees = await compterPlacesReserveesPourCreneau(port, date, heureDepart);
      const placesRestantes = Math.max(0, jauge - placesReservees);
      return {
        heureDepart,
        placesRestantes,
        estReservable: placesRestantes > 0,
        mention: placesRestantes <= 0 ? 'Complet' : undefined,
      };
    })
  );
}
