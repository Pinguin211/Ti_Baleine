# Spécifications — Admin (back-office)

**Domaine :** `ADMIN`

---

## SPEC-ADMIN-01 — Consultation du planning

**Exigence :** REQ-009, REQ-010
**Statut :** brouillon
**Version :** V1

### Règle

> Le matin à 5h en arrivant sur le back-office, l'administrateur
> peut consulter le planning des réservations.


### Portée

- Ne couvre pas la décision d'annuler un départ sous le seuil de maintien :
  reste manuelle, hors système.
- Ne couvre pas l'authentification au back-office → `SPEC-ADMIN-0x` à venir.
- Ne couvre pas l'annulation d'une réservation et la remise à disposition
  d'une place libérée → `SPEC-ADMIN-02`.
- Ne couvre pas l'affectation ou la modification du navire, du type de
  sortie ou du naturaliste sur un créneau → relève de la gestion des
  créneaux (REQ-011), `SPEC-ADMIN-0x` à venir.

### Scénarios nominaux

```gherkin
Scénario : Affichage de la liste des créneaux
  Étant donné l'administrateur connecté au back-office, depuis un poste de
  bureau
  Quand il ouvre l'écran planning
  Alors il voit la liste des créneaux consolidée par port (Saint-Gilles ou
  Saint-Leu), jour et heure — 7h, 10h et 14h à Saint-Gilles tous les jours, et
  9h à Saint-Leu le mardi et le jeudi uniquement (R-01)

Scénario : Détail d'un créneau
  Étant donné un créneau affiché
  Quand l'administrateur le consulte
  Alors il voit le type de sortie affecté, le ou les navires affectés (Tikap
  et/ou Grand Bleu selon le port et le créneau), et le remplissage — nombre
  de places réservées sur la jauge du créneau (12 à Saint-Leu, 24 le mardi et
  le jeudi matin à Saint-Gilles, 36 en standard à Saint-Gilles — R-10)

```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Aucun créneau programmé pour la journée consultée | Le planning affiche un état vide explicite (pas d'erreur, pas de liste factice) |
| 2 | Créneau sans navire affecté | Le créneau est affiché avec un statut « non affecté » plutôt qu'une erreur d'affichage |
| 3 | Créneau sans type de sortie renseigné | Le créneau est affiché avec un statut « type non renseigné », par cohérence avec le cas limite #2 |
| 4 | Créneau au remplissage 0 (aucune réservation) | Le remplissage s'affiche normalement à 0, sans traitement particulier |
| 5 | Créneau complet (remplissage = jauge du créneau) | Un libellé distinctif « complet » est affiché plutôt qu'un simple nombre |
| 6 | Nombre de réservations supérieur à la jauge du créneau (incohérence de données) | Une alerte visuelle est affichée plutôt qu'un taux ou un nombre supérieur à la jauge |
| 7 | Consultation du planning en dehors de 5h du matin | Le planning reste consultable à tout moment de la journée, pas de restriction horaire |
| 8 | Perte de connexion pendant le chargement du planning | Un message d'erreur explicite est affiché, avec possibilité de réessayer, plutôt qu'un planning partiel figé à l'écran |
| 9 | Créneau du mardi ou jeudi 7h/10h à Saint-Gilles | Jauge plafonnée à 24 places, Grand Bleu seul — le Tikap n'apparaît pas affecté (indisponible, rotation vers Saint-Leu — R-01, R-10) |
| 10 | Créneau à Saint-Leu (mardi ou jeudi 9h) | Jauge fixée à 12 places, Tikap seul (R-03, R-10) |
| 11 | Créneau standard à Saint-Gilles (hors mardi/jeudi matin) | Jauge à 36 places, Tikap et Grand Bleu potentiellement tous deux affectés (R-10) |

### Ce qui n'est pas défini

- Qui affecte le navire, le type de sortie et le naturaliste à un créneau, et depuis quel écran (probablement `SPEC-ADMIN-0x` à venir, lié à REQ-011) — non précisé ici.
- Format exact d'affichage du remplissage (pourcentage, fraction, ou les deux) — non précisé, même question pour `SPEC-ADMIN-05`.
- Traitement visuel exact (couleur, badge) d'un créneau « complet » ou « non affecté » — relève du design UI, non précisé.

### Critères d'acceptation

- [ ] AC-1 — Le planning affiche les créneaux du jour, consolidés par port,
      avec navire, type de sortie et remplissage (`CASE-ADMIN-01`)

### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| 4 cas limites (#3, #5, #6, #8) avaient un comportement attendu resté à « … », alors que la spec est déjà avancée (exigences REQ-009/010 sourcées) — aucun cas de test n'en était dérivable en l'état. | Acceptée | Un tableau de cas limites à moitié rempli ne remplit pas son rôle contractuel ; comportements complétés. |
| La section « Ce qui n'est pas défini » ne contenait que « … » alors que plusieurs points restent réellement incertains (qui affecte le navire, format d'affichage du remplissage). | Acceptée | Cohérent avec le gabarit (`specs/cle-specification.md`) : « une zone grise déclarée vaut mieux qu'une zone grise ignorée ». |
| La Portée ne disait rien de l'affectation d'un navire/type de sortie à un créneau, alors que le scénario « Détail d'un créneau » l'affiche comme une donnée déjà connue — risque de confusion entre « consulter » et « configurer » un créneau. | Acceptée | Exclusion ajoutée en Portée, renvoyée vers REQ-011 / une future SPEC-ADMIN-0x. |
| AC-1 ne mentionnait pas le regroupement « par port », alors que c'est le terme exact de REQ-009 et un axe désormais central (multi-site). | Acceptée | AC-1 reformulé pour reprendre le vocabulaire exact de REQ-009. |
| Cas limite oublié : consultation concurrente du planning sur deux sessions du même compte administrateur, avec un risque d'affichage désynchronisé après une modification récente (lié à REQ-107). | Refusée | Un seul profil administrateur (C-16), usage desktop mono-poste d'après les personas du CDC v3 ; risque réel mais non exprimé par le client — ne pas complexifier la spec sur un scénario non demandé. |

