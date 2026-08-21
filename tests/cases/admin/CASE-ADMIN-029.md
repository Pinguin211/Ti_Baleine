# CASE-ADMIN-029 — Blocage de l'action de réduction sur une réservation n'ayant déjà plus aucun billet actif

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Cas limite #3`  
**Type :** robustesse / sécurité UI  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège contre toute tentative de réduction sur une réservation déjà à 0 billet (déjà annulée). L'interface et l'API doivent bloquer cette requête pour éviter des incohérences de jauge négative.

## Cas

```gherkin
Étant donné une réservation affichant 0 billet actif
Quand l'administrateur tente d'appliquer une réduction de passagers
Alors l'action est désactivée dans l'interface et rejetée par l'API
Et aucune modification n'est enregistrée
```

## Données

| Élément | Valeur |
|---|---:|
| Billets actifs | 0 billet |
| Action | Demande de réduction |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Comportement UI/API | Bouton indisponible / Rejet 400 | Cas limite #3 SPEC-ADMIN-03 |
| Jauge créneau | Inchangée | Aucune libération fantôme |

## Ce que ce cas ne vérifie pas

- l'annulation sur réservation à 0 billet (couvert par `CASE-ADMIN-017`) ;
- la réduction nominale (couvert par `CASE-ADMIN-023`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_029_blocage_action_reduction_reservation_0_billet_actif`  
**Fichier :** tests/tests-unitaires/admin/case-admin-029.test.ts

## Revue du test automatisé

- [ ] Le test cible une réservation ayant 0 billet.
- [ ] Le test tente de soumettre une réduction.
- [ ] Le test vérifie le blocage de la requête.
- [ ] Le nom du test contient `CASE_ADMIN_029`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
