'use server';

/**
 * Frontière Server Action pour la déconnexion administrateur (SPEC-ADMIN-04,
 * CASE-ADMIN-070). Supprime le cookie de session côté client, en plus de la
 * révocation testée dans `deconnecter-administrateur.ts`. Fichier séparé
 * pour la même raison que `connecter-administrateur.action.ts` (voir son
 * en-tête).
 */

import { cookies } from 'next/headers';
import { deconnecterAdministrateur } from './deconnecter-administrateur';
import { NOM_COOKIE_SESSION_ADMIN } from './connecter-administrateur';
import { creerGestionnaireSessionReel } from '../services/server/auth/auth-adapters.service';

export async function seDeconnecterAdministrateur(): Promise<void> {
  const magasin = await cookies();
  const token = magasin.get(NOM_COOKIE_SESSION_ADMIN)?.value ?? '';

  deconnecterAdministrateur({ token }, { gestionnaireSession: creerGestionnaireSessionReel() });

  magasin.delete(NOM_COOKIE_SESSION_ADMIN);
}
