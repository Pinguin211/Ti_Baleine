'use server';

/**
 * Frontière Server Action pour la prévisualisation du remboursement
 * indicatif avant annulation (SPEC-ADMIN-02, CASE-ADMIN-010, 012, 079).
 * Séparé de `soumettre-annulation-reservation.action.ts` : lecture seule,
 * appelée à l'ouverture de la modale plutôt qu'à la confirmation.
 */

import { chargerReservationParReference, chargerMontantAcompteVerse } from '../services/server/cancellation/reservation-repository.service';
import { calculerRemboursementIndicatif } from '../services/server/cancellation/calculer-remboursement-indicatif.service';

export interface PreviewAnnulation {
  sommePayee: number;
  penaliteBareme?: number;
  remboursementIndicatif: number;
  regime: 'DEROGATOIRE_ALERTE' | 'STANDARD';
}

export async function previsualiserAnnulationAction(reference: string): Promise<PreviewAnnulation | null> {
  const reservation = await chargerReservationParReference(reference);
  if (!reservation) return null;

  const montantAcompte = await chargerMontantAcompteVerse(reservation.id);
  return calculerRemboursementIndicatif({ reservation: { montantAcompte } });
}
