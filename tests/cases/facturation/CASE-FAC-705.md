# CASE-FAC-705 — Application de la majoration géographique Saint-Leu (+10 € / personne) sur le profil tarifaire enfant, avec ventilation distincte sur la facture d'acompte

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-1`, `AC-3`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'application systématique du supplément géographique de +10 € par personne à l'ensemble des passagers individuels (y compris les enfants) lors d'un départ depuis Saint-Leu, et sa ventilation transparente sur la facture d'acompte PDF. Si la règle se casse, le supplément pourrait être omis pour les enfants, appliqué sans détail compréhensible, ou le montant de l'acompte calculé sur un total erroné.

## Cas

```gherkin
Étant donné une réservation individuelle pour une sortie « Baleines » au départ de « Saint-Leu »
Et un groupe composé de 1 adulte et 1 enfant
Et des tarifs unitaires de base de 65 € par adulte et 40 € par enfant
Et un supplément géographique de 10 € par personne applicable à chaque passager individuel (montant total TTC de la commande : 125 €)
Quand le paiement en ligne de l'acompte de 30 % (37,50 €) est validé avec succès
Alors la facture d'acompte PDF est générée à la volée avec la mention explicite « Acompte acquitté »
Et la facture PDF ventile distinctement les montants de base (65 € adulte + 40 € enfant) et les suppléments géographiques (2 × 10 € = 20 €)
Et le montant total TTC de la commande affiché sur la facture est de 125 €, l'acompte réglé de 37,50 € et le solde restant dû de 87,50 €
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
| Montant total TTC de la commande | 125 € |
| Taux d'acompte (standard) | 30 % |
| Acompte réglé | 37,50 € |
| Solde restant dû | 87,50 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Total bases tarifaires | 105 € | (1 × 65 €) + (1 × 40 €) |
| Total suppléments Saint-Leu | 20 € | 2 personnes (1 ad + 1 enf) × 10 € |
| Montant total TTC de la commande | 125 € | 105 € + 20 € |
| Acompte (30 %) | 37,50 € | 125 € × 30 % |
| Solde restant dû après acompte | 87,50 € | 125 € − 37,50 € |
| Port mentionné sur PDF | Saint-Leu | Port de départ |
| Ventilation sur PDF | Bases et suppléments détaillés | Règle d'exigibilité et clarté de facturation |
| Mention sur la facture d'acompte | Acompte acquitté | Validation du paiement de l'acompte |

## Ce que ce cas ne vérifie pas

- les réservations au départ de Saint-Gilles sans majoration (couvert par `CASE-FAC-702`, `CASE-FAC-704`) ;
- la privatisation forfaitaire à Saint-Leu sans majoration (couvert par `CASE-FAC-706`) ;
- le règlement du solde et la facture de solde distincte (couvert par `CASE-FAC-700`, `CASE-FAC-701`) ;
- la gestion d'erreurs SMTP (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_705_majoration_saint_leu_sur_profil_enfant_facture_acompte`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-705.test.ts`

## Revue du test automatisé

- [ ] Le test configure une réservation à Saint-Leu pour 1 adulte et 1 enfant.
- [ ] Le test vérifie l'application du supplément de 10 € sur l'adulte et sur l'enfant (total TTC de la commande : 125 €).
- [ ] Le test simule la validation du paiement de l'acompte de 37,50 € (30 %).
- [ ] Le test vérifie la présence du port « Saint-Leu », de la mention « Acompte acquitté » et la ventilation des suppléments sur le PDF.
- [ ] Le test vérifie que le total TTC de la commande est de 125 € et le solde restant dû de 87,50 €.
- [ ] Le nom du test contient `CASE_FAC_705`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
