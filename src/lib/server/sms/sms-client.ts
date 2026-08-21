import 'server-only';

/**
 * Aucune passerelle SMS réelle n'est décidée : `env/server.ts` (attendu
 * dans docs/signature.md) ne prévoit qu'un unique `SMS_GATEWAY_API_KEY`
 * générique, alors que le SDK `twilio` déjà installé attend un couple
 * SID/Auth Token. Choisir entre ces options n'est pas une décision à
 * prendre en construisant l'écran d'alertes — ce client journalise l'envoi
 * plutôt que de l'exécuter, en attendant que l'équipe tranche.
 */
export interface SmsSortant {
  destinataireTelephone: string;
  message: string;
}

export function envoyerSmsGateway(sms: SmsSortant): void {
  console.warn(`[sms-client] Passerelle SMS non configurée — SMS non transmis à ${sms.destinataireTelephone}`);
}
