# Matrice de traçabilité — équipe `RageGit - KohLanta`

Reprise au créneau 16h15, avec le journal. C'est le seul endroit où l'état de la
chaîne se lit d'un coup d'œil.

```text
CR-01/Q47, CR-05/§3 → REQ-008 → SPEC-FAC-02 → CASE-FAC-700..723 → tests-unitaires/facturation → 94c32ad
```

Une ligne par spécification. La remplir n'est pas une formalité de fin de
journée : c'est parcourir votre propre chaîne et voir où elle s'arrête. Personne
ne vous signalera un maillon manquant à votre place.

**Ce document ne se reconstitue pas la veille du rendu.** `git log` sur ce fichier
montre les jours où il a été tenu.

---

## Comment la remplir

| Colonne | Ce qu'on y met | Où le trouver |
|---|---|---|
| SPEC | l'identifiant de la spécification | titre de section dans `specs/<domaine>.md` |
| REQ | la ou les exigences qu'elle réalise | `docs/cahier-des-charges-v5.md` |
| Source | l'échange dont l'exigence est issue, ou `déduit` | `concept/question.*.md`, `concept/resume.md` |
| Cas de test | le ou les cas qui la couvrent | `tests/cases/<domaine>/CASE-*.md` |
| Tests | le nom du test automatisé | `tests/tests-unitaires/<domaine>/` |
| Commits | le ou les sha courts | `git log --grep=<SPEC-ID>` |

Un maillon qui n'existe pas encore se note `—`. Plusieurs valeurs dans une case se
séparent par une virgule.

> Référentiel actuel : CDC v5 (19/08/2026) dans `docs/cahier-des-charges-v5.md`.

**Les six ruptures à surveiller :** une exigence sans source · une source citée
qui n'existe pas dans vos comptes rendus · une spécification qu'aucun cas de test
ne couvre · un cas de test sans test automatisé · une exigence que plus aucune
spécification ne reprend · un cas de test utilisé dans `tests/` mais défini nulle
part.

---

## Matrice Fonctionnelle

| SPEC | REQ | Source | Cas de test | Tests | Commits |
|---|---|---|---|---|---|
| `SPEC-ADMIN-01` | `REQ-009, REQ-010, REQ-023` | `CR-02/Q01, CR-02/Q03, CR-03/Q13, CR-05/Q05` | `CASE-ADMIN-001..009, CASE-ADMIN-077..078` | `tests/tests-unitaires/admin/case-admin-{001..009,077,078}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-ADMIN-02` | `REQ-013, REQ-014, REQ-020` | `CR-03/Q01, CR-03/Q02, CR-04/Q07, CR-04/Q08, CR-05/Q04` | `CASE-ADMIN-010..022, CASE-ADMIN-079` | `tests/tests-unitaires/admin/case-admin-{010..022,079}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-ADMIN-03` | `REQ-015` | `CR-03/Q03` | `CASE-ADMIN-023..032, CASE-ADMIN-069` | `tests/tests-unitaires/admin/case-admin-{023..032,069}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-ADMIN-04` | `REQ-103` | `CR-02/Q06, CR-05/§3` | `CASE-ADMIN-033..040, CASE-ADMIN-070..071` | `tests/tests-unitaires/admin/case-admin-{033..040,070,071}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-ADMIN-05` | `REQ-010` | `CR-02/Q01, CR-03/Q13` | `CASE-ADMIN-041..047, CASE-ADMIN-072` | `tests/tests-unitaires/admin/case-admin-{041..047,072}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-ADMIN-06` | `REQ-017, REQ-018, REQ-019` | `CR-04/Q01, CR-04/Q02, CR-04/Q03, CR-04/Q04, CR-04/Q05, CR-04/Q06` | `CASE-ADMIN-048..061, CASE-ADMIN-073` | `tests/tests-unitaires/admin/case-admin-{048..061,073}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-ADMIN-07` | `REQ-011` | `CR-02/Q12` | `CASE-ADMIN-062..068` | `tests/tests-unitaires/admin/case-admin-{062..068}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-ADMIN-08` | `REQ-022` | `CR-05/§3, CR-05/Q05` | `CASE-ADMIN-074..076, CASE-ADMIN-080` | `tests/tests-unitaires/admin/case-admin-{074..076,080}.test.ts` | `5c7bed2, 5b9b3f7, 6fa2ebf` |
| `SPEC-FAC-02` | `REQ-008` | `CR-01/Q47, CR-03/Q16, CR-05/§1, CR-05/§3` | `CASE-FAC-700..723` | `tests/tests-unitaires/facturation/CASE-FAC-{700..723}.test.ts` | `94c32ad, af80611, b4fd285` |
| `SPEC-RESERVATION-03` | `REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, REQ-007, REQ-012, REQ-016, REQ-019, REQ-021` | `CR-01/Q02, CR-01/Q07, CR-01/Q09, CR-01/Q24, CR-01/Q25, CR-01/Q35, CR-02/§3, CR-02/Q01, CR-02/Q04, CR-03/Q01, CR-03/Q06, CR-03/Q07, CR-03/Q09, CR-03/Q11, CR-03/Q13, CR-03/Q15, CR-03/Q17, CR-04/§3, CR-04/Q05, CR-05/§1, CR-05/Q02, CR-05/Q03, CR-05/§3` | `CASE-RES-400..421` | `tests/tests-unitaires/reservation/case-res-{400..403,405..416,418..421}.test.ts` | `f13ca18, d1e1bc4` |

