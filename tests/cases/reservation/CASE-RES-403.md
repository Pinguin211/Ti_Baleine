# CASE-RES-403 — Privatisation demi-journée du Tikap à Saint-Leu

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-5`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la formule de privatisation du Tikap à Saint-Leu : forfait de
600 € sans majoration géographique et blocage de la totalité de la capacité
du créneau. Si la règle se casse, le prestataire applique un mauvais prix
forfaitaire ou vend des places individuelles sur un navire déjà privatisé.

## Cas

```gherkin
Étant donné un client souhaitant privatiser un navire
Quand il sélectionne la prestation « Privatisation », le navire « Tikap », le mardi 8 septembre 2026 matin (créneau dès 09h00) au port de Saint-Leu
Alors le montant forfaitaire de 600 € est appliqué (sans majoration géographique)
Quand le client renseigne ses coordonnées et règle 600 € par carte bancaire
Alors la réservation est enregistrée
Et l'ensemble de la capacité du créneau est bloquée
```

## Données

| Élément | Valeur |
|---|---:|
| Prestation | Privatisation demi-journée |
| Navire | Tikap |
| Port | Saint-Leu |
| Date et créneau | mardi 8 septembre 2026, matin dès 9h00 |
| Capacité du créneau | 12 places |
| Forfait | 600 € |
| Majoration géographique | aucune (forfait) |
| Moyen de paiement | carte bancaire |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Montant total | 600 € | forfait Tikap, sans majoration ni supplément |
| Statut de la réservation | payée | confirmation du paiement CB |
| Capacité restante du créneau | 0 place | totalité bloquée par la privatisation |
| Créneau sur l'offre individuelle | non réservable | capacité intégralement bloquée |

## Ce que ce cas ne vérifie pas

- la privatisation du Grand Bleu à 1 100 € (→ `CASE-RES-406`) ;
- la réservation individuelle sur un créneau Saint-Leu non privatisé
  (→ `CASE-RES-401`, qui utilise un mardi distinct) ;
- l'indisponibilité de la privatisation Tikap le matin à Saint-Gilles les
  mardis et jeudis (→ `CASE-RES-412`) ;
- la privatisation après-midi dès 14h00 à Saint-Gilles ;
- le rejet du paiement (→ `CASE-RES-416`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_403_privatisation_tikap_saint_leu_forfait_600_capacite_bloquee`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test réserve une privatisation Tikap à Saint-Leu, un mardi matin dès 9h00.
- [ ] Le test vérifie un montant forfaitaire de 600 €, sans majoration géographique.
- [ ] Le test vérifie l'enregistrement de la réservation après paiement CB.
- [ ] Le test vérifie que la capacité du créneau est intégralement bloquée.
- [ ] Le test vérifie que le créneau n'est plus proposé en réservation individuelle.
- [ ] Le test échoue si une majoration de + 10 € / personne est appliquée au forfait.
- [ ] Le nom du test contient `CASE_RES_403`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
