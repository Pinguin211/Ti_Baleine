/**
 * Connexion PostgreSQL et client Drizzle partagés par les adaptateurs
 * `services/server/db/`. Réservé à `services/` (SPEC-ARCH-02, CASE-ARCH-1014) :
 * `app/`, `actions/` et les composants ne doivent jamais importer ce module
 * directement.
 *
 * Le pool est conservé sur `globalThis` pour survivre au Fast Refresh de
 * `next dev` sans multiplier les connexions ouvertes, comme le fait
 * `services/server/demo/demo-store.ts` pour son store en mémoire.
 */
import 'server-only';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '../../../../drizzle/schema';

declare global {
  var __tiBaleineDbPool: Pool | undefined;
}

function creerPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL n'est pas définie : impossible de se connecter à PostgreSQL. " +
        'Voir .env.example.',
    );
  }
  return new Pool({ connectionString });
}

/** Pool de connexions unique, réutilisé entre les requêtes et les rechargements dev. */
export function obtenirPool(): Pool {
  globalThis.__tiBaleineDbPool ??= creerPool();
  return globalThis.__tiBaleineDbPool;
}

export const db = drizzle(obtenirPool(), { schema });
export { schema };
