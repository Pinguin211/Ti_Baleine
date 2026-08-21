'use server';

/**
 * Mutation de configuration globale de créneau avec contrôle d'autorisation administrateur.
 * SPEC-ADMIN-07 | CASE-ADMIN-068
 */

import type { Creneau } from '../schemas/types/slots.types';
import type { ContexteAcces, DepotCreneaux } from '../schemas/types/slots-ports.types';

export type ResultatConfigurationCreneau =
  | { accepte: true; creneau: Creneau }
  | { accepte: false; codeHttp: number; message: string };

export function configurerCreneau(
  commande: { creneauId: string; commande?: string; modifications?: Partial<Creneau> },
  contexte: ContexteAcces & { endpoint?: string; estAdministrateurAuthentifie?: boolean },
  ports: { depotCreneaux: DepotCreneaux }
): ResultatConfigurationCreneau {
  const estAdmin =
    contexte.estAdministrateurAuthentifie === true ||
    (contexte.estAuthentifie === true && contexte.role === 'ADMIN');

  if (!estAdmin) {
    return {
      accepte: false,
      codeHttp: 401,
      message: 'Accès non autorisé : authentification administrateur requise',
    };
  }

  const creneau = ports.depotCreneaux.obtenirParId(commande.creneauId);
  if (!creneau) {
    throw new Error(`Créneau introuvable : ${commande.creneauId}`);
  }

  const creneauModifie: Creneau = {
    ...creneau,
    ...(commande.modifications ?? {}),
  };
  ports.depotCreneaux.enregistrer(creneauModifie);

  return {
    accepte: true,
    creneau: creneauModifie,
  };
}
