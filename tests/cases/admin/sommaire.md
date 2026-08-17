# Sommaire — cas de test Admin (CASE-ADMIN-001 à 399)

**Statut :** proposition, à valider avant génération des fichiers
**Périmètre :** back-office administrateur uniquement (`specs/admin.md`,
SPEC-ADMIN-01 à 07). Réservation et facturation sont couvertes par ailleurs.

Ce fichier ne contient aucun cas rédigé : c'est la liste de ce qui serait rédigé,
un fichier par ligne cochée, sur le modèle de
[CASE-CANCEL-01.md](../CASE-CANCEL-01.md). Coche (`[x]`) ce que tu valides,
supprime ou commente ce que tu ne veux pas, et je génère les fichiers
correspondants ensuite.

---

## Numérotation retenue

399 numéros ne seront pas tous consommés maintenant : chaque spécification reçoit
un bloc de 50 (sauf la dernière tranche, laissée en réserve), pour pouvoir ajouter
des cas plus tard sans renuméroter ni décaler ceux de tes collègues.

| Bloc | Spécification | Sujet |
|---|---|---|
| 001–050 | `SPEC-ADMIN-01` | Planning consolidé et supervision multi-sites |
| 051–100 | `SPEC-ADMIN-02` | Annulation d'une réservation et notification SMS |
| 101–150 | `SPEC-ADMIN-03` | Réduction du nombre de passagers |
| 151–200 | `SPEC-ADMIN-04` | Authentification back-office |
| 201–250 | `SPEC-ADMIN-05` | Taux de remplissage et jauges par créneau |
| 251–300 | `SPEC-ADMIN-06` | Envoi groupé d'alertes de pré-annulation |
| 301–350 | `SPEC-ADMIN-07` | Configuration et gestion des créneaux |
| 351–399 | réserve | Pas encore de spec dédiée (ex. RGPD `REQ-108`, compat multi-support `REQ-102`) — non proposé ci-dessous, à ouvrir quand une spec existera |

⚠️ **Point d'attention technique :** `tools/traceability.sh` détecte les IDs de
cas via une regex qui n'exige que **deux** chiffres (`CASE-[A-Z0-9]+-[0-9][0-9]`,
non ancrée). Sur un ID à trois chiffres comme `CASE-ADMIN-001`, elle capture
seulement `CASE-ADMIN-00`, ce qui déclencherait une fausse rupture. Le script
devra être ajusté (`[0-9]{2,3}` + ancrage) avant de committer les premiers
fichiers à trois chiffres — je peux le faire si tu veux, séparément.

Chaque cas ci-dessous est numéroté à trois chiffres, référence sa `SPEC-ADMIN-0X`
et le ou les `AC-n` qu'il couvre, et précise s'il vient d'un scénario nominal ou
d'un cas limite de la spec.

---

## Revue des doublons (17/08/2026)

Passe de relecture avant génération : certains cas testaient deux fois la même
règle protégée (souvent parce que `SPEC-ADMIN-02` et `SPEC-ADMIN-03` partagent
explicitement la même fonction back-end de suppression de billets). Décisions
appliquées ci-dessous :

| Action | IDs concernés | Motif |
|---|---|---|
| Supprimé | `CASE-ADMIN-003` | Doublon de `004` (même indicateur d'alerte, juste un autre endroit d'affichage) |
| Supprimé | `CASE-ADMIN-008` | Vérifie une absence de restriction, ne protège aucun régime métier |
| Fusionné dans `051` | `CASE-ADMIN-052` | Même mécanisme que `051`, seul le motif change |
| Supprimé | `CASE-ADMIN-053` | Déjà vérifié par l'assertion de libération des places dans `051` |
| Fusionné dans `057` | `CASE-ADMIN-058` | Même invariant protégé (échec SMS ne bloque jamais la suppression/libération), cause différente seulement |
| Fusionné dans `055` | `CASE-ADMIN-104` | Même état (0 billet actif), fonction back-end partagée avec `SPEC-ADMIN-02` |
| Fusionné dans `056` | `CASE-ADMIN-106` | Même règle « créneau déjà passé », fonction back-end partagée |
| Fusionné dans `059` | `CASE-ADMIN-107` | Même règle de cohérence transactionnelle, fonction back-end partagée |
| Reformulé | `CASE-ADMIN-257` | Ne testait qu'un doublon de `251` (multi-créneaux) → recentré sur le croisement Saint-Gilles + Saint-Leu, seule variante non couverte |
| Reformulé | `CASE-ADMIN-258` | Ne testait qu'un doublon de `251` (mention publique) → recentré sur la nuance conditionnelle de l'AC-4 (créneau déjà complet) |

