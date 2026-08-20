# CASE-FAC-703 — Facturation de l'acompte d'une sortie « Dauphins » au tarif correspondant

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-3`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'application du barème tarifaire spécifique propre à l'activité « Dauphins » (tarif de base adulte standard à 50 € au départ de Saint-Gilles) et son libellé exact sur la facture d'acompte PDF. Si la règle se casse, le système pourrait appliquer le tarif de la sortie « Baleines » (65 €), un intitulé erroné, ou un montant d'acompte incorrect sur la facture.

## Cas

```gherkin
Étant donné une réservation individuelle pour l'activité « Sortie Dauphins »
Et un départ prévu au port de « Saint-Gilles »
Et un nombre de participants de 1 adulte
Et un tarif de base adulte spécifique pour les dauphins de 50 €
Quand le paiement en ligne de l'acompte de 30 % (15,00 €) est validé avec succès
Alors la facture d'acompte PDF est générée à la volée avec la mention explicite « Acompte acquitté »
Et la facture PDF mentionne explicitement la prestation « Dauphins »
Et la facture PDF détaille la ligne tarifaire 1 adulte à 50 €, le montant total TTC de la commande (50 €), l'acompte réglé (15,00 €) et le solde restant dû (35,00 €)
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Dauphins |
| Port d'embarquement | Saint-Gilles |
| Participants | 1 adulte |
| Tarif de base adulte Dauphins | 50 € |
| Montant total TTC de la commande | 50 € |
| Taux d'acompte (standard) | 30 % |
| Acompte réglé | 15,00 € |
| Solde restant dû | 35,00 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant base adulte Dauphins | 50 € | 1 adulte × 50 € |
| Prestation mentionnée sur PDF | Dauphins | Activité choisie |
| Port mentionné sur PDF | Saint-Gilles | Port sélectionné |
| Montant total TTC de la commande | 50 € | 1 × 50 € |
| Acompte (30 %) | 15,00 € | 50 € × 30 % |
| Solde restant dû après acompte | 35,00 € | 50 € − 15,00 € |
| Mention sur la facture d'acompte | Acompte acquitté | Confirmation du paiement de l'acompte |

## Ce que ce cas ne vérifie pas

- la tarification de la sortie « Baleines » (couvert par `CASE-FAC-700`, `CASE-FAC-702`) ;
- la sortie « Dauphins » avec tarif enfant (couvert par `CASE-FAC-704`) ;
- la sortie « Dauphins » au départ de Saint-Leu avec supplément (couvert par `CASE-FAC-705`, `CASE-FAC-712`) ;
- le règlement du solde et la facture de solde distincte (couvert par `CASE-FAC-700`, `CASE-FAC-701`) ;
- la gestion d'un échec d'envoi de courriel (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_703_facturation_acompte_sortie_dauphins_tarif_specifique`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation « Dauphins » pour 1 adulte à Saint-Gilles.
- [ ] Le test vérifie l'application du tarif de base dauphins à 50 €.
- [ ] Le test simule la validation du paiement de l'acompte de 15,00 € (30 %).
- [ ] Le test vérifie que la facture d'acompte PDF mentionne explicitement l'activité « Dauphins » et la mention « Acompte acquitté ».
- [ ] Le test vérifie que le total TTC de la commande est de 50 € et le solde restant dû de 35,00 €.
- [ ] Le nom du test contient `CASE_FAC_703`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
