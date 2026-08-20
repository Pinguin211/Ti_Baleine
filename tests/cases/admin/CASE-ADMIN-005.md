# CASE-ADMIN-005 — Affichage distinctif d'un créneau sans navire affecté avec le statut « non affecté »

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Cas limite #2`  
**Type :** robustesse / conformité  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'identification des créneaux incomplets où aucun navire n'a encore été alloué. Si la règle se casse, un créneau sans navire pourrait être masqué ou afficher une capacité nulle erronée sans explication claire pour l'administrateur.

## Cas

```gherkin
Étant donné un créneau horaire créé pour le 20 août 2026 à 10h00 sans aucun navire affecté
Quand l'administrateur consulte le planning
Alors le créneau apparaît dans la grille avec la mention explicite « non affecté » dans la section navire
Et une indication visuelle invite l'administrateur à compléter l'affectation
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | 20/08/2026 10:00 — Saint-Gilles |
| Navire affecté | Aucun (null) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut navire affiché | « non affecté » | Cas limite #2 SPEC-ADMIN-01 |
| Comportement UI | Visible sur la grille avec libellé distinctif | Supervision claire |

## Ce que ce cas ne vérifie pas

- l'attribution d'un navire au créneau (couvert par `CASE-ADMIN-065`) ;
- l'affichage d'un créneau complet à 100 % (couvert par `CASE-ADMIN-045`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_005_affichage_distinctif_creneau_sans_navire_non_affecte`  
**Fichier :** tests/tests-unitaires/admin/case-admin-005.test.ts

## Revue du test automatisé

- [ ] Le test crée un créneau dont l'attribut navire est null ou vide.
- [ ] Le test charge le planning administrateur.
- [ ] Le test vérifie que le statut 'non affecté' est rendu dans l'encart navire.
- [ ] Le nom du test contient `CASE_ADMIN_005`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
