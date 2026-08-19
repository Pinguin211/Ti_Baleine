# CASE-ADMIN-027 — Rejet strict de toute tentative d'ajout de billet sur une réservation existante

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Cas limite #1`, `AC-2`, `R-18`  
**Type :** sécurité / règle métier  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'application de la règle R-18 et des contraintes comptables : il est formellement interdit d'ajouter des passagers à une réservation déjà existante depuis le back-office. Tout ajout de passager nécessite une nouvelle commande séparée avec son propre paiement en ligne.

## Cas

```gherkin
Étant donné une réservation existante de 2 personnes
Quand l'administrateur tente d'ajouter 1 passager supplémentaire à cette commande
Alors le système bloque l'action et refuse l'ajout (R-18)
Et un message informe l'administrateur que tout passager supplémentaire doit faire l'objet d'une nouvelle réservation
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation existante | 2 passagers |
| Tentative | Ajout de +1 passager |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut de l'action | Rejetée / Bloquée | Règle R-18 et AC-2 |
| Nombre de billets | Reste strictement à 2 billets | Intégrité de la commande |

## Ce que ce cas ne vérifie pas

- la création d'une nouvelle réservation indépendante ;
- la réduction autorisée (couvert par `CASE-ADMIN-023`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_027_rejet_strict_tentative_ajout_billet_reservation_existante`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test tente de soumettre un payload d'augmentation du nombre de billets.
- [ ] Le test vérifie que l'API renvoie un code de rejet (ex: 422 ou 400).
- [ ] Le test s'assure qu'aucun nouveau billet n'est injecté.
- [ ] Le nom du test contient `CASE_ADMIN_027`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
