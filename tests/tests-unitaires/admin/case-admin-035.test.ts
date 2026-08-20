/**
 * CASE-ADMIN-035 — Interception de toute tentative d'accès non authentifié aux URL
 * protégées avec redirection vers le login
 * SPEC-ADMIN-04 | AC-2
 */
import { it, expect } from 'vitest';
import type { Horloge } from '../../../src/schemas/types/auth-ports.types';
import { verifierAccesRouteProtegee } from '../../../src/app/admin/garde-route-protegee';

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

it('test_CASE_ADMIN_035_interception_acces_non_authentifie_redirection_login', () => {
  // Étant donné un utilisateur anonyme ou non authentifié (sans session valide)
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 9, 0));

  // Quand il tente d'accéder directement à l'URL « /admin/planning »
  const resultat = verifierAccesRouteProtegee({ url: '/admin/planning', session: null }, { horloge });

  // Alors le middleware de sécurité intercepte la requête
  expect(resultat.intercepte).toBe(true);

  // Et bloque l'accès aux données sensibles
  expect(resultat.accesAutorise).toBe(false);

  // Et redirige immédiatement le navigateur vers la page « /admin/login »
  expect(resultat.redirection).toBe('/admin/login');
});
