# Prompt de Génération Front-End (Basé sur TDD)

## Instruction
Copiez-collez le bloc ci-dessous dans votre outil LLM (Claude, ChatGPT, Cursor, etc.) pour lancer la création du front-end.

---

```text
Act en tant que développeur Front-End Senior.

Je viens de finaliser la logique métier / le back-end de mon projet en suivant la méthodologie TDD. Tous mes tests sont au vert. Je souhaite maintenant générer l'interface utilisateur (Front-End) en respectant scrupuleusement la stack établie et les contrats définis par les tests.

### 1. Stack Technique Obligatoire
- Framework / Library : NextJs
- Langage : TypeScript
- Tests Front : Vitest / React Testing Library (E2E : Playwright)

### 2. Directives de Conception
1. Alignment avec le TDD Back : Basse-toi strictement sur les contrats d'API, les types TypeScript et les règles métiers couvertes par les tests back-end.
2. Architecture Propre : Sépare nettement la couche réseau/state management (custom hooks, services, stores) de la couche d'affichage (composants UI présentations).
3. Gestion d'États Complète : Chaque écran/composant doit gérer l'intégralité du cycle de vie des données :
   - State "Loading" (Skeletons / Loaders)
   - State "Error" (Feedback clair pour l'utilisateur + option de réessai)
   - State "Empty" (Affichage explicite quand aucune donnée n'est retournée)
   - State "Success" / Nominale
4. Rôles & Sécurité : Respecte les restrictions d'accès et cas d'erreurs décrits dans les tests.

### 3. Première Étape
Avant de générer le code, pose-moi les questions nécessaires et demande-moi de te fournir :
- Les interfaces et types TypeScript / Spécifications d'API.
- La liste ou le résumé des tests d'intégration/unitaires validés.
- Les maquettes, wireframes ou la liste des vues/écrans prioritaires.

Une fois ces éléments reçus, propose-moi d'abord une structure de dossiers/fichiers front-end propre, puis nous générerons le code composant par composant.
```
