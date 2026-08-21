/**
 * Mutation d'affectation des navires mobilisés sur un créneau avec détection de mixité d'activités.
 * SPEC-ADMIN-07 | CASE-ADMIN-065, CASE-ADMIN-066
 *
 * Pas de directive `'use server'` ici : fonction pure et synchrone (contrat
 * testé). La frontière Server Action vit dans
 * `soumettre-configuration-creneau.action.ts`.
 */

import type { Creneau } from '../schemas/types/slots.types';
import type { DepotCreneaux } from '../schemas/types/slots-ports.types';

export type ResultatAffectationNavires =
  | { accepte: true; creneau: Creneau; capaciteMaximale: number }
  | { accepte: false; message: string };

function calculerCapaciteFlotte(navires: string[]): number {
  let total = 0;
  if (navires.includes('TIKAP')) total += 12;
  if (navires.includes('GRAND_BLEU')) total += 24;
  return total > 0 ? total : 36;
}

function verifierConflitExclusivite(
  creneau: Creneau,
  navires: string[],
  depot: DepotCreneaux
): boolean {
  const tous = depot.listerCreneauxReservablesPublic();
  return tous.some(
    (c) =>
      c.id !== creneau.id &&
      c.date === creneau.date &&
      c.heureDepart === creneau.heureDepart &&
      c.activite !== creneau.activite &&
      Boolean(c.navires && c.navires.some((n) => navires.includes(n)))
  );
}

export function affecterNaviresCreneau(
  commande: { creneauId: string; navires: string[] },
  ports: { depotCreneaux: DepotCreneaux }
): ResultatAffectationNavires {
  const creneau = ports.depotCreneaux.obtenirParId(commande.creneauId);
  if (!creneau) {
    throw new Error(`Créneau non trouvé : ${commande.creneauId}`);
  }

  if (verifierConflitExclusivite(creneau, commande.navires, ports.depotCreneaux)) {
    return {
      accepte: false,
      message:
        "Règle d'exclusivité : un navire ne peut accueillir qu'une seule activité par créneau",
    };
  }

  const capaciteMaximale = calculerCapaciteFlotte(commande.navires);
  const creneauMisAJour: Creneau = {
    ...creneau,
    navires: commande.navires,
    capaciteMaximale,
  };
  ports.depotCreneaux.enregistrer(creneauMisAJour);

  return {
    accepte: true,
    creneau: creneauMisAJour,
    capaciteMaximale,
  };
}
