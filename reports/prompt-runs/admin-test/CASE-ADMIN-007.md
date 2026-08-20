# Run — CASE-ADMIN-007

**Fichier de test :** tests/tests-unitaires/admin/case-admin-007.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-007.test.ts
- tests/cases/admin/CASE-ADMIN-007.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-007.test.ts -t "test_CASE_ADMIN_007_consultation_planning_continu_24h_24_sans_restriction"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/planning/verifier-acces-planning-continu.service.ts` exportant :
`export function verifierAccesPlanningContinu(params: { instant: Date; role: 'Administrateur' }): { accesAutorise: boolean; restrictionHoraireAppliquee: boolean }`
Cette fonction encapsule l'absence de fenêtre horaire restrictive pour le rôle administrateur (contrairement aux règles H-2 côté client public, hors périmètre de ce cas).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La section Données ne précise que l'heure de consultation (« 23:45 / 04:15 », deux exemples équivalents) sans jour calendaire ; le jour 19/08/2026 a été choisi arbitrairement pour construire un objet `Date` valide et n'est pas une donnée métier vérifiée par ce cas — seule l'heure (23h45) est significative.
- Le type de retour `{ accesAutorise, restrictionHoraireAppliquee }` est déduit des deux lignes du tableau « Résultat attendu » du CASE (Accès planning / Restriction horaire appliquée) ; ce n'est pas un type présent dans `docs/uml/domain.puml` (aucune entité de contrôle d'accès horaire n'y figure), mais une interface de service dédiée à cette règle de conformité (Cas limite #4, Portée §1).
