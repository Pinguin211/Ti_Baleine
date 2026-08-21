/**
 * Résolution de la redirection post-connexion pour l'administrateur back-office.
 * SPEC-ADMIN-04 | CASE-ADMIN-034
 */

import type { SessionAdministrateur } from '../../../schemas/types/auth.types';

export interface ResultatRedirectionPostConnexion {
  destination: string;
  affichageImmediat: boolean;
}

export function resoudreRedirectionPostConnexion(
  _session: SessionAdministrateur
): ResultatRedirectionPostConnexion {
  return {
    destination: '/admin/planning',
    affichageImmediat: true,
  };
}
