# Spécifications — Admin (back-office)

**Domaine :** `ADMIN`

---

## SPEC-ADMIN-01 — Consultation du planning et supervision multi-sites

**Exigence :** REQ-009, REQ-010, REQ-023 (avec R-01, R-03, R-10, R-25, R-30, Contraintes C-03, C-04, C-05, C-16, C-28, REQ-103)  
**Statut :** revue IA faite  
**Version :** v3 (19/08/2026 — CDC v5)

### Règle

> L'administrateur peut consulter le planning consolidé des réservations par port, jour et créneau horaire, identifier immédiatement les créneaux placés sous alerte de pré-annulation, et visualiser le jour J le statut financier de chaque réservation : **payée complètement** (solde réglé en ligne ou sur place) ou **payée partiellement** (seul l'acompte a été versé, solde restant à encaisser).

### Portée

- Couvre l'affichage consolidé de la grille de planning multi-sites sur poste de bureau (Desktop — REQ-103) : Saint-Gilles (7h, 10h, 14h tous les jours) et Saint-Leu (9h les mardis et jeudis).
- Couvre l'affichage de l'état d'alerte de pré-annulation sur les créneaux ciblés la veille à 18h.
- Couvre l'affichage distinctif sur chaque fiche de réservation le jour J de l'état de paiement : **payée complètement** (badge vert) vs **payée partiellement** (badge distinctif avec montant du solde restant dû à encaisser) (REQ-023, R-30).
- Ne couvre pas la décision manuelle d'annuler un départ sous le seuil de maintien (6 passagers) : reste manuelle, hors système.
- Ne couvre pas le calcul et la visualisation du taux de remplissage / jauges réelles (12, 24 ou 36 places) → `SPEC-ADMIN-05`.
- Ne couvre pas l'authentification au back-office → `SPEC-ADMIN-04`.
- Ne couvre pas l'annulation d'une réservation → `SPEC-ADMIN-02`.
- Ne couvre pas l'enregistrement du solde par carte bancaire sur place → `SPEC-ADMIN-08`.
- Ne couvre pas l'émission de l'alerte de pré-annulation → `SPEC-ADMIN-06`.
- Ne couvre pas la modification de configuration d'un créneau → `SPEC-ADMIN-07`.

### Scénarios nominaux

