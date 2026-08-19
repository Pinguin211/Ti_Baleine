# CASE-RES-404 — Bascule français/anglais sans perte des données saisies

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-1`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège le parcours des clients anglophones : la bascule
français/anglais doit être possible à chaque étape du tunnel sans effacer ce
qui a déjà été saisi. Si la règle se casse, un client qui change de langue en
cours de commande perd son panier et abandonne l'achat.

## Cas

```gherkin
Étant donné un client ayant commencé une réservation en français
Et ayant déjà sélectionné le port « Saint-Gilles », l'activité « Sortie Baleines » et le créneau du mercredi 16 septembre 2026 à 10h00
Et renseigné 1 adulte et 1 enfant de 8 ans
Quand il bascule l'interface en anglais à l'étape des coordonnées
Alors l'interface s'affiche en anglais
Et le port, le créneau et les passagers déjà saisis sont conservés
Quand il saisit ses coordonnées et bascule à nouveau en français avant le paiement
Alors les coordonnées saisies sont conservées
Et le montant à payer reste 105 €
```

## Données

| Élément | Valeur |
|---|---:|
| Langue initiale | français |
| Sélection avant bascule | Saint-Gilles, Baleines, 16 sept. 2026 à 10h00 |
| Passagers | 1 adulte + 1 enfant de 8 ans |
| Bascule n° 1 | vers l'anglais, à l'étape des coordonnées |
| Bascule n° 2 | retour au français, avant le paiement |
| Montant attendu | 105 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Langue affichée après bascule 1 | anglais | choix de l'utilisateur |
| Port / créneau / passagers | inchangés | aucune perte de données (AC-1) |
| Coordonnées après bascule 2 | inchangées | aucune perte de données (AC-1) |
| Montant total | 105 € | 65 € + 40 €, indépendant de la langue |

## Ce que ce cas ne vérifie pas

- la qualité ou l'exhaustivité de la traduction anglaise ;
- le stockage d'un indicateur de langue en base (explicitement exclu par la
  spécification) ;
- la langue de la confirmation de paiement ou des e-mails (`SPEC-FAC-02`) ;
- l'aboutissement du paiement lui-même (→ `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_404_bascule_fr_en_conserve_les_donnees_saisies`  
**Fichier :** [tests/tests-unitaires/case-res-404.test.ts](../../tests-unitaires/case-res-404.test.ts)

## Revue du test automatisé

- [ ] Le test bascule de langue à au moins deux étapes distinctes du tunnel.
- [ ] Le test vérifie la conservation du port, du créneau et des passagers après bascule.
- [ ] Le test vérifie la conservation des coordonnées après une seconde bascule.
- [ ] Le test vérifie que le montant reste 105 € quelle que soit la langue.
- [ ] Le test échoue si la bascule de langue réinitialise le panier.
- [ ] Le nom du test contient `CASE_RES_404`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
