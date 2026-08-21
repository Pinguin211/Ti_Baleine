/**
 * Constantes de routage statiques de l'application.
 * SPEC-ADMIN-04 | SPEC-ARCH-02
 *
 * Constantes pures : 0 import interne.
 */

export const URL_LOGIN_ADMIN = '/admin/login';
export const URL_PLANNING_ADMIN = '/admin/planning';

export const ROUTES_PUBLIQUES = {
  accueil: '/',
  reservation: '/reservation',
} as const;

export const ROUTES_ADMIN = {
  racine: '/admin',
  login: URL_LOGIN_ADMIN,
  planning: URL_PLANNING_ADMIN,
  alertes: '/admin/alertes',
  reservations: '/admin/reservations',
  configuration: '/admin/configuration',
} as const;
