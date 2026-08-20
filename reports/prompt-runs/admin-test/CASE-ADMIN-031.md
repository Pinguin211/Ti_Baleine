# Run — CASE-ADMIN-031

**Fichier de test :** tests/tests-unitaires/admin/case-admin-031.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-031.test.ts
- tests/cases/admin/CASE-ADMIN-031.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-031.test.ts -t "test_CASE_ADMIN_031_coherence_transactionnelle_jauge_billets_reduction_partielle"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/reduire-billets-reservation.service.ts` garantissant l'atomicité de la mise à jour des billets et de la jauge.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- En cas d'échec de libération de places au niveau du créneau, la suppression des billets est annulée (rollback).
- L'intégrité entre le décompte des billets et la jauge du créneau est garantie en toutes circonstances.