---

## Bloc 001–050 — SPEC-ADMIN-01 : Planning et supervision multi-sites

- [x] **CASE-ADMIN-001** — Affichage de la grille de planning consolidée par
  port/jour/heure (Saint-Gilles 7h/10h/14h tous les jours, Saint-Leu 9h
  mar./jeu.). *Nominal 1 — AC-1. Risque : moyen.*
- [x] **CASE-ADMIN-002** — Détail d'un créneau : navire(s) mobilisé(s) et type
  de sortie affichés. *Nominal 2 — AC-1. Risque : moyen.*
- [x] **CASE-ADMIN-004** — Badge « Sous pré-alerte » visible sur la carte du
  créneau dans la grille, et repris dans son détail. *Nominal 2 + Cas limite 6 —
  AC-2. Risque : élevé.*
- [x] **CASE-ADMIN-005** — Planning affichant un état vide explicite quand
  aucun créneau n'est programmé pour le jour consulté. *Cas limite 1. Risque : faible.*
- [x] **CASE-ADMIN-006** — Créneau sans navire affecté → statut distinctif
  « non affecté ». *Cas limite 2. Risque : moyen.*
- [x] **CASE-ADMIN-007** — Créneau sans type de sortie renseigné → statut
  « type non renseigné ». *Cas limite 3. Risque : moyen.*
- [x] **CASE-ADMIN-009** — Perte de connexion réseau pendant le chargement du
  planning → message d'erreur explicite avec bouton « réessayer ». *Cas limite 5. Risque : moyen.*

## Bloc 051–100 — SPEC-ADMIN-02 : Annulation d'une réservation et notification

- [x] **CASE-ADMIN-051** — Annulation complète d'une réservation (billets
  supprimés, places libérées, SMS envoyé), couvrant les 3 motifs possibles :
  administratif météo/technique (R-27), désistement client « par peur » suite à
  alerte (R-28), standard hors alerte — chaque motif doit composer le bon texte
  de SMS. *Nominal 1+2 — AC-1, AC-2, AC-3. Risque : élevé.*
- [x] **CASE-ADMIN-054** — Annulation autorisée sans délai minimal, jusqu'à
  l'heure exacte du départ. *Cas limite 1. Risque : élevé.*
- [x] **CASE-ADMIN-055** — Réservation déjà à 0 billet actif (via annulation ou
  via réduction totale) : action désactivée, aucune action supplémentaire
  possible, aucun second SMS envoyé. *Cas limite 2 (SPEC-ADMIN-02) + Cas limite 3
  (SPEC-ADMIN-03), fonction back-end partagée. Risque : moyen.*
- [x] **CASE-ADMIN-056** — Annulation ou réduction rejetée si le créneau
  concerné est déjà passé (date/heure de départ échues). *Cas limite 3
  (SPEC-ADMIN-02) + Cas limite 5 (SPEC-ADMIN-03), fonction back-end partagée.
  Risque : élevé.*
- [x] **CASE-ADMIN-057** — Échec d'envoi du SMS de notification, quelle que
  soit la cause (numéro de téléphone invalide ou panne temporaire de la
  passerelle SMS) : la suppression des billets et la libération des places sont
  toujours exécutées et validées, l'échec est journalisé et notifié à l'admin.
  *Cas limite 4 + Cas limite 5. Risque : élevé.*
- [x] **CASE-ADMIN-059** — Coupure réseau pendant la validation d'une
  annulation ou d'une réduction : cohérence transactionnelle garantie (tout ou
  rien). *Cas limite 6 (SPEC-ADMIN-02) + Cas limite 6 (SPEC-ADMIN-03), fonction
  back-end partagée. Risque : élevé.*
- [ ] **CASE-ADMIN-060** — Annulation faisant passer le départ sous le seuil
  de maintien (6 passagers) : aucune suppression automatique du départ, décision
  reste manuelle. *Cas limite 7. Risque : moyen.*
