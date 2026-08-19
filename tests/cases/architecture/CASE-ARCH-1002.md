# CASE-ARCH-1002 — Validation d'une dérogation de volumétrie fonctionnelle via @need_more_lines

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-1`, `Scénario 3`, `Portée §6`, `Règle §1`, `REQ-ARCH-001`  
**Type :** conformité statique / architecture  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le mécanisme de dérogation exceptionnelle encadrée pour les fonctions complexes non fractionnables (ex. calcul matriciel de tarification, algorithme métier dense). Il garantit que l'adjonction d'un bloc TSDoc valide contenant `@need_more_lines - "motif explicite"` précédant directement la signature de la fonction permet sa validation sans lever de fausse alerte.

## Cas

```gherkin
Étant donné une fonction TypeScript complexe comptant 45 lignes utiles dans un fichier « .ts »
Et un bloc TSDoc précédant directement la signature de la fonction
Et la présence dans ce bloc de la balise « @need_more_lines - "Calcul tarifaire matriciel non fractionnable" »
Quand l'analyseur de conformité AST est exécuté
Alors la fonction est validée avec succès
Et aucune erreur de volumétrie n'est levée pour cette fonction
```

## Données

| Élément | Valeur |
|---|---:|
| Fichier source | `src/services/server/pricing.service.ts` |
| Lignes utiles de la fonction | 45 lignes |
| Tag TSDoc | `@need_more_lines - "Calcul tarifaire matriciel non fractionnable"` |
| Emplacement du tag | Bloc TSDoc précédant immédiatement la déclaration de la fonction |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut de la fonction | Validée (Pass) | Scénario 3 de SPEC-ARCH-01 |
| Prise en compte du motif | Validé | Motif explicite non vide détecté |
| Erreurs émises | 0 | Dérogation formelle acceptée |

## Ce que ce cas ne vérifie pas

- le rejet d'une fonction sans tag ou avec tag vide (couvert par `CASE-ARCH-1001`) ;
- la dérogation d'en-tête pour un fichier complet de plus de 500 lignes (couvert par `CASE-ARCH-1005` et `CASE-ARCH-1021`) ;
- la déclaration de la balise dans `tsdoc.json` (couvert par `CASE-ARCH-1006`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1002_validation_derogation_fonction_ts_need_more_lines_avec_motif`  
**Fichier :** [CASE-ARCH-1002.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1002.test.ts)

## Revue du test automatisé

- [x] Le test configure une fonction `.ts` de 45 lignes utiles avec un tag `@need_more_lines` et un motif explicite.
- [x] Le test vérifie que le linter/parseur AST accepte la fonction.
- [x] Le test vérifie que le motif textuel est correctement extrait et non vide.
- [x] Le nom du test contient `CASE_ARCH_1002`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
