# CASE-ADMIN-003 — Présence obligatoire de l'indicateur visuel et du badge « Sous pré-alerte » sur un créneau alerté

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Scénario 2`, `AC-2`, `Cas limite #6`, `R-25`  
**Type :** acceptation / visuel  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'identification immédiate des créneaux placés sous pré-alerte météo ou technique la veille au soir à 18h. Si la règle se casse, l'administrateur pourrait traiter un créneau sous pré-alerte comme un créneau normal, risquant d'induire en erreur les clients ou d'omettre les règles d'annulation dérogatoires.

## Cas

```gherkin
Étant donné un créneau du 19 août 2026 à 7h00 à Saint-Gilles ayant fait l'objet d'une alerte météo la veille à 18h
Et l'administrateur ouvrant la grille du planning
Quand la grille des créneaux s'affiche
Alors la carte du créneau comporte un badge visuel distinctif « Sous pré-alerte »
Et un style visuel spécifique (icône d'alerte / couleur dédiée) différencie ce créneau des créneaux normaux
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | 19/08/2026 07:00 — Saint-Gilles |
| Statut d'alerte | Alerte météo transmise la veille à 18h |
| État système du créneau | SOUS_PRE_ALERTE |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Badge visible | « Sous pré-alerte » | Règle R-25 et AC-2 |
| Indicateur visuel | Icône d'avertissement présente | Exigence d'identification immédiate |
| Différenciation graphique | Style d'alerte appliqué sur la carte créneau | Conformité SPEC-ADMIN-01 |

## Ce que ce cas ne vérifie pas

- l'envoi initial de l'alerte groupée (couvert par `CASE-ADMIN-048`, `CASE-ADMIN-056`) ;
- l'affichage de l'avertissement sur l'interface publique client (couvert par `CASE-ADMIN-057`) ;
- l'annulation administrative suite à l'alerte (couvert par `CASE-ADMIN-010`, `CASE-ADMIN-011`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_003_presence_indicateur_badge_sous_pre_alerte_sur_creneau`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test positionne le créneau à l'état sous pré-alerte.
- [ ] Le test charge l'affichage du planning administrateur.
- [ ] Le test vérifie la présence textuelle du badge 'Sous pré-alerte'.
- [ ] Le test vérifie l'application du marqueur de style d'alerte sur l'élément du DOM.
- [ ] Le nom du test contient `CASE_ADMIN_003`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
