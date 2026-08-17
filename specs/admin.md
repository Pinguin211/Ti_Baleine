# Spécifications — Admin (back-office)

**Domaine :** `ADMIN`

---

## SPEC-ADMIN-01 — Consultation du planning et supervision multi-sites

**Exigence :** REQ-009, REQ-010 (avec R-01, R-03, R-10, R-25, Contraintes C-03, C-04, C-05, C-16, REQ-103)
**Statut :** revue IA faite
**Version :** v2

### Règle

> L'administrateur peut consulter le planning consolidé des réservations par port, jour et créneau horaire, et identifier immédiatement les créneaux placés sous alerte de pré-annulation.

### Portée

- Couvre l'affichage consolidé de la grille de planning multi-sites : Saint-Gilles (7h, 10h, 14h tous les jours) et Saint-Leu (9h les mardis et jeudis).
- Couvre l'affichage de l'état d'alerte de pré-annulation sur les créneaux ciblés la veille à 18h.
- Ne couvre pas la décision manuelle d'annuler un départ sous le seuil de maintien (6 passagers) : reste manuelle, hors système.
- Ne couvre pas le calcul et la visualisation du taux de remplissage / jauges réelles (12, 24 ou 36 places) → `SPEC-ADMIN-05`.
- Ne couvre pas l'authentification au back-office → `SPEC-ADMIN-04`.
- Ne couvre pas l'annulation d'une réservation → `SPEC-ADMIN-02`.
- Ne couvre pas l'émission de l'alerte de pré-annulation → `SPEC-ADMIN-06`.
- Ne couvre pas la modification de configuration d'un créneau → `SPEC-ADMIN-07`.

### Scénarios nominaux

```gherkin
Scénario : Affichage de la grille du planning consolidé
  Étant donné l'administrateur connecté au back-office depuis un poste de bureau (Desktop)
  Quand il ouvre l'écran planning
  Alors il voit la liste des créneaux consolidée par port (Saint-Gilles ou Saint-Leu), jour et heure : 7h, 10h et 14h à Saint-Gilles tous les jours, et 9h à Saint-Leu le mardi et le jeudi uniquement (R-01)

Scénario : Détail d'un créneau et statut d'alerte
  Étant donné un créneau affiché sur le planning
  Quand l'administrateur le consulte
  Alors il voit le type de sortie affecté, les navires mobilisés (Tikap et/ou Grand Bleu) et un indicateur visuel explicite si le créneau est sous alerte de pré-annulation (R-25)
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Aucun créneau programmé pour la journée consultée | Le planning affiche un état vide explicite (aucun écran figé ni liste factice). |
| 2 | Créneau sans navire affecté | Le créneau est affiché avec un statut distinctif « non affecté ». |
| 3 | Créneau sans type de sortie renseigné | Le créneau est affiché avec un statut « type non renseigné ». |
| 4 | Consultation du planning à toute heure de la journée | Le planning reste consultable en permanence sans restriction horaire. |
| 5 | Perte de connexion réseau pendant le chargement | Un message d'erreur explicite est affiché avec un bouton permettant de réessayer. |
| 6 | Créneau sous alerte de pré-annulation émise la veille | Un badge visuel distinctif « Sous pré-alerte » apparaît sur la carte du créneau. |

### Critères d'acceptation

- [ ] AC-1 — Le planning affiche les créneaux consolidés par port, avec navire et type de sortie (`CASE-ADMIN-01`).
- [ ] AC-2 — Tout créneau ayant fait l'objet d'une alerte de pré-annulation affiche un indicateur visuel clair sur la grille de planning.

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Intégrer l'indicateur visuel des créneaux sous alerte de pré-annulation | Acceptée | Conforme aux règles R-22, R-25 et aux évolutions du CR-04 / CDC v4. |
| Harmoniser les références documentaires vers le CDC v4 | Acceptée | Référentiel mis à jour. |

---

## SPEC-ADMIN-02 — Annulation d'une réservation (suppression totale des billets) et notification client

**Exigence :** REQ-013, REQ-014, REQ-020 (avec R-16, R-17, R-27, R-28, Contraintes C-08, C-09, C-10, C-24, REQ-106, REQ-107)
**Statut :** validée
**Version :** v2

### Règle

> L'administrateur peut annuler une réservation depuis le back-office via une action préconfigurée qui supprime l'intégralité des billets (`BOOKING_ITEMS`) rattachés à la commande, ce qui libère immédiatement et de façon synchrone toutes les places sur le créneau, permet la saisie ou la sélection d'un motif d'annulation à la volée (REQ-020) pour composer le SMS de notification au client (REQ-014) — sans enregistrement durable du motif en base —, tandis que la fiche de réservation est conservée (avec 0 billet actif) pour l'historique et la conformité comptable.

### Portée

- Couvre l'annulation d'une réservation à l'initiative de l'administrateur (motif météo/technique ou suite à demande d'un client).
- **Architecture technique unifiée :** L'action d'annulation totale utilise la même fonction back-end de suppression de billets que la réduction (`SPEC-ADMIN-03`), préconfigurée pour retirer **la totalité des billets actifs (`BOOKING_ITEMS`)** de la réservation en une seule opération.
- Couvre la conservation de l'entité réservation (`BOOKINGS`) en base de données avec son historique de paiement initial et 0 billet actif (aucun enregistrement détruit).
- Couvre la saisie/sélection du motif d'annulation à des fins informatives pour composer le message de notification envoyé au client :
  - *Annulation administrative météo/technique suite à alerte* (remboursement dérogatoire à 100 % manuel hors système — R-27)
  - *Désistement / annulation « par peur » du client suite à alerte* (remboursement dérogatoire à 100 % manuel hors système — R-28)
  - *Annulation standard hors alerte*
  - Le motif sert exclusivement à la notification client et n'est pas persisté sur l'entité réservation.
- Couvre la libération synchrone et immédiate des places sur le créneau de réservation (remises en vente jusqu'à H-2).
- Couvre le déclenchement automatique de l'entité temporaire de notification (SMS transactionnel d'information) au numéro de téléphone mobile du client.
- Ne couvre pas les opérations financières de remboursement bancaire (gérées 100 % manuellement hors système selon le CDC v4, C-10).

### Scénarios nominaux

```gherkin
Scénario : Annulation complète d'une réservation via suppression de tous ses billets
  Étant donné une réservation confirmée détenant 2 billets adultes sur un créneau sous pré-alerte
  Et l'administrateur connecté au back-office recevant la demande d'annulation du client
  Quand l'administrateur clique sur le bouton « Annuler toute la réservation »
  Et sélectionne le motif « Annulation client par peur suite à alerte météo »
  Alors la fonction technique supprime les 2 billets (BOOKING_ITEMS) associés à la réservation
  Et la réservation est conservée avec 0 billet actif
  Et les 2 places sont immédiatement remises à disposition sur l'interface de réservation (REQ-013)
  Et un SMS transactionnel de notification contenant le message informatif est automatiquement transmis au numéro mobile du client (REQ-014)

