# Run — CASE-ADMIN-068

**Fichier de test :** tests/tests-unitaires/admin/case-admin-068.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-068.test.ts
- tests/cases/admin/CASE-ADMIN-068.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-068.test.ts -t "test_CASE_ADMIN_068_cloisonnement_securite_interdiction_acces_configuration_creneaux_public"

**Résultat de vérification :** rouge attendu — `Cannot find module '../../../src/actions/configurer-creneau.action'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/configurer-creneau.action.ts` — orchestration : `configurerCreneau(input: { creneauId: string; commande: 'FERMER' | 'ROUVRIR' | 'AFFECTER_ACTIVITE' | 'AFFECTER_NAVIRES' }, contexteAcces: ContexteAcces, ports: { depotCreneaux: DepotCreneaux }): { accepte: true; creneau: Creneau } | { accepte: false; codeHttp: 401 | 403 }`. Porte d'entrée unique de mutation de configuration de créneau (matérialisant l'« endpoint » `/api/admin/slots/configure` du CASE sous forme de Server Action gardée, conformément à l'arborescence imposée qui ne prévoit pas de dossier `app/` pour ce lot).
- `src/services/server/slots/` — accueillera, en interne à cette action-passerelle, la vérification d'autorisation avant délégation aux règles métier (fermeture/réouverture/affectation) déjà couvertes par CASE-ADMIN-062 à 067.
- `src/schemas/types/slots-ports.types.ts` — port `ContexteAcces { endpoint: string; estAdministrateurAuthentifie: boolean }` et port `DepotCreneaux`.
- `src/schemas/types/slots.types.ts` — type `Creneau` (réutilisé, sans extension).
- `src/schemas/validation/slots/` — schéma Zod de validation de la commande entrante, exécuté **après** le contrôle d'autorisation (rejet 401/403 avant toute validation métier).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le CASE décrit un « endpoint » REST (`/api/admin/slots/configure`) recevant des requêtes POST/PUT/DELETE. La consigne de mapping imposée pour ce lot (062-068) ne retient que `src/actions/`, `src/services/server/slots/` et `src/schemas/validation/slots/` — sans dossier `src/app/api/...`. J'ai donc modélisé l'« endpoint » comme une Server Action-passerelle gardée par un contexte d'accès explicite (`ContexteAcces`), plutôt que comme un handler de route Next.js. Ce choix est une hypothèse d'implémentation à confirmer avec l'équipe (une route API Next.js pourrait aussi déléguer directement à cette même action gardée).
- La ligne « Quand » du gherkin énumère trois verbes HTTP (POST, PUT, DELETE) sans détail par verbe dans la section « Données » ; un seul appel représentatif (`commande: 'FERMER'`) est exercé, conformément à la règle « une assertion par ligne Alors/Et » (2 lignes, donc 2 assertions, indépendamment du nombre de verbes cités en mise en situation).
- Le code HTTP attendu est vérifié par appartenance à l'ensemble `{401, 403}` (le CASE autorise explicitement l'un ou l'autre : « 401 Unauthorized ou 403 Forbidden »).
