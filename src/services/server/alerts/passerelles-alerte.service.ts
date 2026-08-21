import 'server-only';
import { envoyerCourrielSMTP } from '../../../lib/server/email/smtp-client';
import { envoyerSmsGateway } from '../../../lib/server/sms/sms-client';
import type { EnvoiEmail, EnvoiSms, JournalAlerte } from '../../../schemas/types/alerte-ports.types';

export function creerEnvoiSmsReel(): EnvoiSms {
  return {
    envoyer(sms) {
      envoyerSmsGateway(sms);
    },
  };
}

export function creerEnvoiEmailReel(): EnvoiEmail {
  return {
    envoyer(email) {
      envoyerCourrielSMTP(email);
    },
  };
}

/** Pas de table de journalisation dédiée en base : consigné en logs serveur. */
export function creerJournalAlerteReel(): JournalAlerte {
  return {
    consignerEchec(echec) {
      console.error(
        `[journal-alerte] Échec ${echec.canal} vers ${echec.destinataire} : ${echec.motif}`
      );
    },
  };
}