> `REQ-012` est couverte exclusivement par `SPEC-RESERVATION-03`.  
> `REQ-019` est répartie : `SPEC-ADMIN-06` (déclenche le statut, alerte unique par créneau) + `SPEC-RESERVATION-03` (affiche la mention côté public).  
> `REQ-020` : le motif d'annulation est saisi à la volée pour composer le SMS informatif envoyé au client (sans détail financier) ; le calcul indicatif de remboursement est affiché uniquement à l'administrateur dans le back-office et n'est pas enregistré en base.  
> `REQ-021` : envoi automatique à J-1 du SMS avec lien sécurisé de solde (durée 1h — `REQ-107`) couvert par `SPEC-RESERVATION-03`.  
> `REQ-022` : enregistrement du règlement du solde par carte bancaire sur place couvert par `SPEC-ADMIN-08`.  
> `REQ-023` : consultation le jour J des statuts de paiement (payée complètement / partiellement) couverte par `SPEC-ADMIN-01`.  
> `REQ-006` : paiement de l'acompte obligatoire (30 % standard, 50 % privatisation) couvert par `SPEC-RESERVATION-03`.  
> `REQ-008` : double facturation distincte (acompte et solde) couverte par `SPEC-FAC-02`.

---

## Matrice Architecture & Gouvernance

| SPEC | REQ | Source | Cas de test | Tests | Commits |
|---|---|---|---|---|---|
| `SPEC-ARCH-01` | `REQ-101, REQ-105` (qualité & maintenabilité) | `déduit (Normes TypeScript/React & Limites volumétriques)` | `CASE-ARCH-1000..1009, CASE-ARCH-1021..1022` | `tests/tests-unitaires/architecture/spec-arch-01/CASE-ARCH-{1000..1009,1021,1022}.test.ts` | `4796e5a, b085123` |
| `SPEC-ARCH-02` | `REQ-103, REQ-105` (modularité & étanchéité) | `déduit (Isolation Server/Client Next.js & flux unidirectionnel)` | `CASE-ARCH-1010..1020` | `tests/tests-unitaires/architecture/spec-arch-02/CASE-ARCH-{1010..1020}.test.ts` | `4796e5a, 3b0020d` |
| `SPEC-ARCH-03` | `REQ-105` (auditabilité & gouvernance) | `déduit (Génération automatique rapport Markdown d'audit)` | `CASE-ARCH-1023..1027` | `tests/tests-unitaires/architecture/spec-arch-03/CASE-ARCH-{1023..1027}.test.ts`, `scripts/arch-audit.ts` | `4796e5a` |

---

## Exigences non couvertes / Suivi transverse