```gherkin
Scénario : Affichage de la grille du planning consolidé
  Étant donné l'administrateur connecté au back-office depuis un poste de bureau (Desktop)
  Quand il ouvre l'écran planning
  Alors il voit la liste des créneaux consolidée par port (Saint-Gilles ou Saint-Leu), jour et heure : 7h, 10h et 14h à Saint-Gilles tous les jours, et 9h à Saint-Leu le mardi et le jeudi uniquement (R-01)

Scénario : Consultation le jour J du détail d'un créneau et des statuts de paiement
  Étant donné un créneau affiché sur le planning le jour de la sortie
  Quand l'administrateur ouvre le détail du créneau
  Alors il voit la liste des réservations inscrites avec leurs statuts financiers distincts :
    | Réservation | Client | Places | Statut financier | Solde dû |
    | RES-001 | Jean Dupont | 2 | Payée complètement | 0,00 € |
    | RES-002 | Paul Martin | 1 | Payée partiellement | 52,50 € |
  Et un indicateur visuel explicite s'affiche si le créneau est sous alerte de pré-annulation (R-25)
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
| 7 | Réservation avec solde payé en ligne la veille vs sur place | La réservation est affichée comme « Payée complètement » dès que le webhook bancaire du solde a été validé ou que l'encaissement sur place a été enregistré. |

### Critères d'acceptation

- [ ] AC-1 — Le planning affiche les créneaux consolidés par port, avec navire et type de sortie, gère les états vides, les créneaux incomplets, la consultation 24h/24, la résilience réseau et le seuil de rentabilité (`CASE-ADMIN-001` à `CASE-ADMIN-009`).
- [ ] AC-2 — Tout créneau ayant fait l'objet d'une alerte de pré-annulation affiche un indicateur visuel clair sur la grille de planning (`CASE-ADMIN-003`).
- [ ] AC-3 — L'administrateur peut visualiser sur chaque réservation le jour J son statut financier distinct : « payée complètement » ou « payée partiellement » avec le montant du solde restant dû (REQ-023, R-30, REQ-103).

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Intégrer l'indicateur visuel des créneaux sous alerte de pré-annulation | Acceptée | Conforme aux règles R-22, R-25 et aux évolutions du CR-04 / CDC v5. |
| Intégrer la visualisation des statuts financiers (payée complètement / payée partiellement) le jour J | Acceptée | Conforme à REQ-023, R-30 et Contrainte 28 du CDC v5. |
| Harmoniser les références documentaires vers le CDC v5 | Acceptée | Référentiel mis à jour. |

---

## SPEC-ADMIN-02 — Annulation d'une réservation (suppression totale des billets), calcul de remboursement indicatif et notification client

**Exigence :** REQ-013, REQ-014, REQ-020 (avec R-16, R-17, R-27, R-28, R-29, Contraintes C-08, C-09, C-10, C-24, C-27, REQ-106)  
**Statut :** revue IA faite  
**Version :** v4 (19/08/2026 — CDC v5)

### Règle

> L'administrateur peut annuler une réservation depuis le back-office via une action préconfigurée qui supprime l'intégralité des billets (`BOOKING_ITEMS`) rattachés à la commande, ce qui libère immédiatement et de façon synchrone toutes les places sur le créneau, affiche à l'administrateur le **calcul indicatif du montant de remboursement** (assis sur le montant total plafonné aux sommes perçues, ou à 100 % sous dérogation alerte météo — calcul purement interne non transmis au client), et permet la saisie ou la sélection d'un motif d'annulation à la volée (REQ-020) pour composer le SMS informatif de notification au client (REQ-014) — sans mention du calcul financier de remboursement et sans enregistrement durable du motif en base —, tandis que la fiche de réservation est conservée (avec 0 billet actif) pour l'historique et la conformité comptable.

### Portée

- Couvre l'annulation d'une réservation à l'initiative de l'administrateur (motif météo/technique ou suite à demande d'un client).
- **Architecture technique unifiée :** Pour des raisons techniques et d'unification d'architecture avec la réduction (`SPEC-ADMIN-03`), l'annulation totale est réalisée par la suppression de **la totalité des billets actifs (`BOOKING_ITEMS`)** de la réservation en une seule opération.
- Pour des raisons techniques et comptables, l'entité réservation (`BOOKINGS`) est conservée en base de données avec son historique de paiement et 0 billet actif (aucun enregistrement détruit).
- Couvre l'affichage d'un **calcul indicatif du remboursement** sur l'écran back-office pour guider l'administrateur dans ses opérations manuelles (R-29, Contrainte 27) — **ce calcul reste strictement réservé à la vue administrateur et n'est jamais communiqué ni affiché au client** :
  - **Régime standard :** assis sur le montant total de la commande avec retenue de la pénalité sur les sommes perçues :  
    $$\text{remboursement} = \max(0, \text{montant payé} - (100\,\% - \text{taux du barème}) \times \text{montant total})$$  
    *Exemple :* Commande totale de 100 €, acompte de 30 € perçu. Si annulation au barème 50 % (retenue 50 % de 100 € = 50 €), la retenue dépasse l'acompte $\rightarrow$ Remboursement indicatif = 0 € (sans réclamer de complément au client). Si annulation au barème 75 % (retenue 25 % de 100 € = 25 €) $\rightarrow$ Remboursement indicatif = $30 - 25 = 5\text{ €}$.
  - **Régime dérogatoire alerte météo (R-27, R-28, Contrainte 24) :** Remboursement intégral à 100 % des sommes perçues en cas d'annulation confirmée après alerte ou en cas d'annulation par anticipation (« par peur ») du client après l'alerte.
- Couvre la saisie/sélection du motif d'annulation à des fins informatives pour composer le message de notification envoyé au client :
  - *Annulation administrative météo/technique suite à alerte* (remboursement dérogatoire à 100 % manuel hors système — R-27)
  - *Désistement / annulation « par peur » du client suite à alerte* (remboursement dérogatoire à 100 % manuel hors système — R-28)
  - *Annulation standard hors alerte* (remboursement selon barème assis sur montant total — R-29)
  - Pour des raisons techniques (les flux financiers restant gérés 100 % manuellement hors système selon REQ-020), le motif sert exclusivement à composer le SMS client et n'est pas persisté sur l'entité réservation.
- Couvre la libération synchrone et immédiate des places sur le créneau de réservation (remises en vente jusqu'à H-2).
- Couvre le déclenchement automatique de la notification SMS transactionnelle d'information au numéro de mobile du client (message informatif notifiant l'annulation et son motif, sans aucun détail chiffré ni formule de remboursement).
- Ne couvre pas les opérations financières de remboursement bancaire (gérées 100 % manuellement hors système selon le CDC v5, C-10).

### Scénarios nominaux

```gherkin
Scénario : Annulation complète avec calcul de remboursement standard (acompte inférieur à la pénalité)
  Étant donné une réservation confirmée de 100,00 € ayant versé un acompte de 30,00 € (2 billets)
  Et l'administrateur recevant une demande d'annulation soumise au barème standard 50 % (pénalité : 50,00 €)
  Quand l'administrateur clique sur « Annuler la réservation »
  Alors le système affiche à l'administrateur le calcul indicatif : « Somme payée : 30,00 € | Pénalité barème : 50,00 € | Remboursement indicatif : 0,00 € »
  Quand l'administrateur valide l'annulation avec le motif « Annulation standard »
  Alors les 2 billets sont supprimés de la réservation, les places sont libérées sur le créneau
  Et un SMS informatif d'annulation est transmis au client (sans mention du calcul de remboursement)

