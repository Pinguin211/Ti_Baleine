# CASE-ADMIN-012 — Annulation standard d'une réservation hors alerte avec sélection d'un motif informatif et notification SMS

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Portée §4`, `AC-1`, `AC-3`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'annulation standard d'une réservation en conditions nominales (hors période d'alerte météo). Si la règle se casse, l'administrateur ne peut pas saisir de motif informatif ou le SMS d'annulation standard n'est pas envoyé.

## Cas

```gherkin
Étant donné une réservation confirmée de 1 adulte sur un créneau ordinaire sans alerte
Quand l'administrateur procède à l'annulation en sélectionnant le motif standard « Annulation standard hors alerte »
Alors le billet est supprimé de la réservation
Et la place est immédiatement libérée
Et le SMS de notification standard est envoyé au numéro du client
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation | 1 adulte |
| Contexte créneau | Sans alerte météo (nominal) |
| Motif sélectionné | « Annulation standard hors alerte » |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Suppression billets | 1 billet supprimé | Suppression totale de la commande |
| Notification SMS | SMS standard expédié au client | Exigence AC-3 |
| Jauge créneau | +1 place disponible | Exigence AC-2 |

## Ce que ce cas ne vérifie pas

- la vérification des retenues de frais d'annulation client en ligne (couvert par SPEC-CANCEL-03) ;
- le traitement des pré-alertes (couvert par `CASE-ADMIN-010`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_012_annulation_standard_hors_alerte_motif_sms_client`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test exécute l'annulation d'une réservation sur un créneau sans alerte.
- [ ] Le test sélectionne un motif standard.
- [ ] Le test s'assure de l'envoi du SMS et de la suppression du billet.
- [ ] Le nom du test contient `CASE_ADMIN_012`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
