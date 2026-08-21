/**
 * booking-capacity.service.ts
 *
 * Jauges applicables par créneau selon la rotation des navires, offre de
 * privatisation disponible et contrôle du reliquat de places.
 * Référence : SPEC-RESERVATION-03 (AC-2, AC-5, R-10, R-12, REQ-108,
 * cas limites 5 et 6), CASE-RES-412, CASE-RES-413.
 */

import {
  CAPACITE_FLOTTE_COMPLETE,
  CAPACITE_GRAND_BLEU,
  CAPACITE_TIKAP,
} from '../../config/vessels.constants';
import { estCreneauDuMatin, estJourMardiOuJeudi } from '../../utils/slot-rules';
import type { Activite, Port } from '../../schemas/types/booking.types';

/** Créneau identifié par son port, sa date et son heure de départ. */
export interface CreneauCible {
  port: Port;
  date: Date;
  heureDepart: string;
}

/** Verdict de capacité opposé à une demande de places. */
export interface VerdictCapacite {
  accepte: boolean;
  placesRestantes: number;
  validationAutorisee: boolean;
}

/** Vrai lorsque le Tikap a quitté Saint-Gilles pour opérer à Saint-Leu (R-10). */
function estMatinDeRotationTikap(creneau: CreneauCible): boolean {
  return estJourMardiOuJeudi(creneau.date) && estCreneauDuMatin(creneau.heureDepart);
}

/**
 * Jauge maximale d'un créneau : la capacité du seul Tikap à Saint-Leu, celle
 * du seul Grand Bleu à Saint-Gilles les matins de rotation, et la flotte
 * complète le reste du temps.
 */
export function calculerJaugeCreneau(creneau: CreneauCible): number {
  if (creneau.port === 'SAINT_LEU') return CAPACITE_TIKAP;
  if (estMatinDeRotationTikap(creneau)) return CAPACITE_GRAND_BLEU;
  return CAPACITE_FLOTTE_COMPLETE;
}

/**
 * Formules de privatisation commercialisables sur un créneau : seul le navire
 * effectivement présent au port peut être privatisé.
 */
export function listerPrivatisationsDisponibles(creneau: CreneauCible): Activite[] {
  if (creneau.port === 'SAINT_LEU') return ['PRIVATISATION_TIKAP'];
  if (estMatinDeRotationTikap(creneau)) return ['PRIVATISATION_GRAND_BLEU'];
  return ['PRIVATISATION_TIKAP', 'PRIVATISATION_GRAND_BLEU'];
}

/**
 * Confronte le nombre de places demandées au reliquat du créneau : au-delà,
 * la configuration des passagers est bloquée et la validation désactivée.
 */
export function verifierCapaciteDemandee(
  creneau: { jauge: number; placesReservees: number },
  placesDemandees: number,
): VerdictCapacite {
  const placesRestantes = creneau.jauge - creneau.placesReservees;
  const accepte = placesDemandees <= placesRestantes;
  return { accepte, placesRestantes, validationAutorisee: accepte };
}
