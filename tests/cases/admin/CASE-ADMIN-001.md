# CASE-ADMIN-001 — Affichage consolidé de la grille multi-sites sur poste Desktop

**Spécification :** `SPEC-ADMIN-01`  
**Critère d'acceptation :** `Scénario 1`, `AC-1`, `REQ-009`, `R-01`, `C-03`, `C-04`  
**Type :** acceptation  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège la consolidation et la visibilité multi-sites sur l'écran principal du planning administrateur depuis un poste de bureau (Desktop). Si la règle se casse, l'administrateur perd la visibilité sur les créneaux d'un des ports (Saint-Leu ou Saint-Gilles), ce qui peut provoquer des conflits d'ordonnancement, des doublons d'exploitation ou un manque de supervision sur les départs quotidiens et bi-hebdomadaires.

## Cas

```gherkin
Étant donné l'administrateur authentifié sur le back-office depuis un poste de travail (Desktop)
Et la date consultée configurée sur le mardi 18 août 2026
Quand l'administrateur accède à la vue consolidée du planning
Alors la grille affiche de façon distincte les créneaux du port de Saint-Gilles à 7h00, 10h00 et 14h00
Et la grille affiche le créneau du port de Saint-Leu à 9h00 (départ mardi/jeudi)
Et chaque créneau affiche clairement son port de départ, son horaire et son état opérationnel
```

## Données

| Élément | Valeur |
|---|---:|
| Date consultée | 18/08/2026 (Mardi) |
| Profil utilisateur | Administrateur connecté (Desktop) |
| Créneaux Saint-Gilles attendus | 7h00, 10h00, 14h00 |
| Créneaux Saint-Leu attendus | 9h00 (mardi et jeudi uniquement) |
| Mode d'affichage | Grille consolidée multi-sites |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Présence créneau Saint-Gilles 7h | Affiché | Règle R-01 (départ standard quotidien) |
| Présence créneau Saint-Gilles 10h | Affiché | Règle R-01 (départ standard quotidien) |
| Présence créneau Saint-Gilles 14h | Affiché | Règle R-01 (départ standard quotidien) |
| Présence créneau Saint-Leu 9h | Affiché | Règle R-01 (mardi et jeudi uniquement) |
| Regroupement visuel | Consolidé par port et heure | Contraintes C-03, C-04, REQ-009 |

## Ce que ce cas ne vérifie pas

- l'affichage du détail des passagers et des navires mobilisés (couvert par `CASE-ADMIN-002`) ;
- la visualisation des jauges et taux de remplissage chiffrés (couvert par `CASE-ADMIN-041`, `CASE-ADMIN-042`, `CASE-ADMIN-043`) ;
- le badge des créneaux sous pré-alerte (couvert par `CASE-ADMIN-003`) ;
- la consultation sur mobile ou tablette (non supportée selon C-16).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_001_affichage_consolide_grille_planning_multisites_desktop`  
**Fichier :** `tests/tests-unitaires/admin/spec-admin-01/CASE-ADMIN-001.test.ts`

## Revue du test automatisé

- [ ] Le test initialise un environnement avec des créneaux configurés sur Saint-Gilles et Saint-Leu.
- [ ] Le test simule une consultation du planning pour un mardi (jour de rotation Saint-Leu).
- [ ] Le test vérifie la présence des 3 créneaux de Saint-Gilles (7h, 10h, 14h).
- [ ] Le test vérifie la présence du créneau de 9h à Saint-Leu.
- [ ] Le test s'assure que la vue est optimisée pour Desktop (C-16).
- [ ] Le nom du test contient `CASE_ADMIN_001`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
