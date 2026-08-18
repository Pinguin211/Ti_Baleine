# Spécifications — Architecture & Qualité Technique

**Domaine :** `ARCH`

---

## Sommaire

| Réf. Spécification | Intitulé | Périmètre & Objectif |
|---|---|---|
| **`SPEC-ARCH-01`** | **Règles de codage, volumétrie et conventions de nommage** | Limite de 30 lignes utiles/fonction dans les fichiers `.ts`/`.js`, règle de mono-composant sans limite de lignes internes dans les fichiers `.tsx`/`.jsx`, plafond global de 500 lignes/fichier, dérogations TSDoc `@need_more_lines` et conventions de nommage. |
| **`SPEC-ARCH-02`** | **Arborescence modulaire, étanchéité Server/Client et flux strict des dépendances** | Organisation sous `src/`, hiérarchie transversale (`config/` $\rightarrow$ `utils/` $\rightarrow$ `schemas/`), isolation de `env/`, capacités de data-fetching de `app/`, étanchéité `server-only` et matrice stricte d'imports unidirectionnels. |

---

## SPEC-ARCH-01 — Règles de codage, volumétrie et conventions de nommage

**Exigence :** ADR-001, REQ-ARCH-001
**Statut :** proposé
**Version :** v2

### Règle

> Le code source du projet applique des règles de volumétrie et de composition différenciées selon la nature des fichiers :
> 1. **Fichiers TypeScript / JavaScript standards (`.ts`, `.js`) :** Chaque fonction / méthode est limitée à un maximum strict de **30 lignes utiles**, sauf dérogation motivée via `@need_more_lines`. Le nombre de fonctions par fichier n'est pas limité.
> 2. **Fichiers React / JSX (`.tsx`, `.jsx`) :** Chaque fichier est strictement limité à **une seule fonction / composant React par fichier** (interdiction de déclarer des sous-composants dans le même fichier). Aucune limite de lignes n'est imposée à cette unique fonction de composant.
> 3. **Plafond global de fichier :** Tout fichier source (`.ts`, `.tsx`, `.js`, `.jsx`) ne doit pas dépasser **500 lignes au total**, sauf dérogation d'en-tête.

### Portée

- Couvre le plafonnement de chaque fonction / méthode dans les fichiers `.ts` et `.js` à **30 lignes utiles maximum**.
- Définit formellement les **« lignes utiles »** (pour les fichiers `.ts`/`.js`) : code effectif exécutable, excluant les blocs d'imports, les déclarations de types/interfaces purs, les commentaires/TSDoc et les lignes blanches.
- Couvre l'obligation de **mono-composant par fichier `.tsx` / `.jsx`** : un fichier de composant ne déclare et n'exporte qu'un seul composant React principal. Les sous-composants ou éléments secondaires doivent être extraits dans leurs propres fichiers.
- Couvre l'absence de restriction de lignes pour la fonction unique du composant `.tsx`/`.jsx` (plafonnée uniquement par la limite globale du fichier).
- Couvre le plafonnement de la taille de chaque fichier source à **500 lignes maximum**.
- Couvre la gestion des dérogations exceptionnelles via le tag TSDoc `@need_more_lines - "motif explicite"` :
    - Pour une fonction `.ts` : documenté dans le bloc TSDoc précédant directement la signature.
    - Pour un fichier : documenté dans le bloc TSDoc d'en-tête (tout en haut du fichier).
- Couvre l'obligation de déclarer le tag personnalisé `@need_more_lines` dans la configuration `tsdoc.json`.
- Couvre l'application des conventions de nommage standardisées pour TypeScript et Next.js (App Router).

---

### Conventions de nommage retenues (Next.js / TypeScript)

| Élément | Convention | Format / Exemple |
|---|---|---|
| **Variables, propriétés, instances** | `camelCase` | `bookingId`, `passengerCount`, `isOpen` |
| **Fonctions, méthodes, hooks** | `camelCase` | `calculatePrice()`, `useBooking()` |
| **Classes, Interfaces, Types, Enums** | `PascalCase` | `BookingService`, `SlotDetails`, `BookingStatus` |
| **Composants React** | `PascalCase` | `BookingSummary()`, `AdminHeader()` |
| **Constantes globales / d'environnement** | `UPPER_SNAKE_CASE` | `MAX_CAPACITY_ST_LEU`, `DEFAULT_LOCALE` |
| **Fichiers de composants & pages** | `kebab-case.tsx` | `booking-form.tsx`, `page.tsx`, `layout.tsx` |
| **Fichiers utilitaires, types & services** | `kebab-case.ts` | `pricing-rules.ts`, `slot.service.ts` |
| **Dossiers (routes & modules)** | `kebab-case` | `src/app/admin/`, `src/components/ui/`, `src/env/` |

