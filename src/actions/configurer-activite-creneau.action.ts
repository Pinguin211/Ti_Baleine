'use server';

/**
 * Mutation de configuration de l'activité sur un créneau avec détection des conflits naturaliste.
 * SPEC-ADMIN-07 | CASE-ADMIN-064, CASE-ADMIN-067
 */

import type { Creneau, ActiviteCreneau } from '../schemas/types/slots.types';
import type { DepotCreneaux } from '../schemas/types/slots-ports.types';

export type ResultatConfigurationActivite =
  | { accepte: true; creneau: Creneau }
  | { accepte: false; message: string };

export function configurerActiviteCreneau(
  commande: { creneauId: string; activite: ActiviteCreneau | string },
  ports: { depotCreneaux: DepotCreneaux }
): ResultatConfigurationActivite {
  const creneau = ports.depotCreneaux.obtenirParId(commande.creneauId);
  if (!creneau) {
    throw new Error(`Créneau non trouvé : ${commande.creneauId}`);
  }

  if (commande.activite === 'BALEINES') {
    const tousCreneaux = ports.depotCreneaux.listerCreneauxReservablesPublic();
    const conflitNaturaliste = tousCreneaux.some(
      (c) =>
        c.id !== creneau.id &&
        c.date === creneau.date &&
        c.activite === 'BALEINES' &&
        c.port !== creneau.port
    );
    if (conflitNaturaliste) {
      return {
        accepte: false,
        message: 'Conflit naturaliste : ressource unique déjà allouée sur un autre site',
      };
    }
  }

  const creneauMisAJour: Creneau = {
    ...creneau,
    activite: commande.activite as ActiviteCreneau,
  };
  ports.depotCreneaux.enregistrer(creneauMisAJour);

  return {
    accepte: true,
    creneau: creneauMisAJour,
  };
}
