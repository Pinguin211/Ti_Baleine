/** Formate une date locale au format `YYYY-MM-DD` attendu par les colonnes SQL `date`. */
export function formaterDateSql(date: Date): string {
  const annee = date.getFullYear();
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const jour = String(date.getDate()).padStart(2, '0');
  return `${annee}-${mois}-${jour}`;
}
