/**
 * Types pour les annulations et réductions de billets.
 * SPEC-ADMIN-02, SPEC-ADMIN-03 | CASE-ADMIN-069, CASE-ADMIN-079
 */

export interface Billet {
  id?: string;
  typeBillet: 'ADULTE' | 'ENFANT' | 'PRIVATISATION' | string;
}
