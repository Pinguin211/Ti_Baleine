/**
 * CASE-ADMIN-071 — Maintien de l'état authentifié lors de la navigation inter-pages
 * et du rafraîchissement (F5)
 * SPEC-ADMIN-04 | AC-1, Contrainte C-16
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

it('test_CASE_ADMIN_071_maintien_etat_authentifie_navigation_rafraichissement_f5', () => {
  // Étant donné l'administrateur connecté consultant le planning (session active et valide)
  const sessionActive: SessionAdministrateur = {
    token: 'session-valide',
    email: 'admin@tibaleine.re',
    dateCreation: new Date(2026, 7, 20, 9, 0),
    dateExpiration: new Date(2026, 7, 20, 9, 30),
  };
  const horlogePendantSessionActive = new HorlogeFixe(new Date(2026, 7, 20, 9, 5));

  // Quand il rafraîchit la page du navigateur (F5) ou navigue vers le détail d'un créneau
  const resultat = verifierAccesRouteProtegee(
    { url: '/admin/planning', session: sessionActive },
    { horloge: horlogePendantSessionActive }
  );

  // Alors sa session active est reconnue
  expect(resultat.accesAutorise).toBe(true);

  // Et l'administrateur reste sur la page demandée sans être invité à ressaisir ses identifiants
  expect(resultat.redirection).toBeNull();
});
