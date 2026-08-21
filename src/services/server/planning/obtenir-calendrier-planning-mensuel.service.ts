/**
 * Consolidation de la vue calendrier mensuelle du planning (SPEC-ADMIN-01).
 * Regroupe les créneaux persistés du mois affiché en semaines complètes
 * (du lundi précédant le 1er au dimanche suivant le dernier jour), avec par
 * jour un résumé (nombre de créneaux, nombre ouverts, présence d'alerte).
 */

import { estMemeJour } from '../../../utils/slot-rules';
import { premierJourDuMois, decalerDeMois, formaterLibelleMois, listerEntetesJoursSemaine } from '../../../utils/mois-navigation.util';
import type {
  CalendrierPlanningMensuel,
  CreneauPlanningPersiste,
  JourCalendrierPlanning,
} from '../../../schemas/types/planning.types';

interface ParametresCalendrierPlanning {
  moisAffiche: Date;
  creneaux: CreneauPlanningPersiste[];
  aujourdhui?: Date;
}

const JOURS_PAR_SEMAINE = 7;

function ajouterJours(date: Date, nombre: number): Date {
  const resultat = new Date(date.getTime());
  resultat.setDate(resultat.getDate() + nombre);
  return resultat;
}

/** Décalage (0 = lundi … 6 = dimanche) du jour de semaine ISO d'une date. */
function decalageLundi(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function construireJour(
  date: Date,
  moisAffiche: Date,
  creneauxDuJour: CreneauPlanningPersiste[],
  aujourdhui: Date,
): JourCalendrierPlanning {
  return {
    date,
    dansLeMoisAffiche: date.getMonth() === moisAffiche.getMonth() && date.getFullYear() === moisAffiche.getFullYear(),
    estAujourdhui: estMemeJour(date, aujourdhui),
    nombreCreneaux: creneauxDuJour.length,
    nombreCreneauxOuverts: creneauxDuJour.filter((c) => c.estOuvert).length,
    auMoinsUneAlerte: creneauxDuJour.some((c) => c.sousPreAlerte),
  };
}

export function obtenirCalendrierPlanningMensuel(
  parametres: ParametresCalendrierPlanning,
): CalendrierPlanningMensuel {
  const { moisAffiche, creneaux, aujourdhui = new Date() } = parametres;
  const premierJour = premierJourDuMois(moisAffiche);
  const dernierJour = ajouterJours(decalerDeMois(moisAffiche, 1), -1);
  const debutGrille = ajouterJours(premierJour, -decalageLundi(premierJour));
  const finGrille = ajouterJours(dernierJour, JOURS_PAR_SEMAINE - 1 - decalageLundi(dernierJour));

  const jours: JourCalendrierPlanning[] = [];
  for (let date = debutGrille; date <= finGrille; date = ajouterJours(date, 1)) {
    const creneauxDuJour = creneaux.filter((c) => estMemeJour(c.date, date));
    jours.push(construireJour(date, moisAffiche, creneauxDuJour, aujourdhui));
  }

  const semaines: JourCalendrierPlanning[][] = [];
  for (let i = 0; i < jours.length; i += JOURS_PAR_SEMAINE) {
    semaines.push(jours.slice(i, i + JOURS_PAR_SEMAINE));
  }

  return {
    libelleMois: formaterLibelleMois(moisAffiche),
    entetesJours: listerEntetesJoursSemaine(),
    semaines,
  };
}
