/**
 * ports.constants.ts
 *
 * Caractéristiques des ports d'embarquement et rotation hebdomadaire.
 * Référence : SPEC-RESERVATION-03 (R-01, R-20, C-03, C-11), ConfigPort.
 *
 * Constantes pures : 0 import interne (SPEC-ARCH-02).
 */

/** Libellés d'affichage des ports d'embarquement. */
export const PORTS = ['Saint-Gilles', 'Saint-Leu'] as const;

/** Jours d'ouverture de Saint-Leu, au format `Date.getDay()` : mardi et jeudi. */
export const JOURS_ROTATION_SAINT_LEU = [2, 4] as const;

/** Créneaux de départ proposés à Saint-Gilles, 7 jours sur 7. */
export const HEURES_DEPART_SAINT_GILLES = ['07h00', '10h00', '14h00'] as const;

/** Créneau de départ unique proposé à Saint-Leu les mardis et jeudis matin. */
export const HEURES_DEPART_SAINT_LEU = ['09h00'] as const;

/** Heure pivot séparant les créneaux du matin de ceux de l'après-midi. */
export const HEURE_PIVOT_APRES_MIDI = 12;
