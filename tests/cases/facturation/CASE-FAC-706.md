# CASE-FAC-706 — Émission des factures d'acompte et de solde d'une privatisation forfaitaire au départ de Saint-Leu sans application de majoration géographique

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `AC-3`, `Scénario 2`, `Cas limite #5`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège à la fois l'invariance du tarif forfaitaire lors d'une privatisation sur le navire Tikap au départ du port de Saint-Leu (600 €, sans majoration géographique par passager) et le flux à deux factures distinctes (acompte 50 % puis solde) applicable à cette formule. Si la règle se casse, le système pourrait indûment ajouter une majoration géographique par passager (ex: 12 passagers × 10 € = +120 €) alors que la formule privatisation est un forfait fixe exempt de majoration géographique, ou pourrait émettre une facture unique acquittée au lieu des deux factures distinctes requises.

## Cas

```gherkin
Étant donné une réservation pour une prestation « Privatisation demi-journée matin » sur le Tikap
Et un port de départ situé à « Saint-Leu » (mardi ou jeudi matin)
Et un montant forfaitaire de 600 € applicable à la privatisation, sans majoration géographique par passager
Quand le paiement en ligne de l'acompte de 50 % (300 €) est confirmé
Alors la facture d'acompte PDF est générée à la volée avec un identifiant unique, la mention explicite « Acompte acquitté », le montant total (600 €), l'acompte réglé (300 €) et le solde restant dû (300 €)
Et la facture d'acompte PDF mentionne le port d'embarquement « Saint-Leu » et la ligne forfaitaire unique sans aucun supplément géographique par passager
Quand le solde de 300 € est réglé (en ligne via le lien SMS ou sur place en CB)
Alors la facture de solde distincte PDF est générée à la volée avec un identifiant unique distinct, la mention explicite « Acquittée », le rappel de l'acompte (300 €) et l'acquittement complet des 600 €
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Privatisation demi-journée matin |
| Navire | Tikap |
| Port d'embarquement | Saint-Leu |
| Type de tarif | Forfait global navire |
| Majoration par passager | 0 € |
| Montant total TTC | 600 € |
| Taux d'acompte (privatisation) | 50 % |
| Acompte réglé | 300 € |
| Solde restant dû | 300 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Forfait de privatisation | 600 € | Tarif forfaitaire Tikap |
| Majoration géographique | 0 € | Forfait fixe sans supplément par passager |
| Acompte (50 %) | 300 € | 600 € × 50 % |
| Solde restant dû après acompte | 300 € | 600 € − 300 € |
| Port mentionné sur les 2 PDF | Saint-Leu | Port de départ sélectionné |
| Mention sur la facture d'acompte | Acompte acquitté | Paiement de l'acompte validé |
| Mention sur la facture de solde | Acquittée | Règlement intégral du solde |

## Ce que ce cas ne vérifie pas

- les réservations individuelles à Saint-Leu qui comportent une majoration de 10 €/pers (couvert par `CASE-FAC-700`, `CASE-FAC-705`, `CASE-FAC-712`) ;
- la privatisation au départ de Saint-Gilles (couvert par `CASE-FAC-701`) ;
- les transactions bancaires refusées ou interrompues, sur l'acompte comme sur le solde (couvert par `CASE-FAC-720`, `CASE-FAC-721`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_706_facturation_acompte_solde_privatisation_saint_leu_sans_majoration`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une privatisation du Tikap au départ de Saint-Leu à 600 €.
- [ ] Le test vérifie qu'aucun supplément par passager n'est calculé.
- [ ] Le test simule la validation du paiement de l'acompte de 300 € (50 %) et vérifie la facture d'acompte (mention « Acompte acquitté », total 600 €, acompte 300 €, solde dû 300 €, port « Saint-Leu », absence de majoration géographique).
- [ ] Le test simule le règlement du solde de 300 € et vérifie la facture de solde distincte (mention « Acquittée », rappel acompte 300 €, acquittement 600 €).
- [ ] Le test vérifie que les deux factures possèdent des identifiants uniques distincts.
- [ ] Le nom du test contient `CASE_FAC_706`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
