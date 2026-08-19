# CASE-ARCH-1010 — Isolation stricte du dossier src/config/

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-1`, `Matrice d'import`, `Cas limite #1`, `REQ-ARCH-002`, `ADR-001`  
**Type :** architecture / conformité des imports  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'autonomie et l'immutabilité du socle bas de l'application. Le dossier `src/config/` ne doit contenir que des constantes statiques pures et des métadonnées statiques. Il a l'interdiction formelle de comporter le moindre import interne pointant vers d'autres modules du projet (`utils/`, `schemas/`, `env/`, etc.), garantissant qu'aucune dépendance circulaire ne peut naître depuis la racine de configuration.

## Cas

```gherkin
Étant donné un fichier de configuration dans « src/config/pricing.constants.ts »
Quand l'analyseur de graphe de dépendances inspecte ses imports
Alors le fichier ne contient aucun import pointant vers « src/ » ou relatif vers un module interne
Et ses seules dépendances d'importation autorisées proviennent exclusivement de « node_modules »
Et toute tentative d'importer « utils/ », « schemas/ », « env/ » ou tout autre module interne est rejetée avec échec bloquant
```

## Données

| Module | Dépendances internes autorisées | Qui peut importer ce module ? |
|---|---|---|
| `src/config/` | `node_modules` uniquement *(0 import interne)* | `utils/`, `schemas/`, `env/`, `lib/`, `services/`, `hooks/`, `actions/`, `components/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Nombre d'imports internes dans `src/config/` | 0 | AC-1 de SPEC-ARCH-02 |
| Statut si tentative d'import de `src/utils/` | Rejet immédiat | Cas limite #1 de SPEC-ARCH-02 |
| Dépendances autorisées | `node_modules` uniquement | Matrice d'importation |

## Ce que ce cas ne vérifie pas

- les imports de la couche `utils/` (couvert par `CASE-ARCH-1011`) ;
- l'étanchéité des modules serveurs (couvert par `CASE-ARCH-1016`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1010_isolation_stricte_config_zero_import_interne`  
**Fichier :** [CASE-ARCH-1010.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1010.test.ts)

## Revue du test automatisé

- [x] Le test analyse l'ensemble des fichiers sous `src/config/`.
- [x] Le test vérifie qu'aucun import relatif (`./`, `../`) ou alias (`@/`, `src/`) vers des modules internes n'existe.
- [x] Le test simule un import de `src/utils/` dans `src/config/` et s'assure qu'il échoue.
- [x] Le nom du test contient `CASE_ARCH_1010`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
