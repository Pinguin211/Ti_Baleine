# CASE-FAC-702 — Facturation de l'acompte d'une réservation standard au départ de Saint-Gilles

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-3`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'exactitude du calcul tarifaire et des mentions sur la facture d'acompte PDF pour une réservation standard au départ du port principal de Saint-Gilles. Si la règle se casse, un supplément géographique indu pourrait être appliqué à tort, le port d'embarquement pourrait être erroné, ou le montant de l'acompte / solde restant dû pourrait être incorrect sur la facture émise.

## Cas

```gherkin
Étant donné une réservation individuelle pour une sortie « Baleines » au départ du port de « Saint-Gilles »
Et un nombre de participants de 1 adulte
Et un tarif de base standard de 65 € par adulte sans supplément géographique (0 €)
Quand le paiement en ligne de l'acompte de 30 % (19,50 €) est validé avec succès
Alors la facture d'acompte PDF est générée à la volée avec la mention explicite « Acompte acquitté »
Et la facture PDF mentionne explicitement le port d'embarquement « Saint-Gilles »
Et la facture PDF détaille la ligne tarifaire 1 adulte à 65 € sans aucune majoration géographique, le montant total TTC de la commande (65 €), l'acompte réglé (19,50 €) et le solde restant dû (45,50 €)
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Baleines |
| Port d'embarquement | Saint-Gilles |
| Participants | 1 adulte |
| Tarif de base adulte | 65 € |
| Majoration géographique | 0 € |
| Montant total TTC de la commande | 65 € |
| Taux d'acompte (standard) | 30 % |
| Acompte réglé | 19,50 € |
| Solde restant dû | 45,50 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant base adulte | 65 € | 1 adulte × 65 € |
| Supplément géographique | 0 € | Départ de Saint-Gilles (non applicable) |
| Montant total TTC de la commande | 65 € | 65 € + 0 € |
| Acompte (30 %) | 19,50 € | 65 € × 30 % |
| Solde restant dû après acompte | 45,50 € | 65 € − 19,50 € |
| Port mentionné sur PDF | Saint-Gilles | Donnée issue de la réservation |
| Mention sur la facture d'acompte | Acompte acquitté | Validation du paiement de l'acompte |

## Ce que ce cas ne vérifie pas

- la majoration géographique applicable à Saint-Leu (couvert par `CASE-FAC-700`, `CASE-FAC-705`, `CASE-FAC-712`) ;
- la tarification spécifique « Dauphins » (couvert par `CASE-FAC-703`) ;
- la ventilation de profils enfants ou mixtes (couvert par `CASE-FAC-704`) ;
- le règlement du solde et la facture de solde distincte (couvert par `CASE-FAC-700`, `CASE-FAC-701`) ;
- la transmission du courriel et la pièce jointe (couvert par `CASE-FAC-714`, `CASE-FAC-715`) ;
- le statut d'émission en base de données (couvert par `CASE-FAC-717`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_702_facturation_acompte_reservation_standard_saint_gilles_sans_supplement`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation pour 1 adulte à Saint-Gilles au tarif de 65 €.
- [ ] Le test simule la validation du paiement de l'acompte de 19,50 € (30 %).
- [ ] Le test vérifie que la facture d'acompte PDF mentionne « Acompte acquitté » et « Saint-Gilles ».
- [ ] Le test vérifie qu'aucun supplément géographique n'est facturé.
- [ ] Le test vérifie que le total TTC de la commande est de 65 € et le solde restant dû de 45,50 €.
- [ ] Le nom du test contient `CASE_FAC_702`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
