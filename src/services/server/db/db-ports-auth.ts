/**
 * Adaptateur d'authentification administrateur sur PostgreSQL (table
 * `users`, `drizzle/schema.ts`). SPEC-ADMIN-04 — alimente l'action
 * `authentifierAdmin` (`actions/authentifier-admin.action.ts`).
 *
 * Le mot de passe est vérifié par comparaison `bcrypt` asynchrone : ce port
 * ne peut donc pas se brancher tel quel sur `connecterAdministrateur`
 * (`actions/connecter-administrateur.ts`), dont le port `DepotUtilisateurs`
 * compare par égalité stricte synchrone — même choix que
 * `demo-ports-auth.ts`, qui réimplémente la même règle plutôt que de la
 * forcer dans un port synchrone (SPEC-ARCH-02 : n'importe rien d'un autre
 * fichier de `services/server/`, uniquement `lib/server/`, `utils/`, `config/`).
 *
 * Le compteur anti-bruteforce reste en mémoire de process (pas de table
 * dédiée dans le schéma actuel) : suffisant pour une instance unique, à
 * migrer vers une table ou un cache partagé si l'application est répliquée.
 */
import 'server-only';
import { and, eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { db, schema } from '../../../lib/server/db/client';
import { signerSessionAdmin, verifierSessionAdmin } from '../../../lib/server/auth/session-token';

const SEUIL_TENTATIVES_BLOQUANTES = 5;

declare global {
  var __tiBaleineTentativesEchouees: Map<string, number> | undefined;
}

function obtenirCompteurTentatives(): Map<string, number> {
  globalThis.__tiBaleineTentativesEchouees ??= new Map();
  return globalThis.__tiBaleineTentativesEchouees;
}

export function estBloque(email: string): boolean {
  return (obtenirCompteurTentatives().get(email) ?? 0) >= SEUIL_TENTATIVES_BLOQUANTES;
}

export function enregistrerEchecConnexion(email: string): void {
  const compteur = obtenirCompteurTentatives();
  compteur.set(email, (compteur.get(email) ?? 0) + 1);
}

export function reinitialiserTentatives(email: string): void {
  obtenirCompteurTentatives().delete(email);
}

/** Vérifie les identifiants d'un administrateur contre la table `users` (mot de passe hashé bcrypt). */
export async function verifierIdentifiantsAdmin(
  email: string,
  motDePasseFourni: string,
): Promise<{ email: string; role: 'ADMIN' } | null> {
  const [utilisateur] = await db
    .select({ email: schema.users.email, motDePasse: schema.users.mot_de_passe })
    .from(schema.users)
    .where(and(eq(schema.users.email, email), eq(schema.users.role, 'ADMIN')))
    .limit(1);

  if (!utilisateur || !utilisateur.motDePasse) return null;

  const motDePasseValide = await bcrypt.compare(motDePasseFourni, utilisateur.motDePasse);
  if (!motDePasseValide) return null;

  return { email: utilisateur.email, role: 'ADMIN' };
}

/** Émet le jeton de session admin (JWT httpOnly) après identifiants vérifiés. */
export async function creerSessionAdmin(email: string) {
  return signerSessionAdmin(email);
}

/** Résout la session admin active à partir du jeton de cookie ; `null` si absent/invalide/expiré. */
export async function resoudreSessionAdmin(token: string | undefined) {
  return verifierSessionAdmin(token);
}
