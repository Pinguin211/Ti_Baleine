# CASE-ADMIN-016 — [Choix déduit — En attente CDC] Annulation administrative autorisée sans délai minimal préalable jusqu'à l'heure exacte du départ

**Spécification :** `SPEC-ADMIN-02`  
**Critère d'acceptation :** `Cas limite #1`, `Ce qui n'est pas défini §1`, `CDC v4 §11 Q1`  
**Type :** acceptation / règle temporelle  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la flexibilité accordée à l'administrateur d'annuler une réservation à tout moment jusqu'à l'heure exacte du départ (H-0), y compris à H-15 minutes (contrairement aux clients publics qui sont bloqués à H-2).

## Cas

```gherkin
Étant donné un créneau dont le départ est fixé à 10h00
Et l'horloge système indiquant 09h45 le jour même (H-15 minutes avant le départ)
Quand l'administrateur déclenche l'annulation d'une réservation
Alors l'annulation est acceptée et traitée avec succès
Et les billets sont supprimés et le SMS envoyé
```

## Données

| Élément | Valeur |
|---|---:|
| Départ créneau | 18/08/2026 10:00 |
| Heure d'annulation | 18/08/2026 09:45 (H-15 min) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut de l'action | Autorisée et validée | Annulation possible jusqu'à H-0 pour admin |
| Billets | Supprimés | Traitement unifié |

## Ce que ce cas ne vérifie pas

- l'annulation après le départ (couvert par `CASE-ADMIN-018`) ;
- la clôture des ventes publiques à H-2.

---

## Test automatisé

**Nom attendu :**  
`test_CASE_ADMIN_016_annulation_administrative_autorisee_jusqua_heure_depart_h0`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test simule une annulation par l'administrateur à 15 minutes du départ.
- [ ] Le test vérifie que l'opération ne génère aucune erreur d'échéance.
- [ ] Le test s'assure du bon déroulement de l'annulation.
- [ ] Le nom du test contient `CASE_ADMIN_016`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
