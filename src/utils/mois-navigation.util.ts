/**
 * Helpers purs de navigation calendaire mensuelle (vue calendrier planning).
 * SPEC-ARCH-02 : la couche `utils/` n'importe rien d'interne.
 */

const NOMS_JOURS_SEMAINE = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const;

/** Premier jour du mois contenant `date`, à minuit local. */
export function premierJourDuMois(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/** Mois contenant `date`, décalé d'un an/mois donné (négatif pour reculer). */
export function decalerDeMois(date: Date, decalage: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + decalage, 1);
}

/** Clé stable `YYYY-MM` utilisée pour la navigation par URL. */
export function formaterCleMois(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

/** Parse une clé `YYYY-MM` (retombe sur `repli` si absente ou invalide). */
export function parserCleMois(cle: string | undefined, repli: Date): Date {
  const correspondance = cle?.match(/^(\d{4})-(\d{2})$/);
  if (!correspondance) return premierJourDuMois(repli);
  return new Date(Number(correspondance[1]), Number(correspondance[2]) - 1, 1);
}

/** Libellé humain « août 2026 » d'un mois. */
export function formaterLibelleMois(date: Date): string {
  const libelle = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  return libelle.charAt(0).toUpperCase() + libelle.slice(1);
}

/** Initiales des jours de la semaine, en-tête de grille calendrier (Lundi → Dimanche). */
export function listerEntetesJoursSemaine(): readonly string[] {
  return NOMS_JOURS_SEMAINE;
}
