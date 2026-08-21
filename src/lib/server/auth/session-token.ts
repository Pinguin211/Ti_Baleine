import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { envServeur } from '../../../env/server';

/**
 * Signature et vérification de tokens de session (SPEC-ADMIN-04).
 *
 * HMAC-SHA256 signé avec `node:crypto`, volontairement synchrone : le port
 * `GestionnaireSession.creer()` testé par CASE-ADMIN-033/036/038 est une
 * fonction pure synchrone (voir schemas/types/auth-ports.types.ts). La
 * bibliothèque `jose` déjà installée est asynchrone (WebCrypto) et ne peut
 * pas implémenter ce contrat sans le rendre asynchrone — hypothèse
 * documentée, à revoir si le port devient async.
 */
export interface SessionPayload {
  email: string;
  dateCreation: string;
  dateExpiration: string;
}

export function creerSessionToken(payload: SessionPayload): string {
  const donnees = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', envServeur.JWT_SECRET).update(donnees).digest('base64url');
  return `${donnees}.${signature}`;
}

export function verifierSessionToken(token: string): SessionPayload | null {
  const [donnees, signature] = token.split('.');
  if (!donnees || !signature) {
    return null;
  }

  const signatureAttendue = createHmac('sha256', envServeur.JWT_SECRET)
    .update(donnees)
    .digest('base64url');
  const signatureBuf = Buffer.from(signature);
  const attendueBuf = Buffer.from(signatureAttendue);
  if (signatureBuf.length !== attendueBuf.length || !timingSafeEqual(signatureBuf, attendueBuf)) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(donnees, 'base64url').toString('utf-8')) as SessionPayload;
  } catch {
    return null;
  }
}
