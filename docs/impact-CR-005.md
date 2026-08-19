# Analyse d'impact — CR-005

**Évolution et consolidation suite à l'entretien n° 5 du 19/08/2026.**

**Demande du client :** Passage d'un **paiement intégral en ligne** à un **paiement scindé en deux temps** : versement d'un acompte en ligne à la réservation (**30 %** en régime général, **50 %** pour les formules de privatisation), puis règlement du solde restant (**70 %** ou **50 %**). Le solde est réglé soit via un lien de paiement envoyé automatiquement la veille de la sortie par **SMS**, soit directement sur place par carte bancaire le jour du départ. Le client est libre de régler le solde en ligne via le lien ou de ne pas y prêter attention pour régler sur place à l'embarcadère. Cas particulier des réservations le jour même : acompte dû en ligne, solde réglé obligatoirement sur place (aucun SMS ni lien généré). 

Impacts et arbitrages associés :
1. **Politique de remboursement :** Même si cela peut sembler contre-intuitif quand seul un acompte est versé, le client exige formellement que le calcul du montant de remboursement reste assis sur le **montant total de la réservation** selon le barème contractuel, avec retenue de la pénalité sur les sommes déjà perçues (`remboursement = max(0, montant payé − (100 % − taux du barème) × montant total)`).
2. **Facturation :** Déduction métier de l'émission de **deux factures distinctes** : une première facture émise pour l'acompte lors de la réservation, et une seconde facture distincte émise pour le solde lors de son règlement effectif.
3. **Canal de diffusion du solde :** Déduction du canal d'envoi automatique à J-1 par **SMS**.
4. **Sécurité technique du lien :** Question technique arbitrée côté code avec une **durée de validité du lien fixée à 1 heure**.
5. **Modalités de règlement du solde & Rôle de l'administrateur :** Le client a le choix d'utiliser le lien SMS ou de l'ignorer pour payer sur place ; l'administrateur doit simplement pouvoir **consulter le jour J si chaque réservation est payée complètement ou partiellement** (avec possibilité de pointer l'encaissement CB sur place et d'annuler).
6. **Interface et ergonomie back-office :** Les détails d'ergonomie et d'IHM (badges, disposition, filtres) sont formellement à définir et cadrer dans le **Cahier des Charges (CDC)**.

**Reçue le :** 19/08/2026 (Entretien n° 5)  
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

Le commanditaire remet en cause le principe de paiement intégral en ligne (règle RM-05 / contrainte 6 du CDC v4) pour instaurer un modèle de **paiement en deux temps** :
1. **L'acompte à la réservation en ligne :** un montant de **30 %** du total pour les sorties standard (Baleines, Dauphins, Sunset), et de **50 %** pour les sorties en **privatisation**.
2. **Le solde :** le client reçoit la veille de la sortie un **SMS** contenant un lien de paiement sécurisé. Le client a le choix de payer le solde en ligne via ce lien ou de ne pas y prêter attention afin de **régler le solde sur place par carte bancaire** le jour de l'excursion.
3. **Cas particulier (réservation le jour même) :** l'acompte reste dû en ligne lors de la réservation, mais le solde est réglé **exclusivement sur place**, le système n'envoyant aucun SMS.

**Remboursement en cas d'annulation (point contre-intuitif mais exigé par le client) :**  
Le barème contractuel standard (RM-07/RM-08/RM-09) demeure calculé sur la base du **montant total de la réservation**. Si le montant déjà encaissé (l'acompte de 30 % ou 50 %) ne couvre pas la pénalité contractuelle retenue par le prestataire (`(100 % − taux du barème) × montant total`), la somme versée est intégralement conservée sans exiger de paiement complémentaire au client, aboutissant à un remboursement effectif de 0 €. La gestion du remboursement reste effectuée manuellement hors système.

**Facturation :**  
Le système déduit l'émission de **deux factures distinctes** :
- Une **facture d'acompte** émise immédiatement après le paiement en ligne initial de 30 % (ou 50 %).
- Une **facture de solde** (facture distincte pour le restant dû) émise lors du règlement du solde (en ligne via le lien SMS ou sur place en CB).

**Consultation en Back-Office et ergonomie :**  
Le jour J, l'administrateur doit simplement pouvoir consulter dans son interface si chaque réservation est **payée complètement** (solde réglé) ou **payée partiellement** (seul l'acompte a été versé, solde à encaisser sur place en CB), tout en conservant la possibilité d'annuler un dossier. Les choix précis d'ergonomie et de restitution visuelle sont à définir dans le cahier des charges.

