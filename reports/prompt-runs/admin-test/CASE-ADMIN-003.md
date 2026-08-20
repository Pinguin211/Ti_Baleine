# Run — CASE-ADMIN-003

**Fichier de test :** tests/tests-unitaires/admin/case-admin-003.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-003.test.ts
- tests/cases/admin/CASE-ADMIN-003.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-003.test.ts -t "test_CASE_ADMIN_003_presence_indicateur_badge_sous_pre_alerte_sur_creneau"

**Emplacement et interface déduits pour le futur code sous src/ :**
Réutilise `src/services/server/planning/obtenir-grille-planning-consolidee.service.ts` (même fonction que CASE-ADMIN-001) :
`export function obtenirGrillePlanningConsolidee(params: { date: Date; creneaux: CreneauPlanningPersiste[] }): GrillePlanningConsolidee`
avec, pour chaque créneau affiché, les champs calculés `badgePreAlerte: string | null` et `styleAlerteApplique: boolean`, dérivés de l'attribut `sousPreAlerte: Boolean` de `Creneau` (présent dans `docs/uml/domain.puml`). Le style visuel réel (icône/couleur) sera porté par le composant `src/components/domain/planning/` qui consomme `styleAlerteApplique`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les noms de champs `badgePreAlerte` et `styleAlerteApplique` sont déduits de la règle R-25/AC-2 mais ne sont pas des attributs littéraux de `docs/uml/domain.puml` (qui ne porte que le booléen `sousPreAlerte`) ; ils représentent la sortie calculée attendue de la couche de service pour piloter l'affichage.
