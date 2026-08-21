/**
 * Types d'affichage partagés par la grille et le volet de détail du planning.
 * SPEC-ADMIN-01 — évite la dépendance circulaire entre les deux composants.
 */

export interface CreneauAffichePlanning {
  id: string;
  port: string;
  heureDepart: string;
  etatOperationnel: string;
  badgePreAlerte?: string;
  styleAlerteApplique: boolean;
  navireLabel: string;
  invitationCompleterAffectation: boolean;
  activiteLabel: string | null;
  occupees: number;
  jauge: number;
  reservations: { reference: string; badge: string; couleurBadge?: string; soldeDu: number }[];
}