- [ ] **CASE-ADMIN-061** — Le motif d'annulation saisi sert uniquement à
  composer le SMS et n'est jamais persisté sur l'entité réservation. *AC-1 (détail règle). Risque : moyen.*

## Bloc 101–150 — SPEC-ADMIN-03 : Réduction du nombre de passagers

- [ ] **CASE-ADMIN-101** — Retrait d'1 billet adulte sur une réservation
  3 adultes + 1 enfant : billet supprimé, place libérée, réservation à jour.
  *Nominal 1 — AC-1. Risque : élevé.*
- [ ] **CASE-ADMIN-102** — Suppression des 2 derniers billets via l'écran de
  réduction : bascule automatique en traitement complet d'annulation
  (motif + SMS, `SPEC-ADMIN-02`). *Nominal 2 — AC-3. Risque : élevé.*
- [ ] **CASE-ADMIN-103** — Tentative d'ajouter un billet sur une réservation
  existante : rejet strict. *Cas limite 1 — AC-2. Risque : moyen.*
- [ ] **CASE-ADMIN-105** — Tentative de modifier la date ou le port de départ
  pendant une réduction : rejet strict. *Cas limite 4 — AC-2. Risque : moyen.*

> Les cas limites « réservation déjà à 0 billet », « créneau déjà passé » et
> « coupure réseau » de cette spec sont couverts par `CASE-ADMIN-055`, `056` et
> `059` (bloc `SPEC-ADMIN-02`), la fonction back-end de suppression de billets
> étant unifiée entre les deux specs.

## Bloc 151–200 — SPEC-ADMIN-04 : Authentification back-office

- [ ] **CASE-ADMIN-151** — Connexion réussie avec identifiant e-mail et mot de
  passe valides → redirection vers le planning consolidé. *Nominal 1 — AC-1. Risque : élevé.*
- [ ] **CASE-ADMIN-152** — Identifiant ou mot de passe erroné → accès refusé,
  message d'erreur générique (pas de divulgation sur l'existence du compte).
  *Cas limite 1. Risque : élevé.*
- [ ] **CASE-ADMIN-153** — Champs laissés vides → blocage à la validation côté
  client. *Cas limite 2. Risque : faible.*
- [ ] **CASE-ADMIN-154** — Tentatives de connexion infructueuses répétées →
  ralentissement / blocage temporaire anti force-brute. *Cas limite 3. Risque : élevé.*
- [ ] **CASE-ADMIN-155** — Session expirée après inactivité prolongée →
  déconnexion automatique et redirection vers la mire de connexion. *Cas limite 4. Risque : moyen.*
- [ ] **CASE-ADMIN-156** — Accès direct à une URL du back-office sans être
  authentifié → interception et redirection vers l'écran de connexion. *AC-2. Risque : élevé.*

## Bloc 201–250 — SPEC-ADMIN-05 : Taux de remplissage et jauges

- [ ] **CASE-ADMIN-201** — Créneau standard Saint-Gilles (jauge 36) à 27
  billets actifs → affichage 27/36 (75 %). *Nominal 1 — AC-1. Risque : moyen.*
- [ ] **CASE-ADMIN-202** — Créneau mardi 7h Saint-Gilles (jauge 24, Grand Bleu
  seul) à 18 billets actifs → affichage 18/24 (75 %). *Nominal 2 — AC-1. Risque : moyen.*
- [ ] **CASE-ADMIN-203** — Créneau Saint-Leu mardi/jeudi 9h (jauge 12, Tikap)
  à N billets actifs → jauge maximale correctement fixée à 12. *Complément règle — AC-1. Risque : moyen.*
- [ ] **CASE-ADMIN-204** — Créneau à 0 billet actif → affichage à 0 % / 0
  place réservée. *Cas limite 1. Risque : faible.*
- [ ] **CASE-ADMIN-205** — Créneau complet (billets actifs = jauge) →
  affichage 100 % avec badge « Complet ». *Cas limite 2. Risque : moyen.*
- [ ] **CASE-ADMIN-206** — Recalcul instantané du taux de remplissage après une
  annulation ou une réduction de billets. *Cas limite 3. Risque : élevé.*
- [ ] **CASE-ADMIN-207** — Créneau privatisé (forfait navire) → affichage
  « Navire privatisé », jauge totalement bloquée. *Cas limite 4. Risque : moyen.*

