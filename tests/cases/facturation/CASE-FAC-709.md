# CASE-FAC-709 — Présence obligatoire de la date exacte et du créneau horaire de la prestation sur le PDF

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-2`  
**Type :** conformité  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'exactitude des informations temporelles figurant sur la facture PDF acquittée (date de la sortie et créneau horaire réservé). Si la règle se casse, le client ou l'équipage ne peuvent identifier la date et l'horaire de validité de la prestation sur le justificatif.

## Cas

```gherkin
Étant donné une réservation confirmée pour une sortie prévue le 18/08/2026 sur le créneau de 9h00
Quand la facture PDF acquittée est générée suite à la validation du paiement
Alors le document PDF mentionne explicitement la date et l'horaire au format standard « 18/08/2026 9h00 » (ou « 18/08/2026 » et « 9h00 »)
```

## Données

| Élément | Valeur |
|---|---:|
| Date de la sortie | 18/08/2026 |
| Horaire du créneau | 9h00 |
| Prestation | Sortie Baleines |
| Statut du paiement | Validé |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Date et horaire sur PDF | 18/08/2026 9h00 | Formalisme standard JJ/MM/AAAA HhMM (sans zéro initial, 09h00 non admis) |

## Ce que ce cas ne vérifie pas

- l'intitulé de la prestation (couvert par `CASE-FAC-710`) ;
- le port d'embarquement (couvert par `CASE-FAC-711`) ;
- la ventilation tarifaire (couvert par `CASE-FAC-704`, `CASE-FAC-712`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_709_presence_date_et_creneau_horaire_sur_facture_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation pour la date du 18/08/2026 à 9h00.
- [ ] Le test génère la facture après confirmation du paiement.
- [ ] Le test vérifie que la date exacte figure dans le texte du PDF.
- [ ] Le test vérifie que l'horaire du créneau figure au format strict sans zéro initial (ex: « 9h00 » et non « 09h00 »).
- [ ] Le nom du test contient `CASE_FAC_709`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
