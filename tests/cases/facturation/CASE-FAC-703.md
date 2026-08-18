# CASE-FAC-703 — Facturation d'une sortie « Dauphins » au tarif correspondant

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'application du barème tarifaire spécifique propre à l'activité « Dauphins » (tarif de base adulte standard à 50 € au départ de Saint-Gilles) et son libellé exact sur la facture PDF. Si la règle se casse, le système pourrait appliquer le tarif de la sortie « Baleines » (65 €) ou un intitulé erroné sur la facture.

## Cas

```gherkin
Étant donné une réservation individuelle pour l'activité « Sortie Dauphins »
Et un départ prévu au port de « Saint-Gilles »
Et un nombre de participants de 1 adulte
Et un tarif de base adulte spécifique pour les dauphins de 50 €
Quand le paiement en ligne de 50 € est validé avec succès
Alors une facture acquittée est générée à la volée au format PDF
Et la facture PDF mentionne explicitement la prestation « Dauphins »
Et la facture PDF détaille la ligne tarifaire 1 adulte à 50 € avec un total TTC facturé de 50 €
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Dauphins |
| Port d'embarquement | Saint-Gilles |
| Participants | 1 adulte |
| Tarif de base adulte Dauphins | 50 € |
| Statut du paiement bancaire | validé avec succès |
| Montant total réglé | 50 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant base adulte Dauphins | 50 € | 1 adulte × 50 € |
| Prestation mentionnée sur PDF | Dauphins | Activité choisie |
| Port mentionné sur PDF | Saint-Gilles | Port sélectionné |
| Montant total TTC réglé | 50 € | 1 × 50 € |
| Mention d'acquittement | Acquittée | Confirmation du paiement |

## Ce que ce cas ne vérifie pas

- la tarification de la sortie « Baleines » (couvert par `CASE-FAC-700`, `CASE-FAC-702`) ;
- la sortie « Dauphins » avec tarif enfant (couvert par `CASE-FAC-704`) ;
- la sortie « Dauphins » au départ de Saint-Leu avec supplément (couvert par `CASE-FAC-705`, `CASE-FAC-712`) ;
- la gestion d'un échec d'envoi de courriel (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_703_facturation_sortie_dauphins_tarif_specifique`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation « Dauphins » pour 1 adulte à Saint-Gilles.
- [ ] Le test vérifie l'application du tarif de base dauphins à 50 €.
- [ ] Le test simule la validation du paiement en ligne de 50 €.
- [ ] Le test vérifie que la facture PDF mentionne explicitement l'activité « Dauphins ».
- [ ] Le test vérifie que le total TTC de la facture est de 50 €.
- [ ] Le nom du test contient `CASE_FAC_703`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
