# CASE-ARCH-1023 — Production systématique du rapport Markdown d'audit de conformité

**Spécification :** `SPEC-ARCH-03`  
**Critère d'acceptation :** `AC-1`, `Scénarios 1 et 2`, `Portée §1`, `REQ-ARCH-003`, `ADR-001`  
**Type :** conformité statique / reporting  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la traçabilité et la visibilité des résultats de conformité architecturale en s'assurant que chaque exécution de la suite de tests d'architecture (en local ou en pipeline CI/CD) génère ou met à jour systématiquement un fichier de synthèse au format Markdown (par exemple `reports/arch-compliance-report.md`). Si le dossier cible n'existe pas, l'exécuteur doit le créer automatiquement.

## Cas

```gherkin
Étant donné la suite de tests de conformité architecturale configurée sur le projet
Quand la suite de tests est lancée (en environnement local ou en CI)
Alors le fichier de rapport « reports/arch-compliance-report.md » est créé ou mis à jour sur le disque
Et le rapport est formaté en Markdown valide
Et le rapport contient la date d'exécution, le statut global et le volume de fichiers analysés
```

## Données

| Élément | Valeur |
|---|---|
| Fichier de sortie | `reports/arch-compliance-report.md` |
| Format du rapport | Markdown standard (`.md`) |
| Conditions de déclenchement | Chaque exécution des tests `ARCH` |
| Comportement si dossier absent | Création automatique de `reports/` |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Présence du fichier de rapport | Existe sur disque (`reports/arch-compliance-report.md`) | AC-1 de SPEC-ARCH-03 |
| Format du contenu | Markdown structuré | Portée §1 de SPEC-ARCH-03 |
| Compatibilité CI | Injection `$GITHUB_STEP_SUMMARY` | Cas limite #3 de SPEC-ARCH-03 |

## Ce que ce cas ne vérifie pas

- le contenu exhaustif des infractions (couvert par `CASE-ARCH-1024` et `CASE-ARCH-1025`) ;
- le tableau de synthèse par spécification (couvert par `CASE-ARCH-1026`) ;
- le cas nominal à 0 faute (couvert par `CASE-ARCH-1027`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1023_production_systematique_rapport_markdown_audit_conformite`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test exécute la suite d'audit de conformité.
- [ ] Le test vérifie la création effective de `reports/arch-compliance-report.md`.
- [ ] Le test vérifie que le répertoire parent est automatiquement créé s'il était manquant.
- [ ] Le nom du test contient `CASE_ARCH_1023`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
