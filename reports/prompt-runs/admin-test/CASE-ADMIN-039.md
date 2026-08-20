# Run — CASE-ADMIN-039

**Fichier de test :** tests/tests-unitaires/admin/case-admin-039.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-039.test.ts
- tests/cases/admin/CASE-ADMIN-039.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-039.test.ts -t "test_CASE_ADMIN_039_expiration_session_inactivite_prolongee_deconnexion_auto"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Réutilise `src/app/admin/garde-route-protegee.ts` (`verifierAccesRouteProtegee`, cf.
  CASE-ADMIN-035) : lorsque `session.dateExpiration < horloge.maintenant()`, le résultat doit porter
  `sessionExpiree: true`, `deconnecte: true` et `redirection: '/admin/login'`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le CASE décrit une expiration par « inactivité prolongée » sans fournir de durée de timeout
  chiffrée dans les Données (seulement « > Timeout paramétré »). Le test simule ce dépassement en
  fixant une horloge largement postérieure à `dateExpiration` de la session, sans figer de valeur
  numérique de timeout (celle-ci reste à définir en phase de code).
- Le mécanisme d'expiration est modélisé via le champ `dateExpiration` de `SessionAdministrateur`
  (déjà introduit en CASE-ADMIN-033), traité comme une expiration glissante côté port
  `GestionnaireSession`/`Horloge` — absent de `docs/uml/domain.puml` (pas d'entité Session), donc
  noté comme hypothèse plutôt qu'ajouté au diagramme.