Scénario : Annulation administrative d'office pour cause météo
  Étant donné une réservation confirmée avec 3 billets
  Quand l'administrateur déclenche l'annulation d'office pour cause météo
  Et renseigne le motif « Annulation administrative météo »
  Alors les 3 billets sont supprimés de la réservation, les places sont libérées sur le créneau et la notification SMS d'information est envoyée au client
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Demande d'annulation intervenant jusqu'au moment du départ | Annulation autorisée : l'administrateur peut annuler la réservation (supprimer les billets) sans délai minimal préalable jusqu'à l'heure exacte de départ (Question ouverte n°1 §11 du CDC v4). |
| 2 | Réservation n'ayant déjà plus aucun billet actif (0 billet) | Action impossible, bouton d'annulation désactivé, aucun second SMS envoyé. |
| 3 | Demande d'annulation alors que le créneau est déjà passé (date et heure de départ échues) | Annulation rejetée : l'administrateur ne peut plus annuler une réservation après la date et l'heure du départ (choix déduit — question ouverte n°1 §11 du CDC v4 en attente de confirmation client). |
| 4 | Numéro de téléphone mobile manquant ou invalide | La suppression des billets et la libération des places sont exécutées en base, mais l'échec d'envoi du SMS est journalisé dans les logs (REQ-106). |
| 5 | Échec temporaire de la passerelle SMS | La suppression des billets et la libération de jauge sont validées avec succès ; l'échec SMS est notifié à l'admin pour suivi. |
| 6 | Coupure réseau pendant la validation de l'annulation | Cohérence transactionnelle garantie : soit la suppression de l'ensemble des billets et la libération des places sont validées, soit aucun changement n'est opéré (REQ-107). |
| 7 | L'annulation fait passer le nombre de passagers sous le seuil de maintien (6 passagers — R-09) | La décision de maintenir ou de supprimer le départ reste manuelle hors système. |

