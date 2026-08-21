/**
 * Garde d'authentification pour les routes protégées du back-office.
 * SPEC-ADMIN-04 | CASE-ADMIN-035, CASE-ADMIN-039, CASE-ADMIN-070, CASE-ADMIN-071
 */

import type { SessionAdministrateur, ResultatGardeRoute } from '../../schemas/types/auth.types';
import type { Horloge } from '../../schemas/types/auth-ports.types';

export function verifierAccesRouteProtegee(
  requete: { url: string; session: SessionAdministrateur | null },
  options?: { horloge?: Horloge }
): ResultatGardeRoute {
  if (!requete.session) {
    return {
      accesAutorise: false,
      intercepte: true,
      redirection: '/admin/login',
    };
  }

  if (options?.horloge && requete.session.dateExpiration) {
    const maintenant = options.horloge.maintenant();
    if (maintenant > requete.session.dateExpiration) {
      return {
        accesAutorise: false,
        sessionExpiree: true,
        deconnecte: true,
        intercepte: true,
        redirection: '/admin/login',
      };
    }
  }

  return {
    accesAutorise: true,
    redirection: null,
  };
}
