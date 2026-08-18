# CASE-ARCH-1001 — Rejet d'une fonction .ts/.js > 30 lignes utiles sans dérogation ou sans motif

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-1`, `Cas limite #1`, `Cas limite #2`, `Règle §1`, `REQ-ARCH-001`  
**Type :** conformité statique / architecture  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'intégrité de la règle de volumétrie en assurant le rejet strict et automatique lors du build / test de toute fonction ou méthode dans un fichier `.ts`/`.js` qui excède 30 lignes utiles sans tag `@need_more_lines`, ou qui utilise un tag `@need_more_lines` vide sans motif textuel explicite.

## Cas

```gherkin
Étant donné une fonction TypeScript déclarée dans un fichier « .ts »
Et que cette fonction compte 38 lignes utiles
Et que la fonction ne comporte aucun tag « @need_more_lines » ou comporte un tag sans motif textuel (« @need_more_lines » sans argument)
Quand l'analyseur de conformité AST est exécuté
Alors l'analyseur signale une infraction bloquante
Et l'analyseur impose le découpage de la fonction ou l'adjonction d'une dérogation motivée
Et le statut global du test est en échec (Fail)
```

## Données

| Élément | Situation A (Sans tag) | Situation B (Tag sans motif) |
|---|---:|---:|
| Fichier source | `src/utils/calculator.ts` | `src/utils/calculator.ts` |
| Lignes utiles de la fonction | 38 lignes | 38 lignes |
| Tag TSDoc présent | Aucun | `@need_more_lines` (sans chaîne de motif) |
| Statut attendu | Échec bloquant (Rejet) | Échec bloquant (Rejet) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut Situation A | Rejet / Échec | Cas limite #1 (dépassement non dérogé) |
| Statut Situation B | Rejet / Échec | Cas limite #2 (motif textuel obligatoire) |
| Message de diagnostic | Présent et explicite | Indique le nom de la fonction et le nombre de lignes |

## Ce que ce cas ne vérifie pas

- la validation nominale d'une fonction $\le 30$ lignes (couvert par `CASE-ARCH-1000`) ;
- la validation d'une fonction dérogée avec un motif textuel valide (couvert par `CASE-ARCH-1002`) ;
- les limites globales de fichiers de 500 lignes (couvert par `CASE-ARCH-1004` et `CASE-ARCH-1005`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1001_rejet_fonction_ts_depassant_30_lignes_sans_derogation_ou_motif`  
**Fichier :** [CASE-ARCH-1001.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1001.test.ts)

## Revue du test automatisé

- [x] Le test crée ou simule une fonction de 35+ lignes utiles sans annotation.
- [x] Le test vérifie que l'analyseur AST lève une erreur explicite.
- [x] Le test simule une fonction de 35+ lignes avec `@need_more_lines` sans motif textuel et vérifie le rejet.
- [x] Le nom du test contient `CASE_ARCH_1001`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