Les refus se reportent aussi dans `docs/journal.md`.

---

## SPEC-ADMIN-02 — Annulation d'une réservation

**Exigence :** REQ-013, REQ-014
**Statut :** brouillon
**Version :** v1

### Règle

> L'administrateur est en conversation téléphonique avec un client qui souhaite annuler sa réservation.
> Il peut annuler la réservation et remettre la place à disposition.

### Portée

- Ne couvre pas l'annulation d'une réservation par le client : celle-ci est
  externe à l'application (par téléphone).
- Ne couvre pas le remboursement d'une réservation annulée : externe à
  l'application.
- Le canal de la demande (aujourd'hui : appel téléphonique) reflète l'usage
  actuel et n'est pas une contrainte technique du système ; son évolution
  possible est une question ouverte du CDC v3 (n°9, §11).
- Une réduction du nombre de passagers à 0 (`SPEC-ADMIN-03`) déclenche cette
  même logique d'annulation (réduction et annulation partagent la même
  implémentation back-end, choix retenu pour n'avoir qu'une seule logique).

### Scénarios nominaux

```gherkin
Scénario : Annulation d'une réservation sur demande téléphonique
  Étant donné l'administrateur connecté au back-office
  Quand il reçoit un appel d'un client qui souhaite annuler sa réservation, avant le départ effectif du créneau
  Alors il peut annuler la réservation
  Et la réservation passe à l'état « annulée »
  Et les places libérées sont remises à disposition sur l'interface de réservation, de façon immédiate et synchrone (REQ-013)
  Et le client est informé de l'annulation par SMS (REQ-014)

```

### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Le client appelle très peu de temps avant le départ (ex. 1h avant) | L'administrateur peut annuler la réservation : le CDC v3 ne fixe aucun délai minimal pour une annulation admin (hypothèse retenue en Q1 §11 du CDC v3, en attente de confirmation client) |
| 2 | La réservation a un nombre de passagers négatif (donnée corrompue) | Rejeté comme incohérence de données : ce cas ne devrait pas se produire si le nombre de passagers est contrôlé à la source (côté réservation client) ; l'annulation reste possible normalement quel que soit le nombre affiché |
| 3 | La réservation est déjà à l'état « annulée » | L'administrateur ne peut pas l'annuler une seconde fois, pas de nouveau SMS envoyé |
| 4 | Le créneau est déjà passé (départ effectué) au moment de l'appel | … (cf. « Ce qui n'est pas défini ») |
| 5 | Le numéro de téléphone du client est invalide ou manquant | La réservation est annulée mais le SMS de confirmation ne peut pas être envoyé — écart avec l'exigence de fiabilité de délivrabilité (REQ-106) |
| 6 | L'envoi du SMS échoue (panne du prestataire) | … (prestataire SMS non encore choisi — Q2 §11 du CDC v3) |
| 7 | Coupure réseau/perte de connexion pendant l'annulation | La cohérence de la jauge du créneau doit être garantie malgré la coupure (REQ-107 — cohérence instantanée des jauges) |
| 8 | L'annulation fait passer le nombre de passagers payants du navire sous le seuil de maintien (6 passagers — R-09) | La décision de maintenir ou d'annuler le départ reste manuelle, hors système (cf. Portée de `SPEC-ADMIN-01`) |

### Ce qui n'est pas défini

- Délai limite de notification d'annulation vis-à-vis du client : question ouverte du CDC v3 (Q1, §11) — hypothèse retenue en attendant : notification envoyée dès validation de l'annulation par l'administrateur, sans restriction horaire système.
- Prestataire SMS retenu (Twilio, OVH SMS, SMS Factor…) : question ouverte du CDC v3 (Q2, §11), non tranchée.
- Comportement exact quand le créneau visé par l'annulation est déjà passé (départ effectué) : non précisé par le CDC v3.

### Critères d'acceptation

- [ ] AC-1 — La réservation est passé à l'état « annulée » (`CASE-ADMIN-02`)
- [ ] AC-2 — Les places libérées sont remises à disposition sur l'interface de réservation (`CASE-ADMIN-03`)
- [ ] AC-3 — Le client est informé de l'annulation par SMS (`CASE-ADMIN-04`)


### Revue IA

Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Cas limite #4 (« créneau déjà passé ») avait un comportement « … » sans renvoi explicite, alors que le même point est repris dans « Ce qui n'est pas défini » — un lecteur du seul tableau pouvait croire à un oubli plutôt qu'à une zone grise assumée. | Acceptée | Renvoi ajouté dans la cellule, à l'image de la pratique déjà utilisée ailleurs dans le fichier. |
| Cas limite #2 (« passagers négatif ») avait un comportement « … » sans piste ni renvoi, alors qu'il s'agit d'une incohérence de données interne, distincte des questions ouvertes du CDC v3. | Acceptée | Comportement par défaut proposé (incohérence à traiter en amont, côté création de réservation) plutôt qu'une case vide. |
| AC-3 (« client informé par SMS ») n'est pas strictement vérifiable en l'état : aucun prestataire SMS choisi (Q2 du CDC v3) et REQ-106 exige un taux de délivrabilité sans seuil chiffré. | Refusée | AC-3 reste correct en tant qu'exigence fonctionnelle ; le flou porte sur l'implémentation, déjà tracé (Q2, REQ-106) — anticiper une réponse du client serait prématuré. |
| La Règle pose l'appel téléphonique comme déclencheur systématique de l'annulation, ce qui exclut implicitement tout autre canal — hypothèse de rédaction plutôt que contrainte du CDC v3. | Acceptée | Bullet ajouté en Portée pour préciser que le canal actuel (téléphone) n'est pas une contrainte système, en cohérence avec la question ouverte n°9 (§11 du CDC v3) soulevée avec l'équipe. |
| Cas limite oublié : un client annule plusieurs réservations distinctes en un seul appel. | Refusée | Non mentionné dans les 3 comptes-rendus d'entretien ; chaque annulation reste une action manuelle distincte de l'administrateur, sans complexité supplémentaire à documenter. |

