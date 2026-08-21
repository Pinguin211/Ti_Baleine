# CASE-ADMIN-069 — Rejet et blocage à la saisie lors d'une tentative de suppression d'un nombre de billets supérieur aux billets actifs

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `AC-1`, `REQ-015`, `R-18`, `REQ-107`  
**Type :** robustesse / sécurité UI  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège contre la saisie de quantités aberrantes ou supérieures au total de billets détenus (ex. demander le retrait de 3 billets adultes alors que la réservation n'en comporte que 2). Si la règle se casse, la base de données peut corrompre ses compteurs ou générer des jauges artificiellement supérieures à la capacité du navire.

## Cas

```gherkin
Étant donné une réservation comportant 2 billets adultes et 0 billet enfant
Quand l'administrateur saisit une demande de retrait de 3 billets adultes
Alors le formulaire bloque la validation côté client
Et toute requête API directe avec une quantité excédentaire est rejetée avec une erreur 422 Unprocessable Entity
Et le nombre de billets reste inchangé à 2
```

## Données

| Élément | Valeur |
|---|---:|
| Billets actifs réels | 2 adultes |
| Quantité demandée au retrait | 3 adultes |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Contrôle de saisie | Champ limité au maximum de 2 / Validation bloquée | Contrôle d'intégrité |
| Réponse API | Code 422 / Message 'Quantité de billets à retirer supérieure au solde actif' | Sécurité back-end |
| Billets en BDD | 2 billets intacts | Aucune altération |

## Ce que ce cas ne vérifie pas

- la réduction nominale valide (couvert par `CASE-ADMIN-023`) ;
- le retrait ramenant exactement à 0 billet (couvert par `CASE-ADMIN-026`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_069_rejet_suppression_nombre_billets_superieur_solde_actif`  
**Fichier :** tests/tests-unitaires/admin/case-admin-069.test.ts

## Revue du test automatisé

- [ ] Le test initialise une réservation de 2 billets.
- [ ] Le test tente de supprimer 3 billets via l'API.
- [ ] Le test vérifie la réponse d'erreur 422.
- [ ] Le test s'assure que la réservation conserve 2 billets.
- [ ] Le nom du test contient `CASE_ADMIN_069`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
