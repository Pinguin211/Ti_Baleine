# CASE-ADMIN-064 — Configuration et modification de l'affectation du type d'activité sur un créneau

**Spécification :** `SPEC-ADMIN-07`  
**Critère d'acceptation :** `Portée §2`, `AC-1`  
**Type :** acceptation / configuration  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la configuration du type de prestation affecté à un créneau (Sortie Baleines, Sortie Dauphins, Privatisation). Si la règle se casse, l'activité enregistrée ne correspondrait pas au programme souhaité.

## Cas

```gherkin
Étant donné un créneau configuré sans activité ou en cours d'ajustement
Quand l'administrateur modifie le type d'activité pour « Sortie Baleines »
Alors l'activité est enregistrée sur le créneau
Et la fiche du créneau reflète immédiatement cette affectation au planning
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | 22/08/2026 10:00 Saint-Gilles |
| Activité affectée | Sortie Baleines |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Type d'activité | Sortie Baleines | Champ type_activite mis à jour |
| Planning | Affichage de la prestation associée | Conformité de configuration |

## Ce que ce cas ne vérifie pas

- le contrôle de la règle d'exclusivité (couvert par `CASE-ADMIN-066`) ;
- le contrôle de la présence du naturaliste unique (couvert par `CASE-ADMIN-067`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_064_configuration_modification_affectation_activite_creneau`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test met à jour le type d'activité d'un créneau.
- [ ] Le test vérifie la persistance du nouveau type en base de données.
- [ ] Le nom du test contient `CASE_ADMIN_064`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
