# Run — CASE-ADMIN-008

**Fichier de test :** tests/tests-unitaires/admin/case-admin-008.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-008.test.ts
- tests/cases/admin/CASE-ADMIN-008.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-008.test.ts -t "test_CASE_ADMIN_008_gestion_perte_reseau_chargement_planning_erreur_retry"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/hooks/domain/planning/use-planning-resilience.ts` (résilience réseau côté client, donc `hooks/domain/planning/`) exportant une fonction pure testable, utilisée en interne par le hook React `usePlanningResilience` :
`export async function chargerPlanningAvecGestionErreur(chargerPlanning: () => Promise<unknown>): Promise<{ messageErreur: string; reessayer: () => Promise<unknown> }>`
Le hook React lui-même (composant/état) enveloppe cette fonction ; le test cible la logique pure pour rester exécutable dans le projet Vitest `admin` (environnement `node`, sans DOM).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le projet Vitest `admin` (voir `vitest.config.ts`) s'exécute en environnement `node`, sans `jsdom` ni rendu React. On suppose donc que la logique de résilience réseau testable est extraite dans une fonction pure exportée aux côtés du hook (`chargerPlanningAvecGestionErreur`), plutôt que testée via un rendu de hook React avec `renderHook`, qui nécessiterait un DOM non disponible dans ce projet de test.
- Aucune entité `docs/uml/domain.puml` ne modélise l'état de chargement réseau ; la forme `{ messageErreur, reessayer }` est une interface de présentation déduite des deux lignes Alors/Et du CASE, pas une entité du domaine.
