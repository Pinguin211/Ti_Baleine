/**
 * CASE-ADMIN-039 — Expiration de session après un délai d'inactivité prolongée :
 * déconnexion automatique
 * SPEC-ADMIN-04 | Cas limite #4
 */
import { it, expect } from 'vitest';
import type { SessionAdministrateur } from '../../../src/schemas/types/auth.types';
import type { Horloge } from '../../../src/schemas/types/auth-ports.types';
import { verifierAccesRouteProtegee } from '../../../src/app/admin/garde-route-protegee';

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

it('test_CASE_ADMIN_039_expiration_session_inactivite_prolongee_deconnexion_auto', () => {
  // Étant donné l'administrateur connecté au back-office (session active)
  // Et une période d'inactivité supérieure au timeout configuré sans aucune interaction
  const sessionActive: SessionAdministrateur = {
    token: 'session-inactive',
    email: 'admin@tibaleine.re',
    dateCreation: new Date(2026, 7, 20, 8, 0),
    dateExpiration: new Date(2026, 7, 20, 8, 30),
  };
  const horlogeApresTimeout = new HorlogeFixe(new Date(2026, 7, 20, 9, 15));

  // Quand l'administrateur tente d'effectuer une nouvelle action ou de naviguer
  const resultat = verifierAccesRouteProtegee(
    { url: '/admin/planning', session: sessionActive },
    { horloge: horlogeApresTimeout }
  );

  // Alors la session est considérée comme expirée
  expect(resultat.sessionExpiree).toBe(true);

  // Et l'administrateur est automatiquement déconnecté et redirigé vers « /admin/login »
  expect({ deconnecte: resultat.deconnecte, redirection: resultat.redirection }).toEqual({
    deconnecte: true,
    redirection: '/admin/login',
  });
});
