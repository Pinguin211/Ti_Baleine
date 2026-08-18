# CASE-FAC-711 — Mention explicite du port d'embarquement (Saint-Gilles ou Saint-Leu) sur la facture PDF

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-2`, `Scénario 1`  
**Type :** conformité  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'exactitude du port d'embarquement mentionné sur la facture PDF (« Saint-Gilles » ou « Saint-Leu »). Si la règle se casse, un passager ayant réservé au départ de Saint-Leu pourrait voir affiché le port par défaut (Saint-Gilles) sur son document de facturation et se présenter au mauvais port le jour de l'excursion.

## Cas

```gherkin
Étant donné une réservation individuelle ou privatisée pour laquelle le client a choisi le port de départ « Saint-Leu » (respectivement « Saint-Gilles »)
Quand le paiement en ligne est validé avec succès et la facture PDF générée
Alors le document PDF mentionne obligatoirement et sans équivoque le port d'embarquement « Saint-Leu » (respectivement « Saint-Gilles »)
```

## Données

| Élément | Valeur |
|---|---:|
| Port sélectionné | Saint-Leu (variante : Saint-Gilles) |
| Prestation | Sortie Baleines |
| Statut du paiement | Validé |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Port de départ mentionné sur PDF | Saint-Leu (ou Saint-Gilles) | Valeur issue de la réservation confirmée |

## Ce que ce cas ne vérifie pas

- l'application de la majoration géographique associée à Saint-Leu (couvert par `CASE-FAC-712`) ;
- la date et l'horaire (couvert par `CASE-FAC-709`) ;
- l'intitulé de la prestation (couvert par `CASE-FAC-710`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_711_mention_explicite_port_embarquement_sur_facture_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation au départ de Saint-Leu.
- [ ] Le test vérifie que le port d'embarquement « Saint-Leu » est explicitement extrait du document PDF généré.
- [ ] Le test configure une seconde réservation au départ de Saint-Gilles et vérifie la mention « Saint-Gilles ».
- [ ] Le nom du test contient `CASE_FAC_711`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
