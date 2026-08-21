# Compte rendu d'entretien n° 4

**Date :** 14/08/2026
**Durée :** 20 minutes
**Interlocuteur :** le commanditaire (Ti'Baleine)
**Présents pour l'équipe :** Thomas, Loïc, Benjamin et Ivan

Nouvelle demande client : ajout d'un mécanisme d'**alerte de pré-annulation**
envoyée la veille au soir aux clients d'un ou plusieurs créneaux, avec impact
sur l'affichage des disponibilités et sur la politique de remboursement.

---

## 1. Ce que le client a dit

Ses mots, pas les vôtres. Citer quand la formulation est ambiguë — c'est
précisément l'ambiguïté qu'il faudra lever.

- Souhait de pouvoir envoyer un message la veille au soir à 18 h pour avertir
  d'une éventuelle annulation, par SMS ou email.
- Le motif de l'alerte doit être personnalisable.
- Après l'envoi de l'alerte sur un ou plusieurs créneaux, si des places sont
  toujours disponibles, une mention doit s'afficher sur les créneaux à
  réserver.
- L'alerte doit être multilingue.
- Possibilité d'envoyer l'alerte sur plusieurs créneaux d'un coup.
- Si l'annulation est effective, un remboursement à 100 % est effectué.
- Si le client réservataire annule « par peur » suite à l'alerte, il est
  également remboursé à 100 %.

## 2. Questions posées et réponses obtenues

Le client ne répond qu'à ce qu'on lui demande. Ce tableau est donc aussi la trace
de ce que vous n'avez **pas** demandé.

**Chaque question reçoit un identifiant `Qnn`.** C'est lui que citeront les
exigences du cahier des charges : `CR-04/Q07` désigne la question 7 de ce
compte rendu. La numérotation est définitive — on n'insère pas, on ajoute à la
suite.

| ID | Question posée | Réponse |
|---|---|---|
| Q01 | Souhaitez-vous pouvoir envoyer une alerte prévenant d'une possible annulation avant le départ ? | Oui, la veille au soir à 18 h, par SMS ou email. |
| Q02 | Quels canaux utiliser pour l'envoi de cette alerte ? | SMS ou email. |
| Q03 | Faut-il un motif personnalisable associé à l'alerte ? | Oui, le motif doit être personnalisable. |
| Q04 | L'alerte peut-elle concerner plusieurs créneaux simultanément ? | Oui, envoi possible sur plusieurs créneaux d'un coup. |
| Q05 | Après l'envoi de l'alerte, que doit afficher le site si des places restent disponibles sur le(s) créneau(x) concerné(s) ? | Une mention doit s'afficher sur le(s) créneau(x) concerné(s), toujours ouvert(s) à la réservation. |
| Q06 | L'alerte doit-elle être disponible dans toutes les langues de l'interface ? | Oui, l'alerte doit être multilingue. |
| Q07 | Si l'annulation est confirmée après l'envoi de l'alerte, quel remboursement s'applique au client ? | Remboursement à 100 %. |
| Q08 | Si un client réservataire annule par anticipation (« par peur ») après réception de l'alerte, sans annulation effective du créneau, quel remboursement s'applique ? | Remboursement à 100 % également. |

Une question posée et **restée sans réponse** figure quand même ici, avec
« sans réponse » : c'est une trace, et elle sert au §8.

## 3. Ce que nous avons compris

Reformulation en langage métier. À relire au client au prochain passage : s'il
répond « non, pas tout à fait », la compréhension n'est pas acquise.

### Alerte de pré-annulation

Un nouveau mécanisme est demandé : l'administrateur peut envoyer, **la veille
au soir à 18 h**, une **alerte de pré-annulation** aux clients concernés par
un ou plusieurs créneaux, par **SMS ou email**. Cette alerte porte un **motif
personnalisable** (météo pressentie, panne, etc.) saisi par l'administrateur,
et peut viser **plusieurs créneaux à la fois** en un seul envoi.

L'alerte doit être **multilingue**, cohérente avec les langues déjà proposées
sur l'interface publique (FR/EN — cf. RM-30).

### Impact sur l'affichage des disponibilités

Si, après l'envoi de l'alerte, des places restent disponibles sur le ou les
créneaux concernés, une **mention spécifique** doit apparaître sur ces
créneaux dans l'interface de réservation, afin d'informer les nouveaux
visiteurs que le créneau reste ouvert à la vente malgré l'alerte envoyée aux
clients déjà inscrits.

### Politique de remboursement liée à l'alerte

Deux cas de figure sont désormais couverts par un remboursement intégral,
en dérogation au barème standard d'annulation client (RM-07/RM-08/RM-09) :

| Situation | Remboursement |
|---|---|
| Annulation effective du créneau après l'alerte | 100 % |
| Annulation par le client réservataire « par peur », suite à l'alerte, sans annulation du créneau | 100 % |

## 4. Parties prenantes identifiées

| Personne / rôle | Ce qu'elle fait | Comment on l'a découverte |
|---|---|---|

## 5. Règles métier découvertes

| # | Règle | Formulation exacte du client | Source | Sûre ? |
|---|---|---|---|---|
| RM-44 | Une alerte de pré-annulation peut être envoyée la veille au soir à 18 h, par SMS ou email. | « Avoir la possibilité d'envoyer un message la veille au soir à 18 h pour avertir d'une éventuelle annulation » | Q01 | ✅ oui |
| RM-45 | Le motif associé à l'alerte est personnalisable par l'administrateur. | « Mettre un motif personnalisable à l'alerte » | Q03 | ✅ oui |
| RM-46 | Une alerte peut être envoyée simultanément sur plusieurs créneaux. | « Possibilité d'envoyer sur plusieurs créneaux d'un coup » | Q04 | ✅ oui |
| RM-47 | Si des places restent disponibles après l'envoi de l'alerte, une mention s'affiche sur le(s) créneau(x) concerné(s) côté réservation en ligne. | « Si des places sont toujours dispo, on affiche une mention sur les créneaux à réserver » | Q05 | ✅ oui |
| RM-48 | L'alerte de pré-annulation est disponible dans toutes les langues de l'interface. | « L'alerte doit être multilingue » | Q06 | ✅ oui |
| RM-49 | Si l'annulation est effective suite à l'alerte, le client est remboursé à 100 %, quel que soit le délai avant le départ. | « Si l'annulation est effective un remboursement à 100 % est effectué » | Q07 | ✅ oui |
| RM-50 | Si le client réservataire annule « par peur » suite à l'alerte (sans annulation du créneau lui-même), il est également remboursé à 100 %. | « Si le client réservataire annule de peur, 100 % est remboursé également » | Q08 | ✅ oui |

## 6. Ambiguïtés détectées

Ce que le client a dit et qui peut se comprendre de plusieurs façons. Une
ambiguïté détectée mais non levée reste une ambiguïté : elle va au §8.

| # | Formulation | Source | Lectures possibles | Levée ? |
|---|---|---|---|---|
| AMB-14 | « Motif personnalisable » | Q03 | (a) Texte libre saisi par l'administrateur à chaque envoi d'alerte ; (b) Liste de motifs prédéfinis, configurable mais choisie dans un menu au moment de l'envoi. | ❌ non |
| AMB-15 | Statut du créneau en cas d'annulation « par peur » | Q08 | (a) La place libérée est immédiatement remise en vente comme une annulation classique (cf. RM-32) ; (b) La place reste bloquée / non remise en vente car le créneau lui-même n'est pas annulé. | ❌ non |
| AMB-16 | Articulation entre l'alerte de pré-annulation (J-1, 18 h) et l'annulation météo (H-2, cf. RM-11) | Q01 | (a) Deux mécanismes distincts et cumulables (alerte préventive la veille, puis décision définitive à H-2) ; (b) L'alerte de 18 h remplace ou redéfinit le délai de décision météo existant. | ❌ non |

## 7. Contraintes évoquées

| # | Contrainte | Source | Nature |
|---|---|---|---|
| C-33 | L'alerte de pré-annulation doit pouvoir être envoyée **la veille au soir à 18 h**, par SMS ou email. | Q01 / Q02 | Métier / Opérationnelle |
| C-34 | L'alerte doit supporter un **envoi groupé sur plusieurs créneaux**. | Q04 | Fonctionnelle |
| C-35 | L'alerte doit être **multilingue**, alignée sur les langues de l'interface. | Q06 | Métier |
| C-36 | Remboursement **à 100 %** dans les deux cas liés à l'alerte (annulation effective ou annulation « par peur » du client) — dérogation au barème standard (RM-07/08/09). | Q07 / Q08 | Métier / Financière |

## 8. Questions à poser au prochain entretien

Formulées, pas juste évoquées. Priorisées : le prochain passage est court.

| N° | Question | Réponse |
|---|---|---|
| 1 | Le motif de l'alerte est-il un texte libre saisi à chaque envoi, ou une liste de motifs prédéfinis configurable ? | |
| 2 | En cas d'annulation « par peur » suite à l'alerte, la place libérée est-elle immédiatement remise en vente comme une annulation classique ? | |
| 3 | L'alerte de pré-annulation (J-1, 18 h) remplace-t-elle ou s'ajoute-t-elle au mécanisme d'annulation météo existant (décision à H-2, cf. RM-11) ? | |
| 4 | L'heure d'envoi (18 h la veille) est-elle fixe et non modifiable, ou configurable par l'administrateur ? | |
| 5 | Quel est le contenu exact attendu dans le message d'alerte (texte type, informations obligatoires) ? | |

## 9. Ce que nous n'avons pas abordé

Relire le brief initial et lister les sujets qu'il contient et que l'entretien n'a
pas touchés. C'est là que se cachent les découvertes tardives et coûteuses.

- Contenu exact et gabarit du message d'alerte (SMS / email).
- Prestataire d'envoi SMS et coûts associés (point resté ouvert depuis le CR n° 3).
- Disponibilité et hébergement du nom de domaine **tibaleine.re** (point resté ouvert depuis le CR n° 3).
- Textes CGV / mentions légales, conformité RGPD, budget, délais de mise en service et contrat de maintenance (points restés ouverts depuis les CR n° 1 et 2).
