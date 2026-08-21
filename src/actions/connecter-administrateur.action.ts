'use server';

/**
 * Frontière Server Action pour la connexion administrateur (SPEC-ADMIN-04).
 * Compose l'infrastructure réelle (dépôt utilisateurs, session,
 * anti-bruteforce) et pose le cookie de session ; la règle métier testée vit
 * dans `connecter-administrateur.ts`, appelée ici en tant que fonction pure.
 *
 * Fichier séparé, avec `'use server'` en tête (tous les exports doivent être
 * async) : Next.js ne parvient pas à isoler proprement une directive
 * `'use server'` posée seulement à l'intérieur d'une fonction quand cette
 * fonction est importée depuis un composant client (le module entier —
 * `pg`, le client de session — se retrouve alors dans le bundle navigateur).
 * Un fichier dédié, sans logique pure ni dépendance directe côté client,
 * est la manière fiable d'obtenir la séparation serveur/client attendue.
 *
 * @need_more_lines - "Orchestration cohérente anti-bruteforce + dépôt + cookie ; la fragmenter romprait la lisibilité du parcours pour un gain de 5 lignes"
 */

import { cookies } from 'next/headers';
import { connecterAdministrateur, NOM_COOKIE_SESSION_ADMIN, type ResultatConnexionAdministrateur } from './connecter-administrateur';
import { trouverUtilisateurAdminValide, creerGestionnaireSessionReel } from '../services/server/auth/auth-adapters.service';
import { enregistrerEchecConnexion, estAdresseBloquee } from '../services/server/security/rate-limiter.service';
import type { IdentifiantsConnexion } from '../schemas/types/auth.types';
import type { DepotUtilisateurs } from '../schemas/types/auth-ports.types';

export async function soumettreConnexionAdministrateur(
  identifiants: IdentifiantsConnexion
): Promise<ResultatConnexionAdministrateur> {
  // Le blocage anti-bruteforce est vérifié avant toute requête base de données
  // (server/security/rate-limiter.service.ts : « sans requêter la base de
  // données lors d'un blocage »).
  if (estAdresseBloquee(identifiants.email)) {
    return {
      succes: false,
      identifiantsValides: false,
      statutHttp: 429,
      messageErreur: 'Compte temporairement bloqué suite à de trop nombreuses tentatives',
    };
  }

  const utilisateurTrouve = await trouverUtilisateurAdminValide(identifiants);
  const depotUtilisateurs: DepotUtilisateurs = {
    trouverParEmail: (email) => (utilisateurTrouve?.email === email ? utilisateurTrouve : null),
  };

  const resultat = connecterAdministrateur(
    { identifiants },
    {
      depotUtilisateurs,
      gestionnaireSession: creerGestionnaireSessionReel(),
      horloge: { maintenant: () => new Date() },
      limiteurTentatives: { enregistrerEchec: enregistrerEchecConnexion, estBloque: estAdresseBloquee },
    }
  );

  if (resultat.succes && resultat.session) {
    const magasin = await cookies();
    magasin.set(NOM_COOKIE_SESSION_ADMIN, resultat.session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: resultat.session.dateExpiration,
    });
  }

  return resultat;
}
