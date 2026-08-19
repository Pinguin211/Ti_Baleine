# CASE-FAC-706 — Facturation d'une privatisation forfaitaire au départ de Saint-Leu sans application de majoration géographique

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `Scénario 2`, `Cas limite #5`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'invariance du tarif forfaitaire lors d'une privatisation sur le navire Tikap au départ du port de Saint-Leu (600 €). Si la règle se casse, le système pourrait indûment ajouter une majoration géographique par passager (ex: 12 passagers × 10 € = +120 €) alors que la formule privatisation est un forfait fixe exempt de majoration géographique.

## Cas

```gherkin
Étant donné une réservation pour une prestation « Privatisation demi-journée matin » sur le Tikap
Et un port de départ situé à « Saint-Leu » (mardi ou jeudi matin)
Et un montant forfaitaire de 600 € applicable à la privatisation
Quand le paiement en ligne de 600 € est validé avec succès
Alors une facture acquittée est générée à la volée au format PDF
Et la facture PDF mentionne le port d'embarquement « Saint-Leu »
Et la facture PDF mentionne la ligne forfaitaire unique de 600 € TTC sans aucun supplément géographique par passager
Et le montant total TTC facturé est exactement de 600 €
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Privatisation demi-journée matin |
| Navire | Tikap |
| Port d'embarquement | Saint-Leu |
| Type de tarif | Forfait global navire |
| Majoration par passager | 0 € |
| Statut du paiement bancaire | validé avec succès |
| Montant total réglé | 600 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Forfait de privatisation | 600 € | Tarif forfaitaire Tikap |
| Majoration géographique | 0 € | Forfait fixe sans supplément par passager |
| Montant total TTC facturé | 600 € | 600 € + 0 € |
| Port mentionné sur PDF | Saint-Leu | Port de départ sélectionné |
| Mention d'acquittement | Acquittée | Paiement validé |

## Ce que ce cas ne vérifie pas

- les réservations individuelles à Saint-Leu qui comportent une majoration de 10 €/pers (couvert par `CASE-FAC-700`, `CASE-FAC-705`, `CASE-FAC-712`) ;
- la privatisation au départ de Saint-Gilles (couvert par `CASE-FAC-701`) ;
- les transactions bancaires refusées ou interrompues (couvert par `CASE-FAC-720`, `CASE-FAC-721`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_706_facturation_privatisation_saint_leu_sans_majoration`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une privatisation du Tikap au départ de Saint-Leu à 600 €.
- [ ] Le test vérifie qu'aucun supplément par passager n'est calculé.
- [ ] Le test simule la validation du paiement de 600 €.
- [ ] Le test vérifie que la facture PDF mentionne « Saint-Leu » et un total de 600 € TTC.
- [ ] Le test vérifie l'absence de ligne de majoration géographique.
- [ ] Le nom du test contient `CASE_FAC_706`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
