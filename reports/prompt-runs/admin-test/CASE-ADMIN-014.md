# Run — CASE-ADMIN-014

**Fichier de test :** tests/tests-unitaires/admin/case-admin-014.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-014.test.ts
- tests/cases/admin/CASE-ADMIN-014.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-014.test.ts -t "test_CASE_ADMIN_014_conservation_fiche_reservation_bdd_historique_0_billet"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/annuler-reservation.service.ts` exportant `annulerReservationService(...)` opérant sur le port `DepotReservationAnnulation`.
Types dans `src/schemas/types/cancellation.types.ts`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La fiche réservation (`Reservation`) est conservée en base de données avec sa clé primaire / référence d'origine et son montant d'acompte initial intact (traçabilité financière comptable).
- L'annulation se matérialise par la suppression de ses billets actifs (`billetsActifs = []`), sans suppression de l'entité réservation elle-même (soft-cancellation).
