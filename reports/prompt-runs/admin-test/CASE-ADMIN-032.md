# Run — CASE-ADMIN-032

**Fichier de test :** tests/tests-unitaires/admin/case-admin-032.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-032.test.ts
- tests/cases/admin/CASE-ADMIN-032.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-032.test.ts -t "test_CASE_ADMIN_032_absence_remboursement_automatique_reduction_partielle"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/reduire-billets-reservation.service.ts` exportant `reduireBilletsReservation(...)`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La réduction partielle de passagers ne déclenche aucun flux de remboursement bancaire automatique.
- Les montants contractuels et l'acompte restant sont recalculés pour traçabilité sans émission de flux financier sortant.
