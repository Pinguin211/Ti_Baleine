# Run — CASE-ADMIN-046

**Fichier de test :** tests/tests-unitaires/admin/case-admin-046.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-046.test.ts
- tests/cases/admin/CASE-ADMIN-046.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-046.test.ts -t "test_CASE_ADMIN_046_recalcul_instantane_temps_reel_remplissage_apres_annulation"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/capacity/calculer-remplissage-creneau.ts` — même fonction `calculerRemplissageCreneau({ jaugeMax, placesReservees })`, appelée deux fois (état initial 36/36 puis état recalculé 30/36) pour vérifier que le recalcul est une fonction pure et déterministe du nombre de billets actifs, donc immédiatement cohérente à chaque appel (pas de cache ni d'état interne à invalider). La réactivité « temps réel » côté client (déclenchement du nouvel appel après annulation) relèverait de `src/hooks/domain/capacity/` (ex. `use-remplissage-creneau.ts`) mais n'est pas testable dans le projet Vitest `admin` (environnement `node`, sans DOM) — seule la justesse du recalcul est couverte ici.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La suppression effective des 6 billets (BOOKING_ITEMS) via l'annulation administrative relève de SPEC-ADMIN-02/03, donc simulée en amont : le test appelle directement le service avec le décompte déjà réduit (30), conformément à la consigne « tu peux simuler ce qui entoure le calcul » — le recalcul du taux lui-même n'est pas simulé.
- Le hook client de rafraîchissement temps réel (`src/hooks/domain/capacity/`) n'est pas couvert par ce test faute d'environnement DOM dans le projet `admin` ; seule la fonction de calcul qu'il invoquerait est vérifiée.
