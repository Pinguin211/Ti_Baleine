# CASE-ARCH-1011 — Hiérarchie du socle bas et isomorphisme de src/schemas/

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-2`, `Matrice d'import`, `Scénarios 1 et 2`, `Cas limite #2, #3`, `Isomorphisme`, `REQ-ARCH-002`  
**Type :** architecture / conformité des imports  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'ordonnancement strict du socle bas : `src/utils/` n'importe en interne que `src/config/`, et `src/schemas/` n'importe en interne que `src/config/` et `src/utils/`. Il protège également l'isomorphisme absolu de la couche de validation Zod (`src/schemas/`) en lui interdisant formellement d'importer `src/env/` (`client.ts` ou `server.ts`), imposant le pattern fonction factory dynamique pour toute validation dépendant de variables configurables.

## Cas

```gherkin
Étant donné un fichier utilitaire dans « src/utils/date-formatter.ts » et un schéma Zod dans « src/schemas/validation/booking.schema.ts »
Quand leurs dépendances internes sont inspectées
Alors « src/utils/ » n'importe en interne que des modules issus de « src/config/ »
Et « src/schemas/ » n'importe en interne que des modules issus de « src/config/ » et « src/utils/ »
Et aucun fichier de « src/schemas/ » n'importe « src/env/client.ts » ni « src/env/server.ts »
Et si un schéma nécessite une valeur dynamique d'environnement, il est instancié via une fonction factory dynamique par l'appelant
```

## Données

| Module source | Dépendances internes autorisées | Interdictions formelles |
|---|---|---|
| `src/utils/` | `src/config/` | `schemas/`, `env/`, `services/`, `lib/`, `actions/`, `hooks/`, `components/`, `app/` |
| `src/schemas/` | `src/config/`, `src/utils/` | `env/` (client et server), `services/`, `lib/`, `actions/`, `hooks/`, `components/`, `app/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import de `config/` par `utils/` | Autorisé | Hiérarchie socle bas |
| Import de `utils/` par `schemas/` | Autorisé | Hiérarchie socle bas |
| Import direct de `env/` par `schemas/` | Rejet bloquant | Isomorphisme strict / Cas limite #3 |
| Import de `schemas/` par `utils/` | Rejet bloquant | Cas limite #2 |

## Ce que ce cas ne vérifie pas

- l'isolation de `config/` (couvert par `CASE-ARCH-1010`) ;
- les consommateurs autorisés pour `env/client.ts` (couvert par `CASE-ARCH-1012`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1011_hierarchie_socle_bas_et_isomorphisme_schemas`  
**Fichier :** [CASE-ARCH-1011.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1011.test.ts)

## Revue du test automatisé

- [x] Le test vérifie que `src/utils/` n'importe aucun module autre que `src/config/`.
- [x] Le test vérifie que `src/schemas/` n'importe aucun module autre que `src/config/` et `src/utils/`.
- [x] Le test s'assure qu'aucun import de `src/env/` n'existe dans `src/schemas/`.
- [x] Le nom du test contient `CASE_ARCH_1011`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
