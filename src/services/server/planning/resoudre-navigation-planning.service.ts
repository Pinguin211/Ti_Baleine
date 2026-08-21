/**
 * Résolution des paramètres de navigation de la page planning admin
 * (bascule jour/calendrier, mois affiché, liens de navigation).
 * Isole `app/` de `utils/` (interdit par SPEC-ARCH-02) derrière ce service.
 */

import {
  premierJourDuMois,
  decalerDeMois,
  formaterCleMois,
  parserCleMois,
} from '../../../utils/mois-navigation.util';
import { formaterDateSql } from '../../../utils/formater-date-sql.util';

export interface ParametresNavigationPlanning {
  dateParam?: string;
  moisParam?: string;
  vueParam?: string;
}

export interface NavigationPlanning {
  vue: 'jour' | 'calendrier';
  date: Date;
  moisAffiche: Date;
  hrefVueJour: string;
  hrefVueCalendrier: string;
  hrefMoisPrecedent: string;
  hrefMoisSuivant: string;
}

export function resoudreNavigationPlanning(parametres: ParametresNavigationPlanning): NavigationPlanning {
  const date = parametres.dateParam ? new Date(parametres.dateParam) : new Date();
  const vue = parametres.vueParam === 'calendrier' ? 'calendrier' : 'jour';
  const moisAffiche = parametres.moisParam
    ? parserCleMois(parametres.moisParam, date)
    : premierJourDuMois(date);

  return {
    vue,
    date,
    moisAffiche,
    hrefVueJour: `/admin/planning?date=${formaterDateSql(date)}`,
    hrefVueCalendrier: `/admin/planning?vue=calendrier&mois=${formaterCleMois(moisAffiche)}`,
    hrefMoisPrecedent: `/admin/planning?vue=calendrier&mois=${formaterCleMois(decalerDeMois(moisAffiche, -1))}`,
    hrefMoisSuivant: `/admin/planning?vue=calendrier&mois=${formaterCleMois(decalerDeMois(moisAffiche, 1))}`,
  };
}
