# CASE-ADMIN-047 — Affichage spécifique d'un créneau privatisé indiquant « Navire privatisé » et bloquant la totalité de la jauge

**Spécification :** `SPEC-ADMIN-05`  
**Critère d'acceptation :** `Cas limite #4`, `R-12`  
**Type :** acceptation / règle métier  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège le traitement d'un créneau faisant l'objet d'une privatisation forfaitaire d'un navire (règle R-12). Bien qu'il n'y ait qu'un seul contrat de réservation pour le groupe, la totalité de la capacité du navire est bloquée et le planning affiche distinctement « Navire privatisé » sans détail de places individuelles.

## Cas

```gherkin
Étant donné un créneau horaire réservé au forfait « Privatisation » pour le navire Tikap
Quand l'administrateur consulte le planning
Alors le créneau indique la mention spécifique « Navire privatisé »
Et la jauge bloque l'intégralité des 12 places du navire (0 place restante)
Et aucune réservation individuelle ne peut s'ajouter sur ce créneau (R-12)
```

## Données

| Élément | Valeur |
|---|---:|
| Type de réservation | Privatisation forfaitaire navire |
| Navire concerné | Tikap (12 places) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Libellé affiché | « Navire privatisé » | Cas limite #4 SPEC-ADMIN-05 |
| Blocage capacité | 100 % des places bloquées (0 disponible) | Règle d'exclusivité R-12 |

## Ce que ce cas ne vérifie pas

- la facturation de la privatisation (couvert par le domaine FACTURATION) ;
- la configuration du type privatisation (couvert par `CASE-ADMIN-064`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_047_affichage_specifique_creneau_privatise_blocage_jauge`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test associe une réservation de privatisation à un créneau.
- [ ] Le test vérifie l'affichage de la mention 'Navire privatisé'.
- [ ] Le test confirme que la capacité disponible est à 0.
- [ ] Le nom du test contient `CASE_ADMIN_047`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
