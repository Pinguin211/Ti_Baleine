# Sommaire — cas de test Réservation (CASE-RES-400 à 449)

**Statut :** mis à jour le 20/08/2026 suite à `SPEC-RESERVATION-03` v4 (CDC v5) — 22 cas prévus (CASE-RES-400 à CASE-RES-421)
**Périmètre :** parcours de réservation grand public multi-sites et paiement scindé
(`specs/reservation.md`, `SPEC-RESERVATION-03` uniquement). Annulation
(`SPEC-ADMIN-02`), réduction de passagers (`SPEC-ADMIN-03`), émission des
alertes de pré-annulation (`SPEC-ADMIN-06` — seul l'affichage d'une alerte
déjà émise est testé ici, via `CASE-RES-402`) et facturation (`SPEC-FAC-02`)
sont hors périmètre — couvertes ailleurs :
l'annulation administrateur (`SPEC-ADMIN-02`) et les alertes par le bloc
`051–100` et `251–300` de [tests/cases/admin/sommaire.md](../admin/sommaire.md),
la facturation par
[tests/cases/facturation/sommaire.md](../facturation/sommaire.md).
L'annulation *par le client* (régime de remboursement) est couverte par
[CASE-CANCEL-01.md](../CASE-CANCEL-01.md), qui cite `SPEC-CANCEL-03`
et non `SPEC-ADMIN-02`.

Ce fichier ne contient aucun cas rédigé : c'est la liste de ce qui serait
rédigé, un fichier par ligne cochée, sur le modèle de
[CASE-CANCEL-01.md](../CASE-CANCEL-01.md). Coche (`[x]`) ce que tu
valides, supprime ou commente ce que tu ne veux pas, et les fichiers
`CASE-RES-4XX.md` correspondants sont générés ensuite.

---

## Numérotation retenue

Bloc `400–449` réservé au domaine réservation, sur ta consigne. À noter pour
la cohérence globale du dépôt : le préfixe (`ADMIN`, `FAC`, `RES`, `CANCEL`)
suffit à lui seul à éviter toute collision d'ID entre domaines — `CASE-ADMIN-051`
et `CASE-RES-051` seraient deux identifiants distincts même sans séparation
numérique. La numérotation actuelle n'est donc pas unifiée par un schéma
global documenté : `tests/cases/admin/sommaire.md` occupe `001–399`,
`tests/cases/facturation/sommaire.md` occupe `700–723` (sans lien avec le
bloc admin), et ce fichier occupe `400–449`. La plage `450–699` reste libre et
non attribuée.

⚠️ Deux points d'attention vis-à-vis de `tools/traceability.sh` (ajustements
du script hors périmètre réservation, à signaler à l'équipe) :

- **Regex des IDs** — même point que pour `tests/cases/admin/sommaire.md` (et
  valable aussi pour le bloc facturation `700–723`) : le script détecte les
  IDs de cas via `CASE[-_][A-Z0-9]+[-_][0-9][0-9]` (non ancrée, deux chiffres
  minimum). Sur un ID à trois chiffres comme `CASE-RES-400`, elle capture
  seulement les deux premiers chiffres, ce qui déclenche une fausse rupture
  tant que le script n'est pas ajusté (`[0-9]{2,3}` + ancrage, en conservant
  le `[-_]`).
- **Emplacement des fichiers** — les `CASE-RES-4XX.md` sont dans ce dossier,
  `tests/cases/reservation/`, alors que l'étape SPEC → CASE du script ne
  scanne que `tests/cases/CASE-*.md` (à plat, sans sous-dossiers — les
  sommaires admin et facturation ont le même problème). Ces fichiers restent
  donc invisibles pour la traçabilité tant que le script n'inclut pas les
  sous-dossiers de `tests/cases/`.

Chaque cas ci-dessous référence le ou les `AC-n` de `SPEC-RESERVATION-03`
qu'il couvre, et précise s'il vient d'un scénario nominal, d'un cas limite ou
d'un complément de portée.

---

## Bloc 400–449 — SPEC-RESERVATION-03 : Parcours de réservation grand public

### Scénarios nominaux

- [x] **CASE-RES-400** — Réservation individuelle standard au départ de
  Saint-Gilles : créneau 10h00, 1 adulte (65 €) + 1 enfant de 8 ans (40 €),
  montant total calculé de 105,00 €, acompte obligatoire de 30 % (31,50 €)
  réglé par carte bancaire, solde restant dû de 73,50 € → réservation enregistrée
  à l'état « payée partiellement », jauge décrémentée de 2 places. *Nominal 1 —
  AC-2, AC-4, AC-8. Risque : élevé.*
