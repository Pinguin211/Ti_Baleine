import 'server-only';
import { eq, inArray } from 'drizzle-orm';
import { db } from '../../../lib/server/db/client';
import { creneaux } from '../../../../drizzle/schema';
import type { DepotCreneauAlerte } from '../../../schemas/types/alerte-ports.types';

/**
 * `envoyerAlerteGroupee` (contrat testé) utilise `estSousPreAlerte(...)`
 * dans une condition booléenne synchrone (`creneau.sousPreAlerte ||
 * depot.estSousPreAlerte(id)`) : si cette méthode renvoyait une Promise
 * (objet toujours "truthy"), l'idempotence bloquerait systématiquement
 * TOUS les créneaux. Le statut est donc pré-chargé avant l'appel à la
 * fonction pure, pour que `estSousPreAlerte` reste réellement synchrone.
 */
export async function chargerStatutsPreAlerte(creneauIds: string[]): Promise<Set<string>> {
  if (creneauIds.length === 0) return new Set();
  const lignes = await db
    .select({ id: creneaux.id, sousPreAlerte: creneaux.sous_pre_alerte })
    .from(creneaux)
    .where(inArray(creneaux.id, creneauIds));
  return new Set(lignes.filter((ligne) => ligne.sousPreAlerte).map((ligne) => ligne.id));
}

/**
 * `basculerSousPreAlerte` n'est jamais attendu par la fonction pure (le
 * port tolère `void | Promise<void>`) : l'écriture est déclenchée ici et sa
 * promesse capturée dans `ecrituresEnCours`, pour que l'appelant (l'action)
 * puisse s'assurer qu'elle est bien terminée avant de répondre au client.
 */
export function creerDepotCreneauAlerteReel(
  statutsPreAlerte: Set<string>,
  ecrituresEnCours: Promise<unknown>[]
): DepotCreneauAlerte {
  return {
    estSousPreAlerte(creneauId) {
      return statutsPreAlerte.has(creneauId);
    },
    basculerSousPreAlerte(creneauId) {
      ecrituresEnCours.push(db.update(creneaux).set({ sous_pre_alerte: true }).where(eq(creneaux.id, creneauId)));
    },
  };
}
