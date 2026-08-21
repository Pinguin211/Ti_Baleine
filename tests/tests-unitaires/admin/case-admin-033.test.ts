/**
 * CASE-ADMIN-033 — Connexion réussie de l'administrateur avec un identifiant e-mail
 * et un mot de passe valides sur Desktop
 * SPEC-ADMIN-04 | Scénario 1, AC-1, Contrainte C-16, REQ-103
 */
import { it, expect } from 'vitest';
import type {
  IdentifiantsConnexion,
  Utilisateur,
  SessionAdministrateur,
} from '../../../src/schemas/types/auth.types';
import type {
  DepotUtilisateurs,
  GestionnaireSession,
  Horloge,
  LimiteurTentatives,
} from '../../../src/schemas/types/auth-ports.types';
import { connecterAdministrateur } from '../../../src/actions/connecter-administrateur';

class DepotUtilisateursEnMemoire implements DepotUtilisateurs {
  public appelsTrouverParEmail = 0;
  constructor(private readonly utilisateurs: Utilisateur[]) {}
  trouverParEmail(email: string): Utilisateur | null {
    this.appelsTrouverParEmail += 1;
    return this.utilisateurs.find((utilisateur) => utilisateur.email === email) ?? null;
  }
}

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

class LimiteurTentativesEnMemoire implements LimiteurTentatives {
  private readonly echecs = new Map<string, number>();
  enregistrerEchec(cle: string): void {
    this.echecs.set(cle, (this.echecs.get(cle) ?? 0) + 1);
  }
  estBloque(cle: string): boolean {
    return (this.echecs.get(cle) ?? 0) >= 5;
  }
}

it('test_CASE_ADMIN_033_connexion_reussie_administrateur_identifiants_valides_desktop', () => {
  // Étant donné l'administrateur sur la page d'authentification du back-office depuis un poste Desktop
  const utilisateur: Utilisateur = {
    email: 'admin@tibaleine.re',
    motDePasse: 'Tib@leine2026!',
    role: 'ADMIN',
  };
  const depotUtilisateurs = new DepotUtilisateursEnMemoire([utilisateur]);
  const gestionnaireSession = new GestionnaireSessionEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 9, 0));
  const limiteurTentatives = new LimiteurTentativesEnMemoire();

  // Quand il saisit son adresse e-mail valide « admin@tibaleine.re » et son mot de passe correct
  // conforme à la politique de robustesse, et valide le formulaire de connexion
  const identifiants: IdentifiantsConnexion = {
    email: 'admin@tibaleine.re',
    motDePasse: 'Tib@leine2026!',
  };

  const resultat = connecterAdministrateur(
    { identifiants },
    { depotUtilisateurs, gestionnaireSession, horloge, limiteurTentatives }
  );

  // Alors les identifiants sont vérifiés avec succès
  expect(resultat.identifiantsValides).toBe(true);

  // Et une session sécurisée est initialisée
  expect(resultat.session).toMatchObject({
    token: expect.stringMatching(/.+/),
    email: 'admin@tibaleine.re',
  });
});
