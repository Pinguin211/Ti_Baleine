# CASE-FAC-717 — Enregistrement de l'état d'émission à « envoyée avec succès » avec horodatage en base, indépendamment pour la facture d'acompte et la facture de solde

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-4`, `Scénarios 1 et 2`  
**Type :** traçabilité / base de données  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la traçabilité en base de données de l'émission et de l'envoi réussi de chacune des deux factures (acompte et solde). Si la règle se casse, le système ne saurait pas si l'une ou l'autre facture a été transmise, ou tenterait des réémissions inutiles, rompant la traçabilité exigée par type de facture.

## Cas

```gherkin
Étant donné une réservation pour laquelle le paiement de l'acompte en ligne a été validé
Quand la facture d'acompte PDF est générée à la volée et que le courriel est accepté par le serveur SMTP
Alors un enregistrement de suivi d'émission de la facture d'acompte est créé ou mis à jour en base de données
Et le statut d'émission de la facture d'acompte est égal à « envoyée avec succès » avec un horodatage renseigné
Quand le solde est réglé et que la facture de solde PDF est générée puis le courriel accepté par le serveur SMTP
Alors un enregistrement de suivi d'émission distinct est créé pour la facture de solde
Et le statut d'émission de la facture de solde est égal à « envoyée avec succès » avec son propre horodatage
```

## Données

| Élément | Valeur |
|---|---:|
| Statut du paiement | Acompte puis solde validés |
| Résultat d'envoi du courriel | Succès de transmission (acompte, puis solde) |
| Statut attendu en base | `envoyée avec succès`, enregistré séparément par facture |
| Horodatage | Date et heure de l'envoi, par facture |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut d'émission de la facture d'acompte en base | `envoyée avec succès` | Transmission réussie du courriel d'acompte |
| Statut d'émission de la facture de solde en base | `envoyée avec succès` | Transmission réussie du courriel de solde |
| Horodatages d'émission | Présents, non nuls et distincts pour chaque facture | Un enregistrement par type de facture |

## Ce que ce cas ne vérifie pas

- le traitement d'un échec d'envoi SMTP (couvert par `CASE-FAC-718`) ;
- l'absence de génération si paiement échoué (couvert par `CASE-FAC-720`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_717_enregistrement_etat_emission_succes_avec_horodatage_acompte_et_solde`  
**Fichier :** `tests/tests-unitaires/facturation/CASE-FAC-717.test.ts`

## Revue du test automatisé

- [ ] Le test exécute le flux de facturation de l'acompte avec simulation d'un succès SMTP et interroge la base de données pour la réservation concernée.
- [ ] Le test vérifie que le statut d'émission de la facture d'acompte indique « envoyée avec succès » avec un horodatage non nul.
- [ ] Le test exécute ensuite le flux de facturation du solde avec simulation d'un succès SMTP.
- [ ] Le test vérifie que le statut d'émission de la facture de solde est enregistré indépendamment, avec la mention « envoyée avec succès » et son propre horodatage.
- [ ] Le nom du test contient `CASE_FAC_717`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
