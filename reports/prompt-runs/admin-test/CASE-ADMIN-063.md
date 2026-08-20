# Run — CASE-ADMIN-063

**Fichier de test :** tests/tests-unitaires/admin/case-admin-063.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-063.test.ts
- tests/cases/admin/CASE-ADMIN-063.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-063.test.ts -t "test_CASE_ADMIN_063_reouverture_manuelle_exceptionnelle_creneau_ferme"

**Résultat de vérification :** rouge attendu — `Cannot find module '../../../src/actions/rouvrir-creneau.action'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/rouvrir-creneau.action.ts` — orchestration : `rouvrirCreneau(input: { creneauId: string }, ports: { depotCreneaux: DepotCreneaux }): Creneau`. Symétrique de `fermerCreneau` (CASE-ADMIN-062).
- `src/services/server/slots/creneau-disponibilite.service.ts` — `estCreneauReservable(creneau: Creneau): boolean`, réutilisé ici pour vérifier la sélectionnabilité après réouverture.
- `src/schemas/types/slots.types.ts` — type `Creneau` (réutilisé, cf. CASE-ADMIN-062).
- `src/schemas/types/slots-ports.types.ts` — port `DepotCreneaux` (réutilisé).
- `src/schemas/validation/slots/` — schéma Zod de validation de `{ creneauId }` pour la Server Action de réouverture.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Comme pour CASE-ADMIN-062, « statut OUVERT » est traduit par `estOuvert === true` (pas d'enum `statut` dans le domaine).
- Les valeurs `date`, `heureDepart`, `port`, `activite` du créneau de test ne sont pas fournies par la section « Données » du CASE (qui ne donne que « Statut initial : FERMÉ »). Elles servent uniquement de scaffolding technique neutre, sans incidence sur les assertions.
