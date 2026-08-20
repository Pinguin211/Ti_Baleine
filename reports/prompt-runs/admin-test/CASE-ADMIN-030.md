# Run — CASE-ADMIN-030

**Fichier de test :** tests/tests-unitaires/admin/case-admin-030.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-030.test.ts
- tests/cases/admin/CASE-ADMIN-030.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-030.test.ts -t "test_CASE_ADMIN_030_rejet_strict_reduction_passagers_creneau_passe"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/reduire-billets-reservation.service.ts` exportant `reduireBilletsReservation(...)` avec contrôle de la date du créneau.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Toute tentative de réduction de passagers sur un départ déjà passé est strictement rejetée avec levée d'erreur ou échec explicite.
- Aucun billet n'est retiré et aucune place n'est restituée.
