# Run — CASE-ADMIN-027

**Fichier de test :** tests/tests-unitaires/admin/case-admin-027.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-027.test.ts
- tests/cases/admin/CASE-ADMIN-027.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-027.test.ts -t "test_CASE_ADMIN_027_rejet_strict_tentative_ajout_billet_reservation_existante"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/reduire-billets-reservation.action.ts` → `reduireBilletsReservationAction({ reservation,
  requete }, ports)` : orchestration de la mutation (SPEC-ARCH-02, `actions/`) qui valide la requête
  brute avant tout appel au service. Une requête portant `operation: 'AJOUT'` (au lieu du seul
  littéral autorisé `'RETRAIT'`) est rejetée avec `{ succes: false, message: /* … nouvelle
  réservation */ }`, sans jamais invoquer `DepotBillets.supprimerBillets` (le faux dépôt du test
  lève une erreur s'il est appelé, pour matérialiser cette garantie R-18).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le CASE ne donne pas le texte exact du message informatif ; l'assertion vérifie seulement qu'il
  mentionne « nouvelle réservation », reprenant le vocabulaire déjà présent dans la ligne Gherkin
  elle-même (pas une valeur inventée en Données).
- Le mécanisme technique retenu pour distinguer un « ajout » d'un « retrait » (littéral
  `operation: 'RETRAIT'` strictement exigé par le schéma de validation) est une hypothèse
  d'implémentation : le diagramme de domaine et la spec ne décrivent pas de format de requête.