Scénario : Annulation complète avec calcul de remboursement standard (acompte supérieur à la pénalité)
  Étant donné une réservation confirmée de 150,00 € ayant versé un acompte de 45,00 € (2 billets)
  Et l'administrateur recevant une demande d'annulation soumise au barème 75 % (pénalité : 25 % de 150 € = 37,50 €)
  Quand l'administrateur ouvre l'écran d'annulation
  Alors le calcul indicatif réservé à l'administrateur affiche : « Somme payée : 45,00 € | Pénalité : 37,50 € | Remboursement indicatif : 7,50 € »
  Quand l'administrateur confirme l'annulation
  Alors les billets sont supprimés, les places libérées et le SMS informatif est envoyé au client sans détail financier

Scénario : Annulation d'office pour motif météo après alerte de pré-annulation
  Étant donné une réservation ayant versé un acompte de 45,00 € sur un créneau sous pré-alerte météo
  Quand l'administrateur annule la réservation avec le motif « Annulation météo suite à pré-alerte »
  Alors le système affiche à l'administrateur un remboursement dérogatoire indicatif de 100 % de la somme perçue (45,00 €)
  Et la réservation passe à 0 billet, les places sont libérées et le SMS informatif est expédié au client
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Demande d'annulation intervenant jusqu'au moment du départ | Annulation autorisée : pour des raisons techniques et d'alignement opérationnel (Question ouverte n°1 §11 du CDC v5), l'administrateur peut annuler la réservation sans délai minimal préalable jusqu'à l'heure exacte de départ. |
| 2 | Réservation n'ayant déjà plus aucun billet actif (0 billet) | Action impossible, bouton d'annulation désactivé, aucun second SMS envoyé. |
| 3 | Demande d'annulation alors que le créneau est déjà passé (date et heure de départ échues) | Annulation rejetée : pour des raisons techniques de clôture d'activité (Question ouverte n°1 §11 du CDC v5), l'administrateur ne peut plus annuler une réservation après la date et l'heure du départ. |
| 4 | Numéro de téléphone mobile manquant ou invalide | La suppression des billets et la libération des places sont exécutées en base, mais l'échec d'envoi du SMS est journalisé dans les logs (REQ-106). |
| 5 | Échec temporaire de la passerelle SMS | La suppression des billets et la libération de jauge sont validées avec succès ; l'échec SMS est notifié à l'admin pour suivi. |
| 6 | Coupure réseau pendant la validation de l'annulation | Cohérence transactionnelle garantie : soit la suppression de l'ensemble des billets et la libération des places sont validées, soit aucun changement n'est opéré. |
| 7 | Montant payé insuffisant pour couvrir la pénalité contractuelle (R-29) | Le remboursement indicatif pour l'admin est de 0 € et aucun prélèvement complémentaire n'est requis auprès du client. |

