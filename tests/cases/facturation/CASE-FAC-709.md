# CASE-FAC-709 — Présence obligatoire de la date exacte et du créneau horaire de la prestation sur les factures PDF (acompte et solde)

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-3`  
**Type :** conformité  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'exactitude des informations temporelles figurant sur la facture PDF, qu'il s'agisse de la facture d'acompte ou de la facture de solde (date de la sortie et créneau horaire réservé). Si la règle se casse, le client ou l'équipage ne peuvent identifier la date et l'horaire de validité de la prestation sur l'un ou l'autre des deux justificatifs.

## Cas

```gherkin
Étant donné une réservation confirmée pour une sortie prévue le 18/08/2026, créneau 9h00
Quand la facture d'acompte PDF est générée suite à la validation du paiement de l'acompte
Alors le document mentionne explicitement la date et l'horaire au format standard « 18/08/2026 9h00 » (ou « 18/08/2026 » et « 9h00 »)
Quand le solde est réglé et que la facture de solde PDF est générée
Alors ce second document mentionne également la même date et le même horaire au format standard
```

## Données

| Élément | Valeur |
|---|---:|
| Date de la sortie | 18/08/2026 |
| Horaire du créneau | 9h00 |
| Prestation | Sortie Baleines |
| Statut du paiement | Acompte puis solde validés |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Date et horaire sur la facture d'acompte | 18/08/2026 9h00 | Formalisme standard JJ/MM/AAAA HhMM (sans zéro initial, 09h00 non admis) |
| Date et horaire sur la facture de solde | 18/08/2026 9h00 | Identique, données issues de la même réservation |

## Ce que ce cas ne vérifie pas

- l'intitulé de la prestation (couvert par `CASE-FAC-710`) ;
- le port d'embarquement (couvert par `CASE-FAC-711`) ;
- la ventilation tarifaire (couvert par `CASE-FAC-704`, `CASE-FAC-712`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_709_presence_date_et_creneau_horaire_sur_factures_acompte_et_solde`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation pour la date du 18/08/2026 à 9h00.
- [ ] Le test génère la facture d'acompte après confirmation du paiement de l'acompte et vérifie que la date exacte et l'horaire figurent dans le texte du PDF, au format strict sans zéro initial.
- [ ] Le test règle ensuite le solde, génère la facture de solde et vérifie la même date et le même horaire sur ce second document.
- [ ] Le nom du test contient `CASE_FAC_709`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