### Ce qui n'est pas défini

- *14/08/2026* — Plage horaire d'annulation admin : annulation possible jusqu'à l'heure exacte du départ, mais strictement bloquée après le départ (choix déduit — question ouverte n°1 §11 du CDC v4 en attente de confirmation client).
- *14/08/2026* — Canal de notification pour les annulations : utilisation exclusive du SMS (choix déduit de REQ-014), posé comme question ouverte à reconfirmer avec le client (Question ouverte n°13 §11 du CDC v4).
- *14/08/2026* — Choix du prestataire de passerelle SMS transactionnelle (ex: Twilio, OVH SMS, SMS Factor — Question ouverte n°2 §11 du CDC v4).

### Critères d'acceptation

- [ ] AC-1 — L'annulation d'une réservation supprime la totalité de ses billets (`BOOKING_ITEMS`), conserve la réservation avec 0 billet actif, propose la saisie du motif à la volée pour composer le SMS (REQ-020, sans persistance en base) et déclenche la notification au client (REQ-013, `CASE-ADMIN-02`).
- [ ] AC-2 — Les places correspondant aux billets supprimés sont immédiatement et synchroniquement remises à disposition sur la jauge du créneau (REQ-013, `CASE-ADMIN-03`).
- [ ] AC-3 — L'annulation déclenche l'envoi immédiat d'un SMS d'information au numéro de téléphone mobile du client (REQ-014, `CASE-ADMIN-04`).

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Clarifier la distinction entre entité Réservation (conservée) et Billets (supprimés) | Acceptée | Architecture unifiée conforme au MLD (`BOOKING_ITEMS`). |
| Intégrer l'enregistrement du motif d'annulation (météo suite à alerte vs par peur) exigé par REQ-020 | Acceptée | Motif demandé à l'admin pour la composition du SMS de notification client sans persistance sur la réservation. |
| Mettre à jour les références vers le CDC v4 | Acceptée | Nettoyage des mentions CDC v3. |

---

## SPEC-ADMIN-03 — Réduction du nombre de passagers (suppression partielle de billets)

**Exigence :** REQ-015 (avec R-18, Contrainte C-08, REQ-107)
**Statut :** validée
**Version :** v2

### Règle

> L'administrateur peut réduire le nombre de passagers d'une réservation existante depuis le back-office en supprimant $N$ billets (`BOOKING_ITEMS`) rattachés à la commande (adultes et/ou enfants), ce qui libère synchroniquement les $N$ places correspondantes sur le créneau, sans possibilité d'ajouter des billets ni de modifier la date.

### Portée

- Couvre le retrait sélectif de $N$ billets individuels (`BOOKING_ITEMS`) rattachés à une réservation payée.
- **Architecture technique unifiée :** Utilise la même fonction back-end de suppression de billets que `SPEC-ADMIN-02`.
- Couvre la remise à disposition immédiate et synchrone des places libérées sur le créneau concerné.
- Ne couvre pas l'ajout de billets sur une réservation existante (nécessite une nouvelle commande séparée selon R-18 et CDC v4 §6).
- Ne couvre pas le report de date ou d'horaire (nécessite annulation préalable selon R-18).
- Ne couvre pas le remboursement financier consécutif à la réduction (géré manuellement hors système).
- Si la suppression de billets ramène le total de billets actifs à **0**, le système applique automatiquement la logique complète d'annulation de `SPEC-ADMIN-02` (saisie du motif et envoi du SMS de notification au client).

### Scénarios nominaux

