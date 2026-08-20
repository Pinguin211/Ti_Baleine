# Run — CASE-ADMIN-005

**Fichier de test :** tests/tests-unitaires/admin/case-admin-005.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-005.test.ts
- tests/cases/admin/CASE-ADMIN-005.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-005.test.ts -t "test_CASE_ADMIN_005_affichage_distinctif_creneau_sans_navire_non_affecte"

**Emplacement et interface déduits pour le futur code sous src/ :**
Réutilise `src/services/server/planning/obtenir-grille-planning-consolidee.service.ts` (même fonction que CASE-ADMIN-001), avec des champs calculés `navireLabel: string` (« non affecté » si aucun navire) et `invitationCompleterAffectation: boolean` sur chaque créneau affiché.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Comme pour CASE-ADMIN-002, `docs/uml/domain.puml` ne modélise pas d'attribut `navires` sur `Creneau`. On suppose que le créneau persisté peut porter un tableau `navires: string[]` vide pour représenter « aucun navire affecté », et que le service calcule `navireLabel` et `invitationCompleterAffectation` à partir de ce tableau — champs de présentation, non attributs du diagramme.
