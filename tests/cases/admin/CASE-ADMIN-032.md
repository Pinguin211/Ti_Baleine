# CASE-ADMIN-032 — Absence de remboursement financier automatique consécutif à une réduction partielle de passagers

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Portée §6`, `Contrainte C-10`  
**Type :** sécurité financière  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'application contre l'émission de transactions financières sortantes non maîtrisées suite à une réduction de passagers. Tout remboursement partiel est géré manuellement par l'administrateur hors plateforme.

## Cas

```gherkin
Étant donné une réservation de 3 adultes (195 €) réduite à 2 adultes par l'administrateur
Quand la réduction est validée
Alors la place est libérée sur le créneau
Et aucun flux de remboursement bancaire automatique de 65 € n'est initié par le système
Et l'opération financière reste soumise au traitement manuel externe
```

## Données

| Élément | Valeur |
|---|---:|
| Montant initial | 195 € (3 × 65 €) |
| Billet retiré | 1 adulte (valeur faciale 65 €) |
| Flux bancaire automatique attendu | 0 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Appel API remboursement | 0 appel émis | Portée §6 SPEC-ADMIN-03 |
| Traitement comptable | Manuel hors système | Conformité C-10 |

## Ce que ce cas ne vérifie pas

- la non-automatisation du remboursement lors de l'annulation totale (couvert par `CASE-ADMIN-022`) ;
- le calcul des tarifs d'origine (couvert par le domaine FACTURATION).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_032_absence_remboursement_financier_automatique_reduction_partielle`  
**Fichier :** tests/tests-unitaires/admin/case-admin-032.test.ts

## Revue du test automatisé

- [ ] Le test surveille les appels sortants vers la passerelle de paiement.
- [ ] Le test effectue une réduction partielle de passagers.
- [ ] Le test vérifie qu'aucun remboursement n'est déclenché automatiquement.
- [ ] Le nom du test contient `CASE_ADMIN_032`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
