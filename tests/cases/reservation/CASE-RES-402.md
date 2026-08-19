# CASE-RES-402 — Réservation sur un créneau sous alerte de pré-annulation

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-7`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'information du client avant achat : tout créneau placé sous
alerte de pré-annulation la veille et resté ouvert à la vente doit afficher
une mention d'avertissement, avant comme après la réservation. Si la règle se
casse, le client achète sans savoir que sa sortie risque d'être annulée, ce
qui expose le prestataire à des litiges.

## Cas

```gherkin
Étant donné un créneau du mercredi 2 septembre 2026 à Saint-Gilles 10h00
Et une alerte de pré-annulation météo émise par l'administrateur la veille, mardi 1er septembre 2026 à 18h00
Et 4 places encore libres sur ce créneau
Quand un client consulte ce créneau sur le parcours public
Alors le créneau est affiché comme réservable avec une mention d'avertissement claire
Quand le client réserve et paie 2 places adultes (130 €)
Alors la réservation est acceptée, le créneau affiche 2 places restantes
Et le créneau conserve sa mention d'avertissement
```

## Données

| Élément | Valeur |
|---|---:|
| Port et créneau | Saint-Gilles, mercredi 2 septembre 2026 à 10h00 |
| Alerte de pré-annulation | émise le mardi 1er septembre 2026 à 18h00 |
| Places libres avant réservation | 4 |
| Passagers | 2 adultes |
| Tarif adulte Saint-Gilles (Baleines) | 65 € |
| Moyen de paiement | carte bancaire |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Mention d'avertissement avant paiement | affichée | alerte émise la veille + places libres (AC-7) |
| Montant total | 130 € | 65 € × 2 |
| Statut de la réservation | payée | confirmation du paiement CB |
| Places restantes | 2 | 4 − 2 |
| Mention d'avertissement après réservation | toujours affichée | le créneau reste sous alerte |

## Ce que ce cas ne vérifie pas

- l'émission de l'alerte par l'administrateur (`SPEC-ADMIN-06`, hors
  périmètre — l'alerte est une précondition, posée comme déjà émise) ;
- la formulation textuelle exacte de la mention (non validée par la
  direction — seule la *présence* de la mention est vérifiée, pas son texte
  au mot près) ;
- l'annulation effective du créneau et le remboursement (`SPEC-ADMIN-02`) ;
- le comportement d'un créneau sous alerte devenu complet.

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_402_creneau_sous_alerte_mention_affichee_avant_et_apres_reservation`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test pose une alerte émise la veille à 18h00 comme précondition.
- [ ] Le test vérifie la présence de la mention d'avertissement avant paiement.
- [ ] Le test vérifie la présence de la mention (et non son texte exact) après réservation.
- [ ] Le test vérifie l'acceptation de la réservation de 2 places adultes pour 130 €.
- [ ] Le test vérifie qu'il reste 2 places (4 − 2).
- [ ] Le test échoue si l'affichage de la mention est volontairement supprimé du code.
- [ ] Le nom du test contient `CASE_RES_402`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
