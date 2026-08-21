'use server';

/**
 * Authentification et session administrateur, persistées en base de données.
 * SPEC-ADMIN-04
 *
 * Remplace `actions/demo-authentifier-admin.action.ts` (store en mémoire) :
 * même contrat et mêmes règles (garde anti-bruteforce, vérification des
 * identifiants, session), désormais adossées à PostgreSQL (`users`) et à un
 * jeton de session JWT signé (`lib/server/auth/session-token.ts`) au lieu
 * d'une session en mémoire de process.
 */
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  estBloque,
  enregistrerEchecConnexion,
  reinitialiserTentatives,
  verifierIdentifiantsAdmin,
  creerSessionAdmin,
  resoudreSessionAdmin,
} from '../services/server/db/db-ports-auth';

const NOM_COOKIE_SESSION = 'ti_baleine_admin_session';

export async function authentifierAdmin(
  email: string,
  motDePasse: string,
): Promise<{ succes: boolean; messageErreur?: string }> {
  if (estBloque(email)) {
    return { succes: false, messageErreur: 'Compte temporairement bloqué suite à de trop nombreuses tentatives' };
  }

  const utilisateur = await verifierIdentifiantsAdmin(email, motDePasse);
  if (!utilisateur) {
    enregistrerEchecConnexion(email);
    return { succes: false, messageErreur: 'Identifiant ou mot de passe incorrect' };
  }

  reinitialiserTentatives(email);
  const session = await creerSessionAdmin(utilisateur.email);
  const magasinCookies = await cookies();
  magasinCookies.set(NOM_COOKIE_SESSION, session.token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    expires: session.dateExpiration,
  });
  return { succes: true };
}

export async function deconnecterAdmin(): Promise<void> {
  const magasinCookies = await cookies();
  magasinCookies.delete(NOM_COOKIE_SESSION);
  redirect('/admin/login');
}

/** Résout la session admin active depuis le cookie JWT, pour la garde de route. */
export async function obtenirSessionAdminActive() {
  const magasinCookies = await cookies();
  return resoudreSessionAdmin(magasinCookies.get(NOM_COOKIE_SESSION)?.value);
}

/**
 * Garde d'accès appelée en tête de chaque page admin protégée. Dupliquée
 * page par page plutôt que centralisée dans un layout : voir
 * `actions/demo-authentifier-admin.action.ts` (raison inchangée, CASE-ARCH-1009).
 */
export async function exigerSessionAdmin() {
  const session = await obtenirSessionAdminActive();
  if (!session) redirect('/admin/login');
  return session;
}
