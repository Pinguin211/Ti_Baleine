# CASE-ADMIN-019 — Traitement d'un numéro mobile client invalide ou manquant lors de l'annulation

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Cas limite #4`, `REQ-106`  
**Type :** robustesse  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la transaction métier en cas d'impossibilité d'émettre le SMS (numéro erroné ou absent). La suppression des billets et la libération de la jauge doivent quand même s'exécuter, tandis que l'échec d'envoi SMS est consigné dans les logs applicatifs sans interrompre le flux.

## Cas

```gherkin
Étant donné une réservation avec un numéro mobile client erroné (« 00000000 »)
Quand l'administrateur valide l'annulation de la réservation
Alors la suppression des billets et la libération des places sont validées en base
Et l'échec d'émission du SMS est capturé et tracé dans les logs applicatifs (REQ-106)
Et un message d'alerte signale à l'administrateur que le SMS n'a pas pu être transmis
```

## Données

| Élément | Valeur |
|---|---:|
| Numéro mobile | « 00000000 » (format invalide) |
| Action | Annulation totale |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Suppression billets | Exécutée avec succès | Priorité à l'intégrité de la jauge |
| Places libérées | Remises à disposition | Jauge recalculée |
| Envoi SMS | Échoué, journalisé dans les logs | Conformité REQ-106 |
| Message back-office | Avertissement d'échec SMS pour l'admin | Information administrateur |

## Ce que ce cas ne vérifie pas

- l'envoi nominal réussi du SMS (couvert par `CASE-ADMIN-010`) ;
- la panne générale de la passerelle SMS (couvert par `CASE-ADMIN-020`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_019_traitement_numero_mobile_invalide_annulation_log_echec`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test fournit un numéro de téléphone non valide.
- [ ] Le test exécute l'annulation.
- [ ] Le test vérifie que les billets sont bien supprimés en base.
- [ ] Le test vérifie la présence d'une entrée de log d'erreur SMS.
- [ ] Le nom du test contient `CASE_ADMIN_019`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