Les refus se reportent aussi dans `docs/journal.md`.

---
## SPEC-ADMIN-03 — Réduction du nombre de passagers

**Exigence :** REQ-015 (une réduction à 0 déclenche aussi REQ-013 et REQ-014, cf. cas limite #1)
**Statut :** brouillon
**Version :** v1

### Règle

> L'administrateur peut réduire le nombre de passagers d'une réservation existante.

### Portée 
- Ne couvre pas le remboursement du client pour la réduction du nombre de passagers : externe à l'application.
- Ne couvre pas le recalcul ou l'affichage du nouveau montant théorique de la réservation après réduction : distinct du remboursement, à clarifier séparément.
- Une réduction du nombre de passagers à 0 n'est pas un cas distinct : elle partage la même logique back-end que l'annulation complète (`SPEC-ADMIN-02`), choix d'implémentation retenu pour n'avoir qu'une seule logique d'annulation/libération de places.

### Scénarios nominaux

```gherkin
Scénario : Réduction du nombre de passagers
  Étant donné l'administrateur connecté au back-office
    Quand il reçoit un appel d'un client qui souhaite réduire le nombre de passagers (adultes et/ou enfants) de sa réservation
    Alors il peut réduire le nombre de passagers
    Et le nombre de places réservées est mis à jour
    Et les places libérées sont remises à disposition sur l'interface de réservation, de façon synchrone (REQ-015)
```
### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Le nouveau nombre de passagers demandé est de 0 | La réduction à 0 déclenche la même logique que l'annulation complète (`SPEC-ADMIN-02`) : la réservation passe à l'état « annulée », les places sont libérées, et le client est informé par SMS — réduction et annulation partagent la même implémentation back-end (REQ-013, REQ-014, REQ-015) |
| 2 | Le nouveau nombre de passagers est supérieur à l'ancien (augmentation) | Refusé : l'ajout de passagers est explicitement hors périmètre (R-18, écarté au §6 du CDC v3) |
| 3 | La réservation est déjà à l'état « annulée » | La réduction ne peut pas être appliquée |
| 4 | La demande de réduction intervient très peu de temps avant le départ | L'administrateur peut réduire la réservation : le CDC v3 ne fixe aucun délai minimal, par cohérence avec l'hypothèse retenue pour l'annulation (Q1 §11 du CDC v3, cf. `SPEC-ADMIN-02`) |
| 5 | Le créneau concerné est déjà passé | La réduction ne peut pas être appliquée |
| 6 | Coupure réseau pendant la mise à jour du nombre de places | La cohérence de la jauge du créneau doit être garantie malgré la coupure (REQ-107) |
| 7 | Le client demande à changer la date de sa réservation en même temps que la réduction | Refusé : aucun report de date n'est autorisé (R-18) |

### Ce qui n'est pas défini

- Le scénario ne précise pas si la réduction porte séparément sur le nombre d'adultes et d'enfants ou seulement sur un total global, alors que REQ-015 mentionne explicitement « adultes/enfants ».

### Critères d'acceptation

- [ ] AC-1 — Le nombre de places réservées est mis à jour, en distinguant
      adultes et enfants si la saisie le permet *(format exact non tranché
      — cf. « Ce qui n'est pas défini »)* (`CASE-ADMIN-05`)
- [ ] AC-2 — Les places libérées sont remises à disposition sur l'interface de réservation (`CASE-ADMIN-06`)
- [ ] AC-3 — Une réduction à 0 passager fait passer la réservation à l'état « annulée » et déclenche l'envoi du SMS d'information, selon la même logique que `SPEC-ADMIN-02` (`CASE-ADMIN-09`)

### Revue IA
Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Cas limite #1 (réduction à 0) renvoyait vers `SPEC-ADMIN-02` sans dire ce qui devait effectivement se passer : refus de la saisie ? redirection automatique ? Le renvoi identifiait le problème sans le résoudre. | Acceptée, comportement corrigé le 13/08/2026 | Une première proposition de comportement (refus de la réduction à 0, redirection manuelle vers l'écran d'annulation) a été écartée par l'équipe : le choix produit retenu est que la réduction à 0 déclenche directement la même logique back-end que l'annulation complète (une seule logique d'annulation/libération de places), plutôt que de bloquer la saisie. |
| REQ-015 précise « adultes/enfants », mais ni la Règle, ni le scénario, ni AC-1 ne disaient si la saisie est un total unique ou deux champs distincts — déjà noté en « Ce qui n'est pas défini » mais le lien n'apparaissait pas au niveau des critères d'acceptation eux-mêmes. | Acceptée | Renvoi explicite ajouté directement dans AC-1 pour qu'il soit visible sans lire toute la spec. |
| Cas limite oublié : une « réduction » qui redemande le même nombre de passagers qu'actuellement (aucune place libérée). | Refusée | Cas mineur d'ergonomie sans impact métier ni règle du CDC v3 engagée — relève du design/implémentation, pas de la spec fonctionnelle. |
| La Portée excluait le remboursement, mais restait muette sur le recalcul ou l'affichage du nouveau montant théorique de la réservation après réduction — point réellement ambigu et testable. | Acceptée | Bullet ajouté en Portée pour exclure explicitement le recalcul/affichage du montant, distinct du remboursement déjà exclu. |

Les refus se reportent aussi dans `docs/journal.md`.

---

## SPEC-ADMIN-04 — Login administrateur
**Exigence :** Aucune exigence fonctionnelle dédiée dans le CDC v3 (§9) — s'appuie sur la contrainte C-16 (« Un seul profil d'accès back-office administrateur ») et la question ouverte Q8 (§11). À faire ajouter comme exigence fonctionnelle formelle (ex. REQ-017) lors d'une prochaine révision du CDC.
**Statut :** brouillon
**Version :** v1

### Règle

> L'administrateur peut se connecter au back-office avec un identifiant et un mot de passe valides.

### Portée

- Ne couvre pas la gestion des mots de passe oubliés ou réinitialisés → `SPEC-ADMIN-0x` à venir.

### Scénarios nominaux

```gherkin
Scénario : Login administrateur
  Étant donné l'administrateur sur la page de connexion du back-office
  Quand il saisit un identifiant et un mot de passe valides
  Alors il est connecté au back-office et redirigé vers le planning des réservations
```
### Cas limites

| # | Situation | Comportement attendu |
|---|---|---|
| 1 | L'administrateur a oublié le mot de passe | Il ne peut pas se connecter au back-office|
| 2 | L'administrateur saisit un identifiant ou un mot de passe incorrect | Il ne peut pas se connecter au back-office|
| 3 | L'administrateur enchaîne plusieurs tentatives de connexion échouées | … (cf. section « Ce qui n'est pas défini ») |
| 4 | L'identifiant est valide mais le compte a été désactivé | Il ne peut pas se connecter, avec un message d'erreur générique (ne pas révéler explicitement que le compte est désactivé, pour raisons de sécurité) |
| 5 | Le champ identifiant ou le champ mot de passe est laissé vide | La validation du formulaire empêche l'envoi de la requête de connexion tant que les deux champs ne sont pas renseignés |
| 6 | L'administrateur est déjà connecté depuis un autre poste | … (sessions multiples autorisées ou non ?) |
| 7 | La session expire après une période d'inactivité | … (durée non précisée) |
| 8 | L'identifiant saisi n'est pas au format d'une adresse e-mail | … (dépend de la confirmation du format d'identifiant retenu — cf. Q8 du CDC v3, « Ce qui n'est pas défini ») |

