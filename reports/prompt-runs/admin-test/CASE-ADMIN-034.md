# Run — CASE-ADMIN-034

**Fichier de test :** tests/tests-unitaires/admin/case-admin-034.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-034.test.ts
- tests/cases/admin/CASE-ADMIN-034.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-034.test.ts -t "test_CASE_ADMIN_034_redirection_automatique_planning_apres_authentification"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/app/admin/login/resoudre-redirection-post-connexion.ts` (mapping "garde de route /
  redirection -> src/app/admin/") exportant
  `resoudreRedirectionPostConnexion(session: SessionAdministrateur): RedirectionPostConnexion`
  où `RedirectionPostConnexion = { destination: string; affichageImmediat: boolean }`.
- Réutilise le type `SessionAdministrateur` de `src/schemas/types/auth.types.ts` (introduit par
  CASE-ADMIN-033).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Aucune entité « redirection » n'existe dans `docs/uml/domain.puml` (concept de routage applicatif,
  hors modèle de domaine métier) : traité comme une fonction utilitaire de la couche `app/admin/`,
  pas comme une entité.
- La ligne « la vue du planning s'affiche sans étape intermédiaire superflue » est traduite par le
  champ booléen `affichageImmediat`, faute d'observable plus précis fourni par le CASE ou la spec.
- L'« URL initiale » (`/admin/login`) listée dans les Données n'est pas utilisée : le Gherkin ne
  demande de vérifier que l'URL cible et l'absence d'étape intermédiaire.
