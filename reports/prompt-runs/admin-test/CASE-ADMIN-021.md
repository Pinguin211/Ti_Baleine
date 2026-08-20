# Run — CASE-ADMIN-021

**Fichier de test :** tests/tests-unitaires/admin/case-admin-021.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-021.test.ts
- tests/cases/admin/CASE-ADMIN-021.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-021.test.ts -t "test_CASE_ADMIN_021_coherence_transactionnelle_annulation_rollback_reseau"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/annuler-reservation.service.ts` exportant `annulerReservationService(...)` garantissant une transaction atomique via `DepotReservationAnnulation` et `DepotCreneauAnnulation`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Toute défaillance survenant au cours de l'opération (ex. coupure réseau pendant la libération de places) déclenche un rollback complet.
- Les billets demeurent actifs, la jauge n'est pas modifiée, et aucun SMS n'est expédié.
