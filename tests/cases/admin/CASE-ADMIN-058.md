# CASE-ADMIN-058 — Désactivation du bouton de déclenchement d'envoi lorsqu'aucun créneau du lendemain n'est sélectionné

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Cas limite #1`  
**Type :** robustesse / UI  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège contre l'envoi d'alertes à vide : tant qu'aucun créneau n'est coché dans la liste, le bouton d'expédition doit rester désactivé.

## Cas

```gherkin
Étant donné l'administrateur sur l'écran d'alerte sans avoir coché de créneau
Quand il consulte le bouton d'envoi d'alerte
Alors le bouton « Envoyer l'alerte » est grisé et désactivé
Et toute soumission est impossible tant qu'au moins un créneau n'est pas sélectionné
```

## Données

| Élément | Valeur |
|---|---:|
| Créneaux cochés | 0 créneau sélectionné |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| État du bouton | Désactivé / Inactif | Cas limite #1 SPEC-ADMIN-06 |
| Action d'envoi | Bloquée | Sécurité UI |

## Ce que ce cas ne vérifie pas

- la sélection valide de créneaux (couvert par `CASE-ADMIN-048`) ;
- le cas d'un message vide (couvert par `CASE-ADMIN-060`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_058_desactivation_bouton_envoi_aucun_creneau_selectionne`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test ouvre la mire d'alerte sans sélectionner de créneau.
- [ ] Le test vérifie l'état 'disabled' du bouton d'envoi.
- [ ] Le nom du test contient `CASE_ADMIN_058`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
