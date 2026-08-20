# Run — CASE-ADMIN-006

**Fichier de test :** tests/tests-unitaires/admin/case-admin-006.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-006.test.ts
- tests/cases/admin/CASE-ADMIN-006.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-006.test.ts -t "test_CASE_ADMIN_006_affichage_creneau_sans_activite_type_non_renseigne"

**Emplacement et interface déduits pour le futur code sous src/ :**
Réutilise `src/services/server/planning/obtenir-grille-planning-consolidee.service.ts` (même fonction que CASE-ADMIN-001), avec un champ calculé `activiteLabel: string` valant « type non renseigné » lorsque `activite` du créneau persisté est `null`. La fonction ne doit jamais lever d'exception dans ce cas.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` déclare `+activite: Activite` sur `Creneau` sans le marquer optionnel (`[0..1]`). Le Cas limite #3 de SPEC-ADMIN-01 exige pourtant de gérer un créneau sans type renseigné : on suppose donc, pour les besoins de ce cas de robustesse, que `activite` peut être `null` en pratique (ébauche de créneau), bien que le diagramme ne l'indique pas explicitement comme nullable.
