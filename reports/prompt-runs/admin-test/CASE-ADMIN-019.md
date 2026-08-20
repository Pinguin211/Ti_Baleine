# Run — CASE-ADMIN-019

**Fichier de test :** tests/tests-unitaires/admin/case-admin-019.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-019.test.ts
- tests/cases/admin/CASE-ADMIN-019.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-019.test.ts -t "test_CASE_ADMIN_019_traitement_numero_mobile_invalide_annulation_log_echec"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/annuler-reservation.service.ts` exportant `annulerReservationService(...)` avec port de journalisation d'audit `JournalAuditAnnulation`.
Types dans `src/schemas/types/cancellation.types.ts`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Un numéro de téléphone client invalide ou absent entraîne un échec de délivrance SMS qui est capturé et consigné dans le journal d'audit.
- Cet échec de notification ne bloque pas la transaction d'annulation en base (les billets sont bien supprimés et les places libérées).
