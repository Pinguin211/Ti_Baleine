'use server';

/**
 * Envoi groupé d'alerte météo, persisté en base de données.
 * SPEC-ADMIN-06 | CASE-ADMIN-048 à 061, 073
 *
 * Remplace `actions/demo-envoyer-alerte.action.ts` (store en mémoire).
 * Réimplémentation directe (comme le fichier remplacé : SPEC-ARCH-02
 * interdit à `actions/` d'importer `actions/envoyer-alerte-groupee.ts`)
 * reproduisant fidèlement la même règle (idempotence par créneau, message
 * bilingue unique, échecs individuels journalisés sans bloquer la campagne)
 * avec le dépôt PostgreSQL de `services/server/db/db-ports-alerts.ts`.
 */
import { chargerCreneauxCiblesAlerte, construirePortsAlerteDb } from '../services/server/db/db-ports-alerts';

type CanalAlerte = 'SMS' | 'EMAIL' | 'SMS_EMAIL';

function envoyerVersClients(
  reservataires: { nom: string; prenom: string; email: string; telephone: string }[],
  message: string,
  canal: CanalAlerte,
  ports: ReturnType<typeof construirePortsAlerteDb>,
): void {
  for (const client of reservataires) {
    if (canal === 'SMS' || canal === 'SMS_EMAIL') {
      try {
        ports.envoiSms.envoyer({ destinataireTelephone: client.telephone, message });
      } catch (erreur) {
        ports.journal.consignerEchec({ destinataire: client.telephone, canal: 'SMS', motif: String(erreur) });
      }
    }
    if (canal === 'EMAIL' || canal === 'SMS_EMAIL') {
      try {
        ports.envoiEmail.envoyer({ destinataireEmail: client.email, sujet: "Pré-alerte météo — Ti'Baleine", corpsMessage: message });
      } catch (erreur) {
        ports.journal.consignerEchec({ destinataire: client.email, canal: 'EMAIL', motif: String(erreur) });
      }
    }
  }
}

export async function envoyerAlerte(
  creneauIds: string[],
  canal: CanalAlerte,
  message: string,
): Promise<{ succes: boolean; messageErreur?: string; creneauxTraites: number }> {
  if (!message || message.trim().length === 0) {
    return { succes: false, messageErreur: 'Le corps du message ne peut pas être vide', creneauxTraites: 0 };
  }

  const cibles = await chargerCreneauxCiblesAlerte(creneauIds);
  if (cibles.some((creneau) => creneau.sousPreAlerte)) {
    return { succes: false, messageErreur: 'Un créneau sélectionné est déjà sous pré-alerte', creneauxTraites: 0 };
  }

  const ports = construirePortsAlerteDb();
  for (const creneau of cibles) {
    ports.depotCreneau.basculerSousPreAlerte(creneau.id);
    envoyerVersClients(creneau.reservataires, message, canal, ports);
  }
  await ports.persister();

  return { succes: true, creneauxTraites: cibles.length };
}
