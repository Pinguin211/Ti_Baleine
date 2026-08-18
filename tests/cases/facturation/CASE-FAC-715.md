# CASE-FAC-715 — Facture PDF acquittée transmise en pièce jointe valide du courriel

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-5`, `Portée §3`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la présence effective d'une pièce jointe au format PDF valide dans le courriel transactionnel envoyé au client. Si la règle se casse, le courriel pourrait être transmis sans pièce jointe ou avec un fichier inaccessible.

## Cas

```gherkin
Étant donné une confirmation de paiement réussie déclenchant l'envoi du courriel transactionnel
Quand le courriel est reçu par le client
Alors le courriel contient une pièce jointe au format PDF
Et la pièce jointe correspond à la facture acquittée de la réservation
```

## Données

| Élément | Valeur |
|---|---:|
| Déclencheur | Confirmation de paiement réussie |
| Format de la pièce jointe | Document PDF valide |
| Contenu | Facture acquittée de la réservation |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Présence de pièce jointe | 1 document joint au format PDF | Règle d'envoi automatique (AC-5) |
| Validité du document | Facture PDF exploitable et non vide | Justificatif de commande |

## Ce que ce cas ne vérifie pas

- les valeurs textuelles spécifiques écrites dans le PDF (couvert par `CASE-FAC-708` à `CASE-FAC-712`) ;
- le corps du courriel (couvert par `CASE-FAC-716`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_715_piece_jointe_pdf_facture_valide`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test intercepte le courriel transactionnel après paiement.
- [ ] Le test vérifie la présence de la pièce jointe au format PDF.
- [ ] Le test vérifie que la pièce jointe correspond à la facture acquittée de la commande.
- [ ] Le nom du test contient `CASE_FAC_715`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
