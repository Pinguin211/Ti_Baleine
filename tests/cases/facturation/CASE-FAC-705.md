# CASE-FAC-705 — Application de la majoration géographique Saint-Leu (+10 € / personne) sur le profil tarifaire enfant avec ventilation distincte

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-2`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'application systématique du supplément géographique de +10 € par personne à l'ensemble des passagers individuels (y compris les enfants) lors d'un départ depuis Saint-Leu, et sa ventilation transparente sur la facture PDF. Si la règle se casse, le supplément pourrait être omis pour les enfants ou appliqué sans détail compréhensible sur la facture.

## Cas

```gherkin
Étant donné une réservation individuelle pour une sortie « Baleines » au départ de « Saint-Leu »
Et un groupe composé de 1 adulte et 1 enfant
Et des tarifs unitaires de base de 65 € par adulte et 40 € par enfant
Et un supplément géographique de 10 € par personne applicable à chaque passager individuel
Quand le paiement en ligne d'un montant total de 125 € est validé avec succès
Alors une facture acquittée est générée à la volée au format PDF
Et la facture PDF ventile distinctement les montants de base (65 € adulte + 40 € enfant) et les suppléments géographiques (2 × 10 € = 20 €)
Et le montant total TTC affiché sur la facture est de 125 €
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Sortie Baleines |
| Port d'embarquement | Saint-Leu |
| Passagers adultes | 1 |
| Passagers enfants | 1 |
| Base adulte | 65 € |
| Base enfant | 40 € |
| Supplément Saint-Leu adulte | 10 € |
| Supplément Saint-Leu enfant | 10 € |
| Statut du paiement bancaire | validé avec succès |
| Montant total réglé | 125 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Total bases tarifaires | 105 € | (1 × 65 €) + (1 × 40 €) |
| Total suppléments Saint-Leu | 20 € | 2 personnes (1 ad + 1 enf) × 10 € |
| Montant total TTC réglé | 125 € | 105 € + 20 € (ou 75 € + 50 €) |
| Port mentionné sur PDF | Saint-Leu | Port de départ |
| Ventilation sur PDF | Bases et suppléments détaillés | Règle d'exigibilité et clarté de facturation |

## Ce que ce cas ne vérifie pas

- les réservations au départ de Saint-Gilles sans majoration (couvert par `CASE-FAC-702`, `CASE-FAC-704`) ;
- la privatisation forfaitaire à Saint-Leu sans majoration (couvert par `CASE-FAC-706`) ;
- la gestion d'erreurs SMTP (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_705_majoration_saint_leu_sur_profil_enfant_ventilation_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation à Saint-Leu pour 1 adulte et 1 enfant.
- [ ] Le test vérifie l'application du supplément de 10 € sur l'adulte et sur l'enfant.
- [ ] Le test valide le montant total réglé de 125 €.
- [ ] Le test vérifie la présence du port « Saint-Leu » et la ventilation des suppléments sur le PDF.
- [ ] Le test vérifie que le total TTC affiché est de 125 €.
- [ ] Le nom du test contient `CASE_FAC_705`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
