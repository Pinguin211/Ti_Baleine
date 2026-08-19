# Sommaire des cas de test — Administration (Back-office)

**Domaine :** `ADMIN`  
**Spécifications couvertes :**
- [`SPEC-ADMIN-01`](../../specs/admin.md#spec-admin-01--consultation-du-planning-et-supervision-multi-sites) — Consultation du planning et supervision multi-sites (`REQ-009`, `REQ-010`, `R-01`, `R-03`, `R-10`, `R-25`, `Contraintes C-03, C-04, C-05, C-16`, `REQ-103`)
- [`SPEC-ADMIN-02`](../../specs/admin.md#spec-admin-02--annulation-dune-r%C3%A9servation-suppression-totale-des-billets-et-notification-client) — Annulation d'une réservation (suppression totale des billets) et notification client (`REQ-013`, `REQ-014`, `REQ-020`, `R-16`, `R-17`, `R-27`, `R-28`, `Contraintes C-08, C-09, C-10, C-24`, `REQ-106`, `REQ-107`)
- [`SPEC-ADMIN-03`](../../specs/admin.md#spec-admin-03--r%C3%A9duction-du-nombre-de-passagers-suppression-partielle-de-billets) — Réduction du nombre de passagers (suppression partielle de billets) (`REQ-015`, `R-18`, `Contrainte C-08`, `REQ-107`)
- [`SPEC-ADMIN-04`](../../specs/admin.md#spec-admin-04--authentification-au-back-office-administrateur) — Authentification au back-office administrateur (`Contrainte C-16`, `REQ-103`)
- [`SPEC-ADMIN-05`](../../specs/admin.md#spec-admin-05--visualisation-du-taux-de-remplissage-et-jauges-par-cr%C3%A9neau) — Visualisation du taux de remplissage et jauges par créneau (`REQ-010`, `R-01`, `R-03`, `R-10`, `Contrainte C-05`, `REQ-107`)
- [`SPEC-ADMIN-06`](../../specs/admin.md#spec-admin-06--envoi-group%C3%A9-dalertes-de-pr%C3%A9-annulation-la-veille-%C3%A0-18h) — Envoi groupé d'alertes de pré-annulation la veille à 18h (`REQ-017`, `REQ-018`, `REQ-019`, `R-22`, `R-23`, `R-24`, `R-26`, `Contraintes C-21, C-22, C-23`, `REQ-106`)
- [`SPEC-ADMIN-07`](../../specs/admin.md#spec-admin-07--configuration-et-gestion-des-cr%C3%A9neaux) — Configuration et gestion des créneaux (`REQ-011`, `R-12`, `R-13`, `R-15`, `Contraintes C-18, C-19`)

---

| numero | testfile | description rapide | clause / exigence spec liée |
|---|---|---|---|
| 001 | CASE-ADMIN-001.md | Affichage consolidé de la grille multi-sites sur poste Desktop : créneaux de Saint-Gilles (7h, 10h, 14h) et Saint-Leu (9h mardi/jeudi) | `SPEC-ADMIN-01`, `Scénario 1`, `AC-1`, `REQ-009`, `R-01`, `C-03`, `C-04` |
| 002 | CASE-ADMIN-002.md | Consultation du détail d'un créneau avec affichage du type d'activité affecté et des navires mobilisés (Tikap et/ou Grand Bleu) | `SPEC-ADMIN-01`, `Scénario 2`, `AC-1`, `REQ-010` |
| 003 | CASE-ADMIN-003.md | Présence obligatoire de l'indicateur visuel clair et du badge distinctif « Sous pré-alerte » sur la carte d'un créneau sous alerte de pré-annulation | `SPEC-ADMIN-01`, `Scénario 2`, `AC-2`, `Cas limite #6`, `R-25` |
| 004 | CASE-ADMIN-004.md | Affichage d'un état vide explicite (aucun écran figé ni liste factice) lorsqu'aucun créneau n'est programmé pour la journée consultée | `SPEC-ADMIN-01`, `Cas limite #1` |
| 005 | CASE-ADMIN-005.md | Affichage distinctif d'un créneau sans navire affecté avec le statut explicite « non affecté » | `SPEC-ADMIN-01`, `Cas limite #2` |
| 006 | CASE-ADMIN-006.md | Affichage distinctif d'un créneau sans type d'activité renseigné avec le statut « type non renseigné » | `SPEC-ADMIN-01`, `Cas limite #3` |
| 007 | CASE-ADMIN-007.md | Consultation du planning en continu 24h/24 sans aucune restriction horaire pour l'administrateur connecté | `SPEC-ADMIN-01`, `Cas limite #4`, `Portée §1` |
| 008 | CASE-ADMIN-008.md | Gestion d'une perte de connexion réseau pendant le chargement du planning avec affichage d'un message d'erreur et bouton de nouvel essai | `SPEC-ADMIN-01`, `Cas limite #5` |
| 009 | CASE-ADMIN-009.md | Maintien de l'affichage du créneau au planning sous le seuil de 6 passagers sans annulation automatique par le système (décision manuelle hors système) | `SPEC-ADMIN-01`, `Portée §3`, `R-09` |
| 010 | CASE-ADMIN-010.md | Annulation complète d'une réservation à la demande du client suite à pré-alerte météo : suppression de l'intégralité des billets (BOOKING_ITEMS), conservation réservation à 0 billet, libération des places et envoi SMS | `SPEC-ADMIN-02`, `Scénario 1`, `AC-1`, `AC-2`, `AC-3`, `REQ-013`, `REQ-014`, `REQ-020`, `R-28` |
| 011 | CASE-ADMIN-011.md | Annulation administrative d'office pour cause météo/technique : saisie du motif « Annulation administrative météo », suppression de tous les billets, libération jauge et envoi SMS d'information | `SPEC-ADMIN-02`, `Scénario 2`, `AC-1`, `AC-2`, `AC-3`, `REQ-013`, `REQ-014`, `R-27` |
| 012 | CASE-ADMIN-012.md | Annulation standard d'une réservation hors alerte avec sélection d'un motif informatif et notification SMS client | `SPEC-ADMIN-02`, `Portée §4`, `AC-1`, `AC-3` |
| 013 | CASE-ADMIN-013.md | Non-persistance du motif d'annulation sur l'entité réservation en base (motif exploité exclusivement à la volée pour composer le SMS) | `SPEC-ADMIN-02`, `Règle`, `Portée §4`, `AC-1`, `REQ-020` |
| 014 | CASE-ADMIN-014.md | Conservation de la fiche réservation (BOOKINGS) en base avec historique de paiement initial et 0 billet actif (aucun enregistrement détruit) | `SPEC-ADMIN-02`, `Règle`, `Portée §3`, `AC-1` |
| 015 | CASE-ADMIN-015.md | Remise à disposition immédiate et synchrone de la totalité des places libérées sur l'interface publique de réservation (jusqu'à H-2) | `SPEC-ADMIN-02`, `AC-2`, `Portée §5`, `REQ-013` |
| 016 | CASE-ADMIN-016.md | [Choix déduit — En attente CDC] Annulation administrative autorisée sans délai minimal préalable jusqu'à l'heure exacte du départ (H-0) | `SPEC-ADMIN-02`, `Cas limite #1`, `Ce qui n'est pas défini §1`, `CDC v4 §11 Q1` |
| 017 | CASE-ADMIN-017.md | Blocage de l'action et désactivation du bouton d'annulation sur une réservation détenant déjà 0 billet actif | `SPEC-ADMIN-02`, `Cas limite #2` |
| 018 | CASE-ADMIN-018.md | [Choix déduit — En attente CDC] Rejet strict de la demande d'annulation administrative lorsque le créneau est déjà passé (date et heure de départ échues) | `SPEC-ADMIN-02`, `Cas limite #3`, `Ce qui n'est pas défini §1`, `CDC v4 §11 Q1` |
| 019 | CASE-ADMIN-019.md | Traitement d'un numéro mobile client invalide ou manquant : suppression des billets et libération de jauge validées en base, échec SMS consigné dans les logs | `SPEC-ADMIN-02`, `Cas limite #4`, `REQ-106` |
| 020 | CASE-ADMIN-020.md | Gestion d'un échec temporaire de la passerelle SMS : suppression des billets et libération validées, échec notifié à l'administrateur | `SPEC-ADMIN-02`, `Cas limite #5` |
| 021 | CASE-ADMIN-021.md | Garantie de cohérence transactionnelle en cas de coupure réseau : validation atomique (suppression billets + libération jauge) ou annulation globale (rollback) | `SPEC-ADMIN-02`, `Cas limite #6`, `REQ-107` |
| 022 | CASE-ADMIN-022.md | Absence de flux financier sortant automatisé lors de l'annulation (remboursements 100 % manuels hors système par l'entreprise) | `SPEC-ADMIN-02`, `Portée §7`, `Contrainte C-10`, `R-27`, `R-28` |
| 023 | CASE-ADMIN-023.md | Réduction partielle de passagers : suppression sélective de $N$ billets adultes d'une réservation (ex: 3 adultes 1 enfant -> 2 adultes 1 enfant) et libération synchrone de $N$ places | `SPEC-ADMIN-03`, `Scénario 1`, `AC-1`, `REQ-015` |
| 024 | CASE-ADMIN-024.md | Réduction partielle de passagers : suppression sélective de $N$ billets enfants d'une réservation et libération synchrone de $N$ places correspondantes | `SPEC-ADMIN-03`, `AC-1`, `REQ-015` |
| 025 | CASE-ADMIN-025.md | [Choix déduit — Format audit à confirmer] Réduction partielle mixte (adultes et enfants) avec recalcul immédiat des billets actifs restants, libération synchrone cumulée et trace d'audit | `SPEC-ADMIN-03`, `Portée §1`, `AC-1`, `Ce qui n'est pas défini §1`, `REQ-015` |
| 026 | CASE-ADMIN-026.md | Réduction ramenant le nombre de billets actifs à 0 : basculement automatique vers le traitement complet d'annulation (saisie motif + SMS notification SPEC-ADMIN-02) | `SPEC-ADMIN-03`, `Scénario 2`, `AC-3`, `Cas limite #2` |
| 027 | CASE-ADMIN-027.md | Rejet strict de toute tentative d'ajout de billet(s) sur une réservation existante depuis l'écran de réduction | `SPEC-ADMIN-03`, `Cas limite #1`, `AC-2`, `R-18` |
| 028 | CASE-ADMIN-028.md | Rejet strict de toute tentative de modification de la date ou du port de départ lors d'une opération de réduction | `SPEC-ADMIN-03`, `Cas limite #4`, `AC-2`, `R-18` |
| 029 | CASE-ADMIN-029.md | Blocage de l'action de réduction sur une réservation n'ayant déjà plus aucun billet actif (0 billet) | `SPEC-ADMIN-03`, `Cas limite #3` |
| 030 | CASE-ADMIN-030.md | Rejet strict de toute tentative de réduction de passagers sur un créneau dont la date et l'heure de départ sont déjà passées | `SPEC-ADMIN-03`, `Cas limite #5` |
| 031 | CASE-ADMIN-031.md | Garantie de cohérence transactionnelle de la jauge et des billets lors d'une réduction partielle en cas d'interruption réseau | `SPEC-ADMIN-03`, `Cas limite #6`, `REQ-107` |
| 032 | CASE-ADMIN-032.md | Absence de remboursement financier automatique consécutif à une réduction partielle de passagers (traitement manuel hors système) | `SPEC-ADMIN-03`, `Portée §6` |
| 033 | CASE-ADMIN-033.md | Connexion réussie de l'administrateur avec un identifiant e-mail et un mot de passe valides depuis un poste de bureau (Desktop) | `SPEC-ADMIN-04`, `Scénario 1`, `AC-1`, `Contrainte C-16`, `REQ-103` |
| 034 | CASE-ADMIN-034.md | Redirection automatique vers le planning consolidé / tableau de bord après authentification réussie | `SPEC-ADMIN-04`, `Scénario 1`, `AC-1` |
| 035 | CASE-ADMIN-035.md | Interception de toute tentative d'accès non authentifié aux URL protégées du back-office avec redirection obligatoire vers la mire de connexion | `SPEC-ADMIN-04`, `AC-2` |
| 036 | CASE-ADMIN-036.md | Saisie d'un identifiant ou mot de passe invalide : refus d'accès et affichage d'un message d'erreur générique sans divulgation d'information | `SPEC-ADMIN-04`, `Cas limite #1` |
| 037 | CASE-ADMIN-037.md | Blocage à la validation du formulaire de connexion côté client lorsque l'un des champs (e-mail ou mot de passe) est laissé vide | `SPEC-ADMIN-04`, `Cas limite #2` |
| 038 | CASE-ADMIN-038.md | Protection anti-bruteforce : ralentissement / blocage temporaire de l'accès après tentatives de connexion infructueuses répétées | `SPEC-ADMIN-04`, `Cas limite #3` |
| 039 | CASE-ADMIN-039.md | Expiration de session après un délai d'inactivité prolongée (durée paramétrée) : déconnexion automatique et redirection vers l'écran d'authentification | `SPEC-ADMIN-04`, `Cas limite #4` |
| 040 | CASE-ADMIN-040.md | Respect de la contrainte d'administrateur unique : accès restreint au profil unique sans mécanisme de création de sous-comptes | `SPEC-ADMIN-04`, `Portée §3`, `Contrainte C-16` |
| 041 | CASE-ADMIN-041.md | Calcul et affichage du taux de remplissage d'un créneau standard à Saint-Gilles rapporté à la jauge de 36 places (Tikap + Grand Bleu) via COUNT(BOOKING_ITEMS) | `SPEC-ADMIN-05`, `Scénario 1`, `AC-1`, `REQ-010` |
| 042 | CASE-ADMIN-042.md | Calcul et affichage du taux de remplissage le mardi et jeudi matin à Saint-Gilles (7h et 10h) adapté à la jauge réelle de 24 places (Grand Bleu seul) | `SPEC-ADMIN-05`, `Scénario 2`, `AC-1`, `R-10` |
| 043 | CASE-ADMIN-043.md | Calcul et affichage du taux de remplissage le mardi et jeudi matin à Saint-Leu (9h) adapté à la jauge réelle de 12 places (Tikap) | `SPEC-ADMIN-05`, `Portée §2`, `AC-1`, `R-01` |
| 044 | CASE-ADMIN-044.md | Affichage d'un créneau à 0 billet actif avec mention explicite 0 % et 0 place réservée | `SPEC-ADMIN-05`, `Cas limite #1` |
| 045 | CASE-ADMIN-045.md | Affichage d'un créneau complet (nombre de billets actifs = jauge maximale) avec affichage à 100 % et badge « Complet » | `SPEC-ADMIN-05`, `Cas limite #2` |
| 046 | CASE-ADMIN-046.md | Recalcul instantané en temps réel du nombre de billets actifs et du taux de remplissage lors d'une annulation ou d'une réduction de billets | `SPEC-ADMIN-05`, `Cas limite #3`, `AC-1`, `REQ-107` |
| 047 | CASE-ADMIN-047.md | Affichage spécifique d'un créneau privatisé (forfait navire) indiquant « Navire privatisé » et bloquant la totalité de la jauge | `SPEC-ADMIN-05`, `Cas limite #4`, `R-12` |
| 048 | CASE-ADMIN-048.md | Envoi groupé d'une alerte météo bilingue la veille à 18h sur plusieurs créneaux ciblés du lendemain (multi-créneaux Saint-Gilles et/ou Saint-Leu) | `SPEC-ADMIN-06`, `Scénario 1`, `AC-1`, `Cas limite #5`, `REQ-017`, `R-22`, `R-24` |
| 049 | CASE-ADMIN-049.md | Envoi d'une alerte de pré-annulation via le canal SMS uniquement aux clients réservataires | `SPEC-ADMIN-06`, `Portée §2`, `AC-1`, `REQ-017` |
| 050 | CASE-ADMIN-050.md | Envoi d'une alerte de pré-annulation via le canal E-mail uniquement aux clients réservataires | `SPEC-ADMIN-06`, `Portée §2`, `AC-1`, `REQ-017` |
| 051 | CASE-ADMIN-051.md | Envoi combiné simultané d'une alerte de pré-annulation par SMS et E-mail aux clients réservataires | `SPEC-ADMIN-06`, `Scénario 1`, `AC-1`, `REQ-017` |
| 052 | CASE-ADMIN-052.md | Préremplissage instantané de la zone de texte éditable par sélection du template type codé en dur « Météo défavorable » | `SPEC-ADMIN-06`, `Scénario 1`, `AC-2`, `REQ-018`, `R-23` |
| 053 | CASE-ADMIN-053.md | Préremplissage instantané de la zone de texte éditable par sélection du template type codé en dur « Incident technique » | `SPEC-ADMIN-06`, `Portée §3`, `AC-2`, `REQ-018`, `R-23` |
| 054 | CASE-ADMIN-054.md | Personnalisation et ajustement libre du texte/motif par l'administrateur dans le champ éditable avant l'envoi | `SPEC-ADMIN-06`, `Scénario 1`, `Portée §4` |
| 055 | CASE-ADMIN-055.md | Présence obligatoire du message bilingue combiné (texte français suivi obligatoirement de la version anglaise) dans le corps unique de message | `SPEC-ADMIN-06`, `Scénario 1`, `AC-3`, `REQ-018`, `R-26` |
| 056 | CASE-ADMIN-056.md | Basculement automatique du statut des créneaux ciblés à « sous pré-alerte » dès la confirmation de l'envoi de l'alerte | `SPEC-ADMIN-06`, `Scénario 1`, `AC-4`, `REQ-019`, `R-25` |
| 057 | CASE-ADMIN-057.md | Activation immédiate de l'affichage de la mention d'avertissement sur le site public pour les créneaux sous pré-alerte ayant des places ouvertes | `SPEC-ADMIN-06`, `Scénario 1`, `AC-4`, `REQ-019`, `R-25` |
| 058 | CASE-ADMIN-058.md | Désactivation du bouton de déclenchement d'envoi lorsqu'aucun créneau du lendemain n'est sélectionné | `SPEC-ADMIN-06`, `Cas limite #1` |
| 059 | CASE-ADMIN-059.md | Déclenchement d'une alerte sur un créneau sans aucune réservation : passage au statut « sous pré-alerte » sans émission de message (liste vide) | `SPEC-ADMIN-06`, `Cas limite #2` |
| 060 | CASE-ADMIN-060.md | Blocage de la validation de l'envoi d'alerte lorsque le corps du message est vide ou effacé | `SPEC-ADMIN-06`, `Cas limite #3` |
| 061 | CASE-ADMIN-061.md | Traitement d'un échec individuel de délivrance (numéro invalide ou rejet mail) : journalisation de l'échec sans blocage de la file d'envoi | `SPEC-ADMIN-06`, `Cas limite #4`, `REQ-106` |
| 062 | CASE-ADMIN-062.md | Fermeture administrative manuelle d'un créneau ouvert sans passager : passage au statut « fermé » et disparition immédiate du site public | `SPEC-ADMIN-07`, `Scénario 1`, `AC-1`, `REQ-011`, `R-13` |
| 063 | CASE-ADMIN-063.md | Réouverture manuelle exceptionnelle d'un créneau précédemment fermé depuis le tableau de bord administrateur | `SPEC-ADMIN-07`, `AC-1`, `REQ-011`, `R-13` |
| 064 | CASE-ADMIN-064.md | Configuration et modification de l'affectation du type d'activité (Baleines, Dauphins, Privatisation) sur un créneau | `SPEC-ADMIN-07`, `Portée §2`, `AC-1` |
| 065 | CASE-ADMIN-065.md | Configuration et affectation des navires mobilisés (Tikap / Grand Bleu) sur un créneau horaire | `SPEC-ADMIN-07`, `Portée §2`, `AC-1` |
| 066 | CASE-ADMIN-066.md | Blocage strict de toute tentative d'affecter deux activités différentes sur le même navire et le même créneau (règle d'exclusivité d'activité) | `SPEC-ADMIN-07`, `Cas limite #1`, `AC-2`, `R-12` |
| 067 | CASE-ADMIN-067.md | Alerte et blocage de toute tentative de programmation simultanée de deux sorties Baleines nécessitant le naturaliste unique sur deux sites distants | `SPEC-ADMIN-07`, `Cas limite #2`, `R-15`, `Contrainte C-19` |
| 068 | CASE-ADMIN-068.md | Cloisonnement de sécurité et interdiction formelle d'accès aux réglages de configuration des créneaux pour les utilisateurs clients du site public | `SPEC-ADMIN-07`, `Portée §4`, `Contrainte C-16`, `REQ-103` |
| 069 | CASE-ADMIN-069.md | Rejet et blocage à la saisie lors d'une tentative de suppression d'un nombre de billets supérieur au nombre de billets actifs de la réservation (ex. demander le retrait de 3 billets sur une commande de 2) | `SPEC-ADMIN-03`, `AC-1`, `REQ-015`, `R-18`, `REQ-107` |
| 070 | CASE-ADMIN-070.md | Déconnexion manuelle explicite de l'administrateur depuis le back-office : destruction de session et redirection immédiate vers la mire d'authentification | `SPEC-ADMIN-04`, `Cas limite #5`, `AC-3`, `Contrainte C-16` |
| 071 | CASE-ADMIN-071.md | Maintien de l'état authentifié lors de la navigation inter-pages et du rafraîchissement manuel du navigateur (F5 / persistance de session active) | `SPEC-ADMIN-04`, `AC-1`, `Contrainte C-16` |
| 072 | CASE-ADMIN-072.md | Calcul et affichage du taux de remplissage le mardi et jeudi après-midi à Saint-Gilles (créneau de 14h) basé sur la jauge pleine de 36 places (retour du Tikap depuis Saint-Leu) | `SPEC-ADMIN-05`, `Portée §2`, `R-01`, `R-10` |
| 073 | CASE-ADMIN-073.md | Comportement lors de la ré-émission d'une alerte sur un créneau déjà sous statut « sous pré-alerte » (réexpédition du message ajusté avec maintien idempotent du statut) | `SPEC-ADMIN-06`, `Portée §1`, `Cas limite #6`, `AC-1`, `REQ-017`, `R-25` |