Une exigence qu'aucune spécification ne reprend n'apparaît nulle part dans le
tableau ci-dessus. C'est la rupture la plus facile à ne pas voir, et elle se
crée toute seule quand le client change d'avis.

| REQ | Priorité | Pourquoi elle n'est pas encore spécifiée / Statut |
|---|---|---|
| `REQ-102` | — (non fonctionnelle) | Compatibilité desktop/tablette/mobile du parcours client (réservation et paiement solde) : prise en compte lors du développement de l'interface front Next.js responsive (`src/app/(public)/`). |
| `REQ-104` | — (non fonctionnelle) | Conformité PCI-DSS de la passerelle de paiement : assurée par délégation sécurisée côté passerelle de paiement (Stripe Elements / redirection). |
| `REQ-109` | — (non fonctionnelle) | Durée et politique de purge des données personnelles RGPD en attente de formalisation (Question ouverte n°6 §11 du CDC v5). Facturation sans rétention PDF disque (`SPEC-FAC-02`). |

> **Note de couverture globale :** L'ensemble des 23 exigences fonctionnelles (`REQ-001` à `REQ-023`) est intégralement couvert par les 10 spécifications fonctionnelles ci-dessus.  
> Parmi les exigences non fonctionnelles (`REQ-101` à `REQ-109`) :
> - `REQ-103` est rattachée en exigence principale à `SPEC-ADMIN-04` (et secondaire dans `SPEC-ADMIN-01`, `SPEC-ARCH-02`) ;
> - `REQ-101`, `REQ-105`, `REQ-106`, `REQ-107` et `REQ-108` (cohérence instantanée des jauges, transactionalité, bilinguisme) sont couvertes dans `SPEC-ADMIN-03`, `SPEC-ADMIN-05`, `SPEC-ADMIN-06`, `SPEC-RESERVATION-03`, `SPEC-ARCH-01..03` ;
> - `REQ-102`, `REQ-104` et `REQ-109` sont suivies ci-dessus.

---

## Trous connus

Ce que vous savez incomplet, et ce que vous comptez en faire. **Un trou déclaré
n'est pas une faute. Un trou qu'on découvre à votre place en est une.**

Une matrice sans aucun trou en cours de projet est plus suspecte qu'une matrice
qui en annonce trois.

| Quoi | Depuis | Pourquoi | Ce qu'on en fait |
|---|---|---|---|
| Remboursements bancaires (`SPEC-ADMIN-02`, `SPEC-ADMIN-03`) | J3 | Les remboursements suite à annulation ou réduction sont 100 % manuels hors système selon la formule sur montant total (R-29, C-10, C-27). | Assumé : aucun flux bancaire sortant dans le système, calcul indicatif affiché à l'administrateur uniquement, notification SMS client purement informative, traitement financier manuel par la gérance. |
| Verrouillage temporaire du panier (`SPEC-RESERVATION-03`) | 14/08/2026 | Verrouillage anti-surbooking pendant le paiement CB (Question ouverte n°12 §11 du CDC v5). | Hypothèse retenue d'un timer de 10 min pour bloquer les places le temps du paiement, à valider avec le client. |
| Prestataire et canal SMS (`SPEC-ADMIN-02`, `SPEC-ADMIN-06`, `SPEC-RESERVATION-03`) | 14/08/2026 | Prestataire SMS et modalités d'envoi (Questions ouvertes n°2, n°13, n°14 §11 du CDC v5). | Hypothèse retenue : passerelle SMS REST standard (Twilio/OVH) ; SMS pour annulation sèche, lien de solde à J-1 et SMS+Email pour pré-alerte. |
| Rebonds d'e-mails de facturation (`SPEC-FAC-02`) | J3 | Boîte client pleine ou adresse erronée sans mécanisme de secours automatique. | Statut d'échec d'envoi consigné en base pour suivi de l'administrateur. |

> **Repère :** l'entrée `J6` (19/08/2026) est consignée dans `docs/journal.md` et formalise les arbitrages CDC v5 / CR-05 (paiement scindé, double facturation, solde CB sur place et consultation jour J).
