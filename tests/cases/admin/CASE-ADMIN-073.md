# CASE-ADMIN-073 — Comportement lors de la ré-émission d'une alerte sur un créneau déjà sous statut « sous pré-alerte »

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Portée §1`, `Cas limite #6`, `AC-1`, `REQ-017`, `R-25`  
**Type :** acceptation / idempotence  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'ajustement ou la mise à jour d'un message d'alerte déjà envoyé. Si l'administrateur renvoie un message actualisé sur un créneau déjà placé sous pré-alerte, le nouveau message est réexpédié aux clients tout en maintenant l'état « sous pré-alerte » du créneau de façon idempotente.

## Cas

```gherkin
Étant donné un créneau déjà placé à l'état « sous pré-alerte »
Quand l'administrateur sélectionne de nouveau ce créneau, saisit un complément d'information et renvoie l'alerte
Alors le nouveau message actualisé est transmis à tous les clients réservataires
Et le créneau demeure stable à l'état « sous pré-alerte » sans conflit d'état
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial créneau | SOUS_PRE_ALERTE |
| Action | Nouvelle émission d'alerte avec texte actualisé |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Diffusion message | Nouveau texte expédié aux clients réservataires | Information actualisée |
| Statut créneau | Maintien idempotent à SOUS_PRE_ALERTE | Cas limite #6 SPEC-ADMIN-06 |

## Ce que ce cas ne vérifie pas

- la première émission d'alerte (couvert par `CASE-ADMIN-048`) ;
- l'annulation définitive (couvert par `CASE-ADMIN-011`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_073_reemission_alerte_creneau_deja_sous_pre_alerte_idempotence`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test cible un créneau déjà au statut SOUS_PRE_ALERTE.
- [ ] Le test soumet un nouvel envoi d'alerte avec un texte modifié.
- [ ] Le test vérifie la réexpédition du nouveau message et le maintien du statut.
- [ ] Le nom du test contient `CASE_ADMIN_073`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
