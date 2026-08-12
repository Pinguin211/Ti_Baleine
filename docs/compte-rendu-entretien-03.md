# Compte rendu d'entretien n° 3

**Date :** 12/08/2026
**Durée :** 30 minutes
**Interlocuteur :** le commanditaire (Ti'Baleine)
**Présents pour l'équipe :** Thomas, Loïc, Benjamin et Ivan

Entretien d'évolution et d'arbitrage : le client précise les fonctionnalités de gestion des réservations (annulation totale et modification à la baisse du nombre de passagers réservées exclusivement à l'administrateur, avec notification SMS d'information envoyée au client), ouvre un **second point de départ à Saint-Leu** (mardi et jeudi à 9h avec le Tikap, entraînant l'indisponibilité du Tikap la matinée à 07h et 10h à Saint-Gilles ces jours-là), autorise les **privatisations à Saint-Leu au même tarif qu'à Saint-Gilles** (600 € la demi-journée), et étend les privatisations en matinée (7h–12h) en plus de l'après-midi.

---

## 1. Ce que le client a dit

> **Note :** les points ci-dessous sont les **notes prises pendant l'entretien**
> (reformulées et validées avec l'équipe).

- Annulation : effectuée **par l'administrateur uniquement**, avec information par SMS envoyée au client (pas d'annulation directe par le client).
- Lors de l'annulation par l'administrateur : libération automatique de la place sur le créneau dans l'application.
- Modification d'une réservation : gérée **par l'administrateur uniquement**, strictement limitée à l'ajustement à la baisse du nombre de passagers (annulation partielle de places, aucun ajout de passager ni report de date).
- Pas de budget fixé pour le moment.
- Privatisations possibles en demi-journée : le matin (7 h – 12 h) ou l'après-midi (dès 14 h).
- Privatisations possibles à Saint-Leu (Tikap uniquement) **au même tarif qu'à Saint-Gilles** (600 €).
- Nouveau point de départ à Saint-Leu le mardi et le jeudi : départ à 9 h, opéré exclusivement par le Tikap (12 places), avec un surcoût de **+ 10 € par personne** sur les billets individuels.
- Le bateau (Tikap) repart se positionner à Saint-Gilles après la sortie de 9 h de Saint-Leu : par conséquent, **pas de Tikap disponible la matinée le mardi et le jeudi à Saint-Gilles** (seul le Grand Bleu opère à 07h et 10h à Saint-Gilles).
- Emplacement du naturaliste : dépend des réservations (ressource unique affectée selon la demande).
- Choix du lieu de départ affiché sur l'application avec les informations logistiques propres à chaque site.

---

## 2. Questions posées et réponses obtenues

| ID | Question posée | Réponse |
|---|---|---|
| Q01 | L'annulation d'une réservation est-elle possible en ligne par le client ou réservée à l'administrateur, et avec quelle notification ? | **Pas d'annulation directe par le client** : l'annulation est effectuée **uniquement par l'administrateur** depuis son interface, avec envoi automatique d'une **information par SMS au client**. |
| Q02 | Que devient le créneau lorsqu'une réservation est annulée par l'administrateur ? | La place est **libérée automatiquement** sur l'application (le créneau se rouvre à la réservation). |
| Q03 | Une réservation existante peut-elle être modifiée, et par qui ? | Oui : modification possible (**uniquement réduction de la taille du groupe / annulation partielle de places**, sans ajout de passager ni report de date), **uniquement par l'administrateur** (le client ne modifie pas lui-même). |
| Q04 | Quel nom de domaine est envisagé pour la plateforme ? | Piste : **tibaleine.re** *(à confirmer et vérifier la disponibilité)*. |
| Q05 | Quel budget est alloué au projet ? | **Pas de budget fixé** à ce stade. |
| Q06 | Les privatisations peuvent-elles avoir lieu le matin comme l'après-midi ? | Oui : privatisation possible le **matin** ou l'**après-midi**. |
| Q07 | Quelles sont les plages horaires des demi-journées de privatisation ? | Matin : **7 h – 12 h**. Après-midi : **14 h – …** *(heure de fin indicative ~18h)*. |
| Q08 | Existe-t-il désormais un second point de départ ? | Oui : depuis cette année, certains départs se font depuis **Saint-Leu** (en plus de **Saint-Gilles**), avec jours, horaires et tarifs propres. |
| Q09 | Quel est l'écart tarifaire pour les départs individuels de Saint-Leu ? | **+ 10 € par personne** par rapport à Saint-Gilles (baleines et dauphins). |
| Q10 | Quels bateaux opèrent depuis Saint-Leu ? | Uniquement le **Tikap** (12 places). |
| Q11 | Quels jours les départs ont-ils lieu depuis Saint-Leu ? | Le **mardi** et le **jeudi** depuis Saint-Leu ; le reste de la semaine depuis Saint-Gilles. |
| Q12 | Les types de sortie diffèrent-ils à Saint-Leu ? | Non : **mêmes types de sortie** qu'à Saint-Gilles (baleines, dauphins, privatisation). |
| Q13 | Quels sont les horaires des départs de Saint-Leu et quel est l'impact sur Saint-Gilles ? | **Départ à 9 h** de Saint-Leu (Tikap). Ensuite le bateau repart se positionner à Saint-Gilles : **pas de Tikap disponible la matinée le mardi et le jeudi à Saint-Gilles** (jauge 07h et 10h à Saint-Gilles = 24 places sur Grand Bleu seul). |
| Q14 | Le naturaliste est-il affecté à un lieu fixe ? | Non : l'**emplacement du naturaliste dépend des réservations**. |
| Q15 | Le client choisit-il le lieu de départ lors de la réservation ? | Oui : le **choix du lieu** (Saint-Gilles / Saint-Leu) se fait sur l'application selon les disponibilités du planning. |
| Q16 | Quelles informations liées au lieu faut-il afficher au client ? | Afficher la disponibilité selon le lieu, l'adresse du port d'embarquement, le départ à 9 h pour Saint-Leu et le supplément tarifaire. |
| Q17 | Les privatisations sont-elles possibles au départ de Saint-Leu et à quel tarif ? | **Oui**, privatisation possible au départ de Saint-Leu sur le Tikap (12 places), **au même tarif qu'à Saint-Gilles** (600 € la demi-journée, pas de surcoût par personne sur le forfait). |

---

## 3. Ce que nous avons compris

### Annulation et modification des réservations (gestion back-office admin)

- **Pas d'annulation directe par le client sur le web :** le client contacte l'entreprise par téléphone. L'annulation est enregistrée dans le back-office **exclusivement par l'administrateur**.
- **Libération automatique de créneau :** dès que l'administrateur valide l'annulation d'une réservation, les places associées sont immédiatement réincrémentées dans la jauge disponible du créneau sur le site web.
- **Information par SMS :** un SMS transactionnel d'information/confirmation d'annulation est envoyé automatiquement au numéro de téléphone mobile du client.
- **Modification de réservation :** réservée à l'administrateur exclusivement pour réduire le nombre de passagers (annulation partielle de places sur le créneau libérant la jauge). Aucun ajout de passagers (qui nécessiterait un paiement complémentaire) ni report de date n'est autorisé dans le système.
- **Traitement financier :** le remboursement éventuel reste traité manuellement hors système par l'entreprise selon ses CGV.

### Nouveau point de départ : Saint-Leu

L'exploitation s'étend sur **deux points d'embarquement** :

- **Saint-Gilles :** site principal opérant toute la semaine avec l'ensemble de la flotte (Tikap 12 places + Grand Bleu 24 places = 36 places max), sur les créneaux de 7h, 10h et 14h (sauf indisponibilité du Tikap le mardi/jeudi à 07h et 10h).
- **Saint-Leu :** point de départ secondaire ouvert **le mardi et le jeudi**, opéré **uniquement par le Tikap** (12 places) avec un **départ unique à 9h00**.
  - Majoration de **+ 10 € par personne** sur les billets individuels adultes et enfants (baleines et dauphins).
  - Après la sortie de 9h, le Tikap rentre se positionner à Saint-Gilles.

### Règle d'indisponibilité de la flotte à Saint-Gilles (Tikap en matinée)

En raison de la sortie à 9h00 à Saint-Leu et du temps de navigation de repositionnement maritime vers Saint-Gilles, **le Tikap n'est pas disponible pour les créneaux de 07h00 et 10h00 le mardi et le jeudi à Saint-Gilles**.
Sur ces créneaux spécifiques (mar/jeu 07h et 10h à Saint-Gilles), seul le *Grand Bleu* (24 places) opère, limitant la jauge maximale des créneaux à **24 places** au lieu de 36. Le Tikap redevient disponible à Saint-Gilles pour le créneau de 14h00.

### Privatisations en demi-journée (Saint-Gilles et Saint-Leu)

- La formule de privatisation de navire est proposée en **demi-journée** :
  - **Matin :** 7 h 00 – 12 h 00.
  - **Après-midi :** dès 14 h 00 (formule Sunset / fin d'après-midi).
- **Tarif identique pour Saint-Leu :** la privatisation du Tikap à Saint-Leu est facturée **600 €**, soit exactement le même tarif forfaitaire qu'à Saint-Gilles (le supplément de +10 €/pers ne s'applique pas au forfait de privatisation).

### Domaine et budget

- Nom de domaine envisagé : **tibaleine.re** (à vérifier/enregistrer).
- Aucun budget global plafonné à ce stade.

---

## 4. Parties prenantes identifiées

| Personne / rôle | Ce qu'elle fait | Comment on l'a découverte |
|---|---|---|
| Client final | Réserve et paie en ligne (choisit son lieu de départ Saint-Gilles ou Saint-Leu) ; reçoit un SMS d'information en cas d'annulation par l'admin. Ne peut pas annuler/modifier lui-même en ligne. | Q01 / Q03 / Q15 |
| Administrateur (Ti'Baleine) | Unique profil back-office : effectue les annulations totales (libérant le créneau), procède aux modifications à la baisse (réduction de passagers libérant des places), gère les créneaux multi-sites. | Q01 / Q02 / Q03 / Q13 |
| Naturaliste | Ressource unique dont l'affectation sur le planning (Saint-Gilles ou Saint-Leu) dépend du volume des réservations baleines. | Q14 |

---

## 5. Règles métier découvertes

| # | Règle | Question posée | Source | Sûre ? |
|---|---|---|---|---|
| RM-31 | L'annulation d'une réservation est effectuée exclusivement par l'administrateur depuis le back-office et déclenche un SMS d'information au client (pas d'annulation directe par le client). | L'annulation d'une réservation est-elle possible et par qui ? | Q01 | ✅ oui |
| RM-32 | L'annulation par l'administrateur libère automatiquement les places sur le créneau (réouverture instantanée à la vente). | Que devient le créneau lorsqu'une réservation est annulée ? | Q02 | ✅ oui |
| RM-33 | Une réservation peut être modifiée après création uniquement par l'administrateur et exclusivement pour réduire le nombre de passagers (annulation partielle libérant les places sur le créneau, sans ajout ni report de date). | Une réservation existante peut-elle être modifiée, et par qui ? | Q03 | ✅ oui |
| RM-34 | La privatisation est proposée en demi-journée : matin (7h–12h) ou après-midi (dès 14h). | Quelles sont les plages horaires de privatisation ? | Q06 / Q07 | ✅ oui |
| RM-35 | L'exploitation comporte deux points de départ : Saint-Gilles et Saint-Leu, avec jours/horaires/tarifs propres. | Existe-t-il désormais un second point de départ ? | Q08 | ✅ oui |
| RM-36 | Les billets individuels au départ de Saint-Leu sont majorés de + 10 € par personne (baleines et dauphins). | Quel est l'écart tarifaire pour les départs de Saint-Leu ? | Q09 | ✅ oui |
| RM-37 | À Saint-Leu, seul le Tikap (12 places) opère. | Quels bateaux opèrent depuis Saint-Leu ? | Q10 | ✅ oui |
| RM-38 | Saint-Leu opère le mardi et le jeudi à 9h00 ; Saint-Gilles opère le reste du planning. | Quels jours et horaires ont lieu les départs de Saint-Leu ? | Q11 / Q13 | ✅ oui |
| RM-39 | Le mardi et le jeudi, le Tikap n'est pas disponible la matinée à Saint-Gilles (en opération/repositionnement depuis Saint-Leu). La jauge maximale à 07h et 10h à Saint-Gilles ces jours-là est bornée à 24 places (Grand Bleu seul). | Quels sont les horaires et l'impact de repositionnement ? | Q13 | ✅ oui |
| RM-40 | L'affectation du naturaliste unique dépend des réservations journalières (pas d'affectation géographique fixe). | Le naturaliste est-il affecté à un lieu fixe ? | Q14 | ✅ oui |
| RM-41 | Le client choisit son lieu de départ (Saint-Gilles ou Saint-Leu) lors de sa réservation sur l'application. | Le client choisit-il le lieu de départ lors de la réservation ? | Q15 | ✅ oui |
| RM-42 | L'application affiche les informations propres à chaque lieu de départ (port, horaires, consignes). | Quelles informations liées au lieu faut-il afficher au client ? | Q16 | ✅ oui |
| RM-43 | La privatisation du Tikap au départ de Saint-Leu est autorisée au même tarif forfaitaire qu'à Saint-Gilles (600 € la demi-journée, sans majoration par personne). | Les privatisations sont-elles possibles à Saint-Leu et à quel tarif ? | Q17 | ✅ oui |

---

## 6. Ambiguïtés traitées et statut

| # | Formulation / Sujet | Source | Statut & Résolution |
|---|---|---|---|
| AMB-07 | Modification de réservation | Q03 | ✅ **Levée :** Réservée exclusivement à l'administrateur, strictement limitée à la diminution du nombre de passagers (annulation partielle de places), sans report de date ni ajout. |
| AMB-08 | Privatisation au départ de Saint-Leu | Q10 / Q17 | ✅ **Levée :** Autorisée sur le Tikap (12 places) au même tarif forfaitaire qu'à Saint-Gilles (600 €). |
| AMB-09 | Plages horaires de privatisation | Q07 | ✅ **Levée :** Matin 7h–12h ou après-midi dès 14h. |
| AMB-10 | Rôle de l'annulation | Q01 | ✅ **Levée :** Pas d'annulation par le client ; annulation exécutée par l'administrateur dans le back-office. |
| AMB-11 | Cible du SMS d'annulation | Q01 | ✅ **Levée :** SMS d'information envoyé au client pour notifier l'annulation de sa réservation. |
| AMB-12 | Application du supplément de +10 € | Q09 / Q17 | ✅ **Levée :** S'applique uniquement aux tarifs individuels par personne (baleines et dauphins), pas au forfait de privatisation fixe (600 €). |
| AMB-13 | Disponibilité de la flotte le mardi/jeudi | Q13 | ✅ **Levée :** Pas de Tikap à 07h et 10h le mar/jeu à Saint-Gilles (capacité réduite à 24 places sur Grand Bleu). |

---

## 7. Contraintes évoquées

| # | Contrainte | Source | Nature |
|---|---|---|---|
| C-25 | Deuxième point de départ **Saint-Leu**, le mardi et le jeudi à 9h, **Tikap uniquement** (12 places). | Q08 / Q10 / Q11 | Métier / Logistique |
| C-26 | Supplément **+ 10 € / personne** pour les billets individuels au départ de Saint-Leu (forfait privatisation inchangé à 600 €). | Q09 / Q17 | Tarifaire |
| C-27 | **Pas de Tikap à 07h et 10h le mardi et le jeudi à Saint-Gilles** (jauge max 07h et 10h = 24 places avec Grand Bleu seul). | Q13 | Logistique / Capacité |
| C-28 | **Choix du lieu de départ** par le client sur l'interface publique. | Q15 | Fonctionnelle |
| C-29 | **Affichage d'informations spécifiques au lieu** dans l'interface (adresses, horaires). | Q16 | Ergonomie |
| C-30 | **Naturaliste unique** affecté selon les réservations. | Q14 | Ressource / Physique |
| C-31 | **Annulation totale et modification à la baisse réservées exclusivement à l'administrateur** (avec notification SMS envoyée au client lors d'une annulation). | Q01 / Q02 / Q03 | Périmètre / Sécurité |
| C-32 | Privatisation possible **matin (7 h–12 h)** et **après-midi (dès 14 h)** à Saint-Gilles et à Saint-Leu. | Q06 / Q07 / Q17 | Métier |

---

## 8. Questions à poser au prochain entretien

| N° | Question | Réponse |
|---|---|---|
| 1 | Quel est le délai limite de notification d'annulation à respecter vis-à-vis du client ? | |
| 2 | Quel prestataire SMS (Twilio, OVH SMS, SMS Factor...) est privilégié pour l'envoi des notifications ? | |
| 3 | Dans quel ordre se fait les choix du client concernant le lieu, la date et le type de sortie ? | |

---

## 9. Ce que nous n'avons pas abordé

- Prestataire d'envoi SMS et coûts associés aux notifications transactionnelles.
- Disponibilité effective et hébergement du nom de domaine **tibaleine.re**.
- Points toujours ouverts des CR précédents : textes CGV / mentions légales, RGPD, délais de mise en service et maintenance.
