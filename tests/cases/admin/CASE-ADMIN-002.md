# CASE-ADMIN-002 — Consultation du détail d'un créneau avec activité et navires mobilisés

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Scénario 2`, `AC-1`, `REQ-010`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'exactitude des informations opérationnelles affichées lors de la sélection d'un créneau au planning. Si la règle se casse, l'administrateur peut ignorer quel navire est affecté à la sortie (Tikap et/ou Grand Bleu) ou quelle prestation est programmée (Baleines, Dauphins, Privatisation), entraînant une mauvaise coordination maritime.

## Cas

```gherkin
Étant donné l'administrateur connecté consultant le planning du mercredi 19 août 2026 à Saint-Gilles
Et un créneau programmé à 7h00 affecté à l'activité « Sortie Baleines » avec les navires « Tikap » et « Grand Bleu »
Quand l'administrateur clique sur la carte du créneau pour afficher son détail
Alors le panneau de détail indique explicitement l'activité « Sortie Baleines »
Et le panneau liste les navires mobilisés « Tikap » et « Grand Bleu »
Et le détail du port d'embarquement « Saint-Gilles » est rappelé
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau sélectionné | 19/08/2026 07:00 — Saint-Gilles (Mercredi) |
| Activité configurée | Sortie Baleines |
| Navires affectés | Tikap + Grand Bleu (flotte complète standard) |
| Action | Clic / consultation du détail |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Activité affichée | Sortie Baleines | Champ type_activite du créneau |
| Navires affichés | Tikap, Grand Bleu | Flotte affectée au créneau |
| Port rappelé | Saint-Gilles | Localisation de départ |

## Ce que ce cas ne vérifie pas

- la modification de l'affectation des navires ou de l'activité (couvert par `CASE-ADMIN-064`, `CASE-ADMIN-065`) ;
- l'affichage de l'alerte de pré-annulation (couvert par `CASE-ADMIN-003`) ;
- le calcul mathématique du taux de remplissage (couvert par `CASE-ADMIN-041`) ;
- l'affichage des statuts financiers (« Payée complètement » / « Payée partiellement ») des réservations le jour J (couvert par `CASE-ADMIN-077`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_002_consultation_detail_creneau_activite_navires_mobilises`  
**Fichier :** tests/tests-unitaires/admin/case-admin-002.test.ts

## Revue du test automatisé

- [ ] Le test charge un créneau configuré avec l'activité 'Baleines' et deux navires (Tikap, Grand Bleu).
- [ ] Le test simule l'ouverture du volet de détail du créneau.
- [ ] Le test vérifie que l'intitulé de l'activité correspond fidèlement à la configuration.
- [ ] Le test vérifie que la liste des navires mobilisés mentionne Tikap et Grand Bleu.
- [ ] Le nom du test contient `CASE_ADMIN_002`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
