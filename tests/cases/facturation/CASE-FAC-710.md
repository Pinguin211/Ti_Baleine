# CASE-FAC-710 — Présence obligatoire de l'intitulé exact de la prestation sur le PDF

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-2`  
**Type :** conformité  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la fidélité de l'intitulé de la prestation rendu sur la facture PDF par rapport à l'activité effectivement choisie par le client (« Sortie Baleines », « Sortie Dauphins », ou « Privatisation »). Si la règle se casse, un intitulé générique ou erroné pourrait induire une ambiguïté sur le service acheté.

## Cas

```gherkin
Étant donné une réservation confirmée pour une prestation de type « Baleines » (respectivement « Dauphins » ou « Privatisation »)
Quand la facture PDF acquittée est générée à la volée après paiement
Alors le document PDF mentionne obligatoirement et explicitement l'intitulé exact de l'activité réservée
```

## Données

| Élément | Valeur |
|---|---:|
| Activité testée | Sortie Baleines (ou Dauphins / Privatisation) |
| Déclencheur | Validation du paiement |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Libellé de la prestation sur PDF | Sortie Baleines (ou Dauphins / Privatisation) | Correspondance exacte avec l'activité réservée |

## Ce que ce cas ne vérifie pas

- le port d'embarquement (couvert par `CASE-FAC-711`) ;
- la date et l'horaire (couvert par `CASE-FAC-709`) ;
- les montants tarifaires (couvert par `CASE-FAC-700` à `CASE-FAC-706`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_710_presence_intitule_exact_prestation_sur_facture_pdf`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test crée une réservation avec une activité spécifique (ex: Baleines).
- [ ] Le test valide le paiement et génère la facture PDF.
- [ ] Le test extrait le texte du PDF et vérifie la présence de l'intitulé exact de la prestation.
- [ ] Le nom du test contient `CASE_FAC_710`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
