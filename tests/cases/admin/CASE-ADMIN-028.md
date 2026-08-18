# CASE-ADMIN-028 — Rejet strict de toute tentative de modification de la date ou du port lors d'une réduction

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Cas limite #4`, `AC-2`, `R-18`  
**Type :** sécurité / règle métier  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège contre le détournement de l'écran de réduction pour changer la date ou le port de départ (report de date interdit selon R-18). Toute modification de créneau exige l'annulation et une nouvelle souscription.

## Cas

```gherkin
Étant donné l'administrateur réduisant les passagers d'une réservation du 18/08 à Saint-Gilles
Quand il tente simultanément de modifier la date pour le 19/08 ou le port pour Saint-Leu
Alors l'action est formellement bloquée
Et la réservation demeure rattachée à sa date et son port initiaux
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation | 18/08/2026 07:00 Saint-Gilles |
| Paramètres non modifiables | Date, heure, port d'embarquement |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Champs date/port | Verrouillés en lecture seule / Rejet en API | Règle R-18 |
| Créneau d'origine | Préservé sans altération | Intégrité du planning |

## Ce que ce cas ne vérifie pas

- l'annulation complète préalable nécessaire au changement de date (couvert par `CASE-ADMIN-010` ou `CASE-ADMIN-012`) ;
- la réduction simple sans changement de créneau (couvert par `CASE-ADMIN-023`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_028_rejet_strict_modification_date_port_lors_reduction`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test tente de modifier l'id_creneau ou le port lors d'une requête de réduction.
- [ ] Le test vérifie le rejet de la modification de ces champs.
- [ ] Le nom du test contient `CASE_ADMIN_028`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
