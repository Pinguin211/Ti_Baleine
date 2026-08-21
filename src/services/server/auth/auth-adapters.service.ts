import 'server-only';
import { and, eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db } from '../../../lib/server/db/client';
import { users } from '../../../../drizzle/schema';
import { creerSessionToken } from '../../../lib/server/auth/session-token';
import type { IdentifiantsConnexion, Utilisateur } from '../../../schemas/types/auth.types';
import type { GestionnaireSession } from '../../../schemas/types/auth-ports.types';

/** Hypothèse documentée : durée de session inactive avant expiration (CASE-ADMIN-039 ne fixe pas de valeur). */
const DUREE_SESSION_MINUTES = 30;

/**
 * Adaptateur `DepotUtilisateurs` réel (SPEC-ADMIN-04). `connecterAdministrateur`
 * (contrat testé, CASE-ADMIN-036) compare `motDePasse` par égalité stricte.
 * En base, `mot_de_passe` est un hash bcrypt (scripts/db-seed.ts) : l'égalité
 * stricte échouerait toujours. La vérification bcrypt se fait donc ici ; seul
 * le mot de passe déjà validé est renvoyé, jamais le hash brut.
 */
export async function trouverUtilisateurAdminValide(
  identifiants: IdentifiantsConnexion
): Promise<Utilisateur | null> {
  const [ligne] = await db
    .select()
    .from(users)
    .where(and(eq(users.email, identifiants.email), eq(users.role, 'ADMIN')))
    .limit(1);

  if (!ligne || !ligne.mot_de_passe) {
    return null;
  }

  const motDePasseValide = await bcrypt.compare(identifiants.motDePasse, ligne.mot_de_passe);
  if (!motDePasseValide) {
    return null;
  }

  return { email: ligne.email, motDePasse: identifiants.motDePasse, role: ligne.role };
}

export function creerGestionnaireSessionReel(): GestionnaireSession {
  return {
    creer(utilisateur) {
      const dateCreation = new Date();
      const dateExpiration = new Date(dateCreation.getTime() + DUREE_SESSION_MINUTES * 60_000);
      const token = creerSessionToken({
        email: utilisateur.email,
        dateCreation: dateCreation.toISOString(),
        dateExpiration: dateExpiration.toISOString(),
      });
      return { token, email: utilisateur.email, dateCreation, dateExpiration };
    },
    // Token HMAC stateless : la révocation effective est la suppression du cookie côté action.
    revoquer() {},
  };
}
