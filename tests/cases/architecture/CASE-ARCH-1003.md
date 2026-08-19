# CASE-ARCH-1003 — Règle de mono-composant React par fichier .tsx/.jsx

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-2`, `Scénario 2`, `Cas limite #3`, `Portée §3, §4`, `Règle §2`, `REQ-ARCH-001`  
**Type :** conformité statique / architecture  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'atomicité et la clarté de l'arborescence UI en imposant qu'un fichier `.tsx` / `.jsx` ne contienne qu'une et une seule fonction / composant React. Il garantit que cette fonction unique n'est pas bridée par une limite de 30 lignes (évitant le sur-découpage artificiel du JSX), tout en interdisant formellement la déclaration de sous-composants ou composants secondaires dans le même fichier.

## Cas

```gherkin
Étant donné un fichier « src/components/domain/booking-card.tsx »
Et une seule fonction de composant « BookingCard » déclarée dans le fichier
Quand l'analyseur de conformité AST est exécuté
Alors le composant est accepté quelle que soit sa longueur interne dès lors que le fichier compte <= 500 lignes
Et aucune erreur de volumétrie par fonction n'est levée
Mais si une seconde déclaration de composant React (ex. « BookingBadge ») est ajoutée dans ce même fichier
Alors le test échoue et exige l'extraction du second composant dans son propre fichier « booking-badge.tsx »
```

## Données

| Élément | Situation Conforme | Situation Non Conforme |
|---|---|---|
| Fichier source | `src/components/domain/booking-card.tsx` | `src/components/domain/booking-card.tsx` |
| Composants déclarés | `BookingCard` (unique) | `BookingCard` et `BookingBadge` |
| Longueur du composant | 85 lignes de JSX/logique UI | 40 lignes + 25 lignes |
| Statut attendu | Validé (Pass) | Rejet bloquant (Fail) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut mono-composant | Conforme | Règle §2 de SPEC-ARCH-01 |
| Volumétrie fonction React | Non plafonnée à 30 lignes | Portée §4 (plafonnée par les 500 lignes du fichier) |
| Statut multi-composants | Rejet immédiat | Cas limite #3 |

## Ce que ce cas ne vérifie pas

- la limitation globale de 500 lignes du fichier `.tsx` (couvert par `CASE-ARCH-1004`) ;
- la déclaration de helpers utilitaires non exportés dans le fichier `.tsx` (couvert par `CASE-ARCH-1022`) ;
- le nommage des fichiers en `kebab-case` (couvert par `CASE-ARCH-1008`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1003_mono_composant_react_par_fichier_tsx_jsx`  
**Fichier :** [CASE-ARCH-1003.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1003.test.ts)

## Revue du test automatisé

- [x] Le test vérifie qu'un composant `.tsx` de plus de 30 lignes sans dérogation est accepté s'il est unique dans son fichier.
- [x] Le test vérifie qu'un fichier `.tsx` contenant 2 composants React est rejeté avec une erreur explicite.
- [x] Le nom du test contient `CASE_ARCH_1003`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
