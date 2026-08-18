# CASE-ARCH-1007 — Respect des conventions de nommage du code

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-5`, `Table des conventions`, `Cas limite #6`, `REQ-ARCH-001`  
**Type :** conformité statique / linter  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'uniformité et la lisibilité du code source TypeScript / React en vérifiant que chaque symbole déclaré (variables, fonctions, hooks, types, interfaces, classes, composants React, constantes globales) respecte strictement la table des conventions de casse établie.

## Cas

```gherkin
Étant donné les symboles et identifiants déclarés dans l'ensemble du code sous « src/ »
Quand les règles d'analyse statique de casse sont exécutées
Alors les variables, propriétés et instances respectent le format « camelCase » (ex: « bookingId », « isOpen »)
Et les fonctions, méthodes et hooks respectent le format « camelCase » (ex: « calculatePrice() », « useBooking() »)
Et les classes, interfaces, types et enums respectent le format « PascalCase » (ex: « BookingService », « SlotDetails »)
Et les composants React respectent le format « PascalCase » (ex: « BookingSummary() »)
Et les constantes globales d'environnement respectent le format « UPPER_SNAKE_CASE » (ex: « MAX_CAPACITY_ST_LEU »)
Et toute déviation de casse (ex. fonction en PascalCase, variable en snake_case) est rejetée
```

## Données

| Catégorie de symbole | Convention exigée | Exemples conformes | Exemples rejetés |
|---|---|---|---|
| Variables & propriétés | `camelCase` | `bookingId`, `passengerCount` | `BookingId`, `booking_id` |
| Fonctions & hooks | `camelCase` | `calculatePrice()`, `useBooking()` | `CalculatePrice()`, `use_booking()` |
| Types, Interfaces, Enums | `PascalCase` | `BookingStatus`, `SlotDetails` | `bookingStatus`, `booking_status` |
| Composants React | `PascalCase` | `BookingSummary`, `AdminHeader` | `bookingSummary`, `booking_summary` |
| Constantes globales | `UPPER_SNAKE_CASE` | `MAX_CAPACITY_ST_LEU` | `maxCapacityStLeu`, `MaxCapacity` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut des symboles conformes | Validé (Pass) | Table des conventions de SPEC-ARCH-01 |
| Statut des anomalies de casse | Rejet (Fail) | Cas limite #6 de SPEC-ARCH-01 |

## Ce que ce cas ne vérifie pas

- le nommage des fichiers sources (couvert par `CASE-ARCH-1008`) ;
- le nommage des répertoires (couvert par `CASE-ARCH-1009`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1007_respect_conventions_nommage_symboles_code`  
**Fichier :** [CASE-ARCH-1007.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1007.test.ts)

## Revue du test automatisé

- [x] Le test vérifie la casse des variables, fonctions, types et composants via ESLint ou l'AST.
- [x] Le test rejette les fonctions nommées en PascalCase ou snake_case.
- [x] Le test rejette les types et composants nommés en camelCase.
- [x] Le nom du test contient `CASE_ARCH_1007`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