### Critères d'acceptation

- [ ] AC-1 — L'annulation d'une réservation supprime la totalité de ses billets (`BOOKING_ITEMS`), conserve la réservation avec 0 billet actif, affiche à l'administrateur le calcul indicatif de remboursement assis sur le montant total ou le régime 100 % post-alerte (R-27, R-28, R-29, REQ-013), et propose la saisie du motif pour composer le SMS sans persistance en base (REQ-020).
- [ ] AC-2 — Les places correspondant aux billets supprimés sont immédiatement et synchroniquement remises à disposition sur la jauge du créneau (REQ-013).
- [ ] AC-3 — L'annulation déclenche l'envoi immédiat d'un SMS d'information au numéro de téléphone mobile du client (motif de l'annulation, sans afficher ni mentionner le calcul financier de remboursement) avec gestion des erreurs de délivrance (REQ-014, REQ-106).

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Intégrer la formule de calcul indicatif de remboursement standard assise sur le montant total (R-29, RM-55) | Acceptée | Conforme au CDC v5 : $\max(0, \text{payé} - (100\% - \text{barème}) \times \text{total})$. |
| Réserver strictement le calcul indicatif de remboursement à l'IHM administrateur | Acceptée | Le client ne doit pas recevoir de détail financier par SMS (message purement informatif avec motif). |
| Maintenir le régime dérogatoire à 100 % en cas d'annulation post-alerte météo | Acceptée | Conforme à R-27, R-28 et Contrainte 24 du CDC v5. |
| Mettre à jour les références documentaires vers le CDC v5 | Acceptée | Aligné sur le nouveau référentiel. |

---

## SPEC-ADMIN-03 — Réduction du nombre de passagers (suppression partielle de billets)

**Exigence :** REQ-015 (avec R-18, Contrainte C-08, REQ-108)  
**Statut :** validée  
**Version :** v4 (19/08/2026 — CDC v5)

### Règle

> L'administrateur peut réduire le nombre de passagers d'une réservation existante depuis le back-office en supprimant $N$ billets (`BOOKING_ITEMS`) rattachés à la commande (adultes et/ou enfants), ce qui libère synchroniquement les $N$ places correspondantes sur le créneau, sans possibilité d'ajouter des billets ni de modifier la date.

### Portée

- Couvre le retrait sélectif de $N$ billets individuels (`BOOKING_ITEMS`) rattachés à une réservation.
- **Architecture technique unifiée :** Pour des raisons techniques et de maintenabilité, utilise la même fonction back-end de suppression de billets que `SPEC-ADMIN-02`.
- Couvre la remise à disposition immédiate et synchrone des places libérées sur le créneau concerné.
- Ne couvre pas l'ajout de billets sur une réservation existante (nécessite une nouvelle commande séparée selon R-18 et CDC v5 §6).
- Ne couvre pas le report de date ou d'horaire (nécessite annulation préalable selon R-18).
- Ne couvre pas le remboursement financier consécutif à la réduction partielle (géré manuellement hors système).
- Si la suppression de billets ramène le total de billets actifs à **0**, le système applique automatiquement la logique complète d'annulation de `SPEC-ADMIN-02` (affichage du calcul indicatif de remboursement sur l'écran administrateur, saisie du motif et envoi du SMS informatif de notification au client sans mention du calcul financier).

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
  Alors le système affiche le calcul indicatif de remboursement destiné à l'administrateur (SPEC-ADMIN-02)
  Quand l'administrateur sélectionne le motif d'annulation et valide
  Alors la réservation passe à 0 billet actif et le SMS informatif de notification d'annulation est automatiquement envoyé au client sans détail financier
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Tentative de rajouter un ou plusieurs billets sur la réservation | Rejet strict (R-18) : l'ajout de billets est impossible sur une commande existante. |
| 2 | Suppression ramenant le nombre de billets restants à 0 | Traitement unifié identique à `SPEC-ADMIN-02` : affichage du calcul de remboursement pour l'administrateur, réservation à 0 billet et déclenchement du SMS informatif. |
| 3 | Réservation n'ayant déjà plus aucun billet actif (0 billet) | Aucune réduction supplémentaire applicable. |
| 4 | Tentative de modification de la date ou du port de départ lors de la réduction | Rejet strict (R-18) : aucun report ni changement de date autorisé. |
| 5 | Créneau concerné déjà passé | Modification rejetée. |
| 6 | Coupure réseau pendant la mise à jour | Cohérence transactionnelle de la jauge garantie (REQ-108). |

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut supprimer sélectivement $N$ billets adultes et/ou enfants d'une réservation, libérant synchroniquement $N$ places sur le créneau, dans le respect de l'intégrité des quantités, de l'atomicité transactionnelle et sans remboursement automatique (`CASE-ADMIN-023`, `CASE-ADMIN-024`, `CASE-ADMIN-025`, `CASE-ADMIN-031`, `CASE-ADMIN-032`, `CASE-ADMIN-069`).
- [ ] AC-2 — Toute tentative d'ajout de billet, de modification de date/port, de réduction sur réservation à 0 billet ou sur créneau passé est strictement bloquée (R-18, `CASE-ADMIN-027` à `CASE-ADMIN-030`).
- [ ] AC-3 — Une réduction supprimant la totalité des billets (0 billet restant) applique le traitement complet d'annulation avec calcul indicatif de remboursement affiché à l'administrateur, motif informatif et SMS de notification sans détail financier au client (`CASE-ADMIN-026`).

