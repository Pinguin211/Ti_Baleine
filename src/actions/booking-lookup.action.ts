'use server';

/**
 * Consultation des créneaux disponibles pour le tunnel public de réservation,
 * lue depuis PostgreSQL. SPEC-RESERVATION-03
 *
 * Remplace `actions/demo-booking-lookup.action.ts` (store en mémoire).
 * Appelle directement `services/server/booking-slot.service.ts` (non
 * modifié) avec le dépôt PostgreSQL scopé au port et à la date demandés.
 */
import { listerCreneauxDuJour } from '../services/server/booking-slot.service';
import {
  construireDepotReservationsPubliquesDb,
  chargerCreneauxSousAlerte,
} from '../services/server/db/db-ports-booking';

export async function obtenirCreneauxDisponibles(
  port: 'SAINT_GILLES' | 'SAINT_LEU',
  activite: 'BALEINES' | 'DAUPHINS' | 'PRIVATISATION_TIKAP' | 'PRIVATISATION_GRAND_BLEU',
  date: Date,
) {
  const [depot, creneauxSousAlerte] = await Promise.all([
    construireDepotReservationsPubliquesDb(port, date),
    chargerCreneauxSousAlerte(port, date),
  ]);
  return listerCreneauxDuJour({ port, activite, date }, depot, creneauxSousAlerte);
}
