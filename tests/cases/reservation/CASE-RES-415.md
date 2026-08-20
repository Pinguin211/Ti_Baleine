# CASE-RES-415 — Rejet du formulaire si numéro de mobile manquant ou format invalide

**Spécification :** `SPEC-RESERVATION-03`  
**Critère d'acceptation :** `AC-6`  
**Type :** acceptation  
**Niveau de risque :** élevé

## Ce que ce cas protège

Ce cas protège l'exigence opérationnelle critique de collecte d'un numéro de téléphone mobile valide lors de toute réservation en ligne (REQ-005, Contrainte 20, CDC §6). La détention d'un mobile valide est indispensable au modèle de fonctionnement de Ti'Baleine : il conditionne l'envoi automatisé du SMS à J-1 contenant le lien de paiement du solde (REQ-021), la notification par SMS en cas d'annulation ou modification administrative (REQ-020), et la diffusion d'alertes météo d'urgence. Si un client peut réserver avec un numéro invalide ou sans mobile, il devient impossible de lui transmettre son lien de solde ou de le prévenir en mer.

## Cas

```gherkin
Étant donné un client ayant configuré sa réservation (créneau et passagers)
Quand il accède à l'étape des coordonnées
Et renseigne son nom, prénom et e-mail mais laisse le champ « Téléphone mobile » vide
Et valide le formulaire
Alors la soumission est bloquée avec le message « Le numéro de téléphone mobile est obligatoire pour recevoir les notifications et le lien de paiement »
Quand il saisit un numéro dans un format invalide (ex. « 0262123456 » ligne fixe, « 12345 » trop court, ou « abcd »)
Et valide le formulaire
Alors la soumission est bloquée avec le message « Le numéro de mobile n'est pas au format valide »
Et aucun accès à la transaction de paiement CB n'est permis
```

## Données

| Cas testé | Numéro saisi | Type d'erreur | Comportement attendu |
|---|---|---|---|
| Champ vide | *(vide)* | Obligation de saisie | Rejet : mobile obligatoire (Contrainte 20) |
| Trop court | `0692` | Format incomplet | Rejet : format mobile non reconnu |
| Ligne fixe | `0262123456` | Incompatible SMS | Rejet : numéro mobile exigé |
| Caractères alphanumériques | `+262692abc` | Caractères interdits | Rejet : format invalide |
| Format international valide | `+262692123456` | Format conforme | Accepté : passage au paiement |

## Résultat attendu, calculé à la main

| Grandeur | Valeur attendue | Calcul |
|---|---:|---|
| Statut validation sans mobile | Rejeté | AC-6, Contrainte 20, REQ-005 |
| Statut validation format invalide | Rejeté | Validation regex mobile / E.164 |
| Accès au paiement bancaire | Bloqué | Transaction impossible sans mobile valide |
| Données de contact acceptées | Mobile conforme E.164 | Permet l'envoi SMS de solde et alertes |

## Ce que ce cas ne vérifie pas

- les autres champs obligatoires du formulaire (couvert par `CASE-RES-407`) ;
- l'émission effective du SMS de solde la veille (couvert par `CASE-RES-418`).

---

## Test automatisé

**Nom attendu :**  
`test_CASE_RES_415_rejet_formulaire_coordonnees_mobile_manquant_ou_format_invalide`  
**Fichier :** à renseigner après automatisation

## Revue du test automatisé

- [ ] Le test soumet un formulaire sans numéro de mobile et vérifie le blocage.
- [ ] Le test soumet un numéro trop court et vérifie le rejet.
- [ ] Le test soumet un numéro non mobile et vérifie le rejet.
- [ ] Le test vérifie que le message d'erreur mentionne l'obligation du mobile pour les notifications SMS.
- [ ] Le test renseigne un numéro mobile international valide (+262...) et s'assure du succès.
- [ ] Le nom du test contient `CASE_RES_415`.
- [ ] Aucune assertion étrangère à ce cas n'a été ajoutée.

**Relu par :** à renseigner  
**Remarques :** à renseigner
