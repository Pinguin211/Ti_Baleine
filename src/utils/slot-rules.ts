/**
 * slot-rules.ts
 *
 * Helpers purs sur les créneaux : rotation des navires et des ports, fermeture
 * annuelle, découpage matin / après-midi, calculs d'échéances horaires et
 * dictionnaires d'adaptation Enums ↔ libellés d'affichage.
 * Référence : SPEC-RESERVATION-03 (R-01, R-02, R-10, R-11, R-20).
 *
 * SPEC-ARCH-02 : la couche `utils/` n'importe que `config/`.
 */

import {
  HEURES_DEPART_SAINT_GILLES,
  HEURES_DEPART_SAINT_LEU,
  HEURE_PIVOT_APRES_MIDI,
  JOURS_ROTATION_SAINT_LEU,
} from '../config/ports.constants';
import { JOURS_FERMETURE_ANNUELLE } from '../config/business.constants';
import { CAPACITE_FLOTTE_COMPLETE, CAPACITE_TIKAP } from '../config/vessels.constants';

const MILLISECONDES_PAR_HEURE = 3_600_000;

/** Libellés d'affichage des ports d'embarquement. */
export const PORT_LABELS = {
  SAINT_GILLES: 'Saint-Gilles',
  SAINT_LEU: 'Saint-Leu',
} as const;

/** Libellés d'affichage des prestations proposées. */
export const ACTIVITE_LABELS = {
  BALEINES: 'Sortie Baleines',
  DAUPHINS: 'Sortie Dauphins',
  PRIVATISATION_TIKAP: 'Privatisation Tikap',
  PRIVATISATION_GRAND_BLEU: 'Privatisation Grand Bleu',
} as const;

/** Libellés d'affichage des navires de la flotte. */
export const NAVIRE_LABELS = {
  TIKAP: 'Tikap',
  GRAND_BLEU: 'Grand Bleu',
} as const;

/** Vrai les jours de rotation du Tikap vers Saint-Leu (mardi et jeudi). */
export function estJourMardiOuJeudi(date: Date): boolean {
  return (JOURS_ROTATION_SAINT_LEU as readonly number[]).includes(date.getDay());
}

/** Vrai les 25 décembre et 1er janvier, jours de fermeture annuelle (R-02). */
export function estJourDeFermetureAnnuelle(date: Date): boolean {
  return JOURS_FERMETURE_ANNUELLE.some(
    (fermeture) => fermeture.mois === date.getMonth() && fermeture.jour === date.getDate(),
  );
}

/** Extrait l'heure d'un libellé de départ au format « 09h00 ». */
export function lireHeureDepart(heureDepart: string): number {
  return Number.parseInt(heureDepart.slice(0, heureDepart.indexOf('h')), 10);
}

/** Extrait les minutes d'un libellé de départ au format « 09h30 ». */
export function lireMinutesDepart(heureDepart: string): number {
  return Number.parseInt(heureDepart.slice(heureDepart.indexOf('h') + 1), 10);
}

/** Vrai pour un créneau situé avant l'heure pivot de l'après-midi. */
export function estCreneauDuMatin(heureDepart: string): boolean {
  return lireHeureDepart(heureDepart) < HEURE_PIVOT_APRES_MIDI;
}

/** Compose l'horodatage exact d'un départ à partir de sa date et de son heure. */
export function convertirEnHorodatageDepart(date: Date, heureDepart: string): Date {
  const horodatage = new Date(date.getTime());
  horodatage.setHours(lireHeureDepart(heureDepart), lireMinutesDepart(heureDepart), 0, 0);
  return horodatage;
}

/** Écart en heures décimales entre deux instants. */
export function calculerDifferenceHeures(debut: Date, fin: Date): number {
  return (fin.getTime() - debut.getTime()) / MILLISECONDES_PAR_HEURE;
}

/** Vrai lorsque deux instants tombent sur la même journée calendaire. */
export function estMemeJour(premier: Date, second: Date): boolean {
  return (
    premier.getFullYear() === second.getFullYear() &&
    premier.getMonth() === second.getMonth() &&
    premier.getDate() === second.getDate()
  );
}

/**
 * Heures de départ ouvertes à la vente pour un port et une date : aucune les
 * jours de fermeture annuelle, le seul départ de 9h00 à Saint-Leu les mardis
 * et jeudis, les trois rotations quotidiennes à Saint-Gilles (R-01, R-02).
 */
export function listerHeuresDepart(port: string, date: Date): string[] {
  if (estJourDeFermetureAnnuelle(date)) return [];
  if (port === 'SAINT_LEU') {
    return estJourMardiOuJeudi(date) ? [...HEURES_DEPART_SAINT_LEU] : [];
  }
  return [...HEURES_DEPART_SAINT_GILLES];
}

/** Jauge nominale d'un port : la flotte complète, ou le seul Tikap à Saint-Leu. */
export function calculerJaugeStandard(port: string): number {
  return port === 'SAINT_LEU' ? CAPACITE_TIKAP : CAPACITE_FLOTTE_COMPLETE;
}
