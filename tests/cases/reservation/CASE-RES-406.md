# CASE-RES-406 — Privatisation du Grand Bleu à Saint-Gilles

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-5`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la formule de privatisation du Grand Bleu à 1 100 €, non
couverte par le scénario nominal 4 qui ne teste que le Tikap. Si la règle se
casse, la privatisation du grand navire est facturée au forfait du petit
(600 €), soit 500 € de perte par vente.

## Cas

```gherkin
Étant donné un client souhaitant privatiser un navire
Quand il sélectionne la prestation « Privatisation », le navire « Grand Bleu », le mercredi 16 septembre 2026 après-midi (créneau dès 14h00) au port de Saint-Gilles
Alors le montant forfaitaire de 1 100 € est appliqué
Quand le client renseigne ses coordonnées et règle 1 100 € par carte bancaire
Alors la réservation est enregistrée
Et l'ensemble de la capacité du créneau est bloquée
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Privatisation demi-journée |
| Navire | Grand Bleu |
| Port | Saint-Gilles |
| Date et créneau | mercredi 16 septembre 2026, après-midi dès 14h00 |
| Forfait | 1 100 € |
| Moyen de paiement | carte bancaire |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant total | 1 100 € | forfait Grand Bleu (et non 600 €) |
| Statut de la réservation | payée | confirmation du paiement CB |
| Capacité restante du créneau | 0 place | totalité bloquée par la privatisation |

## Ce que ce cas ne vérifie pas

- la privatisation du Tikap à 600 € (→ `CASE-RES-403`) ;
- la privatisation le matin à Saint-Gilles (7h–12h) ;
- l'indisponibilité de la privatisation Tikap le mardi/jeudi matin à
  Saint-Gilles (→ `CASE-RES-412`) ;
- le rejet du paiement (→ `CASE-RES-416`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_406_privatisation_grand_bleu_forfait_1100_capacite_bloquee`  
**Fichier :** [tests/tests-unitaires/case-res-406.test.ts](../../tests-unitaires/case-res-406.test.ts)

## Revue du test automatisé

- [ ] Le test réserve une privatisation du Grand Bleu (et non du Tikap) à Saint-Gilles.
- [ ] Le test vérifie un montant forfaitaire de 1 100 €.
- [ ] Le test vérifie l'enregistrement de la réservation après paiement CB.
- [ ] Le test vérifie que la capacité du créneau est intégralement bloquée.
- [ ] Le test échoue si le forfait Tikap (600 €) est appliqué à la place.
- [ ] Le nom du test contient `CASE_RES_406`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
