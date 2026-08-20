# CASE-FAC-714 — Expédition immédiate du courriel transactionnel (facture d'acompte ou de solde) à l'adresse e-mail renseignée lors de la commande

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-6`, `Règle`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'expédition immédiate et le bon ciblage du courriel transactionnel vers l'adresse e-mail exactement saisie par le client, que le déclencheur soit la validation du paiement de l'acompte ou celle du solde. Si la règle se casse, le courriel ne part pas, part avec un délai anormal, ou est expédié à une mauvaise adresse, pour l'une ou l'autre des deux factures.

## Cas

```gherkin
Étant donné un client ayant renseigné l'adresse de contact « client.exemple@test.re » lors de sa commande
Quand le paiement de l'acompte de sa réservation est validé avec succès
Alors le système déclenche immédiatement l'envoi du courriel transactionnel de la facture d'acompte
Et le destinataire (« To: ») de ce courriel est exactement « client.exemple@test.re »
Quand le solde est réglé ultérieurement
Alors le système déclenche immédiatement l'envoi du courriel transactionnel de la facture de solde
Et le destinataire (« To: ») de ce second courriel est également exactement « client.exemple@test.re »
```

## Données

| Élément | Valeur |
|---|---:|
| Adresse e-mail saisie | `client.exemple@test.re` |
| Événement déclencheur | Confirmation du paiement bancaire de l'acompte, puis du solde |
| Canal de notification | Courriel transactionnel (SMTP) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Destinataire du courriel d'acompte | `client.exemple@test.re` | Adresse fournie lors de la réservation |
| Destinataire du courriel de solde | `client.exemple@test.re` | Identique, même adresse de contact |
| Déclenchement de l'envoi | Immédiat dès validation bancaire (acompte puis solde) | Événement post-paiement |

## Ce que ce cas ne vérifie pas

- la notification par SMS (exclue du périmètre facturation) ;
- le contenu de la pièce jointe (couvert par `CASE-FAC-715`) ;
- la gestion d'un serveur SMTP inaccessible (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_714_expedition_immediate_courriel_transactionnel_adresse_client_acompte_et_solde`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-714.test.ts`

## Revue du test automatisé

- [ ] Le test initialise une commande avec l'e-mail `client.exemple@test.re`.
- [ ] Le test simule la validation du paiement de l'acompte et vérifie que le message SMTP émis a pour `To:` `client.exemple@test.re`.
- [ ] Le test simule ensuite le règlement du solde et vérifie que le second message SMTP émis a également pour `To:` `client.exemple@test.re`.
- [ ] Le nom du test contient `CASE_FAC_714`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