```gherkin
Scénario : Réduction partielle de passagers par suppression de billets
  Étant donné une réservation confirmée détenant 3 billets adultes et 1 billet enfant
  Et l'administrateur connecté au back-office
  Quand l'administrateur choisit de retirer 1 billet adulte de la réservation
  Alors 1 billet adulte (BOOKING_ITEM) est supprimé de la réservation
  Et la réservation ne détient plus que 2 billets adultes et 1 billet enfant
  Et 1 place est immédiatement libérée et remise à disposition sur le créneau (REQ-015)

Scénario : Suppression de l'ensemble des billets via l'écran de réduction
  Étant donné une réservation confirmée détenant 2 billets
  Quand l'administrateur supprime les 2 billets (ramenant le nombre de billets à 0)
  Et sélectionne le motif d'annulation
  Alors la réservation passe à 0 billet actif et le SMS de notification d'annulation est automatiquement envoyé au client (SPEC-ADMIN-02)
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Tentative de rajouter un ou plusieurs billets sur la réservation | Rejet strict (R-18) : l'ajout de billets est impossible sur une commande existante. |
| 2 | Suppression ramenant le nombre de billets restants à 0 | Traitement unifié identique à `SPEC-ADMIN-02` : la réservation conserve 0 billet et déclenche le SMS de notification. |
| 3 | Réservation n'ayant déjà plus aucun billet actif (0 billet) | Aucune réduction supplémentaire applicable. |
| 4 | Tentative de modification de la date ou du port de départ lors de la réduction | Rejet strict (R-18) : aucun report ni changement de date autorisé. |
| 5 | Créneau concerné déjà passé | Modification rejetée. |
| 6 | Coupure réseau pendant la mise à jour | Cohérence transactionnelle de la jauge garantie (REQ-107). |

### Ce qui n'est pas défini

- *14/08/2026* — Format d'affichage du détail après réduction (conservation de l'historique des billets supprimés vs suppression physique avec trace d'audit).

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut supprimer sélectivement $N$ billets adultes et/ou enfants d'une réservation, libérant synchroniquement $N$ places sur le créneau (`CASE-ADMIN-05`, `CASE-ADMIN-06`).
- [ ] AC-2 — Toute tentative d'ajout de billet ou de modification de date sur une réservation existante est strictement bloquée (R-18).
- [ ] AC-3 — Une réduction supprimant la totalité des billets (0 billet restant) applique le traitement complet d'annulation avec motif informatif et SMS de notification (`CASE-ADMIN-09`).

---

## SPEC-ADMIN-04 — Authentification au back-office administrateur

**Exigence :** Contrainte C-16, REQ-103 (et Question ouverte Q8 §11 du CDC v4)
**Statut :** revue IA faite
**Version :** v2

### Règle

> L'administrateur unique de Ti'Baleine peut se connecter de manière sécurisée au back-office sur poste de bureau (Desktop) avec un identifiant e-mail et un mot de passe valides.

### Portée

- Couvre l'authentification sécurisée sur l'unique profil administrateur du système (C-16).
- Couvre la redirection vers le tableau de bord / planning des réservations après connexion réussie.
- Ne couvre pas la création de sous-comptes (profil unique selon C-16, CDC v4 §6).
- Ne couvre pas la procédure de réinitialisation de mot de passe oublié (traitée par procédure d'administration système).

### Scénarios nominaux

```gherkin
Scénario : Connexion administrateur réussie
  Étant donné l'administrateur sur la page d'authentification du back-office
  Quand il saisit un identifiant e-mail valide et son mot de passe
  Alors il est authentifié avec succès et redirigé vers le planning consolidé des réservations
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Identifiant ou mot de passe erroné | Accès refusé, affichage d'un message d'erreur générique sans divulgation d'information sur l'existence du compte. |
| 2 | Champs laissés vides | Blocage à la validation du formulaire côté client. |
| 3 | Tentatives de connexion infructueuses répétées | Application d'un ralentissement / blocage temporaire contre les attaques par force brute. |
| 4 | Session expirée après inactivité prolongée | Déconnexion automatique et redirection vers la mire d'authentification. |

### Ce qui n'est pas défini

- *14/08/2026* — Durée exacte du timeout de session d'inactivité avant déconnexion automatique.

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut se connecter avec ses identifiants valides et accéder au tableau de bord (`CASE-ADMIN-07`).
- [ ] AC-2 — Tout accès non authentifié aux URL du back-office est intercepté et redirigé vers l'écran de connexion.

---

## SPEC-ADMIN-05 — Visualisation du taux de remplissage et jauges par créneau

**Exigence :** REQ-010 (avec R-01, R-03, R-10, Contrainte C-05, REQ-107)
**Statut :** revue IA faite
**Version :** v2

### Règle

> L'administrateur peut visualiser sur le planning le taux de remplissage et la capacité restante de chaque créneau selon la jauge réelle applicable (12 places à Saint-Leu, 24 places le mardi et jeudi matin à Saint-Gilles, 36 places standard à Saint-Gilles).

### Portée

