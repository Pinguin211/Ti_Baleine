'use server';

/**
 * Mutation de connexion et authentification de l'administrateur unique avec protection anti-bruteforce.
 * SPEC-ADMIN-04 | CASE-ADMIN-033, CASE-ADMIN-036, CASE-ADMIN-038
 */

import type {
  IdentifiantsConnexion,
  SessionAdministrateur,
} from '../schemas/types/auth.types';
import type {
  DepotUtilisateurs,
  GestionnaireSession,
  Horloge,
  LimiteurTentatives,
} from '../schemas/types/auth-ports.types';

export interface ResultatConnexionAdministrateur {
  succes: boolean;
  identifiantsValides: boolean;
  statutHttp: number;
  messageErreur?: string;
  session?: SessionAdministrateur;
  redirection?: string;
}

export interface PortsConnexionAdministrateur {
  depotUtilisateurs: DepotUtilisateurs;
  gestionnaireSession: GestionnaireSession;
  horloge: Horloge;
  limiteurTentatives?: LimiteurTentatives;
}

export function connecterAdministrateur(
  commande: { identifiants: IdentifiantsConnexion },
  ports: PortsConnexionAdministrateur
): ResultatConnexionAdministrateur {
  const { email, motDePasse } = commande.identifiants;

  if (ports.limiteurTentatives?.estBloque(email)) {
    return {
      succes: false,
      identifiantsValides: false,
      statutHttp: 429,
      messageErreur: 'Compte temporairement bloqué suite à de trop nombreuses tentatives',
    };
  }

  const utilisateur = ports.depotUtilisateurs.trouverParEmail(email);
  const motDePasseCorrect = utilisateur && utilisateur.motDePasse === motDePasse;

  if (!utilisateur || !motDePasseCorrect) {
    ports.limiteurTentatives?.enregistrerEchec(email);
    return {
      succes: false,
      identifiantsValides: false,
      statutHttp: 401,
      messageErreur: 'Identifiant ou mot de passe incorrect',
    };
  }

  const session = ports.gestionnaireSession.creer(utilisateur);

  return {
    succes: true,
    identifiantsValides: true,
    statutHttp: 200,
    session,
    redirection: '/admin/planning',
  };
}
