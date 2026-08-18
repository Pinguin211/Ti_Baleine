# CASE-RES-416 — Rejet ou abandon du paiement par carte bancaire

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-8` (négatif)  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'intégrité de la jauge et des réservations en cas d'échec de
paiement : un paiement rejeté ou abandonné ne doit laisser ni réservation
enregistrée ni place décomptée. Si la règle se casse, des places sont
bloquées par des commandes fantômes jamais payées.

## Cas

```gherkin
Étant donné un client ayant complété le tunnel jusqu'au paiement (2 adultes, 130 €, créneau du mercredi 16 septembre 2026 à 10h00 avec 10 places restantes)
Quand le paiement par carte bancaire est rejeté par la banque
Alors aucune réservation n'est enregistrée
Et aucune place n'est décomptée de la jauge (10 places restantes)
Étant donné un second client ayant complété le même tunnel
Quand il abandonne la page de paiement sans payer
Alors aucune réservation n'est enregistrée
Et aucune place n'est décomptée de la jauge (10 places restantes)
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau visé | mercredi 16 septembre 2026 à 10h00, Saint-Gilles |
| Places restantes initiales | 10 |
| Panier | 2 adultes, 130 € |
| Scénario 1 | paiement rejeté par la banque |
| Scénario 2 | abandon de la page de paiement |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Réservation après rejet | aucune | paiement non confirmé |
| Réservation après abandon | aucune | paiement non confirmé |
| Jauge après les deux scénarios | 10 places | aucune décrémentation |
| Montant débité au client | 0 € | aucun paiement abouti |

## Ce que ce cas ne vérifie pas

- le verrouillage temporaire des places *pendant* la fenêtre de paiement et
  leur libération à expiration du timer (→ `CASE-RES-417`) ;
- la nouvelle tentative de paiement après un premier rejet ;
- le paiement partiel (exclu par la spec : 100 % CB uniquement) ;
- le paiement abouti (→ `CASE-RES-400`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_416_paiement_rejete_ou_abandonne_aucune_reservation_jauge_intacte`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test couvre le rejet bancaire et l'abandon de la page de paiement.
- [ ] Le test vérifie qu'aucune réservation n'est enregistrée dans les deux scénarios.
- [ ] Le test vérifie que la jauge reste à 10 places après chaque scénario.
- [ ] Le test échoue si une réservation « payée » est créée sans confirmation bancaire.
- [ ] Le nom du test contient `CASE_RES_416`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
