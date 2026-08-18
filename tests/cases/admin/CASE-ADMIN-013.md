# CASE-ADMIN-013 — Non-persistance du motif d'annulation sur l'entité réservation en base

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Règle`, `Portée §4`, `AC-1`, `REQ-020`  
**Type :** conformité / architecture  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'architecture de la base de données selon laquelle le motif d'annulation saisi par l'administrateur n'est pas persisté sur la table BOOKINGS mais exploité exclusivement à la volée pour composer le corps du SMS envoyé au client. Si la règle se casse, le schéma de base de données est violé ou des données non prévues sont écrites en base.

## Cas

```gherkin
Étant donné l'administrateur annulant une réservation avec le motif « Raison médicale client »
Quand la transaction d'annulation est validée avec succès
Alors le motif est injecté dans le message SMS transmis à la passerelle
Et aucun champ « motif_annulation » n'est persisté sur la table BOOKINGS en base de données
```

## Données

| Élément | Valeur |
|---|---:|
| Motif saisi | « Raison médicale client » |
| Table cible | BOOKINGS |
| Comportement attendu | Utilisation éphémère à la volée pour SMS |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| SMS généré | Contient la mention du motif | Composition à la volée |
| Colonnes table BOOKINGS | Aucune modification de champ motif en base | Non-persistance (SPEC-ADMIN-02) |

## Ce que ce cas ne vérifie pas

- la conservation de l'historique comptable de réservation (couvert par `CASE-ADMIN-014`) ;
- l'envoi effectif du SMS (couvert par `CASE-ADMIN-010`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_013_non_persistance_motif_annulation_table_bookings`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test annule une réservation avec un motif textuel spécifique.
- [ ] Le test vérifie la présence du motif dans le payload SMS.
- [ ] Le test inspecte l'enregistrement en base de données et vérifie l'absence de persistance du motif.
- [ ] Le nom du test contient `CASE_ADMIN_013`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
