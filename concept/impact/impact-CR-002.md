# Analyse d'impact — CR-002

**Validation et consolidation suite à l'entretien n° 2 du 17/08/2026.**

**Demande du client :** Validation des 13 questions de cadrage (CR-01 §8), consolidation des règles de gestion (capacités 36 places, seuil 6 participants, tranches d'âge 4–11 ans, H-2), contrainte de ressource (1 seul naturaliste) et clarification du périmètre applicatif (pas de manifeste informatique, pas de remboursements automatisés, profil admin unique).
**Reçue le :** 17/08/2026 (Entretien n° 2, durée 25 min)
**Rédigée par :** Thomas, Loïc, Benjamin et Ivan

---

> **Interdiction de modifier le code avant que cette analyse soit complète.**
>
> La modification descend la chaîne dans cet ordre : cahier des charges → specs →
> UML → modèle de données → cas de test → tests → code. Commencer par le code,
> c'est perdre la trace de pourquoi il a changé — et c'est exactement ce que ce
> module cherche à vous faire éviter.

---

## 1. Ce que le client demande, reformulé

Le commanditaire confirme que la plateforme sera un **site web sur-mesure** (avec interface publique bilingue FR/EN responsive et back-office Desktop/PC) permettant la réservation et le paiement 100 % en ligne par carte bancaire, sans création de compte client, avec clôture automatique **2 heures avant le départ**.

La capacité maximale est bridée à **36 places par créneau** (Tikap 12 places + Grand Bleu 24 places), avec un **seuil minimum de 6 participants** pour maintenir une sortie. Chaque créneau et chaque navire sont strictement réservés à une **seule activité exclusive** (baleines, dauphins ou privatisation Sunset, sans mixité), l'activité baleines étant conditionnée par la présence du **naturaliste unique**.

La tarification distingue explicitement les adultes (dès 12 ans) et les enfants (**4 à 11 ans inclus**), les moins de 4 ans n'étant **pas admis à bord**.

Le périmètre est volontairement épuré : **aucun remboursement automatique** (gestion financière manuelle directe par l'entreprise), **aucun manifeste maritime informatisé** (registre physique sur papier à bord), un **profil administrateur unique** sans sous-comptes, et des notifications restreintes **uniquement aux annulations**.

---

## 2. Questions posées au client

| # | Question | Réponse |
|---|---|---|
| 1 | Comment la répartition des passagers entre les deux bateaux d'un même créneau est-elle gérée, et quels sont les seuils de participants (min / max) ? | Gérée par l'entreprise selon le nombre de réservations par créneau et le type de sortie réservé. Minimum 6 réservations pour maintenir un créneau ; blocage des nouvelles réservations au-delà du maximum de 36 places (12 + 24). |
| 2 | En cas d'annulation valide, le remboursement est-il automatique ou géré manuellement ? | Pas de remboursement automatique : géré directement par l'entreprise avec le client. |
| 3 | Combien de profils accèdent au back-office et lesquels ? | Un seul profil administrateur : l'entreprise. |
| 4 | Comment est structuré le tarif enfant (tranche d'âge) ? | Tarif enfant de 4 à 11 ans ; à partir de 12 ans, tarif adulte (moins de 4 ans non admis). |
| 5 | Le système doit-il générer / gérer le manifeste des passagers ? | Non : le manifeste de bord reste hors système, rien d'informatique. |
| 6 | Quel type d'application est attendu ? | Un site web (application / back-office sur ordinateur Desktop/PC). |
| 7 | Faut-il notifier l'administrateur à chaque nouvelle réservation ? | Non, pas nécessaire pour les nouvelles réservations (uniquement lors des annulations). |
| 8 | Quel est le délai limite de réservation avant le départ ? | Réservation possible jusqu'à 2 h avant le départ au maximum. |
| 9 | Peut-on proposer plusieurs types de sortie sur un même créneau ? | Non : les types de sortie sont séparés par créneau. |
| 10 | Combien de naturalistes sont disponibles pour encadrer les sorties ? | Un seul naturaliste (contrainte de ressource physique). |
| 11 | Un même bateau peut-il accueillir des sorties de types différents ? | Types de sortie strictement séparés par créneau et par embarcation. |
| 12 | L'entreprise doit-elle pouvoir modifier les créneaux depuis le back-office ? | Oui, modification des créneaux possible directement dans l'interface admin. |
| 13 | Par quels canaux les réservations sont-elles prises ? | Uniquement via le site web. |

---

## 3. Impact — cahier des charges

| Exigence | Impact | Action |
|---|---|---|
| REQ-001 *(Jauge et capacités)* | modifiée | Fixer le plafond absolu à 36 places par créneau horaire (12 + 24) et intégrer la règle du seuil de 6 personnes pour le maintien d'une sortie. |
| REQ-002 *(Mono-activité par créneau)* | modifiée | Interdire toute mixité de prestations (baleines / dauphins / sunset) sur un même créneau horaire et sur un même navire. |
| REQ-003 *(Tranches d'âge et tarification)* | modifiée | Définir précisément l'âge enfant (4 à 11 ans inclus) et adulte (≥ 12 ans). Exclure formellement la réservation pour les enfants de moins de 4 ans. |
| REQ-004 *(Clôture des réservations H-2)* | ajoutée | Clôturer automatiquement les réservations en ligne 2 heures avant l'heure de départ du créneau. |
| REQ-005 *(Remboursement automatisé)* | supprimée | Exclure les remboursements en ligne du périmètre fonctionnel du site (traitement manuel hors système par l'entreprise). |
| REQ-006 *(Manifeste passagers)* | supprimée | Exclure la génération du manifeste maritime du système informatique (gestion papier à bord). |
| REQ-007 *(Gestion multi-rôles back-office)* | supprimée | Supprimer les rôles capitaines / vendeurs ; conserver un unique profil administrateur entreprise pour ordinateur Desktop. |
| REQ-008 *(Notifications administrateur)* | modifiée | Supprimer l'envoi de notification admin lors d'une nouvelle réservation ; conserver l'alerte uniquement sur annulation. |
| REQ-009 *(Contrainte encadrement naturaliste)* | ajoutée | Prendre en compte la ressource unique (1 naturaliste) limitant l'activité baleines. |
| REQ-010 *(Langues de l'interface)* | modifiée | Fixer le multilinguisme initial au binôme Français / Anglais (FR / EN). |

---

## 4. Impact — spécifications

| Spécification | Impact | Ce qui change exactement |
|---|---|---|
| SPEC-RES-01 *(Tunnel de réservation client)* | modifiée | Ajout de la sélection par tranche d'âge (Adultes ≥ 12 ans, Enfants 4–11 ans), blocage des enfants < 4 ans, contrôle de jauge dynamique (max 36 places) et fermeture à H-2. |
| SPEC-RES-02 *(Sélection créneaux & activités)* | modifiée | Un créneau donné est strictement associé à un seul type d'activité (pas de réservation multi-activités sur le même horaire). |
| SPEC-PAY-01 *(Paiement en ligne CB)* | inchangée | Le paiement intégral (100 %) par carte bancaire avec émission de facture PDF automatique reste conforme au cadrage initial. |
| SPEC-REM-01 *(Workflow de remboursement)* | supprimée | Retrait complet du module de remboursement bancaire automatique. Les annulations sont notifiées à l'admin qui traite le financier hors outil. |
| SPEC-MANIF-01 *(Génération manifeste maritime)* | supprimée | Retrait complet du module de génération PDF / export capitainerie du manifeste de bord. |
| SPEC-ADM-01 *(Authentification & Rôles)* | modifiée | Remplacement de la matrice multi-rôles par une authentification administrateur unique adaptée à un usage sur PC de bureau. |
| SPEC-ADM-02 *(Planning & Supervision)* | modifiée | Affichage du planning avec jauges globales (12 / 24 / 36) et visualisation de l'état du seuil (6 passagers). Pas d'outil d'assignation automatisée de passagers par siège. |
| SPEC-NOTIF-01 *(Système d'alertes)* | modifiée | Filtrage des déclencheurs : désactivation des alertes pour les créations de commande, déclenchement conservé exclusivement sur annulation client. |

---

## 5. Impact — conception

| Artefact | Impact | Ce qui change |
|---|---|---|
| `uml/domain.puml` | modifié | Modélisation des classes : entité `Creneau` (horaire, type d'activité unique, statut ouvert/clos à H-2, capacité max 36), entité `Reservation` (quantité adultes, quantité enfants 4-11 ans, contact invité), suppression des entités `Manifeste` et `RemboursementAutomatique`. |
| `uml/sequences/` | modifié | Séquence de réservation directe sans compte client ; séquence d'annulation client simplifiée (alerte admin sans appel API de reversement bancaire). |
| MCD / MLD / MPD | modifié | Suppression de la table `Manifeste` ; suppression des statuts / transactions de remboursement automatique ; restriction de la table des utilisateurs à un compte administrateur unique ; ajout des contraintes de dates/horaires (clôture H-2) et des discriminants d'âge. |
| Architecture | modifiée | Simplification architecturale : Frontend public bilingue (FR/EN) + Back-office Desktop épuré + Passerelle paiement CB + Moteur de rendu Facture PDF. Retrait des connecteurs d'API de remboursement et d'exports complexes. |

Question à traiter explicitement : la demande introduit-elle un **état nouveau** ou une **donnée nouvelle** qui n'existaient pas dans le modèle ?
- **Oui (données nouvelles) :** Distinction explicite de la tranche d'âge enfant (4–11 ans) et adulte (≥ 12 ans) dans les lignes de réservation, horodatage de clôture H-2 par créneau, et contrainte d'activité exclusive par créneau.
- **Oui (suppressions de données) :** Retrait complet des tables et états liés au manifeste des passagers et aux transactions de remboursement automatisé.

---

## 6. Impact — tests

| Cas de test | Impact |
|---|---|
| CASE-RES-01 *(Réservation nominale avec adultes et enfants 4-11 ans)* | modifié |
| CASE-RES-02 *(Refus de réservation pour enfant de moins de 4 ans)* | à écrire *(nouveau)* |
| CASE-RES-03 *(Blocage de réservation au-delà de 36 places par créneau)* | à écrire *(nouveau)* |
| CASE-RES-04 *(Clôture automatique de réservation à H-2 du départ)* | à écrire *(nouveau)* |
| CASE-RES-05 *(Interdiction de mixité d'activités sur un même créneau)* | à écrire *(nouveau)* |
| CASE-PAY-01 *(Paiement 100% CB et génération automatique facture PDF)* | inchangé |
| CASE-REM-01 *(Remboursement bancaire automatisé)* | obsolète *(supprimé du périmètre)* |
| CASE-MANIF-01 *(Génération du manifeste maritime des passagers)* | obsolète *(supprimé du périmètre)* |
| CASE-NOTIF-01 *(Notification admin lors d'une nouvelle réservation)* | obsolète *(supprimé du périmètre)* |
| CASE-NOTIF-02 *(Notification admin lors d'une annulation client)* | à écrire *(modifié)* |

---

## 7. Impact — code

| Composant | Impact |
|---|---|
| `BookingEngine / ReservationService` | Implémenter le calcul de jauge max (36 places), la validation stricte des tranches d'âge (4–11 ans / ≥ 12 ans), la règle de clôture à H-2, et le verrouillage mono-activité par créneau. |
| `AdminDashboard / PlanningService` | Adapter l'affichage du planning journalier (vue 7h, 10h, 14h) avec suivi visuel du seuil des 6 passagers et du taux de remplissage (12/24/36 places). |
| `InvoiceService / PdfGenerator` | Générer la facture PDF instantanée avec ventilation Adultes / Enfants et TVA applicable. |
| `PaymentGateway` | Intégration de la passerelle de paiement CB pour l'encaissement direct (sans logique de reversement automatisé). |
| `NotificationService` | Restreindre les flux d'e-mail/SMS sortants aux confirmations/factures clients et aux alertes d'annulation destinées à l'administrateur. |

---

## 8. Effets de bord identifiés

Ce que la demande touche sans que le client l'ait envisagé :

- **Contrainte opérationnelle du naturaliste unique :** Si 2 bateaux sont affrétés sur un même créneau baleines (jusqu'à 36 passagers), l'entreprise doit organiser la navigation en flotte groupée ou limiter le départ à un seul navire si le naturaliste ne peut pas encadrer les deux embarcations simultanément.
- **Gestion du dispatch physique à quai :** Le système autorise jusqu'à 36 réservations sur un créneau sans assigner automatiquement les passagers au Tikap (12 places) ou au Grand Bleu (24 places). L'embarquement et la répartition physique incombent entièrement au personnel à quai.
- **Réservations de dernière minute (< 2h) :** Les passagers se présentant directement au ponton moins de 2h avant le départ ne peuvent pas être enregistrés via le site web ; leur encaissement et intégration à bord doivent se faire manuellement.
- **Remboursements hors système :** En cas d'annulation client, le site enregistre la libération des places et alerte l'admin, mais le virement/recrédit bancaire doit être initié manuellement par l'entreprise sur son interface bancaire.

---

## 9. Ce que nous ne ferons pas dans le temps restant

Assumé, et à confirmer lors des prochains points d'étape :

- Aucun développement de module de gestion ou d'export du manifeste de bord (conformité maritime gérée sur registre papier).
- Aucune intégration de flux de remboursement bancaire automatisé (Stripe/Bank API Refund) ni gestion d'avoirs virtuels.
- Aucun espace client avec compte, mot de passe ou historique de réservations (tunnel 100 % invité).
- Aucun système de permissions multi-utilisateurs (capitaines, billetterie guichet).
- Aucune synchronisation bidirectionnelle avec des calendriers tiers (Google Calendar, Outlook).
- Aucune application mobile native (focalisation sur plateforme web responsive et back-office Desktop).

---

## 10. Ordre d'exécution retenu

| # | Étape | Qui |
|---|---|---|
| 1 | Mise à jour du Cahier des Charges Fonctionnel (intégration des arbitrages du CR-02) | Thomas & Loïc |
| 2 | Mise à jour des spécifications détaillées (SPEC-RES, SPEC-ADM, SPEC-PAY) | Benjamin & Ivan |
| 3 | Harmonisation des modèles UML (`domain.puml`, diagrammes de séquence) | Thomas & Ivan |
| 4 | Mise à jour du MCD / MLD / MPD (suppression manifeste & remboursements, ajout contraintes 36 places et H-2) | Benjamin |
| 5 | Actualisation du plan de tests et écriture des cas de test (CASE-RES-02 à 05) | Loïc |
| 6 | Développement du moteur de réservation et des contrôles métier (36 places, 4-11 ans, H-2) | Toute l'équipe |
| 7 | Développement du back-office administrateur Desktop et de la génération de factures PDF | Toute l'équipe |
| 8 | Campagne de tests d'intégration, tests de non-régression et recette globale | Toute l'équipe |
