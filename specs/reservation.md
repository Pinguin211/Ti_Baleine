# Spécifications — Réservation

**Domaine :** `RESERVATION`

---

## SPEC-RESERVATION-03 — Parcours de réservation grand public multi-sites et paiement scindé (acompte et solde)

**Exigence :** REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, REQ-007, REQ-012, REQ-016, REQ-019, REQ-021, REQ-101, REQ-102, REQ-107, REQ-108 (avec R-01, R-02, R-03, R-04, R-05, R-06, R-07, R-08, R-10, R-11, R-12, R-19, R-20, R-25, Contraintes C-01 à C-07, C-11, C-12, C-13, C-20, C-23, C-25, C-26)  
**Statut :** revue IA faite  
**Version :** v4 (19/08/2026 — CDC v5)

### Règle

Dès son arrivée sur le site public (en français ou en anglais), le client sélectionne son point de départ (Saint-Gilles ou Saint-Leu) et son activité, choisit une date et un créneau horaire disponible (respectant les plannings, jauges et la clôture automatique 2 heures avant le départ), saisit les passagers adultes et enfants ($\ge 4$ ans) avec calcul tarifaire automatique, visualise la décomposition financière (montant total, montant de l'acompte obligatoire exigé immédiatement et solde restant dû), renseigne ses coordonnées de contact obligatoires en mode invité (incluant un numéro de téléphone mobile valide), et règle l'acompte obligatoire (**30 %** pour les formules standard, **50 %** pour les privatisations) par carte bancaire pour confirmer sa réservation.

Le solde restant (70 % ou 50 %) est réglé soit la veille via un lien de paiement sécurisé transmis automatiquement par **SMS à J-1** (avec une durée de validité technique du lien fixée à **1 heure** pour des raisons techniques de sécurité des sessions de paiement — REQ-107), soit directement sur place le jour du départ par carte bancaire au libre choix du client. Pour toute réservation effectuée le jour même, aucun SMS ni lien de solde n'est généré et le solde est obligatoirement réglé sur place par carte bancaire.

### Portée

Cette spécification couvre l'intégralité du tunnel de commande en ligne grand public, du choix de l'embarquement jusqu'à l'affichage de la confirmation de paiement de l'acompte, ainsi que le module de paiement du solde en ligne.

- Couvre le choix du port d'embarquement : **Saint-Gilles** (toute la semaine sur les créneaux 7h, 10h, 14h) ou **Saint-Leu** (mardi et jeudi matin uniquement).
- Couvre la sélection de la prestation : sorties individuelles (Baleines, Dauphins) ou formules de privatisation en demi-journée (matin 7h–12h à Saint-Gilles / dès 9h00 à Saint-Leu, ou après-midi dès 14h00 à Saint-Gilles).
- Couvre l'application de la grille tarifaire standard à Saint-Gilles (Baleines 65 € adulte / 40 € enfant ; Dauphins 50 € adulte / 30 € enfant ; Privatisation Tikap 600 €, Grand Bleu 1 100 €).
- Couvre l'application de la majoration géographique de **+ 10 € / personne** sur les billets individuels à Saint-Leu (Baleines 75 € ad / 50 € enf ; Dauphins 60 € ad / 40 € enf ; Privatisation Tikap forfaitaire à 600 € sans majoration).
- Couvre la gestion des tranches d'âge : adulte dès 12 ans, enfant de 4 à 11 ans inclus, et l'interdiction d'accès pour les enfants de moins de 4 ans.
- Couvre le respect des jauges maximales par créneau : 36 places en standard à Saint-Gilles, 24 places le mardi et jeudi matin (07h00 et 10h00) à Saint-Gilles, et 12 places à Saint-Leu (REQ-108).
- Couvre le masquage des jours de fermeture annuelle (25 décembre et 1er janvier) et le verrouillage automatique des créneaux **2 heures avant l'heure de départ**.
- Couvre l'affichage d'une **mention spécifique d'avertissement** sur tout créneau sous alerte de pré-annulation la veille (émise par l'administrateur) qui reste ouvert à la vente avec des places disponibles.
- Couvre la collecte des coordonnées de contact minimales obligatoires en mode invité sans création de compte (nom, prénom, e-mail, numéro de mobile valide) sans stockage d'indicateur de langue.
- Couvre la bascule bilingue français/anglais à chaque étape du parcours public (tunnel initial et page de paiement du solde).
- Couvre le calcul et l'encaissement de l'**acompte obligatoire** par carte bancaire sécurisée (**30 %** en sorties standard, **50 %** en privatisation) enregistrant la réservation à l'état `payée partiellement`.
- Couvre le déclenchement automatique à J-1 de l'envoi du **SMS** contenant l'URL sécurisée de paiement du solde pour les réservations avec acompte (REQ-021).
- Couvre l'accès et le traitement de la page sécurisée de paiement du solde avec application de la règle d'expiration technique du token fixée à **1 heure** pour des raisons techniques de sécurité des transactions (REQ-107), validant la réservation à l'état `payée complètement` après succès.
- Couvre l'exclusion stricte de génération et d'envoi de SMS pour les réservations créées le jour même de la sortie (R-08, Contrainte 26).
- Ne couvre pas la génération et l'envoi des factures d'acompte et de solde PDF par e-mail → [SPEC-FAC-02](./facturation.md).
- Ne couvre pas le pointage et l'encaissement du solde par carte bancaire sur place par l'administrateur → [SPEC-ADMIN-08](./admin.md).
- Ne couvre pas l'émission des alertes de pré-annulation ni l'annulation par l'administrateur → [SPEC-ADMIN-02](./admin.md), [SPEC-ADMIN-06](./admin.md).

