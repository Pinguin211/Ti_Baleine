# Compte rendu d'entretien n° 2

**Date :** 17/08/2026
**Durée :** 25 minutes
**Interlocuteur :** le commanditaire (Ti'Baleine)
**Présents pour l'équipe :** Thomas, Loïc, Benjamin et Ivan

Validation des réponses au questionnaire de cadrage (§8 du CR n° 1) et
consolidation des exigences métier. Objectif : arrêter définitivement les choix
fonctionnels, la logique de gestion des réservations, la politique tarifaire par
tranche d'âge et le périmètre exact du back-office.

---

## 1. Ce que le client a dit

Ses mots, pas les vôtres. Citer quand la formulation est ambiguë — c'est
précisément l'ambiguïté qu'il faudra lever.

> « Minimum 6 réservations pour maintenir un créneau ; maximum 36 places. »
> « Pas de remboursement automatique : géré directement par l'entreprise. »
> « Un seul profil administrateur : l'entreprise. »
> « Tarif enfant de 4 à 11 ans ; à partir de 12 ans, tarif adulte. »
> « Le manifeste de bord reste hors système, rien d'informatique. »
> « Un site web. »
> « Pas nécessaire pour les nouvelles réservations. »
> « Réservation possible jusqu'à 2 h avant le départ. »
> « Les types de sortie sont séparés par créneau. »
> « Un seul naturaliste. »
> « Uniquement via le site. »

## 2. Questions posées et réponses obtenues

Le client ne répond qu'à ce qu'on lui demande. Ce tableau est donc aussi la trace
de ce que vous n'avez **pas** demandé.

**Chaque question reçoit un identifiant `Qnn`.** C'est lui que citeront les
exigences du cahier des charges : `CR-02/Q07` désigne la question 7 de ce
compte rendu. La numérotation est définitive — on n'insère pas, on ajoute à la
suite.

Ces 13 questions reprises du §8 du CR n° 1 ont été validées lors de cet entretien.

| ID | Question posée | Réponse |
|---|---|---|
| Q01 | Comment la répartition des passagers entre les deux bateaux d'un même créneau est-elle gérée, et quels sont les seuils de participants (min / max) ? | Gérée par l'entreprise selon le nombre de réservations par créneau et le type de sortie réservé. Minimum 6 réservations pour maintenir un créneau ; blocage des nouvelles réservations au-delà du maximum de 36 places (12 + 24). |
| Q02 | En cas d'annulation valide, le remboursement est-il automatique ou géré manuellement ? | Pas de remboursement automatique : géré directement par l'entreprise avec le client. |
| Q03 | Combien de profils accèdent au back-office et lesquels ? | Un seul profil administrateur : l'entreprise. |
| Q04 | Comment est structuré le tarif enfant (tranche d'âge) ? | Tarif enfant de 4 à 11 ans ; à partir de 12 ans, tarif adulte. |
| Q05 | Le système doit-il générer / gérer le manifeste des passagers ? | Non : le manifeste de bord reste hors système, rien d'informatique. |
| Q06 | Quel type d'application est attendu ? | Un site web (application / back-office sur ordinateur Desktop/PC). |
| Q07 | Faut-il notifier l'administrateur à chaque nouvelle réservation ? | Non, pas nécessaire pour les nouvelles réservations. |
| Q08 | Quel est le délai limite de réservation avant le départ ? | Réservation possible jusqu'à 2 h avant le départ au maximum. |
| Q09 | Peut-on proposer plusieurs types de sortie sur un même créneau ? | Non : les types de sortie sont séparés par créneau. |
| Q10 | Combien de naturalistes sont disponibles pour encadrer les sorties ? | Un seul naturaliste (contrainte de ressource physique). |
| Q11 | Un même bateau peut-il accueillir des sorties de types différents ? | Types de sortie strictement séparés par créneau et par embarcation. |
| Q12 | L'entreprise doit-elle pouvoir modifier les créneaux depuis le back-office ? | Oui, modification des créneaux possible directement dans l'interface admin. |
| Q13 | Par quels canaux les réservations sont-elles prises ? | Uniquement via le site web. |

Une question posée et **restée sans réponse** figure quand même ici, avec
« sans réponse » : c'est une trace, et elle sert au §8.

## 3. Ce que nous avons compris

Reformulation en langage métier. À relire au client au prochain passage : s'il
répond « non, pas tout à fait », la compréhension n'est pas acquise.

### Architecture et périmètre applicatif

L'application sera une **plateforme web dédiée**, optimisée pour un usage
Desktop/PC. Elle comprend un module de réservation public **bilingue
(Français / Anglais)** et un espace d'administration unique réservé à
l'entreprise. Aucun compte client n'est nécessaire : la réservation se fait en
saisissant les coordonnées essentielles (nom, e-mail, téléphone, répartition
adultes/enfants).

### Flotte, capacités et planning

La capacité globale cumulée est de **36 places max par créneau**, réparties sur
deux navires : Tikap (12 places) et Grand Bleu (24 places).

- **Seuil de maintien :** un créneau nécessite au moins **6 réservations**
  cumulées pour être maintenu.
- **Capacité maximale :** blocage automatique des réservations dès l'atteinte
  des 36 places sur un créneau.
- **Séparation des activités :** les activités (baleines, dauphins,
  privatisation) ne peuvent pas être mélangées sur un même créneau ni sur un
  même bateau.
- **Délai de réservation :** les réservations en ligne sont ouvertes jusqu'à
  **2 heures** avant le départ.
- **Ressources humaines :** l'exploitation s'appuie sur **1 seul naturaliste**,
  ce qui impose une contrainte d'encadrement sur les sorties simultanées.

### Structure tarifaire

La grille tarifaire est fixée selon la tranche d'âge exacte validée lors de cet
entretien :

| Catégorie | Tranche d'âge | Baleines | Dauphins |
|---|---|---|---|
| Enfant | 4 à 11 ans inclus | 40 € | 30 € |
| Adulte | À partir de 12 ans | 65 € | 50 € |
| Moins de 4 ans | — | Gratuit / sur demande préalable selon conditions de sécurité | idem |

Privatisations : forfait fixe — Tikap **600 €** / Grand Bleu **1 100 €** pour une
demi-journée (formule Sunset).

### Paiements et annulations

Le paiement est exigé à **100 % en ligne** lors de la commande par carte bancaire
via le contrat monétique direct.

Aucun remboursement n'est automatisé par l'application. En cas d'annulation
éligible (> 7 jours : 100 %, entre 7 j et 48 h : 75 %, < 48 h : 50 %), le
traitement financier est effectué **manuellement** par l'entreprise avec le
client.

L'administrateur reçoit des alertes par email/SMS **uniquement en cas
d'annulation** (les nouvelles réservations ne déclenchent pas de notification).

Le manifeste des passagers est **exclu du périmètre informatique** (géré
manuellement à bord sur papier / registre physique).

## 4. Parties prenantes identifiées

| Personne / rôle | Ce qu'elle fait | Comment on l'a découverte |
|---|---|---|
| Administrateur (l'entreprise) | Unique profil back-office : planning, créneaux, annulations, remboursements manuels | Q03 |
| Naturaliste | Encadre les sorties (ressource unique) | Q10 |
| Client final | Réserve uniquement via le site web, sans compte | Q06 / Q13 |

## 5. Règles métier découvertes

| # | Règle | Formulation exacte du client | Source | Sûre ? |
|---|---|---|---|---|
| RM-18 | Le seuil minimum pour maintenir un départ est fixe à 6 passagers payants. | « Minimum 6 réservations pour maintenir un créneau » | Q01 | ✅ oui |
| RM-19 | La jauge maximale absolue par créneau horaire est bridée à 36 places (12 + 24). | « Maximum 36 places » | Q01 | ✅ oui |
| RM-20 | Les flux de remboursement monétaire sont exclus de l'automation web et traités hors système par l'admin. | « Pas de remboursement automatique : géré directement par l'entreprise » | Q02 | ✅ oui |
| RM-21 | Le back-office ne comporte qu'un unique profil d'accès administrateur (pas de sous-comptes capitaines). | « Un seul profil administrateur : l'entreprise » | Q03 | ✅ oui |
| RM-22 | La tranche d'âge du tarif enfant est strictement définie de 4 ans à 11 ans révolus. | « Tarif enfant de 4 à 11 ans ; à partir de 12 ans, tarif adulte » | Q04 | ✅ oui |
| RM-23 | Le manifeste maritime réglementaire reste hors périmètre applicatif. | « Le manifeste de bord reste hors système, rien d'informatique » | Q05 | ✅ oui |
| RM-24 | Les réservations en ligne sont clôturées 2 heures avant le début du créneau. | « Réservation possible jusqu'à 2 h avant le départ » | Q08 | ✅ oui |
| RM-25 | Un même créneau horaire est dédié à une seule activité exclusive (pas de mixité de produits) ; idem par embarcation. | « Les types de sortie sont séparés par créneau » | Q09 / Q11 | ✅ oui |
| RM-26 | L'administrateur peut modifier la disponibilité et la configuration des créneaux depuis son interface. | — | Q12 | ✅ oui |
| RM-27 | Toutes les réservations directes grand public passent exclusivement par la plateforme web. | « Uniquement via le site » | Q13 | ✅ oui |
| RM-28 | Les nouvelles réservations ne déclenchent pas de notification admin ; seules les annulations le font. | « Pas nécessaire pour les nouvelles réservations » | Q07 | ✅ oui |
| RM-29 | Un seul naturaliste est disponible pour encadrer les sorties (contrainte de ressource). | « Un seul naturaliste » | Q10 | ✅ oui |
| RM-30 | L'application est une plateforme web standalone, usage Desktop/PC, bilingue FR/EN. | « Un site web » | Q06 | ✅ oui |

## 6. Ambiguïtés détectées

Ce que le client a dit et qui peut se comprendre de plusieurs façons. Une
ambiguïté détectée mais non levée reste une ambiguïté : elle va au §8.

Bilan du traitement des ambiguïtés du CR n° 1 (AMB-01 à AMB-06) :

| # | Formulation | Source | Lectures possibles / Résolution | Levée ? |
|---|---|---|---|---|
| AMB-01 | « Web » (site existant vs plateforme autonome) | CR-01/Q04 | Clarifié : application web standalone avec espace public de réservation et back-office Desktop. | ✅ levée |
| AMB-02 | Contraintes bancaires / taxes | CR-01/Q28 | Clarifié : paiement CB direct par contrat monétique bancaire unique, sans intermédiaire tiers. | ✅ levée |
| AMB-03 | Périmètre des notifications admin | CR-01 citation §1 | Clarifié : notification uniquement lors des annulations (pas à chaque nouvelle réservation). | ✅ levée |
| AMB-04 | Logique de répartition pour 25+ personnes | CR-01 citation §1 | Clarifié : répartition manuelle par l'admin entre Tikap (12) et Grand Bleu (24) dans la limite de 36 pers. | ✅ levée |
| AMB-05 | Transformation de sortie en mer (« sunset ») | CR-01 citation §1 | Clarifié : séparation stricte des types de sortie par créneau au niveau du système de réservation. | ✅ levée |
| AMB-06 | Gestion du multilinguisme (FR/EN) | CR-01/Q07 / Q08 | Clarifié : interface native bilingue FR/EN ; contenus de base fournis conjointement. | ✅ levée |

## 7. Contraintes évoquées

| # | Contrainte | Source | Nature |
|---|---|---|---|
| C-13 | Capacité max **36 places** par créneau (12 + 24) ; blocage automatique au-delà. | Q01 | Métier / Physique |
| C-14 | Seuil de maintien d'un créneau : **minimum 6 réservations**. | Q01 | Métier |
| C-15 | Aucun remboursement automatique : traitement **hors système** par l'entreprise. | Q02 | Opérationnelle |
| C-16 | Un seul profil back-office : **administrateur** (pas de rôles capitaine / vendeur). | Q03 | Technique / Organisationnelle |
| C-17 | Tarif enfant strictement **4–11 ans** ; adulte dès **12 ans**. | Q04 | Métier |
| C-18 | Manifeste passagers **hors périmètre** applicatif. | Q05 | Périmètre |
| C-19 | Clôture des réservations en ligne **2 h avant** le départ. | Q08 | Métier |
| C-20 | **Aucune mixité** de types de sortie sur un même créneau ni une même embarcation. | Q09 / Q11 | Métier |
| C-21 | Un seul **naturaliste** disponible (contrainte d'encadrement). | Q10 | Ressource / Physique |
| C-22 | Réservations **uniquement via le site web** (pas de canal téléphone / guichet dans le système). | Q13 | Métier |
| C-23 | Notifications admin **uniquement sur annulation**, pas sur nouvelle réservation. | Q07 | Opérationnelle |
| C-24 | Plateforme web **standalone** bilingue FR/EN, usage Desktop/PC. | Q06 | Technique |

## 8. Questions à poser au prochain entretien

Formulées, pas juste évoquées. Priorisées : le prochain passage est court.

Points de cadrage restants avant validation finale du cahier des charges :

| N° | Question | Réponse |
|---|---|---|
| 1 | Quel est le nom de domaine définitif retenu pour la plateforme ? | |
| 2 | Quel hébergeur / type de serveur (Desktop/Cloud) souhaitez-vous pour la mise en production ? | |
| 3 | Qui fournit et valide les textes des CGV et mentions légales à afficher au checkout ? | |
| 4 | Quelles cases à cocher obligatoires doivent apparaître lors de la réservation en ligne (CGV, décharge, newsletter…) ? | |
| 5 | Quelle durée de conservation des données personnelles (nom, e-mail, téléphone) doit être appliquée au titre du RGPD ? | |

Étape suivante prévue : rédaction et signature du Cahier des Charges
Fonctionnel et Technique (CCFT) définitif basé sur les CR n° 1 et n° 2.

## 9. Ce que nous n'avons pas abordé

Relire le brief initial et lister les sujets qu'il contient et que l'entretien n'a
pas touchés. C'est là que se cachent les découvertes tardives et coûteuses.

- Hébergement et nom de domaine définitifs
- Textes juridiques (CGV, mentions légales) et cases à cocher au checkout
- Conformité RGPD (durée de conservation des données collectées)
- Détail opérationnel du statut « moins de 4 ans » (gratuité vs demande préalable)
- Budget, délais de mise en service et contrat de maintenance (déjà ouverts au CR n° 1)
- Créneaux horaires de la privatisation : elle a lieu le plus souvent l'après-midi pour le sunset, mais la question de savoir si des privatisations sont également prises le matin n'a pas été abordée
