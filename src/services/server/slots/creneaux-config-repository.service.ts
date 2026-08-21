import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '../../../lib/server/db/client';
import { creneaux } from '../../../../drizzle/schema';
import { formaterDateSql } from '../../../utils/formater-date-sql.util';
import type { CreneauSlotPort, DepotCreneaux } from '../../../schemas/types/slots-ports.types';

/**
 * `navires` n'a aucune colonne/table dédiée en base (docs/signature.md §6.2 :
 * décision déjà prise de le garder au seul niveau TypeScript). Store en
 * mémoire pour cette itération — ne survit pas à un redémarrage du serveur ;
 * une vraie table d'affectation reste à construire si SPEC-ADMIN-07 l'exige.
 */
const naviresParCreneau = new Map<string, string[]>();

export async function chargerTousLesCreneaux(): Promise<CreneauSlotPort[]> {
  const lignes = await db.select().from(creneaux);
  return lignes.map((ligne) => ({
    id: ligne.id,
    date: ligne.date,
    heureDepart: ligne.heure_depart.slice(0, 5),
    port: ligne.port,
    activite: ligne.activite,
    navires: naviresParCreneau.get(ligne.id),
    estOuvert: ligne.est_ouvert,
  }));
}

export async function chargerCreneauxAVenir(): Promise<CreneauSlotPort[]> {
  const aujourdhui = formaterDateSql(new Date());
  const tous = await chargerTousLesCreneaux();
  return tous
    .filter((c) => String(c.date) >= aujourdhui)
    .sort((a, b) => String(a.date).localeCompare(String(b.date)) || a.heureDepart.localeCompare(b.heureDepart));
}

export async function persisterModificationsCreneau(creneau: CreneauSlotPort): Promise<void> {
  await db
    .update(creneaux)
    .set({
      est_ouvert: creneau.estOuvert,
      ...(creneau.activite ? { activite: creneau.activite as 'BALEINES' | 'DAUPHINS' } : {}),
    })
    .where(eq(creneaux.id, creneau.id));

  if (creneau.navires) {
    naviresParCreneau.set(creneau.id, creneau.navires);
  }
}

/**
 * `DepotCreneaux` exige des méthodes synchrones ; l'instantané est donc
 * chargé une fois avant l'appel à la mutation pure, qui l'écrit en mémoire
 * (`enregistrer`). Le résultat n'est répercuté en base par l'appelant
 * qu'après un retour `accepte: true`.
 */
export async function creerDepotCreneauxDepuisInstantane(): Promise<{
  depot: DepotCreneaux;
  instantane: Map<string, CreneauSlotPort>;
}> {
  const creneauxCharges = await chargerTousLesCreneaux();
  const instantane = new Map(creneauxCharges.map((c) => [c.id, c]));
  return {
    depot: {
      obtenirParId: (id) => instantane.get(id),
      enregistrer: (creneau) => {
        instantane.set(creneau.id, creneau);
      },
      listerCreneauxReservablesPublic: () => Array.from(instantane.values()),
    },
    instantane,
  };
}
