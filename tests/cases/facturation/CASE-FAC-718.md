# CASE-FAC-718 — Traitement d'un échec d'envoi SMTP pour la facture d'acompte ou de solde : passage à l'état « échec d'émission » et horodatage en base

**Spécification :** `SPEC-FAC-02`  
**Critère d'acceptation :** `AC-4`, `AC-5`, `Cas limite #1`  
**Type :** robustesse / cas limite  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la traçabilité des incidents de transmission courriel (serveur SMTP indisponible, coupure réseau), que l'incident survienne lors de l'envoi de la facture d'acompte ou de celui de la facture de solde. Si la règle se casse, un échec d'envoi pourrait faire planter le processus, être ignoré ou persister indûment des fichiers sur disque au lieu d'enregistrer l'état d'échec en base, pour le type de facture concerné, afin de permettre une relance ultérieure à la volée.

## Cas

```gherkin
Étant donné une réservation dont le paiement de l'acompte (ou du solde) est validé avec succès
Et un service d'envoi de courriel indisponible (panne SMTP ou coupure réseau)
Quand le système tente d'expédier le courriel avec la facture d'acompte PDF (ou la facture de solde PDF)
Alors l'échec d'envoi est intercepté sans bloquer le processus global
Et l'état d'émission de la facture concernée (acompte ou solde) en base de données passe à « échec d'émission »
Et l'horodatage de la tentative d'émission est enregistré en base pour cette facture
Et aucun fichier PDF physique n'est conservé sur le disque du serveur
```

## Données

| Élément | Valeur |
|---|---:|
| Statut du paiement | Acompte ou solde validé |
| État de l'envoi de courriel | Échec de transmission |
| Statut attendu en base | `échec d'émission`, enregistré pour la facture concernée (acompte ou solde) |
| Horodatage | Date et heure de la tentative |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut d'émission en base | `échec d'émission` pour le type de facture concerné | Enregistrement de l'échec SMTP |
| Horodatage de l'incident | Enregistré en base | Date et heure de la tentative |
| Fichiers sur disque | 0 fichier PDF | Génération en mémoire uniquement (aucun fichier stocké) |

## Ce que ce cas ne vérifie pas

- le rebond après délivrance au serveur SMTP (couvert par `CASE-FAC-719`) ;
- l'envoi SMTP réussi (couvert par `CASE-FAC-717`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_FAC_718_echec_envoi_smtp_passage_statut_echec_emission_acompte_ou_solde`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule un échec de transmission SMTP lors de l'envoi de la facture d'acompte, puis lors de l'envoi de la facture de solde.
- [ ] Le test vérifie que le système gère l'échec sans interrompre le processus global, dans les deux cas.
- [ ] Le test vérifie que le statut d'émission en base de données est mis à « échec d'émission » indépendamment pour la facture d'acompte et pour la facture de solde.
- [ ] Le test vérifie la présence de l'horodatage d'échec en base.
- [ ] Le test s'assure qu'aucun fichier PDF orphelin n'a été créé sur le disque.
- [ ] Le nom du test contient `CASE_FAC_718`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner

