# CASE-ADMIN-061 — Traitement d'un échec individuel de délivrance lors d'une alerte groupée : journalisation sans blocage de la file

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Cas limite #4`, `REQ-106`  
**Type :** robustesse  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la file d'envoi lors d'une alerte groupée (REQ-106). Si un numéro de téléphone est erroné ou si une adresse e-mail bounce sur un contact, l'incident individuel est consigné dans les logs sans interrompre l'envoi aux dizaines d'autres clients réservataires de la file.

## Cas

```gherkin
Étant donné une alerte groupée envoyée à 25 clients réservataires
Et le 3ème destinataire détenant un numéro de mobile invalide
Quand la file d'envoi s'exécute
Alors l'échec d'envoi du 3ème destinataire est consigné dans les logs applicatifs (REQ-106)
Et la file continue son traitement et délivre l'alerte avec succès aux 24 autres clients réservataires
Et le créneau passe au statut sous pré-alerte
```

## Données

| Élément | Valeur |
|---|---:|
| Destinataires totaux | 25 clients réservataires |
| Incident | 1 numéro erroné parmi les 25 |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Continuité de file | 24 alertes transmises avec succès | Cas limite #4 SPEC-ADMIN-06 |
| Traçabilité de l'erreur | 1 incident consigné dans les logs | REQ-106 |
| État final créneau | SOUS_PRE_ALERTE | Validation globale réussie |

## Ce que ce cas ne vérifie pas

- l'échec individuel lors d'une annulation unitaire (couvert par `CASE-ADMIN-019`) ;
- l'envoi nominal complet sans erreur (couvert par `CASE-ADMIN-048`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_061_traitement_echec_individuel_delivrance_alerte_groupee_log`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test prépare une liste de destinataires incluant un contact invalide.
- [ ] Le test exécute l'alerte groupée.
- [ ] Le test vérifie que tous les contacts valides reçoivent le message.
- [ ] Le test vérifie la journalisation précise de l'erreur sur le contact invalide.
- [ ] Le nom du test contient `CASE_ADMIN_061`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
