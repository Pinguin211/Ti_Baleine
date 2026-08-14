## SPEC-RESERVATION-03 — Parcours de réservation grand public multi-sites

**Exigence :** REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, REQ-007, REQ-012, REQ-016, REQ-019 (avec R-01, R-02, R-03, R-04, R-05, R-06, R-07, R-10, R-11, R-12, R-19, R-20, R-25, Contraintes C-01 à C-07, C-11, C-12, C-13, C-20, C-23)
**Statut :** revue IA faite
**Version :** v2

### Règle

Dès son arrivée sur le site public (en français ou en anglais), le client sélectionne son point de départ (Saint-Gilles ou Saint-Leu) et son activité, choisit une date et un créneau horaire disponible (respectant les plannings, jauges et la clôture automatique 2 heures avant le départ), saisit les passagers adultes et enfants ($\ge 4$ ans) avec calcul tarifaire automatique, renseigne ses coordonnées de contact obligatoires en mode invité (incluant un numéro de téléphone mobile valide), et règle l'intégralité de sa commande par carte bancaire.

### Portée

Cette spécification couvre l'intégralité du tunnel de commande en ligne grand public, du choix de l'embarquement jusqu'à l'affichage de la confirmation de paiement.

- Couvre le choix du port d'embarquement : **Saint-Gilles** (toute la semaine sur les créneaux 7h, 10h, 14h) ou **Saint-Leu** (mardi et jeudi matin uniquement).
- Couvre la sélection de la prestation : sorties individuelles (Baleines, Dauphins) ou formules de privatisation en demi-journée (matin 7h–12h à Saint-Gilles / dès 9h00 à Saint-Leu, ou après-midi dès 14h00 à Saint-Gilles).
- Couvre l'application de la grille tarifaire standard à Saint-Gilles (Baleines 65 € adulte / 40 € enfant ; Dauphins 50 € adulte / 30 € enfant ; Privatisation Tikap 600 €, Grand Bleu 1 100 €).
- Couvre l'application de la majoration géographique de **+ 10 € / personne** sur les billets individuels à Saint-Leu (Baleines 75 € ad / 50 € enf ; Dauphins 60 € ad / 40 € enf ; Privatisation Tikap forfaitaire à 600 € sans majoration).
- Couvre la gestion des tranches d'âge : adulte dès 12 ans, enfant de 4 à 11 ans inclus, et l'interdiction d'accès pour les enfants de moins de 4 ans.
- Couvre le respect des jauges maximales par créneau : 36 places en standard à Saint-Gilles, 24 places le mardi et jeudi matin (07h00 et 10h00) à Saint-Gilles, et 12 places à Saint-Leu.
- Couvre le masquage des jours de fermeture annuelle (25 décembre et 1er janvier) et le verrouillage automatique des créneaux **2 heures avant l'heure de départ**.
- Couvre l'affichage d'une **mention spécifique d'avertissement** sur tout créneau sous alerte de pré-annulation la veille (émise par l'administrateur) qui reste ouvert à la vente avec des places disponibles.
- Couvre la collecte des coordonnées de contact minimales obligatoires en mode invité sans création de compte (nom, prénom, e-mail, numéro de mobile valide) sans stockage d'indicateur de langue.
- Couvre la bascule bilingue français/anglais à chaque étape.
- Couvre la validation du paiement à 100 % par carte bancaire sécurisée.
- Ne couvre pas la génération et l'envoi de la facture acquittée par e-mail → [SPEC-FAC-02](./facturation.md)
- Ne couvre pas l'émission des alertes de pré-annulation ni l'annulation par l'administrateur → [SPEC-ADMIN-02](./admin.md), [SPEC-ADMIN-06](./admin.md)

### Scénarios nominaux

