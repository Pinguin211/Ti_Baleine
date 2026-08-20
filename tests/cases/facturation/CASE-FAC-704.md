# CASE-FAC-704 — Facturation de l'acompte d'une réservation mixte (adultes et enfants) avec ventilation détaillée des lignes tarifaires sur le PDF

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-3`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'exactitude de la ventilation tarifaire différenciée (adultes vs enfants) sur la facture d'acompte PDF pour une commande regroupant plusieurs catégories de passagers. Si la règle se casse, le montant global pourrait être appliqué au tarif adulte pour tous les passagers, les lignes de détail pourraient être agrégées sans distinction légale claire, ou le montant de l'acompte calculé sur le total pourrait être erroné.

## Cas

```gherkin
Étant donné une réservation individuelle pour une sortie « Baleines » au port de « Saint-Gilles »
Et un groupe composé de 2 adultes et 1 enfant
Et des tarifs unitaires transmis de 65 € par adulte et 40 € par enfant (montant total TTC de la commande : 170 €)
Quand le paiement en ligne de l'acompte de 30 % (51,00 €) est validé avec succès
Alors la facture d'acompte PDF est générée à la volée en mémoire avec la mention explicite « Acompte acquitté »
Et la facture PDF présente distinctement une ligne pour 2 adultes (130 €) et une ligne pour 1 enfant (40 €)
Et la facture PDF affiche le montant total TTC de la commande (170 €), l'acompte réglé (51,00 €) et le solde restant dû (119,00 €)
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Baleines |
| Port d'embarquement | Saint-Gilles |
| Passagers adultes | 2 |
| Passagers enfants | 1 |
| Tarif unitaire adulte | 65 € |
| Tarif unitaire enfant | 40 € |
| Montant total TTC de la commande | 170 € |
| Taux d'acompte (standard) | 30 % |
| Acompte réglé | 51,00 € |
| Solde restant dû | 119,00 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Sous-total adultes | 130 € | 2 adultes × 65 € |
| Sous-total enfants | 40 € | 1 enfant × 40 € |
| Montant total TTC de la commande | 170 € | 130 € + 40 € |
| Acompte (30 %) | 51,00 € | 170 € × 30 % |
| Solde restant dû après acompte | 119,00 € | 170 € − 51,00 € |
| Lignes de détail sur PDF | 2 lignes distinctes (Adultes / Enfants) | Ventilation obligatoire des catégories |
| Mention sur la facture d'acompte | Acompte acquitté | Validation du paiement de l'acompte |

## Ce que ce cas ne vérifie pas

- l'application d'un supplément géographique Saint-Leu (couvert par `CASE-FAC-700`, `CASE-FAC-705`, `CASE-FAC-712`) ;
- la tarification d'une formule forfaitaire (couvert par `CASE-FAC-701`, `CASE-FAC-706`) ;
- le règlement du solde et la facture de solde distincte (couvert par `CASE-FAC-700`, `CASE-FAC-701`) ;
- l'expédition du courriel et de la pièce jointe (couvert par `CASE-FAC-714`, `CASE-FAC-715`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_704_facturation_acompte_mixte_adultes_enfants_ventilation_detaillee_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation pour 2 adultes et 1 enfant à Saint-Gilles.
- [ ] Le test vérifie le calcul : 2 × 65 € (130 €) + 1 × 40 € (40 €) = 170 € de total TTC.
- [ ] Le test simule la confirmation du paiement de l'acompte de 51,00 € (30 % de 170 €).
- [ ] Le test vérifie la présence de deux lignes distinctes (adulte et enfant) et de la mention « Acompte acquitté » sur la facture d'acompte PDF.
- [ ] Le test vérifie que le total TTC de la commande est de 170 € et le solde restant dû de 119,00 €.
- [ ] Le nom du test contient `CASE_FAC_704`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
