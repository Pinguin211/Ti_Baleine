/**
 * Exécution de l'annulation complète d'une réservation.
 * SPEC-ADMIN-02 | CASE-ADMIN-010, CASE-ADMIN-013, CASE-ADMIN-016 à 022
 *
 * Refuse toute annulation sur une réservation déjà à 0 billet actif ou dont
 * le créneau est déjà passé (garde du domaine). Sinon, supprime l'intégralité
 * des billets actifs (BOOKING_ITEMS) et libère synchroniquement les places
 * correspondantes sur le créneau — conjointement au sein d'une même
 * transaction si un gestionnaire est fourni, garantissant l'atomicité
 * (REQ-107) — puis notifie le client par SMS informatif composé à la volée à
 * partir du motif (jamais persisté — REQ-020). Un échec d'envoi du SMS est
 * journalisé et signalé à l'administrateur sans jamais interrompre la
 * suppression des billets ni la libération des places (REQ-106). Le
 * remboursement effectif reste strictement manuel et hors système (C-10) :
 * aucun appel bancaire sortant n'est jamais émis par ce service.
 */

import { composerMessageAnnulationReservation } from '../../../lib/server/sms/composer-message-annulation-reservation';
import { verifierReservationAnnulable } from '../../../schemas/validation/cancellation/annuler-reservation.schema';

interface BilletActif {
  id: string;
}

interface ReservationAnnulation {
  reference: string;
  billetsActifs: BilletActif[];
  telephoneMobileClient: string;
}

interface CreneauAnnulation {
  reference: string;
  dateDepart: Date;
}

interface MessageSmsAnnulation {
  destinataireTelephone: string;
  message: string;
}

interface DepotReservationAnnulation {
  supprimerTousLesBillets(reference: string): number;
}

interface DepotCreneauAnnulation {
  libererPlaces(reference: string, nombre: number): void;
}

interface PasserelleSmsAnnulation {
  envoyer(message: MessageSmsAnnulation): void;
}

interface Horloge {
  maintenant(): Date;
}

interface JournalEvenements {
  consignerErreur(evenement: { code: string; details: string }): void;
}

interface GestionnaireTransaction {
  executer<T>(operation: () => T): T;
}

interface PortsAnnulation {
  depotReservation: DepotReservationAnnulation;
  depotCreneau: DepotCreneauAnnulation;
  passerelleSms: PasserelleSmsAnnulation;
  horloge?: Horloge;
  journal?: JournalEvenements;
  transaction?: GestionnaireTransaction;
}

interface CommandeAnnulation {
  reservation: ReservationAnnulation;
  creneau: CreneauAnnulation;
  motif: string;
}

interface ResultatAnnulation {
  billetsSupprimes: number;
  avertissementAdmin?: string;
  remboursement: { modeTraitement: 'MANUEL_HORS_SYSTEME' };
}

/**
 * Envoie le SMS d'annulation ; en cas d'échec, journalise l'incident et
 * retourne un avertissement admin plutôt que de faire échouer l'annulation
 * (SPEC-ADMIN-02, CASE-ADMIN-019, CASE-ADMIN-020).
 */
function envoyerSmsAnnulation(
  ports: PortsAnnulation,
  reservation: ReservationAnnulation,
  motif: string,
): string | undefined {
  try {
    ports.passerelleSms.envoyer({
      destinataireTelephone: reservation.telephoneMobileClient,
      message: composerMessageAnnulationReservation({ motif }),
    });
    return undefined;
  } catch (erreur) {
    ports.journal?.consignerErreur({
      code: 'SMS_ANNULATION_ECHEC',
      details: (erreur as Error).message,
    });
    return "L'envoi du SMS d'annulation a échoué.";
  }
}

/**
 * Supprime les billets et libère les places, au sein d'une transaction
 * lorsqu'un gestionnaire est fourni afin de garantir l'atomicité (REQ-107,
 * CASE-ADMIN-021).
 */
function supprimerBilletsEtLibererPlaces(
  ports: PortsAnnulation,
  reservation: ReservationAnnulation,
  creneau: CreneauAnnulation,
): number {
  const operation = () => {
    const billetsSupprimes = ports.depotReservation.supprimerTousLesBillets(
      reservation.reference,
    );
    ports.depotCreneau.libererPlaces(creneau.reference, billetsSupprimes);
    return billetsSupprimes;
  };
  return ports.transaction ? ports.transaction.executer(operation) : operation();
}

/**
 * Supprime les billets, libère les places et notifie le client par SMS
 * informatif, après validation de la garde d'annulation (SPEC-ADMIN-02,
 * CASE-ADMIN-010).
 */
export async function annulerReservationService(
  commande: CommandeAnnulation,
  ports: PortsAnnulation,
): Promise<ResultatAnnulation> {
  const { reservation, creneau, motif } = commande;
  const dateActuelle = ports.horloge?.maintenant() ?? creneau.dateDepart;
  const verification = verifierReservationAnnulable(reservation, creneau, dateActuelle);
  if (!verification.autorise) {
    throw Object.assign(new Error(verification.motifRefus), { statusCode: 400 });
  }

  const billetsSupprimes = supprimerBilletsEtLibererPlaces(ports, reservation, creneau);
  const avertissementAdmin = envoyerSmsAnnulation(ports, reservation, motif);

  return {
    billetsSupprimes,
    ...(avertissementAdmin && { avertissementAdmin }),
    remboursement: { modeTraitement: 'MANUEL_HORS_SYSTEME' },
  };
}
