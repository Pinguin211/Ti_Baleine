# CASE-ADMIN-017 — Blocage de l'action et désactivation du bouton d'annulation sur une réservation à 0 billet actif

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Cas limite #2`  
**Type :** robustesse / sécurité UI  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège contre les doubles annulations ou les traitements redondants sur une réservation dont tous les billets ont déjà été annulés. Si la règle se casse, des SMS en double peuvent être envoyés ou des erreurs de suppression SQL levées.

## Cas

```gherkin
Étant donné une fiche réservation affichant déjà 0 billet actif (déjà annulée)
Quand l'administrateur consulte cette fiche dans le back-office
Alors le bouton « Annuler toute la réservation » est désactivé et grisé
Et toute tentative d'appel direct à l'API d'annulation renvoie une erreur 400 Bad Request sans réexpédier de SMS
```

## Données

| Élément | Valeur |
|---|---:|
| Réservation | 0 billet actif |
| Action UI / API | Tentative d'annulation |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Bouton UI | Désactivé / non cliquable | Cas limite #2 SPEC-ADMIN-02 |
| Réponse API | Rejet 400 / Action non autorisée | Idempotence et protection |
| SMS émis | 0 second SMS émis | Aucune notification parasite |

## Ce que ce cas ne vérifie pas

- l'annulation initiale de la réservation (couvert par `CASE-ADMIN-010`) ;
- le blocage d'une réduction supplémentaire sur une réservation ayant déjà 0 billet actif (couvert par `CASE-ADMIN-029`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_017_blocage_desactivation_bouton_annulation_reservation_0_billet`  
**Fichier :** tests/tests-unitaires/admin/case-admin-017.test.ts

## Revue du test automatisé

- [ ] Le test charge une réservation ayant 0 billet actif.
- [ ] Le test vérifie l'état désactivé du composant UI d'annulation.
- [ ] Le test simule un POST API direct et vérifie le refus.
- [ ] Le test vérifie qu'aucun nouveau SMS n'a été planifié.
- [ ] Le nom du test contient `CASE_ADMIN_017`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
