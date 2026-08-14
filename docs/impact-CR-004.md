# Analyse d'impact — CR-004

**Évolution et consolidation suite à l'entretien n° 4 du 14/08/2026.**

**Demande du client :** Ajout d'un mécanisme d'alerte de pré-annulation envoyée la veille au soir à 18 h aux clients d'un ou plusieurs créneaux (par SMS ou email), avec un **motif personnalisable** dans un champ texte (assisté par des **propositions de templates bilingues codées en dur** qui préremplissent automatiquement le message), un message **bilingue combiné** (FR + EN dans le même corps de message), et la possibilité d'envoi groupé multi-créneaux. Impact sur l'affichage des disponibilités en ligne (affichage d'une mention spécifique sur les créneaux concernés lorsqu'ils restent ouverts et disposent de places) et sur la politique de remboursement (remboursement à 100 % en cas d'annulation effective du créneau après l'alerte ou en cas d'annulation par anticipation/« par peur » du client suite à la réception de l'alerte, en dérogation au barème d'annulation standard).
**Reçue le :** 14/08/2026 (Entretien n° 4)
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

Le commanditaire demande la mise en place d'un système d'**alerte de pré-annulation** déclenchable par l'administrateur **la veille au soir à 18h00**. Cette alerte vise à prévenir les passagers déjà inscrits d'une possible annulation du départ (par exemple en cas d'incertitude météo ou technique). Elle est transmise par **SMS ou e-mail**, peut être **diffusée simultanément sur plusieurs créneaux** en une seule opération (envoi groupé), intègre un **motif personnalisable** dans un champ texte éditable (avec des **propositions de templates bilingues codées en dur** dans l'interface qui préremplissent automatiquement le champ au clic), et délivre un **message bilingue combiné** (regroupant successivement la version française et la version anglaise, sans stockage de la langue du client).

Sur le plan de la réservation en ligne, l'envoi de cette alerte ne ferme pas automatiquement le créneau : si des places demeurent disponibles, le créneau reste ouvert à la vente mais une **mention spécifique d'avertissement** doit apparaître sur la fiche du créneau pour informer les nouveaux clients avant réservation.

Sur le plan financier, l'émission de cette alerte introduit une **politique de remboursement dérogatoire à 100 %** dans deux situations distinctes :
1. **Annulation effective du créneau** après émission de l'alerte (quel que soit le délai avant le départ).
2. **Annulation par le client réservataire « par peur » / anticipation** suite à la réception de l'alerte, même si le créneau est finalement maintenu.

Les remboursements effectifs demeurent gérés manuellement hors système par l'entreprise, mais l'outil applicatif consigne le motif d'annulation pour traçabilité.

---

## 2. Questions posées au client

| # | Question posée | Réponse |
|---|---|---|
| Q01 | Souhaitez-vous pouvoir envoyer une alerte prévenant d'une possible annulation avant le départ ? | Oui, **la veille au soir à 18 h**, par **SMS ou email**. |
| Q02 | Quels canaux utiliser pour l'envoi de cette alerte ? | **SMS ou email**. |
| Q03 | Faut-il un motif personnalisable associé à l'alerte ? | Oui, le motif doit être **personnalisable** (saisie libre dans un champ texte, avec **propositions de templates bilingues codées en dur** pour préremplir automatiquement le message). |
| Q04 | L'alerte peut-elle concerner plusieurs créneaux simultanément ? | Oui, **envoi possible sur plusieurs créneaux d'un coup**. |
| Q05 | Après l'envoi de l'alerte, que doit afficher le site si des places restent disponibles sur le(s) créneau(x) concerné(s) ? | Une **mention doit s'afficher sur le(s) créneau(x) concerné(s)**, toujours ouvert(s) à la réservation. |
| Q06 | L'alerte doit-elle être disponible dans toutes les langues de l'interface ? | Oui, l'alerte est **bilingue combinée (FR + EN)** dans le même message. |
| Q07 | Si l'annulation est confirmée après l'envoi de l'alerte, quel remboursement s'applique au client ? | **Remboursement à 100 %**. |
| Q08 | Si un client réservataire annule par anticipation (« par peur ») après réception de l'alerte, sans annulation effective du créneau, quel remboursement s'applique ? | **Remboursement à 100 % également**. |

