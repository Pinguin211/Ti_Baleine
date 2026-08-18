# CASE-ADMIN-014 — Conservation de la fiche réservation en base avec historique de paiement initial et 0 billet actif

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Règle`, `Portée §3`, `AC-1`  
**Type :** conformité / intégrité  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la traçabilité financière et comptable en garantissant qu'une annulation ne supprime JAMAIS la ligne de commande (`BOOKINGS`) en base de données, mais uniquement ses billets (`BOOKING_ITEMS`). Si la règle se casse, la trace des paiements initiaux est détruite, empêchant tout audit comptable.

## Cas

```gherkin
Étant donné une réservation enregistrée avec un paiement initial de 130 € et 2 billets
Quand l'administrateur procède à l'annulation totale de la réservation
Alors l'enregistrement de la table BOOKINGS existe toujours en base de données
Et le montant initial payé (130 €) ainsi que la référence de transaction restent archivés
Et le nombre de billets actifs rattachés est exactement de 0
```

## Données

| Élément | Valeur |
|---|---:|
| ID Réservation | RES-2026-9901 |
| Montant initial réglé | 130 € |
| Billets avant annulation | 2 |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Enregistrement BOOKINGS | Toujours présent en BDD (non supprimé) | Conformité comptable |
| Historique de paiement | Montant initial 130 € intact | Conservation des preuves |
| Décompte BOOKING_ITEMS | 0 billet actif | Suppression des billets |

## Ce que ce cas ne vérifie pas

- la libération des places au planning (couvert par `CASE-ADMIN-015`) ;
- le traitement des remboursements manuels (couvert par `CASE-ADMIN-022`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_014_conservation_fiche_reservation_bdd_historique_0_billet`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test vérifie l'état initial de la réservation en BDD.
- [ ] Le test exécute l'annulation totale.
- [ ] Le test confirme que la requête SELECT sur BOOKINGS renvoie toujours la ligne avec son montant.
- [ ] Le test confirme que la requête SELECT sur BOOKING_ITEMS renvoie 0 ligne.
- [ ] Le nom du test contient `CASE_ADMIN_014`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