---

### Scénarios nominaux

```gherkin
Scénario : Validation d'une fonction utilitaire ou de service dans un fichier .ts
  Étant donné un fichier « src/services/server/pricing.service.ts »
  Et plusieurs fonctions TypeScript déclarées dans ce même fichier
  Quand le test de conformité de code est exécuté
  Alors chaque fonction compte au maximum 30 lignes utiles
  Et le fichier complet compte au maximum 500 lignes
  Et son nommage respecte strictement la convention camelCase

Scénario : Validation d'un composant React dans un fichier .tsx
  Étant donné un fichier « src/components/domain/booking-card.tsx »
  Et une seule fonction de composant « BookingCard » déclarée dans le fichier
  Quand le test de conformité est exécuté
  Alors le composant est accepté quelle que soit sa longueur interne dès lors que le fichier compte <= 500 lignes
  Et aucune erreur de volumétrie par fonction n'est levée

Scénario : Dérogation exceptionnelle de taille sur une fonction .ts avec tag TSDoc
  Étant donné une fonction complexe de 45 lignes dans un fichier .ts
  Et un bloc TSDoc contenant « @need_more_lines - "Calcul tarifaire matriciel non fractionnable" »
  Quand le test de conformité est exécuté
  Alors la fonction est validée avec succès

Scénario : Dérogation exceptionnelle sur un fichier dépassant 500 lignes
  Étant donné un fichier de schéma Zod complexe comportant 620 lignes
  Et un bloc TSDoc situé tout en haut du fichier avec « @need_more_lines - "Schéma consolidé des réservations" »
  Quand le test de conformité est exécuté
  Alors le fichier est validé avec succès
```

---

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Fonction dans un fichier `.ts` > 30 lignes utiles sans `@need_more_lines` | **Rejet / Échec du test :** obligation de découper la fonction ou de documenter la dérogation avec motif. |
| 2 | Fonction dans un fichier `.ts` > 30 lignes avec `@need_more_lines` sans motif textuel | **Rejet / Échec du test :** le motif explicite de dérogation est obligatoire. |
| 3 | Fichier `.tsx` contenant 2 déclarations de composants React (ex. `BookingCard` + `BookingBadge`) | **Rejet / Échec du test :** un fichier `.tsx` ne doit contenir qu'une seule fonction / composant React. Le second composant doit être extrait dans son propre fichier. |
| 4 | Fichier (`.ts` ou `.tsx`) > 500 lignes sans balise `@need_more_lines` en en-tête | **Rejet / Échec du test :** obligation de découper le fichier. |
| 5 | Tag `@need_more_lines` utilisé dans le code mais absent du fichier `tsdoc.json` | **Rejet / Échec du linter TSDoc :** le tag doit être formellement déclaré comme balise personnalisée. |
| 6 | Non-respect de la casse (ex. fonction en `PascalCase`, variable en `snake_case`, fichier en `CamelCase.ts`) | **Rejet / Échec du linter :** non-conformité aux conventions de nommage. |

---

### Ce qui n'est pas défini

- *18/08/2026* — Choix précis de l'outil d'automatisation AST (script Vitest personnalisé avec `ts-morph` vs règles ESLint custom).

---

### Critères d'acceptation

- [ ] AC-1 — 100 % des fonctions des fichiers `.ts` et `.js` comptent $\le 30$ lignes utiles ou disposent d'un flag TSDoc `@need_more_lines - "motif"` valide (`CASE-ARCH-001`, `CASE-ARCH-002`, `CASE-ARCH-003`).
- [ ] AC-2 — 100 % des fichiers `.tsx` et `.jsx` ne contiennent qu'une seule fonction / composant par fichier (`CASE-ARCH-004`).
- [ ] AC-3 — 100 % des fichiers (`.ts`, `.tsx`, `.js`, `.jsx`) comptent $\le 500$ lignes au total ou disposent d'un flag TSDoc d'en-tête `@need_more_lines - "motif"` valide (`CASE-ARCH-005`, `CASE-ARCH-006`).
- [ ] AC-4 — Le fichier `tsdoc.json` à la racine du projet déclare formellement la balise personnalisée `@need_more_lines` (`CASE-ARCH-007`).
- [ ] AC-5 — L'ensemble des variables, fonctions, types, classes, composants et noms de fichiers respectent la table des conventions de nommage (`CASE-ARCH-008`, `CASE-ARCH-009`, `CASE-ARCH-010`).

---

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Différencier les fichiers `.ts` (30 lignes/fonction) des fichiers `.tsx` (1 composant/fichier, sans limite de lignes par fonction) | Acceptée | Évite le sur-découpage artificiel des composants React JSX tout en conservant une modularité forte (1 composant = 1 fichier) et une concision stricte sur la logique pure (`.ts`). |
| Définir les « lignes utiles » hors imports, types et commentaires | Acceptée | Rend la règle objective et mesurable par AST sans pénaliser le typage fort et la documentation. |
| Exiger un composant unique par fichier `.tsx` | Acceptée | Garantit la cohésion atomique, la lisibilité de l'arborescence et facilite le tree-shaking / lazy loading. |

---

## SPEC-ARCH-02 — Arborescence modulaire, étanchéité Server/Client et flux strict des dépendances

**Exigence :** ADR-001, REQ-ARCH-002
**Statut :** proposé
**Version :** v2

### Règle

> Le code source sous `src/` doit respecter une arborescence modulaire stricte, un flux d'importation unidirectionnel hiérarchisé sans cycle, une isolation stricte des variables d'environnement (`env/`), et une séparation étanche entre modules client (isomorphes) et modules serveur privés (`server-only`).

---

### Structure imposée des dossiers

```text
src/
├── actions/     # Server Actions / Mutations backend Next.js ('use server')
├── app/         # Routing, Layouts & Server Pages (App Router - data-fetching initial & assemblage)
├── components/  # Couche Présentation UI (1 composant par fichier .tsx)
│   ├── ui/      # Primitives atomiques réutilisables (shadcn/ui, buttons...)
│   ├── common/  # Composants de structure partagés (Navbar, Footer, Sidebar...)
│   └── domain/  # Composants métier regroupés par domaine
├── env/         # Configuration et validation d'environnement typé via Zod
│   ├── client.ts # Variables d'environnement publiques/client (isomorphe)
│   └── server.ts # Variables serveur privées + client consolidées (serveur exclusif, 'server-only')
├── hooks/       # Logique d'état & Hooks React personnalisés (Client side)
│   ├── common/  # Hooks transverses / utilitaires (use-debounce, use-media-query...)
│   └── domain/  # Hooks liés à la logique métier (use-cart, use-auth...)
├── services/    # Logique d'accès aux données & API
│   ├── client/  # Appels HTTP navigateur / fetchers publics isomorphes
│   └── server/  # Requêtes directes DB, SDK tiers privés (serveur exclusif)
├── schemas/     # Couche Définition des Schémas Zod & Types
│   ├── validation/ # Schémas Zod (Validation runtime métier)
│   └── types/   # Types TypeScript déduits ou partagés
├── utils/       # Fonctions pures, calculs et helpers transverses
├── lib/         # Configurations d'instances et wrappers de librairies
│   ├── client/  # Wrappers client / navigateur (storage, analytics...) isomorphes
│   └── server/  # Instances backend (ORM, Auth, clients SDK...) serveur exclusif
└── config/      # Constantes globales, métadonnées statiques pures (0 import interne)
```

---

### Matrice des autorisations d'importation (Flux unidirectionnel)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        HIÉRARCHIE DU SOCLE BAS                         │
│                                                                        │
│   src/config/ (0 import interne, constantes pures)                     │
│        │                                                               │
│        ▼                                                               │
│   src/utils/  (importe config/)                                        │
│        │                                                               │
│        ├───────────────────────────────┐                               │
│        ▼                               ▼                               │
│   src/schemas/ (importe config, utils) src/env/ (importe config, utils)│
└────────────────────────────────────────────────┬───────────────────────┘
                                                 │ (réservé à services,
                                                 │  lib, hooks, actions, app)
                                                 ▼
