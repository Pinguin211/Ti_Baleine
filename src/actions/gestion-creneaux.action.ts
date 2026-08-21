'use server';

/**
 * Configuration administrative des créneaux, persistée en base de données.
 * SPEC-ADMIN-07 | CASE-ADMIN-062, 063, 065, 066, 067
 *
 * Remplace `actions/demo-configurer-creneau.action.ts` (store en mémoire).
 * Réimplémentation directe (pas d'import d'`actions/fermer-creneau.action.ts`
 * et consorts : SPEC-ARCH-02 interdit à `actions/` d'importer `actions/`)
 * reproduisant fidèlement les mêmes règles (exclusivité navire/activité,
 * conflit naturaliste) avec le dépôt PostgreSQL de
 * `services/server/db/db-ports-slots.ts`.
 */
import { construireDepotCreneauxDb } from '../services/server/db/db-ports-slots';

function calculerCapaciteFlotte(navires: string[]): number {
  let total = 0;
  if (navires.includes('TIKAP')) total += 12;
  if (navires.includes('GRAND_BLEU')) total += 24;
  return total > 0 ? total : 36;
}

export async function fermerCreneauAdmin(creneauId: string) {
  const depot = await construireDepotCreneauxDb(creneauId);
  const creneau = depot.obtenirParId(creneauId);
  if (!creneau) throw new Error(`Créneau non trouvé : ${creneauId}`);
  depot.enregistrer({ ...creneau, estOuvert: false });
  await depot.persister();
}

export async function rouvrirCreneauAdmin(creneauId: string) {
  const depot = await construireDepotCreneauxDb(creneauId);
  const creneau = depot.obtenirParId(creneauId);
  if (!creneau) throw new Error(`Créneau non trouvé : ${creneauId}`);
  depot.enregistrer({ ...creneau, estOuvert: true });
  await depot.persister();
}

export async function affecterNaviresAdmin(
  creneauId: string,
  navires: string[],
): Promise<{ accepte: boolean; message?: string }> {
  const depot = await construireDepotCreneauxDb(creneauId);
  const creneau = depot.obtenirParId(creneauId);
  if (!creneau) throw new Error(`Créneau non trouvé : ${creneauId}`);

  const conflit = depot
    .listerCreneauxReservablesPublic()
    .some(
      (c) =>
        c.id !== creneau.id &&
        c.date === creneau.date &&
        c.heureDepart === creneau.heureDepart &&
        c.activite !== creneau.activite &&
        Boolean(c.navires?.some((n) => navires.includes(n))),
    );
  if (conflit) {
    return { accepte: false, message: "Règle d'exclusivité : un navire ne peut accueillir qu'une seule activité par créneau" };
  }

  depot.enregistrer({ ...creneau, navires, capaciteMaximale: calculerCapaciteFlotte(navires) });
  await depot.persister();
  return { accepte: true };
}

export async function configurerActiviteAdmin(
  creneauId: string,
  activite: string,
): Promise<{ accepte: boolean; message?: string }> {
  const depot = await construireDepotCreneauxDb(creneauId);
  const creneau = depot.obtenirParId(creneauId);
  if (!creneau) throw new Error(`Créneau non trouvé : ${creneauId}`);

  if (activite === 'BALEINES') {
    const conflitNaturaliste = depot
      .listerCreneauxReservablesPublic()
      .some((c) => c.id !== creneau.id && c.date === creneau.date && c.activite === 'BALEINES' && c.port !== creneau.port);
    if (conflitNaturaliste) {
      return { accepte: false, message: 'Conflit naturaliste : ressource unique déjà allouée sur un autre site' };
    }
  }

  depot.enregistrer({ ...creneau, activite });
  await depot.persister();
  return { accepte: true };
}
