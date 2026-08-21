/**
 * Mutation de fermeture administrative manuelle d'un créneau.
 * SPEC-ADMIN-07 | CASE-ADMIN-062
 *
 * Pas de directive `'use server'` ici : fonction pure et synchrone (contrat
 * testé). La frontière Server Action vit dans
 * `soumettre-configuration-creneau.action.ts`.
 */

import type { Creneau } from '../schemas/types/slots.types';
import type { DepotCreneaux } from '../schemas/types/slots-ports.types';

export function fermerCreneau(
  commande: { creneauId: string },
  ports: { depotCreneaux: DepotCreneaux }
): Creneau {
  const creneau = ports.depotCreneaux.obtenirParId(commande.creneauId);
  if (!creneau) {
    throw new Error(`Créneau non trouvé : ${commande.creneauId}`);
  }
  const creneauFerme: Creneau = { ...creneau, estOuvert: false };
  ports.depotCreneaux.enregistrer(creneauFerme);
  return creneauFerme;
}
