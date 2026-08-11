# Cahier des charges — Ti'Baleine

**Équipe :** Thomas, Loïc, Benjamin et Ivan | RageGit
**Version :** v2 — 11/08/2026
**Sources :** `compte-rendu-entretien-01.md`, `compte-rendu-entretien-02.md`

Ce document formalise le **problème compris**, pas la solution. Aucun nom de
technologie, aucun nom de framework, aucune structure de base de données ici.

---

## 1. Contexte

Ti'Baleine propose des sorties en mer à la journée : observation des baleines
et des dauphins, sorties « coucher de soleil » (Sunset), et privatisations de
navires. L'entreprise exploite deux bateaux, le **Tikap** (12 places) et le
**Grand Bleu** (24 places), sur un planning fixe toute l'année (trois créneaux
quotidiens à 7h, 10h et 14h).

Aujourd'hui, les réservations et leur suivi ne passent pas par un canal
100 % en ligne. Environ 60 % de la clientèle est étrangère, ce qui impose une
interface multilingue. L'entreprise souhaite se doter d'une plateforme web
sur-mesure pour moderniser la prise de commande, fiabiliser le suivi des
places disponibles, et simplifier son organisation au quotidien, sans
complexité inutile pour un usage non informaticien (*CR-01/Q01, CR-01/Q02*).

## 2. Problème

Ti'Baleine n'a pas de canal de réservation en ligne fiable pour gérer les
places limitées de ses deux bateaux sur des créneaux fixes, ce qui complique
le suivi du remplissage et l'accueil d'une clientèle majoritairement
étrangère. L'entreprise veut un outil sur-mesure — pas une solution SaaS
tierce — qui centralise réservation, paiement et facturation, tout en
laissant volontairement hors système les opérations qu'elle préfère garder en
contact humain direct (annulations, remboursements, manifeste passagers).

## 3. Objectifs

| # | Objectif | Comment on saura que c'est atteint |
|---|---|---|
| 1 | Ouvrir un canal de réservation 100 % en ligne | Un client peut réserver et payer une sortie de bout en bout sur le site, sans appel ni e-mail (*CR-01/Q01, CR-01/Q24*) |
| 2 | Offrir une interface multilingue (FR/EN) | Le parcours public complet (sélection, paiement, confirmation) est disponible en français et en anglais (*CR-01/Q07, CR-02/§3*) |
| 3 | Conserver une gestion simple et accessible pour l'entreprise | L'administrateur consulte le planning et le remplissage par créneau depuis un espace unique, sans formation poussée (*CR-02/Q03, CR-02/Q12*) |

## 4. Parties prenantes

