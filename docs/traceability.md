# Matrice de traçabilité — équipe `RageGit - KohLanta`

Reprise au créneau 16h15, avec le journal. C'est le seul endroit où l'état de la
chaîne se lit d'un coup d'œil.

```text
CR-01/Q47 → REQ-008 → SPEC-FAC-02 → — → — → —
```

Exemple illustratif du projet Ti'Baleine — les `—` marquent les maillons pas encore créés (cas de test, tests auto, commits).

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
| REQ | la ou les exigences qu'elle réalise | `docs/cdc/cahier-des-charges-v4.md` |
| Source | l'échange dont l'exigence est issue, ou `déduit` | `docs/compte-rendu-entretien-nn.md` |
| Cas de test | le ou les cas qui la couvrent | `tests/cases/CASE-*.md` |
| Tests | le nom du test automatisé | `tests/` |
| Commits | le ou les sha courts | `git log --grep=<SPEC-ID>` |

Un maillon qui n'existe pas encore se note `—`. Plusieurs valeurs dans une case se
séparent par une virgule.

> Référentiel actuel : CDC v4. Les versions v2/v3 dans `docs/cdc/` sont archivées.

**Les six ruptures à surveiller :** une exigence sans source · une source citée
qui n'existe pas dans vos comptes rendus · une spécification qu'aucun cas de test
ne couvre · un cas de test sans test automatisé · une exigence que plus aucune
spécification ne reprend · un cas de test utilisé dans `tests/` mais défini nulle
part.

---

## Matrice

| SPEC | REQ | Source | Cas de test | Tests | Commits |
|---|---|---|---|---|---|
| `SPEC-ADMIN-01` | `REQ-009, REQ-010` | `CR-02/Q01, CR-02/Q03, CR-03/Q13` | — | — | — |
| `SPEC-ADMIN-02` | `REQ-013, REQ-014, REQ-020` | `CR-03/Q01, CR-03/Q02, CR-04/Q07, CR-04/Q08` | — | — | — |
| `SPEC-ADMIN-03` | `REQ-015` | `CR-03/Q03` | — | — | — |
| `SPEC-ADMIN-04` | `REQ-103` | `CR-02/Q06` | — | — | — |
| `SPEC-ADMIN-05` | `REQ-010` | `CR-02/Q01, CR-03/Q13` | — | — | — |
| `SPEC-ADMIN-06` | `REQ-017, REQ-018, REQ-019` | `CR-04/Q01, CR-04/Q02, CR-04/Q03, CR-04/Q04, CR-04/Q05, CR-04/Q06` | — | — | — |
| `SPEC-ADMIN-07` | `REQ-011` | `CR-02/Q12` | — | — | — |
| `SPEC-FAC-02` | `REQ-008` | `CR-01/Q47, CR-03/Q16` | — | — | — |
| `SPEC-RESERVATION-03` | `REQ-001, REQ-002, REQ-003, REQ-004, REQ-005, REQ-006, REQ-007, REQ-012, REQ-016, REQ-019` | `CR-01/Q02, CR-01/Q07, CR-01/Q09, CR-01/Q24, CR-01/Q25, CR-01/Q35, CR-02/§3, CR-02/Q01, CR-02/Q04, CR-03/Q01, CR-03/Q06, CR-03/Q07, CR-03/Q09, CR-03/Q11, CR-03/Q13, CR-03/Q15, CR-03/Q17, CR-04/§3, CR-04/Q05` | — | — | — |

> `REQ-012` est couverte exclusivement par `SPEC-RESERVATION-03`.
> `REQ-019` est répartie : `SPEC-ADMIN-06` (déclenche le statut) + `SPEC-RESERVATION-03` (affiche la mention côté public).
> `REQ-020` : le motif d'annulation est saisi à la volée pour composer le SMS client ; il n'est pas enregistré en base. Formulation CDC v4 alignée le 17/08/2026.

---

## Exigences non couvertes

Une exigence qu'aucune spécification ne reprend n'apparaît nulle part dans le
tableau ci-dessus. C'est la rupture la plus facile à ne pas voir, et elle se
crée toute seule quand le client change d'avis.

| REQ | Priorité | Pourquoi elle n'est pas encore spécifiée |
|---|---|---|
| `REQ-102` | — (non fonctionnelle) | Compatibilité desktop/tablette/mobile du parcours client : dépend des choix d'UI, pas encore rattachée à une spécification dédiée. |
| `REQ-104` | — (non fonctionnelle) | Conformité PCI-DSS de la passerelle de paiement : dépend du choix du prestataire de paiement, non tranché à ce stade. |
| `REQ-108` | — (non fonctionnelle) | Durée et politique de purge des données personnelles RGPD en attente de formalisation (Question ouverte n°6 §11 du CDC v4). |

> **Note :** L'ensemble des 20 exigences fonctionnelles (`REQ-001` à `REQ-020`) est intégralement couvert par les 9 spécifications listées ci-dessus. Parmi les exigences non fonctionnelles (`REQ-101` à `REQ-108`) : `REQ-103` est rattachée en exigence principale à `SPEC-ADMIN-04` (et secondaire dans `SPEC-ADMIN-01`) ; `REQ-101`, `REQ-105`, `REQ-106` et `REQ-107` sont couvertes en tant que critères secondaires dans une ou plusieurs specs ci-dessus ; `REQ-102`, `REQ-104` et `REQ-108` ne le sont pas encore, d'où leur présence ici. Ces exigences n'ayant pas de priorité Must/Should/Could dans le CDC (section 10), la colonne Priorité reste `—` pour elles.

---

## Trous connus

Ce que vous savez incomplet, et ce que vous comptez en faire. **Un trou déclaré
n'est pas une faute. Un trou qu'on découvre à votre place en est une.**

Une matrice sans aucun trou en cours de projet est plus suspecte qu'une matrice
qui en annonce trois.

| Quoi | Depuis | Pourquoi | Ce qu'on en fait |
|---|---|---|---|
| Remboursements bancaires (`SPEC-ADMIN-02`, `SPEC-ADMIN-03`) | J3 | Les remboursements suite à annulation ou réduction sont 100 % manuels hors système (R-27, R-28, C-10). | Assumé : aucun flux bancaire sortant dans le système, traitement manuel par la gérance. |
| Verrouillage temporaire du panier (`SPEC-RESERVATION-03`) | 14/08/2026 | Verrouillage anti-surbooking pendant le paiement CB (Question ouverte n°12 §11 du CDC v4). | Hypothèse retenue d'un timer de 10 min pour bloquer les places le temps du paiement, à valider avec le client. |
| Prestataire et canal SMS (`SPEC-ADMIN-02`, `SPEC-ADMIN-06`) | 14/08/2026 | Prestataire SMS et modalités d'envoi (Questions ouvertes n°2 et n°13 §11 du CDC v4). | Hypothèse retenue : passerelle SMS REST standard (Twilio/OVH) ; SMS pour annulation sèche et SMS+Email pour pré-alerte. |
| Rebonds d'e-mails de facturation (`SPEC-FAC-02`) | J3 | Boîte client pleine ou adresse erronée sans mécanisme de secours automatique. | Statut d'échec d'envoi consigné en base pour suivi de l'administrateur. |

> **Repère :** l'entrée `J5` (17/08/2026) est consignée dans `docs/journal.md` et formalise les arbitrages CDC v4 / CR-04 (alignement REQ-012/019/020 et traçabilité associée).
