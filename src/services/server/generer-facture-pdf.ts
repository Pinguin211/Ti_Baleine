import type {
  ReservationFacturable,
  PaiementValide,
  FacturePdf,
} from '../../schemas/types/facturation.types';

export function genererFacturePdf(
  _reservation: ReservationFacturable,
  _paiement: PaiementValide
): FacturePdf {
  return {
    identifiantUnique: '',
    mentionAcquittement: '',
    dateDepartFormatee: '',
    portEmbarquement: '',
    ligneSupplement: '',
    format: 'pdf',
    contenu: new Uint8Array(),
  };
}
