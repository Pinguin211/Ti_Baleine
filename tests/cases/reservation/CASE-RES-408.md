# CASE-RES-408 — Tentative de réservation à moins de 2 heures du départ

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-3`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la clôture automatique des ventes 2 heures avant le départ
(R-11). Si la règle se casse, des clients réservent un créneau que
l'équipage a déjà clos pour l'embarquement, et le prestataire doit rembourser
ou gérer des passagers imprévus au ponton.

## Cas

```gherkin
Étant donné un créneau « Sortie Baleines » à Saint-Gilles le mercredi 16 septembre 2026 à 10h00 avec des places libres
Et l'heure courante fixée au mercredi 16 septembre 2026 à 8h15
Quand un client consulte les créneaux du 16 septembre
Alors le créneau de 10h00 n'est pas sélectionnable et apparaît comme clos
Quand une validation de réservation sur ce créneau est tentée malgré tout (ex. requête directe)
Alors la validation est rejetée
Et aucune place n'est décomptée de la jauge
```

## Données

| Élément | Valeur |
|---|---:|
| Créneau visé | mercredi 16 septembre 2026 à 10h00, Saint-Gilles |
| Heure courante simulée | mercredi 16 septembre 2026 à 8h15 |
| Délai restant avant départ | 1 h 45 |
| Seuil de clôture | 2 heures avant le départ |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Créneau sélectionnable | non | 1 h 45 < 2 h (R-11) |
| Affichage du créneau | clos | clôture automatique |
| Validation forcée | rejetée | clôture appliquée côté serveur |
| Jauge du créneau | inchangée | aucune réservation acceptée |

## Ce que ce cas ne vérifie pas

- la réservation à exactement 2 heures du départ (comportement au seuil non
  précisé par la spec) ;
- un créneau clos pour cause de jauge complète (→ `CASE-RES-414`) ;
- les jours de fermeture annuelle (→ `CASE-RES-409`) ;
- le verrouillage temporaire du panier pendant le paiement
  (→ `CASE-RES-417`).

---

## Test automatisé

**Nom attendu :**
`test_CASE_RES_408_reservation_moins_2h_avant_depart_creneau_clos_rejet`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test fixe l'heure courante à 8h15 pour un créneau à 10h00 (1 h 45 avant).
- [ ] Le test vérifie que le créneau apparaît clos et non sélectionnable.
- [ ] Le test vérifie le rejet d'une validation forcée côté serveur.
- [ ] Le test vérifie que la jauge reste inchangée.
- [ ] Le test échoue si le seuil de clôture H-2 est volontairement supprimé du code.
- [ ] Le nom du test contient `CASE_RES_408`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
