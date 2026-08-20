# Run — CASE-ADMIN-033

**Fichier de test :** tests/tests-unitaires/admin/case-admin-033.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-033.test.ts
- tests/cases/admin/CASE-ADMIN-033.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-033.test.ts -t "test_CASE_ADMIN_033_connexion_reussie_administrateur_identifiants_valides_desktop"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/connecter-administrateur.ts` (mutation Server Action, mapping "login/mutation") exportant
  `connecterAdministrateur(commande: { identifiants: IdentifiantsConnexion }, ports: { depotUtilisateurs, gestionnaireSession, horloge, limiteurTentatives }): ResultatConnexion`.
  Orchestration : vérifie les identifiants via `depotUtilisateurs.trouverParEmail`, puis initialise une
  session via `gestionnaireSession.creer(utilisateur)`.
- Types de domaine `IdentifiantsConnexion`, `Utilisateur` (sous-ensemble de `User` du domain.puml :
  email, motDePasse, role), `SessionAdministrateur`, `ResultatConnexion` sous
  `src/schemas/types/auth.types.ts`.
- Interfaces de ports `DepotUtilisateurs`, `GestionnaireSession`, `Horloge`, `LimiteurTentatives` sous
  `src/schemas/types/auth-ports.types.ts` (implémentations concrètes attendues ensuite sous
  `src/lib/server/auth/`, cf. mapping "session/vérification identifiants").

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne modélise aucune entité « Session » ou « Token » : seul `User.motDePasse`
  existe pour l'authentification. La session est donc traitée comme un port d'infrastructure
  (`GestionnaireSession`), au même titre que `Horloge`/`EnvoiCourriel` dans le domaine facturation,
  et non comme une entité de domaine — pour respecter l'interdiction d'inventer une entité absente
  du diagramme.
- Le champ « Environnement : Poste Desktop » des Données n'est pas exploité dans une assertion (le
  Gherkin du cas ne le vérifie pas) ; il documente seulement le contexte C-16.
- Un port `LimiteurTentatives` (anti-bruteforce) est introduit par anticipation de CASE-ADMIN-038 qui
  réutilise la même action `connecterAdministrateur` ; il n'a aucun effet observable dans ce test.
