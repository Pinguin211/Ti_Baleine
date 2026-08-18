# CASE-FAC-708 — Présence obligatoire de la mention explicite « Acquittée » et du montant total TTC réglé sur le PDF

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `Règle`  
**Type :** conformité  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la valeur probante du document émis en tant que justificatif de paiement acquitté. Si la règle se casse, la facture pourrait être émise sans mention du règlement effectué (« Facture » simple au lieu de « Facture acquittée ») ou avec un montant TTC ne reflétant pas la somme effectivement payée par carte bancaire.

## Cas

```gherkin
Étant donné une réservation dont le montant total à régler est de 150 €
Quand le paiement en ligne par carte bancaire de 150 € est validé avec succès
Alors la facture PDF générée comporte obligatoirement et explicitement la mention « Acquittée »
Et la facture PDF affiche le montant total TTC réglé égal exactement à 150,00 €
```

## Données

| Élément | Valeur |
|---|---:|
| Montant réglé par carte bancaire | 150,00 € |
| Statut du paiement | Validé |
| Mention obligatoire requise | Acquittée |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut du document sur PDF | Facture acquittée (ou mention explicite « Acquittée ») | Paiement en ligne confirmé |
| Montant total TTC affiché | 150,00 € | Montant exactement débité |

## Ce que ce cas ne vérifie pas

- les cas où le paiement a échoué (couvert par `CASE-FAC-720`) ;
- le détail des lignes tarifaires (couvert par `CASE-FAC-704`, `CASE-FAC-705`, `CASE-FAC-712`) ;
- le format de l'identifiant (couvert par `CASE-FAC-707`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_708_mention_acquittee_et_montant_ttc_regle_sur_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test valide le règlement d'une réservation pour un montant de 150 €.
- [ ] Le test vérifie la présence du texte « Acquittée » dans le document PDF généré.
- [ ] Le test vérifie que le montant total TTC présent sur le PDF correspond strictement au montant réglé (150,00 €).
- [ ] Le nom du test contient `CASE_FAC_708`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
