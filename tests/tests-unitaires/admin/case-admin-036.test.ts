/**
 * CASE-ADMIN-036 — Saisie d'un identifiant ou mot de passe invalide : refus d'accès
 * et message d'erreur générique
 * SPEC-ADMIN-04 | Cas limite #1
 */
import { it, expect } from 'vitest';
import type { Utilisateur } from '../../../src/schemas/types/auth.types';
import type {
  DepotUtilisateurs,
  GestionnaireSession,
  Horloge,
  LimiteurTentatives,
} from '../../../src/schemas/types/auth-ports.types';
import { connecterAdministrateur } from '../../../src/actions/connecter-administrateur';

class DepotUtilisateursEnMemoire implements DepotUtilisateurs {
  constructor(private readonly utilisateurs: Utilisateur[]) {}
  trouverParEmail(email: string): Utilisateur | null {
    return this.utilisateurs.find((utilisateur) => utilisateur.email === email) ?? null;
  }
}

class GestionnaireSessionEnMemoire implements GestionnaireSession {
  public sessionsCreees: unknown[] = [];
  creer(utilisateur: Utilisateur) {
    const session = {
      token: `session-${this.sessionsCreees.length + 1}`,
      email: utilisateur.email,
      dateCreation: new Date(),
      dateExpiration: new Date(),
    };
    this.sessionsCreees.push(session);
    return session;
  }
  revoquer(): void {
    // non sollicité par ce cas
  }
}

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

class LimiteurTentativesEnMemoire implements LimiteurTentatives {
  enregistrerEchec(): void {
    // non sollicité par ce cas
  }
  estBloque(): boolean {
    return false;
  }
}

it('test_CASE_ADMIN_036_refus_connexion_identifiant_invalide_message_generique', () => {
  // Étant donné un utilisateur sur la page de connexion
  const utilisateurAdmin: Utilisateur = {
    email: 'admin@tibaleine.re',
    motDePasse: 'Tib@leine2026!',
    role: 'ADMIN',
  };
  const depotUtilisateurs = new DepotUtilisateursEnMemoire([utilisateurAdmin]);
  const gestionnaireSession = new GestionnaireSessionEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 9, 0));

  // Quand il saisit un e-mail inexistant « inconnu@test.re »...
  const resultatEmailInconnu = connecterAdministrateur(
    { identifiants: { email: 'inconnu@test.re', motDePasse: 'PeuImporte1!' } },
    { depotUtilisateurs, gestionnaireSession, horloge, limiteurTentatives: new LimiteurTentativesEnMemoire() }
  );
  // ... ou « admin@tibaleine.re » avec un mot de passe erroné
  const resultatMotDePasseErrone = connecterAdministrateur(
    { identifiants: { email: 'admin@tibaleine.re', motDePasse: 'MauvaisMotDePasse1!' } },
    { depotUtilisateurs, gestionnaireSession, horloge, limiteurTentatives: new LimiteurTentativesEnMemoire() }
  );

  // Alors l'accès est refusé
  expect([resultatEmailInconnu.identifiantsValides, resultatMotDePasseErrone.identifiantsValides]).toEqual([
    false,
    false,
  ]);

  // Et le système affiche un message d'erreur générique « Identifiant ou mot de passe incorrect »
  expect([resultatEmailInconnu.messageErreur, resultatMotDePasseErrone.messageErreur]).toEqual([
    'Identifiant ou mot de passe incorrect',
    'Identifiant ou mot de passe incorrect',
  ]);

  // Et aucune indication ne précise si le compte existe en base (message strictement identique
  // que l'e-mail soit inconnu ou que le mot de passe soit erroné)
  expect(resultatEmailInconnu.messageErreur).toBe(resultatMotDePasseErrone.messageErreur);
});
