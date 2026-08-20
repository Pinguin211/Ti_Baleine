# Run — CASE-ADMIN-053

**Fichier de test :** tests/tests-unitaires/admin/case-admin-053.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-053.test.ts
- tests/cases/admin/CASE-ADMIN-053.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-053.test.ts -t "test_CASE_ADMIN_053_preremplissage_instantane_template_incident_technique"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Même module `src/services/server/alerts/templates-alerte.ts` que CASE-ADMIN-052, avec en plus `modifierZoneMessageAlerte(zone: ZoneMessageAlerte, nouveauTexte: string): ZoneMessageAlerte` pour matérialiser l'adaptation du texte par l'administrateur avant diffusion (portée §4 SPEC-ADMIN-06).
- Template ciblé : `id = 'INCIDENT_TECHNIQUE'`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le contenu littéral du template « Incident technique » n'est pas fourni ; le test vérifie la cohérence entre `obtenirTemplateAlerte` + `composerMessageBilingue` et `preremplirZoneMessageAvecTemplate`, sans fixer de texte en dur.
- Le texte d'adaptation « Maintenance imprévue. » ajouté par l'administrateur pour vérifier la capacité de modification est une valeur d'exemple neutre introduite pour le test (le CASE ne fournit pas de texte précis pour ce cas, contrairement à CASE-ADMIN-054 qui en fournit un).
