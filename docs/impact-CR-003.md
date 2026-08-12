# Analyse d'impact — CR-003

**Évolution et consolidation suite à l'entretien n° 3 du 12/08/2026.**

**Demande du client :** Gestion de l'annulation et de la modification de réservation réservée exclusivement à l'administrateur dans le back-office (avec libération automatique des places sur le créneau et envoi d'un SMS d'information au client, sans annulation directe par le client), ouverture d'un second point de départ à Saint-Leu (mardi et jeudi, Tikap 12 places uniquement, départ à 9h, surcoût individuel de +10 €/personne, entraînant l'indisponibilité du Tikap la matinée à 07h00 et 10h00 à Saint-Gilles ces jours-là), ouverture de la privatisation du Tikap à Saint-Leu au même tarif qu'à Saint-Gilles (600 € la demi-journée), extension des privatisations en demi-journée le matin (7h–12h) en plus de l'après-midi, affectation dynamique du naturaliste unique selon les réservations, et piste de nom de domaine `tibaleine.re`.
**Reçue le :** 12/08/2026 (Entretien n° 3)
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

Le commanditaire acte l'ouverture d'un **second point de départ à Saint-Leu**, opéré le **mardi et le jeudi** par le *Tikap* (12 places) avec un départ unique à **9h00** et une majoration de **+ 10 € par personne** sur les billets individuels (baleines et dauphins). En raison de la sortie à 9h00 à Saint-Leu et des délais de transit maritime aller/retour entre Saint-Gilles et Saint-Leu, **le Tikap n'est pas disponible pour toute la matinée (créneaux de 07h00 et 10h00) le mardi et le jeudi à Saint-Gilles** (la capacité des créneaux de 07h00 et 10h00 à Saint-Gilles est donc limitée à **24 places** sur le *Grand Bleu* seul ces jours-là). Le Tikap redevient disponible à Saint-Gilles pour le créneau de 14h00.

Les formules de **privatisation de navire** en demi-journée sont confirmées le matin (**7h00 – 12h00**) et l'après-midi (**dès 14h00**), et sont **possibles à Saint-Leu sur le Tikap au même tarif qu'à Saint-Gilles (600 €)** sans application de surcoût par personne sur le forfait.

Le système n'offre **aucune interface d'annulation ou de modification directe pour le client public**. L'annulation d'une réservation est effectuée **exclusivement par l'administrateur** depuis son back-office ; elle **libère automatiquement les places** sur le créneau concerné et déclenche l'envoi d'un **SMS d'information au client**. De même, les modifications de réservations (taille du groupe, répartition adultes/enfants) sont réservées à l'administrateur.

La contrainte d'encadrement du **naturaliste unique** est gérée dynamiquement : son affectation quotidienne à Saint-Gilles ou Saint-Leu s'ajuste selon le volume des réservations enregistrées. Le nom de domaine envisagé est **tibaleine.re** (sans budget global plafonné).

---

## 2. Questions posées au client

