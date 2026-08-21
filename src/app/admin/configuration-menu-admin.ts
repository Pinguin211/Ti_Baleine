/**
 * Configuration statique des items de menu du back-office administrateur.
 * Respecte la contrainte C-16 (administrateur unique sans sous-comptes).
 * SPEC-ADMIN-04 | CASE-ADMIN-040
 */

export interface ElementMenuAdmin {
  libelle: string;
  route: string;
}

export interface AdministrateurUnique {
  profilUnique: true;
}

export const ELEMENTS_MENU_ADMIN: readonly ElementMenuAdmin[] = [
  { libelle: 'Planning', route: '/admin/planning' },
  { libelle: 'Alertes météo', route: '/admin/alertes' },
  { libelle: 'Réservations', route: '/admin/reservations' },
  { libelle: 'Configuration', route: '/admin/configuration' },
] as const;

export const ADMINISTRATEUR_UNIQUE: AdministrateurUnique = {
  profilUnique: true,
};
