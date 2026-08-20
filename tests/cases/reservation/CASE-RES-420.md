# CASE-RES-420 — Accès à la page de paiement du solde après expiration du token (> 1 heure)

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-10`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège la sécurité technique des sessions de paiement en ligne du solde. Conformément à REQ-107, à la règle AC-10 et au CDC v5 §6, les tokens sécurisés transmis dans les SMS de solde ont une durée de validité limitée à **1 heure** (60 minutes). Si un client tente d'accéder au lien au-delà de cette durée, le système refuse l'ouverture d'une session de paiement, affiche un message informant de l'expiration du lien temporaire pour motif de sécurité, et invite le client à régler son solde directement par carte bancaire le jour du départ à l'embarcadère. Si ce contrôle fait défaut, des tokens non expirés créent des vulnérabilités de rejeu.

## Cas

```gherkin
Étant donné une réservation avec acompte versé ayant reçu un SMS de solde avec token temporaire
Quand le client clique sur le lien sécurisé 75 minutes après son émission (délai > 60 minutes)
Alors la page web détecte l'expiration du token technique
Et affiche un message explicite : « Le lien de paiement en ligne a expiré pour des raisons de sécurité. Vous pourrez régler votre solde directement par carte bancaire sur place le jour du départ. »
Et aucun formulaire de saisie bancaire n'est affiché
Et la réservation reste maintenue à l'état « payée partiellement »
```

## Données

| Élément | Valeur |
|---|---:|
| Durée de validité maximale du token | 60 minutes (1 heure — REQ-107) |
| Horodatage émission token SMS | 19/08/2026 à 18h00 |
| Horodatage tentative d'accès client | 19/08/2026 à 19h15 (75 min après) |
| Statut du token | Expiré / Invalide |
| Statut réservation | payée partiellement (non altéré) |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Validité token à 75 min | Expiré | 75 min > 60 min (REQ-107, AC-10) |
| Affichage page solde | Message d'expiration | Information client claire |
| Accès au paiement en ligne | Bloqué / Refusé | Aucune transaction bancaire permise |
| Invitation règlement sur place | Affichée | Continuité du service client à l'embarcadère |
| Statut réservation | payée partiellement | Aucun impact négatif sur la réservation |

## Ce que ce cas ne vérifie pas

- l'accès nominal au lien dans l'heure (couvert par `CASE-RES-418`) ;
- l'absence totale de clic sur le lien (couvert par `CASE-RES-421`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_420_acces_page_solde_token_expire_plus_de_1_heure_redirection_sur_place`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-420.test.ts`

## Revue du test automatisé

- [ ] Le test génère un token de paiement de solde datant de plus de 60 minutes.
- [ ] Le test simule l'accès à l'URL avec ce token expiré.
- [ ] Le test vérifie que la page affiche le message d'expiration pour sécurité.
- [ ] Le test vérifie qu'aucun module bancaire n'est disponible sur la page.
- [ ] Le test vérifie que le message invite le client à payer en CB sur place.
- [ ] Le test s'assure que la réservation reste active à l'état « payée partiellement ».
- [ ] Le nom du test contient `CASE_RES_420`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
