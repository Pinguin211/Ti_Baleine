# CASE-ADMIN-065 — Configuration et affectation des navires mobilisés sur un créneau horaire

**Spécification :** `SPEC-ADMIN-07`  
**Critère d'acceptation :** `Portée §2`, `AC-1`  
**Type :** acceptation / configuration  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'allocation des navires de la flotte (Tikap et/ou Grand Bleu) sur les créneaux programmés.

## Cas

```gherkin
Étant donné un créneau horaire à Saint-Gilles
Quand l'administrateur affecte les navires « Tikap » et « Grand Bleu » à ce créneau
Alors la configuration matérielle du créneau est enregistrée avec les deux navires
Et la capacité maximale du créneau est ajustée en conséquence
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau | Saint-Gilles 14:00 |
| Navires affectés | Tikap + Grand Bleu |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Navires affectés | Tikap, Grand Bleu | Affectation flotte réussie |
| Capacité résultante | 36 places | 12 + 24 places |

## Ce que ce cas ne vérifie pas

- le conflit d'exclusivité d'activité sur un même navire (couvert par `CASE-ADMIN-066`) ;
- la rotation spécifique de Saint-Leu le matin (couvert par `CASE-ADMIN-043`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_065_configuration_affectation_navires_mobilises_creneau`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test associe Tikap et Grand Bleu à un créneau.
- [ ] Le test vérifie l'enregistrement des navires et le recalcul de la jauge.
- [ ] Le nom du test contient `CASE_ADMIN_065`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
