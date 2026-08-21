/**
 * Conversions de format entre les représentations du domaine (`Date` JS,
 * heures « 09h00 ») et celles des colonnes Postgres `date`/`time` de
 * `drizzle/schema.ts` (chaînes `YYYY-MM-DD` / `HH:MM:SS`). Aucune règle
 * métier : purs adaptateurs de format pour `services/server/db/`.
 */
import 'server-only';

/** Date calendaire → `YYYY-MM-DD`, en heure locale (jamais via `toISOString`, qui décale en UTC). */
export function versDateSql(date: Date): string {
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  return `${annee}-${mois}-${jour}`;
}

/** `YYYY-MM-DD` (colonne `date`) → `Date` calendaire locale à minuit. */
export function depuisDateSql(dateSql: string): Date {
  const [annee, mois, jour] = dateSql.split('-').map(Number);
  return new Date(annee, mois - 1, jour);
}

/** Heure d'affichage « 09h00 » → colonne `time` Postgres « 09:00:00 ». */
export function versHeureSql(heureDepart: string): string {
  const [heure, minute] = heureDepart.split('h');
  return `${heure.padStart(2, '0')}:${(minute || '00').padStart(2, '0')}:00`;
}

/** Colonne `time` Postgres « 09:00:00 » → heure d'affichage « 09h00 ». */
export function depuisHeureSql(heureSql: string): string {
  const [heure, minute] = heureSql.split(':');
  return `${heure}h${minute}`;
}
