# CASE-ADMIN-066 — Blocage strict de toute tentative d'affecter deux activités différentes sur le même navire et même créneau

**Spécification :** `SPEC-ADMIN-07`  
**Critère d'acceptation :** `Cas limite #1`, `AC-2`, `R-12`  
**Type :** sécurité / règle métier  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la règle d'exclusivité stricte de l'activité (règle R-12) : un navire mobilisé sur un créneau donné ne peut exécuter qu'une seule et unique activité (ex: interdiction d'embarquer des passagers Baleines et des passagers Dauphins sur le même bateau).

## Cas

```gherkin
Étant donné le navire « Grand Bleu » affecté à une « Sortie Baleines » sur le créneau de 10h00
Quand l'administrateur tente d'affecter simultanément l'activité « Sortie Dauphins » sur ce même navire à 10h00
Alors le système bloque formellement la configuration (R-12)
Et affiche le message « Règle d'exclusivité : un navire ne peut accueillir qu'une seule activité par créneau »
```

## Données

| Élément | Valeur |
|---|---:|
| Navire | Grand Bleu |
| Créneau | 10:00 |
| Activité 1 déjà configurée | Sortie Baleines |
| Activité 2 tentée | Sortie Dauphins (mixité interdite) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Validation | Bloquée avec erreur d'exclusivité | Règle R-12 et AC-2 |
| État du navire | Reste exclusivement affecté aux Baleines | Intégrité opérationnelle |

## Ce que ce cas ne vérifie pas

- l'affectation de deux navires distincts chacun sur une activité différente ;
- le conflit de naturaliste (couvert par `CASE-ADMIN-067`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_066_blocage_mixite_activites_meme_navire_creneau_exclusivite`  
**Fichier :** tests/tests-unitaires/admin/case-admin-066.test.ts

## Revue du test automatisé

- [ ] Le test tente de configurer deux activités simultanées sur le même navire au même créneau.
- [ ] Le test vérifie que l'opération est formellement rejetée par le back-end.
- [ ] Le nom du test contient `CASE_ADMIN_066`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
