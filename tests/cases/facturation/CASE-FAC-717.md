# CASE-FAC-717 — Enregistrement de l'état d'émission à « envoyée avec succès » avec horodatage en base suite à l'envoi SMTP réussi

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-3`, `Scénarios 1 et 2`  
**Type :** traçabilité / base de données  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la traçabilité en base de données de l'émission et de l'envoi réussi de la facture acquittée. Si la règle se casse, le système ne saurait pas si la facture a été transmise ou tenterait des réémissions inutiles, rompant la traçabilité exigée.

## Cas

```gherkin
Étant donné une réservation pour laquelle le paiement en ligne a été validé
Quand la facture PDF est générée à la volée et que le courriel est accepté par le serveur SMTP
Alors un enregistrement de suivi d'émission de facture est créé ou mis à jour en base de données
Et le statut d'émission est égal à « envoyée avec succès »
Et l'horodatage d'émission est renseigné avec la date et l'heure exactes de l'envoi
```

## Données

| Élément | Valeur |
|---|---:|
| Statut du paiement | Validé |
| Résultat d'envoi du courriel | Succès de transmission |
| Statut attendu en base | `envoyée avec succès` |
| Horodatage | Date et heure de l'envoi |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut d'émission en base | `envoyée avec succès` | Transmission réussie du courriel |
| Horodatage d'émission | Présent et non nul | Enregistrement de l'heure d'expédition |

## Ce que ce cas ne vérifie pas

- le traitement d'un échec d'envoi SMTP (couvert par `CASE-FAC-718`) ;
- l'absence de génération si paiement échoué (couvert par `CASE-FAC-720`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_717_enregistrement_etat_emission_succes_avec_horodatage_base`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test exécute le flux complet de facturation avec simulation d'un succès SMTP.
- [ ] Le test interroge la base de données pour la réservation concernée.
- [ ] Le test vérifie que le statut d'émission indique « envoyée avec succès ».
- [ ] Le test vérifie que le champ d'horodatage d'émission n'est pas null et correspond au moment de l'envoi.
- [ ] Le nom du test contient `CASE_FAC_717`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