```

| Module | Dépendances internes autorisées (Imports) | Qui peut importer ce module ? |
|---|---|---|
| **`config/`** | `node_modules` uniquement *(0 import interne — constantes pures)* | **`utils/`**, **`schemas/`**, **`env/`**, **`lib/`**, **`services/`**, **`hooks/`**, **`actions/`**, **`components/`** |
| **`utils/`** | **`config/`**, `node_modules` | **`schemas/`**, **`env/`**, **`lib/`**, **`services/`**, **`hooks/`**, **`actions/`**, **`components/`** |
| **`schemas/`** | **`config/`**, **`utils/`**, `node_modules` | **`lib/`**, **`services/`**, **`hooks/`**, **`actions/`**, **`components/`**, **`app/`** |
| **`env/`** | **`config/`**, **`utils/`**, `node_modules` *(+ `env/client.ts` pour `env/server.ts`)* | **`services/`**, **`lib/`**, **`hooks/`**, **`actions/`**, **`app/`** *(exclusivement, selon étanchéité client/server)* |
| **`lib/`** | `utils/`, `schemas/`, `config/`, `env/` *(selon client/server)*, `node_modules` | **`services/` uniquement** |
| **`services/`** | `lib/`, `utils/`, `schemas/`, `config/`, `env/` *(selon client/server)*, `node_modules` | **`actions/`**, **`hooks/`**, **`app/`** *(Server Components pour `services/server/`)* |
| **`actions/`** | `services/`, `utils/`, `schemas/`, `config/`, **`env/`**, `node_modules` | **`components/`**, **`app/`** |
| **`hooks/`** | `services/`, `utils/`, `schemas/`, `config/`, **`env/`**, `node_modules` | **`components/` uniquement** |
| **`components/`** | `hooks/`, `actions/`, `utils/`, `schemas/`, `config/`, `components/` | **`app/`**, **`components/`** |
| **`app/`** | **`components/`**, **`services/server/`**, **`actions/`**, **`env/`**, **`schemas/`** *(+ Next.js router/layouts)* | Racine de l'application (Next.js) |

---

### Règle d'étanchéité Client / Serveur & Rôle de `src/app/`

* **Sous-dossiers `client/` (`services/client/`, `lib/client/`) & module `src/env/client.ts` :** Code **isomorphe** exécutable sur le navigateur et le serveur. Seules les variables publiques (`NEXT_PUBLIC_*`) y sont exposées.
* **Sous-dossiers `server/` (`services/server/`, `lib/server/`) & module `src/env/server.ts` :** Code **strictement serveur** (accès DB, secrets, SDK privés). Tout import de ces fichiers dans un composant client (`"use client"`) ou un module client/isomorphe déclenche une erreur bloquante immédiate (`import 'server-only'`).
* **Server Actions (`src/actions/`) :** Exécutées côté serveur (`'use server'`), elles sont autorisées à importer `src/env/server.ts` (ou `src/env/client.ts`) pour accéder aux variables d'environnement backend et aux secrets de traitement.
* **Dossier `src/app/` (Next.js App Router Server Components) :**
  * Les pages et layouts (`page.tsx`, `layout.tsx`) s'exécutent côté serveur. Ils sont autorisés à appeler directement **`services/server/`** pour le data-fetching initial (SSR/RSC) et l'injection de props dans les composants ou briques `<Suspense>`, **`actions/`** (Server Actions pour orchestration ou passage aux composants/formulaires), ainsi que **`schemas/`** (typage) et **`env/`** (configuration).
  * `src/app/` a l'interdiction formelle d'importer directement **`lib/`** (qui doit rester encapsulé dans les services) et **`hooks/`** (qui appartiennent aux Client Components).

---

### Scénarios nominaux

```gherkin
Scénario : Consommation de constantes et d'utilitaires par un schéma Zod
  Étant donné un schéma de validation dans « src/schemas/validation/booking.schema.ts »
  Quand il valide les données de réservation
  Alors il peut importer des constantes depuis « src/config/pricing.constants.ts »
  Et il peut importer des fonctions de validation depuis « src/utils/date-formatter.ts »

Scénario : Data-fetching serveur direct et utilisation d'actions dans une page Next.js App Router
  Étant donné un Server Component de page dans « src/app/admin/planning/page.tsx »
  Quand la page est générée côté serveur
  Alors elle peut importer « src/services/server/planning.service.ts » pour charger les créneaux
  Et elle peut importer « src/actions/planning.actions.ts » pour lier les mutations aux formulaires
  Et elle peut importer « src/schemas/types/planning.types.ts » pour typer les données
  Et elle transmet ces éléments aux composants de présentation situés dans « src/components/ »

Scénario : Consommation directe de l'environnement serveur par une Server Action
  Étant donné une Server Action dans « src/actions/auth.actions.ts »
  Quand elle authentifie un administrateur
  Alors elle peut importer « src/env/server.ts » pour vérifier les secrets ou clés de session
  Et elle peut importer « src/services/server/auth.service.ts »

