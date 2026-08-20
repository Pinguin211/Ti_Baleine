# CASE-RES-407 — Rejet du formulaire de coordonnées en cas de nom, prénom ou e-mail manquant ou invalide

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-6`  
**Type :** acceptation  
**Niveau de risque :** moyen

## Ce que ce cas protège

Ce cas protège l'intégrité des informations de contact obligatoires collectées en mode invité sans création de compte (REQ-005, C-20). Il garantit que les champs « Nom », « Prénom » et « E-mail » sont strictement obligatoires et vérifiés avant d'autoriser l'accès au paiement bancaire de l'acompte. Une adresse e-mail valide est indispensable pour la délivrance immédiate de la confirmation de réservation et de la facture d'acompte PDF. Si ces contrôles sont défaillants, des réservations anonymes ou injoignables peuvent être créées.

## Cas

```gherkin
Étant donné un client ayant sélectionné un créneau disponible et ses passagers
Quand il arrive sur l'étape de saisie des coordonnées de contact
Et qu'il omet de renseigner son nom de famille (champ vide)
Et tente de valider le formulaire
Alors la validation est bloquée et un message d'erreur indique que le nom est obligatoire
Quand il renseigne son nom mais omet son prénom
Et tente de valider le formulaire
Alors la validation est bloquée et un message d'erreur indique que le prénom est obligatoire
Quand il renseigne son nom et prénom mais saisit une adresse e-mail invalide (« adresse-invalide » sans domaine)
Et tente de valider le formulaire
Alors la validation est bloquée et un message d'erreur indique que le format de l'e-mail est invalide
Et aucune redirection vers la passerelle de paiement CB n'est autorisée tant que les champs ne sont pas valides
```

## Données

| Cas testé | Nom | Prénom | E-mail | Mobile | Résultat attendu |
|---|---|---|---|---|---|
| Nom manquant | *(vide)* | Jean | jean@test.re | +262692112233 | Rejet : nom obligatoire |
| Prénom manquant | Dupont | *(vide)* | jean@test.re | +262692112233 | Rejet : prénom obligatoire |
| E-mail manquant | Dupont | Jean | *(vide)* | +262692112233 | Rejet : e-mail obligatoire |
| Format e-mail erroné | Dupont | Jean | test.sansarobase | +262692112233 | Rejet : format e-mail invalide |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut validation formulaire | Rejeté | AC-6, REQ-005, C-20 |
| Message d'erreur affiché | Explicite sur le champ en anomalie | Contrôle de surface et serveur |
| Redirection paiement bancaire | Bloquée | Impossible d'engager le paiement sans contact |
| Persistance réservation | 0 enregistrement | Aucune création de commande incomplète |

## Ce que ce cas ne vérifie pas

- la validation du numéro de téléphone mobile (couvert spécifiquement par `CASE-RES-415`) ;
- l'envoi de la facture d'acompte par e-mail après paiement réussi (couvert par `CASE-FAC-700`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_407_rejet_formulaire_coordonnees_nom_prenom_email_manquant_ou_invalide`  
**Fichier :** `tests/tests-unitaires/reservation/case-res-407.test.ts`

## Revue du test automatisé

- [ ] Le test soumet un formulaire sans nom et vérifie le blocage et le message d'erreur.
- [ ] Le test soumet un formulaire sans prénom et vérifie le blocage et le message d'erreur.
- [ ] Le test soumet un formulaire sans e-mail et vérifie le blocage et le message d'erreur.
- [ ] Le test soumet un formulaire avec un format e-mail invalide et vérifie le blocage.
- [ ] Le test s'assure qu'aucune session de paiement n'est ouverte.
- [ ] Le nom du test contient `CASE_RES_407`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
