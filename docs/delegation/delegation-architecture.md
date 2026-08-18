# Plan de délégation — `SPEC-ARCH-01` à `SPEC-ARCH-03`

**Écrit avant de confier la première tâche à l'agent.** C'est une prévision, pas un
compte rendu. Écrit après coup, il ne vaut rien : on ne se souvient que de ce qui a
marché, et l'historique du dépôt est daté.

---

## Avant — le découpage

| # | Tâche | Test qui doit passer au vert | Ce que l'agent reçoit | Ce qu'il ne touche pas |
|---|---|---|---|---|
| 1 | Analyseur AST de volumétrie du code et gestion des dérogations TSDoc (contrôle du plafonnement strict à 30 lignes utiles par fonction/méthode dans les fichiers `.ts` et `.js` hors imports/types/commentaires/lignes blanches, détection et validation des dérogations `@need_more_lines - "motif explicite"` précédant directement la signature, plafonnement global de tout fichier source à 500 lignes maximum, validation de l'en-tête strict pour les dérogations de fichiers > 500 lignes et rejet en cas de positionnement incorrect, contrôle de la déclaration obligatoire de la balise personnalisée `@need_more_lines` dans le fichier `tsdoc.json` à la racine) | `CASE-ARCH-1000`, `CASE-ARCH-1001`, `CASE-ARCH-1002`, `CASE-ARCH-1004`, `CASE-ARCH-1005`, `CASE-ARCH-1006`, `CASE-ARCH-1021` | `specs/architecture.md`, `tests/cases/architecture/CASE-ARCH-1000.md`, `CASE-ARCH-1001.md`, `CASE-ARCH-1002.md`, `CASE-ARCH-1004.md`, `CASE-ARCH-1005.md`, `CASE-ARCH-1006.md`, `CASE-ARCH-1021.md`, `tsdoc.json`, `tools/arch/` | - |
| 2 | Contrôle de l'atomicité et de la composition des composants React dans les fichiers JSX (application de la règle stricte du mono-composant React par fichier `.tsx`/`.jsx` sans limitation de lignes internes pour l'unique composant JSX dès lors que le fichier reste <= 500 lignes, rejet immédiat en cas de déclaration de multi-composants dans le même fichier, interdiction formelle et rejet des sous-fonctions utilitaires / helpers locaux non-React même non exportés dans les fichiers `.tsx` avec obligation d'extraction vers `src/utils/`) | `CASE-ARCH-1003`, `CASE-ARCH-1022` | `specs/architecture.md`, `tests/cases/architecture/CASE-ARCH-1003.md`, `CASE-ARCH-1022.md`, `tools/arch/`, `src/components/` | - |
| 3 | Linter et validateur des conventions de nommage standardisées (contrôle du respect de `camelCase` pour variables, propriétés, instances, fonctions, méthodes et hooks ; contrôle de `PascalCase` pour types, interfaces, classes, enums et composants React ; contrôle de `UPPER_SNAKE_CASE` pour constantes globales et variables d'environnement ; contrôle strict de la casse `kebab-case` pour tous les fichiers sources `.ts` et `.tsx` et pour l'intégralité de l'arborescence des dossiers et routes sous `src/`) | `CASE-ARCH-1007`, `CASE-ARCH-1008`, `CASE-ARCH-1009` | `specs/architecture.md`, `tests/cases/architecture/CASE-ARCH-1007.md`, `CASE-ARCH-1008.md`, `CASE-ARCH-1009.md`, `tools/arch/` | - |
| 4 | Vérificateur de la hiérarchie du socle bas et de l'isomorphisme de la couche de validation (isolation stricte du dossier `src/config/` interdisant tout import interne et réservé aux dépendances `node_modules`, ordonnancement strict autorisant `src/utils/` à n'importer que `src/config/`, et `src/schemas/` à n'importer que `src/config/` et `src/utils/`, interdiction formelle pour `src/schemas/` d'importer `src/env/` avec obligation d'appliquer le pattern factory dynamique pour tout schéma dépendant de l'environnement) | `CASE-ARCH-1010`, `CASE-ARCH-1011` | `specs/architecture.md`, `tests/cases/architecture/CASE-ARCH-1010.md`, `CASE-ARCH-1011.md`, `src/config/`, `src/utils/`, `src/schemas/` | - |
| 5 | Contrôle de l'isolation des variables d'environnement et de l'étanchéité stricte `server-only` (encapsulation de `src/env/client.ts` autorisé uniquement pour `services/`, `lib/`, `hooks/`, `actions/`, `app/` et `env/server.ts` et interdit pour `components/`, `schemas/`, `utils/`, `config/` ; restriction stricte de `src/env/server.ts` aux modules serveur privés `services/server/`, `lib/server/`, `actions/`, `app/` avec interdiction absolue pour `hooks/` et le client ; étanchéité totale interdisant tout import de `*/server/` ou `src/env/server.ts` dans les composants annotés `"use client"` ou les sous-dossiers `client/`) | `CASE-ARCH-1012`, `CASE-ARCH-1013`, `CASE-ARCH-1016` | `specs/architecture.md`, `tests/cases/architecture/CASE-ARCH-1012.md`, `CASE-ARCH-1013.md`, `CASE-ARCH-1016.md`, `src/env/`, `src/hooks/`, `src/services/`, `src/components/` | - |
| 6 | Analyseur du graphe de dépendances, encapsulation des couches et détection des cycles d'imports (encapsulation stricte de `src/lib/` réservé exclusivement à `src/services/`, validation du périmètre d'import de `src/app/` autorisant `components/`, `services/server/`, `actions/`, `schemas/`, `env/` et interdisant les accès directs à `lib/` et `hooks/`, interdiction formelle pour la couche UI `src/components/` d'importer directement `src/services/`, encapsulation exclusive de `src/hooks/` réservé à `src/components/`, encapsulation de `src/actions/` réservé à `src/components/` et `src/app/`, détection et échec bloquant sur tout cycle de dépendance circulaire dans le projet) | `CASE-ARCH-1014`, `CASE-ARCH-1015`, `CASE-ARCH-1017`, `CASE-ARCH-1018`, `CASE-ARCH-1019`, `CASE-ARCH-1020` | `specs/architecture.md`, `tests/cases/architecture/CASE-ARCH-1014.md` à `CASE-ARCH-1015.md`, `CASE-ARCH-1017.md` à `CASE-ARCH-1020.md`, `src/` | - |
| 7 | Générateur automatisé et structuration du rapport Markdown d'audit de conformité architecturale (production systématique du rapport `reports/arch-compliance-report.md` à chaque exécution des tests avec création automatique du dossier cible, calcul du tableau de synthèse chiffré par spécification `SPEC-ARCH-01` et `SPEC-ARCH-02`, répertoire unitaire et exhaustif de 100 % des fichiers non conformes précisant le chemin relatif, le numéro de ligne exact, la spécification, le cas de test `CASE-ARCH-xxxx` et le motif détaillé, génération d'un rapport nominal valide avec statut explicite « CONFORME » en l'absence de violation, et support pour injection dans `$GITHUB_STEP_SUMMARY`) | `CASE-ARCH-1023`, `CASE-ARCH-1024`, `CASE-ARCH-1025`, `CASE-ARCH-1026`, `CASE-ARCH-1027` | `specs/architecture.md`, `tests/cases/architecture/CASE-ARCH-1023.md` à `CASE-ARCH-1027.md`, `reports/`, `tools/arch/` | - |

**Colonne 3.** Un identifiant `CASE`, pas une phrase. Si vous ne savez pas quel test
va changer d'état, la tâche est mal découpée — c'est le repère du module 07.

**Colonne 4.** Ce que l'agent reçoit : les fichiers, les spécifications, les cas de
test. Pas le dépôt entier.

**Colonne 5.** Ce qu'il n'a pas à modifier. Une colonne vide veut dire que vous
n'avez pas pensé au rayon d'action — or « l'agent modifie des fichiers que vous ne
lui avez pas désignés » est le premier des trois signaux de reprise en main.

---

## Après — ce qui s'est passé

Complété au rituel de 16h15, le même jour.

| # | Résultat | Ce qui a fait reprendre la main |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |
| 7 | | |

| Résultat | Sens |
|---|---|
| `conforme` | la tâche a produit ce qui était prévu, le test attendu est passé au vert |
| `repris` | le résultat a demandé une intervention manuelle avant d'être gardé |
| `redécoupé` | la tâche a dû être scindée ou reformulée, puis relancée |
| `abandonné` | la tâche a été retirée à l'agent et faite à la main |

---

## Ce qui sera regardé

Pas le nombre de `conforme`. Ce qui se lit, c'est **l'écart entre ce que vous aviez
prévu et ce qui est arrivé, et le fait que vous l'ayez vu**.

Une équipe avec quatre `repris` qui sait dire pourquoi pilote mieux qu'une équipe
avec six `conforme` qui n'a rien observé.

C'est une des trois questions obligatoires de la présentation de J10.
