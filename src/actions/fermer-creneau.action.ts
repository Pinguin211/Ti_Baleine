'use server';

/**
 * Mutation de fermeture administrative manuelle d'un créneau.
 * SPEC-ADMIN-07 | CASE-ADMIN-062
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
