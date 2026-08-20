# Run — CASE-ADMIN-064

**Fichier de test :** tests/tests-unitaires/admin/case-admin-064.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-064.test.ts
- tests/cases/admin/CASE-ADMIN-064.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-064.test.ts -t "test_CASE_ADMIN_064_configuration_modification_affectation_activite_creneau"

**Résultat de vérification :** rouge attendu — `Cannot find module '../../../src/actions/configurer-activite-creneau.action'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/configurer-activite-creneau.action.ts` — orchestration : `configurerActiviteCreneau(input: { creneauId: string; activite: Activite }, ports: { depotCreneaux: DepotCreneaux }): { accepte: true; creneau: Creneau } | { accepte: false; message: string }`. Type retour discriminé pour permettre la réutilisation par CASE-ADMIN-067 (conflit naturaliste), qui bloque cette même action.
- `src/services/server/slots/` — accueillera, en interne à l'action, le contrôle de conflit naturaliste (R-15, exercé par CASE-ADMIN-067) ; non sollicité pour ce cas nominal.
- `src/schemas/types/slots.types.ts` — type `Creneau.activite: Activite` (enum `BALEINES | DAUPHINS | PRIVATISATION_TIKAP | PRIVATISATION_GRAND_BLEU` conforme à `docs/uml/domain.puml`, valeur testée : `'BALEINES'` pour « Sortie Baleines »).
- `src/schemas/types/slots-ports.types.ts` — port `DepotCreneaux`.
- `src/schemas/validation/slots/` — schéma Zod de validation de `{ creneauId, activite }` (dont l'appartenance de `activite` à l'enum `Activite`).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le champ `activite` du créneau initial (« sans activité ») est modélisé par `activite: null`, alors que `docs/uml/domain.puml` déclare `Creneau.activite: Activite` sans multiplicité `[0..1]` explicite. Un état « sans activité » avant affectation est nécessaire pour ce CASE ; traité comme une valeur transitoire admissible avant configuration complète.
- « Sortie Baleines » du gherkin est mappée sur la valeur d'énumération `BALEINES` du diagramme (aucune autre correspondance possible).
