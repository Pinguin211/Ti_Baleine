# CASE-FAC-711 — Mention explicite du port d'embarquement (Saint-Gilles ou Saint-Leu) sur les factures PDF (acompte et solde)

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-3`, `Scénario 1`  
**Type :** conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'exactitude du port d'embarquement mentionné sur la facture PDF, d'acompte comme de solde (« Saint-Gilles » ou « Saint-Leu »). Si la règle se casse, un passager ayant réservé au départ de Saint-Leu pourrait voir affiché le port par défaut (Saint-Gilles) sur l'un de ses documents de facturation et se présenter au mauvais port le jour de l'excursion.

## Cas

```gherkin
Étant donné une réservation individuelle ou privatisée pour laquelle le client a choisi le port de départ « Saint-Leu » (respectivement « Saint-Gilles »)
Quand le paiement en ligne de l'acompte est validé avec succès et la facture d'acompte PDF générée
Alors le document mentionne obligatoirement et sans équivoque le port d'embarquement « Saint-Leu » (respectivement « Saint-Gilles »)
Quand le solde est réglé et que la facture de solde PDF est générée
Alors ce second document mentionne également et sans équivoque le même port d'embarquement
```

## Données

| Élément | Valeur |
|---|---:|
| Port sélectionné | Saint-Leu (variante : Saint-Gilles) |
| Prestation | Sortie Baleines |
| Statut du paiement | Acompte puis solde validés |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Port de départ mentionné sur la facture d'acompte | Saint-Leu (ou Saint-Gilles) | Valeur issue de la réservation confirmée |
| Port de départ mentionné sur la facture de solde | Saint-Leu (ou Saint-Gilles) | Identique, données issues de la même réservation |

## Ce que ce cas ne vérifie pas

- l'application de la majoration géographique associée à Saint-Leu (couvert par `CASE-FAC-712`) ;
- la date et l'horaire (couvert par `CASE-FAC-709`) ;
- l'intitulé de la prestation (couvert par `CASE-FAC-710`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_711_mention_explicite_port_embarquement_sur_factures_acompte_et_solde`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-711.test.ts`

## Revue du test automatisé

- [ ] Le test configure une réservation au départ de Saint-Leu.
- [ ] Le test valide le paiement de l'acompte et vérifie que le port « Saint-Leu » est explicitement extrait de la facture d'acompte générée.
- [ ] Le test règle ensuite le solde et vérifie la même mention sur la facture de solde générée.
- [ ] Le test configure une seconde réservation au départ de Saint-Gilles et vérifie la mention « Saint-Gilles » sur les deux factures.
- [ ] Le nom du test contient `CASE_FAC_711`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
