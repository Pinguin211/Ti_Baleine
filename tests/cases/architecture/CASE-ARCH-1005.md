# CASE-ARCH-1005 — Dérogation d'en-tête pour fichier source dépassant 500 lignes

**Spécification :** `SPEC-ARCH-01`  
**Critère d'acceptation :** `AC-3`, `Scénario 4`, `Portée §6`, `Règle §3`, `REQ-ARCH-001`  
**Type :** conformité statique / architecture  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la possibilité d'autoriser des fichiers sources structurellement denses qui dépassent 500 lignes (par exemple un schéma de validation Zod consolidé pour les réservations, ou un dictionnaire de constantes d'état) sans contournement sauvage de l'outillage, grâce à une dérogation documentée par le tag `@need_more_lines - "motif explicite"` positionné tout en haut du fichier.

## Cas

```gherkin
Étant donné un fichier de schéma Zod complexe comportant 620 lignes
Et un bloc TSDoc situé tout en haut du fichier (lignes d'en-tête)
Et la présence dans ce bloc de « @need_more_lines - "Schéma consolidé des réservations" »
Quand le test de conformité est exécuté
Alors le fichier est validé avec succès
Et aucune erreur de dépassement de limite de lignes n'est levée
```

## Données

| Élément | Valeur |
|---|---:|
| Fichier source testé | `src/schemas/validation/booking.schema.ts` |
| Nombre total de lignes | 620 lignes |
| Tag TSDoc d'en-tête | `@need_more_lines - "Schéma consolidé des réservations"` |
| Emplacement du bloc TSDoc | Tout en haut du fichier (Ligne 1) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Statut du fichier | Validé (Pass) | Scénario 4 de SPEC-ARCH-01 |
| Motif extrait | `"Schéma consolidé des réservations"` | Motif explicite valide |
| Statut global | Succès | Dérogation d'en-tête acceptée |

## Ce que ce cas ne vérifie pas

- le rejet d'un fichier de plus de 500 lignes sans tag (couvert par `CASE-ARCH-1004`) ;
- le rejet si le tag est placé en milieu ou fin de fichier (couvert par `CASE-ARCH-1021`) ;
- la déclaration de `@need_more_lines` dans `tsdoc.json` (couvert par `CASE-ARCH-1006`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1005_validation_derogation_en_tete_fichier_superieur_500_lignes`  
**Fichier :** [CASE-ARCH-1005.test.ts](../../tests-unitaires/architecture/spec-arch-01/CASE-ARCH-1005.test.ts)

## Revue du test automatisé

- [x] Le test configure un fichier de plus de 500 lignes avec un bloc TSDoc d'en-tête contenant `@need_more_lines` et un motif.
- [x] Le test vérifie que l'analyseur accepte le fichier sans lever d'erreur.
- [x] Le test vérifie que le motif textuel est obligatoire.
- [x] Le nom du test contient `CASE_ARCH_1005`.
- [x] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** Antigravity (automatisation Vitest)
**Remarques :** Test automatisé et validé avec ts-morph & Vitest
