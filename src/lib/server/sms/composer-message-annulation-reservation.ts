/**
 * Composition à la volée du texte du SMS d'annulation client.
 * SPEC-ADMIN-02 | CASE-ADMIN-013
 *
 * Le motif saisi par l'administrateur n'est exploité que pour ce message
 * éphémère : il n'est jamais persisté sur l'entité réservation (REQ-020),
 * et le texte produit ne mentionne jamais de détail financier.
 */

interface ParametresMessageAnnulation {
  motif: string;
}

/**
 * Compose le texte du SMS informatif d'annulation transmis au client, sans
 * aucune mention du calcul de remboursement (SPEC-ADMIN-02, CASE-ADMIN-013).
 */
export function composerMessageAnnulationReservation(
  parametres: ParametresMessageAnnulation,
): string {
  return `Votre réservation a été annulée. Motif : ${parametres.motif}.`;
}
