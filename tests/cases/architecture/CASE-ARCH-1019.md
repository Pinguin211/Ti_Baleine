# CASE-ARCH-1019 — Encapsulation stricte de src/hooks/ réservée exclusivement à src/components/

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-10`, `Matrice d'import`, `Rôle hooks/`, `REQ-ARCH-002`  
**Type :** architecture / conformité des imports  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'encapsulation de la logique d'état React (`src/hooks/`). Les hooks étant intrinsèquement liés au cycle de vie des composants React côté client, ils ont pour consommateur exclusif le dossier `src/components/`. Il est formellement interdit d'importer des hooks dans des modules backend ou utilitaires purs (`src/services/`, `src/actions/`, `src/utils/`, `src/schemas/`, `src/config/` ou `src/app/`).

## Cas

```gherkin
Étant donné les hooks React personnalisés situés sous « src/hooks/ »
Quand l'analyseur de conformité cartographie l'ensemble des fichiers important « src/hooks/ »
Alors 100 % des consommateurs de « src/hooks/ » sont situés sous « src/components/ »
Et toute tentative d'importer un hook dans « src/services/ », « src/actions/ », « src/utils/ » ou « src/app/ » est immédiatement rejetée
```

## Données

| Module | Consommateurs autorisés | Consommateurs formellement interdits |
|---|---|---|
| `src/hooks/` | **`src/components/` uniquement** | `services/`, `actions/`, `utils/`, `schemas/`, `config/`, `app/`, `lib/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import de `src/hooks/` par `src/components/` | Autorisé | Matrice d'importation (colonne « Qui peut importer ») |
| Import de `src/hooks/` par `src/services/` | Rejet bloquant | Règle d'encapsulation des hooks |
| Import de `src/hooks/` par `src/actions/` | Rejet bloquant | Règle d'encapsulation des hooks |
| Import de `src/hooks/` par `src/app/` (Server Component) | Rejet bloquant | Cas limite #6 de SPEC-ARCH-02 |

## Ce que ce cas ne vérifie pas

- les imports de `env/client.ts` par les hooks (couvert par `CASE-ARCH-1012`) ;
- l'interdiction de `env/server.ts` dans les hooks (couvert par `CASE-ARCH-1013`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1019_encapsulation_stricte_hooks_reserves_exclusivement_components`  
**Fichier :** [CASE-ARCH-1019.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1019.test.ts)

## Revue du test automatisé

- [x] Le test liste tous les fichiers du projet important des modules de `src/hooks/`.
- [x] Le test vérifie que chaque fichier consommateur est localisé sous `src/components/`.
- [x] Le test simule un import d'un hook dans un fichier de `src/services/` et s'assure du rejet.
- [x] Le nom du test contient `CASE_ARCH_1019`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
