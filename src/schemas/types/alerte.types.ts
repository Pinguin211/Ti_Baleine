/**
 * Types et structures de données du domaine des alertes de pré-annulation.
 * SPEC-ADMIN-06 | CASE-ADMIN-048 à CASE-ADMIN-061
 */

export type CanalAlerte = 'SMS' | 'EMAIL' | 'SMS_EMAIL';

export interface ClientReservataire {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
}

export interface CreneauCibleAlerte {
  id: string;
  date: Date;
  heureDepart: string;
  port: string;
  activite: string;
  estOuvert: boolean;
  sousPreAlerte: boolean;
  reservataires: ClientReservataire[];
}

export interface DemandeEnvoiAlerteGroupee {
  creneauxCibles: CreneauCibleAlerte[];
  canal: CanalAlerte;
  message: string;
}

export interface NotificationSmsEnvoyee {
  destinataireTelephone: string;
  message: string;
}

export interface NotificationEmailEnvoyee {
  destinataireEmail: string;
  sujet: string;
  corpsMessage: string;
}

export interface CreneauMisAJour {
  id: string;
  sousPreAlerte: boolean;
}

export interface ResultatCampagneAlerte {
  notificationsSmsEnvoyees: NotificationSmsEnvoyee[];
  notificationsEmailEnvoyees: NotificationEmailEnvoyee[];
  creneauxMisAJour: CreneauMisAJour[];
}
