# CASE-ADMIN-046 — Recalcul instantané en temps réel du nombre de billets actifs et du taux de remplissage lors d'une annulation ou réduction

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Cas limite #3`, `AC-1`, `REQ-107`  
**Type :** acceptation / temps réel  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la réactivité et la justesse en temps réel des jauges et pourcentages après une action de suppression de billets (annulation SPEC-ADMIN-02 ou réduction SPEC-ADMIN-03). Dès que l'action est validée, le planning doit immédiatement recalculer et afficher le nouveau taux.

## Cas

```gherkin
Étant donné un créneau affichant 36/36 places (100 %, complet)
Quand l'administrateur annule une réservation de 6 billets sur ce créneau
Alors le nombre de billets actifs passe immédiatement à 30
Et le taux de remplissage affiché est instantanément recalculé à 83,33 % (30/36)
Et le badge « Complet » disparaît pour laisser place à l'indication « 6 places disponibles »
```

## Données

| Élément | Valeur |
|---|---:|
| État initial | 36/36 (100 % - Complet) |
| Action | Annulation de 6 billets |
| État recalculé | 30/36 (83,33 % - 6 disponibles) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Billets actifs | 30 billets | COUNT(BOOKING_ITEMS) recalculé |
| Taux recalculé | 83,33 % | (30 / 36) × 100 |
| Disponibilité | 6 places | Mise à jour immédiate sans rechargement lourd |

## Ce que ce cas ne vérifie pas

- la libération des places côté site public (couvert par `CASE-ADMIN-015`) ;
- l'envoi du SMS associé (couvert par `CASE-ADMIN-010`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_046_recalcul_instantane_temps_reel_remplissage_apres_annulation`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test positionne le créneau à 36/36.
- [ ] Le test supprime 6 billets.
- [ ] Le test vérifie la mise à jour synchrone de la jauge à 30/36 (83,33 %).
- [ ] Le test s'assure du retrait du badge 'Complet'.
- [ ] Le nom du test contient `CASE_ADMIN_046`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