---

## 3. Impact — cahier des charges

| Exigence / Section CDC | Impact | Action |
|---|---|---|
| **Contexte (CDC §1)** | modifiée | Mentionner l'intégration du mécanisme d'alerte de pré-annulation à J-1 18h avec motif personnalisable bilingue (FR/EN) et de la politique de remboursement à 100 % associée. |
| **Objectifs (CDC §3)** | modifiée | Enrichir l'objectif 3 (gestion administrative et communication) avec l'envoi d'alertes groupées bilingues personnalisables (SMS/email) et l'affichage d'un avertissement transparent pour les réservataires. |
| **Parties prenantes & Personas (CDC §4 & §5)** | modifiée | - Administrateur : ajout du cas d'usage d'envoi groupé d'alertes avec préremplissage via templates types codés en dur et personnalisation du motif.<br>- Client : réception du message d'alerte bilingue (texte FR suivi du texte EN) et visibilité de la mention d'alerte lors de la sélection des créneaux. |
| **Périmètre (CDC §6)** | modifiée | - *Dans le périmètre :* module back-office d'envoi d'alerte groupée (multi-créneaux, SMS/Email, champ texte avec préremplissage par templates bilingues codés en dur FR+EN), affichage de la mention de pré-alerte sur les créneaux concernés en ligne, enregistrement du motif d'annulation (effective vs "peur").<br>- *Hors périmètre :* gestion de templates dynamiques en base de données (les propositions sont codées en dur dans l'interface), remboursements bancaires automatisés (toujours manuels), déclencheur météo automatisé par API tierce, stockage de la langue du client. |
| **Contraintes (CDC §7)** | modifiée | Ajout des contraintes C-33 (envoi la veille à 18h par SMS/email), C-34 (envoi groupé multi-créneaux), C-35 (**message bilingue** FR+EN / motif personnalisable), C-36 (remboursement 100 % en cas d'annulation effective ou par peur). |
| **Règles métier (CDC §8)** | modifiée | Intégration des règles RM-44 à RM-50 (R-22 à R-28) :<br>- R-22 : Envoi possible de l'alerte à J-1 à 18h par SMS ou e-mail.<br>- R-23 : Motif personnalisable par l'administrateur (avec propositions de templates bilingues codées en dur pour préremplir le texte).<br>- R-24 : Envoi groupé simultané sur plusieurs créneaux.<br>- R-25 : Affichage d'une mention sur les créneaux en alerte restant ouverts à la vente.<br>- R-26 : Diffusion d'un message bilingue combiné (texte français suivi de sa traduction anglaise dans le même corps de message).<br>- R-27 : Remboursement à 100 % si annulation effective après alerte.<br>- R-28 : Remboursement à 100 % si annulation par le client « par peur » suite à l'alerte. |
| REQ-003 *(Visualisation créneaux disponibles)* | modifiée | Afficher la mention d'alerte spécifique sur les créneaux concernés lorsqu'ils sont ouverts à la réservation et disposent de places. |
| REQ-005 *(Formulaire de contact)* | **inchangée** | Les données de contact collectées restent strictement minimales (nom, prénom, e-mail, téléphone mobile). **Aucune donnée de langue n'est à stocker**, les alertes étant émises sous forme de messages bilingues combinés (FR + EN). |
| REQ-017 *(Envoi d'alerte de pré-annulation admin)* | ajoutée *(nouvelle)* | Permettre à l'administrateur de sélectionner un ou plusieurs créneaux du lendemain pour leur envoyer une alerte de pré-annulation groupée. |
| REQ-018 *(Personnalisation du motif et préremplissage par templates)* | ajoutée *(nouvelle)* | Permettre à l'administrateur de préremplir le champ de message via des propositions de templates bilingues (FR+EN) codées en dur, de personnaliser le texte, puis de déclencher l'envoi par SMS ou e-mail à l'ensemble des passagers réservataires des créneaux ciblés. |
| REQ-019 *(Affichage mention créneau en alerte côté public)* | ajoutée *(nouvelle)* | Afficher un avertissement textuel clair sur l'interface publique pour tout créneau sous alerte de pré-annulation dont la jauge n'est pas complète. |
| REQ-020 *(Traçabilité du motif d'annulation post-alerte)* | ajoutée *(nouvelle)* | Enregistrer le motif d'annulation administrative (annulation météo/créneau ou annulation « par peur » du client suite à l'alerte) à titre de traçabilité pour l'administrateur (aucun calcul automatique, les remboursements restant 100 % manuels hors système). |
| **Questions ouvertes (CDC §11)** | modifiée | Enregistrement des questions ouvertes issues du CR-04 : statut de remise en vente des places annulées « par peur », articulation exacte avec l'annulation météo à H-2, et liste des textes types bilingues à intégrer en dur dans l'interface. |

---

## 4. Impact — spécifications

| Spécification | Impact | Ce qui change exactement |
|---|---|---|
| SPEC-RES-01 *(Tunnel de réservation client)* | modifiée | Affichage de la mention / badge d'alerte de pré-annulation sur la carte du créneau concerné au cours de l'étape de sélection de date/créneau. Aucun champ de langue stocké dans la réservation. |
| SPEC-RES-02 *(Sélection créneaux & activités)* | modifiée | Maintien de l'ouverture à la vente et du calcul des places restantes sur un créneau sous alerte, avec transmission de l'état `en_alerte: true` et du texte de la mention via l'API. |
| SPEC-ADM-04 *(Module d'alerte de pré-annulation)* | ajoutée *(nouvelle)* | Écran back-office dédié à l'alerte à J-1 18h : sélection de la date du lendemain, sélection multiple de créneaux (Saint-Gilles et/ou Saint-Leu), sélecteur de **propositions de templates bilingues codées en dur** (ex. Météo défavorable, Problème technique) venant préremplir automatiquement la zone de texte éditable, choix du canal d'expédition (SMS, e-mail, ou les deux), prévisualisation et déclenchement sécurisé de l'envoi en lot. |
| SPEC-NOTIF-02 *(Diffusion multicanale de messages bilingues)* | ajoutée *(nouvelle)* | Service d'envoi en masse (asynchrone / file de messages) routant le texte bilingue validé par l'administrateur à tous les numéros mobiles (SMS) et adresses e-mail des réservataires des créneaux ciblés. |
| SPEC-ANNUL-01 *(Annulation back-office administrateur)* | modifiée | Ajout d'un sélecteur de motif d'annulation dans l'interface admin (`Annulation administrative / Météo suite à alerte`, `Annulation client par peur suite à alerte`, `Autre`), consignant le motif pour traçabilité sans aucun calcul automatique (gestion financière du remboursement 100 % manuelle hors outil). |
| SPEC-ADM-02 *(Planning & Supervision back-office)* | modifiée | Affichage visuel (icône/couleur) des créneaux sous alerte de pré-annulation sur la grille de planning administrative. |

---

## 5. Impact — tests

| Cas de test | Impact |
|---|---|
| CASE-RES-01 à CASE-RES-08 *(Réservations nominales, seuils d'âge, jauges et multi-sites)* | inchangés |
| CASE-ALERT-01 *(Préremplissage via template codé en dur, personnalisation du texte et envoi d'une alerte bilingue sur un créneau unique via SMS et Email)* | à écrire *(nouveau)* |
| CASE-ALERT-02 *(Envoi groupé d'une alerte bilingue simultanément sur plusieurs créneaux)* | à écrire *(nouveau)* |
| CASE-ALERT-03 *(Structure bilingue : vérification de la présence du texte français et de la version anglaise dans le corps unique du SMS/Email reçu)* | à écrire *(nouveau)* |
| CASE-ALERT-04 *(Affichage de la mention spécifique sur un créneau sous alerte ouvert à la vente avec places disponibles)* | à écrire *(nouveau)* |
| CASE-ALERT-05 *(Annulation effective d'un créneau après alerte : enregistrement du motif d'annulation)* | à écrire *(nouveau)* |
| CASE-ALERT-06 *(Annulation par l'administrateur suite à désistement « par peur » du client : enregistrement du motif)* | à écrire *(nouveau)* |
| CASE-ALERT-07 *(Persistance de la jauge et possibilité de réserver un créneau sous alerte jusqu'à fermeture H-2)* | à écrire *(nouveau)* |
| CASE-ALERT-08 *(Interdiction d'accès au module d'envoi d'alerte aux utilisateurs non authentifiés / non administrateurs)* | à écrire *(nouveau)* |

---

## 6. Impact — code

| Composant | Impact |
|---|---|
| `Frontend Admin (UI)` | Développer l'interface de gestion des alertes à J-1 18h : multi-sélection des créneaux, intégration des constantes de templates types bilingues codées en dur (`DEFAULT_ALERT_TEMPLATES`), fonction de préremplissage automatique de la zone de texte éditable au clic, prévisualisation et bouton d'envoi groupé. |
| `AdminAlertController` / `AdminAlertService` | Développer les endpoints et la logique d'envoi d'alerte groupée : validation du texte personnalisé reçu, sélection multi-créneaux, options SMS/Email, enregistrement en base. |
| `NotificationQueueService` / `AlertWorker` | Mettre en place la file de messages asynchrone pour expédier les SMS et emails par lots sans bloquer la requête HTTP de l'administrateur. |
| `SmsNotificationService` | Acheminer le message SMS bilingue (support des SMS multi-segments/concaténés) via la passerelle SMS. |
| `EmailNotificationService` | Acheminer l'e-mail bilingue (HTML/texte regroupant FR et EN) via le service SMTP transactionnel. |
| `BookingEngine` / `SlotService` | Exposer le statut `en_alerte` et le message de la mention d'avertissement dans l'API publique de consultation des créneaux. |
| `AdminCancellationService` | Enrichir la fonction d'annulation pour consigner le motif d'annulation (météo suite à alerte ou désistement par peur), sans calcul automatique de remboursement. |
| `Frontend Public (UI)` | Intégrer l'affichage dynamique d'un badge/bandeau d'avertissement (« Créneau sous réserve / Alerte météo ») sur les créneaux concernés lors du tunnel de commande. |

---

## 7. Effets de bord identifiés

Ce que la demande touche sans que le client l'ait envisagé :

- **Gain de temps et simplicité (templates codés en dur dans l'interface) :** L'intégration de propositions de templates bilingues codées en dur (ex : *« La météo pour votre prochaine sortie bateau n'est pas favorable... / The weather condition for your next boat trip... »*) permet de préremplir le champ texte instantanément tout en laissant l'administrateur libre de retoucher le texte. Cela évite toute complexité de base de données (pas de CRUD ni de table de templates à administrer).
- **Simplicité d'implémentation (aucun tracking de langue client) :** L'envoi d'un message unique regroupant le français et l'anglais simplifie grandement l'architecture : aucune donnée de langue à collecter ni à persister en base, aucun risque de mauvais ciblage de langue.
- **Impact sur la longueur des SMS (SMS multi-segments) :** Un SMS bilingue contenant la version française et la version anglaise dépassera systématiquement les 160 caractères standards (GSM 7-bit). Il sera donc transmis sous forme de SMS concaténé (2 à 3 segments SMS), ce qui multiplie le coût unitaire de chaque envoi SMS par le nombre de segments. Ce point financier doit être anticipé dans le dimensionnement de la passerelle SMS.
- **Impact sur le taux de conversion des dernières places :** L'affichage public d'une mention d'alerte sur un créneau ouvert peut inquiéter de nouveaux clients et freiner les réservations de dernière minute. La mention doit être claire, rassurante et rappeler le remboursement garanti à 100 % en cas d'annulation.
- **Double statut du créneau (Ouvert ET En alerte) :** Un créneau sous alerte n'est pas un créneau annulé : il continue de décompter ses jauges, d'accepter des réservations jusqu'à H-2 et de fonctionner normalement tant que l'administrateur n'a pas prononcé d'annulation définitive.
- **Traçabilité pour la gestion manuelle des remboursements :** Les remboursements restant manuels hors outil, le tableau de bord administrateur doit clairement isoler les annulations issues d'une alerte (motif météo ou motif « peur ») afin que le gérant applique le remboursement à 100 % sans appliquer par erreur les retenues des conditions générales de vente ordinaires.
- **Canal de l'annulation « par peur » :** Dans la mesure où l'auto-annulation en ligne par le client est hors périmètre (confirmé au CDC v3), l'annulation « par peur » se fera par contact du client auprès de l'administrateur (téléphone/e-mail), qui sélectionnera le motif correspondant dans le back-office.

---

## 8. Ce que nous ne ferons pas dans le temps restant

Assumé, et à confirmer avec le client lors de la prochaine étape :

- Aucun module d'administration dynamique des templates en base de données (les propositions de messages types sont codées en dur dans l'interface).
- Aucun stockage de la langue du client ni routage linguistique différencié (les messages d'alerte sont universels et bilingues FR+EN).
- Aucun outil de traduction automatique en direct / par IA.
- Aucun déclencheur météo automatisé via une API météo externe (l'alerte est initiée sur décision manuelle de l'administrateur).
- Aucun système de remboursement bancaire automatisé par API (le remboursement reste manuel hors système par l'entreprise).
- Aucun portail d'auto-annulation en ligne pour le client public (l'annulation « par peur » est saisie par l'administrateur dans le back-office suite à la demande du client).
- Aucun canal additionnel hors SMS et e-mail (pas de notification push mobile, pas de WhatsApp).

---

## 9. Ordre d'exécution retenu

| # | Étape | Qui |
|---|---|---|
| 1 | Mise à jour du Cahier des Charges Fonctionnel (`cahier-des-charges-v4.md` : intégration de l'alerte à J-1 18h, propositions de templates bilingues codées en dur, mention créneau, règles de remboursement à 100 %, exigences REQ-017 à REQ-020, maintien REQ-005 inchangée) | Thomas & Loïc |
| 2 | Rédaction des spécifications détaillées (`SPEC-ADM-04` module d'alerte groupée avec préremplissage par templates types, `SPEC-NOTIF-02` moteur d'envoi SMS/Email bilingue, actualisation `SPEC-RES-01` et `SPEC-ANNUL-01`) | Benjamin & Ivan |
| 3 | Harmonisation des diagrammes de séquence UML (envoi d'alerte bilingue et annulation post-alerte) | Thomas & Ivan |
| 4 | Mise à jour du MCD / MLD / MPD (colonnes `en_alerte`, `motif_alerte` sur les créneaux, tables `Alertes` et `Alerte_Creneaux` — sans table de templates ni modification de la table `Reservations`) | Benjamin |
| 5 | Actualisation du plan de tests et rédaction des cas de test (`CASE-ALERT-01` à `CASE-ALERT-08`) | Loïc |
| 6 | Développement de l'interface d'alerte back-office (templates codés en dur avec préremplissage du textarea éditable) et de la file d'attente asynchrone | Toute l'équipe |
| 7 | Intégration du service d'expédition pour la passerelle SMS et le service d'e-mails transactionnels | Toute l'équipe |
| 8 | Développement de l'affichage de la mention d'avertissement côté interface client et enrichissement de l'écran admin de gestion des annulations | Toute l'équipe |
| 9 | Campagne globale de tests d'intégration, vérification des non-régressions et recette fonctionnelle | Toute l'équipe |
