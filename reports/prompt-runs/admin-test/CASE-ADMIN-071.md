# Run — CASE-ADMIN-071

**Fichier de test :** tests/tests-unitaires/admin/case-admin-071.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-071.test.ts
- tests/cases/admin/CASE-ADMIN-071.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-071.test.ts -t "test_CASE_ADMIN_071_maintien_etat_authentifie_navigation_rafraichissement_f5"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Réutilise `src/app/admin/garde-route-protegee.ts` (`verifierAccesRouteProtegee`, cf.
  CASE-ADMIN-035/039) : avec une session dont `dateExpiration` est encore postérieure à
  `horloge.maintenant()`, le résultat doit porter `accesAutorise: true` et `redirection: null`
  (aucune invitation à ressaisir les identifiants).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le rafraîchissement F5 / la navigation inter-pages sont modélisés comme un nouvel appel au même
  guard de route avec la session existante encore valide, plutôt que par un test de rendu de
  composant (le projet « admin » tourne en environnement `node`, sans DOM).
- Le concept de session actif/valide reste le port d'infrastructure `SessionAdministrateur`
  introduit en CASE-ADMIN-033 (absent de `docs/uml/domain.puml`), réutilisé ici à l'identique.
