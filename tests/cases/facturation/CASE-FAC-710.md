# CASE-FAC-710 — Présence obligatoire de l'intitulé exact de la prestation sur les factures PDF (acompte et solde)

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-3`  
**Type :** conformité  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la fidélité de l'intitulé de la prestation rendu sur la facture PDF, d'acompte comme de solde, par rapport à l'activité effectivement choisie par le client (« Sortie Baleines », « Sortie Dauphins », ou « Privatisation »). Si la règle se casse, un intitulé générique ou erroné pourrait induire une ambiguïté sur le service acheté, sur l'un ou l'autre des deux documents.

## Cas

```gherkin
Étant donné une réservation confirmée pour une prestation de type « Baleines » (respectivement « Dauphins » ou « Privatisation »)
Quand la facture d'acompte PDF est générée à la volée après paiement de l'acompte
Alors le document mentionne obligatoirement et explicitement l'intitulé exact de l'activité réservée
Quand le solde est réglé et que la facture de solde PDF est générée
Alors ce second document mentionne également le même intitulé exact de l'activité réservée
```

## Données

| Élément | Valeur |
|---|---:|
| Activité testée | Sortie Baleines (ou Dauphins / Privatisation) |
| Déclencheur | Validation du paiement de l'acompte, puis du solde |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Libellé de la prestation sur la facture d'acompte | Sortie Baleines (ou Dauphins / Privatisation) | Correspondance exacte avec l'activité réservée |
| Libellé de la prestation sur la facture de solde | Sortie Baleines (ou Dauphins / Privatisation) | Identique, données issues de la même réservation |

## Ce que ce cas ne vérifie pas

- le port d'embarquement (couvert par `CASE-FAC-711`) ;
- la date et l'horaire (couvert par `CASE-FAC-709`) ;
- les montants tarifaires (couvert par `CASE-FAC-700` à `CASE-FAC-706`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_710_presence_intitule_exact_prestation_sur_factures_acompte_et_solde`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-710.test.ts`

## Revue du test automatisé

- [ ] Le test crée une réservation avec une activité spécifique (ex: Baleines).
- [ ] Le test valide le paiement de l'acompte, génère la facture d'acompte et vérifie la présence de l'intitulé exact de la prestation.
- [ ] Le test règle ensuite le solde, génère la facture de solde et vérifie le même intitulé sur ce second document.
- [ ] Le nom du test contient `CASE_FAC_710`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
