# Run — CASE-ADMIN-016

**Fichier de test :** tests/tests-unitaires/admin/case-admin-016.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-016.test.ts
- tests/cases/admin/CASE-ADMIN-016.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-016.test.ts -t "test_CASE_ADMIN_016_annulation_administrative_autorisee_jusqua_heure_depart_h0"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/annuler-reservation.ts` exportant `annulerReservation(...)` avec validation temporelle intégrée via `Horloge`.
Types dans `src/schemas/types/cancellation.types.ts`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- L'administrateur dispose du droit d'annulation d'office jusqu'à l'heure exacte de départ (H-0), contrairement aux clients finaux qui sont contraints par un préavis de 48h (SPEC-CANCEL-01).
- Une demande effectuée à la minute même du départ est acceptée et exécutée avec succès.