- [x] **CASE-RES-401** — Réservation individuelle au départ de Saint-Leu avec
  majoration géographique (+ 10 € / pers.) : mardi 18 août 9h00 (créneau standard,
  non privatisé — à distinguer du mardi 25 août utilisé par `CASE-RES-403`),
  2 adultes à 75 € (150,00 € total), acompte obligatoire de 30 % (45,00 €) réglé
  par carte bancaire, solde restant dû de 105,00 € → réservation enregistrée à
  l'état « payée partiellement », jauge décrémentée de 2 places sur les 12
  disponibles. *Nominal 2 — AC-2, AC-4, AC-8. Risque : élevé.*
- [x] **CASE-RES-402** — Réservation sur un créneau sous alerte de
  pré-annulation météo (émise la veille 18h, 4 places restantes) : mention
  d'avertissement affichée avant paiement, réservation de 2 places adultes
  (130,00 € total), acompte obligatoire de 30 % (39,00 €) réglé par carte bancaire,
  solde restant dû de 91,00 € → réservation enregistrée à l'état « payée
  partiellement », mention d'avertissement toujours affichée après réservation.
  *Nominal 6 — AC-7, AC-8. Risque : élevé.*
- [x] **CASE-RES-403** — Réservation d'une privatisation demi-journée Tikap à
  Saint-Leu (mardi 25 août, matin dès 9h00 — créneau distinct de celui réservé
  en individuel par `CASE-RES-401`) : forfait 600,00 € sans majoration
  géographique, acompte obligatoire de 50 % (300,00 €) réglé par carte bancaire,
  solde restant dû de 300,00 € → réservation enregistrée à l'état « payée
  partiellement », capacité du créneau intégralement bloquée. *Nominal 3 —
  AC-5, AC-8. Risque : élevé.*
- [x] **CASE-RES-418** — Réception du SMS à J-1 et paiement du solde en ligne
  dans le délai de 1 heure : exécution de la tâche planifiée J-1, envoi automatique
  d'un SMS avec lien sécurisé temporaire (REQ-021), accès à la page de solde
  bilingue FR/EN dans les 60 minutes, règlement par carte bancaire du solde restant
  (70 % ou 50 %) → réservation bascule à l'état « payée complètement ». *Nominal 4
  — AC-9, AC-10. Risque : élevé.*
- [x] **CASE-RES-419** — Réservation effectuée le jour même de la sortie (ex. le
  matin pour le créneau de 14h00) : saisie des passagers, acompte de 30 % réglé
  en ligne par carte bancaire → réservation à l'état « payée partiellement »,
  blocage strict de l'envoi de SMS / lien de solde (R-08, Contrainte 26),
  récapitulatif indiquant le règlement obligatoire du solde sur place par carte
  bancaire. *Nominal 5 / Cas limite 12 — AC-11. Risque : élevé.*

### Compléments de portée (grille tarifaire, privatisation, bilinguisme et formulaire de contact)

- [x] **CASE-RES-404** — Bascule français/anglais à chaque étape du tunnel initial
  et sur la page de paiement du solde sans perte des données déjà saisies
  (port, créneau, passagers, coordonnées). *Complément AC-1, AC-10. Risque :
  moyen.*
- [x] **CASE-RES-405** — Grille tarifaire standard Saint-Gilles sur l'activité
  Dauphins (50 € adulte / 30 € enfant), non couverte par les scénarios
  nominaux qui ne testent que Baleines : calcul du montant total, de l'acompte
  de 30 % et du solde restant dû. *Complément AC-4, AC-8. Risque : moyen.*
- [x] **CASE-RES-406** — Privatisation Grand Bleu (1 100,00 €) à Saint-Gilles,
  formule non couverte par le scénario nominal 3 qui ne teste que le Tikap :
  application du forfait 1 100 €, acompte obligatoire de 50 % (550,00 €) et solde
  restant dû de 550,00 €. *Complément AC-5, AC-8. Risque : moyen.*
- [x] **CASE-RES-407** — Nom, prénom ou e-mail manquant à l'étape
  coordonnées : rejet à la validation du formulaire, distinct du cas limite 8
  qui ne teste que le mobile. *Complément AC-6. Risque : moyen.*

### Cas limites (`specs/reservation.md`, table « Cas limites »)

- [x] **CASE-RES-408** — Tentative de réservation à moins de 2 heures du
  départ (ex. 8h15 pour un créneau à 10h00) : clôture automatique (R-11), créneau
  non sélectionnable, toute validation rejetée. *Cas limite 1 — AC-3. Risque :
  élevé.*
- [x] **CASE-RES-409** — Consultation du 25 décembre ou du 1er janvier :
  fermeture annuelle (R-02), aucun créneau proposé sur ces dates. *Cas limite 2
  — AC-2. Risque : faible.*
- [x] **CASE-RES-410** — Saisie d'un participant de moins de 4 ans : rejet
  immédiat (R-06), message d'inadmissibilité à bord, validation bloquée. *Cas
  limite 3 — AC-4. Risque : élevé.*
