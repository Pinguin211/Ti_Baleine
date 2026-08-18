# CASE-ADMIN-052 — Préremplissage instantané de la zone de texte par sélection du template type codé en dur « Météo défavorable »

**Spécification :** `SPEC-ADMIN-06`  
**Critère d'acceptation :** `Scénario 1`, `AC-2`, `REQ-018`, `R-23`  
**Type :** acceptation / ergonomie  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la rapidité et la fiabilité de la rédaction en préremplissant automatiquement le champ de texte modifiable dès la sélection du modèle codé en dur « Météo défavorable » (règles R-23 et REQ-018).

## Cas

```gherkin
Étant donné l'administrateur sur la fenêtre d'envoi d'alerte avec un champ de message initialement vide
Quand il clique sur le bouton de template « Météo défavorable »
Alors la zone de texte est instantanément préremplie avec le modèle type bilingue météo
Et le texte demeure entièrement éditable par l'administrateur
```

## Données

| Élément | Valeur |
|---|---:|
| Template choisi | « Météo défavorable » (codé en dur) |
| Champ cible | Zone de texte éditable du message |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Contenu injecté | Texte FR météo suivi de sa traduction EN | Règles R-23, R-26 |
| Édition | Zone reste modifiable | Confort administrateur |

## Ce que ce cas ne vérifie pas

- le template pour incident technique (couvert par `CASE-ADMIN-053`) ;
- la modification manuelle du texte (couvert par `CASE-ADMIN-054`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_052_preremplissage_instantane_template_meteo_defavorable`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule le clic sur le template 'Météo défavorable'.
- [ ] Le test vérifie que la zone de texte contient le texte bilingue prédéfini.
- [ ] Le nom du test contient `CASE_ADMIN_052`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
