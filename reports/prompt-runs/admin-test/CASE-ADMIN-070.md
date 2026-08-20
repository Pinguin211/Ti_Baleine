# Run — CASE-ADMIN-070

**Fichier de test :** tests/tests-unitaires/admin/case-admin-070.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-070.test.ts
- tests/cases/admin/CASE-ADMIN-070.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-070.test.ts -t "test_CASE_ADMIN_070_deconnexion_manuelle_destruction_session_redirection_login"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/deconnecter-administrateur.ts` (mapping "login/mutation -> src/actions/", la
  déconnexion étant elle aussi une mutation) exportant
  `deconnecterAdministrateur(commande: { token: string }, ports: { gestionnaireSession: GestionnaireSession }): { sessionSupprimeeCoteClient: boolean; redirection: string }`,
  qui appelle `gestionnaireSession.revoquer(token)`.
- Réutilise `src/app/admin/garde-route-protegee.ts` (`verifierAccesRouteProtegee`, cf.
  CASE-ADMIN-035) pour vérifier qu'après déconnexion (session cliente à `null`, simulant un retour
  arrière navigateur), l'accès à `/admin/planning` reste refusé.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La révocation serveur est observée via `gestionnaireSession.tokensRevoques` (port de test en
  mémoire, cf. CASE-ADMIN-033) ; le CASE ne précise pas de mécanisme concret (liste noire, TTL en
  base, etc.), laissé à la phase de code.
- Le « retour arrière dans l'historique du navigateur » est simulé en rejouant le guard de route
  avec `session: null` (cookie supprimé côté client), plutôt qu'en testant un vrai historique de
  navigateur — non observable en test unitaire Node.
