import 'server-only';
import { validerEncaissementTerminalCb } from '../../../lib/server/payment/cb-terminal-client';

export function creerPasserelleCbSurPlaceReelle() {
  return { validerEncaissement: validerEncaissementTerminalCb };
}
