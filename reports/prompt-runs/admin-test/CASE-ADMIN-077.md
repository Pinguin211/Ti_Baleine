# Run — CASE-ADMIN-077

**Fichier de test :** tests/tests-unitaires/admin/case-admin-077.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-077.test.ts
- tests/cases/admin/CASE-ADMIN-077.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-077.test.ts -t "test_CASE_ADMIN_077_affichage_statuts_financiers_reservations_detail_creneau_jour_j"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/planning/obtenir-statuts-financiers-reservations.service.ts` exportant :
`export function obtenirStatutsFinanciersReservations(reservations: ReservationPersiste[]): StatutFinancierAffiche[]`
avec `ReservationPersiste.{ reference, statut: StatutReservation, soldeRestantDu }` (attributs `reference` et méthode `soldeRestantDu()` déjà présents sur `Reservation` dans `docs/uml/domain.puml`, ainsi que l'énuméré `StatutReservation` avec `PAYEE_COMPLETEMENT`/`PAYEE_PARTIELLEMENT`) et `StatutFinancierAffiche.{ reference, badge, couleurBadge, soldeDu }` calculé (mapping badge vert « Payée complètement » / badge « Payée partiellement »).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les champs de sortie `badge` et `couleurBadge` sont des libellés de présentation déduits de la règle R-30 (badge vert vs badge distinctif), non des attributs littéraux du diagramme de domaine, qui ne porte que l'énuméré technique `StatutReservation`.
