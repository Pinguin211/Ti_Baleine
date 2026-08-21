'use server';

/**
 * Mutation de réouverture manuelle exceptionnelle d'un créneau fermé.
 * SPEC-ADMIN-07 | CASE-ADMIN-063
 */

import type { Creneau } from '../schemas/types/slots.types';
import type { DepotCreneaux } from '../schemas/types/slots-ports.types';

export function rouvrirCreneau(
  commande: { creneauId: string },
  ports: { depotCreneaux: DepotCreneaux }
): Creneau {
  const creneau = ports.depotCreneaux.obtenirParId(commande.creneauId);
  if (!creneau) {
    throw new Error(`Créneau non trouvé : ${commande.creneauId}`);
  }
  const creneauReouvert: Creneau = { ...creneau, estOuvert: true };
  ports.depotCreneaux.enregistrer(creneauReouvert);
  return creneauReouvert;
}
