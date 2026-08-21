import 'server-only';
import { verifierSessionToken } from '../../../lib/server/auth/session-token';

/**
 * Validation de l'intégrité et du délai de péremption de session de
 * l'administrateur unique (SPEC-ADMIN-04).
 */
export interface SessionValide {
  email: string;
  dateCreation: Date;
  dateExpiration: Date;
}

export async function validerSessionUtilisateur(token: string): Promise<SessionValide | null> {
  const payload = verifierSessionToken(token);
  if (!payload) {
    return null;
  }
  return {
    email: payload.email,
    dateCreation: new Date(payload.dateCreation),
    dateExpiration: new Date(payload.dateExpiration),
  };
}