### Ce qui n'est pas défini

- Quel est le comportement attendu en cas de tentatives de connexion multiples échouées
 (blocage du compte, délai d'attente, etc.) ?
- Format et politique de sécurité du mot de passe : question ouverte du CDC v3 (Q8, §11) — hypothèse retenue en attendant : identifiant e-mail + mot de passe robuste (≥ 12 caractères avec majuscule, chiffre, caractère spécial), non confirmée par le client.
- Sessions multiples autorisées ou non pour l'unique profil administrateur (C-16 impose un seul profil, mais ne dit rien des sessions concurrentes sur ce profil).

### Critères d'acceptation

- [ ] AC-1 — L'administrateur peut se connecter au back-office avec un identifiant et un mot de passe valides (`CASE-ADMIN-07`)

### Revue IA
Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Aucune exigence REQ-0xx du CDC v3 ne couvre formellement l'authentification admin. | Refusée (déjà traitée) | Corrigé lors d'une session précédente : le champ Exigence documente désormais ce trou et propose l'ajout d'un REQ-017 lors d'une prochaine révision du CDC. |
| 5 des 7 cas limites (#3 à #7) restaient sans comportement attendu défini — la spec pose beaucoup de bonnes questions mais n'y répond quasiment jamais, alors qu'AC-1 ne couvre que le chemin nominal. | Acceptée partiellement | Comportement ajouté pour les cas déductibles du CDC v3 (compte désactivé, champs vides) ; les cas dépendant d'une vraie décision produit non tranchée (tentatives multiples, sessions concurrentes, expiration) restent renvoyés vers « Ce qui n'est pas défini », déjà correctement identifiés. |
| Le scénario nominal ne précise pas le format de l'identifiant (e-mail vs nom d'utilisateur libre), alors que l'hypothèse retenue en Q8 (§11 du CDC v3) parle explicitement d'un « identifiant e-mail ». | Acceptée | Cas limite ajouté sur le format de l'identifiant, cohérent avec l'hypothèse déjà citée en « Ce qui n'est pas défini ». |
| Le titre de la spec utilisait un seul `#` (`# SPEC-ADMIN-04`) alors que toutes les autres SPEC-ADMIN du fichier utilisent `##` — cassait la hiérarchie Markdown du document. | Acceptée | Correction typographique sans risque, harmonise la structure du fichier. |

Les refus se reportent aussi dans `docs/journal.md`.

---

## SPEC-ADMIN-05 visualisation du taux de remplissage

**Exigence :** REQ-010 
**Statut :** brouillon
**Version :** v1

### Règle
> L'administrateur peut visualiser le taux de remplissage des créneaux sur le planning.

### Portée
- Ne couvre pas la modification du taux de remplissage → `SPEC-ADMIN-0x` à venir.
- Ne couvre pas le blocage des réservations dépassant la jauge d'un créneau : comportement du parcours de réservation client (REQ-012), pas de l'écran de visualisation admin.
- Distinction avec `SPEC-ADMIN-01` : celle-ci affiche le remplissage brut (nombre de places réservées) au niveau du détail d'un créneau, tandis que `SPEC-ADMIN-05` en dérive un taux visualisable sur l'ensemble du planning — même donnée source, deux angles d'affichage.

### Scénarios nominaux
```gherkin
Scénario : Visualisation du taux de remplissage
  Étant donné l'administrateur connecté au back-office
  Quand il consulte le planning des réservations
  Alors il peut voir le taux de remplissage de chaque créneau (nombre de places réservées / jauge du créneau — 12 à Saint-Leu, 24 le mardi et le jeudi matin à Saint-Gilles, 36 en standard à Saint-Gilles — R-10)
```
### Cas limites
| # | Situation | Comportement attendu |
|---|---|---|
| 1 | Le nombre de réservations affichées dépasse la jauge du créneau (incohérence de données ; ne devrait pas se produire si REQ-012 est respecté côté réservation) | Afficher une alerte visuelle plutôt qu'un taux supérieur à 100 % |
| 2 | Créneau sans aucune réservation | Le taux de remplissage s'affiche à 0 %, sans traitement particulier |
| 3 | Créneau exactement complet (remplissage = jauge du créneau) | Le taux affiché est de 100 %, avec un libellé « complet » distinct, par cohérence avec le cas limite #5 de `SPEC-ADMIN-01` |
| 4 | Créneau sans navire affecté | Le taux de remplissage n'est pas calculable : un statut « non affecté » est affiché à la place, par cohérence avec le cas limite #2 de `SPEC-ADMIN-01` |
| 5 | Une réservation client arrive pendant que l'administrateur consulte le planning | … (rafraîchissement en temps réel ou non ? cf. « Ce qui n'est pas défini ») |
| 6 | Une réservation est annulée (cf `SPEC-ADMIN-02`) ou réduite (cf `SPEC-ADMIN-03`) | Le taux de remplissage du créneau est recalculé immédiatement (cohérence instantanée des jauges — REQ-107) |
| 7 | Créneau du mardi ou jeudi 7h/10h à Saint-Gilles | Jauge affichée plafonnée à 24 places (Grand Bleu seul — R-10) |
| 8 | Créneau à Saint-Leu | Jauge affichée fixée à 12 places (Tikap seul — R-10) |
| 9 | Créneau de privatisation (capacité réservée en bloc dès l'achat) | … (affichage à distinguer d'un créneau standard rempli progressivement par plusieurs réservations individuelles ? aucune mixité d'activité n'est autorisée sur un même créneau/navire — R-12) |

