/**
 * Consolidation multi-sites de la grille planning desktop.
 * SPEC-ADMIN-01 | CASE-ADMIN-001, CASE-ADMIN-003, CASE-ADMIN-004, CASE-ADMIN-005,
 * CASE-ADMIN-006
 *
 * Filtre les créneaux persistés sur la date consultée, les regroupe par port
 * puis par heure de départ, résout l'état opérationnel affiché de chacun à
 * partir de son indicateur `estOuvert`, signale ceux sous pré-alerte (R-25)
 * via un badge et un marqueur de style dédiés, expose un message d'état vide
 * explicite lorsqu'aucun créneau n'est programmé (Cas limite #1), signale
 * l'absence de navire affecté (Cas limite #2) et l'absence de type d'activité
 * renseigné (Cas limite #3).
 */

const MESSAGE_ETAT_VIDE = 'Aucun créneau programmé pour cette journée';
const LABEL_NAVIRE_NON_AFFECTE = 'non affecté';
const LABEL_ACTIVITE_NON_RENSEIGNEE = 'type non renseigné';

interface CreneauPlanningPersiste {
  id: string;
  date: Date;
  heureDepart: string;
  port: string;
  activite: string | null;
  navires?: string[];
  estOuvert: boolean;
  sousPreAlerte: boolean;
}

interface CreneauAffiche {
  id: string;
  port: string;
  heureDepart: string;
  etatOperationnel: string;
  badgePreAlerte?: string;
  styleAlerteApplique: boolean;
  navireLabel: string;
  invitationCompleterAffectation: boolean;
  activiteLabel: string;
}

interface GrillePlanningConsolidee {
  creneaux: CreneauAffiche[];
  messageEtatVide?: string;
}

interface ParametresGrillePlanning {
  date: Date;
  creneaux: CreneauPlanningPersiste[];
}

function estMemeJour(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function resoudreEtatOperationnel(creneau: CreneauPlanningPersiste): string {
  return creneau.estOuvert ? 'Ouvert' : 'Fermé';
}

function resoudreBadgePreAlerte(
  creneau: CreneauPlanningPersiste,
): string | undefined {
  return creneau.sousPreAlerte ? 'Sous pré-alerte' : undefined;
}

function resoudreNavireLabel(creneau: CreneauPlanningPersiste): string {
  const navires = creneau.navires ?? [];
  return navires.length === 0 ? LABEL_NAVIRE_NON_AFFECTE : navires.join(', ');
}

function resoudreActiviteLabel(creneau: CreneauPlanningPersiste): string {
  return creneau.activite === null
    ? LABEL_ACTIVITE_NON_RENSEIGNEE
    : creneau.activite;
}

function resoudreMessageEtatVide(
  creneaux: CreneauAffiche[],
): string | undefined {
  return creneaux.length === 0 ? MESSAGE_ETAT_VIDE : undefined;
}

function comparerPortPuisHeure(
  a: CreneauPlanningPersiste,
  b: CreneauPlanningPersiste,
): number {
  if (a.port !== b.port) return a.port.localeCompare(b.port);
  return a.heureDepart.localeCompare(b.heureDepart);
}

/**
 * Consolide les créneaux persistés de la journée consultée en grille affichée,
 * triée par port puis par heure de départ (SPEC-ADMIN-01, CASE-ADMIN-001).
 */
export function obtenirGrillePlanningConsolidee(
  parametres: ParametresGrillePlanning,
): GrillePlanningConsolidee {
  const creneauxDuJour = parametres.creneaux
    .filter((creneau) => estMemeJour(creneau.date, parametres.date))
    .sort(comparerPortPuisHeure);

  const creneaux: CreneauAffiche[] = creneauxDuJour.map((creneau) => {
    const navireLabel = resoudreNavireLabel(creneau);
    return {
      id: creneau.id,
      port: creneau.port,
      heureDepart: creneau.heureDepart,
      etatOperationnel: resoudreEtatOperationnel(creneau),
      badgePreAlerte: resoudreBadgePreAlerte(creneau),
      styleAlerteApplique: creneau.sousPreAlerte,
      navireLabel,
      invitationCompleterAffectation: navireLabel === LABEL_NAVIRE_NON_AFFECTE,
      activiteLabel: resoudreActiviteLabel(creneau),
    };
  });

  return { creneaux, messageEtatVide: resoudreMessageEtatVide(creneaux) };
}
