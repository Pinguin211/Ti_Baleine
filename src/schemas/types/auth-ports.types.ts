/**
 * Ports d'infrastructure pour l'authentification et les sessions.
 * SPEC-ADMIN-04 | CASE-ADMIN-033 à CASE-ADMIN-039, CASE-ADMIN-070, CASE-ADMIN-071
 */

export interface UtilisateurPourSession {
  email: string;
  motDePasse?: string;
  role: 'ADMIN' | 'CLIENT' | string;
}

export interface SessionAdministrateurCreee {
  token: string;
  email: string;
  dateCreation: Date;
  dateExpiration: Date;
}

export interface DepotUtilisateurs {
  trouverParEmail(email: string): UtilisateurPourSession | null;
}

export interface GestionnaireSession {
  creer(utilisateur: UtilisateurPourSession): SessionAdministrateurCreee;
  revoquer(token: string): void;
}

export interface LimiteurTentatives {
  enregistrerEchec(cle: string): void;
  estBloque(cle: string): boolean;
}

export interface Horloge {
  maintenant(): Date;
}
