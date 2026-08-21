/**
 * Interfaces des ports d'infrastructure pour l'envoi d'alertes groupées.
 * SPEC-ADMIN-06 | CASE-ADMIN-048 à CASE-ADMIN-061
 */

export interface EnvoiSms {
  envoyer(sms: { destinataireTelephone: string; message: string }): void | Promise<void>;
}

export interface EnvoiEmail {
  envoyer(email: {
    destinataireEmail: string;
    sujet: string;
    corpsMessage: string;
  }): void | Promise<void>;
}

export interface DepotCreneauAlerte {
  basculerSousPreAlerte(creneauId: string): void | Promise<void>;
  estSousPreAlerte(creneauId: string): boolean | Promise<boolean>;
}

export interface JournalAlerte {
  consignerEchec(echec: {
    destinataire: string;
    canal: 'SMS' | 'EMAIL';
    motif: string;
  }): void | Promise<void>;
}

export interface Horloge {
  maintenant(): Date;
}

export interface PortsAlerte {
  envoiSms: EnvoiSms;
  envoiEmail: EnvoiEmail;
  depotCreneau: DepotCreneauAlerte;
  journal: JournalAlerte;
  horloge: Horloge;
}
