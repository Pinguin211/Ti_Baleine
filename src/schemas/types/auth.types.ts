/**
 * Types pour l'authentification et les sessions administrateur.
 * SPEC-ADMIN-04 | CASE-ADMIN-033 à CASE-ADMIN-039, CASE-ADMIN-070, CASE-ADMIN-071
 */

export interface IdentifiantsConnexion {
  email: string;
  motDePasse: string;
}

export interface Utilisateur {
  email: string;
  motDePasse?: string;
  role: 'ADMIN' | 'CLIENT' | string;
}

export interface SessionAdministrateur {
  token: string;
  email: string;
  dateCreation: Date;
  dateExpiration: Date;
}

export interface ResultatGardeRoute {
  accesAutorise: boolean;
  intercepte?: boolean;
  sessionExpiree?: boolean;
  deconnecte?: boolean;
  redirection: string | null;
}