- Couvre le calcul et la visualisation du taux de remplissage par créneau, déterminé dynamiquement par le décompte des billets actifs existants rattachés au créneau (`COUNT(BOOKING_ITEMS)`).
- Couvre l'adaptation dynamique de la jauge maximale selon le site et l'horaire :
  - Saint-Leu (mardi / jeudi 9h) : **12 places** (Tikap)
  - Saint-Gilles (mardi / jeudi 7h et 10h) : **24 places** (Grand Bleu seul)
  - Saint-Gilles standard : **36 places** (Tikap + Grand Bleu)
- Ne couvre pas la modification de configuration de jauge d'un créneau → `SPEC-ADMIN-07`.

### Scénarios nominaux

```gherkin
Scénario : Visualisation du taux de remplissage d'un créneau standard
  Étant donné un créneau du mercredi 10h00 à Saint-Gilles ayant 27 billets actifs (BOOKING_ITEMS)
  Quand l'administrateur consulte le planning
  Alors le remplissage est affiché à 27/36 places (75 %) avec un indicateur de disponibilité

Scénario : Visualisation du taux de remplissage le mardi matin à Saint-Gilles
  Étant donné un créneau du mardi 07h00 à Saint-Gilles ayant 18 billets actifs (BOOKING_ITEMS)
  Quand l'administrateur consulte le planning
  Alors la jauge maximale prise en compte est de 24 places et le remplissage affiché est 18/24 (75 %)
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Créneau à 0 billet actif | Affichage à 0 % / 0 place réservée. |
| 2 | Créneau complet (nombre de billets actifs = jauge) | Affichage à 100 % avec badge « Complet ». |
| 3 | Suppression de billets effectuée (annulation ou réduction) | Recalcul instantané du nombre de billets et du taux de remplissage (REQ-107). |
| 4 | Créneau privatisé (forfait navire) | Affichage spécifique indiquant « Navire privatisé » bloquant la totalité de la jauge (R-12). |

### Critères d'acceptation

- [ ] AC-1 — Le calcul du taux de remplissage s'effectue sur la base du nombre de billets actifs existants (`BOOKING_ITEMS`) rapporté à la jauge réelle du créneau (12, 24 ou 36 places) et se met à jour en temps réel lors de toute modification (`CASE-ADMIN-08`).

---

## SPEC-ADMIN-06 — Envoi groupé d'alertes de pré-annulation la veille à 18h

**Exigence :** REQ-017, REQ-018, REQ-019 (avec R-22, R-23, R-24, R-26, Contraintes C-21, C-22, C-23, REQ-106)
**Statut :** validée
**Version :** v1

### Règle

> L'administrateur peut sélectionner la veille au soir à 18h un ou plusieurs créneaux du lendemain pour leur envoyer une alerte de pré-annulation groupée par SMS ou e-mail, en préremplissant le message bilingue combiné (FR + EN) via des propositions de templates types codées en dur dans l'interface et en personnalisant le motif.

### Portée

- Couvre la sélection de un ou plusieurs créneaux du lendemain (Saint-Gilles et/ou Saint-Leu) pour l'envoi groupé d'une alerte la veille à 18h.
- Couvre le choix du canal de diffusion : SMS, E-mail ou les deux.
- Couvre l'intégration dans l'interface de **propositions de templates bilingues codées en dur** (ex. *Météo défavorable*, *Incident technique*) pour préremplir instantanément la zone de texte éditable.
- Couvre la personnalisation libre du texte / motif par l'administrateur dans le champ de message.
- Couvre la génération et la diffusion d'un **message bilingue combiné** (texte français suivi obligatoirement de sa version anglaise dans le même corps de message) à tous les passagers réservataires des créneaux ciblés (sans nécessiter de ciblage de langue).
- Couvre le basculement automatique du statut du créneau à « sous pré-alerte », déclenchant l'affichage de la mention d'avertissement sur l'interface publique si des places restent ouvertes à la vente (REQ-019, R-25).
- Ne couvre pas la création dynamique de templates en base de données (les templates sont codés en dur dans l'interface selon le CDC v4 §6).
- Ne couvre pas l'annulation définitive du créneau le jour J à H-2 → `SPEC-ADMIN-02`.

### Scénarios nominaux

```gherkin
Scénario : Envoi groupé d'une alerte météo bilingue sur deux créneaux du lendemain
  Étant donné l'administrateur sur l'écran d'envoi d'alerte le lundi à 18h00
  Quand il sélectionne les deux créneaux du mardi matin à Saint-Gilles (7h00 et 10h00)
  Et choisit le template codé en dur « Météo défavorable »
  Alors le champ de saisie est automatiquement prérempli avec le message bilingue (texte FR suivi du texte EN)
  Quand l'administrateur ajuste le texte et clique sur « Envoyer l'alerte par SMS et E-mail »
  Alors le message bilingue combiné est transmis à tous les clients réservataires des deux créneaux
  Et les deux créneaux passent au statut « sous pré-alerte »
  Et la mention d'avertissement s'affiche sur ces créneaux sur le site de réservation public
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Aucun créneau sélectionné | Le bouton de déclenchement de l'envoi reste désactivé. |
| 2 | Créneau sélectionné sans aucune réservation | L'alerte place le créneau sous statut « en pré-alerte » (mention affichée en ligne) sans émettre de message sortant (liste de destinataires vide). |
| 3 | Texte du message effacé ou vide | Validation bloquée : le corps du message est obligatoire. |
| 4 | Échec de délivrance sur un destinataire (numéro erroné ou bounce e-mail) | L'échec individuel est journalisé sans bloquer l'envoi aux autres destinataires de la file d'attente (REQ-106). |
| 5 | Envoi simultané sur plusieurs créneaux (multi-créneaux) | Traitement groupé en une seule action administrative (R-24). |

