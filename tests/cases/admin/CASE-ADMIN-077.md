# CASE-ADMIN-077 — Affichage des statuts financiers des réservations sur le détail d'un créneau le jour J

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Scénario 2`, `AC-3`, `REQ-023`, `R-30`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la visibilité, le jour J, du statut financier de chaque réservation inscrite sur un créneau. Si la règle se casse, l'administrateur ne peut pas distinguer en un coup d'œil les réservations soldées de celles ayant encore un solde à encaisser à l'embarcadère, avec un risque de départ sans encaissement du solde dû.

## Cas

```gherkin
Étant donné un créneau affiché sur le planning le jour de la sortie
Et deux réservations inscrites : RES-001 (2 places, soldée) et RES-002 (1 place, acompte versé)
Quand l'administrateur ouvre le détail du créneau
Alors la liste des réservations affiche pour RES-001 le badge vert « Payée complètement » avec un solde dû de 0,00 €
Et la liste des réservations affiche pour RES-002 le badge « Payée partiellement » avec le montant du solde restant dû de 52,50 €
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau consulté | Jour J, détail ouvert |
| RES-001 | 2 places — Payée complètement — solde dû 0,00 € |
| RES-002 | 1 place — Payée partiellement — solde dû 52,50 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Badge RES-001 | « Payée complètement » (vert), solde 0,00 € | Solde intégralement réglé (R-30) |
| Badge RES-002 | « Payée partiellement », solde dû 52,50 € | Acompte versé, solde restant à encaisser |

## Ce que ce cas ne vérifie pas

- l'activité et les navires mobilisés sur le créneau (couvert par `CASE-ADMIN-002`) ;
- l'encaissement effectif du solde par carte bancaire sur place (couvert par `CASE-ADMIN-074`) ;
- le basculement du statut après validation du webhook bancaire en ligne (couvert par `SPEC-PAY`) ;
- le calcul du taux de remplissage (couvert par `CASE-ADMIN-041`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_077_affichage_statuts_financiers_reservations_detail_creneau_jour_j`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test charge un créneau du jour J avec une réservation soldée et une réservation partiellement payée.
- [ ] Le test simule l'ouverture du volet de détail du créneau.
- [ ] Le test vérifie l'affichage du badge vert « Payée complètement » et du solde à 0,00 € pour la réservation soldée.
- [ ] Le test vérifie l'affichage du badge « Payée partiellement » et du montant du solde restant dû pour l'autre réservation.
- [ ] Le nom du test contient `CASE_ADMIN_077`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
