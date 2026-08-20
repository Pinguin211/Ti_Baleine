/**
 * CASE-ADMIN-070 — Déconnexion manuelle explicite de l'administrateur : destruction
 * immédiate de session
 * SPEC-ADMIN-04 | Cas limite #5, AC-3, Contrainte C-16
 */
import { it, expect } from 'vitest';
import type { Utilisateur, SessionAdministrateur } from '../../../src/schemas/types/auth.types';
import type { GestionnaireSession, Horloge } from '../../../src/schemas/types/auth-ports.types';
import { deconnecterAdministrateur } from '../../../src/actions/deconnecter-administrateur';
import { verifierAccesRouteProtegee } from '../../../src/app/admin/garde-route-protegee';

class GestionnaireSessionEnMemoire implements GestionnaireSession {
  public sessionsCreees: SessionAdministrateur[] = [];
  public tokensRevoques: string[] = [];
  creer(utilisateur: Utilisateur): SessionAdministrateur {
    const session: SessionAdministrateur = {
      token: `session-${this.sessionsCreees.length + 1}`,
      email: utilisateur.email,
      dateCreation: new Date(),
      dateExpiration: new Date(Date.now() + 30 * 60 * 1000),
    };
    this.sessionsCreees.push(session);
    return session;
  }
  revoquer(token: string): void {
    this.tokensRevoques.push(token);
  }
}

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

it('test_CASE_ADMIN_070_deconnexion_manuelle_destruction_session_redirection_login', () => {
  // Étant donné l'administrateur connecté au back-office
  const gestionnaireSession = new GestionnaireSessionEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 9, 0));
  const utilisateur: Utilisateur = {
    email: 'admin@tibaleine.re',
    motDePasse: 'Tib@leine2026!',
    role: 'ADMIN',
  };
  const sessionActive = gestionnaireSession.creer(utilisateur);

  // Quand il clique sur le bouton « Déconnexion »
  const resultatDeconnexion = deconnecterAdministrateur(
    { token: sessionActive.token },
    { gestionnaireSession }
  );

  // Alors le jeton de session est immédiatement révoqué côté serveur et supprimé côté client
  expect({
    jetonRevoque: gestionnaireSession.tokensRevoques.includes(sessionActive.token),
    sessionSupprimeeCoteClient: resultatDeconnexion.sessionSupprimeeCoteClient,
  }).toEqual({ jetonRevoque: true, sessionSupprimeeCoteClient: true });

  // Et l'administrateur est redirigé vers la page « /admin/login »
  expect(resultatDeconnexion.redirection).toBe('/admin/login');

  // Et toute tentative de retour arrière dans l'historique du navigateur ne permet pas d'accéder
  // aux pages protégées
  const tentativeRetourArriere = verifierAccesRouteProtegee(
    { url: '/admin/planning', session: null },
    { horloge }
  );
  expect(tentativeRetourArriere.accesAutorise).toBe(false);
});