### Scénarios nominaux

```gherkin
Scénario : Réservation individuelle standard au départ de Saint-Gilles avec acompte de 30 %
  Étant donné un client accédant au site web
  Quand il choisit le port de départ « Saint-Gilles », l'activité « Sortie Baleines » et la date du 15 juillet
  Alors il voit les créneaux disponibles à 7h00, 10h00 et 14h00 avec leurs places libres (jauge max : 36 places)
  Quand il sélectionne le créneau de 10h00
  Et renseigne 1 adulte (65 €) et 1 enfant de 8 ans (40 €) (Montant total calculé : 105,00 €)
  Alors le récapitulatif affiche le montant total (105,00 €), l'acompte exigé de 30 % (31,50 €) et le solde restant dû (73,50 €)
  Quand le client saisit ses coordonnées (« Dupont », « Jean », « jean.dupont@test.re », « +262692123456 »)
  Et valide le paiement sécurisé par carte bancaire de l'acompte de 31,50 €
  Alors le paiement de l'acompte est confirmé, la réservation passe à l'état « payée partiellement »
  Et la capacité restante du créneau est décrémentée de 2 places

Scénario : Réservation individuelle au départ de Saint-Leu avec majoration et acompte de 30 %
  Étant donné un client accédant au site web
  Quand il choisit le port de départ « Saint-Leu » et l'activité « Sortie Baleines »
  Alors seuls les mardis et jeudis matin sont proposés avec le départ unique de 9h00 (jauge max : 12 places sur le Tikap)
  Quand il sélectionne le mardi 18 août à 9h00
  Et renseigne 2 adultes (tarif majoré : 75 € × 2 = 150,00 € total)
  Alors le panier affiche le total de 150,00 €, l'acompte de 30 % (45,00 €) et le solde restant dû (105,00 €)
  Quand le client saisit ses coordonnées obligatoires avec un mobile valide et valide le paiement de l'acompte de 45,00 €
  Alors la réservation est enregistrée à l'état « payée partiellement » et le créneau décompte 2 places

Scénario : Réservation d'une privatisation avec acompte de 50 %
  Étant donné un client souhaitant privatiser un navire
  Quand il sélectionne la prestation « Privatisation », le navire « Tikap », le mardi matin (créneau dès 09h00) au port de Saint-Leu
  Alors le montant forfaitaire total de 600,00 € est appliqué
  Et le récapitulatif affiche l'acompte obligatoire de 50 % (300,00 €) et le solde restant dû (300,00 €)
  Quand le client renseigne ses coordonnées et règle l'acompte de 300,00 € par carte bancaire
  Alors la réservation est enregistrée à l'état « payée partiellement » et la totalité de la jauge du créneau est bloquée

Scénario : Réception du SMS à J-1 et paiement du solde en ligne dans le délai de 1 heure
  Étant donné une réservation enregistrée avec acompte versé pour une sortie prévue le lendemain
  Quand la tâche planifiée de J-1 s'exécute
  Alors un SMS contenant un lien de paiement sécurisé avec token temporaire est automatiquement transmis au numéro mobile du client (REQ-021)
  Quand le client clique sur le lien dans les 60 minutes suivant sa génération
  Alors il accède à la page de paiement du solde bilingue FR/EN affichant le détail de sa commande et le solde restant dû
  Quand il valide le règlement par carte bancaire
  Alors le paiement est confirmé et la réservation passe à l'état « payée complètement »

Scénario : Réservation effectuée le jour même de la sortie
  Étant donné un client effectuant une réservation le matin même pour le créneau de 14h00
  Quand il saisit ses passagers et règle l'acompte de 30 % en ligne par carte bancaire
  Alors la réservation est enregistrée à l'état « payée partiellement », aucun SMS ni lien de solde n'est généré (R-08), et le récapitulatif indique que le solde sera réglé sur place par carte bancaire

Scénario : Réservation sur un créneau sous alerte de pré-annulation
  Étant donné un créneau du lendemain à Saint-Gilles 10h00 ayant reçu une alerte de pré-annulation météo la veille à 18h00 et disposant encore de 4 places libres
  Quand un client consulte ce créneau sur le parcours public
  Alors le créneau est affiché comme réservable avec une mention d'avertissement claire (ex: « Créneau sous réserve météo — Remboursement à 100 % garanti en cas d'annulation »)
  Quand le client réserve 2 places adultes (130,00 € total) et règle l'acompte de 30 % (39,00 €)
  Alors la réservation est enregistrée, le créneau affiche 2 places restantes et conserve sa mention d'avertissement
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
| 8 | Numéro de téléphone mobile manquant ou dans un format invalide | Rejet à la validation du formulaire de contact (Contrainte 20) : saisie du mobile obligatoire pour les alertes SMS et l'envoi du lien de solde. |
| 9 | Rejet ou abandon du paiement de l'acompte par carte bancaire | Aucune réservation enregistrée, aucune place décomptée de la jauge. |
| 10 | Accès à la page de paiement du solde après expiration du token technique (> 1 heure — REQ-107) | La page affiche un message d'expiration du lien (choix technique de sécurité) et informe le client que son solde pourra être réglé directement sur place par carte bancaire le jour du départ. |
| 11 | Non-utilisation du lien de solde par le client (lien ignoré) | La réservation reste à l'état « payée partiellement » ; le client est libre de se présenter à l'embarcadère pour régler le solde en CB sur place. |
| 12 | Réservation le jour même (C-26, R-08) | Le système bloque l'envoi de SMS de solde pour ce dossier ; la réservation reste « payée partiellement » en attente du règlement sur place. |
| 13 | Verrouillage temporaire des places lors du paiement CB (timer panier) | Pour des raisons techniques (prévention des conflits d'accès concurrents et du surbooking pendant la transaction bancaire — Question ouverte n°12 §11 du CDC v5), les places sélectionnées sont temporairement verrouillées (timer de 10 min) ; si le paiement expire, est annulé ou rejeté, les places sont automatiquement remises à disposition (REQ-108). |

### Ce qui n'est pas défini

- *19/08/2026* — Heure exacte d'envoi du SMS la veille (J-1) pour le paiement du solde (Question ouverte n°14 §11 du CDC v5).
- *19/08/2026* — Articulation exacte de l'envoi du SMS de solde avec l'alerte météo éventuelle de 18h la veille (Question ouverte n°15 §11 du CDC v5).
- *19/08/2026* — Durée et implémentation du verrouillage temporaire (timer panier) des places pendant le paiement bancaire : choix technique déduit d'un verrou de 10 minutes pour prévenir les accès concurrents (Question ouverte n°12 §11 du CDC v5).
- *19/08/2026* — Formulation textuelle exacte validée par la direction pour la mention d'avertissement de pré-annulation affichée sur les créneaux ouverts.

### Critères d'acceptation

- [ ] AC-1 — Le client peut basculer entre français et anglais à chaque étape du tunnel de réservation et sur la page de paiement du solde sans perte de données saisies (REQ-002, REQ-101).
- [ ] AC-2 — Les créneaux proposés respectent strictement les plannings et jauges des deux ports : Saint-Gilles (36 places standard, 24 places mar/jeu matin) et Saint-Leu (12 places, mar/jeu matin uniquement) (REQ-001, REQ-003, REQ-012, R-01, R-10, REQ-108).
- [ ] AC-3 — Les créneaux dont l'heure de départ est située à moins de 2 heures du moment présent sont automatiquement verrouillés à la vente (REQ-003, R-11).
- [ ] AC-4 — Le calcul tarifaire applique la tarification différenciée adulte ($\ge 12$ ans) et enfant (4–11 ans), la majoration de + 10 € / personne sur les billets individuels à Saint-Leu, bloque les enfants de moins de 4 ans, et affiche le montant total, l'acompte exigé et le solde restant (REQ-004, R-04, R-05, R-06, R-07).
- [ ] AC-5 — La réservation d'une formule privatisation applique le forfait correspondant (Tikap 600 €, Grand Bleu 1 100 €), respecte la rotation des navires, applique un acompte obligatoire de **50 %** (solde de 50 %) et bloque la totalité de la capacité (REQ-004, REQ-016, R-04, R-05, R-07, R-19, C-25).
- [ ] AC-6 — La validation de commande exige obligatoirement la saisie d'un nom, prénom, e-mail et d'un numéro de téléphone mobile au format valide (REQ-005, C-20, REQ-105).
- [ ] AC-7 — Tout créneau placé sous pré-alerte administrative la veille à 18h et disposant de places libres affiche obligatoirement la mention textuelle d'avertissement sur l'interface publique (REQ-003, REQ-019, R-25).
- [ ] AC-8 — Le paiement de l'acompte obligatoire (30 % standard, 50 % privatisation) par carte bancaire valide la réservation à l'état « payée partiellement », décrémente immédiatement la jauge et affiche la confirmation à l'écran (REQ-006, REQ-007, R-07).
- [ ] AC-9 — Le système déclenche automatiquement à J-1 l'envoi d'un SMS contenant le lien sécurisé de règlement du solde aux réservations ayant versé un acompte (REQ-021, REQ-106, R-07).
- [ ] AC-10 — La page de paiement du solde accessible via le lien SMS est bilingue FR/EN, responsive, vérifie la validité technique du token fixée à **1 heure** et bascule la réservation à l'état « payée complètement » dès confirmation bancaire du solde (REQ-101, REQ-102, REQ-107).
- [ ] AC-11 — Pour toute réservation effectuée le jour même de la sortie, le système bloque la génération et l'envoi de SMS/lien de solde et exige le règlement du solde sur place par carte bancaire (R-08, Contrainte 26).

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Intégrer la grille tarifaire complète conforme au CDC v5 (tarifs individuels Baleines 65€/75€, Dauphins 50€/60€, privatisations 600€/1100€) | Acceptée | Remplacement des prix fictifs par les tarifs officiels R-04 et R-05. |
| Prendre en compte la distinction des tranches d'âge et l'interdiction des enfants < 4 ans | Acceptée | Conforme à R-06 et REQ-004 (cas limite 3 et AC-4). |
| Ajouter la règle de clôture automatique à H-2 | Acceptée | Conforme à R-11 et Contrainte 7 (cas limite 1 et AC-3). |
| Intégrer l'obligation du numéro de téléphone mobile pour les notifications SMS | Acceptée | Conforme à REQ-005 et Contrainte 20 (cas limite 8 et AC-6). |
| Intégrer l'affichage de la mention d'alerte météo sur les créneaux ouverts | Acceptée | Conforme à REQ-019, R-25 et AC-7. |
| Intégrer le modèle de paiement scindé (acompte 30 % standard / 50 % privatisation + solde à J-1 par SMS) | Acceptée | Conforme à R-07, REQ-004, REQ-006, REQ-021, Contraintes 6 et 25 du CDC v5. |
| Spécifier l'exclusion des réservations du jour même pour l'envoi de SMS | Acceptée | Conforme à R-08 et Contrainte 26 du CDC v5 (cas limite 12 et AC-11). |
| Cadrer la durée de validité technique du token de solde à 1 heure | Acceptée | Conforme à REQ-107 et aux choix d'architecture technique (cas limite 10 et AC-10). |
| Préciser la liberté pour le client de solder en ligne ou sur place | Acceptée | Conforme à R-07 et au CDC v5 §6. |
