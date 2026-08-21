/**
 * CASE-ADMIN-034 — Redirection automatique vers le planning consolidé après
 * authentification réussie
 * SPEC-ADMIN-04 | Scénario 1, AC-1
 */
import { it, expect } from 'vitest';
import type { SessionAdministrateur } from '../../../src/schemas/types/auth.types';
import { resoudreRedirectionPostConnexion } from '../../../src/app/admin/login/resoudre-redirection-post-connexion';

it('test_CASE_ADMIN_034_redirection_automatique_planning_apres_authentification', () => {
  // Étant donné l'administrateur validant son authentification avec succès
  // Quand la session est validée par le back-end
  const sessionValidee: SessionAdministrateur = {
    token: 'session-validee',
    email: 'admin@tibaleine.re',
    dateCreation: new Date(2026, 7, 20, 9, 0),
    dateExpiration: new Date(2026, 7, 20, 9, 30),
  };

  const redirection = resoudreRedirectionPostConnexion(sessionValidee);

  // Alors l'application redirige automatiquement l'administrateur vers l'URL du planning consolidé
  expect(redirection.destination).toBe('/admin/planning');

  // Et la vue du planning s'affiche sans étape intermédiaire superflue
  expect(redirection.affichageImmediat).toBe(true);
});