- [x] **CASE-RES-411** — Consultation de Saint-Leu en dehors des mardis et
  jeudis matin (ex. un lundi, ou un mardi après-midi) : aucun créneau
  disponible. *Cas limite 4 — AC-2. Risque : moyen.*
- [x] **CASE-RES-412** — Créneau du mardi ou jeudi matin (7h00 et 10h00) à
  Saint-Gilles : jauge plafonnée à 24 places (Grand Bleu seul, R-10), privatisation
  Tikap indisponible le matin sur ce créneau. *Cas limite 5 — AC-2, AC-5. Risque :
  moyen.*
- [x] **CASE-RES-413** — Demande d'un nombre de places supérieur aux places
  restantes sur le créneau : réservation bloquée, message indiquant le
  maximum disponible. *Cas limite 6 — AC-2. Risque : moyen.*
- [x] **CASE-RES-414** — Réservation de la dernière place disponible d'un
  créneau : réservation acceptée, créneau passant à l'état « complet » et
  retiré de l'offre. *Cas limite 7 — AC-2, AC-8. Risque : moyen.*
- [x] **CASE-RES-415** — Numéro de téléphone mobile manquant ou dans un
  format invalide à l'étape coordonnées : rejet à la validation du
  formulaire (Contrainte 20). *Cas limite 8 — AC-6. Risque : élevé.*
- [x] **CASE-RES-416** — Rejet ou abandon du paiement de l'acompte par carte
  bancaire : aucune réservation enregistrée, aucune place décomptée de la jauge.
  *Cas limite 9 — AC-8 (négatif). Risque : élevé.*
- [x] **CASE-RES-420** — Accès à la page de paiement du solde après expiration
  du token technique (> 1 heure — REQ-107) : affichage du message d'expiration
  du lien, invitation du client à régler le solde directement sur place par carte
  bancaire le jour du départ. *Cas limite 10 — AC-10. Risque : moyen.*
- [x] **CASE-RES-421** — Non-utilisation du lien de solde par le client (lien
  SMS ignoré) : la réservation reste à l'état « payée partiellement » sans
  blocage ni annulation, le client réglant son solde en CB sur place au départ.
  *Cas limite 11 — AC-8, AC-10. Risque : moyen.*
- [x] **CASE-RES-417** — Verrouillage temporaire des places sélectionnées
  pendant le paiement de l'acompte CB (timer 10 min, choix technique) : places
  libérées automatiquement si le paiement expire, est annulé ou rejeté (REQ-108).
  *Cas limite 13 — AC-2, AC-8. Risque : élevé.*

---

## Point d'attention — hypothèses non validées côté client

Deux points de `specs/reservation.md` § « Ce qui n'est pas défini » restent
des choix techniques / hypothèses, pas des règles confirmées par la direction :

- la durée exacte du verrouillage temporaire du panier (10 min retenu par
  défaut pour prévenir le surbooking pendant la transaction — Question ouverte
  n°12 §11 du CDC v5) — impacte directement `CASE-RES-417` ;
- la formulation textuelle exacte de la mention d'avertissement de
  pré-annulation — `CASE-RES-402` ne devra donc vérifier que la *présence* de
  la mention, pas son texte au mot près, tant que la direction n'a pas validé
  la formulation.

Par ailleurs, les dates concrètes reprises de la spec (mardi 18 août, mardi
25 août) seront dépassées au moment de l'exécution : à la génération des
fichiers, les cas utiliseront des dates relatives ou futures (en conservant
les contraintes jour/heure : mardi 9h00, etc.), la clôture automatique H-2
(AC-3) rendant tout créneau passé non réservable.

## Total proposé

**22 cas** sur l'unique spécification réservation existante
(`SPEC-RESERVATION-03` v4) : 6 scénarios nominaux (`400`–`403`, `418`, `419`),
4 compléments de portée (`404`–`407` : bascule bilingue FR/EN incluant la page de
solde, grille tarifaire Dauphins, privatisation Grand Bleu, champs obligatoires
du formulaire de contact) et 12 cas limites (`408`–`417`, `420`, `421` — couvrant
l'ensemble des 13 cas limites de la spec, le cas limite 12 étant traité avec le
nominal `419`).

Ensemble, ces 22 cas couvrent l'intégralité des **11 critères d'acceptation**
(`AC-1` à `AC-11`) et des **13 cas limites** de la spécification.

## Comment valider

1. Coche (`[x]`) les cas que tu veux voir générés en fichiers, dans l'ordre ou
   pas.
2. Barre / commente ceux que tu ne veux pas.
3. Dis-moi si tu veux ajuster le niveau de risque proposé, fusionner des cas,
   ou en ajouter — je régénère ce sommaire avant de passer à la génération des
   fichiers `CASE-RES-4XX.md`.
