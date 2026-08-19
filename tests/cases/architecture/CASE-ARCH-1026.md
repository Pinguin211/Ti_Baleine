# CASE-ARCH-1026 — Présence du tableau de synthèse chiffré par spécification

**Spécification :** `SPEC-ARCH-03`  
**Critère d'acceptation :** `AC-4`, `Portée §2`, `Gabarit §1`, `REQ-ARCH-003`  
**Type :** conformité statique / reporting  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la lisibilité exécutive du rapport d'audit. Il impose la présence en section 1 d'un tableau synthétique récapitulant de façon chiffrée le statut (`🔴 Échec` / `🟢 Conforme`) et le nombre exact d'infractions relevées pour chaque spécification couverte (`SPEC-ARCH-01` et `SPEC-ARCH-02`).

## Cas

```gherkin
Étant donné une exécution d'audit de conformité ayant relevé 3 violations sur SPEC-ARCH-01 et 1 violation sur SPEC-ARCH-02
Quand le rapport « reports/arch-compliance-report.md » est généré
Alors la section « 1. Synthèse par Spécification » contient un tableau Markdown
Et la ligne « SPEC-ARCH-01 » affiche le statut « 🔴 Échec » et « 3 » infractions
Et la ligne « SPEC-ARCH-02 » affiche le statut « 🔴 Échec » et « 1 » infraction
Et les intitulés de spécifications correspondent exactement aux définitions de l'architecture
```

## Données

| Colonne du tableau | Contenu attendu |
|---|---|
| **Spécification** | Référence (`SPEC-ARCH-01`, `SPEC-ARCH-02`) |
| **Intitulé** | Titre de la spécification |
| **Statut** | Indicateur visuel et textuel (`🔴 Échec` ou `🟢 Conforme`) |
| **Nombre d'infractions** | Décompte entier positif ou nul ($N \ge 0$) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Présence du tableau en section 1 | Obligatoire | Portée §2 de SPEC-ARCH-03 |
| Exactitude des compteurs | Somme égale au total global | AC-4 de SPEC-ARCH-03 |
| Cohérence des icônes de statut | 🟢 si 0 faute, 🔴 si $\ge 1$ faute | Gabarit de SPEC-ARCH-03 |

## Ce que ce cas ne vérifie pas

- le détail unitaire des infractions (couvert par `CASE-ARCH-1025`) ;
- l'écriture du fichier physique (couvert par `CASE-ARCH-1023`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1026_presence_tableau_synthese_chiffre_par_specification`  
**Fichier :** [CASE-ARCH-1026.test.ts](../../tests-unitaires/architecture/spec-arch-03/CASE-ARCH-1026.test.ts)

## Revue du test automatisé

- [x] Le test vérifie que le rapport généré contient la section `## 1. Synthèse par Spécification`.
- [x] Le test parse le tableau Markdown et valide les décomptes par spécification.
- [x] Le test s'assure que la somme des infractions par spécification correspond au nombre global.
- [x] Le nom du test contient `CASE_ARCH_1026`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
