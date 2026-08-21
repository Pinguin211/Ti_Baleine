/**
 * CASE-ADMIN-038 — Protection anti-bruteforce : ralentissement et blocage temporaire
 * après tentatives répétées
 * SPEC-ADMIN-04 | Cas limite #3
 */
import { it, expect } from 'vitest';
import type { IdentifiantsConnexion, Utilisateur } from '../../../src/schemas/types/auth.types';
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
  creer(utilisateur: Utilisateur) {
    return {
      token: 'session-non-attendue',
      email: utilisateur.email,
      dateCreation: new Date(),
      dateExpiration: new Date(),
    };
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
  private readonly echecs = new Map<string, number>();
  enregistrerEchec(cle: string): void {
    this.echecs.set(cle, (this.echecs.get(cle) ?? 0) + 1);
  }
  estBloque(cle: string): boolean {
    return (this.echecs.get(cle) ?? 0) >= 5;
  }
}

it('test_CASE_ADMIN_038_protection_anti_bruteforce_blocage_temporaire_tentatives_repetees', () => {
  // Étant donné un attaquant tentant plusieurs connexions successives erronées
  const depotUtilisateurs = new DepotUtilisateursEnMemoire([]);
  const gestionnaireSession = new GestionnaireSessionEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 20, 9, 0));
  const limiteurTentatives = new LimiteurTentativesEnMemoire();
  const identifiantsErrones: IdentifiantsConnexion = { email: 'inconnu@test.re', motDePasse: 'Mauvais1!' };
  const ports = { depotUtilisateurs, gestionnaireSession, horloge, limiteurTentatives };

  // Quand le 5ème échec consécutif est atteint
  for (let tentative = 1; tentative <= 5; tentative += 1) {
    connecterAdministrateur({ identifiants: identifiantsErrones }, ports);
  }
  const appelsAvantSixiemeTentative = depotUtilisateurs.appelsTrouverParEmail;
  const sixiemeTentative = connecterAdministrateur({ identifiants: identifiantsErrones }, ports);

  // Alors le système applique un blocage temporaire (HTTP 429 Too Many Requests)
  expect(sixiemeTentative.statutHttp).toBe(429);

  // Et toute nouvelle tentative immédiate est rejetée sans interrogation de la base de données
  expect(depotUtilisateurs.appelsTrouverParEmail).toBe(appelsAvantSixiemeTentative);
});
