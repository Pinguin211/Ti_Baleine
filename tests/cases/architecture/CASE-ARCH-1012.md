# CASE-ARCH-1012 — Autorisation et restriction des imports de src/env/client.ts

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-3`, `Matrice d'import`, `Scénarios 3 et 5`, `Cas limite #5`, `REQ-ARCH-002`  
**Type :** architecture / conformité des imports  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'encapsulation des variables d'environnement publiques (`NEXT_PUBLIC_*`). Il s'assure que le module `src/env/client.ts` n'est importé que par les couches habilitées (`src/services/`, `src/lib/`, `src/hooks/`, `src/actions/`, `src/app/` et `src/env/server.ts`), et qu'il n'est jamais importé directement par les composants purs (`src/components/`), les schémas (`src/schemas/`), les utilitaires (`src/utils/`) ou la configuration statique (`src/config/`).

## Cas

```gherkin
Étant donné le module « src/env/client.ts »
Quand l'analyseur de conformité des dépendances cartographie ses consommateurs
Alors « src/env/client.ts » est importé exclusivement par « src/services/ », « src/lib/ », « src/hooks/ », « src/actions/ », « src/app/ » et « src/env/server.ts »
Et toute importation directe de « src/env/client.ts » dans « src/components/ », « src/schemas/ », « src/utils/ » ou « src/config/ » est immédiatement rejetée
```

## Données

| Module | Consommateurs autorisés | Consommateurs formellement interdits |
|---|---|---|
| `src/env/client.ts` | `services/`, `lib/`, `hooks/`, `actions/`, `app/`, `env/server.ts` | `components/`, `schemas/`, `utils/`, `config/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import par un hook React (`src/hooks/`) | Autorisé | Scénario 3 de SPEC-ARCH-02 |
| Import par une Server Action (`src/actions/`) | Autorisé | Matrice d'importation |
| Import direct par un composant (`src/components/`) | Rejet bloquant | Cas limite #5 de SPEC-ARCH-02 |
| Import direct par un schéma (`src/schemas/`) | Rejet bloquant | AC-2 et Isomorphisme |

## Ce que ce cas ne vérifie pas

- l'isolation de `src/env/server.ts` (couvert par `CASE-ARCH-1013`) ;
- l'étanchéité `server-only` (couvert par `CASE-ARCH-1016`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1012_perimetre_autorise_imports_env_client`  
**Fichier :** [CASE-ARCH-1012.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1012.test.ts)

## Revue du test automatisé

- [x] Le test liste tous les fichiers du projet important `src/env/client.ts`.
- [x] Le test vérifie que chaque consommateur appartient à la liste blanche (`services/`, `lib/`, `hooks/`, `actions/`, `app/`, `env/server.ts`).
- [x] Le test simule un import de `env/client.ts` dans un composant UI et vérifie le rejet.
- [x] Le nom du test contient `CASE_ARCH_1012`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
