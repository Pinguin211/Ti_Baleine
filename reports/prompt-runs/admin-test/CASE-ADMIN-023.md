# Run — CASE-ADMIN-023

**Fichier de test :** tests/tests-unitaires/admin/case-admin-023.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-023.test.ts
- tests/cases/admin/CASE-ADMIN-023.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-023.test.ts -t "test_CASE_ADMIN_023_reduction_partielle_passagers_suppression_billet_adulte"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/cancellation/reduire-billets-reservation.service.ts` — fonction
  `reduireBilletsReservation({ reservation, adultesARetirer, enfantsARetirer }, { depotBillets, depotCreneau })`
  qui supprime N billets par type via un port `DepotBillets.supprimerBillets(reference, billets)`
  puis libère N places via `DepotCreneau.libererPlaces(creneau, nombrePlaces)`. Persistance/règle
  métier de retrait sélectif → `services/server/` (SPEC-ARCH-02).
- `src/schemas/types/cancellation.types.ts` — type `Billet { typeBillet: 'ADULTE' | 'ENFANT' |
  'PRIVATISATION' }`, strictement dérivé de la classe `Billet` de docs/uml/domain.puml (seul
  attribut modélisé : `typeBillet`).
- Le test importe `reduireBilletsReservation` depuis `src/services/server/cancellation/…`
  (import valeur, provoque l'échec « Cannot find module », donc rouge pour la bonne raison) et
  `Billet` en `import type` depuis `src/schemas/types/cancellation.types` (érasé à la
  transpilation, sans effet sur le rouge).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La signature exacte de `reduireBilletsReservation` (paramètres `demande`/`ports`, forme du
  résultat) est une invention de test — le CASE ne fixe pas d'interface, seulement le
  comportement observable (Gherkin), conformément à l'esprit TDD du prompt.
- `docs/uml/domain.puml` ne donne pas d'identifiant technique (`id`) sur `Billet` ni de référence
  technique sur `Creneau` (seuls `date`, `heureDepart`, `port` sont modélisés) : le test
  identifie donc les créneaux via ce triplet plutôt que par un `id` inventé, et les billets
  purement par leur `typeBillet` (aucune granularité individuelle plus fine n'étant modélisée).
