# CASE-FAC-712 — Ligne détaillée sur les factures d'acompte et de solde pour le supplément géographique Saint-Leu (10 € par personne)

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `AC-3`, `Scénario 1`, `Cas limite #5`  
**Type :** conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la présence d'une ligne ou d'une mention distincte sur les factures PDF (acompte et solde) détaillant le supplément géographique appliqué lors d'un départ de Saint-Leu (10 € par passager individuel). Si la règle se casse, le montant total de la commande inclurait le surcoût sans que le client ne puisse en identifier l'origine ni la conformité avec la grille tarifaire, sur l'une ou l'autre des deux factures.

## Cas

```gherkin
Étant donné une réservation individuelle pour 2 passagers adultes au départ de « Saint-Leu »
Et un tarif de base de 65 € par adulte
Et un supplément géographique Saint-Leu de 10 € par personne (montant total TTC de la commande : 150 €)
Quand le paiement en ligne de l'acompte de 30 % (45 €) est validé avec succès
Alors la facture d'acompte PDF générée comporte une ligne dédiée ou une ventilation explicite pour le supplément géographique Saint-Leu indiquant « 2 × 10 € » (soit 20 €)
Et le montant total TTC de la commande affiché intègre ce supplément pour atteindre 150 €, avec un acompte réglé de 45 € et un solde restant dû de 105 €
Quand le solde de 105 € est réglé ultérieurement
Alors le récapitulatif de la facture de solde rappelle également la ventilation du supplément géographique Saint-Leu (20 €) au sein du montant total TTC acquitté (150 €)
```

## Données

| Élément | Valeur |
|---|---:|
| Port d'embarquement | Saint-Leu |
| Nombre de passagers | 2 |
| Supplément unitaire Saint-Leu | 10 € / personne |
| Montant total des suppléments | 20 € |
| Montant total TTC de la commande | 150 € |
| Taux d'acompte (standard) | 30 % |
| Acompte réglé | 45 € |
| Solde restant dû | 105 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Libellé de ligne sur PDF | Majoration / Supplément Saint-Leu | Intitulé clair de la majoration |
| Montant de la ligne supplément | 20 € (ou 2 × 10 €) | 2 passagers × 10 € |
| Total TTC de la commande incluant le supplément | 150 € | 130 € base + 20 € supplément |
| Acompte (30 %) | 45 € | 150 € × 30 % |
| Solde restant dû après acompte | 105 € | 150 € − 45 € |

## Ce que ce cas ne vérifie pas

- l'absence de supplément lors d'un départ de Saint-Gilles (couvert par `CASE-FAC-702`) ;
- l'absence de supplément pour une privatisation forfaitaire (couvert par `CASE-FAC-706`) ;
- le règlement en une seule étape (couvert par `CASE-FAC-700`) ;
- le format de la pièce jointe (couvert par `CASE-FAC-715`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_712_ligne_detaillee_supplement_saint_leu_facture_acompte_et_solde`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation individuelle à Saint-Leu pour 2 passagers (150 € TTC).
- [ ] Le test génère la facture d'acompte après confirmation du paiement de l'acompte (45 €).
- [ ] Le test vérifie qu'une ligne dédiée (« Majoration / Supplément Saint-Leu » ou « 2 × 10 € ») de 20 € est présente sur la facture d'acompte.
- [ ] Le test vérifie que le total TTC de la commande est exact (150 €), avec acompte 45 € et solde dû 105 €.
- [ ] Le test génère ensuite la facture de solde et vérifie que le récapitulatif rappelle la ventilation du supplément Saint-Leu (20 €).
- [ ] Le nom du test contient `CASE_FAC_712`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
