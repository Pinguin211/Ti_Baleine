# Run — CASE-ADMIN-002

**Fichier de test :** tests/tests-unitaires/admin/case-admin-002.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-002.test.ts
- tests/cases/admin/CASE-ADMIN-002.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-002.test.ts -t "test_CASE_ADMIN_002_consultation_detail_creneau_activite_navires_mobilises"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/planning/obtenir-detail-creneau.service.ts` exportant :
`export function obtenirDetailCreneau(params: { creneau: CreneauDetailPersiste }): DetailCreneau`
avec `DetailCreneau.{ activite, navires, port }`. Types dans `src/schemas/types/planning.types.ts` (`CreneauDetailPersiste`). Le panneau de détail (React) vivra sous `src/components/domain/planning/` et consommera cette sortie fournie par `src/app/admin/planning/page.tsx` (SPEC-ARCH-02).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne définit aucun attribut explicite reliant `Creneau` à un ou plusieurs `Bateau` (seul `ConfigBateau` existe comme configuration constante indépendante, sans relation UML vers `Creneau`). On suppose que le DTO de détail de créneau expose un champ `navires: string[]` dérivé de la configuration mais non modélisé comme attribut de la classe `Creneau` dans le diagramme fourni.
- Le libellé d'activité (« Sortie Baleines ») et le nom de port (« Saint-Gilles ») sont utilisés tels quels en entrée et passés tels quels en sortie, par cohérence avec la convention de libellés humains déjà utilisée dans `tests/tests-unitaires/reservation/case-res-400.test.ts`.
