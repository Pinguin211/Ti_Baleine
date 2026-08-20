# CASE-FAC-720 — Non-déclenchement de la facturation en cas de transaction bancaire rejetée ou refusée, sur l'acompte comme sur le solde

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-7`, `Cas limite #3`  
**Type :** sécurité / robustesse  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'intégrité comptable et commerciale en empêchant formellement toute génération de facture (d'acompte ou de solde), tout envoi d'e-mail de confirmation et toute création d'état d'émission lorsqu'une transaction bancaire (celle de l'acompte ou celle du solde) est refusée ou rejetée par l'émetteur de paiement. Si la règle se casse, un client pourrait obtenir une facture « Acompte acquitté » ou « Acquittée » sans avoir effectivement payé l'étape correspondante.

## Cas

```gherkin
Étant donné une réservation en cours de paiement de l'acompte ou du solde
Quand la tentative de paiement par carte bancaire (acompte ou solde) est rejetée ou refusée par la passerelle de paiement
Alors aucun document de facture PDF (d'acompte ou de solde selon l'étape concernée) n'est produit
Et aucun courriel de facturation n'est envoyé
Et aucun statut d'émission de facture n'est créé en base de données pour cette étape de paiement
```

## Données

| Élément | Valeur |
|---|---:|
| Statut du paiement bancaire | Rejeté / Refusé (Échec transactionnel) |
| Montant débité | 0 € |
| Résultat attendu sur la facturation | Aucune action déclenchée |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Factures générées | 0 PDF produit | Conditionné au paiement confirmé |
| Courriels envoyés | 0 courriel transactionnel | Non déclenché |
| Statut de facture en base | Aucun enregistrement créé | Absence de transaction validée |

## Ce que ce cas ne vérifie pas

- l'abandon de panier (couvert par `CASE-FAC-721`) ;
- le paiement en attente (couvert par `CASE-FAC-722`) ;
- le paiement validé (couvert par `CASE-FAC-700`, `CASE-FAC-701`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_720_non_declenchement_facturation_transaction_bancaire_rejetee_acompte_ou_solde`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule une réponse de rejet de paiement bancaire (ex: solde insuffisant, carte expirée) lors du règlement de l'acompte, puis lors du règlement du solde.
- [ ] Le test vérifie qu'aucun service de génération PDF n'est sollicité.
- [ ] Le test vérifie qu'aucun message n'est posté sur le serveur SMTP.
- [ ] Le test vérifie qu'aucun statut d'émission de facture n'existe en base de données.
- [ ] Le nom du test contient `CASE_FAC_720`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
