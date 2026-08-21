/**
 * Service de détermination de la jauge maximale d'un créneau selon le port, le jour et l'heure.
 * R-01 (12 places à Saint-Leu), R-10 (24 places mardi/jeudi matin à Saint-Gilles), 36 places standard.
 * SPEC-ADMIN-05 | CASE-ADMIN-041, CASE-ADMIN-042, CASE-ADMIN-043, CASE-ADMIN-072
 */

export type PortCreneau = 'SAINT_GILLES' | 'SAINT_LEU';
export type JourSemaine =
  | 'LUNDI'
  | 'MARDI'
  | 'MERCREDI'
  | 'JEUDI'
  | 'VENDREDI'
  | 'SAMEDI'
  | 'DIMANCHE';

export interface ParametresJaugeCreneau {
  port: PortCreneau | string;
  jourSemaine?: JourSemaine | string;
  heureDepart?: string;
}

export function determinerJaugeCreneau(params: ParametresJaugeCreneau): number {
  if (params.port === 'SAINT_LEU') {
    return 12;
  }

  const estMardiOuJeudi =
    params.jourSemaine === 'MARDI' || params.jourSemaine === 'JEUDI';
  const heure = params.heureDepart ? parseInt(params.heureDepart.split(':')[0], 10) : 0;
  const estMatin = heure < 12;

  if (estMardiOuJeudi && estMatin) {
    return 24;
  }

  return 36;
}