Scénario : Encapsulation stricte du module env
  Étant donné le module « src/env/client.ts » ou « src/env/server.ts »
  Quand les imports du projet sont analysés
  Alors « env » n'est importé que par « src/services/ », « src/lib/ », « src/hooks/ », « src/actions/ » ou « src/app/ »
  Et n'est jamais importé directement par « src/components/ », « src/utils/ » ou « src/config/ »

Scénario : Encapsulation de la couche lib par les services
  Étant donné une instance technique dans « src/lib/server/db.ts »
  Quand elle est consommée
  Alors elle est exclusivement importée par les services situés sous « src/services/server/ »
```

---

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Un fichier `config/` tente d'importer `utils/`, `schemas/` ou tout autre module interne | **Rejet / Échec du test :** `config/` ne contient que des constantes statiques pures (0 import interne). |
| 2 | Un fichier `utils/` tente d'importer `schemas/`, `env/`, `services/` ou `lib/` | **Rejet / Échec du test :** `utils/` ne peut importer que `config/` et `node_modules`. |
| 3 | Un composant dans `components/` tente d'importer directement `env/` | **Rejet / Échec du test :** `components/` ne doit pas importer `env/` directement (passe par props, actions ou hooks). |
| 4 | Une page dans `src/app/` tente d'importer directement `lib/` ou `hooks/` | **Rejet / Échec du test :** `app/` ne doit pas court-circuiter la couche `services/` et ne peut pas utiliser de hooks React en Server Component. |
| 5 | Un composant annoté `"use client"` importe un module sous `*/server/` ou `src/env/server.ts` | **Rejet immédiat / Échec de compilation :** violation de l'étanchéité serveur (`server-only`). |
| 6 | Présence d'un import circulaire (ex. `utils` $\leftrightarrow$ `config`) | **Rejet strict :** aucun cycle de dépendance autorisé. |

---

### Ce qui n'est pas défini

- *18/08/2026* — Gestion des exceptions éventuelles pour les Server Components natifs dans `app/` nécessitant des helpers de métadonnées Next.js (`generateMetadata`).

---

### Critères d'acceptation

- [ ] AC-1 — Le dossier `src/config/` ne contient aucun import relatif pointant vers des modules internes du projet (`CASE-ARCH-011`).
- [ ] AC-2 — Le dossier `src/utils/` n'importe en interne que `src/config/`, et `src/schemas/` n'importe en interne que `src/config/` et `src/utils/` (`CASE-ARCH-012`).
- [ ] AC-3 — Le dossier `src/env/` n'est importé que par `src/services/`, `src/lib/`, `src/hooks/`, `src/actions/` et `src/app/` (`CASE-ARCH-013`).
- [ ] AC-4 — Le dossier `src/lib/` est exclusivement importé par le dossier `src/services/` (`CASE-ARCH-014`).
- [ ] AC-5 — Les fichiers sous `src/app/` n'importent aucun module interne en dehors de `src/components/`, `src/services/server/`, `src/actions/`, `src/schemas/` et `src/env/` (`CASE-ARCH-015`).
- [ ] AC-6 — Aucun fichier situé dans un sous-dossier `server/` ou `src/env/server.ts` n'est importé dans un composant client (`"use client"`) ou dans un dossier `client/` (`CASE-ARCH-016`).
- [ ] AC-7 — L'analyseur statique de graphe ne détecte aucune dépendance circulaire sur l'ensemble du projet (`CASE-ARCH-017`).

---

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Établir `config/` (0 import) $\rightarrow$ `utils/` (importe `config`) $\rightarrow$ `schemas/` (importe `config`, `utils`) | Acceptée | Fournit un socle transversal clair et modulaire permettant aux schémas Zod et utilitaires de consommer les constantes sans créer de dépendance circulaire. |
| Restreindre les imports de `env/` à `services/`, `lib/`, `hooks/`, `actions/` et `app/` | Acceptée | Permet aux mutations et orchestrations backend (`actions/`) d'accéder directement à la configuration d'environnement tout en protégeant les composants purs et utilitaires. |
| Autoriser `app/` à importer `services/server/`, `actions/`, `schemas/` et `env/` | Acceptée | Aligné sur le modèle officiel Next.js App Router (RSC) pour le fetching de données initial et l'orchestration des mutations sans sacrifier l'encapsulation de `lib/`. |