### Ce qui n'est pas défini

- Format d'affichage du taux de remplissage : pourcentage, fraction (ex. 18/24), ou les deux — non précisé.
- Rafraîchissement en temps réel du taux pendant la consultation, ou nécessité de recharger l'écran — non précisé.

### Critères d'acceptation
- [ ] AC-1 — L'administrateur peut visualiser le taux de remplissage des créneaux sur le planning (`CASE-ADMIN-08`)

### Revue IA
Consigne utilisée :

> Analyse cette spécification. Recherche les ambiguïtés, contradictions,
> comportements non définis, cas limites oubliés et exigences impossibles à
> tester. Ne réécris pas la spécification.

| Remarque de l'IA | Décision | Motif |
|---|---|---|
| Chevauchement non déclaré avec `SPEC-ADMIN-01` : le « Détail d'un créneau » y affiche déjà le remplissage sur la jauge du créneau — même donnée source que le « taux de remplissage » de cette spec, sans que la Portée dise en quoi les deux diffèrent. | Acceptée | Bullet ajouté en Portée pour clarifier la distinction entre les deux specs. |
| Cas limites #3 (créneau exactement complet) et #4 (créneau sans navire affecté) restaient en « … » alors que leur réponse est directement déductible des cas limites déjà résolus de `SPEC-ADMIN-01` (#5 et #2). | Acceptée | Comportement complété par cohérence avec `SPEC-ADMIN-01`. |
| Cas limite #5 (rafraîchissement pendant la consultation) reste en « … ». | Refusée | Déjà correctement tracé comme question ouverte juste en dessous (« Ce qui n'est pas défini ») ; modifier la cellule n'apporterait rien de plus que ce renvoi, désormais rendu explicite. |
| Cas limite oublié : le CDC v3 (R-12) interdit toute mixité d'activité sur un même créneau/navire ; rien ne précisait si un créneau de privatisation (capacité réservée en bloc) affiche son taux de remplissage différemment d'un créneau standard rempli progressivement. | Acceptée | Cas limite ajouté, découle directement d'une règle métier du CDC v3 (R-12). |
| AC-1 reprend mot pour mot la Règle sans préciser le format attendu (pourcentage/fraction), alors que ce point est identifié comme non tranché en « Ce qui n'est pas défini » — non strictement vérifiable en l'état. | Refusée | AC volontairement large tant que le format n'est pas tranché côté design/produit ; le préciser maintenant anticiperait une décision non prise. Le renvoi vers « Ce qui n'est pas défini » suffit à signaler la limite. |

Les refus se reportent aussi dans `docs/journal.md`.

---