---

## SPEC-ADMIN-04 — Authentification au back-office administrateur

**Exigence :** Contrainte C-16, REQ-103 (et Question ouverte Q8 §11 du CDC v5)  
**Statut :** revue IA faite  
**Version :** v4 (19/08/2026 — CDC v5)

### Règle

> L'administrateur unique de Ti'Baleine peut se connecter de manière sécurisée au back-office sur poste de bureau (Desktop) avec un identifiant e-mail et un mot de passe valides.

### Portée

- Couvre l'authentification sécurisée sur l'unique profil administrateur du système (C-16).
- Pour des raisons techniques de sécurité des accès (Question ouverte n°8 du CDC v5), la politique impose un identifiant e-mail valide, un mot de passe robuste (≥ 12 caractères avec majuscule, chiffre et caractère spécial) et une protection contre les attaques par force brute.
- Couvre la redirection vers le tableau de bord / planning des réservations après connexion réussie.
- Ne couvre pas la création de sous-comptes (profil unique selon C-16, CDC v5 §6).
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
| 3 | Tentatives de connexion infructueuses répétées | Application d'un ralentissement / blocage temporaire contre les attaques par force brute (choix technique de sécurité). |
| 4 | Session expirée après inactivité prolongée | Déconnexion automatique et redirection vers la mire d'authentification. |
| 5 | Déconnexion manuelle par l'administrateur | Destruction immédiate de la session active et redirection vers la mire d'authentification. |

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut se connecter avec ses identifiants valides, accéder au tableau de bord, maintenir sa session lors de la navigation et respecter la contrainte d'administrateur unique (`CASE-ADMIN-033`, `CASE-ADMIN-034`, `CASE-ADMIN-040`, `CASE-ADMIN-071`).
- [ ] AC-2 — Tout accès non authentifié aux URL du back-office est intercepté et redirigé, les identifiants erronés ou champs vides sont rejetés, et les mécanismes de protection sont actifs (`CASE-ADMIN-035` à `CASE-ADMIN-039`).
- [ ] AC-3 — L'administrateur peut se déconnecter manuellement à tout moment, entraînant la clôture immédiate de la session (`CASE-ADMIN-070`).

