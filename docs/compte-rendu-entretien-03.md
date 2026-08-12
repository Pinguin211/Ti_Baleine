# Compte rendu d'entretien n° 3

**Date :** … *(à compléter)*
**Durée :** … *(à compléter)*
**Interlocuteur :** le commanditaire (Ti'Baleine)
**Présents pour l'équipe :** Thomas, Loïc, Benjamin et Ivan

Entretien d'évolution : le client introduit de nouvelles demandes fonctionnelles
(annulation et modification de réservation en ligne) et une évolution
d'exploitation majeure — un **second point de départ à Saint-Leu**, avec jours,
horaires et tarifs propres. Objectif : tracer ces changements et mesurer leur
impact sur le périmètre déjà arrêté aux CR n° 1 et n° 2.

---

## 1. Ce que le client a dit

> **Note :** les points ci-dessous sont les **notes prises pendant l'entretien**
> (reformulées par l'équipe), et non des citations littérales du client. Ils
> restent à revalider avec lui avant de figer une exigence.

- Annulation : oui, avec notification par SMS.
- Si le client annule : possibilité de libérer le créneau sur l'app.
- Modification d'une réservation si besoin (tailles de groupes, etc.).
- Pas de budget fixé.
- Privatisations possibles le matin (7 h – 12 h) ou l'après-midi (14 h -).
- Depuis cette année, certains départs se font depuis Saint-Leu : jours, horaires et prix différents (+ 10 € / personne).
- Saint-Leu : Tikap uniquement. Mardi et jeudi à Saint-Leu, le reste à Saint-Gilles.
- Départ à 9 h de Saint-Leu ; ensuite le bateau repart se positionner à Saint-Gilles.
- Emplacement du naturaliste : dépend des réservations.
- Choix du lieu sur l'app ; informations du lieu à afficher.

Citation littérale du client (choix du lieu de départ) :

> « En fonction du nombre de sorties baleine, je décide si la sortie est à
> St Gilles ou St Leu. Je dirais aux gens s'ils sortent à St Gilles ou St Leu.
> Je fais le choix la veille. »

> ⚠️ Cette citation **contredit** la note « choix du lieu sur l'app » : c'est
> l'**entreprise** qui affecte le lieu la veille, pas le client qui le choisit
> librement. Voir AMB-13 (§6) et l'impact sur RM-38 / RM-41 (§5).

## 2. Questions posées et réponses obtenues

Le client ne répond qu'à ce qu'on lui demande. Ce tableau est donc aussi la trace
de ce que vous n'avez **pas** demandé.

**Chaque question reçoit un identifiant `Qnn`.** C'est lui que citeront les
exigences du cahier des charges : `CR-03/Q07` désigne la question 7 de ce
compte rendu. La numérotation est définitive — on n'insère pas, on ajoute à la
suite.

Questions issues des nouvelles demandes formulées lors de cet entretien.

| ID | Question posée | Réponse |
|---|---|---|
| Q01 | L'annulation en ligne par le client est-elle désormais possible, et avec quelle notification ? | Oui : l'annulation par le client est désormais possible, avec notification par **SMS**. |
| Q02 | Que devient le créneau lorsqu'un client annule ? | La place est **libérée** automatiquement sur l'application (le créneau se rouvre à la réservation). |
| Q03 | Une réservation existante doit-elle pouvoir être modifiée, et par qui ? | Oui : possibilité de **modifier une réservation** si besoin (ex. taille du groupe / répartition adultes-enfants), **uniquement par l'administrateur** (le client ne modifie pas lui-même). |
| Q04 | Quel nom de domaine est envisagé pour la plateforme ? | Piste : **tibaleine.re** *(à confirmer et vérifier la disponibilité)*. |
| Q05 | Quel budget est alloué au projet ? | **Pas de budget fixé** à ce stade. |
| Q06 | Les privatisations peuvent-elles avoir lieu le matin comme l'après-midi ? | Oui : privatisation possible le **matin** ou l'**après-midi**. |
| Q07 | Quelles sont les plages horaires des demi-journées de privatisation ? | Matin : **7 h – 12 h**. Après-midi : **14 h – ** *(heure de fin à préciser)*. |
| Q08 | Existe-t-il désormais un second point de départ ? | Oui : depuis cette année, certains départs se font depuis **Saint-Leu** (en plus de **Saint-Gilles**), avec jours, horaires et tarifs différents. |
| Q09 | Quel est l'écart tarifaire pour les départs de Saint-Leu ? | **+ 10 € par personne** par rapport à Saint-Gilles. |
| Q10 | Quels bateaux opèrent depuis Saint-Leu ? | Uniquement le **Tikap** (12 places). |
| Q11 | Quels jours les départs ont-ils lieu depuis Saint-Leu ? | Le **mardi** et le **jeudi** depuis Saint-Leu ; le reste de la semaine depuis Saint-Gilles. |
| Q12 | Les types de sortie diffèrent-ils à Saint-Leu ? | Non : **mêmes types de sortie** qu'à Saint-Gilles. |
| Q13 | Quels sont les horaires des départs de Saint-Leu ? | **Départ à 9 h** de Saint-Leu ; après ce créneau, le bateau **repart se positionner à Saint-Gilles**. |
| Q14 | Le naturaliste est-il affecté à un lieu fixe ? | Non : l'**emplacement du naturaliste dépend des réservations**. |
| Q15 | Le client choisit-il le lieu de départ lors de la réservation ? | Oui : le **choix du lieu** (Saint-Gilles / Saint-Leu) se fait sur l'application. |
| Q16 | Quelles informations liées au lieu faut-il afficher au client ? | Afficher la disponibilité selon le lieu, notamment : **départ à 9 h de Saint-Leu** (le bateau repart ensuite se positionner à Saint-Gilles). |
| Q17 | Les privatisations sont-elles également possibles au départ de Saint-Leu ? | **Sans réponse** — question ouverte (Saint-Leu n'opère que le Tikap). Voir §8. |

Une question posée et **restée sans réponse** figure quand même ici, avec
« sans réponse » : c'est une trace, et elle sert au §8.

## 3. Ce que nous avons compris

Reformulation en langage métier. À relire au client au prochain passage : s'il
répond « non, pas tout à fait », la compréhension n'est pas acquise.

> ⚠️ **Changement de périmètre.** Cet entretien revient sur des décisions arrêtées
> aux CR n° 1 et n° 2 : l'**annulation en ligne** était explicitement exclue
> (CDC §2.2, CR-02/Q07) et devient possible ; la **modification de réservation**
> et l'ouverture d'un **second point de départ** sont nouvelles. Ces évolutions
> doivent être reportées dans `docs/impact-CR-001.md` avant d'être intégrées au
> cahier des charges.

### Annulation et modification en ligne (évolution)

Le client peut désormais **annuler sa réservation en ligne**, ce qui déclenche
une **notification SMS** et **libère automatiquement la place** sur le créneau
concerné. Une réservation peut également être **modifiée** en cas de besoin
(taille du groupe, répartition adultes/enfants), mais **uniquement par
l'administrateur** — le client n'effectue pas lui-même les modifications. Le traitement financier du
remboursement reste, sauf précision contraire, géré hors système par l'entreprise
(cf. CR-02/Q02) — l'articulation avec le barème d'annulation reste à confirmer.

### Nouveau point de départ : Saint-Leu

Depuis cette année, l'exploitation s'étend sur **deux points de départ** :

- **Saint-Gilles** — site historique, toute la flotte, le reste de la semaine.
- **Saint-Leu** — **le mardi et le jeudi**, **Tikap uniquement** (12 places),
  **mêmes types de sortie**, **départ à 9 h** ; après ce créneau, le bateau
  **repart se positionner à Saint-Gilles** pour les créneaux suivants, avec un
  **supplément de + 10 € par personne**.

Le **naturaliste** étant une ressource unique, son affectation à l'un ou l'autre
site **dépend des réservations** du jour.

### Choix et affichage du lieu

Le **lieu de départ est choisi par le client sur l'application**. L'interface doit
**afficher les informations propres au lieu** (jours d'ouverture, horaire de
départ, repositionnement du bateau Saint-Leu → Saint-Gilles après le créneau de
9 h, supplément tarifaire).

### Privatisations en demi-journée

La privatisation est proposée en **demi-journée**, **matin (7 h – 12 h)** ou
**après-midi (14 h – …)**. La possibilité d'une privatisation au départ de
Saint-Leu n'est pas tranchée.

### Domaine et budget

Nom de domaine pressenti : **tibaleine.re** (à valider). **Aucun budget** n'est
fixé à ce stade.

## 4. Parties prenantes identifiées

| Personne / rôle | Ce qu'elle fait | Comment on l'a découverte |
|---|---|---|
| Client final | Peut désormais **annuler et modifier** sa réservation en ligne, et **choisir son lieu de départ** | Q01 / Q03 / Q15 |
| Naturaliste | Ressource unique dont l'**affectation dépend du lieu et des réservations** | Q14 |

*(Aucune nouvelle personne : l'entretien fait évoluer le périmètre fonctionnel et
l'exploitation, pas l'organigramme.)*

## 5. Règles métier découvertes

| # | Règle | Question posée | Source | Sûre ? |
|---|---|---|---|---|
| RM-31 | L'annulation en ligne par le client est possible et déclenche une notification SMS. | L'annulation en ligne par le client est-elle désormais possible, et avec quelle notification ? | Q01 | ✅ oui |
| RM-32 | L'annulation d'un client libère automatiquement la place sur le créneau (réouverture à la réservation). | Que devient le créneau lorsqu'un client annule ? | Q02 | ✅ oui |
| RM-33 | Une réservation peut être modifiée après création (taille du groupe / répartition), **uniquement par l'administrateur** ; le client ne modifie pas lui-même. | Une réservation existante doit-elle pouvoir être modifiée, et par qui ? | Q03 | ✅ oui (délai de modification à préciser — voir §8) |
| RM-34 | La privatisation est proposée en demi-journée : matin 7 h–12 h ou après-midi 14 h–…. | Les privatisations peuvent-elles avoir lieu le matin comme l'après-midi, et sur quelles plages horaires ? | Q06 / Q07 | ⚠️ à confirmer (heure de fin après-midi) |
| RM-35 | L'exploitation comporte deux points de départ : Saint-Gilles et Saint-Leu, avec jours/horaires/tarifs propres. | Existe-t-il désormais un second point de départ ? | Q08 | ✅ oui |
| RM-36 | Les départs de Saint-Leu sont majorés de + 10 € par personne. | Quel est l'écart tarifaire pour les départs de Saint-Leu ? | Q09 | ✅ oui |
| RM-37 | À Saint-Leu, seul le Tikap (12 places) opère. | Quels bateaux opèrent depuis Saint-Leu ? | Q10 | ✅ oui |
| RM-38 | Saint-Leu opère le mardi et le jeudi ; Saint-Gilles le reste de la semaine. | Quels jours les départs ont-ils lieu depuis Saint-Leu ? | Q11 | ⚠️ à confirmer (jours peut-être indicatifs, l'entreprise arbitre la veille — voir AMB-13) |
| RM-39 | Les départs de Saint-Leu se font à 9 h ; après ce créneau, le bateau retourne se positionner à Saint-Gilles pour les créneaux suivants ; mêmes types de sortie. | Les types de sortie diffèrent-ils à Saint-Leu, et quels en sont les horaires ? | Q12 / Q13 | ✅ oui |
| RM-40 | L'affectation du naturaliste dépend des réservations (pas de lieu fixe). | Le naturaliste est-il affecté à un lieu fixe ? | Q14 | ✅ oui |
| RM-41 | Le lieu de départ (Saint-Gilles / Saint-Leu) est affecté par l'entreprise, décidé la veille selon le nombre de sorties baleine, puis communiqué au client. | Le client choisit-il le lieu de départ lors de la réservation ? | Q15 / citation §1 | ⚠️ à confirmer (contredit la note « choix sur l'app » — voir AMB-13) |
| RM-42 | L'application affiche les informations propres au lieu de départ. | Quelles informations liées au lieu faut-il afficher au client ? | Q16 | ✅ oui |

## 6. Ambiguïtés détectées

Ce que le client a dit et qui peut se comprendre de plusieurs façons. Une
ambiguïté détectée mais non levée reste une ambiguïté : elle va au §8.

| # | Formulation | Source | Lectures possibles | Levée ? |
|---|---|---|---|---|
| AMB-07 | « Modification d'une réservation si besoin » | Q03 | Résolu : les modifications sont faites **uniquement par l'administrateur** (le client ne modifie pas lui-même). Reste à préciser le délai limite de modification avant le départ (→ §8). | ✅ levée (délai en suspens) |
| AMB-08 | « Privatisations possible sur celui de Saint-Leu ? » | Q10 / Q17 | Saint-Leu n'opère que le Tikap : la privatisation y est-elle proposée, ou réservée à Saint-Gilles ? Ni confirmée ni exclue. | ❌ non |
| AMB-09 | « Après de 14 h à XX » | Q07 | Heure de fin de la privatisation d'après-midi non fixée. | ❌ non |
| AMB-10 | « Annulation : oui » vs CR n° 1 / n° 2 | Q01 | Revirement : l'annulation en ligne était exclue. La nouvelle règle applique-t-elle automatiquement le barème (7 j / 48 h) ou le remboursement reste-t-il manuel ? | ❌ non |
| AMB-11 | « Notifications par SMS » | Q01 | Le SMS d'annulation vise-t-il le client, l'administrateur, ou les deux ? | ❌ non |
| AMB-12 | « Tarif + 10 € / personne » (Saint-Leu) | Q09 | Le supplément s'applique-t-il aussi aux enfants et aux forfaits de privatisation, ou uniquement au tarif individuel ? | ❌ non |
| AMB-13 | Choix du lieu : « sur l'app » vs « je fais le choix la veille » | Q15 / citation §1 | (a) Le client choisit librement Saint-Gilles ou Saint-Leu lors de la réservation (RM-41 initial) ; (b) l'entreprise décide du lieu **la veille** selon le nombre de sorties baleine et informe les clients — le client ne choisit pas. Contradiction directe. Fragilise aussi RM-38 : les jours mardi/jeudi deviendraient **indicatifs**, non fixes. | ❌ non |

## 7. Contraintes évoquées

| # | Contrainte | Source | Nature |
|---|---|---|---|
| C-25 | Deuxième point de départ **Saint-Leu**, le mardi et le jeudi, **Tikap uniquement**. | Q08 / Q10 / Q11 | Métier / Logistique |
| C-26 | Supplément **+ 10 € / personne** pour les départs de Saint-Leu. | Q09 | Tarifaire |
| C-27 | Départ de Saint-Leu à **9 h** ; après ce créneau, le bateau (Tikap) **repart se positionner à Saint-Gilles** pour les créneaux suivants. | Q13 | Logistique |
| C-28 | **Choix du lieu de départ** obligatoire à la réservation. | Q15 | Fonctionnelle |
| C-29 | **Affichage d'informations spécifiques au lieu** dans l'interface. | Q16 | Fonctionnelle / Ergonomie |
| C-30 | **Naturaliste unique** réparti entre deux lieux selon les réservations. | Q14 | Ressource / Physique |
| C-31 | **Annulation et modification** de réservation désormais gérées **en ligne** (évolution du périmètre CR n° 1 / n° 2). | Q01 / Q02 / Q03 | Périmètre |
| C-32 | Privatisation possible **matin (7 h–12 h)** et **après-midi (14 h–…)**. | Q06 / Q07 | Métier |

## 8. Questions à poser au prochain entretien

Formulées, pas juste évoquées. Priorisées : le prochain passage est court.

| N° | Question | Réponse |
|---|---|---|
| 1 | La privatisation est-elle proposée au départ de Saint-Leu (Tikap uniquement) ? | |
| 2 | Quelle est l'heure de fin de la privatisation de l'après-midi (14 h – ?) ? | |
| 3 | Jusqu'à quel délai avant le départ l'administrateur peut-il modifier une réservation ? | |
| 4 | L'annulation en ligne applique-t-elle automatiquement le barème de remboursement (7 j / 48 h), ou le remboursement reste-t-il traité manuellement ? | |
| 5 | Le SMS d'annulation est-il envoyé au client, à l'administrateur, ou aux deux ? | |
| 6 | Le supplément de + 10 € / personne (Saint-Leu) s'applique-t-il aussi aux enfants et aux privatisations ? | |
| 7 | Le nom de domaine « tibaleine.re » est-il validé et sa disponibilité vérifiée ? | |
| 8 | Le lieu de départ est-il **choisi par le client** sur l'app, ou **affecté par l'entreprise la veille** (selon le nombre de sorties baleine) puis communiqué au client ? Dans ce dernier cas, les jours mardi/jeudi (Saint-Leu) sont-ils fixes ou seulement indicatifs, et comment le client est-il informé (SMS / e-mail) ? | |

Étape suivante prévue : consigner ces évolutions dans `docs/impact-CR-001.md`, puis
mettre à jour le cahier des charges (gestion de deux lieux de départ, annulation /
modification en ligne, privatisations en demi-journée).

## 9. Ce que nous n'avons pas abordé

Relire le brief initial et lister les sujets qu'il contient et que l'entretien n'a
pas touchés. C'est là que se cachent les découvertes tardives et coûteuses.

- Heure de fin de la privatisation de l'après-midi (« 14 h à XX »).
- Disponibilité effective du nom de domaine **tibaleine.re**.
- Barème de remboursement en cas d'annulation en ligne (automatique ou manuel).
- Gestion du **naturaliste unique** lorsqu'il est sollicité sur les deux lieux le même jour.
- Impact du repositionnement du bateau Saint-Leu → Saint-Gilles (après le créneau de 9 h) sur la logistique et les créneaux suivants.
- Privatisation au départ de Saint-Leu (possible / exclue).
- Points toujours ouverts des CR précédents : hébergement, CGV / mentions légales, RGPD, délais de mise en service et maintenance.
