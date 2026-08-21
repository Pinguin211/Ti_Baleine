import type { DepotEmissionFacture, TypeFacture } from '../../schemas/types/facturation-ports.types';

type DepotEmissionFactureAvecLecture = DepotEmissionFacture & {
  obtenirStatutEmission?: (
    reservationId: string,
    typeFacture: TypeFacture,
  ) => { statut: string } | undefined;
};

/**
 * Vérifie si la facture (acompte ou solde) d'une réservation a déjà été
 * émise avec succès, pour garantir l'idempotence face aux notifications de
 * paiement dupliquées (webhook rejoué) (SPEC-FAC-02, AC-8, cas limite #4).
 */
export function verifierIdempotenceEmissionFacture(
  depotEmission: DepotEmissionFactureAvecLecture,
  reservationId: string,
  typeFacture: TypeFacture,
): boolean {
  const statutExistant = depotEmission.obtenirStatutEmission?.(reservationId, typeFacture);
  return statutExistant?.statut === 'envoyée avec succès';
}
