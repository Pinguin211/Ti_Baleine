# CASE-ADMIN-057 — Activation immédiate de la mention d'avertissement sur le site public pour les créneaux sous pré-alerte ayant des places ouvertes

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Scénario 1`, `AC-4`, `REQ-019`, `R-25`  
**Type :** acceptation / synchronisation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'information des nouveaux acheteurs potentiels : si un créneau placé sous pré-alerte dispose encore de places ouvertes à la vente, l'interface publique doit afficher un bandeau d'avertissement explicite sur ce créneau afin que tout nouveau client réserve en connaissance de cause.

## Cas

```gherkin
Étant donné un créneau du lendemain disposant de 10 places restantes et passant à l'état « sous pré-alerte »
Quand un client consulte le planning sur le site de réservation public
Alors le créneau affiche distinctement la mention d'avertissement « Sortie sous pré-alerte météo / risque d'annulation »
Et le client est informé du risque avant toute nouvelle réservation
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Sous pré-alerte avec 10 places libres |
| Interface | Site public de réservation |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Mention publique | Bandeau d'avertissement présent sur le créneau | REQ-019, R-25, AC-4 |
| Réservations nouvelles | Autorisées avec mention d'alerte | Transparence client |

## Ce que ce cas ne vérifie pas

- l'affichage du badge sur le back-office admin (couvert par `CASE-ADMIN-003`) ;
- le cas d'un créneau complet (couvert par `CASE-ADMIN-045`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_057_activation_mention_avertissement_site_public_creneau_pre_alerte`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test place un créneau sous pré-alerte avec des places disponibles.
- [ ] Le test interroge l'API publique de réservation.
- [ ] Le test vérifie la présence du flag d'avertissement sur le créneau.
- [ ] Le nom du test contient `CASE_ADMIN_057`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
