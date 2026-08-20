# Run — CASE-ADMIN-022

**Fichier de test :** tests/tests-unitaires/admin/case-admin-022.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-022.test.ts
- tests/cases/admin/CASE-ADMIN-022.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-022.test.ts -t "test_CASE_ADMIN_022_absence_flux_financier_sortant_automatique_annulation"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/annuler-reservation.service.ts` exportant `annulerReservationService(...)` sans dépendance vers une passerelle de paiement sortant.
Conforme aux règles SPEC-ARCH-02 et R-27/R-29.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- L'annulation administrative ne déclenche aucun virement bancaire ou flux de remboursement sortant automatique (Stripe/bancaire).
- Le calcul indicatif est fourni à l'administrateur pour information, mais le remboursement matériel reste manuel hors du système automatique.
