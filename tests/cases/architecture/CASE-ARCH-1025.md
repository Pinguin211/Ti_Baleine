# CASE-ARCH-1025 — Détail précis et traçabilité des infractions par fichier

**Spécification :** `SPEC-ARCH-03`  
**Critère d'acceptation :** `AC-3`, `Règle`, `Scénario 1`, `Gabarit`, `REQ-ARCH-003`  
**Type :** conformité statique / reporting  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'actionnabilité et la précision du rapport d'audit. Pour chaque fichier en faute, le rapport doit fournir la localisation exacte à la ligne près, la spécification transgressée (`SPEC-ARCH-01` ou `SPEC-ARCH-02`), l'identifiant précis du cas de test associé (`CASE-ARCH-1000` à `CASE-ARCH-1022`) et l'explication textuelle claire du motif de rejet.

## Cas

```gherkin
Étant donné un fichier en infraction « src/components/domain/booking-card.tsx » contenant un sous-composant « BookingBadge » à la ligne 82
Quand le rapport de conformité est généré
Alors l'entrée du fichier dans le rapport contient les 4 éléments obligatoires :
  1. « Règle transgressée : SPEC-ARCH-01 »
  2. « Cas de test associé : CASE-ARCH-1003 (Mono-composant par fichier .tsx) »
  3. « Localisation : Ligne 82 (composant BookingBadge) »
  4. « Détail de l'erreur : Déclaration d'un sous-composant dans le fichier. Il doit être extrait dans son propre fichier. »
```

## Données

| Champ requis | Description | Exemple |
|---|---|---|
| **Règle transgressée** | Référence formelle de la spec | `SPEC-ARCH-01` ou `SPEC-ARCH-02` |
| **Cas de test associé** | Identifiant et libellé du cas | `CASE-ARCH-1000`, `CASE-ARCH-1018`, etc. |
| **Localisation** | Numéro de ligne et symbole incriminé | `Ligne 45 (fonction calculatePricingMatrix)` |
| **Détail de l'erreur** | Explication claire et correctif attendu | Message explicite pour correction immédiate |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Règle de validation |
|---|---:|---|
| Présence des 4 champs par infraction | 100 % des infractions documentées | AC-3 de SPEC-ARCH-03 |
| Précision de la ligne | Numéro de ligne exact dans le fichier source | Gabarit de SPEC-ARCH-03 |
| Référence du cas de test | Format valide `CASE-ARCH-xxxx` | Traçabilité bidirectionnelle |

## Ce que ce cas ne vérifie pas

- l'exhaustivité de la liste des fichiers (couvert par `CASE-ARCH-1024`) ;
- la synthèse par spécification (couvert par `CASE-ARCH-1026`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ARCH_1025_detail_precis_localisation_et_motif_infractions_rapport`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test injecte une violation connue avec un numéro de ligne spécifique.
- [ ] Le test inspecte le bloc généré dans `reports/arch-compliance-report.md`.
- [ ] Le test vérifie la présence du numéro de ligne, du SPEC, du CASE-ARCH et du détail.
- [ ] Le nom du test contient `CASE_ARCH_1025`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
