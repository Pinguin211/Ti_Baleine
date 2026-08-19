# CASE-ADMIN-006 — Affichage distinctif d'un créneau sans type d'activité avec le statut « type non renseigné »

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Cas limite #3`  
**Type :** robustesse / conformité  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la visibilité des créneaux en ébauche dont l'activité (Baleines, Dauphins, Privatisation) n'a pas encore été fixée. Si la règle se casse, le planning pourrait crasher sur un champ d'activité manquant ou afficher un type par défaut erroné.

## Cas

```gherkin
Étant donné un créneau créé au planning sans type de prestation renseigné
Quand l'administrateur consulte ce créneau au planning
Alors la zone d'activité affiche distinctement le libellé « type non renseigné »
Et la fiche du créneau reste consultable sans plantage
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | 21/08/2026 14:00 — Saint-Gilles |
| Type d'activité | Non renseigné (null) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Libellé d'activité affiché | « type non renseigné » | Cas limite #3 SPEC-ADMIN-01 |
| Stabilité de l'affichage | Créneau rendu sans interruption | Gestion robuste des valeurs nulles |

## Ce que ce cas ne vérifie pas

- la modification du type d'activité (couvert par `CASE-ADMIN-064`) ;
- le contrôle de la règle d'exclusivité (couvert par `CASE-ADMIN-066`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_006_affichage_creneau_sans_activite_type_non_renseigne`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure un créneau sans champ type_activite.
- [ ] Le test vérifie le rendu de la mention 'type non renseigné'.
- [ ] Le test vérifie que la grille reste opérationnelle.
- [ ] Le nom du test contient `CASE_ADMIN_006`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