| # | Question posée | Réponse |
|---|---|---|
| 1 | L'annulation d'une réservation est-elle possible en ligne par le client ou réservée à l'administrateur, et avec quelle notification ? | **Pas d'annulation directe par le client** : l'annulation est effectuée **uniquement par l'administrateur** depuis son interface, avec envoi automatique d'une **information par SMS au client**. |
| 2 | Que devient le créneau lorsqu'une réservation est annulée par l'administrateur ? | La place est **libérée automatiquement** sur l'application (le créneau se rouvre à la réservation). |
| 3 | Une réservation existante peut-elle être modifiée, et par qui ? | Oui : modification possible (taille du groupe / répartition adultes-enfants), **uniquement par l'administrateur** (le client ne modifie pas lui-même). |
| 4 | Quel nom de domaine est envisagé pour la plateforme ? | Piste : **tibaleine.re** *(à confirmer et vérifier la disponibilité)*. |
| 5 | Quel budget est alloué au projet ? | **Pas de budget fixé** à ce stade. |
| 6 | Les privatisations peuvent-elles avoir lieu le matin comme l'après-midi ? | Oui : privatisation possible le **matin** ou l'**après-midi**. |
| 7 | Quelles sont les plages horaires des demi-journées de privatisation ? | Matin : **7 h – 12 h**. Après-midi : **14 h – …** *(heure de fin indicative ~18h)*. |
| 8 | Existe-t-il désormais un second point de départ ? | Oui : depuis cette année, certains départs se font depuis **Saint-Leu** (en plus de **Saint-Gilles**), avec jours, horaires et tarifs propres. |
| 9 | Quel est l'écart tarifaire pour les départs individuels de Saint-Leu ? | **+ 10 € par personne** par rapport à Saint-Gilles (baleines et dauphins). |
| 10 | Quels bateaux opèrent depuis Saint-Leu ? | Uniquement le **Tikap** (12 places). |
| 11 | Quels jours les départs ont-ils lieu depuis Saint-Leu ? | Le **mardi** et le **jeudi** depuis Saint-Leu ; le reste de la semaine depuis Saint-Gilles. |
| 12 | Les types de sortie diffèrent-ils à Saint-Leu ? | Non : **mêmes types de sortie** qu'à Saint-Gilles (baleines, dauphins, privatisation). |
| 13 | Quels sont les horaires des départs de Saint-Leu et quel est l'impact sur Saint-Gilles ? | **Départ à 9 h** de Saint-Leu (Tikap). Ensuite le bateau repart se positionner à Saint-Gilles : **pas de Tikap disponible la matinée le mardi et le jeudi à Saint-Gilles** (jauge 07h et 10h à Saint-Gilles = 24 places sur Grand Bleu seul). |
| 14 | Le naturaliste est-il affecté à un lieu fixe ? | Non : l'**emplacement du naturaliste dépend des réservations**. |
| 15 | Le client choisit-il le lieu de départ lors de la réservation ? | Oui : le **choix du lieu** (Saint-Gilles / Saint-Leu) se fait sur l'application selon les disponibilités du planning. |
| 16 | Quelles informations liées au lieu faut-il afficher au client ? | Afficher la disponibilité selon le lieu, l'adresse du port d'embarquement, le départ à 9 h pour Saint-Leu et le supplément tarifaire. |
| 17 | Les privatisations sont-elles possibles au départ de Saint-Leu et à quel tarif ? | **Oui**, privatisation possible au départ de Saint-Leu sur le Tikap (12 places), **au même tarif qu'à Saint-Gilles** (600 € la demi-journée, pas de surcoût par personne sur le forfait). |

---

## 3. Impact — cahier des charges

