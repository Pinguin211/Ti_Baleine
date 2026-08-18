# CASE-ARCH-1017 — Absence totale de dépendance circulaire sur le projet

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-8`, `Règle`, `Cas limite #8`, `REQ-ARCH-002`  
**Type :** architecture / graphe de dépendances  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'architecture globale contre les cycles d'importation (dépendances circulaires) qui provoquent des bugs subtils au runtime (`undefined is not a function`, modules partiellement évalués, échecs de tree-shaking). Il garantit que le graphe de dépendances complet du projet sous `src/` reste un graphe orienté acyclique (DAG) strict.

## Cas

```gherkin
Étant donné l'ensemble des fichiers TypeScript et JavaScript sous « src/ »
Quand l'analyseur statique de graphe de dépendances (ex. madge ou ts-morph) analyse les imports
Alors 0 cycle d'importation n'est détecté sur l'intégralité du projet
Et le flux unidirectionnel hiérarchisé est respecté sans aucune boucle de rétroaction (ex: utils <-> config, schemas <-> services)
```

## Données

| Élément | Valeur |
|---|---:|
| Périmètre d'analyse | Tous les modules sous `src/` |
| Nombre de cycles autorisés | 0 cycle |
| Outil d'analyse AST / Graphe | Analyseur statique (ex. Madge / ESLint plugin import) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Nombre total de dépendances circulaires | 0 | AC-8 de SPEC-ARCH-02 |
| Statut en cas de cycle détecté (ex. `utils` $\leftrightarrow$ `config`) | Échec bloquant (Fail) | Cas limite #8 de SPEC-ARCH-02 |

## Ce que ce cas ne vérifie pas

- l'isolation spécifique de `config/` (couvert par `CASE-ARCH-1010`) ;
- l'encapsulation de `lib/` (couvert par `CASE-ARCH-1014`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1017_absence_totale_dependance_circulaire_graphe_projet`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test exécute une vérification globale de cycles d'imports sur `src/`.
- [ ] Le test vérifie que la liste des dépendances circulaires retournée est vide (`length === 0`).
- [ ] Le test échoue si un cycle artificiel A -> B -> A est injecté.
- [ ] Le nom du test contient `CASE_ARCH_1017`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
