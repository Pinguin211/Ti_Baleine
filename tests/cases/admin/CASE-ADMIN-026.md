# CASE-ADMIN-026 — Réduction ramenant le nombre de billets actifs à 0 avec basculement automatique vers l'annulation

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Scénario 2`, `AC-3`, `Cas limite #2`  
**Type :** acceptation / transition d'état  
**Niveau de risque :** critique

## Ce que ce cas protège

Ce cas protège l'unification technique entre réduction et annulation. Lorsqu'une réduction supprime l'intégralité des billets restants (ramenant le total à 0), le système bascule automatiquement vers le traitement complet d'annulation (affichage du calcul indicatif de remboursement destiné à l'administrateur, saisie du motif et émission du SMS de notification au client selon SPEC-ADMIN-02).

## Cas

```gherkin
Étant donné une réservation détenant 2 billets, montant total 80,00 €, acompte versé 24,00 €
Quand l'administrateur demande le retrait des 2 billets depuis l'écran de réduction
Alors le système bascule sur le flux d'annulation complète
Et affiche à l'administrateur le calcul indicatif de remboursement (SPEC-ADMIN-02)
Et invite l'administrateur à sélectionner le motif de notification
Et après confirmation, la réservation est conservée à 0 billet actif
Et le SMS de notification d'annulation est envoyé au client sans aucune mention du calcul financier
```

## Données

| Élément | Valeur |
|---|---:|
| Billets initiaux | 2 billets |
| Billets retirés | 2 billets |
| Billets restants | 0 billet |
| Montant total | 80,00 € |
| Acompte versé | 24,00 € |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Transition de flux | Bascule automatique vers SPEC-ADMIN-02 | AC-3 et Cas limite #2 |
| Calcul indicatif affiché (admin) | Calcul de remboursement affiché avant confirmation | SPEC-ADMIN-02, réservé à la vue administrateur |
| Notification SMS | SMS d'annulation envoyé au client, sans détail financier | Exigence de notification |
| État réservation | Conservée avec 0 billet actif | Conformité d'état |

## Ce que ce cas ne vérifie pas

- l'annulation directe depuis le bouton d'annulation (couvert par `CASE-ADMIN-010`) ;
- la réduction partielle laissant au moins 1 billet actif (couvert par `CASE-ADMIN-023`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_026_reduction_a_0_billet_bascule_automatique_annulation_sms`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test configure une réservation de 2 places avec un montant total et un acompte connus.
- [ ] Le test retire 2 places dans l'interface de réduction.
- [ ] Le test vérifie l'affichage du calcul indicatif de remboursement à l'administrateur.
- [ ] Le test vérifie l'apparition du choix du motif d'annulation.
- [ ] Le test valide l'envoi effectif du SMS au client et l'absence de mention du calcul financier dans son contenu.
- [ ] Le nom du test contient `CASE_ADMIN_026`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
