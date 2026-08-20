# CASE-FAC-715 — Facture d'acompte ou de solde transmise en pièce jointe PDF valide du courriel

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-6`, `Portée §4`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la présence effective d'une pièce jointe au format PDF valide dans le courriel transactionnel envoyé au client, que celui-ci soit déclenché par le paiement de l'acompte ou par celui du solde. Si la règle se casse, le courriel pourrait être transmis sans pièce jointe, avec un fichier inaccessible, ou avec la facture correspondant au mauvais événement de paiement.

## Cas

```gherkin
Étant donné une confirmation de paiement réussie (acompte ou solde) déclenchant l'envoi du courriel transactionnel correspondant
Quand le courriel est reçu par le client
Alors le courriel contient une pièce jointe au format PDF
Et la pièce jointe correspond à la facture d'acompte si l'événement déclencheur est le paiement de l'acompte, ou à la facture de solde si l'événement déclencheur est le règlement du solde
```

## Données

| Élément | Valeur |
|---|---:|
| Déclencheur | Confirmation de paiement réussie de l'acompte ou du solde |
| Format de la pièce jointe | Document PDF valide |
| Contenu | Facture d'acompte ou facture de solde de la réservation, selon l'événement de paiement |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Présence de pièce jointe | 1 document joint au format PDF | Règle d'envoi automatique (AC-6) |
| Validité du document | Facture PDF exploitable et non vide, correspondant au bon type (acompte ou solde) | Justificatif de commande |

## Ce que ce cas ne vérifie pas

- les valeurs textuelles spécifiques écrites dans le PDF (couvert par `CASE-FAC-708` à `CASE-FAC-712`) ;
- le corps du courriel (couvert par `CASE-FAC-716`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_715_piece_jointe_pdf_facture_valide`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-715.test.ts`

## Revue du test automatisé

- [ ] Le test intercepte le courriel transactionnel après paiement de l'acompte, puis après règlement du solde.
- [ ] Le test vérifie la présence de la pièce jointe au format PDF dans chacun des deux courriels.
- [ ] Le test vérifie que la pièce jointe correspond à la facture d'acompte (respectivement de solde) émise pour l'événement de paiement testé.
- [ ] Le nom du test contient `CASE_FAC_715`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