---

## SPEC-ADMIN-05 — Visualisation du taux de remplissage et jauges par créneau

**Exigence :** REQ-010, REQ-108 (avec R-01, R-03, R-10, Contrainte C-05)  
**Statut :** revue IA faite  
**Version :** v4 (19/08/2026 — CDC v5)

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
| 3 | Suppression de billets effectuée (annulation ou réduction) | Recalcul instantané du nombre de billets et du taux de remplissage (REQ-108). |
| 4 | Créneau privatisé (forfait navire) | Affichage spécifique indiquant « Navire privatisé » bloquant la totalité de la jauge (R-12). |

### Critères d'acceptation

- [ ] AC-1 — Le calcul du taux de remplissage s'effectue sur la base du nombre de billets actifs existants (`BOOKING_ITEMS`) rapporté à la jauge réelle du créneau (12, 24 ou 36 places) et se met à jour en temps réel lors de toute modification (`CASE-ADMIN-041` à `CASE-ADMIN-047`, `CASE-ADMIN-072`).

---

## SPEC-ADMIN-06 — Envoi groupé d'alertes de pré-annulation la veille à 18h

**Exigence :** REQ-017, REQ-018, REQ-019 (avec R-22, R-23, R-24, R-26, Contraintes C-21, C-22, C-23, REQ-106)  
**Statut :** validée  
**Version :** v4 (19/08/2026 — CDC v5)

### Règle

> L'administrateur peut sélectionner la veille au soir à 18h un ou plusieurs créneaux du lendemain pour leur envoyer une alerte de pré-annulation groupée par SMS ou e-mail (pour des raisons techniques et économiques, une seule pré-alerte est autorisée par créneau, donc un seul message émis par destinataire), en préremplissant le message bilingue combiné (FR + EN) via des propositions de templates types codées en dur dans l'interface et en personnalisant le motif.

### Portée

