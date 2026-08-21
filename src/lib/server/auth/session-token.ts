/**
 * Sessions administrateur sous forme de jeton JWT signé (HS256, `jose`) :
 * aucune table de sessions en base (`drizzle/schema.ts` n'en porte pas), le
 * jeton lui-même — posé en cookie httpOnly — est la seule source de vérité,
 * vérifiée à chaque requête sans aller-retour base de données.
 * SPEC-ADMIN-04 | CASE-ADMIN-033 à CASE-ADMIN-039, CASE-ADMIN-070, CASE-ADMIN-071
 */
import 'server-only';
import { SignJWT, jwtVerify } from 'jose';

const DUREE_SESSION_HEURES = 8;
const SECRET_DEV_PAR_DEFAUT = 'ti-baleine-dev-secret-ne-jamais-utiliser-en-production';

function obtenirCleSecrete(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        "AUTH_SECRET n'est pas définie : requise en production pour signer les sessions admin.",
      );
    }
    console.warn(
      "⚠️  AUTH_SECRET absente : utilisation d'un secret de développement non sécurisé. " +
        'Définissez AUTH_SECRET dans .env pour la production (voir .env.example).',
    );
  }
  return new TextEncoder().encode(secret ?? SECRET_DEV_PAR_DEFAUT);
}

export interface SessionAdminJwt {
  token: string;
  email: string;
  dateCreation: Date;
  dateExpiration: Date;
}

/** Signe un nouveau jeton de session admin, valide `DUREE_SESSION_HEURES` heures. */
export async function signerSessionAdmin(email: string): Promise<SessionAdminJwt> {
  const dateCreation = new Date();
  const dateExpiration = new Date(dateCreation.getTime());
  dateExpiration.setHours(dateExpiration.getHours() + DUREE_SESSION_HEURES);

  const token = await new SignJWT({ email, role: 'ADMIN' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(dateCreation)
    .setExpirationTime(dateExpiration)
    .sign(obtenirCleSecrete());

  return { token, email, dateCreation, dateExpiration };
}

/** Vérifie et décode un jeton de session admin ; `null` si absent, invalide ou expiré. */
export async function verifierSessionAdmin(
  token: string | undefined,
): Promise<{ token: string; email: string; dateCreation: Date; dateExpiration: Date } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, obtenirCleSecrete());
    if (typeof payload.email !== 'string' || !payload.iat || !payload.exp) return null;
    return {
      token,
      email: payload.email,
      dateCreation: new Date(payload.iat * 1000),
      dateExpiration: new Date(payload.exp * 1000),
    };
  } catch {
    return null;
  }
}
