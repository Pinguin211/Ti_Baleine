import { randomUUID } from 'node:crypto';
import type { ReservationFacturable, FactureSolde } from '../../schemas/types/facturation.types';
import type { Horloge } from '../../schemas/types/facturation-ports.types';
import {
  construireLignesTarifaires,
  type LigneTarifaire,
} from '../../utils/calcul-tarification-facturation.util';
import { calculerMontantTotalAcquitte } from '../../utils/calcul-acompte-solde.util';
import { formaterDateEtHoraireFacturation } from '../../utils/formatage-date-facturation.util';

/** Réservation facturable, y compris les champs propres aux formules forfaitaires (privatisation). */
type ReservationFacturableEtendue = ReservationFacturable & {
  montantForfaitaire?: number;
  nombreAdultes?: number;
  nombreEnfants?: number;
  tarifUnitaireAdulte?: number;
  tarifUnitaireEnfant?: number;
  majorationGeographiqueParPersonne?: number;
};

export type FactureSoldeDetaillee = FactureSolde & {
  portEmbarquement: ReservationFacturable['portEmbarquement'];
  prestation: string;
  dateEtHoraire: string;
  lignesTarifaires: LigneTarifaire[];
};

function construireContenuPdfEnMemoire(lignes: string[]): Uint8Array {
  return new TextEncoder().encode(['%PDF-1.4', ...lignes].join('\n'));
}

function versParametresVentilation(reservation: ReservationFacturableEtendue) {
  return {
    montantForfaitaire: reservation.montantForfaitaire,
    libelleForfait: reservation.prestation,
    nombreAdultes: reservation.nombreAdultes,
    tarifUnitaireAdulte: reservation.tarifUnitaireAdulte,
    nombreEnfants: reservation.nombreEnfants,
    tarifUnitaireEnfant: reservation.tarifUnitaireEnfant,
    majorationGeographiqueParPersonne: reservation.majorationGeographiqueParPersonne,
  };
}

/**
 * Génère à la volée, en mémoire vive, la facture de solde distincte PDF
 * d'une réservation (SPEC-FAC-02, AC-2, AC-3).
 */
export function genererFactureSoldePdf(
  reservation: ReservationFacturableEtendue,
  rappelAcompte: number,
  montantSoldeRegle: number,
  horloge: Horloge,
): FactureSoldeDetaillee {
  const lignesTarifaires = construireLignesTarifaires(versParametresVentilation(reservation));
  const montantTotalAcquitte = calculerMontantTotalAcquitte(rappelAcompte, montantSoldeRegle);
  const identifiantUnique = `FACT-SO-${horloge.maintenant().getFullYear()}-${randomUUID()}`;
  const contenu = construireContenuPdfEnMemoire([
    `Reservation ${reservation.id} - ${reservation.prestation} - ${reservation.portEmbarquement}`,
    'Mention: Acquittée',
    `Rappel acompte: ${rappelAcompte}`,
    `Solde réglé: ${montantSoldeRegle}`,
    `Montant total acquitté: ${montantTotalAcquitte}`,
  ]);
  return {
    identifiantUnique,
    mentionSolde: 'Acquittée',
    rappelAcompte,
    montantTotalAcquitte,
    contenu,
    portEmbarquement: reservation.portEmbarquement,
    prestation: reservation.prestation,
    dateEtHoraire: formaterDateEtHoraireFacturation(reservation.dateDepart),
    lignesTarifaires,
  };
}
