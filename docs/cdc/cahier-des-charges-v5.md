# Cahier des charges — Ti'Baleine

**Équipe :** Thomas, Loïc, Benjamin et Ivan | RageGit  
**Version :** v5 — 19/08/2026  
**Sources :** `compte-rendu-entretien-01.md`, `compte-rendu-entretien-02.md`, `compte-rendu-entretien-03.md`, `compte-rendu-entretien-04.md`, `compte-rendu-entretien-05.md`

Ce document formalise le **problème compris**, pas la solution. Aucun nom de technologie, aucun nom de framework, aucune structure de base de données ici.

---

## 1. Contexte

Ti'Baleine propose des sorties en mer à la journée : observation des baleines et des dauphins, sorties « coucher de soleil » (Sunset), et formules de privatisation de navires. L'entreprise exploite deux bateaux, le **Tikap** (12 places) et le **Grand Bleu** (24 places).

L'activité s'articule autour de deux points d'embarquement :
- **Saint-Gilles (port principal) :** exploité toute la semaine avec l'ensemble de la flotte sur trois créneaux quotidiens (7h, 10h et 14h), à l'exception des mardis et jeudis matin où seul le *Grand Bleu* opère (indisponibilité du *Tikap* à 07h00 et 10h00 pour cause de rotation à Saint-Leu).
- **Saint-Leu (second point d'embarquement) :** ouvert le **mardi et le jeudi**, opéré exclusivement par le *Tikap* (12 places) avec un départ unique à **9h00** et une tarification majorée de + 10 € par personne sur les billets individuels.

Les formules de privatisation de navire sont proposées en demi-journée : le matin (**07h00 – 12h00**) ou l'après-midi (**dès 14h00**) à Saint-Gilles, et le matin (**dès 09h00** les mardis et jeudis) à Saint-Leu (sur le Tikap, au même tarif forfaitaire de 600 €).

Aujourd'hui, environ 60 % de la clientèle est étrangère, ce qui impose une interface multilingue. L'entreprise souhaite se doter d'une plateforme web sur-mesure (piste de nom de domaine `tibaleine.re`) pour moderniser la réservation, fiabiliser la gestion des capacités multi-sites, mettre en place un **paiement scindé en deux temps** (versement d'un acompte en ligne de 30 % ou 50 %, puis règlement du solde la veille via un lien sécurisé envoyé par SMS ou directement sur place par carte bancaire le jour du départ au choix du client, le solde étant obligatoirement réglé sur place sans envoi de SMS pour les réservations le jour même), permettre une administration simple du planning et des réservations avec consultation des statuts financiers (payée complètement / payée partiellement), encaissement du solde sur place par CB, annulations totales et modifications à la baisse du nombre de passagers gérées par l'administrateur avec information SMS envoyée au client lors d'une annulation, émission de **deux factures distinctes** (facture d'acompte puis facture de solde), calcul de remboursement assis sur le montant total plafonné aux sommes perçues, et intégrer un mécanisme d'alerte de pré-annulation la veille au soir à 18h par SMS ou e-mail (avec motif bilingue FR/EN personnalisable prérempli par des templates types codés en dur) assorti d'une politique de remboursement à 100 % en cas d'annulation effective ou par anticipation (« par peur ») du client suite à l'alerte, sans complexité inutile pour un usage non informaticien (*CR-01, CR-02, CR-03, CR-04, CR-05*).

---

## 2. Problème

Ti'Baleine ne dispose pas d'un canal de réservation en ligne pour gérer les places contingentées de ses deux navires sur des créneaux fixes répartis sur deux ports d'embarquement (Saint-Gilles et Saint-Leu). Cela complique le suivi du remplissage en temps réel, l'application des spécificités de planning/tarification, et l'accueil d'une clientèle majoritairement étrangère.

L'entreprise recherche un outil sur-mesure — sans passer par un SaaS tiers — qui centralise la réservation grand public, le paiement scindé par carte bancaire (acompte en ligne puis solde la veille par lien SMS ou sur place le jour J par CB) et l'émission automatique de **deux factures distinctes** (acompte et solde), tout en offrant à l'administrateur la consultation du statut de paiement (payée complètement vs payée partiellement), l'encaissement du solde CB sur place, la maîtrise exclusive des modifications à la baisse (réduction de passagers), des annulations de réservations (avec libération synchrone des places et notification par SMS au client lors d'une annulation), et de l'envoi d'alertes de pré-annulation groupées bilingues (SMS/email) à J-1 18h avec affichage d'une mention d'avertissement sur les créneaux concernés en ligne, tout en conservant les opérations de remboursement financier (calculées sur le montant total plafonné aux montants perçus, ou à 100 % post-alerte) en gestion directe manuelle hors système.

---

## 3. Objectifs

| # | Objectif | Comment on saura que c'est atteint |
|---|---|---|
| 1 | Ouvrir un canal de réservation en ligne multi-sites avec paiement scindé | Un client peut réserver une sortie sur le site en choisissant son port de départ (Saint-Gilles ou Saint-Leu) et son créneau, et valider sa commande par le versement d'un acompte partiel en ligne (30 % en standard, 50 % en privatisation), puis régler son solde la veille par SMS ou sur place à l'embarcadère (*CR-01/Q01, CR-03/Q15, CR-05/Q02, CR-05/Q03*) |
| 2 | Offrir une interface multilingue (FR/EN) | Le parcours public complet (sélection du lieu, créneau, paiement de l'acompte, paiement du solde, confirmation) est disponible en français et en anglais (*CR-01/Q07, CR-02/§3, CR-05*) |
| 3 | Assurer une gestion administrative centralisée, simple et réactive | L'administrateur consulte le planning multi-sites, visualise les jauges réelles (24 ou 36 places), consulte le jour J si les réservations sont payées complètement ou partiellement, enregistre les encaissements de solde CB sur place, réduit le nombre de passagers ou procède aux annulations avec libération immédiate du créneau et émission automatique d'un SMS d'information au client (*CR-02/Q03, CR-03/Q01, CR-03/Q02, CR-03/Q03, CR-05/Q05*), et diffuse des alertes de pré-annulation groupées bilingues personnalisables (SMS/email) la veille à 18h avec affichage d'un avertissement transparent pour les réservataires (*CR-04/Q01, CR-04/Q02, CR-04/Q03, CR-04/Q04, CR-04/Q05, CR-04/Q06*) |

---

## 4. Parties prenantes

| Partie prenante | Rôle | Ce qu'elle attend | Utilise l'application ? |
|---|---|---|---|
| Administrateur (Ti'Baleine) | Profil unique de back-office : consultation du planning multi-sites, gestion des créneaux, suivi du remplissage, consultation le jour J du statut de paiement de chaque réservation (payée complètement / payée partiellement), pointage/enregistrement de l'encaissement du solde par carte bancaire sur place, annulation totale et modification à la baisse (réduction de passagers), envoi groupé d'alertes de pré-annulation à J-1 18h avec préremplissage par templates bilingues codés en dur et personnalisation du motif, sélection du motif d'annulation pour composer le SMS d'information au client (sans persistance en base) | Un espace simple, épuré, sur ordinateur de bureau (Desktop) avec une ergonomie claire pour le suivi des statuts financiers et les opérations du jour J | oui |
| Client final (touriste ou local) | Réserve en ligne (choisit son point de départ Saint-Gilles ou Saint-Leu), règle l'acompte obligatoire par carte bancaire (30 % ou 50 %), reçoit un e-mail de confirmation avec facture d'acompte PDF, reçoit la veille à J-1 un SMS contenant le lien sécurisé de règlement du solde (qu'il est libre d'utiliser ou d'ignorer pour régler sur place par CB), reçoit une facture de solde distincte lors du règlement final, reçoit un SMS d'information en cas d'annulation par l'admin, et reçoit le message d'alerte de pré-annulation bilingue (texte FR suivi du texte EN) par SMS ou e-mail | Un parcours rapide, clair, dans sa langue, sans création de compte, avec flexibilité sur le règlement du solde | oui |
| Naturaliste | Encadre obligatoirement les sorties baleines (ressource unique affectée selon la demande du planning) | Aucune interaction directe avec le système (planning géré par l'admin) | non |
| Capitainerie / Affaires Maritimes | Autorité réglementaire sur le manifeste de bord | Rien du système : le manifeste reste un registre papier | non |

---

## 5. Personas

### Sophie — cliente touriste étrangère
- **Contexte d'usage :** réserve depuis son smartphone à l'hôtel, ne parle pas français.
- **Objectif :** trouver un créneau disponible pour une sortie baleines (à Saint-Gilles ou Saint-Leu), verser son acompte de 30 % immédiatement par carte bancaire, recevoir sa facture d'acompte, et pouvoir régler son solde en ligne via le SMS reçu la veille ou directement à l'embarcadère le jour du départ.
- **Ce qui la bloque aujourd'hui :** absence d'interface en anglais, manque de visibilité sur les points de départ et absence de paiement en ligne.

### Marc — client local
- **Contexte d'usage :** réserve depuis un ordinateur ou smartphone, connaît bien la côte ouest de La Réunion.
- **Objectif :** réserver rapidement une privatisation du Tikap le matin (dès 09h00) au départ de Saint-Leu pour son groupe d'amis en réglant 50 % d'acompte, être prévenu la veille à 18h en cas de risque météo avec garantie de remboursement à 100 %, ou régler le solde sur place en CB le matin même.
- **Ce qui le bloque aujourd'hui :** besoin d'appeler pour vérifier les disponibilités du navire et connaître les tarifs applicables.

### L'administrateur — gérant de Ti'Baleine
- **Contexte d'usage :** ordinateur de bureau (Desktop/PC), consultation et supervision quotidienne du planning.
- **Objectif :** visualiser les taux de remplissage par port, vérifier immédiatement le jour J si les réservations du créneau sont « payées complètement » ou « payées partiellement », enregistrer l'encaissement CB sur place pour les soldes restants, réduire le nombre de passagers d'une réservation, annuler un dossier avec calcul indicatif de remboursement selon le barème sur le montant total ou émettre une alerte de pré-annulation groupée la veille à 18h.
- **Ce qui le bloque aujourd'hui :** gestion éclatée entre appels, notes papier, suivi manuel des acomptes/soldes et ressaisie manuelle des alertes.

---

## 6. Périmètre

### Dans le périmètre
- Un site web public de réservation responsive (ordinateurs, tablettes, smartphones) (*CR-02/Q06*).
- Sélection du lieu de départ : **Saint-Gilles** ou **Saint-Leu** (*CR-03/Q15*).
- Parcours de commande fluide sans création de compte obligatoire (mode invité) (*CR-02/§3*).
- Tarification dynamique selon le lieu (+ 10 € / personne sur billets individuels à Saint-Leu) et la tranche d'âge (*CR-03/Q09*).
- Réservation de formules de privatisation en demi-journée le matin (7h–12h) et l'après-midi (dès 14h) à Saint-Gilles, et le matin (dès 9h00 les mardis et jeudis) à Saint-Leu (*CR-03/Q06, Q07, Q17*).
- Module de calcul et d'encaissement en ligne des acomptes obligatoires par carte bancaire : **30 %** pour les formules standard, **50 %** pour les formules de privatisation (*CR-05/Q02, RM-51*).
- Génération et émission automatique d'une **facture d'acompte PDF** envoyée par e-mail avec la confirmation initiale (*CR-05, RM-57*).
- Module d'envoi automatique à J-1 d'un **SMS** contenant un lien sécurisé de règlement du solde restant (70 % ou 50 %) pour les réservations avec acompte (hors réservations effectuées le jour même) (*CR-05/Q03, REQ-021*).
- Page sécurisée de règlement du solde en ligne avec validation technique du lien fixée à une durée d'une heure (*CR-05/§3, SPEC-PAY-02*).
- Génération et émission automatique d'une **facture de solde distincte** émise lors du règlement effectif du solde (en ligne via lien SMS ou sur place) (*CR-05, RM-57, REQ-008*).
- Collecte et validation du numéro de téléphone mobile pour notifications d'urgence et envoi du lien de solde (*CR-03/Q01, CR-05*).
- Interface d'administration unique (Desktop) :
  - Consultation et supervision du planning multi-sites avec visualisations des jauges réelles (12, 24 ou 36 places).
  - Consultation directe le jour J du statut de paiement de chaque réservation : **payée complètement** (solde réglé) ou **payée partiellement** (seul l'acompte a été versé) (*CR-05/Q05, REQ-023*).
  - Enregistrement et validation du paiement du solde par carte bancaire sur place pour les clients n'ayant pas payé via le lien SMS (*CR-05/§3, REQ-022*).
  - Modification d'une réservation par l'administrateur : ajustement exclusivement à la baisse du nombre de passagers (annulation partielle de places libérant la jauge du créneau) (*CR-03/Q03*).
  - Annulation totale d'une réservation avec libération synchrone des places sur le créneau et calcul indicatif du remboursement sur le montant total plafonné aux sommes perçues (*CR-03/Q01, CR-05/Q04, RM-55*).
  - Déclenchement automatique d'un **SMS d'information au client** lors d'une annulation (*CR-03/Q01*).
  - Module d'envoi d'alerte de pré-annulation groupée la veille à 18h (multi-créneaux, SMS/Email, champ texte avec préremplissage par propositions de templates bilingues codées en dur FR+EN et personnalisation du motif) (*CR-04/Q01, CR-04/Q02, CR-04/Q03, CR-04/Q04, CR-04/Q06*).
  - Sélection ou saisie du motif d'annulation (annulation effective météo suite à alerte vs annulation « par peur » / anticipation du client suite à l'alerte vs standard) pour composer le SMS de notification au client, sans persistance en base de données (*CR-04/Q07, CR-04/Q08, REQ-020*).
- Affichage d'une mention spécifique d'avertissement sur les créneaux sous alerte de pré-annulation lorsqu'ils restent ouverts à la réservation et disposent de places (*CR-04/Q05*).
- Support bilingue complet français/anglais sur le parcours public (*CR-01/Q07, CR-02/§3*).

### Hors périmètre

| Élément écarté | Motif | Source |
|---|---|---|
| Solution SaaS tierce (Bokun, Resagenda…) | Le client exige une plateforme sur-mesure | CR-01/Q01 |
| Compte client / espace membre public | Réservation en mode invité uniquement | CR-02/§3 |
| Annulation autonome en ligne par le client | L'annulation est effectuée uniquement par l'administrateur | CR-03/Q01, CR-04/§8 |
| Modification autonome en ligne par le client | La modification est effectuée uniquement par l'administrateur | CR-03/Q03 |
| Prélèvement automatique différé sans action client | Le client doit initier activement le paiement du solde (via le lien SMS ou sur place) | CR-05/§8 |
| Relances multicanales répétées pour le solde | Un seul SMS automatique contenant le lien de paiement est envoyé la veille | CR-05/§8 |
| Encaissement sur place par espèces ou chèques vacances | Le paiement sur place reste restreint exclusivement à la carte bancaire | CR-05/§8 |
| Remboursement bancaire automatisé | Traité manuellement hors système par l'entreprise selon le barème assis sur le montant total ou les règles post-alerte à 100 % | CR-02/Q02, CR-05/Q04, CR-05/§8 |
| Ajout de passagers sur une réservation existante | Évite la complexité de régularisation/paiement en back-office ; nécessite une nouvelle commande | CR-03/Q03 |
| Report / modification de date | Non supporté sur commande existante ; nécessite annulation préalable | CR-03/Q03 |
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
| 6 | Paiement scindé en deux temps : versement d'un acompte obligatoire de **30 %** en ligne par CB pour les sorties standard, solde de 70 % réglé la veille par lien SMS ou sur place le jour J en CB (C-37) | métier / financier | CR-05/§1, CR-05/§3 |
| 7 | Clôture des réservations en ligne 2 heures avant le départ du créneau | métier | CR-01/Q35, CR-02/Q08 |
| 8 | Annulation totale et modification à la baisse (réduction de passagers) réservées exclusivement à l'administrateur depuis le back-office, sans ajout ni report de date | périmètre / sécurité | CR-03/Q01, CR-03/Q03, C-31 |
| 9 | Notification SMS transactionnelle envoyée automatiquement au client en cas d'annulation par l'admin | fonctionnelle / communication | CR-03/Q01, RM-31 |
| 10 | Remboursements financiers entièrement manuels hors outil applicatif | opérationnelle | CR-02/Q02, CR-03/§3 |
| 11 | Supplément tarifaire géographique de **+ 10 € / personne** sur les billets individuels à Saint-Leu | tarifaire | CR-03/Q09, C-26 |
| 12 | Privatisation proposée le matin (7h–12h) et l'après-midi (dès 14h) à Saint-Gilles, et le matin (dès 9h00 les mardis et jeudis) à Saint-Leu, tarif forfaitaire Tikap à 600 € à Saint-Leu et Saint-Gilles | métier / tarifaire | CR-03/Q06, CR-03/Q07, CR-03/Q17 |
| 13 | Interface multilingue intégrale (FR/EN) dès le lancement | métier | CR-01/Q07, CR-02/§3 |
| 14 | Émission de deux factures PDF distinctes : facture d'acompte à la réservation et facture de solde distincte au paiement effectif du solde (C-43) | métier / légale | CR-05/§1, CR-05/§3, RM-57 |
| 15 | Manifeste passagers hors périmètre applicatif (registre papier de bord) | réglementaire | CR-02/Q05 |
| 16 | Un seul profil d'accès back-office administrateur | technique / organisationnelle | CR-02/Q03 |
| 17 | Seuil de maintien d'un départ : minimum 6 réservations payantes par navire | métier | CR-02/Q01 |
| 18 | Aucune mixité d'activités sur un même créneau et une même embarcation | métier | CR-02/Q09, CR-02/Q11 |
| 19 | Ressource unique de naturaliste obligatoire pour encadrer les sorties baleines, affectée selon les réservations | ressource / physique | CR-02/Q10, CR-03/Q14, C-30 |
| 20 | Collecte obligatoire du numéro de téléphone mobile au format valide (sans stockage de la langue du client) | fonctionnelle / données | CR-03/Q01, CR-04/§3 |
| 21 | Envoi possible d'une alerte de pré-annulation la veille au soir à 18h par SMS ou e-mail (C-33) | fonctionnelle / communication | CR-04/Q01, CR-04/Q02 |
| 22 | Envoi groupé simultané de l'alerte possible sur plusieurs créneaux en une seule action (C-34) | fonctionnelle / administration | CR-04/Q04 |
| 23 | Message d'alerte bilingue combiné (texte FR suivi du texte EN) avec motif personnalisable assisté par des propositions de templates bilingues codées en dur (C-35) | fonctionnelle / bilinguisme | CR-04/Q03, CR-04/Q06 |
| 24 | Politique de remboursement dérogatoire à 100 % en cas d'annulation effective du créneau après l'alerte ou en cas d'annulation par anticipation (« par peur ») du client suite à la réception de l'alerte (C-36) | métier / tarifaire | CR-04/Q07, CR-04/Q08 |
| 25 | Acompte fixé à **50 %** en ligne pour les formules de privatisation (solde de 50 %) (C-39) | métier / tarifaire | CR-05/Q02, CR-05/§3 |
| 26 | Réservations le jour même : acompte payé en ligne et solde obligatoirement réglé sur place en CB, sans génération ni envoi de lien/SMS (C-40) | métier / logistique | CR-05/Q03, CR-05/§3 |
| 27 | Calcul du remboursement standard assis sur le **montant total de la réservation** avec retenue sur les sommes perçues : `remboursement = max(0, montant payé − (100 % − taux du barème) × montant total)` (C-41) | métier / comptable | CR-05/Q04, CR-05/§3, RM-55 |
| 28 | Consultation directe dans l'interface administrateur de l'état de paiement (partiel / complet) pour chaque réservation le jour J (C-42) | fonctionnelle / ergonomie | CR-05/Q05, CR-05/§3, RM-56 |

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
| R-07 | Le paiement s'effectue en deux temps : un acompte obligatoire en ligne à la réservation de **30 %** pour les formules standard et de **50 %** pour les privatisations (RM-51). Le solde restant (70 % ou 50 %) est réglé soit via un lien de paiement sécurisé envoyé automatiquement la veille par **SMS**, soit directement sur place par carte bancaire le jour du départ au libre choix du client (RM-53). | CR-05/§1, CR-05/Q02, CR-05/§3 |
| R-08 | Pour toute réservation effectuée le jour même de la sortie, l'acompte est versé en ligne et le solde est réglé obligatoirement sur place par CB ; aucun SMS ni lien de paiement de solde n'est généré (RM-54). | CR-05/Q03, CR-05/§3 |
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
| R-19 | Les privatisations sont proposées en demi-journée : matin (7h00–12h00) ou après-midi (dès 14h00) à Saint-Gilles, et le matin (dès 9h00 les mardis et jeudis) à Saint-Leu. | CR-03/Q06, CR-03/Q07, RM-34 |
| R-20 | Le client choisit son lieu de départ (Saint-Gilles ou Saint-Leu) lors de sa commande, avec affichage des informations propres au site. | CR-03/Q15, CR-03/Q16, RM-41, RM-42 |
| R-21 | Le registre du manifeste de bord reste un document papier physique, hors système. | CR-02/Q05 |
| R-22 | L'administrateur peut émettre une alerte de pré-annulation la veille au soir à 18h par SMS ou e-mail aux réservataires d'un créneau. | CR-04/Q01, CR-04/Q02, RM-44 |
| R-23 | Le motif de l'alerte est personnalisable par l'administrateur via un champ texte, avec des propositions de templates bilingues codées en dur dans l'interface pour préremplir automatiquement le message au clic. | CR-04/Q03, RM-45 |
| R-24 | L'envoi de l'alerte de pré-annulation peut être effectué de manière groupée et simultanée sur plusieurs créneaux en une seule opération. | CR-04/Q04, RM-46 |
| R-25 | Tout créneau placé sous alerte de pré-annulation qui reste ouvert à la réservation avec des places disponibles affiche une mention spécifique d'avertissement sur l'interface publique. | CR-04/Q05, RM-47 |
| R-26 | Le message d'alerte diffusé est bilingue combiné, intégrant obligatoirement le texte en français suivi de sa traduction en anglais dans le même corps de message (aucun stockage de la langue du client). | CR-04/Q06, RM-48 |
| R-27 | Si l'annulation du créneau est confirmée après l'envoi de l'alerte, un remboursement intégral à 100 % s'applique au client (en dérogation au barème d'annulation standard). | CR-04/Q07, RM-49 |
| R-28 | Si un client réservataire annule sa réservation par anticipation (« par peur ») après réception de l'alerte, même sans annulation effective du créneau, un remboursement intégral à 100 % s'applique au client. | CR-04/Q08, RM-50 |
| R-29 | Le calcul du montant de remboursement standard (hors post-alerte météo) est assis sur le **montant total de la réservation** avec retenue de la pénalité sur les sommes perçues : `remboursement = max(0, montant payé − (100 % − taux du barème) × montant total)` (RM-55). Si l'acompte est inférieur ou égal à la pénalité retenue, le remboursement est de 0 € sans réclamer de complément au client. | CR-05/Q04, CR-05/§3, RM-55 |
| R-30 | L'interface d'administration permet de consulter le jour J si chaque réservation est payée complètement (solde réglé) ou partiellement (acompte seul versé), avec possibilité de pointer l'encaissement CB sur place et d'annuler (RM-56). | CR-05/Q05, CR-05/§3, RM-56 |
| R-31 | Le système émet **deux factures distinctes** pour chaque dossier : une facture d'acompte émise lors du versement initial et une facture de solde distincte émise lors du règlement effectif du solde (RM-57). | CR-05/§1, CR-05/§3, RM-57 |

---

## 9. Exigences fonctionnelles

| ID | Exigence | Priorité | Persona | Source |
|---|---|---|---|---|
| REQ-001 | Le client peut choisir le point de départ (Saint-Gilles ou Saint-Leu) et le type de sortie (Baleines, Dauphins, Privatisation) | Must | Sophie / Marc | CR-01/Q02, CR-03/Q15 |
| REQ-002 | Le client peut basculer entre français et anglais à tout moment du parcours | Must | Sophie | CR-01/Q07 |
| REQ-003 | Le client voit uniquement les créneaux disponibles selon le port choisi (masquage des 2 jours de fermeture annuelle, des créneaux complets, clos à moins de 2h, respect des plannings par site) et visualise une mention spécifique d'avertissement sur les créneaux sous alerte de pré-annulation restant ouverts avec places disponibles | Must | Sophie / Marc | CR-01/Q09, CR-01/Q35, CR-03/Q11, CR-03/Q13, CR-04/Q05 |
| REQ-004 | Le client saisit le nombre d'adultes et d'enfants (≥ 4 ans) et visualise le tarif total calculé ainsi que le montant de l'acompte exigé (30 % standard, 50 % privatisation) et le solde restant dû | Should | Marc | CR-02/Q04, CR-03/Q09, CR-05 |
| REQ-005 | Le client renseigne ses coordonnées de contact minimales obligatoires (nom, prénom, e-mail, numéro de téléphone mobile valide) en mode invité (sans collecte de langue) | Should | Sophie / Marc | CR-02/§3, CR-03/Q01, CR-04/§3 |
| REQ-006 | Le client règle **l'acompte obligatoire** (30 % standard, 50 % privatisation) par carte bancaire via une passerelle de paiement sécurisée pour confirmer sa commande | Must | Sophie / Marc | CR-01/Q24, CR-05/§3, REQ-006 modifiée |
| REQ-007 | Le système affiche une confirmation immédiate à l'écran après validation du paiement de l'acompte | Should | Sophie / Marc | CR-01/Q24, CR-05 |
| REQ-008 | Le système transmet automatiquement un e-mail de confirmation accompagné de la **facture d'acompte PDF** détaillée (mentionnant le port d'embarquement), puis émet et transmet une **facture de solde distincte** lors du règlement effectif du solde | Should | Sophie / Marc | CR-01/Q47, CR-03/Q16, CR-05/§3, REQ-008 modifiée |
| REQ-009 | L'administrateur consulte le planning des réservations consolidé par port, jour et créneau | Should | Administrateur | CR-02/Q03, CR-03/Q13 |
| REQ-010 | L'administrateur visualise le taux de remplissage selon les jauges réelles (12 places à St-Leu, 24 places le mar/jeu 07h/10h à St-Gilles, 36 places standard) | Should | Administrateur | CR-02/Q01, CR-03/Q13 |
| REQ-011 | L'administrateur peut modifier la disponibilité et la configuration des créneaux depuis son tableau de bord | Could | Administrateur | CR-02/Q12 |
| REQ-012 | Le système bloque automatiquement toute réservation excédant la capacité maximale du créneau (12, 24 ou 36 places) | Must | — | CR-02/Q01, CR-03/Q13 |
| REQ-013 | L'administrateur peut annuler totalement une réservation depuis le back-office, entraînant la libération immédiate et synchrone des places sur le créneau avec calcul indicatif du montant de remboursement selon le barème sur le montant total ou dérogation alerte | Should | Administrateur | CR-03/Q01, CR-03/Q02, CR-05/Q04, RM-55 |
| REQ-014 | Le système déclenche automatiquement l'envoi d'un SMS d'information au client lors de l'annulation de sa réservation par l'administrateur | Should | Client / Admin | CR-03/Q01 |
| REQ-015 | L'administrateur peut réduire le nombre de passagers (adultes/enfants) d'une réservation existante depuis le back-office, entraînant la libération synchrone des places annulées sur le créneau (sans possibilité d'ajouter des passagers ni de changer la date) | Should | Administrateur | CR-03/Q03 |
| REQ-016 | Le client peut sélectionner une formule de privatisation en demi-journée le matin (7h–12h) ou l'après-midi (dès 14h) à Saint-Gilles, et le matin (dès 9h00 les mardis et jeudis) à Saint-Leu | Should | Marc | CR-03/Q06, CR-03/Q07, CR-03/Q17 |
| REQ-017 | L'administrateur peut sélectionner un ou plusieurs créneaux du lendemain pour leur envoyer une alerte de pré-annulation groupée la veille au soir à 18h | Should | Administrateur | CR-04/Q01, CR-04/Q04 |
| REQ-018 | L'administrateur peut préremplir le champ de message via des propositions de templates bilingues (FR+EN) codées en dur, personnaliser le texte, puis déclencher l'envoi par SMS ou e-mail à l'ensemble des passagers réservataires des créneaux ciblés | Should | Administrateur | CR-04/Q02, CR-04/Q03, CR-04/Q06 |
| REQ-019 | Le système affiche un avertissement textuel clair (mention d'alerte) sur l'interface publique pour tout créneau sous alerte de pré-annulation dont la jauge n'est pas complète | Should | Sophie / Marc | CR-04/Q05 |
| REQ-020 | Lors d'une annulation par l'administrateur, le système propose la saisie ou la sélection d'un motif (annulation météo/technique suite à alerte, annulation « par peur » du client suite à alerte, ou annulation standard) utilisé pour composer le SMS de notification au client ; le motif n'est pas persisté en base (les remboursements restent 100 % manuels hors système) | Should | Administrateur | CR-04/Q07, CR-04/Q08 |
| REQ-021 | Déclencher l'envoi automatique d'un **SMS** la veille du départ contenant le lien sécurisé de règlement du solde aux réservataires n'ayant versé que l'acompte (sauf réservations du jour même) | Should | Client / Système | CR-05/§3, REQ-021 nouvelle |
| REQ-022 | Permettre à l'administrateur d'enregistrer et valider le règlement du solde par carte bancaire sur place pour les clients n'ayant pas payé via le lien SMS | Should | Administrateur | CR-05/§3, REQ-022 nouvelle |
| REQ-023 | Permettre à l'administrateur de consulter le jour J si les réservations sont payées complètement ou partiellement, selon l'ergonomie définie dans le CDC | Should | Administrateur | CR-05/Q05, CR-05/§3, REQ-023 nouvelle |

**Rappel :** le client plafonne le *Must have* à 3 cas d'usage principaux (Sélection & Consultation, Parcours bilingue / Paiement CB de l'acompte, Respect strict des jauges).

---

## 10. Exigences non fonctionnelles

| ID | Exigence | Comment on la vérifie | Source |
|---|---|---|---|
| REQ-101 | L'interface publique est intégralement disponible en français et en anglais (y compris la page de paiement du solde) | Chaque écran du parcours client existe dans les deux langues, sans texte non traduit | CR-01/Q07, CR-02/§3, CR-05 |
| REQ-102 | Le site est utilisable sur ordinateur, tablette et smartphone pour le parcours client (réservation d'acompte et paiement de solde) | Le parcours de réservation complet est testé et validé sur les trois formats | CR-02/Q06, CR-05 |
| REQ-103 | L'espace d'administration est conçu pour un usage sur ordinateur de bureau (Desktop) uniquement, avec une ergonomie claire des statuts financiers (partiel/complet) | Les écrans admin sont validés en résolution desktop, avec une lisibilité immédiate des statuts complet/partiel et des actions associées | CR-02/Q06, CR-05/§3 |
| REQ-104 | Les transactions par carte bancaire respectent les normes de sécurité bancaire en vigueur | La passerelle de paiement retenue est certifiée conforme (ex. PCI-DSS) | CR-01/Q24 |
| REQ-105 | Les données personnelles collectées sont limitées au strict nécessaire (nom, prénom, e-mail, téléphone mobile, sans champ de langue) | Revue du formulaire de commande : aucun champ superflu | CR-02/§3, CR-03/Q01, CR-04/§3 |
| REQ-106 | Les notifications SMS (annulation, pré-alerte, lien de paiement du solde à J-1) et e-mails sont délivrées de manière fiable aux coordonnées du client | Taux de délivrabilité des messages transactionnels vérifié | CR-03/Q01, CR-04/Q01, CR-04/Q02, CR-05/§3 |
| REQ-107 | Le lien sécurisé de paiement du solde transmis par SMS intègre une durée de validité technique fixée à **1 heure** | Test de dépassement de validité du token de solde (rejet technique au-delà d'1 heure) | CR-05/§3, CR-05/§7 |
| REQ-108 | Le système maintient la cohérence instantanée des jauges lors d'annulations ou de réductions de passagers concurrentes | Tests de concurrence sur la réouverture et le blocage de créneaux | CR-03/Q02, CR-03/Q03 |
| REQ-109 | La durée de conservation des données personnelles est définie et appliquée conformément au RGPD | Politique de purge et de conservation documentée | CR-02/§8 |

---

## 11. Questions restées ouvertes

| # | Question | Posée le | Réponse | Hypothèse retenue en attendant |
|---|---|---|---|---|
| 1 | Quel est le délai limite et la plage horaire d'annulation d'une réservation côté administrateur ? | CR-03/§8 Q1 | en attente | Annulation possible par l'admin jusqu'à l'heure exacte du départ (pas de délai minimal préalable) ; blocage strict de l'annulation après la date et l'heure du départ (en attente de confirmation client) |
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
| 12 | Faut-il mettre en place un timer de verrouillage temporaire des places dans le panier pendant le paiement bancaire ? | Point relevé | en attente | Hypothèse retenue : verrouillage temporaire déduit (ex. 10 minutes) pendant le tunnel de paiement CB pour éviter le surbooking, libération automatique si abandon/rejet (à confirmer avec le client) |
| 13 | Le canal SMS doit-il être l'unique canal de notification lors d'une annulation par l'administrateur ? | CR-03/Q01 | en attente | Hypothèse retenue : SMS systématique pour les annulations sèches par l'admin (choix déduit) ; possibilité SMS et/ou e-mail réservée aux alertes de pré-annulation (à reconfirmer avec le client) |
| 14 | Quelle est l'heure exacte d'envoi du SMS la veille (J-1) pour le paiement du solde ? | CR-05/§3 | en attente | Envoi planifié la veille du départ en journée (à synchroniser ou distinguer de l'alerte météo de 18h) |
| 15 | Comment s'articule précisément l'envoi du SMS de solde avec l'alerte météo de 18h la veille ? | CR-05/§3 | en attente | Définir l'ordonnancement si un créneau sous alerte reçoit également le lien de solde |

---

## 12. Validation client

| Version | Date | Présentée au client | Retour |
|---|---|---|---|
| v1 | 11/08/2026 | oui | Validée avec demandes d'ajustements |
| v2 | 11/08/2026 | oui | Validée avec demandes d'évolutions multi-sites et annulation |
| v3 | 12/08/2026 | oui | Validée avec demande d'ajout d'une alerte de pré-annulation la veille (CR-04) |
| v4 | 14/08/2026 | non | Intégration du CR-04 (alerte de pré-annulation à J-1 18h par SMS/email, templates bilingues FR+EN codés en dur avec personnalisation, mention créneau, et remboursement à 100 % en cas d'annulation effective ou par peur) |
| v5 | 19/08/2026 | non | Intégration du CR-05 (paiement scindé acompte 30 % / 50 %, solde par lien SMS à J-1 ou sur place en CB, exclusion SMS jour même, calcul remboursement sur montant total RM-55, émission de deux factures distinctes RM-57, consultation back-office payée complètement / partiellement, encaissement solde CB sur place) |