| Exigence / Section CDC | Impact | Action |
|---|---|---|
| **Périmètre & Hors périmètre (CDC §6)** | modifiée | L'annulation *par l'administrateur* (avec libération synchrone du créneau et SMS d'information client) ainsi que la modification de réservation par l'admin entrent dans le périmètre applicatif back-office. L'auto-annulation directe et l'auto-modification par le client restent strictement hors périmètre. Les remboursements financiers demeurent manuels hors système. |
| **Questions ouvertes (CDC §11)** | modifiée | Clôture de questions ouvertes du CDC v2 grâce au CR-03 :<br>- Q1 (Domaine) : piste identifiée sur `tibaleine.re`.<br>- Q6 (Créneaux privatisation) : validé matin (7h–12h) et après-midi (dès 14h).<br>- Q7 (Budget) : aucun budget fixé à ce stade. |
| REQ-001 *(Sélection type de sortie & port)* | modifiée | Intégrer l'étape de choix du point de départ (Saint-Gilles / Saint-Leu) et adapter les sorties proposées. |
| REQ-003 *(Visualisation créneaux disponibles)* | modifiée | Afficher les créneaux par site : Saint-Gilles (7h, 10h, 14h toute la semaine) et Saint-Leu (mardi et jeudi à 9h00 uniquement, Tikap 12 places). Brider la capacité des créneaux de 07h00 et 10h00 à Saint-Gilles à 24 places le mardi et le jeudi (Grand Bleu seul). |
| REQ-004 *(Tarification et tranches d'âge)* | modifiée | Appliquer la majoration géographique de **+ 10 € par personne** pour les billets individuels au départ de Saint-Leu (Baleines 75 € ad / 50 € enf ; Dauphins 60 € ad / 40 € enf). Maintenir le forfait de privatisation Tikap à 600 € à Saint-Leu (identique à Saint-Gilles). |
| REQ-005 *(Formulaire de contact)* | modifiée | Rendre obligatoire la saisie d'un numéro de téléphone mobile au format valide pour l'envoi du SMS d'information en cas d'annulation. |
| REQ-010 *(Visualisation jauges et remplissage)* | modifiée | Intégrer dans le tableau de bord admin la jauge spécifique de 24 places le mardi et jeudi à 07h00 et 10h00 à Saint-Gilles (Grand Bleu seul, absence du Tikap). |
| REQ-011 *(Gestion des créneaux back-office)* | modifiée | Permettre à l'administrateur de gérer les créneaux multi-sites (Saint-Gilles et Saint-Leu) et d'assigner le naturaliste unique. |
| REQ-013 *(Annulation back-office par l'admin)* | ajoutée *(nouvelle)* | Développer l'action d'annulation de réservation réservée à l'administrateur dans le back-office, déclenchant la libération synchrone des places sur le créneau. |
| REQ-014 *(Notification SMS d'information client)* | ajoutée *(nouvelle)* | Déclencher l'envoi automatique d'un SMS au client lors de l'annulation de sa réservation par l'administrateur. |
| REQ-015 *(Modification de réservation admin)* | ajoutée *(nouvelle)* | Permettre à l'administrateur de modifier les quotas passagers (adultes/enfants) ou la date d'une réservation depuis le back-office. |
| REQ-016 *(Privatisation matin et après-midi)* | ajoutée *(nouvelle)* | Permettre la réservation de formules de privatisation en demi-journée soit le matin (7h–12h), soit l'après-midi (dès 14h) à Saint-Gilles et à Saint-Leu. |
| R-01 *(Planning standard)* | modifiée | Intégrer le créneau de 9h00 à Saint-Leu les mardis et jeudis pour le Tikap, et l'indisponibilité du Tikap à 07h00 et 10h00 ces mêmes jours à Saint-Gilles. |
| R-03 / R-09 *(Flotte et jauges)* | modifiée | Fixer la jauge maximale du mardi et jeudi à 07h00 et 10h00 à Saint-Gilles à **24 places** (Grand Bleu uniquement). |
| R-04 *(Grille tarifaire)* | modifiée | Intégrer la grille tarifaire Saint-Leu : Baleines 75 € / 50 €, Dauphins 60 € / 40 €, Privatisation Tikap 600 € (identique à Saint-Gilles). |
| R-15 / R-16 *(Annulations & notifications)* | modifiée | L'annulation est exécutée dans le back-office exclusivement par l'administrateur, déclenchant la réouverture automatique du créneau et l'envoi d'un SMS d'information au client (remboursements financiers maintenus manuels hors système). |

---

## 4. Impact — spécifications

| Spécification | Impact | Ce qui change exactement |
|---|---|---|
| SPEC-RES-01 *(Tunnel de réservation client)* | modifiée | Choix du port d'embarquement (Saint-Gilles / Saint-Leu), affichage du créneau de 9h00 le mar/jeu pour Saint-Leu, application de la majoration de 10 €/pers. sur billets individuels, et jauge max à 24 places le mar/jeu à 07h00 et 10h00 à Saint-Gilles. |
| SPEC-RES-02 *(Sélection créneaux & activités)* | modifiée | Prise en compte du navire Tikap exclusif à Saint-Leu (12 places) et intégration de la plage de privatisation du matin (7h–12h) au tarif forfaitaire de 600 € pour le Tikap (Saint-Gilles et Saint-Leu). |
| SPEC-ANNUL-01 *(Annulation back-office administrateur)* | ajoutée *(nouvelle)* | Écran et bouton d'action d'annulation dans l'interface admin : confirmation, mise à jour du statut en `ANNULEE`, libération immédiate des places associées dans la jauge du créneau, et déclenchement d'un appel à la passerelle SMS d'information vers le client. Pas d'accès public/client. |
| SPEC-ADM-02 *(Planning & Supervision back-office)* | modifiée | Planning filtrable par port (Saint-Gilles / Saint-Leu), prise en compte de la jauge réduite à 24 places le mar/jeu à 07h00 et 10h00 à Saint-Gilles, et suivi de l'affectation du naturaliste unique. |
| SPEC-ADM-03 *(Modification de réservation par l'admin)* | ajoutée *(nouvelle)* | Formulaire d'édition admin d'une réservation : ajustement des passagers adultes/enfants, recalcul des places consommées sur le créneau, sans portail d'auto-modification client. |
| SPEC-NOTIF-01 *(Système d'alertes & SMS)* | modifiée | Intégration d'un connecteur SMS transactionnel dédié à l'envoi du message d'information d'annulation au numéro du client. |
| SPEC-PAY-01 *(Paiement en ligne CB)* | inchangée | Paiement intégral (100 %) en ligne avec facture PDF automatique. |
| SPEC-REM-01 *(Remboursement bancaire)* | inchangée *(hors périmètre)* | Reste strictement hors système (gestion directe et manuelle par l'entreprise). |

---

## 5. Impact — conception

| Artefact | Impact | Ce qui change |
|---|---|---|
| `uml/domain.puml` | modifié | - Ajout de l'entité `Lieu` (Saint-Gilles, Saint-Leu) liée à `Creneau`.<br>- Entité `Creneau` : ajout de l'horaire 9h00 St-Leu, de la règle d'indisponibilité du Tikap le mar/jeu à 07h00 et 10h00 à St-Gilles (capacité = 24 places sur Grand Bleu), et des plages de privatisation matin 7h–12h.<br>- Entité `Reservation` : statut (`CONFIRMEE`, `ANNULEE`, `MODIFIEE`), référence mobile, et indicateurs d'annulation/modification admin.<br>- Entité `Tarif` : tarification géographique (+ 10 € / billet individuel à Saint-Leu ; forfait privatisation Tikap fixe à 600 € sur les deux ports). |
| `uml/sequences/` | modifié | - Diagramme de séquence : *Annulation de réservation par l'administrateur* (authentification admin, action annuler, libération synchrone du créneau, déclenchement webhook SMS vers le client).<br>- Diagramme de séquence : *Modification de réservation par l'administrateur* (ajustement passagers et recalcul de jauge). |
| MCD / MLD / MPD | modifié | - Table `Lieux` (`id`, `nom`, `adresse`, `actif`).<br>- Table `Creneaux` : colonne `lieu_id`, capacité max (12 à St-Leu, 24 à St-Gilles mar/jeu 07h00 et 10h00, 36 le reste du temps).<br>- Table `Reservations` : colonne `statut` (ENUM : `CONFIRMED`, `CANCELLED`), `cancelled_at`, `modified_by_admin` (BOOLEAN).<br>- Table `Tarifs` : grille tarifaire `(activite_id, categorie_age_id, lieu_id, prix)`. |
| Architecture | modifiée | - Passerelle SMS transactionnelle (`SmsNotificationService`) branchée sur les événements d'annulation admin.<br>- Moteur de calendrier multi-sites avec gestion des règles de flotte et de transit maritime. |

Question à traiter explicitement : la demande introduit-elle un **état nouveau** ou une **donnée nouvelle** qui n'existaient pas dans le modèle ?
- **Oui (données nouvelles) :** Notion de lieu/port de départ (`Saint-Gilles`, `Saint-Leu`), surcoût tarifaire géographique (+ 10 € / pers sur billets individuels), créneaux horaires spécifiques (9h00 à St-Leu, 7h–12h en privatisation matin, jauge 24 places mar/jeu 07h et 10h St-Gilles), numéro de mobile client validé pour SMS.
- **Oui (états nouveaux) :** Statut de réservation `ANNULEE` (actionné uniquement par l'admin avec réouverture automatique des places sur le créneau).

---

## 6. Impact — tests

| Cas de test | Impact |
|---|---|
| CASE-RES-01 *(Réservation nominale Saint-Gilles avec adultes et enfants)* | inchangé |
| CASE-RES-02 *(Refus de réservation pour enfant < 4 ans)* | inchangé |
| CASE-RES-03 *(Blocage jauge max 36 places à Saint-Gilles hors mar/jeu matin)* | inchangé |
| CASE-RES-04 *(Clôture automatique à H-2 du départ)* | inchangé |
| CASE-RES-06 *(Réservation au départ de Saint-Leu avec surtaxe +10 € / personne)* | à écrire *(nouveau)* |
| CASE-RES-07 *(Contrainte Saint-Leu : mardi/jeudi à 9h00 uniquement, max 12 places Tikap)* | à écrire *(nouveau)* |
| CASE-RES-07bis *(Contrainte Saint-Gilles mardi/jeudi 07h00 et 10h00 : blocage de la jauge à 24 places Grand Bleu seul)* | à écrire *(nouveau)* |
| CASE-RES-08 *(Réservation privatisation matin 7h–12h à Saint-Gilles et à Saint-Leu au tarif 600 € Tikap)* | à écrire *(nouveau)* |
| CASE-ANNUL-01 *(Annulation par l'administrateur dans le back-office et libération immédiate des places sur le créneau)* | à écrire *(nouveau)* |
| CASE-ANNUL-02 *(Déclenchement et envoi de notification SMS au client suite à annulation par l'administrateur)* | à écrire *(nouveau)* |
| CASE-ANNUL-03 *(Interdiction d'accès aux endpoints d'annulation pour les utilisateurs non authentifiés / clients)* | à écrire *(nouveau)* |
| CASE-MODIF-01 *(Modification par l'administrateur de la répartition passagers d'une réservation existante)* | à écrire *(nouveau)* |
| CASE-MODIF-02 *(Interdiction d'accès à la modification de réservation pour le client public)* | à écrire *(nouveau)* |
| CASE-NAT-01 *(Contrôle de non-conflit de planning pour le naturaliste unique entre Saint-Gilles et Saint-Leu)* | à écrire *(nouveau)* |

---

## 7. Impact — code

| Composant | Impact |
|---|---|
| `BookingEngine / SlotEngine` | Intégrer les règles multi-sites : Saint-Leu le mar/jeu à 9h (12 places Tikap) ; jauge Saint-Gilles le mar/jeu à 07h00 et 10h00 bridée à 24 places (Grand Bleu seul) ; créneaux de privatisation matin (7h–12h). |
| `PricingService` | Appliquer la majoration de + 10 € / personne sur les billets individuels à Saint-Leu ; maintenir le forfait de privatisation Tikap à 600 € sans majoration. |
| `AdminCancellationService` | Développer la méthode d'annulation back-office : passage au statut `ANNULEE`, réincrémentation atomique des places du créneau, et appel au service SMS. |
| `SmsNotificationService` | Développer le connecteur vers l'API SMS pour transmettre le message d'annulation au numéro de téléphone mobile du client. |
| `AdminReservationService` | Implémenter l'édition des réservations dans le back-office (ajustement passagers et recalcul des jauges). |
| `AdminPlanningService` | Adapter le tableau de bord avec filtres par lieu et visualisation des capacités réelles (24 places le mar/jeu à 07h00 et 10h00 à Saint-Gilles). |
| `PdfInvoiceGenerator` | Mentionner le port d'embarquement (Saint-Gilles / Saint-Leu) et le tarif applicable sur la facture PDF. |

---

## 8. Effets de bord identifiés

Ce que la demande touche sans que le client l'ait envisagé :

- **Jauge réduite à Saint-Gilles le mardi et le jeudi à 07h00 et 10h00 (la matinée) :** Le *Tikap* devant se rendre à Saint-Leu pour le départ de 09h00 (transit maritime aller matinal) puis effectuer la rotation et regagner Saint-Gilles (retour à quai ~11h-11h30 + transit maritime retour), il ne peut assurer ni le créneau de 07h00 ni celui de 10h00 à Saint-Gilles. La capacité des créneaux de 07h00 et 10h00 à Saint-Gilles ces jours-là doit être automatiquement plafonnée à **24 places** par le moteur de réservation (Grand Bleu uniquement).
- **Sécurité et simplicité du modèle d'annulation :** L'absence d'auto-annulation client simplifie la sécurité (aucun besoin de portail ou de token public révocable). L'annulation est une opération d'administration sécurisée par l'authentification admin.
- **Règle de tarification forfaitaire vs individuelle :** La majoration géographique (+10 €) s'appliquant uniquement aux personnes physiques sur les billets individuels, le forfait de privatisation Tikap reste à 600 € à Saint-Leu comme à Saint-Gilles.
- **Ressource critique du naturaliste unique :** Si une sortie baleines est programmée à 9h00 à Saint-Leu, le naturaliste y est mobilisé ; aucune sortie baleines ne peut avoir lieu en parallèle la matinée à Saint-Gilles.
- **Régularisation financière lors d'une modification admin :** Si l'admin ajoute des passagers sur une réservation déjà réglée, le système enregistre la modification de jauge sans flux bancaire automatique, le solde résiduel étant géré manuellement hors outil par l'entreprise.

---

## 9. Ce que nous ne ferons pas dans le temps restant

Assumé, et à confirmer avec le client lors de la prochaine étape :

- Aucun portail d'auto-annulation ou d'auto-modification par le client en ligne (tout passe par l'administrateur).
- Aucun remboursement bancaire automatisé via API (traitement manuel direct par l'entreprise).
- Aucun compte client avec mot de passe (maintien du parcours invité).
- Aucun calcul de transit maritime dynamique en temps réel.
- Aucune application mobile native.

---

## 10. Ordre d'exécution retenu

| # | Étape | Qui |
|---|---|---|
| 1 | Mise à jour du Cahier des Charges Fonctionnel (`cahier-des-charges-v3.md` : intégration de Saint-Leu, jauge mar/jeu 07h00 et 10h00 à 24 places, privatisations St-Leu 600 €, annulation/modification admin avec SMS client) | Thomas & Loïc |
| 2 | Rédaction des spécifications détaillées (`SPEC-ANNUL-01` admin, `SPEC-ADM-03`, `SPEC-RES-01` multi-sites) | Benjamin & Ivan |
| 3 | Harmonisation des modèles UML (`domain.puml`, diagrammes de séquence annulation admin et modification) | Thomas & Ivan |
| 4 | Mise à jour du MCD / MLD / MPD (table `Lieux`, jauges conditionnelles mar/jeu 07h/10h, statuts de réservation) | Benjamin |
| 5 | Actualisation du plan de tests et rédaction des cas de test (`CASE-RES-06` à `08`, `CASE-RES-07bis`, `CASE-ANNUL-01` à `03`, `CASE-MODIF-01` à `02`, `CASE-NAT-01`) | Loïc |
| 6 | Développement du moteur de réservation multi-sites, de la règle mar/jeu 07h00 et 10h00 (24 places) et de la majoration (+ 10 €) | Toute l'équipe |
| 7 | Développement du module d'annulation back-office admin (libération de jauge synchrone, passerelle SMS client) | Toute l'équipe |
| 8 | Développement de la modification de réservation et de la supervision multi-sites dans le back-office Desktop | Toute l'équipe |
| 9 | Campagne globale de tests d'intégration, vérification des non-régressions et recette fonctionnelle | Toute l'équipe |
