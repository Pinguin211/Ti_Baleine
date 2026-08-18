# CASE-FAC-712 — Ligne détaillée sur le PDF pour le supplément géographique Saint-Leu (10 € par personne)

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-2`, `Scénario 1`, `Cas limite #5`  
**Type :** conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la présence d'une ligne ou d'une mention distincte sur la facture PDF détaillant le supplément géographique appliqué lors d'un départ de Saint-Leu (10 € par passager individuel). Si la règle se casse, le montant total de la facture inclurait le surcoût sans que le client ne puisse en identifier l'origine ni la conformité avec la grille tarifaire.

## Cas

```gherkin
Étant donné une réservation individuelle pour 2 passagers adultes au départ de « Saint-Leu »
Et un tarif de base de 65 € par adulte
Et un supplément géographique Saint-Leu de 10 € par personne
Quand le paiement en ligne est validé avec succès
Alors la facture PDF acquittée générée comporte une ligne dédiée ou une ventilation explicite pour le supplément géographique Saint-Leu indiquant « 2 × 10 € » (soit 20 €)
Et le total TTC affiché intègre ce supplément pour atteindre 150 €
```

## Données

| Élément | Valeur |
|---|---:|
| Port d'embarquement | Saint-Leu |
| Nombre de passagers | 2 |
| Supplément unitaire Saint-Leu | 10 € / personne |
| Montant total des suppléments | 20 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Libellé de ligne sur PDF | Majoration / Supplément Saint-Leu | Intitulé clair de la majoration |
| Montant de la ligne supplément | 20 € (ou 2 × 10 €) | 2 passagers × 10 € |
| Total TTC incluant le supplément | 150 € | 130 € base + 20 € supplément |

## Ce que ce cas ne vérifie pas

- l'absence de supplément lors d'un départ de Saint-Gilles (couvert par `CASE-FAC-702`) ;
- l'absence de supplément pour une privatisation forfaitaire (couvert par `CASE-FAC-706`) ;
- le format de la pièce jointe (couvert par `CASE-FAC-715`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_712_ligne_detaillee_supplement_saint_leu_sur_facture_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation individuelle à Saint-Leu pour 2 passagers.
- [ ] Le test génère la facture après confirmation du paiement.
- [ ] Le test vérifie qu'une ligne dédiée (« Majoration / Supplément Saint-Leu » ou « 2 × 10 € ») de 20 € est présente.
- [ ] Le test vérifie que le total TTC calculé est exact (150 €).
- [ ] Le nom du test contient `CASE_FAC_712`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
