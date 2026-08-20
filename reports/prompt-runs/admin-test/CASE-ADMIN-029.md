# Run — CASE-ADMIN-029

**Fichier de test :** tests/tests-unitaires/admin/case-admin-029.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-029.test.ts
- tests/cases/admin/CASE-ADMIN-029.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-029.test.ts -t "test_CASE_ADMIN_029_blocage_action_reduction_reservation_0_billet_actif"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/reduire-billets-reservation.action.ts` exportant `reduireBilletsReservationAction(requete, ports)` et types associés dans `src/schemas/types/cancellation.types.ts` (`Billet`).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- L'action de réduction partielle de passagers est impossible sur une réservation à 0 billet actif (déjà annulée) : l'action retourne un échec `{ succes: false, code: 400 }` et n'effectue aucun appel de suppression.