---

## 2. Questions posées au client

| # | Question posée | Réponse |
|---|---|---|
| Q01 | Comment se déroule le remboursement dans ce nouveau modèle de paiement en deux temps ? | *Réponse initiale infirmée par la suite (voir Q04) : le barème devait s'appliquer au montant payé.* |
| Q02 | Le taux d'acompte de 30 % s'applique-t-il aussi aux privatisations ? | **Non, l'acompte pour les privatisations est de 50 %** de la réservation. |
| Q03 | Pour une réservation le jour même, la personne paie-t-elle toujours un acompte ? Si oui, doit-on lui envoyer un lien ? | **Un acompte reste toujours dû**. En revanche, la personne devra **payer le solde sur place : pas d'envoi de lien** dans ce cas. |
| Q04 | Retour sur Q01 : le remboursement se calcule-t-il sur le montant déjà payé, ou sur le montant total de la réservation ? | Le client confirme fermement que le remboursement se calcule toujours par **pourcentage du montant total de la réservation** (même si contre-intuitif). Si l'acompte payé (ex. 30 %) est inférieur ou égal à la pénalité retenue (ex. barème 50 % = pénalité 50 %), **aucun remboursement n'est effectué**. |
| Q05 | Que souhaitez-vous pouvoir visualiser dans l'interface de consultation des réservations concernant l'état des paiements ? | En plus de la possibilité d'annuler une réservation, l'interface doit permettre de **consulter directement si chaque réservation est payée complètement (solde réglé) ou partiellement (acompte versé seul)**. |

---

## 3. Impact — cahier des charges

