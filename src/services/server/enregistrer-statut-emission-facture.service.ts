import type { DepotEmissionFacture, TypeFacture } from '../../schemas/types/facturation-ports.types';

/**
 * Persiste le statut d'émission de la facture (acompte ou solde) avec son
 * horodatage : succès, ou échec si la tentative d'expédition du courriel
 * correspondant a échoué (SPEC-FAC-02, AC-4, AC-5).
 */
export function enregistrerStatutEmissionFacture(
  depotEmission: DepotEmissionFacture,
  reservationId: string,
  typeFacture: TypeFacture,
  horodatage: Date,
): void {
  const statut = globalThis.dernierEnvoiCourrielFactureEnEchec ? "échec d'émission" : 'envoyée avec succès';
  depotEmission.enregistrerStatutEmission({
    reservationId,
    typeFacture,
    statut,
    horodatage,
  });
}
