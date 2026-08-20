# Run — CASE-ADMIN-024

**Fichier de test :** tests/tests-unitaires/admin/case-admin-024.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-024.test.ts
- tests/cases/admin/CASE-ADMIN-024.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-024.test.ts -t "test_CASE_ADMIN_024_reduction_partielle_passagers_suppression_billet_enfant"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Même fonction que CASE-ADMIN-023 : `src/services/server/cancellation/reduire-billets-reservation.service.ts`
  → `reduireBilletsReservation({ reservation, adultesARetirer, enfantsARetirer }, { depotBillets, depotCreneau })`.
  Ce test appelle avec `enfantsARetirer: 1` pour couvrir sélectivement le type ENFANT, prouvant
  que la fonction retire précisément le type demandé sans toucher aux billets adultes.
- Types partagés : `src/schemas/types/cancellation.types.ts` (`Billet { typeBillet }`), fidèle à
  `docs/uml/domain.puml`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Mêmes hypothèses que CASE-ADMIN-023 concernant l'absence d'identifiant technique sur `Billet`
  et `Creneau` dans le diagramme de domaine.
