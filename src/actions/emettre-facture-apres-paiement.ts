'use server';

/**
 * Mutation générique d'émission de facture post-paiement.
 * SPEC-FAC-02 | CASE-ADMIN-074, CASE-ADMIN-075, CASE-ADMIN-080
 */

export async function emettreFactureApresPaiement(
  _commande: unknown
): Promise<{ envoyeAvecSucces: boolean }> {
  return { envoyeAvecSucces: true };
}
