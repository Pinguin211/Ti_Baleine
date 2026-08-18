# CASE-ARCH-1009 — Respect des conventions de nommage des dossiers en kebab-case

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-5`, `Table des conventions`, `Cas limite #6`, `REQ-ARCH-001`  
**Type :** conformité statique / linter  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'homogénéité de l'arborescence des dossiers sous `src/` (incluant les dossiers de routes Next.js App Router et les sous-dossiers fonctionnels) en imposant le `kebab-case` exclusif sur tous les répertoires.

## Cas

```gherkin
Étant donné l'ensemble des répertoires situés sous « src/ »
Quand l'analyseur de conformité de l'arborescence est exécuté
Alors tous les noms de dossiers respectent strictement le format « kebab-case » (ex: « src/components/domain/ », « src/app/admin/ », « src/env/ »)
Et aucun nom de dossier ne comporte de majuscules (« CamelCase ») ni de tirets bas (« snake_case »)
```

## Données

| Dossier vérifié | Format attendu | Exemples valides | Exemples rejetés |
|---|---|---|---|
| Routes App Router | `kebab-case` | `src/app/admin/planning/` | `src/app/Admin/Planning/` |
| Modules techniques | `kebab-case` | `src/components/ui/` | `src/components/UI/` |
| Modules de domaine | `kebab-case` | `src/services/server/` | `src/services/Server_Side/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut dossiers en `kebab-case` | Conforme (Pass) | Table des conventions de SPEC-ARCH-01 |
| Statut dossiers en `CamelCase` ou `snake_case` | Rejet (Fail) | Cas limite #6 |

## Ce que ce cas ne vérifie pas

- le nommage des fichiers (couvert par `CASE-ARCH-1008`) ;
- la structure imposée des dossiers de premier niveau (couvert par `SPEC-ARCH-02`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1009_respect_nommage_dossiers_kebab_case`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test liste tous les répertoires récursivement sous `src/`.
- [ ] Le test valide le pattern `^[a-z0-9]+(-[a-z0-9]+)*$` pour chaque segment de dossier.
- [ ] Le test échoue si un dossier comme `src/components/DomainCard/` existe.
- [ ] Le nom du test contient `CASE_ARCH_1009`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
