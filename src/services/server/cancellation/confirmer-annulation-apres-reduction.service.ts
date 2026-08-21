/**
 * Confirmation de la bascule vers l'annulation complète après réduction.
 * SPEC-ADMIN-02, SPEC-ADMIN-03 | CASE-ADMIN-026
 *
 * Exécute la suppression effective des billets restants et notifie le
 * client par SMS informatif, une fois le motif sélectionné par
 * l'administrateur suite à la bascule détectée par
 * `reduire-billets-reservation.service.ts`.
 */

import { composerMessageAnnulationReservation } from '../../../lib/server/sms/composer-message-annulation-reservation';

interface Billet {
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION';
}

interface ReservationPourConfirmation {
  reference: string;
  billets: Billet[];
  telephoneMobileClient?: string;
}

interface CommandeConfirmation {
  reservation: ReservationPourConfirmation;
  motifAnnulation: string;
}

interface DepotBillets {
  supprimerBillets(reference: string, billetsASupprimer: Billet[]): void;
}

interface EnvoiSms {
  envoyer(notification: { destinataireTelephone: string; message: string }): void;
}

interface PortsConfirmation {
  depotBillets: DepotBillets;
  envoiSMS: EnvoiSms;
}

/**
 * Supprime les billets restants et notifie le client par SMS informatif,
 * sans aucune mention du calcul financier (SPEC-ADMIN-02, CASE-ADMIN-026).
 */
export function confirmerAnnulationApresReduction(
  commande: CommandeConfirmation,
  ports: PortsConfirmation,
): void {
  const { reservation, motifAnnulation } = commande;

  ports.depotBillets.supprimerBillets(reservation.reference, reservation.billets);
  ports.envoiSMS.envoyer({
    destinataireTelephone: reservation.telephoneMobileClient ?? '',
    message: composerMessageAnnulationReservation({ motif: motifAnnulation }),
  });
}
