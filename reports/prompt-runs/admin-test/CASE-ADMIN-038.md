# Run — CASE-ADMIN-038

**Fichier de test :** tests/tests-unitaires/admin/case-admin-038.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-038.test.ts
- tests/cases/admin/CASE-ADMIN-038.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-038.test.ts -t "test_CASE_ADMIN_038_protection_anti_bruteforce_blocage_temporaire_tentatives_repetees"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Réutilise `src/actions/connecter-administrateur.ts` (`connecterAdministrateur`, cf.
  CASE-ADMIN-033), étendu avec le port `LimiteurTentatives` (`src/schemas/types/auth-ports.types.ts`) :
  `enregistrerEchec(cle: string): void`, `estBloque(cle: string): boolean`. Après le 5ème échec
  consécutif, l'action doit répondre `ResultatConnexion.statutHttp === 429` **sans** appeler
  `depotUtilisateurs.trouverParEmail` sur la tentative suivante (implémentation attendue sous
  `src/lib/server/auth/`, cf. mapping "session/vérification identifiants" qui couvre aussi la
  politique anti-bruteforce).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne modélise aucun compteur de tentatives échouées ni de verrou temporaire
  sur `User` : le port `LimiteurTentatives` est donc une abstraction d'infrastructure (état en
  mémoire côté serveur), pas un attribut du domaine — noté ici plutôt qu'inventé sur l'entité `User`.
- Le « délai de blocage temporaire (ex: 15 minutes) » des Données est descriptif et n'est pas vérifié
  numériquement (le CASE ne fournit pas de valeur exacte à contrôler dans le Gherkin) ; seul le
  comportement observable (429, pas de nouvelle requête DB) est testé.
- La clé de comptage des échecs (`cle`) n'est pas précisée par le CASE ; le test suppose qu'elle est
  dérivée de l'e-mail/IP de la tentative, sans vérifier sa forme exacte.
