# CASE-ADMIN-063 — Réouverture manuelle exceptionnelle d'un créneau précédemment fermé depuis le tableau de bord

**Spécification :** `SPEC-ADMIN-07`  
**Critère d'acceptation :** `AC-1`, `REQ-011`, `R-13`  
**Type :** acceptation / gestion de créneau  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la réouverture d'un créneau qui avait été fermé (ex: fin anticipée d'une opération de maintenance navire). L'administrateur peut rouvrir le créneau qui redevient immédiatement disponible à la réservation en ligne.

## Cas

```gherkin
Étant donné un créneau au statut « FERMÉ »
Quand l'administrateur clique sur « Rouvrir le créneau »
Alors le créneau repasse au statut « OUVERT »
Et le créneau redevient immédiatement visible et sélectionnable sur l'interface publique
```

## Données

| Élément | Valeur |
|---|---:|
| Statut initial | FERMÉ |
| Action | Réouverture administrative |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut final | OUVERT | REQ-011 |
| Visibilité publique | Réactivée sur le site public | Disponibilité rétablie |

## Ce que ce cas ne vérifie pas

- la fermeture initiale (couvert par `CASE-ADMIN-062`) ;
- la modification des navires affectés (couvert par `CASE-ADMIN-065`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_063_reouverture_manuelle_exceptionnelle_creneau_ferme`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test réouvre un créneau fermé.
- [ ] Le test vérifie le passage au statut OUVERT.
- [ ] Le test confirme que le créneau réapparaît sur l'interface publique.
- [ ] Le nom du test contient `CASE_ADMIN_063`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
