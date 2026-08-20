# Run — CASE-ADMIN-001

**Fichier de test :** tests/tests-unitaires/admin/case-admin-001.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-001.test.ts
- tests/cases/admin/CASE-ADMIN-001.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-001.test.ts -t "test_CASE_ADMIN_001_affichage_consolide_grille_planning_multisites_desktop"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/planning/obtenir-grille-planning-consolidee.service.ts` (data-fetching/consolidation, donc `services/server/`) exportant :
`export function obtenirGrillePlanningConsolidee(params: { date: Date; creneaux: CreneauPlanningPersiste[] }): GrillePlanningConsolidee`
avec `GrillePlanningConsolidee.creneaux[].{ port, heureDepart, etatOperationnel }`. Types associés dans `src/schemas/types/planning.types.ts` (`CreneauPlanningPersiste`). Le composant d'affichage (grille React) consommera cette sortie depuis `src/components/domain/planning/` et la page `src/app/admin/planning/page.tsx` appellera le service côté serveur (SPEC-ARCH-02 : `app/` → `services/server/`).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne modélise pas d'attribut « état opérationnel » sur `Creneau` (seulement `estOuvert`, `sousPreAlerte`, `estReservable()`). On suppose que la couche de service calcule un champ d'affichage `etatOperationnel` (chaîne) dérivé de ces attributs ; le test ne vérifie que sa présence (type `string`), sans exiger de valeur précise puisque aucune n'est donnée en Données.
- Les créneaux de test comportent une activité (`Sortie Baleines`) et un état `estOuvert: true` / `sousPreAlerte: false` non spécifiés par la section Données (hors périmètre explicite du cas), utilisés uniquement pour satisfaire la forme complète de l'entité `Creneau` du domaine.
- Les valeurs `port` utilisent le libellé humain (« Saint-Gilles », « Saint-Leu ») par cohérence avec la convention déjà utilisée dans `tests/tests-unitaires/reservation/case-res-400.test.ts`, plutôt que l'énuméré `Port` du diagramme (`SAINT_GILLES`/`SAINT_LEU`).