### Ce qui n'est pas défini

- *14/08/2026* — Liste textuelle exhaustive finale des propositions de templates codées en dur (Question ouverte n°11 §11 du CDC v4).
- *14/08/2026* — Choix du canal pour les alertes de pré-annulation : option combinée « SMS et/ou E-mail » (choix déduit pour le confort administrateur), posé comme question ouverte à reconfirmer avec le client (Question ouverte n°13 §11 du CDC v4).

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut sélectionner plusieurs créneaux du lendemain et leur envoyer une alerte groupée par SMS et/ou e-mail (REQ-017, R-22, R-24).
- [ ] AC-2 — L'interface propose des templates bilingues codés en dur qui préremplissent automatiquement le champ de texte modifiable au clic (REQ-018, R-23).
- [ ] AC-3 — Le message transmis regroupe obligatoirement la version française suivie de la version anglaise dans un corps de message unique (REQ-018, R-26).
- [ ] AC-4 — L'émission de l'alerte active immédiatement l'affichage de la mention d'avertissement sur les créneaux concernés en ligne s'ils restent ouverts avec des places disponibles (REQ-019, R-25).

---

## SPEC-ADMIN-07 — Configuration et gestion des créneaux

**Exigence :** REQ-011 (avec R-12, R-13, R-15, Contraintes C-18, C-19)
**Statut :** validée
**Version :** v1

### Règle

> L'administrateur peut configurer les créneaux horaires, modifier leur disponibilité (ouverture/fermeture manuelle) et affecter les prestations ou navires dans le respect de l'exclusivité d'activité par navire et de la disponibilité du naturaliste.

### Portée

- Couvre l'ouverture ou la fermeture manuelle exceptionnelle d'un créneau par l'administrateur.
- Couvre l'affectation du type d'activité (Baleines, Dauphins, Privatisation) à un créneau dans le respect de la règle d'exclusivité (R-12 : pas de mélange d'activités sur un même créneau/navire).
- Couvre l'affectation de l'unique naturaliste obligatoire sur les sorties Baleines (R-15).
- Ne couvre pas la modification autonome en ligne par les clients (strictement réservée à l'administrateur).

### Scénarios nominaux

```gherkin
Scénario : Fermeture administrative d'un créneau
  Étant donné un créneau ouvert à la réservation sans passager inscrit
  Quand l'administrateur décide de fermer manuellement ce créneau depuis le tableau de bord
  Alors le créneau passe au statut « fermé » et disparaît immédiatement de l'interface de réservation publique (REQ-011, R-13)
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Tentative d'affecter deux activités différentes sur le même navire et même créneau | Blocage strict (R-12) : chaque navire/créneau est dédié à une seule activité exclusive. |
| 2 | Tentative de programmer simultanément deux sorties Baleines nécessitant le naturaliste sur deux sites distants | Alerte et blocage (R-15) : l'entreprise ne dispose que d'un seul naturaliste unique. |

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut modifier la disponibilité et la configuration d'un créneau depuis son tableau de bord (REQ-011, R-13).
- [ ] AC-2 — Le système empêche toute mixité d'activités sur un même créneau et navire (R-12).