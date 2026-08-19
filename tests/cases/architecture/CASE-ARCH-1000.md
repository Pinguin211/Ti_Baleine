# CASE-ARCH-1000 — Plafonnement strict des fonctions à 30 lignes utiles dans les fichiers .ts et .js

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-1`, `Scénario 1`, `Portée §1, §2`, `Règle §1`, `REQ-ARCH-001`, `ADR-001`  
**Type :** conformité statique / architecture  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la concision, la lisibilité et la maintenabilité du code métier et utilitaire écrit en TypeScript / JavaScript standard (`.ts`, `.js`). Il garantit que chaque fonction ou méthode est limitée à un maximum strict de 30 lignes utiles exécutables (hors imports, déclarations de types purs, commentaires/TSDoc et lignes blanches), évitant l'apparition de fonctions monolithiques complexes et difficiles à tester unitairement.

## Cas

```gherkin
Étant donné un fichier source « src/services/server/pricing.service.ts »
Et plusieurs fonctions TypeScript déclarées dans ce fichier
Quand l'analyseur de conformité et de volumétrie AST est exécuté
Alors chaque fonction ou méthode compte au maximum 30 lignes utiles
Et les blocs d'imports, déclarations de types purs, commentaires TSDoc et lignes blanches ne sont pas comptabilisés
Et aucune erreur de dépassement de volumétrie n'est levée
```

## Données

| Élément | Valeur |
|---|---:|
| Fichier testé | `src/services/server/pricing.service.ts` |
| Nature du fichier | TypeScript standard (`.ts`) |
| Nombre de fonctions déclarées | $\ge 1$ |
| Lignes utiles par fonction | $\le 30$ lignes utiles |
| Éléments exclus du comptage | imports, types, interfaces, commentaires, lignes blanches |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut de conformité | Conforme (Pass) | Chaque fonction $\le 30$ lignes utiles |
| Nombre d'erreurs de volumétrie | 0 | Règle §1 de SPEC-ARCH-01 |
| Plafond global du fichier | $\le 500$ lignes | Règle §3 de SPEC-ARCH-01 |

## Ce que ce cas ne vérifie pas

- le comportement en cas de dépassement sans dérogation (couvert par `CASE-ARCH-1001`) ;
- la gestion des dérogations TSDoc `@need_more_lines` (couvert par `CASE-ARCH-1002`) ;
- la volumétrie des composants React dans les fichiers `.tsx` (couvert par `CASE-ARCH-1003`) ;
- le respect des conventions de nommage (couvert par `CASE-ARCH-1007` à `CASE-ARCH-1009`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1000_plafonnement_fonctions_30_lignes_utiles_ts_js`  
**Fichier :** [CASE-ARCH-1000.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1000.test.ts)

## Revue du test automatisé

- [x] Le test analyse l'arbre syntaxique abstrait (AST) des fichiers `.ts` et `.js`.
- [x] Le test exclut formellement les imports, types, commentaires et lignes blanches du décompte.
- [x] Le test valide qu'une fonction de 30 lignes utiles ou moins passe avec succès.
- [x] Le test échoue si une fonction non dérogée dépasse 30 lignes utiles.
- [x] Le nom du test contient `CASE_ARCH_1000`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
