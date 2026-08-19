# CASE-ARCH-1020 — Encapsulation stricte de src/actions/ réservée à src/components/ et src/app/

**Spécification :** `SPEC-ARCH-02`  
**Critère d'acceptation :** `AC-11`, `Matrice d'import`, `Rôle actions/`, `REQ-ARCH-002`  
**Type :** architecture / conformité des imports  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'encapsulation des mutations backend Next.js (`src/actions/`, annotées `'use server'`). Ces Server Actions ont pour finalité exclusive d'être déclenchées par l'interface utilisateur (`src/components/`, ex. formulaires ou gestionnaires d'événements) ou orchestrées par les pages serveur (`src/app/`). Il est formellement interdit de les importer depuis les couches d'infrastructure ou de logique pure (`src/services/`, `src/lib/`, `src/utils/`, `src/schemas/` ou `src/hooks/`).

## Cas

```gherkin
Étant donné les Server Actions sous « src/actions/ » (ex. « src/actions/booking.actions.ts »)
Quand l'analyseur de dépendances inspecte l'ensemble des modules important « src/actions/ »
Alors « src/actions/ » est exclusivement importé par « src/components/ » et « src/app/ »
Et toute importation de Server Actions dans « src/services/ », « src/lib/ », « src/utils/ », « src/schemas/ » ou « src/hooks/ » est rejetée avec erreur bloquante
```

## Données

| Module | Consommateurs autorisés | Consommateurs formellement interdits |
|---|---|---|
| `src/actions/` | **`src/components/`**, **`src/app/`** | `services/`, `lib/`, `utils/`, `schemas/`, `config/`, `hooks/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Import de `src/actions/` par `src/components/` | Autorisé | Déclenchement formulaire / interaction UI |
| Import de `src/actions/` par `src/app/` | Autorisé | Orchestration Server Components |
| Import de `src/actions/` par `src/services/` | Rejet bloquant | Inversion de dépendance interdite |
| Import de `src/actions/` par `src/utils/` | Rejet bloquant | Socle bas pur |

## Ce que ce cas ne vérifie pas

- les imports de `src/services/` par `actions/` (autorisés selon la matrice) ;
- les imports de `src/env/server.ts` par `actions/` (couvert par `CASE-ARCH-1013`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1020_encapsulation_stricte_actions_reserves_components_et_app`  
**Fichier :** [CASE-ARCH-1020.test.ts](../../tests-unitaires/architecture/spec-arch-02/CASE-ARCH-1020.test.ts)

## Revue du test automatisé

- [x] Le test liste l'ensemble des fichiers important des modules de `src/actions/`.
- [x] Le test s'assure que chaque fichier appartient à `src/components/` ou `src/app/`.
- [x] Le test échoue si un service sous `src/services/` importe une Server Action.
- [x] Le nom du test contient `CASE_ARCH_1020`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