| Exigence / Section CDC | Impact | Action |
|---|---|---|
| **Contexte & Problème (CDC §1 & §2)** | modifiée | Remplacer la mention du paiement intégral systématique par la description du paiement scindé (acompte en ligne à 30 % / 50 %, puis solde la veille par SMS ou sur place en CB au choix du client). |
| **Objectifs (CDC §3)** | modifiée | Mettre à jour l'objectif 1 : la réservation en ligne se valide par le versement d'un acompte partiel (30 % ou 50 %) et non plus de l'intégralité du montant. |
| **Parties prenantes & Personas (CDC §4 & §5)** | modifiée | - Client : paie l'acompte en ligne, reçoit la veille un SMS avec le lien de paiement du solde (qu'il est libre d'utiliser ou d'ignorer pour régler sur place en CB).<br>- Administrateur : consulte le statut financier des réservations (payée complètement / payée partiellement) le jour J et procède aux encaissements CB sur place ou aux annulations. |
| **Périmètre (CDC §6)** | modifiée | - *Dans le périmètre :* calcul et encaissement en ligne des acomptes (30 % / 50 %), génération et émission d'une **facture d'acompte**, module d'envoi automatique du lien de solde à J-1 par **SMS** (hors réservation jour même), page de paiement du solde en ligne avec validation technique du lien (1 heure), émission d'une **facture de solde distincte**, enregistrement du paiement du solde en back-office le jour J, consultation des statuts financiers (partiel/complet) par l'administrateur.<br>- *Hors périmètre :* prélèvement automatique différé sans action client, relances multicanales répétées, gestion automatisée des remboursements bancaires (traitement manuel hors outil). |
| **Contraintes (CDC §7)** | modifiée | - Remplacer la Contrainte 6 (paiement 100 % en ligne) par les contraintes C-37 (acompte 30 % / solde 70 %), C-39 (acompte 50 % pour les privatisations) et C-40 (solde sur place obligatoire sans SMS pour les réservations du jour même).<br>- Ajouter la contrainte C-41 sur le calcul du remboursement sur le montant total plafonné aux sommes perçues.<br>- Ajouter la contrainte C-42 sur la consultation de l'état de paiement (partiel / complet) dans l'interface d'administration.<br>- Cadrer la contrainte C-43 relative à l'émission de deux factures distinctes (acompte et solde). |
| **Règles métier (CDC §8)** | modifiée | - Remplacer R-07 par les règles RM-51, RM-53 et RM-54 (modalités d'acompte 30 % / 50 %, solde par SMS ou sur place, exception jour même).<br>- RM-55 : Calcul du remboursement assis sur le **montant total** de la réservation (`remboursement = max(0, montant payé − (100 % − taux du barème) × montant total)`).<br>- RM-56 : Consultation en back-office de l'état de paiement (partiellement payée / complètement payée) avec conservation de l'action d'annulation.<br>- RM-57 : Émission de deux factures distinctes pour chaque dossier soldé. |
| **Ergonomie & IHM (CDC §9 & §10)** | modifiée | Définir formellement dans le CDC l'ergonomie de l'écran de consultation administrateur (disposition, lisibilité des statuts partiel/complet, interactions d'encaissement et d'annulation). |
| REQ-006 *(Paiement de la commande)* | modifiée | Le client règle **l'acompte obligatoire** (30 % standard, 50 % privatisation) par carte bancaire pour confirmer sa commande. |
| REQ-008 *(Facturation & Justificatifs)* | modifiée | Émettre **deux factures distinctes** : une première facture pour l'acompte lors de la confirmation initiale, et une seconde facture distincte pour le solde lors de son règlement effectif. |
| REQ-021 *(Envoi automatique du lien de solde à J-1 par SMS)* | ajoutée *(nouvelle)* | Déclencher l'envoi automatique d'un **SMS** la veille du départ contenant le lien sécurisé de règlement du solde aux réservataires n'ayant versé que l'acompte (sauf réservations du jour même). |
| REQ-022 *(Enregistrement du paiement du solde sur place)* | ajoutée *(nouvelle)* | Permettre à l'administrateur de valider le règlement du solde par carte bancaire sur place pour les clients n'ayant pas payé via le lien SMS. |
| REQ-023 *(Consultation du statut de paiement)* | ajoutée *(nouvelle)* | Permettre à l'administrateur de consulter le jour J si les réservations sont payées complètement ou partiellement, selon l'ergonomie définie dans le CDC. |
| **Questions ouvertes (CDC §11)** | modifiée | Enregistrer les questions issues du CR-05 (heure exacte d'envoi du SMS la veille, articulation détaillée avec l'alerte météo de 18h). |

---

## 4. Impact — spécifications

| Spécification | Impact | Ce qui change exactement |
|---|---|---|
| SPEC-RES-01 *(Tunnel de réservation client)* | modifiée | Calcul dynamique et affichage de l'acompte exigé (30 % standard, 50 % privatisation) et du solde restant dû avant paiement. |
| SPEC-PAY-01 *(Passerelle de paiement — Acompte)* | modifiée | Capture bancaire du montant de l'acompte. Réservation positionnée à l'état `ACOMPTE_PAYE`. Génération automatique de la **facture d'acompte** distincte. |
| SPEC-NOTIF-03 *(Envoi automatique du lien de solde par SMS)* | ajoutée *(nouvelle)* | Tâche planifiée quotidienne (J-1) déclenchant l'envoi d'un **SMS** avec URL sécurisée pour régler le solde restant (70 % ou 50 %). Exclusion des réservations créées le jour J. |
| SPEC-PAY-02 *(Paiement du solde en ligne & Validation technique)* | ajoutée *(nouvelle)* | Page web de paiement du solde sécurisée. **Règle technique déduite côté code : le lien de paiement a une durée de validation de 1 heure** (au-delà, renouvellement sécurisé ou paiement sur place). Après règlement du solde, la réservation passe à l'état `SOLDE_REGLE` et génère la **facture de solde distincte**. |
| SPEC-ADM-02 *(Consultation des réservations & Ergonomie back-office)* | modifiée | Interface permettant à l'administrateur de consulter le jour J les dossiers payés complètement vs partiellement, d'enregistrer le règlement CB sur place et de procéder aux annulations. Les détails d'ergonomie et de composants UI sont spécifiés selon les maquettes arrêtées dans le CDC. |
| SPEC-ANNUL-01 *(Annulation & Calcul de remboursement)* | modifiée | Intégration de la formule de calcul indicatif basée sur le **montant total de la réservation** (RM-55) : `remboursement = max(0, montant_paye - ((100 - taux_bareme) * montant_total / 100))`. Le traitement bancaire effectif reste manuel hors outil. |

---

## 5. Impact — tests

| Cas de test | Impact |
|---|---|
| CASE-PAY-01 *(Paiement en ligne : encaissement acompte 30 % standard + émission facture d'acompte)* | à écrire *(nouveau)* |
| CASE-PAY-02 *(Paiement en ligne : encaissement acompte 50 % privatisation + émission facture d'acompte)* | à écrire *(nouveau)* |
| CASE-PAY-03 *(Réservation J-même : encaissement acompte et absence d'envoi de SMS de solde)* | à écrire *(nouveau)* |
| CASE-PAY-04 *(Génération et envoi automatique du SMS avec lien de solde à J-1)* | à écrire *(nouveau)* |
| CASE-PAY-05 *(Paiement du solde via le lien SMS dans le délai de validation d'1 heure + émission facture de solde distincte)* | à écrire *(nouveau)* |
| CASE-PAY-06 *(Expiration technique du lien de solde après 1 heure)* | à écrire *(nouveau)* |
| CASE-PAY-07 *(Option client : non-utilisation du lien SMS et encaissement du solde par CB sur place le jour J)* | à écrire *(nouveau)* |
| CASE-DOC-01 *(Vérification de l'émission de deux factures distinctes : facture d'acompte puis facture de solde)* | à écrire *(nouveau)* |
| CASE-REFUND-01 *(Annulation : acompte 30 % perçu / barème 50 % sur total ⇒ pénalité 50 % total ⇒ remboursement 0 €)* | à écrire *(nouveau)* |
| CASE-REFUND-02 *(Annulation : acompte 30 % perçu / barème 75 % sur total ⇒ pénalité 25 % total ⇒ remboursement 5 % du total)* | à écrire *(nouveau)* |
| CASE-REFUND-03 *(Annulation post-alerte météo : remboursement 100 % du montant perçu)* | à écrire *(nouveau)* |
| CASE-RES-06 *(Ancienne validation du paiement 100 % à la réservation)* | supprimé / remplacé |

---

## 6. Impact — code

| Composant | Impact |
|---|---|
| `BookingPricingService` | Calcul du `montant_total`, de l'`acompte_du` (30 % ou 50 %) et du `solde_restant`. |
| `PaymentGatewayService` | Gestion des deux flux d'encaissement : acompte initial et solde restant. |
| `SmsNotificationService` / `PaymentLinkSmsScheduler` | Tâche planifiée quotidienne (J-1) pour composer et expédier les SMS contenant les liens de paiement de solde. |
| `BalancePaymentController` / `Frontend Public (Solde)` | Endpoint et vue sécurisée de paiement du solde intégrant la **validation technique du token (durée 1 heure)**. |
| `Frontend Admin (UI)` | Écran de consultation des réservations permettant de visualiser l'état de paiement complet/partiel le jour J et d'enregistrer le solde CB sur place, conformément à l'ergonomie définie dans le CDC. |
| `AdminCancellationService` | Moteur de calcul indicatif de remboursement basé sur le montant total de la réservation (RM-55). |
| `InvoicePdfGenerator` | Moteur d'édition comptable générant **deux factures distinctes** : gabarit pour la facture d'acompte et gabarit pour la facture de solde distincte. |

---

## 7. Effets de bord identifiés

Ce que la demande touche sans que le client l'ait explicitement anticipé :

- **Règle de remboursement sur montant total (contre-intuitive) :** Même si le client n'a versé que 30 % d'acompte, le calcul contractuel s'opère sur le montant global du dossier. Cela conduit à un remboursement nul dès lors que la pénalité retenue dépasse l'acompte (ex. barème 50 % = pénalité 50 % > acompte 30 % ⇒ 0 € remboursé). Le système applique strictement cette formule sans réclamer de complément au client.
- **Double facturation distincte :** Émission obligatoire de deux pièces distinctes (facture d'acompte à la réservation, puis facture de solde lors du paiement final), nécessitant une numérotation et un archivage séparés pour chaque document.
- **Canal SMS et coûts associés :** L'envoi automatique du lien par SMS engendre un coût direct par message envoyé la veille à J-1, à prévoir dans le budget d'exploitation de la passerelle SMS.
- **Validation technique du lien (1 heure) :** Choix d'architecture technique limitant la validité du lien de paiement à 1 heure pour éviter les paiements tardifs ou incohérents. Si le délai est dépassé, le client conserve la possibilité de solder directement sur place.
- **Liberté de paiement du solde (lien ou sur place) :** Le client n'est pas contraint de payer en ligne la veille ; il peut simplement ignorer le SMS et régler sur place. L'embarcadère doit être équipé de TPE et l'administrateur doit vérifier le statut complet/partiel le jour J.
- **Ergonomie back-office à cadrer :** L'interface admin doit offrir une lecture immédiate et sans surcharge des statuts partiel/complet le jour J. L'ergonomie précise sera arrêtée dans le CDC pour garantir une utilisation fluide sur le terrain.

---

## 8. Ce que nous ne ferons pas dans le temps restant

Assumé, et à confirmer avec le client lors de la prochaine étape :

- Aucun mécanisme de prélèvement automatique ou d'empreinte bancaire différée sans action explicite du client.
- Aucun encaissement sur place par espèces ou chèques vacances (le paiement sur place reste restreint à la carte bancaire).
- Aucune automatisation bancaire des remboursements (les remboursements restent traités manuellement par le gérant hors outil).
- Aucun système de relance multicanale répétée pour le solde (un seul SMS automatique envoyé la veille).

---

## 9. Ordre d'exécution retenu

| # | Étape | Qui |
|---|---|---|
| 1 | Mise à jour du Cahier des Charges Fonctionnel (`cahier-des-charges-v5.md` : intégration des règles d'acompte RM-51/RM-53/RM-54, formule de remboursement sur montant total RM-55, deux factures distinctes RM-57, envoi par SMS, et définition de l'ergonomie de l'écran admin) | Thomas & Loïc |
| 2 | Rédaction des spécifications détaillées (`SPEC-NOTIF-03` SMS J-1, `SPEC-PAY-02` paiement du solde avec validité technique 1h, `SPEC-RES-01`, `SPEC-ADM-02` consultation complet/partiel) | Benjamin & Ivan |
| 3 | Harmonisation des diagrammes de séquence UML (tunnel acompte + facture d'acompte, envoi SMS J-1, paiement solde + facture de solde distincte, consultation jour J) | Thomas & Ivan |
| 4 | Mise à jour du MCD / MLD / MPD (champs `montant_total`, `acompte_paye`, `solde_paye`, `statut_paiement`, gestion des deux factures, token solde) | Benjamin |
| 5 | Actualisation du plan de tests et rédaction des cas de test (`CASE-PAY-01` à `CASE-PAY-07`, `CASE-DOC-01`, `CASE-REFUND-01` à `CASE-REFUND-03`) | Loïc |
| 6 | Développement de la gestion des acomptes (30 % / 50 %) et de la facture d'acompte dans le tunnel public | Toute l'équipe |
| 7 | Développement de la tâche planifiée d'envoi des SMS à J-1 et de l'interface de paiement du solde (validité 1h) avec facture de solde distincte | Toute l'équipe |
| 8 | Enrichissement du back-office (consultation statut complet/partiel le jour J selon ergonomie CDC, pointage solde sur place et calcul indicatif remboursement) | Toute l'équipe |
| 9 | Campagne globale de tests d'intégration, vérification des non-régressions et recette fonctionnelle | Toute l'équipe |