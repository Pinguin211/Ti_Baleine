# Run — CASE-ADMIN-004

**Fichier de test :** tests/tests-unitaires/admin/case-admin-004.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-004.test.ts
- tests/cases/admin/CASE-ADMIN-004.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-004.test.ts -t "test_CASE_ADMIN_004_affichage_etat_vide_explicite_aucun_creneau_programme"

**Emplacement et interface déduits pour le futur code sous src/ :**
Réutilise `src/services/server/planning/obtenir-grille-planning-consolidee.service.ts` (même fonction que CASE-ADMIN-001), dont le type de retour `GrillePlanningConsolidee` porte un champ `messageEtatVide: string | null`, rempli avec « Aucun créneau programmé pour cette journée » lorsque `creneaux` est vide, et `null` sinon. La fonction ne doit jamais lever d'exception pour une liste vide.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le champ `messageEtatVide` sur `GrillePlanningConsolidee` n'est pas un attribut du diagramme de domaine (qui ne décrit que les entités persistées) ; il s'agit d'un champ de présentation calculé par le service pour piloter l'état vide de l'UI, conforme au Cas limite #1 de SPEC-ADMIN-01.
