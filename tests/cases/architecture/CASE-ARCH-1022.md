# CASE-ARCH-1022 — Rejet de sous-fonctions utilitaires déclarées dans un fichier .tsx

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-2`, `Règle §2`, `Portée §3`, `REQ-ARCH-001`  
**Type :** conformité statique / modularité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la règle stricte de mono-fonction / mono-composant par fichier `.tsx` / `.jsx`. Il interdit la déclaration de sous-fonctions utilitaires, helpers de formatage ou fonctions de calcul déclarées localement (qu'elles soient exportées ou non) dans un fichier `.tsx`. De telles fonctions doivent obligatoirement être extraites dans la couche utilitaire transverse (`src/utils/`).

## Cas

```gherkin
Étant donné un fichier « src/components/domain/booking-card.tsx »
Et un composant React « BookingCard » déclaré dans ce fichier
Et une fonction auxiliaire non-React « function formatPrice(amount: number) » déclarée dans le même fichier
Quand l'analyseur de conformité AST est exécuté
Alors l'analyseur détecte la présence de 2 déclarations de fonctions dans le fichier « .tsx »
Et l'analyseur rejette le fichier avec une erreur bloquante
Et le rapport impose l'extraction de la fonction utilitaire dans un fichier sous « src/utils/ »
```

## Données

| Élément | Situation Conforme | Situation Non Conforme |
|---|---|---|
| Fichier source | `src/components/domain/booking-card.tsx` | `src/components/domain/booking-card.tsx` |
| Fonctions déclarées | `BookingCard` (composant React unique) | `BookingCard` (composant) + `formatPrice` (helper) |
| Import du helper | Importé depuis `src/utils/price-formatter.ts` | Déclaré localement dans le fichier `.tsx` |
| Statut attendu | Validé (Pass) | Rejet bloquant (Fail) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Nombre maximum de fonctions par `.tsx` | 1 fonction (le composant React) | Règle §2 de SPEC-ARCH-01 |
| Statut si fonction helper interne présente | Rejet bloquant | Portée §3 de SPEC-ARCH-01 |
| Emplacement exigé pour les helpers | `src/utils/` | Architecture modulaire |

## Ce que ce cas ne vérifie pas

- la présence de 2 composants React dans un `.tsx` (couvert par `CASE-ARCH-1003`) ;
- la volumétrie des fonctions dans les fichiers `.ts` (couvert par `CASE-ARCH-1000`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1022_rejet_fonctions_utilitaires_auxiliaires_fichier_tsx`  
**Fichier :** [CASE-ARCH-1022.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1022.test.ts)

## Revue du test automatisé

- [x] Le test analyse le nombre de déclarations de fonctions (`FunctionDeclaration`, `ArrowFunction` de premier niveau) dans les fichiers `.tsx`.
- [x] Le test vérifie qu'un fichier `.tsx` contenant une fonction utilitaire en plus de son composant principal est rejeté.
- [x] Le test s'assure que le composant unique reste valide si la fonction utilitaire est importée depuis `src/utils/`.
- [x] Le nom du test contient `CASE_ARCH_1022`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
