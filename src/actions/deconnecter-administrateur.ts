/**
 * Mutation de déconnexion et révocation de session de l'administrateur unique.
 * SPEC-ADMIN-04 | CASE-ADMIN-070
 *
 * Pas de directive `'use server'` ici : cette fonction est pure et
 * synchrone (contrat testé). La frontière Server Action réelle vit dans
 * `deconnecter-administrateur.action.ts`.
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
