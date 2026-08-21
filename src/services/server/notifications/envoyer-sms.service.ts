import 'server-only';
import { envoyerSmsGateway } from '../../../lib/server/sms/sms-client';

export function envoyerSms(sms: { destinataireTelephone: string; message: string }): void {
  envoyerSmsGateway(sms);
}
