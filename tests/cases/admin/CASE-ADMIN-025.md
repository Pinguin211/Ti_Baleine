# CASE-ADMIN-025 — [Choix déduit — Format audit à confirmer] Réduction partielle mixte (adultes et enfants) avec recalcul immédiat et trace d'audit

**Spécification :** `SPEC-ADMIN-03`  
**Critère d'acceptation :** `Portée §1`, `AC-1`, `Ce qui n'est pas défini §1`, `REQ-015`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège les réductions combinées portant simultanément sur plusieurs catégories tarifaires (adultes et enfants) en une seule opération administrative, tout en garantissant le recalcul instantané des places et la traçabilité de l'opération (conservation d'historique ou trace d'audit selon l'implémentation retenue).

## Cas

```gherkin
Étant donné une réservation comportant 4 adultes et 2 enfants (total 6 billets)
Quand l'administrateur retire simultanément 2 adultes et 1 enfant
Alors 3 billets au total sont retirés de la réservation active
Et la réservation conserve 2 adultes et 1 enfant actifs (total 3 billets)
Et 3 places sont immédiatement remises à disposition sur le créneau
Et la traçabilité de la réduction (historique ou audit) est conservée
```

## Données

| Élément | Valeur |
|---|---:|
| Initial | 4 adultes + 2 enfants (6 places) |
| Retrait | 2 adultes + 1 enfant (3 places retirées) |
| Attendu final | 2 adultes + 1 enfant (3 places restantes) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Billets restants | 3 billets actifs | 6 - 3 = 3 |
| Capacité libérée | +3 places sur le créneau | Mise à jour synchrone |
| Audit | Trace de la réduction enregistrée | Historique administratif |

## Ce que ce cas ne vérifie pas

- la suppression ramenant à 0 billet (couvert par `CASE-ADMIN-026`) ;
- le rejet d'une saisie excédant le nombre de billets (couvert par `CASE-ADMIN-069`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_025_reduction_mixte_adultes_enfants_recalcul_audit`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test prépare une commande de 6 billets mixtes.
- [ ] Le test applique une réduction de 2 adultes et 1 enfant.
- [ ] Le test vérifie la mise à jour exacte des compteurs en base.
- [ ] Le test vérifie la libération de 3 places au planning.
- [ ] Le nom du test contient `CASE_ADMIN_025`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
