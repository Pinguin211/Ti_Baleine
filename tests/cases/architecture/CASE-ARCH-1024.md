# CASE-ARCH-1024 — Répertoire exhaustif et unitaire des fichiers en infraction

**Spécification :** `SPEC-ARCH-03`  
**Critère d'acceptation :** `AC-2`, `Règle`, `Scénario 1`, `Cas limite #1`, `REQ-ARCH-003`  
**Type :** conformité statique / reporting  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'exhaustivité du diagnostic architectural en garantissant que 100 % des fichiers présentant au moins une non-conformité sont répertoriés individuellement dans la section dédiée du rapport, avec leur chemin d'accès relatif exact. Si un fichier cumule plusieurs infractions, il est listé une seule fois en en-tête de section tout en regroupant l'ensemble de ses violations.

## Cas

```gherkin
Étant donné un projet comportant plusieurs violations (ex. « src/utils/pricing.ts » et « src/hooks/domain/use-auth.ts »)
Quand la suite de tests génère le rapport d'audit « reports/arch-compliance-report.md »
Alors la section « 2. Répertoire des Fichiers en Infraction » liste distinctement chaque fichier en faute
Et chaque bloc de fichier affiche le chemin relatif exact (ex. « ### 📁 src/utils/pricing.ts »)
Et aucun fichier en infraction n'est omis ou masqué dans le répertoire
```

## Données

| Fichier en infraction | Type de violation | Présence dans le répertoire |
|---|---|---|
| `src/utils/pricing.ts` | Fonction > 30 lignes (`SPEC-ARCH-01`) | **Obligatoire** |
| `src/hooks/domain/use-auth.ts` | Import de `env/server.ts` (`SPEC-ARCH-02`) | **Obligatoire** |
| `src/components/ui/button.tsx` | Fichier conforme | **Absent** du répertoire des fautes |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Taux de fichiers fautifs répertoriés | 100 % | AC-2 de SPEC-ARCH-03 |
| Format d'affichage des fichiers | Titre Markdown `### 📁 chemin/relatif` | Gabarit de SPEC-ARCH-03 |
| Gestion des fichiers multi-violations | Regroupement sous un titre unique | Cas limite #1 de SPEC-ARCH-03 |

## Ce que ce cas ne vérifie pas

- les détails de localisation par ligne et motif (couvert par `CASE-ARCH-1025`) ;
- la génération du rapport sans erreur (couvert par `CASE-ARCH-1027`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1024_repertoire_exhaustif_unitaire_fichiers_en_infraction`  
**Fichier :** [CASE-ARCH-1024.test.ts](../../tests-unitaires/architecture/spec-arch-03/CASE-ARCH-1024.test.ts)

## Revue du test automatisé

- [x] Le test injecte des violations sur 2 fichiers distincts.
- [x] Le test vérifie que les 2 fichiers sont présents dans la section 2 du rapport.
- [x] Le test s'assure qu'un fichier conforme n'apparaît pas dans la section des infractions.
- [x] Le nom du test contient `CASE_ARCH_1024`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
