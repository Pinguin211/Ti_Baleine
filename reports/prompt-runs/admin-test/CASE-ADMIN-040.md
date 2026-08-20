# Run — CASE-ADMIN-040

**Fichier de test :** tests/tests-unitaires/admin/case-admin-040.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-040.test.ts
- tests/cases/admin/CASE-ADMIN-040.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-040.test.ts -t "test_CASE_ADMIN_040_respect_contrainte_administrateur_unique_sans_sous_comptes"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/app/admin/configuration-menu-admin.ts` (mapping "garde de route / redirection ->
  src/app/admin/", élargi ici à la déclaration statique de la navigation admin) exportant
  `ELEMENTS_MENU_ADMIN: { libelle: string; route: string }[]` (manifeste des entrées de menu du
  back-office) et `ADMINISTRATEUR_UNIQUE: { profilUnique: boolean }` (marqueur de conformité C-16).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne modélise ni « Menu » ni configuration de « profil unique » : ce sont des
  éléments d'interface/de configuration applicative (pas des entités de domaine persistées). Traités
  comme un manifeste statique de navigation sous `src/app/admin/`, noté ici comme hypothèse plutôt
  qu'ajouté au diagramme de domaine.
- La détection des menus interdits repose sur une expression régulière heuristique
  (`/compte|role|utilisateur/i`) appliquée au libellé et à la route de chaque entrée ; le CASE ne
  fournit pas de liste nominative de libellés à exclure.
