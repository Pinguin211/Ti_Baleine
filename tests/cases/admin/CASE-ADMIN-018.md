# CASE-ADMIN-018 — Rejet strict de la demande d'annulation administrative lorsque le créneau est déjà passé

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Cas limite #3`, `Ce qui n'est pas défini §1`, `CDC v5 §11 Q1`  
**Type :** sécurité / règle temporelle  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège contre l'annulation rétroactive d'une sortie passée. Une fois l'heure de départ écoulée, les billets ne peuvent plus être supprimés par cette fonction afin de préserver l'intégrité des prestations réalisées.

## Cas

```gherkin
Étant donné une réservation sur un créneau dont le départ était fixé le 18 août 2026 à 07h00
Et l'horloge système indiquant le 18 août 2026 à 07h30 (départ passé de 30 minutes)
Quand l'administrateur tente d'annuler la réservation
Alors la demande est strictement rejetée avec le message « Annulation impossible : le départ est déjà passé »
Et aucun billet n'est supprimé en base
```

## Données

| Élément | Valeur |
|---|---:|
| Départ de la sortie | 18/08/2026 07:00 |
| Heure de tentative | 18/08/2026 07:30 |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut de la demande | Rejetée avec erreur explicite | Cas limite #3 SPEC-ADMIN-02 |
| Billets | Intacts en base | Aucune suppression rétroactive |

## Ce que ce cas ne vérifie pas

- l'annulation avant départ (couvert par `CASE-ADMIN-016`) ;
- le traitement des no-shows (hors application).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_018_rejet_strict_annulation_administrative_creneau_passe`  
**Fichier :** tests/tests-unitaires/admin/case-admin-018.test.ts

## Revue du test automatisé

- [ ] Le test simule une tentative d'annulation postérieure à l'horaire de départ.
- [ ] Le test vérifie le renvoi d'un message d'erreur bloquant.
- [ ] Le test confirme que les billets de la réservation demeurent inchangés.
- [ ] Le nom du test contient `CASE_ADMIN_018`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
