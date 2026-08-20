# CASE-FAC-708 — Présence obligatoire des mentions explicites « Acompte acquitté » / « Acquittée » et des montants correspondants sur les factures PDF

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-2`, `Règle`  
**Type :** conformité  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la valeur probante des deux documents émis en tant que justificatifs de paiement. Si la règle se casse, la facture d'acompte pourrait être émise sans la mention « Acompte acquitté » (ou porter à tort la mention finale « Acquittée » avant règlement intégral), la facture de solde pourrait ne pas porter la mention « Acquittée », ou les montants (total TTC, acompte réglé, solde restant dû / acquittement complet) pourraient ne pas refléter les sommes effectivement payées.

## Cas

```gherkin
Étant donné une réservation dont le montant total TTC à régler est de 150 €
Quand le paiement en ligne par carte bancaire de l'acompte de 30 % (45 €) est validé avec succès
Alors la facture d'acompte PDF générée comporte obligatoirement et explicitement la mention « Acompte acquitté »
Et la facture d'acompte PDF affiche le montant total TTC (150,00 €), l'acompte réglé (45,00 €) et le solde restant dû (105,00 €)
Quand le solde de 105 € est réglé ultérieurement
Alors la facture de solde distincte PDF générée comporte obligatoirement et explicitement la mention « Acquittée »
Et la facture de solde PDF affiche le rappel de l'acompte perçu (45,00 €) et l'acquittement complet du montant total TTC (150,00 €)
```

## Données

| Élément | Valeur |
|---|---:|
| Montant total TTC de la commande | 150,00 € |
| Acompte réglé par carte bancaire (30 %) | 45,00 € |
| Solde réglé | 105,00 € |
| Mention obligatoire facture d'acompte | Acompte acquitté |
| Mention obligatoire facture de solde | Acquittée |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut sur la facture d'acompte | Mention explicite « Acompte acquitté » | Paiement de l'acompte confirmé |
| Statut sur la facture de solde | Mention explicite « Acquittée » | Règlement intégral confirmé |
| Montant total TTC affiché (2 factures) | 150,00 € | Montant total de la commande |
| Acompte réglé affiché | 45,00 € | 150,00 € × 30 % |
| Solde restant dû affiché sur la facture d'acompte | 105,00 € | 150,00 € − 45,00 € |
| Rappel d'acompte sur la facture de solde | 45,00 € | Montant initialement versé |

## Ce que ce cas ne vérifie pas

- les cas où le paiement a échoué (couvert par `CASE-FAC-720`) ;
- le détail des lignes tarifaires (couvert par `CASE-FAC-704`, `CASE-FAC-705`, `CASE-FAC-712`) ;
- le format et l'unicité des identifiants (couvert par `CASE-FAC-707`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_708_mentions_acompte_acquitte_et_acquittee_montants_ttc_sur_pdf`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-708.test.ts`

## Revue du test automatisé

- [ ] Le test valide le règlement de l'acompte (45 €) d'une réservation de 150 € TTC.
- [ ] Le test vérifie la présence du texte « Acompte acquitté » et des montants (total 150 €, acompte 45 €, solde dû 105 €) sur la facture d'acompte.
- [ ] Le test valide ensuite le règlement du solde (105 €).
- [ ] Le test vérifie la présence du texte « Acquittée » et du rappel d'acompte (45 €) sur la facture de solde.
- [ ] Le nom du test contient `CASE_FAC_708`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
