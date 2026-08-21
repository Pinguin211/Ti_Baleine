/**
 * Détermination de l'état d'affichage du bouton d'encaissement sur place.
 * SPEC-ADMIN-08 | CASE-ADMIN-075
 */

export interface ReservationPourEtatEncaissement {
  statut: 'PAYEE_PARTIELLEMENT' | 'PAYEE_COMPLETEMENT' | string;
  soldeRestantDu?: number;
}

export function obtenirEtatEncaissementSoldeSurPlace(
  reservation: ReservationPourEtatEncaissement
): { boutonEncaisserActif: boolean; mentionStatut: string } {
  if (reservation.statut === 'PAYEE_COMPLETEMENT') {
    return {
      boutonEncaisserActif: false,
      mentionStatut: 'Solde déjà réglé',
    };
  }

  return {
    boutonEncaisserActif: true,
    mentionStatut: 'Solde restant dû',
  };
}
