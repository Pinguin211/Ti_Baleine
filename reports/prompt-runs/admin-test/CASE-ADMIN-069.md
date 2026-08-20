# Run — CASE-ADMIN-069

**Fichier de test :** tests/tests-unitaires/admin/case-admin-069.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-069.test.ts
- tests/cases/admin/CASE-ADMIN-069.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-069.test.ts -t "test_CASE_ADMIN_069_rejet_suppression_billets_superieur_billets_actifs"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/schemas/validation/cancellation/reduction-billets.schema.ts` exportant `createReductionBilletsSchema(...)` et `src/actions/reduire-billets-reservation.action.ts`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Si la demande de réduction porte sur un nombre de billets supérieur au nombre de billets actifs du type sélectionné, la validation rejette la saisie (`valide: false`) et l'action serveur bloque l'opération sans modification.