- Couvre la sélection de un ou plusieurs créneaux du lendemain (Saint-Gilles et/ou Saint-Leu) pour l'envoi groupé d'une alerte la veille à 18h.
- Pour des raisons techniques de maîtrise des flux SMS/Email et de prévention du spam client, **un créneau ne peut faire l'objet que d'une seule et unique pré-alerte**.
- Couvre le choix du canal de diffusion : SMS, E-mail ou les deux.
- Couvre l'intégration dans l'interface de **propositions de templates bilingues codées en dur** (ex. *Météo défavorable*, *Incident technique*) pour préremplir instantanément la zone de texte éditable.
- Couvre la personnalisation libre du texte / motif par l'administrateur dans le champ de message.
- Couvre la génération et la diffusion d'un **message bilingue combiné** (texte français suivi obligatoirement de sa version anglaise dans le même corps de message) à tous les passagers réservataires des créneaux ciblés (sans nécessiter de ciblage de langue).
- Couvre le basculement automatique du statut du créneau à « sous pré-alerte », déclenchant l'affichage de la mention d'avertissement sur l'interface publique si des places restent ouvertes à la vente (REQ-019, R-25).
- Ne couvre pas la création dynamique de templates en base de données (les templates sont codés en dur dans l'interface selon le CDC v5 §6).
- Ne couvre pas l'annulation définitive du créneau le jour J à H-2 → `SPEC-ADMIN-02`.

### Scénarios nominaux

```gherkin
Scénario : Envoi groupé d'une alerte météo bilingue sur deux créneaux du lendemain
  Étant donné l'administrateur sur l'écran d'envoi d'alerte le lundi à 18h00
  Quand il sélectionne les deux créneaux du mardi matin à Saint-Gilles (7h00 et 10h00)
  Et choisit le template codé en dur « Météo défavorable »
  Alors le champ de saisie est automatiquement prérempli avec le message bilingue (texte FR suivi du texte EN)
  Quand l'administrateur ajuste le texte et clique sur « Envoyer l'alerte par SMS et E-mail »
  Alors le message bilingue combiné est transmis à tous les clients réservataires des deux créneaux (un seul envoi)
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
| 6 | Tentative d'émission d'une alerte sur un créneau déjà « sous pré-alerte » | Action bloquée / rejetée : pour des raisons techniques (coûts et non-spam), un créneau ne peut faire l'objet que d'une seule et unique pré-alerte ; le créneau déjà sous pré-alerte n'est plus sélectionnable pour un nouvel envoi. |

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut sélectionner plusieurs créneaux du lendemain et leur envoyer une alerte groupée par SMS et/ou e-mail (une seule alerte autorisée par créneau, blocage de tout renvoi sur un créneau déjà sous pré-alerte), avec contrôle de sélection et gestion des échecs individuels (REQ-017, R-22, R-24, `CASE-ADMIN-048` à `CASE-ADMIN-051`, `CASE-ADMIN-058`, `CASE-ADMIN-061`, `CASE-ADMIN-073`).
- [ ] AC-2 — L'interface propose des templates bilingues codés en dur qui préremplissent automatiquement le champ de texte modifiable au clic, avec personnalisation libre et blocage en cas de texte vide (REQ-018, R-23, `CASE-ADMIN-052` à `CASE-ADMIN-054`, `CASE-ADMIN-060`).
- [ ] AC-3 — Le message transmis regroupe obligatoirement la version française suivie de la version anglaise dans un corps de message unique (REQ-018, R-26, `CASE-ADMIN-055`).
- [ ] AC-4 — L'émission de l'alerte active immédiatement l'affichage de la mention d'avertissement sur les créneaux concernés en ligne s'ils restent ouverts avec des places disponibles ou sans réservation (REQ-019, R-25, `CASE-ADMIN-056`, `CASE-ADMIN-057`, `CASE-ADMIN-059`).

---

## SPEC-ADMIN-07 — Configuration et gestion des créneaux

**Exigence :** REQ-011 (avec R-12, R-13, R-15, Contraintes C-18, C-19)  
**Statut :** validée  
**Version :** v3 (19/08/2026 — CDC v5)

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

- [ ] AC-1 — L'administrateur peut modifier la disponibilité et la configuration d'un créneau depuis son tableau de bord (REQ-011, R-13, `CASE-ADMIN-062` à `CASE-ADMIN-065`, `CASE-ADMIN-068`).
- [ ] AC-2 — Le système empêche toute mixité d'activités sur un même créneau et navire ou conflit de naturaliste (R-12, R-15, `CASE-ADMIN-066`, `CASE-ADMIN-067`).

---

## SPEC-ADMIN-08 — Pointage et encaissement du solde par carte bancaire sur place le jour J

**Exigence :** REQ-022 (avec R-07, R-30, Contrainte 28, CDC v5 §6)  
**Statut :** revue IA faite  
**Version :** v1 (19/08/2026 — CDC v5)

### Règle

> L'administrateur peut pointer et valider l'encaissement du solde restant par **carte bancaire sur place** à l'embarcadère pour toute réservation se présentant à l'état « payée partiellement », ce qui bascule immédiatement la réservation à l'état « payée complètement » et déclenche l'émission et l'envoi automatique par courriel de la facture de solde distincte au client.

### Portée

- Couvre l'enregistrement et la validation de l'encaissement du solde par carte bancaire sur place depuis le back-office le jour du départ.
- Couvre le basculement synchrone du statut financier de la réservation de `payée partiellement` à `payée complètement`.
- Couvre le déclenchement immédiat de la génération à la volée et l'envoi par courriel de la **facture de solde distincte PDF** à l'adresse e-mail du client (REQ-008, [SPEC-FAC-02](./facturation.md)).
- Couvre l'actualisation instantanée de l'affichage sur la fiche du créneau (solde dû ramené à 0,00 €).
- **Périmètre strict (§6 Hors périmètre du CDC v5) :** L'encaissement sur place est restreint exclusivement à la carte bancaire. Le système ne supporte aucun encaissement en espèces ou en chèques vacances.

### Scénarios nominaux

```gherkin
Scénario : Pointage et encaissement du solde par carte bancaire sur place
  Étant donné une réservation pour 2 adultes à Saint-Leu (total : 150,00 €) affichée à l'état « Payée partiellement » avec un acompte réglé de 45,00 € et un solde dû de 105,00 €
  Et le client se présentant à l'embarcadère le matin du départ
  Quand l'administrateur valide le paiement du solde de 105,00 € par carte bancaire sur place via le bouton « Encaisser le solde (CB sur place) »
  Alors la réservation passe à l'état « Payée complètement »
  Et le solde restant dû est mis à 0,00 €
  Et la facture de solde distincte PDF est générée à la volée et envoyée par courriel à l'adresse du client (SPEC-FAC-02)

Scénario : Tentative de pointage sur une réservation déjà soldée
  Étant donné une réservation déjà à l'état « Payée complètement » (solde réglé en ligne via SMS)
  Quand l'administrateur consulte la réservation
  Alors le bouton d'encaissement du solde est désactivé et le statut indique « Solde déjà réglé »
```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Réservation déjà à l'état « payée complètement » | L'action d'encaissement est impossible (bouton désactivé ou masqué), aucun double encaissement n'est réalisable. |
| 2 | Demande de règlement en espèces ou chèques vacances | Rejet strict : le système n'intègre aucun moyen d'enregistrement hors carte bancaire (CDC v5 §6). |
| 3 | Perte temporaire de connexion internet lors de la validation du pointage | Message d'erreur avec conservation de l'état partiel jusqu'à confirmation de la transmission réseau. |

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut enregistrer et valider le paiement du solde par carte bancaire sur place pour toute réservation « payée partiellement », passant la réservation à l'état « payée complètement » (REQ-022, R-07, R-30).
- [ ] AC-2 — La validation du solde par carte bancaire sur place déclenche immédiatement la génération à la volée et l'expédition par e-mail de la facture de solde distincte PDF (REQ-008, SPEC-FAC-02).
- [ ] AC-3 — L'interface administrateur restreint strictement le mode de règlement du solde sur place à la carte bancaire, sans option d'espèces ou de chèques vacances (CDC v5 §6).

### Revue IA

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Créer une spécification dédiée au pointage du solde CB sur place | Acceptée | Conforme à REQ-022, R-07, R-30 et aux clarifications du CDC v5. |
| Restreindre l'encaissement sur place exclusivement à la CB | Acceptée | Conforme au paragraphe 6 (Hors périmètre) du CDC v5 écartant espèces et chèques vacances. |
| Lier l'encaissement sur place à l'émission de la facture de solde | Acceptée | Conforme à R-31, REQ-008 et SPEC-FAC-02. |