## Bloc 251–300 — SPEC-ADMIN-06 : Envoi groupé d'alertes de pré-annulation

- [ ] **CASE-ADMIN-251** — Envoi groupé d'une alerte météo bilingue (FR+EN) sur
  2 créneaux du lendemain (Saint-Gilles 7h et 10h), passage des 2 créneaux en
  « sous pré-alerte ». *Nominal 1 — AC-1, AC-3, AC-4. Risque : élevé.*
- [ ] **CASE-ADMIN-252** — Sélection d'un template codé en dur (« Météo
  défavorable ») → préremplissage automatique du message bilingue FR puis EN
  dans le champ éditable. *Nominal 1 (détail) — AC-2, AC-3. Risque : moyen.*
- [ ] **CASE-ADMIN-253** — Aucun créneau sélectionné → bouton d'envoi de
  l'alerte désactivé. *Cas limite 1. Risque : faible.*
- [ ] **CASE-ADMIN-254** — Créneau sélectionné sans aucune réservation →
  passage en « pré-alerte » (mention affichée) sans envoi de message (liste de
  destinataires vide). *Cas limite 2. Risque : moyen.*
- [ ] **CASE-ADMIN-255** — Texte du message effacé ou vide → validation
  bloquée, corps du message obligatoire. *Cas limite 3. Risque : faible.*
- [ ] **CASE-ADMIN-256** — Échec de délivrance sur un destinataire (numéro
  erroné / bounce e-mail) → échec journalisé sans bloquer l'envoi aux autres.
  *Cas limite 4. Risque : moyen.*
- [ ] **CASE-ADMIN-257** — Sélection simultanée de créneaux sur les deux ports
  (Saint-Gilles ET Saint-Leu) dans un même envoi groupé → traitement unique en
  une seule action administrative, message diffusé aux réservataires des deux
  sites. *Cas limite 5, variante croisée non couverte par `251` (qui ne teste
  qu'un seul port). Risque : moyen.*
- [ ] **CASE-ADMIN-258** — Créneau déjà complet placé sous pré-alerte : la
  mention d'avertissement ne s'affiche pas côté public puisqu'il ne reste plus
  de place en vente. *AC-4, nuance conditionnelle (« s'ils restent ouverts avec
  des places disponibles »). Risque : moyen.*

## Bloc 301–350 — SPEC-ADMIN-07 : Configuration et gestion des créneaux

- [ ] **CASE-ADMIN-301** — Fermeture manuelle d'un créneau sans passager
  inscrit → statut « fermé », disparition immédiate de l'interface publique.
  *Nominal 1 — AC-1. Risque : élevé.*
- [ ] **CASE-ADMIN-302** — Réouverture manuelle exceptionnelle d'un créneau
  précédemment fermé. *Complément portée — AC-1. Risque : moyen.*
- [ ] **CASE-ADMIN-303** — Affectation d'un type d'activité (Baleines /
  Dauphins / Privatisation) à un créneau. *Complément portée — AC-1. Risque : moyen.*
- [ ] **CASE-ADMIN-304** — Tentative d'affecter deux activités différentes sur
  le même navire et le même créneau → blocage strict (exclusivité R-12). *Cas limite 1 — AC-2. Risque : élevé.*
- [ ] **CASE-ADMIN-305** — Affectation du naturaliste unique à une sortie
  Baleines. *Complément portée — AC-1. Risque : moyen.*
- [ ] **CASE-ADMIN-306** — Tentative de programmer deux sorties Baleines
  simultanées sur deux sites distants → alerte et blocage (naturaliste
  unique, R-15). *Cas limite 2. Risque : élevé.*

---

## Total proposé

**46 cas** sur les 7 spécifications admin existantes (blocs 001–350), plage
351–399 laissée vide en réserve. (Précédente version : 54 cas — 8 retirés ou
fusionnés lors de la revue des doublons du 17/08/2026, voir tableau plus haut.)

## Comment valider

1. Coche (`[x]`) les cas que tu veux voir générés en fichiers, dans l'ordre ou
   pas.
2. Barre / commente ceux que tu ne veux pas.
3. Dis-moi si tu veux ajuster la taille des blocs, le niveau de risque proposé,
   ou en ajouter — je régénère ce sommaire avant de passer à la génération des
   fichiers `CASE-ADMIN-0XX.md`.
