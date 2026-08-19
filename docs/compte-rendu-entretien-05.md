# Compte rendu d'entretien n° 5

**Date :** 19/08/2026
**Durée :** 15 minutes
**Interlocuteur :** le commanditaire (Ti'Baleine)
**Présents pour l'équipe :** Thomas, Loïc, Benjamin et Ivan

Nouvelle demande client : passage d'un **paiement intégral en ligne** à un
**paiement en deux temps** (acompte puis solde), avec impact sur la politique
de remboursement.

---

## 1. Ce que le client a dit

Ses mots, pas les vôtres. Citer quand la formulation est ambiguë — c'est
précisément l'ambiguïté qu'il faudra lever.

- « Je souhaite qu'au lieu de payer en totalité sur le site, je veux qu'un
  acompte de 30 % soit payé et le reste par un lien envoyé automatiquement la
  veille de la sortie ou sur place en carte bancaire. »

## 2. Questions posées et réponses obtenues

Le client ne répond qu'à ce qu'on lui demande. Ce tableau est donc aussi la trace
de ce que vous n'avez **pas** demandé.

**Chaque question reçoit un identifiant `Qnn`.** C'est lui que citeront les
exigences du cahier des charges : `CR-05/Q01` désigne la question 1 de ce
compte rendu. La numérotation est définitive — on n'insère pas, on ajoute à la
suite.

| ID | Question posée | Réponse |
|---|---|---|
| Q01 | Comment se déroule le remboursement dans ce nouveau modèle de paiement en deux temps ? | Rien ne change, si ce n'est que le pourcentage de remboursement s'applique désormais au montant déjà payé plutôt qu'au montant total de la réservation. |
| Q02 | Le taux d'acompte de 30 % s'applique-t-il aussi aux privatisations ? | Non, l'acompte pour les privatisations est de 50 % de la réservation. |
| Q03 | Pour une réservation le jour même, la personne paie-t-elle toujours un acompte ? Si oui, doit-on lui envoyer un lien ? | Un acompte reste toujours dû. En revanche, la personne devra payer le solde sur place : pas d'envoi de lien dans ce cas. |

Une question posée et **restée sans réponse** figure quand même ici, avec
« sans réponse » : c'est une trace, et elle sert au §8.

## 3. Ce que nous avons compris

Reformulation en langage métier. À relire au client au prochain passage : s'il
répond « non, pas tout à fait », la compréhension n'est pas acquise.

### Paiement en deux temps (acompte / solde)

Le client souhaite remplacer le paiement intégral en ligne au moment de la
réservation (règle actuelle, cf. RM-05) par un paiement scindé :

- un **acompte de 30 %** du montant de la réservation, payé en ligne au moment
  de la réservation ;
- un **solde de 70 %**, réglé soit via un **lien de paiement envoyé
  automatiquement la veille de la sortie**, soit **sur place, par carte
  bancaire**.

Ce taux d'acompte n'est pas uniforme : pour les sorties en **privatisation**,
le client fixe l'acompte à **50 %** (et non 30 %), le solde restant réglé selon
les mêmes deux canaux (lien automatique la veille ou CB sur place).

Cette demande remet directement en cause RM-05 (« paiement intégral et
exclusivement en ligne au moment de la réservation ») : elle devra être
révisée ou remplacée dans le cahier des charges.

Cas particulier des **réservations effectuées le jour même** de la sortie :
l'acompte reste dû comme dans le cas général, mais le solde est réglé
**exclusivement sur place**, faute de délai suffisant pour l'envoi automatique
d'un lien la veille — aucun lien n'est donc envoyé dans ce cas. Ceci lève une
partie de l'ambiguïté AMB-18 pour ce cas précis, sans trancher le cas général
des réservations faites à l'avance.

### Politique de remboursement inchangée dans sa structure, modifiée dans son assiette

Le client confirme que le barème de remboursement existant (RM-07/RM-08/RM-09
— 100 % / 75 % / 50 % selon le délai avant le départ) reste applicable tel
quel. Seule change l'**assiette** du remboursement : le pourcentage s'applique
désormais au **montant déjà payé** par le client au moment de l'annulation
(par exemple le seul acompte, si le solde n'a pas encore été réglé), et non
plus systématiquement au montant total de la réservation.

## 4. Parties prenantes identifiées

| Personne / rôle | Ce qu'elle fait | Comment on l'a découverte |
|---|---|---|

## 5. Règles métier découvertes

| # | Règle | Formulation exacte du client | Source | Sûre ? |
|---|---|---|---|---|
| RM-51 | Le paiement de la réservation se fait en deux temps : un acompte réglé en ligne au moment de la réservation (30 % en règle générale, cf. RM-53 pour les privatisations), puis un solde réglé via un lien de paiement envoyé automatiquement la veille de la sortie, ou sur place par carte bancaire. | « Un acompte de 30 % soit payé et le reste par un lien envoyé automatiquement la veille de la sortie ou sur place en carte bancaire » | — | ✅ oui |
| RM-52 | En cas d'annulation, le pourcentage de remboursement du barème (RM-07/RM-08/RM-09) s'applique au montant déjà payé par le client, et non au montant total de la réservation. | « Le pourcentage de remboursement s'appliquera au montant déjà payé plutôt qu'au montant total de la réservation » | Q01 | ✅ oui |
| RM-53 | Pour les sorties en privatisation, le taux d'acompte est de 50 % (et non 30 %) ; le solde suit les mêmes modalités que le régime général (RM-51). | « Acompte de 50 % de la réservation pour les privatisations » | Q02 | ✅ oui |
| RM-54 | Pour une réservation effectuée le jour même de la sortie, l'acompte reste dû, mais le solde est réglé exclusivement sur place ; aucun lien de paiement n'est envoyé. | « Toujours un acompte à payer mais la personne devra payer le solde sur place donc pas d'envoi de lien » | Q03 | ✅ oui |

## 6. Ambiguïtés détectées

Ce que le client a dit et qui peut se comprendre de plusieurs façons. Une
ambiguïté détectée mais non levée reste une ambiguïté : elle va au §8.

| # | Formulation | Source | Lectures possibles | Levée ? |
|---|---|---|---|---|
| AMB-17 | « Un lien envoyé automatiquement la veille de la sortie » | §1 | (a) Envoi à heure fixe, éventuellement aligné sur l'heure déjà retenue pour l'alerte de pré-annulation (18 h, cf. RM-44) ; (b) Heure distincte, non encore définie. | ❌ non |
| AMB-18 | « Ou sur place en carte bancaire » | §1 | (a) Choix laissé au client dès la réservation entre paiement du solde par lien ou sur place ; (b) Le paiement sur place est un mode de secours si le solde n'a pas été réglé via le lien avant le départ. | ⚠️ partiellement — tranché pour les réservations le jour même (RM-54 : sur place obligatoire, pas de lien) ; non tranché pour les réservations faites à l'avance |

## 7. Contraintes évoquées

| # | Contrainte | Source | Nature |
|---|---|---|---|
| C-37 | Le paiement de la réservation doit être scindé en un **acompte de 30 %** en ligne et un **solde de 70 %** réglé par lien automatique ou sur place en CB. | §1 | Métier / Financière |
| C-38 | Le barème de remboursement (RM-07/08/09) doit s'appliquer au **montant déjà payé**, et non plus au montant total de la réservation. | Q01 | Métier / Financière |
| C-39 | Le taux d'acompte diffère selon le type de sortie : **30 %** en régime général, **50 %** pour les privatisations. | Q02 | Métier / Financière |
| C-40 | Pour une réservation le jour même, le solde doit être payé **exclusivement sur place** ; le système ne doit **pas** envoyer de lien de paiement dans ce cas. | Q03 | Fonctionnelle |

## 8. Questions à poser au prochain entretien

Formulées, pas juste évoquées. Priorisées : le prochain passage est court.

| N° | Question | Réponse |
|---|---|---|
| 1 | Le lien de paiement du solde est-il envoyé à une heure précise la veille (par exemple 18 h, comme pour l'alerte de pré-annulation) ? | |
| 2 | Pour une réservation faite à l'avance (hors jour même, déjà tranché par RM-54), le choix du mode de paiement du solde (lien automatique ou CB sur place) est-il laissé au client, ou le paiement sur place n'intervient-il qu'en secours si le lien n'a pas été utilisé ? | |
| 3 | Que se passe-t-il si le solde n'est réglé ni via le lien, ni sur place, avant le départ (embarquement refusé, relance, autre) ? | |
| 4 | Ce nouveau mode de paiement en deux temps remplace-t-il totalement le paiement intégral en ligne (RM-05), ou les deux doivent-ils cohabiter au choix du client ? | |

## 9. Ce que nous n'avons pas abordé

Relire le brief initial et lister les sujets qu'il contient et que l'entretien n'a
pas touchés. C'est là que se cachent les découvertes tardives et coûteuses.

- Impact du paiement en deux temps sur la facturation (une facture unique après
  paiement du solde, ou deux documents distincts pour l'acompte et le solde).
- Articulation entre le solde impayé et l'alerte de pré-annulation (CR-04) :
  que devient un solde non réglé si le créneau est annulé côté prestataire.
- Frais ou pénalités éventuels en l'absence de paiement du solde avant le départ.
- Contenu exact et gabarit du lien/message de paiement du solde.
- Prestataire d'envoi SMS et coûts associés (point resté ouvert depuis le CR n° 3).
- Disponibilité et hébergement du nom de domaine **tibaleine.re** (point resté ouvert depuis le CR n° 3).
- Textes CGV / mentions légales, conformité RGPD, budget, délais de mise en service et contrat de maintenance (points restés ouverts depuis les CR n° 1 et 2).
