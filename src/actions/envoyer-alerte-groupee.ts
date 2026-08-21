'use server';

/**
 * Mutation d'envoi groupé d'alertes météo bilingues par SMS et/ou E-mail la veille à 18h.
 * SPEC-ADMIN-06 | CASE-ADMIN-048 à CASE-ADMIN-061, CASE-ADMIN-073
 */

import type {
  ClientReservataire,
  CreneauCibleAlerte,
  DemandeEnvoiAlerteGroupee,
  NotificationSmsEnvoyee,
  NotificationEmailEnvoyee,
  CreneauMisAJour,
  ResultatCampagneAlerte,
} from '../schemas/types/alerte.types';
import type { PortsAlerte, DepotCreneauAlerte } from '../schemas/types/alerte-ports.types';

function verifierIdempotenceCreneaux(
  creneaux: CreneauCibleAlerte[],
  depot: DepotCreneauAlerte
): void {
  for (const creneau of creneaux) {
    if (creneau.sousPreAlerte || depot.estSousPreAlerte(creneau.id)) {
      throw new Error(`Le créneau ${creneau.id} est déjà sous pré-alerte.`);
    }
  }
}

function envoyerSmsClient(
  client: ClientReservataire,
  message: string,
  ports: PortsAlerte,
  smsEnvoyes: NotificationSmsEnvoyee[]
): void {
  try {
    ports.envoiSms.envoyer({
      destinataireTelephone: client.telephone,
      message,
    });
    smsEnvoyes.push({
      destinataireTelephone: client.telephone,
      message,
    });
  } catch (error) {
    ports.journal.consignerEchec({
      destinataire: client.telephone,
      canal: 'SMS',
      motif: error instanceof Error ? error.message : 'Erreur SMS inconnue',
    });
  }
}

function envoyerEmailClient(
  client: ClientReservataire,
  message: string,
  ports: PortsAlerte,
  emailsEnvoyes: NotificationEmailEnvoyee[]
): void {
  try {
    ports.envoiEmail.envoyer({
      destinataireEmail: client.email,
      sujet: "Pré-alerte météo — Ti'Baleine",
      corpsMessage: message,
    });
    emailsEnvoyes.push({
      destinataireEmail: client.email,
      sujet: "Pré-alerte météo — Ti'Baleine",
      corpsMessage: message,
    });
  } catch (error) {
    ports.journal.consignerEchec({
      destinataire: client.email,
      canal: 'EMAIL',
      motif: error instanceof Error ? error.message : 'Erreur Email inconnue',
    });
  }
}

export function envoyerAlerteGroupee(
  demande: DemandeEnvoiAlerteGroupee,
  ports: PortsAlerte
): ResultatCampagneAlerte {
  if (!demande.message || demande.message.trim().length === 0) {
    throw new Error('Le corps du message ne peut pas être vide');
  }

  verifierIdempotenceCreneaux(demande.creneauxCibles, ports.depotCreneau);

  const notificationsSmsEnvoyees: NotificationSmsEnvoyee[] = [];
  const notificationsEmailEnvoyees: NotificationEmailEnvoyee[] = [];
  const creneauxMisAJour: CreneauMisAJour[] = [];

  for (const creneau of demande.creneauxCibles) {
    ports.depotCreneau.basculerSousPreAlerte(creneau.id);
    creneauxMisAJour.push({ id: creneau.id, sousPreAlerte: true });

    for (const client of creneau.reservataires) {
      if (demande.canal === 'SMS' || demande.canal === 'SMS_EMAIL') {
        envoyerSmsClient(client, demande.message, ports, notificationsSmsEnvoyees);
      }
      if (demande.canal === 'EMAIL' || demande.canal === 'SMS_EMAIL') {
        envoyerEmailClient(client, demande.message, ports, notificationsEmailEnvoyees);
      }
    }
  }

  return {
    notificationsSmsEnvoyees,
    notificationsEmailEnvoyees,
    creneauxMisAJour,
  };
}
