/**
 * Filtrage des moyens de règlement du solde autorisés sur place.
 * SPEC-ADMIN-08 | CASE-ADMIN-076
 */

export type MoyenReglement = 'CARTE_BANCAIRE' | 'ESPECES' | 'CHEQUES_VACANCES';

export function obtenirMoyensReglementSoldeSurPlace(
  _reservation: unknown
): MoyenReglement[] {
  return ['CARTE_BANCAIRE'];
}
