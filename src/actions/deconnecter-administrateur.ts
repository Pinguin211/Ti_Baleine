'use server';

/**
 * Mutation de déconnexion et révocation de session de l'administrateur unique.
 * SPEC-ADMIN-04 | CASE-ADMIN-070
 */

import type { GestionnaireSession } from '../schemas/types/auth-ports.types';

export interface ResultatDeconnexion {
  jetonRevoque: boolean;
  sessionSupprimeeCoteClient: boolean;
  redirection: string;
}

export function deconnecterAdministrateur(
  commande: { token: string },
  ports: { gestionnaireSession: GestionnaireSession }
): ResultatDeconnexion {
  ports.gestionnaireSession.revoquer(commande.token);

  return {
    jetonRevoque: true,
    sessionSupprimeeCoteClient: true,
    redirection: '/admin/login',
  };
}
