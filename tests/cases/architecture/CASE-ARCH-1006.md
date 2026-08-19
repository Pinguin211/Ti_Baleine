# CASE-ARCH-1006 — Déclaration formelle de la balise @need_more_lines dans tsdoc.json

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-4`, `Cas limite #5`, `Portée §7`, `REQ-ARCH-001`  
**Type :** conformité statique / configuration  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la chaîne d'outillage de documentation et de linting (TSDoc / ESLint) en s'assurant que le tag personnalisé `@need_more_lines` est formellement déclaré et configuré dans le fichier `tsdoc.json` à la racine du projet, évitant les avertissements de tags inconnus et garantissant la reconnaissance officielle de la dérogation par les linters.

## Cas

```gherkin
Étant donné le fichier de configuration « tsdoc.json » situé à la racine du projet
Quand le validateur de configuration TSDoc analyse les définitions de balises
Alors la balise « @need_more_lines » est déclarée dans la section « tagDefinitions »
Et le tag est typé comme balise de bloc ou de modificateur valide
Et aucun avertissement de balise TSDoc non déclarée n'est émis sur le projet
```

## Données

| Élément | Valeur |
|---|---:|
| Fichier de configuration | `tsdoc.json` |
| Emplacement | Racine du projet (`/tsdoc.json`) |
| Tag requis | `@need_more_lines` |
| Propriété de configuration | `tagDefinitions` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Présence de `tsdoc.json` | Existant | Portée §7 de SPEC-ARCH-01 |
| Déclaration de `@need_more_lines` | Déclaré formellement | AC-4 de SPEC-ARCH-01 |
| Erreurs linter TSDoc | 0 | Cas limite #5 |

## Ce que ce cas ne vérifie pas

- l'utilisation effective du tag dans les fonctions (couvert par `CASE-ARCH-1002`) ;
- l'utilisation effective du tag sur les fichiers (couvert par `CASE-ARCH-1005`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1006_declaration_balise_need_more_lines_dans_tsdoc_json`  
**Fichier :** [CASE-ARCH-1006.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1006.test.ts)

## Revue du test automatisé

- [x] Le test lit et parse le fichier `tsdoc.json` à la racine du dépôt.
- [x] Le test valide la présence de `@need_more_lines` dans les `tagDefinitions`.
- [x] Le test échoue si la balise est retirée de `tsdoc.json`.
- [x] Le nom du test contient `CASE_ARCH_1006`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
