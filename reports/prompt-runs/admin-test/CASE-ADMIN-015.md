# Run — CASE-ADMIN-015

**Fichier de test :** tests/tests-unitaires/admin/case-admin-015.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-015.test.ts
- tests/cases/admin/CASE-ADMIN-015.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-015.test.ts -t "test_CASE_ADMIN_015_remise_a_disposition_immediate_places_interface_publique"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/annuler-reservation.service.ts` opérant sur le port `DepotCreneauAnnulation.libererPlaces(reference, nombrePlaces)`.
Les requêtes publiques de disponibilité (`src/services/server/planning/obtenir-disponibilite-creneau.service.ts`) lisent directement la jauge synchronisée.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La libération des places associées aux billets supprimés est synchrone et immédiatement reflétée sur le stock disponible du créneau pour les réservations publiques.
- Aucun délai ou batch différé n'est requis pour la remise en vente des places libérées.
