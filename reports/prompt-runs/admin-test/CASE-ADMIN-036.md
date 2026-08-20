# Run — CASE-ADMIN-036

**Fichier de test :** tests/tests-unitaires/admin/case-admin-036.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-036.test.ts
- tests/cases/admin/CASE-ADMIN-036.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-036.test.ts -t "test_CASE_ADMIN_036_refus_connexion_identifiant_invalide_message_generique"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Réutilise `src/actions/connecter-administrateur.ts` (`connecterAdministrateur`, cf.
  CASE-ADMIN-033) : en cas d'échec, `ResultatConnexion.identifiantsValides === false` et
  `ResultatConnexion.messageErreur === 'Identifiant ou mot de passe incorrect'`, message strictement
  identique que l'e-mail soit inconnu ou que le mot de passe soit erroné (pas de branchement
  observable révélant l'existence du compte).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les Données citent deux scénarios possibles (« inconnu@test.re ou admin@tibaleine.re avec mauvais
  mot de passe ») sans préciser le mot de passe exact utilisé dans chaque branche. Le test instancie
  les deux branches avec des mots de passe de saisie inventés (`PeuImporte1!`,
  `MauvaisMotDePasse1!`), la valeur précise étant sans incidence sur le résultat attendu (seul le
  fait qu'ils soient incorrects compte). Ceci n'est pas fourni tel quel dans la section Données.
- La 3ème ligne du Gherkin (« aucune indication ne précise si le compte existe en base ») est
  traduite par une comparaison stricte d'égalité entre les deux messages d'erreur des deux branches,
  ce qui est un observable déduit et non un champ explicitement défini par le CASE.
