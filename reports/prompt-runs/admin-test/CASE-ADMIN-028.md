# Run — CASE-ADMIN-028

**Fichier de test :** tests/tests-unitaires/admin/case-admin-028.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-028.test.ts
- tests/cases/admin/CASE-ADMIN-028.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-028.test.ts -t "test_CASE_ADMIN_028_rejet_strict_modification_date_port_lors_reduction"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/reduire-billets-reservation.action.ts` → `reduireBilletsReservationAction`. La
  requête de réduction est validée par un schéma strict qui n'admet aucun champ « date/port
  souhaités » ; une requête contenant `dateDepartSouhaitee`/`portSouhaite` est donc rejetée
  (`succes: false`) avant tout appel au dépôt de persistance, garantissant R-18.
- Le schéma de validation associé relève de `src/schemas/validation/cancellation/reduction-billets.schema.ts`
  (couche « validation d'entrée » du mapping fourni), utilisé en interne par l'action.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les noms de champs illicites (`dateDepartSouhaitee`, `portSouhaite`) sont une hypothèse de forme
  de requête : ni le CASE ni le domaine ne fixent le format exact de la charge utile envoyée à
  l'écran de réduction.
- L'assertion « la réservation demeure rattachée à sa date et son port initiaux » est vérifiée sur
  l'objet `reservation` du test lui-même (non muté après l'appel), en l'absence d'un port de
  lecture dédié dans le CASE.
