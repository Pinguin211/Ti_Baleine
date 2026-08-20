# Run — CASE-ADMIN-073

**Fichier de test :** tests/tests-unitaires/admin/case-admin-073.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-073.test.ts
- tests/cases/admin/CASE-ADMIN-073.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-073.test.ts -t "test_CASE_ADMIN_073_rejet_reemission_alerte_creneau_deja_sous_pre_alerte"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/schemas/validation/alerts/selection-alerte.schema.ts` exportant `creneauEstSelectionnablePourAlerte(...)` et `src/actions/envoyer-alerte-groupee.ts`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Un créneau déjà positionné sous statut « sous pré-alerte » est exclu de la sélection ou rejeté lors d'une nouvelle tentative de déclenchement.
- Aucune notification en doublon n'est émise aux passagers déjà alertés.
