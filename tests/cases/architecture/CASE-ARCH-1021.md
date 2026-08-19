# CASE-ARCH-1021 — Rejet d'une dérogation @need_more_lines fichier non positionnée en en-tête

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-3`, `Portée §6`, `Scénario 4`, `Cas limite #4`, `REQ-ARCH-001`  
**Type :** conformité statique / AST  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la rigueur de l'analyse statique et la lisibilité du code en garantissant qu'une dérogation de fichier portant sur le plafond global de 500 lignes doit impérativement être documentée dans le bloc TSDoc d'en-tête (tout en haut du fichier, avant tout import ou code exécutable). Toute balise `@need_more_lines` insérée au milieu ou en fin de fichier est considérée comme invalide et rejetée.

## Cas

```gherkin
Étant donné un fichier source (« .ts » ou « .tsx ») comptant plus de 500 lignes (ex. 560 lignes)
Et un commentaire contenant « @need_more_lines - "Motif quelconque" » placé en milieu de fichier (ex. ligne 250) ou en bas de fichier
Et l'absence de bloc TSDoc d'en-tête contenant la balise tout en haut du fichier
Quand l'analyseur de conformité AST est exécuté
Alors l'analyseur rejette la dérogation
Et l'analyseur signale une erreur bloquante de dépassement de 500 lignes sans dérogation d'en-tête valide
```

## Données

| Élément | Position valide (CASE-ARCH-1005) | Position invalide (CASE-ARCH-1021) |
|---|---|---|
| Emplacement du tag `@need_more_lines` | Ligne 1 (bloc TSDoc d'en-tête de fichier) | Ligne 250 (milieu de fichier) ou fin de fichier |
| Taille du fichier | 560 lignes | 560 lignes |
| Statut attendu | Validé (Pass) | Rejet bloquant (Fail) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut si tag en milieu/fin | Rejet immédiat | Portée §6 de SPEC-ARCH-01 |
| Emplacement obligatoire | Tout en haut du fichier (En-tête) | Règle §3 et Scénario 4 de SPEC-ARCH-01 |

## Ce que ce cas ne vérifie pas

- la validation nominale d'un fichier dérogé en en-tête (couvert par `CASE-ARCH-1005`) ;
- la dérogation fonctionnelle précédant une signature (couvert par `CASE-ARCH-1002`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1021_rejet_derogation_need_more_lines_fichier_non_positionnee_en_tete`  
**Fichier :** [CASE-ARCH-1021.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1021.test.ts)

## Revue du test automatisé

- [x] Le test simule un fichier de 550 lignes avec un tag `@need_more_lines` placé après les imports ou en fin de fichier.
- [x] Le test vérifie que l'analyseur AST ne valide pas ce fichier et émet une erreur bloquante.
- [x] Le test confirme que seul un bloc TSDoc initial en ligne 1 est pris en compte pour la dérogation fichier.
- [x] Le nom du test contient `CASE_ARCH_1021`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