```gherkin
Scénario : Réservation individuelle standard au départ de Saint-Gilles
  Étant donné un client accédant au site web
  Quand il choisit le port de départ « Saint-Gilles », l'activité « Sortie Baleines » et la date du 15 juillet
  Alors il voit les créneaux disponibles à 7h00, 10h00 et 14h00 avec leurs places libres (jauge max : 36 places)
  Quand il sélectionne le créneau de 10h00
  Et renseigne 1 adulte (65 €) et 1 enfant de 8 ans (40 €)
  Et saisit ses coordonnées (« Dupont », « Jean », « jean.dupont@test.re », « +262692123456 »)
  Et valide le paiement sécurisé par carte bancaire de 105 €
  Alors le paiement est confirmé, la réservation passe à l'état « payée »
  Et la capacité restante du créneau est décrémentée de 2 places

Scénario : Réservation individuelle au départ de Saint-Leu avec majoration géographique
  Étant donné un client accédant au site web
  Quand il choisit le port de départ « Saint-Leu » et l'activité « Sortie Baleines »
  Alors seuls les mardis et jeudis matin sont proposés avec le départ unique de 9h00 (jauge max : 12 places sur le Tikap)
  Quand il sélectionne le mardi 18 août à 9h00
  Et renseigne 2 adultes (tarif majoré : 75 € × 2 = 150 €)
  Et saisit ses coordonnées obligatoires avec un numéro de téléphone mobile valide
  Et valide le paiement de 150 €
  Alors la réservation est enregistrée à l'état « payée » et le créneau décompte 2 places

Scénario : Réservation sur un créneau sous alerte de pré-annulation
  Étant donné un créneau du lendemain à Saint-Gilles 10h00 ayant reçu une alerte de pré-annulation météo la veille à 18h00 et disposant encore de 4 places libres
  Quand un client consulte ce créneau sur le parcours public
  Alors le créneau est affiché comme réservable avec une mention d'avertissement claire (ex: « Créneau sous réserve météo — Remboursement à 100 % garanti en cas d'annulation »)
  Quand le client réserve et paie 2 places adultes (130 €)
  Alors la réservation est acceptée, le créneau affiche 2 places restantes et conserve sa mention d'avertissement

Scénario : Réservation d'une privatisation demi-journée
  Étant donné un client souhaitant privatiser un navire
  Quand il sélectionne la prestation « Privatisation », le navire « Tikap », le mardi matin (créneau dès 09h00) au port de Saint-Leu
  Alors le montant forfaitaire de 600 € est appliqué (sans majoration géographique)
  Quand le client renseigne ses coordonnées et règle 600 € par carte bancaire
  Alors la réservation est enregistrée et l'ensemble de la capacité du créneau est bloquée
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Tentative de réservation à moins de 2 heures du départ (ex. 8h15 pour un créneau de 10h00) | Clôture automatique (R-11) : le créneau n'est plus sélectionnable et apparaît comme clos, toute validation est rejetée. |
| 2 | Consultation sur les dates du 25 décembre ou du 1er janvier | Fermeture annuelle (R-02) : aucun créneau n'est proposé sur ces dates. |
| 3 | Saisie d'un participant âgé de moins de 4 ans | Rejet immédiat (R-06) : message d'inadmissibilité à bord pour des raisons de sécurité, validation bloquée. |
| 4 | Réservation sur le port de Saint-Leu en dehors des mardis et jeudis matin | Créneaux indisponibles : Saint-Leu est ouvert uniquement les mardis et jeudis matin (départ standard individuel à 9h00, ou privatisation matin à partir de 9h00 sur le Tikap). Saint-Leu est fermé l'après-midi (le Tikap regagnant Saint-Gilles) et les autres jours de la semaine. |
| 5 | Créneau du mardi ou jeudi matin (07h00 et 10h00) à Saint-Gilles | Jauge plafonnée à 24 places (Grand Bleu seul, le Tikap opérant à Saint-Leu le matin — R-10). La privatisation du Tikap n'est pas disponible le matin à Saint-Gilles ces jours-là. |
| 6 | Réservation d'un nombre de places supérieur aux places restantes sur le créneau | Réservation bloquée : message indiquant le nombre de places maximum disponibles. |
| 7 | Réservation de la dernière place disponible d'un créneau | Réservation acceptée, le créneau passe à l'état « complet » et n'est plus proposé aux clients suivants. |
| 8 | Numéro de téléphone mobile manquant ou dans un format invalide | Rejet à la validation du formulaire de contact (Contrainte 20) : saisie du mobile obligatoire pour les alertes SMS. |
| 9 | Rejet ou abandon du paiement par carte bancaire | Aucune réservation enregistrée, aucune place décomptée de la jauge. |
| 10 | Verrouillage temporaire des places lors du paiement CB (timer panier) | Les places sélectionnées sont temporairement verrouillées (ex. timer de 10 min) pendant le paiement bancaire afin d'éviter tout surbooking concurrent ; si le paiement expire, est annulé ou rejeté, les places sont automatiquement remises à disposition (choix déduit — question ouverte n°12 §11 du CDC v4). |

### Ce qui n'est pas défini

- *14/08/2026* — Durée et implémentation du verrouillage temporaire (timer panier) des places pendant le paiement bancaire : choix déduit d'un verrou de 10 minutes pour prévenir les accès concurrents, posé comme question ouverte avec le client (Question ouverte n°12 §11 du CDC v4).
- *14/08/2026* — Formulation textuelle exacte validée par la direction pour la mention d'avertissement de pré-annulation affichée sur les créneaux ouverts.

### Critères d'acceptation

- [ ] AC-1 — Le client peut basculer entre français et anglais à chaque étape du tunnel de réservation sans perte de données saisies (REQ-002, REQ-101).
- [ ] AC-2 — Les créneaux proposés respectent strictement les plannings et jauges des deux ports : Saint-Gilles (36 places standard, 24 places mar/jeu matin) et Saint-Leu (12 places, mar/jeu matin uniquement) (REQ-001, REQ-003, REQ-012, R-01, R-10).
- [ ] AC-3 — Les créneaux dont l'heure de départ est située à moins de 2 heures du moment présent sont automatiquement verrouillés à la vente (REQ-003, R-11).
- [ ] AC-4 — Le calcul tarifaire applique la tarification différenciée adulte ($\ge 12$ ans) et enfant (4–11 ans), la majoration de + 10 € / personne sur les billets individuels à Saint-Leu, et bloque les enfants de moins de 4 ans (REQ-004, R-04, R-05, R-06).
- [ ] AC-5 — La réservation d'une formule privatisation applique le forfait correspondant (Tikap 600 €, Grand Bleu 1 100 €), respecte la rotation des navires (Tikap privatisable le mar/jeu matin à Saint-Leu dès 9h00, et l'après-midi dès 14h00 à Saint-Gilles) et bloque la totalité de la capacité (REQ-016, R-04, R-05, R-19).
- [ ] AC-6 — La validation de commande exige obligatoirement la saisie d'un nom, prénom, e-mail et d'un numéro de téléphone mobile au format valide (REQ-005, C-20, REQ-105).
- [ ] AC-7 — Tout créneau placé sous pré-alerte administrative la veille à 18h et disposant de places libres affiche obligatoirement la mention textuelle d'avertissement sur l'interface publique (REQ-003, REQ-019, R-25).
- [ ] AC-8 — Le paiement intégral (100 %) par carte bancaire valide la réservation à l'état « payée », décrémente immédiatement la jauge et affiche la confirmation à l'écran (REQ-006, REQ-007).

### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Intégrer la grille tarifaire complète conforme au CDC v4 (tarifs individuels Baleines 65€/75€, Dauphins 50€/60€, privatisations 600€/1100€) | Acceptée | Remplacement des prix fictifs par les tarifs officiels R-04 et R-05. |
| Prendre en compte la distinction des tranches d'âge et l'interdiction des enfants < 4 ans | Acceptée | Conforme à R-06 et REQ-004 (cas limite 3 et AC-4). |
| Ajouter la règle de clôture automatique à H-2 | Acceptée | Conforme à R-11 et Contrainte 7 (cas limite 1 et AC-3). |
| Intégrer l'obligation du numéro de téléphone mobile pour les notifications SMS | Acceptée | Conforme à REQ-005 et Contrainte 20 (cas limite 8 et AC-6). |
| Intégrer l'affichage de la mention d'alerte météo sur les créneaux ouverts | Acceptée | Conforme aux nouveautés du CR-04 / CDC v4 (REQ-019, R-25, AC-7). |
| Clarifier les créneaux de privatisation à Saint-Leu (mar/jeu matin dès 9h) et le retour du Tikap à Saint-Gilles l'après-midi | Acceptée | Conforme aux règles d'exploitation navale confirmées (Portée, Scénario 4, Cas limites 4 & 5, AC-2 & AC-5). |

Les refus se reportent aussi dans [journal](../docs/journal.md).
