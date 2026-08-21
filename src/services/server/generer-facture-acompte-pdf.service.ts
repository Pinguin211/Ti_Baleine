import { randomUUID } from 'node:crypto';
import type { ReservationFacturable, FactureAcompte } from '../../schemas/types/facturation.types';
import type { Horloge } from '../../schemas/types/facturation-ports.types';
import {
  construireLignesTarifaires,
  calculerMontantTotalTtc,
  type LigneTarifaire,
} from '../../utils/calcul-tarification-facturation.util';
import { calculerSoldeRestantDu } from '../../utils/calcul-acompte-solde.util';
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

export type FactureAcompteDetaillee = FactureAcompte & {
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
 * Génère à la volée, en mémoire vive, la facture d'acompte PDF d'une
 * réservation (SPEC-FAC-02, AC-1, AC-3).
 */
export function genererFactureAcomptePdf(
  reservation: ReservationFacturableEtendue,
  acompteRegle: number,
  horloge: Horloge,
): FactureAcompteDetaillee {
  const lignesTarifaires = construireLignesTarifaires(versParametresVentilation(reservation));
  const montantTotalTtc = calculerMontantTotalTtc(lignesTarifaires);
  const soldeRestantDu = calculerSoldeRestantDu(montantTotalTtc, acompteRegle);
  const identifiantUnique = `FACT-AC-${horloge.maintenant().getFullYear()}-${randomUUID()}`;
  const dateEtHoraire = formaterDateEtHoraireFacturation(reservation.dateDepart);
  const contenu = construireContenuPdfEnMemoire([
    `Reservation ${reservation.id} - ${reservation.prestation} - ${reservation.portEmbarquement}`,
    `Date et horaire: ${dateEtHoraire}`,
    `Adultes: ${reservation.nombreAdultes ?? ''}`,
    'Mention: Acompte acquitté',
    `Total TTC: ${montantTotalTtc}`,
    `Acompte réglé: ${acompteRegle}`,
    `Solde restant dû: ${soldeRestantDu}`,
  ]);
  return {
    identifiantUnique,
    mentionAcompte: 'Acompte acquitté',
    montantTotalTtc,
    acompteRegle,
    soldeRestantDu,
    contenu,
    portEmbarquement: reservation.portEmbarquement,
    prestation: reservation.prestation,
    dateEtHoraire,
    lignesTarifaires,
  };
}
