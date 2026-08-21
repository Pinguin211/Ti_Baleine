/**
 * Formate la date et l'horaire de prestation en chaîne unique consolidée
 * « JJ/MM/AAAA HhMM » (heure sans zéro initial), conformément à
 * SPEC-FAC-02 (AC-3).
 */
export function formaterDateEtHoraireFacturation(date: Date): string {
  const jour = String(date.getDate()).padStart(2, '0');
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const annee = date.getFullYear();
  const heure = date.getHours();
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${jour}/${mois}/${annee} ${heure}h${minute}`;
}
