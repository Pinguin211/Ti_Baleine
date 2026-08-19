# CASE-RES-417 — Verrouillage temporaire des places pendant le paiement

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-2`, `AC-8`  
**Type :** acceptation  
**Niveau de risque :** élevé

> ⚠️ **Hypothèse non validée par le client** : la durée du verrou (10 min)
> est un choix déduit, posé comme question ouverte n°12 §11 du CDC v4. Si la
> direction retient une autre durée, seule la valeur du timer change dans ce
> cas ; le comportement (verrou puis libération) reste identique.

## Ce que ce cas protège

Ce cas protège contre le surbooking concurrent : pendant qu'un client paie,
les places de son panier sont verrouillées pour les autres, puis remises à
disposition si le paiement expire, est annulé ou rejeté. Si la règle se
casse, deux clients paient les mêmes dernières places, ou des places restent
verrouillées à jamais après un paiement abandonné.

## Cas

```gherkin
Étant donné un créneau du mercredi 16 septembre 2026 à 10h00 avec 2 places restantes
Quand un client A engage le paiement CB pour ces 2 places
Alors les 2 places sont temporairement verrouillées (timer de 10 minutes)
Quand un client B tente de réserver 2 places sur ce même créneau pendant le verrou
Alors la réservation du client B est bloquée (aucune place disponible)
Quand le paiement du client A expire sans aboutir (timer de 10 minutes écoulé)
Alors les 2 places sont automatiquement remises à disposition
Et le client B peut désormais réserver ces 2 places
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau visé | mercredi 16 septembre 2026 à 10h00, Saint-Gilles |
| Places restantes initiales | 2 |
| Panier du client A | 2 places |
| Durée du verrou (hypothèse) | 10 minutes |
| Issue du paiement A | expiration du timer sans paiement |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Places visibles pour B pendant le verrou | 0 | 2 − 2 verrouillées |
| Réservation de B pendant le verrou | bloquée | aucune place disponible |
| Places disponibles après expiration | 2 | libération automatique du verrou |
| Réservation enregistrée pour A | aucune | paiement expiré |
| Réservation de B après expiration | possible | places remises à disposition |

## Ce que ce cas ne vérifie pas

- la durée exacte du verrou une fois validée par la direction (valeur à
  ajuster, comportement inchangé) ;
- le rejet bancaire simple sans concurrent (→ `CASE-RES-416`) ;
- la libération anticipée si le client A annule explicitement son paiement
  (même mécanisme, non dédoublé ici) ;
- le paiement de A abouti dans les temps (→ `CASE-RES-414` pour le passage
  à complet).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_417_verrou_10_min_pendant_paiement_liberation_a_expiration`  
**Fichier :** [tests/tests-unitaires/reservation/case-res-417.test.ts](../../tests-unitaires/reservation/case-res-417.test.ts)

## Revue du test automatisé

- [ ] Le test verrouille 2 places à l'engagement du paiement du client A.
- [ ] Le test vérifie le blocage du client B pendant le verrou.
- [ ] Le test simule l'expiration du timer (horloge simulée, pas d'attente réelle).
- [ ] Le test vérifie la remise à disposition automatique des 2 places.
- [ ] Le test vérifie qu'aucune réservation n'est enregistrée pour A.
- [ ] La durée du verrou est un paramètre du test, facilement ajustable.
- [ ] Le test échoue si le verrou n'est jamais libéré après expiration.
- [ ] Le nom du test contient `CASE_RES_417`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