| Partie prenante | Rôle | Ce qu'elle attend | Utilise l'application ? |
|---|---|---|---|
| Administrateur (Ti'Baleine) | Profil unique de back-office : consultation du planning, gestion des créneaux, suivi du remplissage | Un espace simple, épuré, sur ordinateur | oui |
| Client final (touriste ou local) | Réserve et paie une sortie en ligne, sans création de compte | Un parcours rapide, clair, dans sa langue | oui |
| Naturaliste | Encadre obligatoirement les sorties baleines (ressource unique) | Aucune interaction directe avec le système | non |
| Capitainerie / Affaires Maritimes | Autorité réglementaire sur le manifeste de bord | Rien du système : le manifeste reste papier | non |

## 5. Personas

### Sophie — cliente touriste étrangère

- Contexte d'usage : réserve depuis son téléphone, souvent à l'hôtel, ne parle pas français.
- Objectif : trouver un créneau disponible pour une sortie baleines et payer immédiatement par carte.
- Ce qui la bloque aujourd'hui : absence d'interface dans sa langue et de paiement en ligne direct.

### Marc — client local

- Contexte d'usage : réserve depuis un ordinateur ou un mobile, connaît déjà l'offre.
- Objectif : réserver rapidement une sortie « coucher de soleil » pour un groupe (adultes et enfants).
- Ce qui le bloque aujourd'hui : pas de vision claire des créneaux encore disponibles avant d'appeler.

### L'administrateur — gérant de Ti'Baleine

- Contexte d'usage : ordinateur de bureau (Desktop/PC), consultation quotidienne du planning.
- Objectif : voir en un coup d'œil le remplissage de chaque créneau pour organiser le dispatch avant le départ.
- Ce qui le bloque aujourd'hui : pas d'outil centralisé, gestion probablement dispersée entre appels et notes (*CR-02/Q03*).

## 6. Périmètre

### Dans le périmètre

- Un site web public de réservation, optimisé pour ordinateurs, tablettes et smartphones (*CR-02/Q06*).
- Un parcours de commande sans création de compte préalable.
- Un module de paiement en ligne 100 % sécurisé par carte bancaire (*CR-01/Q24, CR-01/Q25*).
- La génération et l'envoi automatique de factures PDF après validation du paiement (*CR-01/Q47*).
- Une interface d'administration unique (sur ordinateur PC/Desktop) pour la consultation du planning et la modification des créneaux (*CR-02/Q12*).
- Un support bilingue français/anglais sur l'ensemble du parcours client (*CR-01/Q07, CR-02/§3*).

### Hors périmètre

| Élément écarté | Motif |
|---|---|
| Solution SaaS tierce (Bokun, Resagenda…) | le client a répondu « sur-mesure » — CR-01/Q01 |
| Compte client / espace membre | réservation en tant qu'invité uniquement — CR-02/§3 |
| Annulation en ligne par le client | annulations traitées en direct par téléphone/e-mail/appel — CR-01/Q36 |
| Remboursement automatisé | « pas de remboursement automatique : géré directement par l'entreprise » — CR-02/Q02 |
| Comptes secondaires (capitaine, vendeur) | « un seul profil administrateur : l'entreprise » — CR-02/Q03 |
| Répartition des passagers par bateau | dispatch effectué physiquement avant l'excursion — CR-01/§8 Q1 |
| Manifeste de bord maritime | « le manifeste de bord reste hors système, rien d'informatique » — CR-02/Q05 |
| Synchronisation avec agendas externes | « non » — CR-01/Q17 |
| Notifications admin à chaque nouvelle réservation | « pas nécessaire pour les nouvelles réservations » — CR-02/Q07 |

## 7. Contraintes

| # | Contrainte | Nature | Source |
|---|---|---|---|
| 1 | Solution sur-mesure exclusivement, aucun SaaS tiers | stratégique | CR-01/Q01 |
| 2 | Fermeture le lundi, le 25 décembre et le 1er janvier ; aucune réservation ni sortie ces jours-là | métier | CR-01/Q09 |
| 3 | Créneaux figés à 7h, 10h et 14h, pas d'horaires ad hoc | métier | CR-01/Q09, CR-01/Q10 |
| 4 | Capacité bornée par bateau : 12 places (Tikap) ou 24 places (Grand Bleu), 36 places cumulées par créneau | métier / physique | CR-01/Q12, CR-01/Q15, CR-02/Q01 |
| 5 | Paiement intégral et 100 % en ligne à la réservation, aucun acompte ni règlement partiel | métier | CR-01/Q24, CR-01/Q25 |
| 6 | Clôture des réservations en ligne 2 heures avant le départ | métier | CR-01/Q35, CR-02/Q08 |
| 7 | Annulations et remboursements entièrement manuels, aucun flux automatique côté système | opérationnelle | CR-01/Q36, CR-02/Q02 |
| 8 | Aucune synchronisation avec des agendas externes | technique | CR-01/Q17 |
| 9 | Interface multilingue (FR/EN) dès le lancement | métier | CR-01/Q07, CR-02/§3 |
| 10 | Facture PDF émise automatiquement à chaque confirmation de commande | métier / légale | CR-01/Q47 |
| 11 | Manifeste passagers hors périmètre applicatif (obligation capitainerie gérée sur papier) | réglementaire | CR-02/Q05 |
| 12 | Un seul profil back-office, pas de sous-comptes | technique / organisationnelle | CR-02/Q03 |
| 13 | Seuil de maintien d'un créneau : minimum 6 réservations payantes | métier | CR-02/Q01 |
| 14 | Aucune mixité de types de sortie sur un même créneau ni une même embarcation | métier | CR-02/Q09, CR-02/Q11 |
| 15 | Un seul naturaliste disponible (contrainte d'encadrement sur les sorties baleines) | ressource / physique | CR-02/Q10 |
| 16 | Réservations uniquement via le site web, aucun autre canal dans le système | métier | CR-02/Q13 |

## 8. Règles métier

| # | Règle | Source |
|---|---|---|
| R-01 | Le planning est fixe toute l'année : trois créneaux par jour, à 7h, 10h et 14h. | CR-01/Q09, CR-01/Q10 |
| R-02 | Le service est fermé le lundi, le 25 décembre et le 1er janvier. | CR-01/Q09 |
| R-03 | La flotte comprend deux bateaux : Tikap (12 places) et Grand Bleu (24 places). | CR-01/Q12, CR-01/Q15 |
| R-04 | Tarifs fixes : baleines 65 € adulte / 40 € enfant, dauphins 50 € adulte / 30 € enfant, privatisation Tikap 600 €, Grand Bleu 1 100 €. | CR-01/Q18 |
| R-05 | Le tarif enfant s'applique de 4 à 11 ans inclus ; à partir de 12 ans, tarif adulte. Les moins de 4 ans ne sont pas admis en tarif standard. | CR-02/Q04 |
| R-06 | Le paiement est intégral et exclusivement en ligne au moment de la réservation, par carte bancaire. | CR-01/Q24, CR-01/Q25 |
| R-07 | Une facture PDF est générée et envoyée automatiquement à la confirmation de commande. | CR-01/Q47 |
| R-08 | Le seuil minimum de maintien d'un départ est de 6 passagers payants par bateau. | CR-02/Q01 |
| R-09 | La jauge maximale absolue est de 36 places par créneau (12 + 24), avec blocage automatique des réservations au-delà. | CR-02/Q01 |
| R-10 | Les réservations en ligne sont closes 2 heures avant le départ. | CR-01/Q35, CR-02/Q08 |
| R-11 | Un même créneau et une même embarcation sont dédiés à une seule activité exclusive (pas de mixité de prestations). | CR-02/Q09, CR-02/Q11 |
| R-12 | L'administrateur peut modifier la disponibilité et la configuration des créneaux depuis le back-office. | CR-02/Q12 |
| R-13 | Un seul profil administrateur accède au back-office ; pas de sous-comptes capitaine ou vendeur. | CR-02/Q03 |
| R-14 | Un seul naturaliste est disponible et obligatoire pour encadrer les sorties baleines. | CR-02/Q10 |
| R-15 | Aucune annulation ni aucun remboursement n'est traité automatiquement par le système ; tout passe par contact direct avec l'entreprise. | CR-01/Q36, CR-02/Q02 |
| R-16 | L'administrateur reçoit une alerte (SMS et/ou e-mail) uniquement en cas d'annulation, jamais pour une nouvelle réservation. | CR-01/§1 citation, CR-02/Q07 |
| R-17 | Le manifeste de bord reste un registre papier, hors périmètre du système. | CR-02/Q05 |
| R-18 | Toutes les réservations grand public passent exclusivement par la plateforme web. | CR-02/Q13 |
| R-19 | Aucune synchronisation avec un agenda externe (Google Calendar, Outlook…) n'est requise. | CR-01/Q17 |

## 9. Exigences fonctionnelles

| ID | Exigence | Priorité | Persona | Source |
|---|---|---|---|---|
| REQ-001 | Le client peut choisir un type de sortie (Baleines, Dauphins, Privatisation) | Must | Sophie / Marc | CR-01/Q02 |
| REQ-002 | Le client peut basculer entre français et anglais à tout moment du parcours | Must | Sophie | CR-01/Q07 |
| REQ-003 | Le client voit uniquement les créneaux disponibles (masquage des jours fermés et des créneaux complets ou clos à moins de 2h) | Must | Sophie / Marc | CR-01/Q09, CR-01/Q35 |
| REQ-004 | Le client saisit le nombre d'adultes et d'enfants pour sa réservation | Should | Marc | déduit — nécessaire au calcul du tarif (R-04, R-05) |
| REQ-005 | Le client renseigne un formulaire de contact minimal (nom, prénom, e-mail, téléphone) sans création de compte | Should | Sophie / Marc | CR-02/§3 |
| REQ-006 | Le client paie 100 % du montant par carte bancaire via une passerelle sécurisée | Must | Sophie / Marc | CR-01/Q24, CR-01/Q25 |
| REQ-007 | Le système affiche une confirmation immédiate à l'écran après paiement | Should | Sophie / Marc | déduit — nécessaire pour clore le parcours de paiement (CR-01/Q24) |
| REQ-008 | Le système envoie automatiquement un e-mail de confirmation accompagné de la facture PDF | Should | Sophie / Marc | CR-01/Q47 |
| REQ-009 | L'administrateur consulte le planning des réservations par jour et par créneau | Should | Administrateur | CR-02/Q03 |
| REQ-010 | L'administrateur voit le taux de remplissage de chaque créneau selon les capacités des bateaux (12, 24, 36 places) | Should | Administrateur | CR-02/Q01 |
| REQ-011 | L'administrateur peut modifier la configuration des créneaux depuis le back-office | Could | Administrateur | CR-02/Q12 |
| REQ-012 | Le système bloque automatiquement toute nouvelle réservation dès qu'un créneau atteint sa capacité maximale (12, 24 ou 36 places) | Must | — | CR-02/Q01 |

**Rappel :** le client plafonne le Must have à 3 cas d'usage.

## 10. Exigences non fonctionnelles

| ID | Exigence | Comment on la vérifie | Source |
|---|---|---|---|
| REQ-101 | L'interface publique est intégralement disponible en français et en anglais | Chaque écran du parcours client existe dans les deux langues, sans texte non traduit | CR-01/Q07, CR-02/§3 |
| REQ-102 | Le site est utilisable sur ordinateur, tablette et smartphone pour le parcours client | Le parcours de réservation complet est testé et fonctionnel sur les trois formats | CR-02/Q06 |
| REQ-103 | L'espace d'administration est conçu pour un usage sur ordinateur de bureau uniquement | Les écrans admin sont validés en résolution desktop, sans adaptation mobile requise | CR-02/Q06 |
| REQ-104 | Les transactions par carte bancaire respectent les normes de sécurité bancaire en vigueur | Le prestataire de paiement retenu est certifié conforme (ex. PCI-DSS) | déduit — obligation légale liée à REQ-006 |
| REQ-105 | Les données personnelles collectées sont limitées au strict nécessaire (nom, e-mail, téléphone) | Revue du formulaire de réservation : aucun champ superflu | CR-02/§3 |
| REQ-106 | La durée de conservation des données personnelles est définie et appliquée | Politique de conservation documentée et vérifiable | CR-02/§8, Q5 — en attente de réponse |
| REQ-107 | Le système reste disponible sans interruption notable pendant les 3 créneaux quotidiens (7h, 10h, 14h) | Suivi de disponibilité sur les plages de réservation actives | déduit — activité commerciale continue toute l'année (R-01) |

Passer en revue au minimum : volumétrie et pics de charge, support et conditions
réseau, langues, coût d'hébergement, sécurité et contrôle d'accès, données
personnelles et durée de conservation, déploiement, maintenance après livraison.

## 11. Questions restées ouvertes

| # | Question | Posée le | Réponse | Hypothèse retenue en attendant |
|---|---|---|---|---|
| 1 | Quel est le nom de domaine définitif retenu pour la plateforme ? | CR-02/§8 Q1 | en attente | Nom de domaine provisoire à définir par l'équipe, à valider avant mise en production |
| 2 | Quel hébergeur / type de serveur souhaité pour la mise en production ? | CR-02/§8 Q2 | en attente | Hébergement cloud standard, à ajuster selon budget client |
| 3 | Qui fournit et valide les textes des CGV et mentions légales ? | CR-02/§8 Q3 | en attente | L'entreprise fournit les textes légaux avant mise en ligne |
| 4 | Quelles cases à cocher obligatoires au checkout (CGV, décharge, newsletter…) ? | CR-02/§8 Q4 | en attente | Case CGV obligatoire uniquement, sans newsletter |
| 5 | Quelle durée de conservation des données personnelles au titre du RGPD ? | CR-02/§8 Q5 | en attente | Durée minimale légale par défaut (3 ans après le dernier contact), à confirmer |
| 6 | Le statut « moins de 4 ans » est-il gratuit ou soumis à demande préalable ? | CR-02/§9 | en attente | Enfant de moins de 4 ans non comptabilisé dans la réservation payante, admission soumise à confirmation par l'entreprise |
| 7 | Les privatisations sont-elles possibles le matin, ou uniquement l'après-midi (Sunset) ? | CR-02/§9 | en attente | Créneaux de privatisation limités à l'après-midi (14h) jusqu'à confirmation |
| 8 | Quel budget est alloué à la création et à l'hébergement mensuel de l'outil ? | CR-01/Q53, CR-01/Q55 | sans réponse | Aucune hypothèse chiffrée retenue ; à clarifier avant choix technique |
| 9 | Quelle est la date cible de mise en service ? | CR-01/Q54 | sans réponse | Mise en service visée avant la prochaine saison des baleines |
| 10 | Quel identifiant et quelle politique de mot de passe (regex) pour l'accès à l'interface administrateur ? | point-relevés.md | en attente | Identifiant e-mail + mot de passe respectant un minimum de 12 caractères, majuscule, chiffre et caractère spécial, à valider avec le client |
| 11 | Une fois le calendrier fixé, peut-il être modifié, et par quel moyen l'administrateur y accède-t-il ? | point-relevés.md | en attente | Modification possible depuis le back-office par l'administrateur uniquement (cf. R-12) ; spec détaillée à proposer par l'équipe |

Une question sans réponse n'interdit pas d'avancer, à condition que l'hypothèse
soit écrite. Une hypothèse non écrite est une erreur en attente.

## 12. Validation client

| Version | Date | Présentée au client | Retour |
|---|---|---|---|
| v1 | 11/08/2026 | non | à planifier |
