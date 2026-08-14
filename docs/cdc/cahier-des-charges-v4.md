# Cahier des charges — Ti'Baleine

**Équipe :** Thomas, Loïc, Benjamin et Ivan | RageGit  
**Version :** v4 — 14/08/2026  
**Sources :** `compte-rendu-entretien-01.md`, `compte-rendu-entretien-02.md`, `compte-rendu-entretien-03.md`, `compte-rendu-entretien-04.md`

Ce document formalise le **problème compris**, pas la solution. Aucun nom de technologie, aucun nom de framework, aucune structure de base de données ici.

---

## 1. Contexte

Ti'Baleine propose des sorties en mer à la journée : observation des baleines et des dauphins, sorties « coucher de soleil » (Sunset), et formules de privatisation de navires. L'entreprise exploite deux bateaux, le **Tikap** (12 places) et le **Grand Bleu** (24 places).

L'activité s'articule autour de deux points d'embarquement :
- **Saint-Gilles (port principal) :** exploité toute la semaine avec l'ensemble de la flotte sur trois créneaux quotidiens (7h, 10h et 14h), à l'exception des mardis et jeudis matin où seul le *Grand Bleu* opère (indisponibilité du *Tikap* à 07h00 et 10h00 pour cause de rotation à Saint-Leu).
- **Saint-Leu (second point d'embarquement) :** ouvert le **mardi et le jeudi**, opéré exclusivement par le *Tikap* (12 places) avec un départ unique à **9h00** et une tarification majorée de + 10 € par personne sur les billets individuels.

Les formules de privatisation de navire sont proposées en demi-journée : soit le matin (**07h00 – 12h00**), soit l'après-midi (**dès 14h00**), et sont accessibles à Saint-Gilles comme à Saint-Leu (sur le Tikap, au même tarif forfaitaire de 600 €).

Aujourd'hui, environ 60 % de la clientèle est étrangère, ce qui impose une interface multilingue. L'entreprise souhaite se doter d'une plateforme web sur-mesure (piste de nom de domaine `tibaleine.re`) pour moderniser la réservation, fiabiliser la gestion des capacités multi-sites, permettre une administration simple du planning et des réservations (annulations totales et modifications à la baisse du nombre de passagers gérées par l'administrateur avec information SMS envoyée au client lors d'une annulation), et intégrer un mécanisme d'alerte de pré-annulation la veille au soir à 18h par SMS ou e-mail (avec motif bilingue FR/EN personnalisable prérempli par des templates types codés en dur) assorti d'une politique de remboursement à 100 % en cas d'annulation effective ou par anticipation (« par peur ») du client suite à l'alerte, sans complexité inutile pour un usage non informaticien (*CR-01, CR-02, CR-03, CR-04*).

---

## 2. Problème

Ti'Baleine ne dispose pas d'un canal de réservation en ligne pour gérer les places contingentées de ses deux navires sur des créneaux fixes répartis sur deux ports d'embarquement (Saint-Gilles et Saint-Leu). Cela complique le suivi du remplissage en temps réel, l'application des spécificités de planning/tarification, et l'accueil d'une clientèle majoritairement étrangère.

L'entreprise recherche un outil sur-mesure — sans passer par un SaaS tiers — qui centralise la réservation grand public, le paiement par carte bancaire et la facturation automatique, tout en offrant à l'administrateur la maîtrise exclusive des modifications à la baisse (réduction de passagers), des annulations de réservations (avec libération synchrone des places et notification par SMS au client lors d'une annulation), et de l'envoi d'alertes de pré-annulation groupées bilingues (SMS/email) à J-1 18h avec affichage d'une mention d'avertissement sur les créneaux concernés en ligne, tout en conservant les opérations de remboursement financier (y compris les remboursements à 100 % post-alerte) en gestion directe manuelle hors système.

---

## 3. Objectifs

| # | Objectif | Comment on saura que c'est atteint |
|---|---|---|
| 1 | Ouvrir un canal de réservation 100 % en ligne multi-sites | Un client peut réserver et payer une sortie de bout en bout sur le site en choisissant son port de départ (Saint-Gilles ou Saint-Leu) et son créneau, sans appel ni e-mail (*CR-01/Q01, CR-03/Q15*) |
| 2 | Offrir une interface multilingue (FR/EN) | Le parcours public complet (sélection du lieu, créneau, paiement, confirmation) est disponible en français et en anglais (*CR-01/Q07, CR-02/§3*) |
| 3 | Assurer une gestion administrative centralisée, simple et réactive | L'administrateur consulte le planning multi-sites, visualise les jauges réelles (24 ou 36 places), réduit le nombre de passagers ou procède aux annulations avec libération immédiate du créneau et émission automatique d'un SMS d'information au client (*CR-02/Q03, CR-03/Q01, CR-03/Q02, CR-03/Q03*), et diffuse des alertes de pré-annulation groupées bilingues personnalisables (SMS/email) la veille à 18h avec affichage d'un avertissement transparent pour les réservataires (*CR-04/Q01, CR-04/Q02, CR-04/Q03, CR-04/Q04, CR-04/Q05, CR-04/Q06*) |

---

## 4. Parties prenantes

| Partie prenante | Rôle | Ce qu'elle attend | Utilise l'application ? |
|---|---|---|---|
| Administrateur (Ti'Baleine) | Profil unique de back-office : consultation du planning multi-sites, gestion des créneaux, suivi du remplissage, annulation totale et modification à la baisse (réduction de passagers), envoi groupé d'alertes de pré-annulation à J-1 18h avec préremplissage par templates bilingues codés en dur et personnalisation du motif, consignation du motif d'annulation | Un espace simple, épuré, sur ordinateur de bureau (Desktop) | oui |
| Client final (touriste ou local) | Réserve et paie en ligne (choisit son point de départ Saint-Gilles ou Saint-Leu), reçoit une confirmation par e-mail avec facture PDF, un SMS d'information en cas d'annulation par l'admin, reçoit le message d'alerte de pré-annulation bilingue (texte FR suivi du texte EN) par SMS ou e-mail, et visualise la mention d'alerte lors de la sélection des créneaux | Un parcours rapide, clair, dans sa langue, sans création de compte | oui |
| Naturaliste | Encadre obligatoirement les sorties baleines (ressource unique affectée selon la demande du planning) | Aucune interaction directe avec le système (planning géré par l'admin) | non |
| Capitainerie / Affaires Maritimes | Autorité réglementaire sur le manifeste de bord | Rien du système : le manifeste reste un registre papier | non |

---

## 5. Personas

### Sophie — cliente touriste étrangère
- **Contexte d'usage :** réserve depuis son smartphone à l'hôtel, ne parle pas français.
- **Objectif :** trouver un créneau disponible pour une sortie baleines (à Saint-Gilles ou Saint-Leu), payer immédiatement par carte bancaire, et comprendre facilement les messages d'alerte éventuels grâce au texte bilingue (anglais inclus).
- **Ce qui la bloque aujourd'hui :** absence d'interface en anglais, manque de visibilité sur les points de départ et absence de paiement direct.

### Marc — client local
- **Contexte d'usage :** réserve depuis un ordinateur ou smartphone, connaît bien la côte ouest de La Réunion.
- **Objectif :** réserver rapidement une privatisation du Tikap le matin (7h–12h) au départ de Saint-Leu pour son groupe d'amis, ou être prévenu la veille à 18h en cas de risque météo avec garantie de remboursement à 100 %.
- **Ce qui le bloque aujourd'hui :** besoin d'appeler pour vérifier les disponibilités du navire et connaître les tarifs applicables.

### L'administrateur — gérant de Ti'Baleine
- **Contexte d'usage :** ordinateur de bureau (Desktop/PC), consultation et supervision quotidienne du planning.
- **Objectif :** visualiser les taux de remplissage par port (y compris la capacité réduite à 24 places le mar/jeu matin à Saint-Gilles), réduire le nombre de passagers d'une réservation sur demande téléphonique, annuler un créneau météo en libérant les places et en prévenant automatiquement le client par SMS, ou envoyer une alerte de pré-annulation groupée la veille à 18h (SMS/email) en préremplissant le message bilingue via des templates types codés en dur et en personnalisant le motif.
- **Ce qui le bloque aujourd'hui :** gestion éclatée entre appels, notes papier et ressaisie manuelle des disponibilités et des alertes.

---

## 6. Périmètre

### Dans le périmètre
- Un site web public de réservation responsive (ordinateurs, tablettes, smartphones) (*CR-02/Q06*).
- Sélection du lieu de départ : **Saint-Gilles** ou **Saint-Leu** (*CR-03/Q15*).
- Parcours de commande fluide sans création de compte obligatoire (mode invité) (*CR-02/§3*).
- Tarification dynamique selon le lieu (+ 10 € / personne sur billets individuels à Saint-Leu) et la tranche d'âge (*CR-03/Q09*).
- Réservation de formules de privatisation en demi-journée le matin (7h–12h) et l'après-midi (dès 14h) à Saint-Gilles et à Saint-Leu (*CR-03/Q06, Q07, Q17*).
- Module de paiement en ligne 100 % sécurisé par carte bancaire (*CR-01/Q24, CR-01/Q25*).
- Collecte et validation du numéro de téléphone mobile pour notifications d'urgence (*CR-03/Q01*).
- Génération et envoi automatique de la facture PDF et de la confirmation par e-mail (*CR-01/Q47*).
- Interface d'administration unique (Desktop) :
  - Consultation et supervision du planning multi-sites avec visualisations des jauges réelles (12, 24 ou 36 places).
  - Modification d'une réservation par l'administrateur : ajustement exclusivement à la baisse du nombre de passagers (annulation partielle de places libérant la jauge du créneau) (*CR-03/Q03*).
  - Annulation totale d'une réservation avec libération synchrone des places sur le créneau (*CR-03/Q01, CR-03/Q02*).
  - Déclenchement automatique d'un **SMS d'information au client** lors d'une annulation (*CR-03/Q01*).
  - Module d'envoi d'alerte de pré-annulation groupée la veille à 18h (multi-créneaux, SMS/Email, champ texte avec préremplissage par propositions de templates bilingues codées en dur FR+EN et personnalisation du motif) (*CR-04/Q01, CR-04/Q02, CR-04/Q03, CR-04/Q04, CR-04/Q06*).
  - Enregistrement du motif d'annulation (annulation effective météo suite à alerte vs annulation « par peur » / anticipation du client suite à l'alerte) à des fins de traçabilité (*CR-04/Q07, CR-04/Q08*).
- Affichage d'une mention spécifique d'avertissement sur les créneaux sous alerte de pré-annulation lorsqu'ils restent ouverts à la réservation et disposent de places (*CR-04/Q05*).
- Support bilingue complet français/anglais sur le parcours public (*CR-01/Q07, CR-02/§3*).

### Hors périmètre

| Élément écarté | Motif | Source |
|---|---|---|
| Solution SaaS tierce (Bokun, Resagenda…) | Le client exige une plateforme sur-mesure | CR-01/Q01 |
| Compte client / espace membre public | Réservation en mode invité uniquement | CR-02/§3 |
| Annulation autonome en ligne par le client | L'annulation est effectuée uniquement par l'administrateur (y compris en cas de désistement « par peur » suite à une alerte) | CR-03/Q01, CR-04/§8 |
| Modification autonome en ligne par le client | La modification est effectuée uniquement par l'administrateur | CR-03/Q03 |
| Ajout de passagers sur une réservation existante | Évite la complexité de régularisation/paiement en back-office ; nécessite une nouvelle commande | CR-03/Q03 |
| Report / modification de date | Non supporté sur commande existante ; nécessite annulation préalable | CR-03/Q03 |
| Remboursement bancaire automatisé | Traité manuellement hors système par l'entreprise selon ses CGV (y compris les remboursements à 100 % suite à alerte ou annulation par peur) | CR-02/Q02, CR-03/§3, CR-04/Q07, CR-04/Q08, CR-04/§8 |
| Comptes secondaires (capitaine, vendeur) | Un seul profil administrateur pour l'entreprise | CR-02/Q03 |
| Répartition nominative des passagers par bateau | Dispatch physique réalisé à quai avant l'embarquement | CR-01/§8 Q1 |
| Manifeste de bord maritime informatique | Le manifeste reste un registre papier officiel hors système | CR-02/Q05 |
| Synchronisation avec agendas externes (Google, Outlook) | Non souhaitée | CR-01/Q17 |
| Notifications admin à chaque nouvelle réservation | Non nécessaire pour les nouvelles réservations | CR-02/Q07 |
| Calcul dynamique en temps réel du transit maritime | Règles horaires fixes prédéfinies | CR-03/Q13 |
| Application mobile native (iOS / Android) | Site web responsive suffisant | CR-02/Q06 |
| Gestion de templates dynamiques en base de données | Les propositions de messages types sont codées en dur dans l'interface | CR-04/§3, CR-04/§8 |
| Stockage de la langue du client et routage linguistique différencié | Les messages d'alerte sont universels et bilingues combinés (FR + EN dans le même corps de message) | CR-04/Q06, CR-04/§3, CR-04/§8 |
| Déclencheur météo automatisé par API tierce | L'envoi d'alerte est initié sur décision manuelle de l'administrateur | CR-04/§3, CR-04/§8 |
| Outil de traduction automatique en direct / par IA | Non souhaité | CR-04/§8 |
| Canaux de notification hors SMS et e-mail (push mobile, WhatsApp...) | Diffusion limitée strictement aux SMS et e-mails | CR-04/Q02, CR-04/§8 |

---

## 7. Contraintes

| # | Contrainte | Nature | Source |
|---|---|---|---|
| 1 | Solution sur-mesure exclusivement, aucun SaaS tiers | stratégique | CR-01/Q01 |
| 2 | Ouverture 7 jours sur 7 ; fermeture uniquement le 25 décembre et le 1er janvier | métier | CR-01/Q09 (corrigé) |
| 3 | Deux points d'embarquement : Saint-Gilles (quotidien) et Saint-Leu (mardi et jeudi à 9h00) | métier / logistique | CR-03/Q08, CR-03/Q11, CR-03/Q13 |
| 4 | Flotte de deux navires : Tikap (12 places) et Grand Bleu (24 places). Seul le Tikap opère à Saint-Leu | physique / capacité | CR-01/Q12, CR-01/Q15, CR-03/Q10 |
| 5 | Jauge maximale à Saint-Gilles : 36 places par créneau standard, mais bridée à **24 places** le mardi et jeudi matin (07h00 et 10h00, Grand Bleu seul) | logistique / capacité | CR-03/Q13, RM-39, C-27 |
| 6 | Paiement intégral (100 %) en ligne à la réservation par carte bancaire, aucun acompte | métier | CR-01/Q24, CR-01/Q25 |
| 7 | Clôture des réservations en ligne 2 heures avant le départ du créneau | métier | CR-01/Q35, CR-02/Q08 |
| 8 | Annulation totale et modification à la baisse (réduction de passagers) réservées exclusivement à l'administrateur depuis le back-office, sans ajout ni report de date | périmètre / sécurité | CR-03/Q01, CR-03/Q03, C-31 |
| 9 | Notification SMS transactionnelle envoyée automatiquement au client en cas d'annulation par l'admin | fonctionnelle / communication | CR-03/Q01, RM-31 |
| 10 | Remboursements financiers entièrement manuels hors outil applicatif | opérationnelle | CR-02/Q02, CR-03/§3 |
| 11 | Supplément tarifaire géographique de **+ 10 € / personne** sur les billets individuels à Saint-Leu | tarifaire | CR-03/Q09, C-26 |
| 12 | Privatisation proposée le matin (7h–12h) et l'après-midi (dès 14h), tarif forfaitaire Tikap à 600 € à Saint-Leu et Saint-Gilles | métier / tarifaire | CR-03/Q06, CR-03/Q07, CR-03/Q17 |
| 13 | Interface multilingue intégrale (FR/EN) dès le lancement | métier | CR-01/Q07, CR-02/§3 |
| 14 | Facture PDF émise automatiquement à chaque confirmation de commande | métier / légale | CR-01/Q47 |
| 15 | Manifeste passagers hors périmètre applicatif (registre papier de bord) | réglementaire | CR-02/Q05 |
| 16 | Un seul profil d'accès back-office administrateur | technique / organisationnelle | CR-02/Q03 |
| 17 | Seuil de maintien d'un départ : minimum 6 réservations payantes par navire | métier | CR-02/Q01 |
| 18 | Aucune mixité d'activités sur un même créneau et une même embarcation | métier | CR-02/Q09, CR-02/Q11 |
| 19 | Ressource unique de naturaliste obligatoire pour encadrer les sorties baleines, affectée selon les réservations | ressource / physique | CR-02/Q10, CR-03/Q14, C-30 |
| 20 | Collecte obligatoire du numéro de téléphone mobile au format valide (sans stockage de la langue du client) | fonctionnelle / données | CR-03/Q01, CR-04/§3 |
| 21 | Envoi possible d'une alerte de pré-annulation la veille au soir à 18h par SMS ou e-mail (C-33) | fonctionnelle / communication | CR-04/Q01, CR-04/Q02 |
| 22 | Envoi groupé simultané de l'alerte possible sur plusieurs créneaux en une seule action (C-34) | fonctionnelle / administration | CR-04/Q04 |
| 23 | Message d'alerte bilingue combiné (texte FR suivi du texte EN dans le même corps de message) avec motif personnalisable dans un champ texte assisté par des propositions de templates bilingues codées en dur (C-35) | fonctionnelle / bilinguisme | CR-04/Q03, CR-04/Q06 |
| 24 | Politique de remboursement dérogatoire à 100 % en cas d'annulation effective du créneau après l'alerte ou en cas d'annulation par anticipation (« par peur ») du client suite à la réception de l'alerte (C-36) | métier / tarifaire | CR-04/Q07, CR-04/Q08 |

---

## 8. Règles métier

| # | Règle | Source |
|---|---|---|
| R-01 | Le planning standard comprend 3 créneaux quotidiens à Saint-Gilles (7h, 10h, 14h) et 1 créneau à Saint-Leu les mardis et jeudis à 9h00 (Tikap). | CR-01/Q09, CR-03/Q11, CR-03/Q13 |
| R-02 | Le service est ouvert 7 jours sur 7 ; il est fermé uniquement le 25 décembre et le 1er janvier. | CR-01/Q09 (corrigé) |
| R-03 | La flotte se compose de deux navires : Tikap (12 places) et Grand Bleu (24 places). Seul le Tikap opère à Saint-Leu. | CR-01/Q12, CR-01/Q15, CR-03/Q10 |
| R-04 | Grille tarifaire Saint-Gilles : Baleines 65 € adulte / 40 € enfant, Dauphins 50 € adulte / 30 € enfant, Privatisation Tikap 600 €, Grand Bleu 1 100 €. | CR-01/Q18 |
| R-05 | Grille tarifaire Saint-Leu : majoration de + 10 € / personne sur billets individuels (Baleines 75 € ad / 50 € enf, Dauphins 60 € ad / 40 € enf). Forfait de privatisation Tikap fixé à 600 € sans majoration. | CR-03/Q09, CR-03/Q17, RM-36, RM-43 |
| R-06 | Le tarif enfant s'applique de 4 à 11 ans inclus ; à partir de 12 ans, le plein tarif adulte s'applique. Les enfants de moins de 4 ans ne sont pas admis à bord (aucun tarif dérogatoire). | CR-02/Q04 |
| R-07 | Le paiement est intégral et exclusivement en ligne au moment de la commande par carte bancaire. | CR-01/Q24, CR-01/Q25 |
| R-08 | Une facture PDF avec mention du port d'embarquement est générée et envoyée automatiquement par e-mail avec la confirmation de commande. | CR-01/Q47, CR-03/Q16 |
| R-09 | Le seuil minimum de maintien d'un créneau est de 6 passagers payants par navire. | CR-02/Q01 |
| R-10 | Jauge maximale par créneau : 36 places à Saint-Gilles (12 + 24), sauf les mardis et jeudis à 07h00 et 10h00 où elle est plafonnée à **24 places** (Grand Bleu seul). Jauge de Saint-Leu fixée à **12 places** (Tikap). | CR-02/Q01, CR-03/Q13, RM-39 |
| R-11 | Les réservations en ligne sont closes automatiquement 2 heures avant l'heure de départ. | CR-01/Q35, CR-02/Q08 |
| R-12 | Un même créneau et une même embarcation sont dédiés à une seule activité exclusive (pas de mixité de prestations). | CR-02/Q09, CR-02/Q11 |
| R-13 | L'administrateur peut modifier la disponibilité et la configuration des créneaux depuis son interface de gestion. | CR-02/Q12 |
| R-14 | Un seul profil administrateur accède au back-office ; aucun sous-compte ni accès public d'annulation/modification. | CR-02/Q03, CR-03/Q01, CR-03/Q03 |
| R-15 | Un naturaliste unique encadre obligatoirement les sorties baleines ; son affectation quotidienne (Saint-Gilles ou Saint-Leu) s'ajuste selon les réservations. | CR-02/Q10, CR-03/Q14, RM-40 |
| R-16 | L'annulation d'une réservation est effectuée exclusivement par l'administrateur depuis le back-office et libère automatiquement et immédiatement les places sur le créneau. | CR-03/Q01, CR-03/Q02, RM-31, RM-32 |
| R-17 | L'annulation d'une réservation par l'administrateur déclenche l'envoi automatique d'un SMS d'information au client (remboursements financiers gérés manuellement hors système). | CR-03/Q01, RM-31 |
| R-18 | La modification d'une réservation est effectuée exclusivement par l'administrateur et consiste uniquement en la réduction du nombre de passagers (annulation partielle libérant les places sur le créneau). Aucun ajout de passager ni report de date n'est autorisé. | CR-03/Q03, RM-33 |
| R-19 | Les privatisations sont proposées en demi-journée : matin (7h00–12h00) ou après-midi (dès 14h00). | CR-03/Q06, CR-03/Q07, RM-34 |
| R-20 | Le client choisit son lieu de départ (Saint-Gilles ou Saint-Leu) lors de sa commande, avec affichage des informations propres au site. | CR-03/Q15, CR-03/Q16, RM-41, RM-42 |
| R-21 | Le registre du manifeste de bord reste un document papier physique, hors système. | CR-02/Q05 |
| R-22 | L'administrateur peut émettre une alerte de pré-annulation la veille au soir à 18h par SMS ou e-mail aux réservataires d'un créneau. | CR-04/Q01, CR-04/Q02, RM-44 |
| R-23 | Le motif de l'alerte est personnalisable par l'administrateur via un champ texte, avec des propositions de templates bilingues codées en dur dans l'interface pour préremplir automatiquement le message au clic. | CR-04/Q03, RM-45 |
| R-24 | L'envoi de l'alerte de pré-annulation peut être effectué de manière groupée et simultanée sur plusieurs créneaux en une seule opération. | CR-04/Q04, RM-46 |
| R-25 | Tout créneau placé sous alerte de pré-annulation qui reste ouvert à la réservation avec des places disponibles affiche une mention spécifique d'avertissement sur l'interface publique. | CR-04/Q05, RM-47 |
| R-26 | Le message d'alerte diffusé est bilingue combiné, intégrant obligatoirement le texte en français suivi de sa traduction en anglais dans le même corps de message (aucun stockage de la langue du client). | CR-04/Q06, RM-48 |
| R-27 | Si l'annulation du créneau est confirmée après l'envoi de l'alerte, un remboursement intégral à 100 % s'applique au client (en dérogation au barème d'annulation standard). | CR-04/Q07, RM-49 |
| R-28 | Si un client réservataire annule sa réservation par anticipation (« par peur ») après réception de l'alerte, même sans annulation effective du créneau, un remboursement intégral à 100 % s'applique au client. | CR-04/Q08, RM-50 |

---

## 9. Exigences fonctionnelles

| ID | Exigence | Priorité | Persona | Source |
|---|---|---|---|---|
| REQ-001 | Le client peut choisir le point de départ (Saint-Gilles ou Saint-Leu) et le type de sortie (Baleines, Dauphins, Privatisation) | Must | Sophie / Marc | CR-01/Q02, CR-03/Q15 |
| REQ-002 | Le client peut basculer entre français et anglais à tout moment du parcours | Must | Sophie | CR-01/Q07 |
| REQ-003 | Le client voit uniquement les créneaux disponibles selon le port choisi (masquage des 2 jours de fermeture annuelle, des créneaux complets, clos à moins de 2h, respect des plannings par site) et visualise une mention spécifique d'avertissement sur les créneaux sous alerte de pré-annulation restant ouverts avec places disponibles | Must | Sophie / Marc | CR-01/Q09, CR-01/Q35, CR-03/Q11, CR-03/Q13, CR-04/Q05 |
| REQ-004 | Le client saisit le nombre d'adultes et d'enfants (≥ 4 ans) et visualise le tarif total calculé selon le site et l'activité | Should | Marc | CR-02/Q04, CR-03/Q09 |
| REQ-005 | Le client renseigne ses coordonnées de contact minimales obligatoires (nom, prénom, e-mail, numéro de téléphone mobile valide) en mode invité (sans collecte de langue) | Should | Sophie / Marc | CR-02/§3, CR-03/Q01, CR-04/§3 |
| REQ-006 | Le client règle 100 % de sa commande par carte bancaire via une passerelle de paiement sécurisée | Must | Sophie / Marc | CR-01/Q24, CR-01/Q25 |
| REQ-007 | Le système affiche une confirmation immédiate à l'écran après validation du paiement | Should | Sophie / Marc | CR-01/Q24 |
| REQ-008 | Le système transmet automatiquement un e-mail de confirmation accompagné de la facture PDF détaillée (mentionnant le port d'embarquement) | Should | Sophie / Marc | CR-01/Q47, CR-03/Q16 |
| REQ-009 | L'administrateur consulte le planning des réservations consolidé par port, jour et créneau | Should | Administrateur | CR-02/Q03, CR-03/Q13 |
| REQ-010 | L'administrateur visualise le taux de remplissage selon les jauges réelles (12 places à St-Leu, 24 places le mar/jeu 07h/10h à St-Gilles, 36 places standard) | Should | Administrateur | CR-02/Q01, CR-03/Q13 |
| REQ-011 | L'administrateur peut modifier la disponibilité et la configuration des créneaux depuis son tableau de bord | Could | Administrateur | CR-02/Q12 |
| REQ-012 | Le système bloque automatiquement toute réservation excédant la capacité maximale du créneau (12, 24 ou 36 places) | Must | — | CR-02/Q01, CR-03/Q13 |
| REQ-013 | L'administrateur peut annuler totalement une réservation depuis le back-office, entraînant la libération immédiate et synchrone des places sur le créneau | Should | Administrateur | CR-03/Q01, CR-03/Q02 |
| REQ-014 | Le système déclenche automatiquement l'envoi d'un SMS d'information au client lors de l'annulation de sa réservation par l'administrateur | Should | Client / Admin | CR-03/Q01 |
| REQ-015 | L'administrateur peut réduire le nombre de passagers (adultes/enfants) d'une réservation existante depuis le back-office, entraînant la libération synchrone des places annulées sur le créneau (sans possibilité d'ajouter des passagers ni de changer la date) | Should | Administrateur | CR-03/Q03 |
| REQ-016 | Le client peut sélectionner une formule de privatisation en demi-journée le matin (7h–12h) ou l'après-midi (dès 14h) à Saint-Gilles et à Saint-Leu | Should | Marc | CR-03/Q06, CR-03/Q07, CR-03/Q17 |
| REQ-017 | L'administrateur peut sélectionner un ou plusieurs créneaux du lendemain pour leur envoyer une alerte de pré-annulation groupée la veille au soir à 18h | Should | Administrateur | CR-04/Q01, CR-04/Q04 |
| REQ-018 | L'administrateur peut préremplir le champ de message via des propositions de templates bilingues (FR+EN) codées en dur, personnaliser le texte, puis déclencher l'envoi par SMS ou e-mail à l'ensemble des passagers réservataires des créneaux ciblés | Should | Administrateur | CR-04/Q02, CR-04/Q03, CR-04/Q06 |
| REQ-019 | Le système affiche un avertissement textuel clair (mention d'alerte) sur l'interface publique pour tout créneau sous alerte de pré-annulation dont la jauge n'est pas complète | Should | Sophie / Marc | CR-04/Q05 |
| REQ-020 | L'administrateur consigne le motif d'annulation d'une réservation (annulation effective météo suite à alerte ou annulation « par peur » du client suite à l'alerte) à titre de traçabilité dans le back-office (les remboursements restant 100 % manuels hors système) | Should | Administrateur | CR-04/Q07, CR-04/Q08 |

**Rappel :** le client plafonne le *Must have* à 3 cas d'usage principaux (Sélection & Consultation, Parcours bilingue / Paiement CB, Respect strict des jauges).

---

## 10. Exigences non fonctionnelles

| ID | Exigence | Comment on la vérifie | Source |
|---|---|---|---|
| REQ-101 | L'interface publique est intégralement disponible en français et en anglais | Chaque écran du parcours client existe dans les deux langues, sans texte non traduit | CR-01/Q07, CR-02/§3 |
| REQ-102 | Le site est utilisable sur ordinateur, tablette et smartphone pour le parcours client | Le parcours de réservation complet est testé et validé sur les trois formats | CR-02/Q06 |
| REQ-103 | L'espace d'administration est conçu pour un usage sur ordinateur de bureau (Desktop) uniquement | Les écrans admin sont validés en résolution desktop, sans adaptation mobile requise | CR-02/Q06 |
| REQ-104 | Les transactions par carte bancaire respectent les normes de sécurité bancaire en vigueur | La passerelle de paiement retenue est certifiée conforme (ex. PCI-DSS) | CR-01/Q24 |
| REQ-105 | Les données personnelles collectées sont limitées au strict nécessaire (nom, prénom, e-mail, téléphone mobile, sans champ de langue) | Revue du formulaire de commande : aucun champ superflu | CR-02/§3, CR-03/Q01, CR-04/§3 |
| REQ-106 | Les notifications SMS (annulation, pré-alerte) et e-mails sont délivrées de manière fiable aux coordonnées du client | Taux de délivrabilité des messages transactionnels vérifié | CR-03/Q01, CR-04/Q01, CR-04/Q02 |
| REQ-107 | Le système maintient la cohérence instantanée des jauges lors d'annulations ou de réductions de passagers concurrentes | Tests de concurrence sur la réouverture et le blocage de créneaux | CR-03/Q02, CR-03/Q03 |
| REQ-108 | La durée de conservation des données personnelles est définie et appliquée conformément au RGPD | Politique de purge et de conservation documentée | CR-02/§8 |

---

## 11. Questions restées ouvertes

| # | Question | Posée le | Réponse | Hypothèse retenue en attendant |
|---|---|---|---|---|
| 1 | Quel est le délai limite de notification d'annulation à respecter vis-à-vis du client ? | CR-03/§8 Q1 | en attente | Notification envoyée dès validation de l'annulation par l'administrateur, sans restriction horaire système |
| 2 | Quel prestataire SMS (Twilio, OVH SMS, SMS Factor...) est privilégié pour l'envoi des notifications ? | CR-03/§8 Q2 | en attente | Passerelle SMS transactionnelle standard avec API REST |
| 3 | Dans quel ordre précis se font les choix du client (lieu, date, activité) dans le tunnel de réservation ? | CR-03/§8 Q3 | en attente | Sélection par étape : 1. Type de sortie & lieu -> 2. Date & créneau -> 3. Passagers |
| 4 | Quel hébergeur / type d'infrastructure est souhaité pour la mise en production ? | CR-02/§8 Q2 | en attente | Hébergement cloud standard infogéré, à dimensionner selon volumétrie |
| 5 | Qui fournit et valide les textes finaux des CGV et mentions légales ? | CR-02/§8 Q3 | en attente | L'entreprise fournit les textes légaux avant mise en ligne |
| 6 | Quelle durée exacte de conservation des données personnelles retenir au titre du RGPD ? | CR-02/§8 Q5 | en attente | Durée légale par défaut (3 ans à compter du dernier contact) |
| 7 | Quelle est la date cible définitive de mise en service ? | CR-01/Q54 | sans réponse | Mise en service visée avant l'ouverture de la prochaine saison des baleines |
| 8 | Quel format et politique de sécurité de mot de passe retenir pour l'accès administrateur ? | point-relevés.md | en attente | Identifiant e-mail + mot de passe robuste (≥ 12 caractères avec majuscule, chiffre, caractère spécial) |
| 9 | Quel est le statut de remise en vente des places annulées « par peur » suite à une alerte ? | CR-04/§3 | en attente | Les places libérées sont automatiquement remises en vente sur le créneau sous alerte jusqu'à clôture à H-2 |
| 10 | Quelle est l'articulation exacte entre l'alerte à J-1 18h et l'annulation météo définitive à H-2 le jour J ? | CR-04/§3 | en attente | L'alerte prévient d'un risque ; la décision finale d'annulation du créneau intervient au plus tard à H-2 |
| 11 | Quelle est la liste définitive des propositions de templates bilingues (FR/EN) à intégrer en dur dans l'interface ? | CR-04/§3 | en attente | Intégration par défaut de deux templates types (ex : Météo défavorable et Problème technique) avec version FR suivie de la version EN |

---

## 12. Validation client

| Version | Date | Présentée au client | Retour |
|---|---|---|---|
| v1 | 11/08/2026 | oui | Validée avec demandes d'ajustements |
| v2 | 11/08/2026 | oui | Validée avec demandes d'évolutions multi-sites et annulation |
| v3 | 12/08/2026 | oui | Validée avec demande d'ajout d'une alerte de pré-annulation la veille (CR-04) |
| v4 | 14/08/2026 | non | Intégration du CR-04 (alerte de pré-annulation à J-1 18h par SMS/email, templates bilingues FR+EN codés en dur avec personnalisation, mention créneau, et remboursement à 100 % en cas d'annulation effective ou par peur) |
