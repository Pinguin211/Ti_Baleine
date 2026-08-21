import 'server-only';

/**
 * Protection anti-bruteforce (SPEC-ADMIN-04, CASE-ADMIN-038).
 *
 * Compteur en mémoire par processus. Hypothèse documentée : pas de fenêtre
 * de réinitialisation temporelle ni de partage entre instances pour cette
 * itération — le blocage persiste jusqu'au redémarrage du serveur. À
 * remplacer par un stockage partagé (Redis, table SQL) si l'admin exploite
 * plusieurs instances en production.
 */
const SEUIL_BLOCAGE = 5;

const echecsParCle = new Map<string, number>();

export function enregistrerEchecConnexion(cle: string): void {
  echecsParCle.set(cle, (echecsParCle.get(cle) ?? 0) + 1);
}

export function estAdresseBloquee(cle: string): boolean {
  return (echecsParCle.get(cle) ?? 0) >= SEUIL_BLOCAGE;
}
