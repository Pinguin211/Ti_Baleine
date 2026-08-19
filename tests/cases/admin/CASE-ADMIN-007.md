# CASE-ADMIN-007 — Consultation du planning en continu 24h/24 sans restriction horaire

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Cas limite #4`, `Portée §1`  
**Type :** conformité  
**Niveau de risque :** faible

## Ce que ce cas protège

Ce cas protège la disponibilité permanente de la supervision du planning pour l'administrateur. Alors que les réservations en ligne publiques peuvent être restreintes à H-2, l'administrateur doit pouvoir consulter le planning à n'importe quel moment (ex: 23h00, 4h00 du matin) sans verrouillage horaire.

## Cas

```gherkin
Étant donné l'administrateur connecté au back-office à une heure nocturne (ex: 23h45 ou 04h15)
Quand il accède à l'écran du planning
Alors l'ensemble des créneaux passés, présents et futurs de la période s'affiche sans blocage ni restriction
```

## Données

| Élément | Valeur |
|---|---:|
| Heure de consultation | 23:45 / 04:15 |
| Rôle | Administrateur |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Accès planning | Autorisé et immédiat | Cas limite #4 et Portée §1 SPEC-ADMIN-01 |
| Restriction horaire appliquée | Aucune (disponibilité 24h/24) | Règle d'administration |

## Ce que ce cas ne vérifie pas

- la règle de fermeture des ventes publiques à H-2 (couvert par le domaine RÉSERVATION) ;
- l'expiration de session après inactivité (couvert par `CASE-ADMIN-039`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_007_consultation_planning_continu_24h_24_sans_restriction`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule une consultation du planning en horaires décalés (nuit / aube).
- [ ] Le test s'assure qu'aucun verrouillage horaire ne bloque l'affichage.
- [ ] Le test vérifie l'accès complet aux créneaux.
- [ ] Le nom du test contient `CASE_ADMIN_007`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
