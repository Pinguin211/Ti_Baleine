# CASE-RES-419 — Réservation effectuée le jour même sans envoi de SMS et solde sur place

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-11`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège la règle spécifique de gestion des réservations de dernière minute passées le jour même de l'excursion (règle R-08, Contrainte 26, CDC §1 & §6). Pour toute réservation créée le jour de la sortie (à plus de 2h du départ pour respecter H-2), le système encaisse l'acompte en ligne (30 % ou 50 %), passe le dossier à « payée partiellement », mais bloque strictement la génération et la planification d'un SMS ou d'un lien de paiement du solde. Le récapitulatif informe le client que le solde sera obligatoirement réglé à l'embarcadère par carte bancaire le jour même. Si un SMS était émis ou programmé pour ces dossiers, des liens inutiles ou anachroniques seraient envoyés.

## Cas

```gherkin
Étant donné un client réservant le 20 août 2026 à 8h30 pour une sortie l'après-midi même (20 août à 14h00, délai > 2 heures)
Quand il sélectionne 2 adultes Baleines à Saint-Gilles (total 130,00 €)
Et règle en ligne l'acompte obligatoire de 30 % (39,00 €) par carte bancaire
Alors la réservation est enregistrée à l'état « payée partiellement » avec un solde restant dû de 91,00 €
Et le système exclut strictement cette réservation de la file d'envoi des SMS de solde (0 SMS généré)
Et la page de confirmation ainsi que l'e-mail récapitulatif indiquent explicitement « Règlement du solde obligatoire sur place par carte bancaire »
```

## Données

| Élément | Valeur |
|---|---:|
| Date de réservation | 20/08/2026 à 8h30 |
| Date de la prestation | 20/08/2026 à 14h00 (le jour même) |
| Délai avant départ | 5h30 (> seuil H-2 de 2h) |
| Participants | 2 adultes Baleines (130,00 € total) |
| Acompte en ligne (30 %) | 39,00 € |
| Solde restant dû (70 %) | 91,00 € |
| Planification SMS à J-1 | Bloquée (réservation jour même R-08, C-26) |
| Mode de paiement du solde | Sur place par carte bancaire |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut de réservation initial | payée partiellement | Acompte CB validé avec succès |
| Envoi de SMS de solde | Aucun (0 SMS) | Règle R-08, Contrainte 26, AC-11 |
| Mention récapitulative | Solde à régler sur place par CB | Information client sur place |
| Solde restant à percevoir | 91,00 € | 130,00 € − 39,00 € |
| Statut avant encaissement sur place | payée partiellement | En attente de règlement à l'embarcadère |

## Ce que ce cas ne vérifie pas

- l'encaissement et le pointage du solde sur place par l'administrateur (couvert par `CASE-ADMIN-048`) ;
- la réservation passée la veille avec envoi effectif du SMS à J-1 (couvert par `CASE-RES-418`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_419_reservation_jour_meme_blocage_envoi_sms_solde_sur_place`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-419.test.ts`

## Revue du test automatisé

- [ ] Le test effectue une réservation pour un créneau ayant lieu le jour même (à plus de 2 heures).
- [ ] Le test valide le paiement de l'acompte de 30 % par carte bancaire.
- [ ] Le test vérifie que la réservation est enregistrée à l'état « payée partiellement ».
- [ ] Le test s'assure qu'aucun SMS de solde n'est généré ni programmé en tâche d'arrière-plan.
- [ ] Le test vérifie la mention indiquant le règlement du solde sur place par CB.
- [ ] Le nom du test contient `CASE_RES_419`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
