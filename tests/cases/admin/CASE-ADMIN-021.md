# CASE-ADMIN-021 — Garantie de cohérence transactionnelle en cas de coupure réseau lors d'une annulation

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Cas limite #6`, `REQ-107`  
**Type :** intégrité / transactionnel  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'atomicité de la transaction d'annulation (REQ-107). Soit la suppression de tous les billets ET la libération de la jauge sont validées conjointement, soit la transaction est intégralement annulée (rollback), évitant tout état incohérent où des billets seraient supprimés sans libération de places.

## Cas

```gherkin
Étant donné une réservation de 2 billets dont l'annulation est initiée
Et une interruption de connexion à la base de données survenant au milieu de la transaction
Quand la transaction échoue
Alors le système opère un rollback intégral
Et aucun billet n'est partiellement supprimé
Et la jauge du créneau reste strictement inchangée
```

## Données

| Élément | Valeur |
|---|---:|
| Contexte | Transaction d'annulation en cours |
| Incident | Interruption SQL / Crash mi-parcours |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Rollback transactionnel | Exécuté à 100 % | Principe ACID (REQ-107) |
| État billets | 2 billets toujours actifs | Aucune suppression orpheline |
| État jauge | Identique à l'état initial | Aucun décalage de capacité |

## Ce que ce cas ne vérifie pas

- la cohérence lors d'une réduction partielle (couvert par `CASE-ADMIN-031`) ;
- les pannes réseau de consultation (couvert par `CASE-ADMIN-008`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_021_coherence_transactionnelle_annulation_rollback_reseau`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule une exception SQL au cours de la transaction d'annulation.
- [ ] Le test s'assure que le bloc de transaction rollback l'ensemble des opérations.
- [ ] Le test vérifie que le nombre de billets et la jauge restent inchangés.
- [ ] Le nom du test contient `CASE_ADMIN_021`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
