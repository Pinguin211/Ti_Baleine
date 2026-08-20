# Run — CASE-ADMIN-025

**Fichier de test :** tests/tests-unitaires/admin/case-admin-025.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-025.test.ts
- tests/cases/admin/CASE-ADMIN-025.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-025.test.ts -t "test_CASE_ADMIN_025_reduction_mixte_adultes_enfants_recalcul_audit"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/cancellation/reduire-billets-reservation.service.ts` → `reduireBilletsReservation`,
  appelée ici avec un retrait mixte (`adultesARetirer: 2, enfantsARetirer: 1`) et un port
  supplémentaire `journalAudit` (voir hypothèse ci-dessous) pour couvrir la ligne Gherkin sur la
  traçabilité.
- Types : `src/schemas/types/cancellation.types.ts` (`Billet`).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne modélise aucune entité « historique »/« audit » sur `Reservation` ni
  ailleurs. Le CASE lui-même reconnaît l'ambiguïté (« historique ou audit selon l'implémentation
  retenue »). Le test introduit donc un port technique `JournalAudit.consigner(...)` comme
  hypothèse d'infrastructure (au même titre que l'horloge ou l'envoi de SMS dans les autres cas),
  sans lui attribuer de statut d'entité de domaine — à valider avec l'équipe métier avant
  implémentation définitive.
- Mêmes hypothèses que CASE-ADMIN-023 sur l'absence d'identifiant technique dans le diagramme.
