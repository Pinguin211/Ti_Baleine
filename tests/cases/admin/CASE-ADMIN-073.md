# CASE-ADMIN-073 — Rejet strict de la ré-émission d'une alerte sur un créneau déjà sous statut « sous pré-alerte »

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Portée §2`, `Cas limite #6`, `AC-1`, `REQ-017`, `R-22`, `R-24`, `R-25`  
**Type :** rejet / cas limite  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la règle anti-spam et de maîtrise des coûts d'envoi : un créneau ne peut faire l'objet que d'une seule et unique pré-alerte. Si la règle se casse, un créneau déjà sous pré-alerte reste sélectionnable pour un nouvel envoi, un second message est expédié aux mêmes clients réservataires (spam / surcoût SMS-e-mail) et l'idempotence de statut n'est plus garantie.

## Cas

```gherkin
Étant donné un créneau déjà placé à l'état « sous pré-alerte »
Quand l'administrateur tente de sélectionner de nouveau ce créneau pour lui envoyer une alerte
Alors le créneau n'est plus sélectionnable pour un nouvel envoi
Et toute tentative de validation de l'envoi est bloquée / rejetée
Et aucun nouveau message n'est expédié aux clients réservataires
Et le créneau demeure stable à l'état « sous pré-alerte »
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial créneau | SOUS_PRE_ALERTE |
| Action tentée | Nouvelle sélection / nouvel envoi d'alerte sur le même créneau |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Sélection du créneau | Impossible (créneau non sélectionnable) | Cas limite #6 SPEC-ADMIN-06 |
| Envoi | Bloqué / rejeté | Une seule pré-alerte autorisée par créneau |
| Diffusion message | Aucun message expédié | Anti-spam / maîtrise des coûts (R-22, R-24) |
| Statut créneau | Inchangé, maintenu à SOUS_PRE_ALERTE | Idempotence de statut |

## Ce que ce cas ne vérifie pas

- la première émission d'alerte sur un créneau sans pré-alerte préalable (couvert par `CASE-ADMIN-048`) ;
- l'annulation définitive d'une réservation (couvert par `CASE-ADMIN-011`) ;
- l'affichage du badge « Sous pré-alerte » sur le planning (couvert par `CASE-ADMIN-003`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_073_rejet_reemission_alerte_creneau_deja_sous_pre_alerte`  
**Fichier :** tests/tests-unitaires/admin/case-admin-073.test.ts

## Revue du test automatisé

- [ ] Le test cible un créneau déjà au statut SOUS_PRE_ALERTE.
- [ ] Le test vérifie que le créneau n'est pas proposé/sélectionnable pour un nouvel envoi.
- [ ] Le test tente malgré tout de forcer la validation de l'envoi et vérifie le rejet strict de l'action.
- [ ] Le test s'assure qu'aucun SMS/e-mail supplémentaire n'a été expédié.
- [ ] Le test vérifie que le statut du créneau reste inchangé (SOUS_PRE_ALERTE).
- [ ] Le nom du test contient `CASE_ADMIN_073`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
