# CASE-FAC-714 — Expédition immédiate du courriel transactionnel à l'adresse e-mail renseignée lors de la commande

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-5`, `Règle`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'expédition immédiate et le bon ciblage du courriel transactionnel contenant la facture acquittée vers l'adresse e-mail exactement saisie par le client. Si la règle se casse, le courriel ne part pas, part avec un délai anormal, ou est expédié à une mauvaise adresse.

## Cas

```gherkin
Étant donné un client ayant renseigné l'adresse de contact « client.exemple@test.re » lors de sa commande
Quand le paiement de sa réservation est validé avec succès
Alors le système déclenche immédiatement l'envoi d'un courriel transactionnel
Et le destinataire (« To: ») de ce courriel est exactement « client.exemple@test.re »
```

## Données

| Élément | Valeur |
|---|---:|
| Adresse e-mail saisie | `client.exemple@test.re` |
| Événement déclencheur | Confirmation du paiement bancaire |
| Canal de notification | Courriel transactionnel (SMTP) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Destinataire du courriel | `client.exemple@test.re` | Adresse fournie lors de la réservation |
| Déclenchement de l'envoi | Immédiat dès validation bancaire | Événement post-paiement |

## Ce que ce cas ne vérifie pas

- la notification par SMS (exclue du périmètre facturation) ;
- le contenu de la pièce jointe (couvert par `CASE-FAC-715`) ;
- la gestion d'un serveur SMTP inaccessible (couvert par `CASE-FAC-718`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_714_expedition_immediate_courriel_transactionnel_adresse_client`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test initialise une commande avec l'e-mail `client.exemple@test.re`.
- [ ] Le test simule la validation du paiement en ligne.
- [ ] Le test intercepte le message SMTP émis et vérifie que le champ `To:` correspond strictement à `client.exemple@test.re`.
- [ ] Le nom du test contient `CASE_FAC_714`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
