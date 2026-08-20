# Run — CASE-ADMIN-056

**Fichier de test :** tests/tests-unitaires/admin/case-admin-056.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-056.test.ts
- tests/cases/admin/CASE-ADMIN-056.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-056.test.ts -t "test_CASE_ADMIN_056_basculement_automatique_statut_creneau_sous_pre_alerte"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/envoyer-alerte-groupee.ts` : `envoyerAlerteGroupee` doit appeler `ports.depotCreneau.basculerSousPreAlerte(creneauId)` (port `DepotCreneauAlerte` de `src/schemas/types/alerte-ports.types.ts`, implémenté par `src/services/server/alerts/` en persistance réelle) pour chaque créneau ciblé, et retourner `creneauxMisAJour` reflétant `sousPreAlerte = true`.
- La « répercussion immédiate sur le planning et le site de réservation » est modélisée par une relecture indépendante du dépôt (`depotCreneau.estSousPreAlerte(id)`), correspondant à l'attribut `sousPreAlerte: Boolean` de la classe `Creneau` du domain.puml.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Un client réservataire fictif minimal a été ajouté au créneau pour permettre l'appel complet de l'action d'envoi (le CASE porte sur la bascule de statut, non sur la liste de destinataires).
- La « répercussion immédiate sur le planning et le site de réservation » est testée via une seconde lecture du port de persistance (`depotCreneau`), en l'absence d'API planning/publique dédiée dans le périmètre déjà arrêté (`src/actions/`, `src/services/server/alerts/`, `src/schemas/validation/alerts/`, `src/lib/sms/`, `src/lib/email/`).
