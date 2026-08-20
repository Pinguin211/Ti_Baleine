# Cas d'utilisation — Ti'Baleine

**Source :** `docs/cdc/cahier-des-charges-v3.md`
**Objet :** inventaire simplifié des acteurs et cas d'utilisation, transformé en
diagramme (`docs/uml/use-cases.puml` → `use-cases.svg`, cf. `docs/uml/README.md`).

Le vocabulaire reprend celui du client (« sortie », « créneau », « jauge », « port
d'embarquement »).

**Choix de granularité :** un cas d'utilisation regroupe ici tout un parcours
métier (ex. l'ensemble du tunnel de réservation), pas chaque écran ni chaque
étape. Objectif : un diagramme lisible d'un coup d'œil, pas un inventaire
exhaustif des exigences — celui-ci reste dans le §9 du CDC et dans les futures
`SPEC-<DOM>-xx`.

---

## 1. Acteurs

### Acteurs primaires

| Acteur | Description |
|---|---|
| **Client** | Touriste ou local, réserve et paie en mode invité. Regroupe les personas Sophie et Marc — comportement système identique. |
| **Administrateur** | Profil unique de back-office chez Ti'Baleine. |

### Acteurs secondaires (systèmes externes)

| Acteur | Description |
|---|---|
| **Passerelle de paiement CB** | Traite le paiement carte bancaire 100 % en ligne. |
| **Service de notification (e-mail / SMS)** | Délivre l'e-mail de confirmation + facture PDF au client, et le SMS d'annulation. Les deux canaux sont regroupés en un seul acteur externe pour la lisibilité du diagramme ; le détail de qui déclenche quoi reste dans les fiches ci-dessous. |

Le Naturaliste et la Capitainerie / Affaires Maritimes restent hors diagramme :
aucune interaction avec le système (§4 du CDC).

---

## 2. Cas d'utilisation (5)

### UC-1 — Réserver une sortie en mer

- **Acteur principal :** Client
- **Acteurs secondaires :** Passerelle de paiement CB, Service de notification
- **Résumé :** parcours complet — choix du port et du type de sortie, créneau
  disponible, nombre de passagers et tarif, coordonnées de contact, paiement
  intégral par carte bancaire, confirmation à l'écran puis par e-mail avec
  facture PDF.
- **Exigences :** REQ-001 à REQ-008, REQ-012 (blocage automatique au-delà de la
  capacité du créneau, vérifié pendant le paiement).

### UC-2 — Réserver une formule de privatisation

- **Acteur principal :** Client
- **Résumé :** variante d'UC-1 quand le type de sortie choisi est
  « Privatisation » : demi-journée (matin 7h–12h ou après-midi dès 14h) à la
  place d'un créneau horaire fixe, tarif forfaitaire 600 € (Tikap, les deux
  ports).
- **Relation :** `<<extend>>` de UC-1 (point d'extension : type de sortie =
  Privatisation).
- **Exigence :** REQ-016.

### UC-3 — Consulter le planning et le remplissage des créneaux

- **Acteur principal :** Administrateur
- **Résumé :** vue consolidée du planning par port, jour et créneau, avec les
  jauges réelles (12, 24 ou 36 places) et le signalement des créneaux sous le
  seuil de maintien (6 passagers) ou complets.
- **Exigences :** REQ-009, REQ-010. **Spécification :** SPEC-ADMIN-01.

### UC-4 — Gérer une réservation (annuler ou réduire les passagers)

- **Acteur principal :** Administrateur
- **Acteur secondaire :** Service de notification (uniquement pour
  l'annulation totale)
- **Résumé :** regroupe les deux seules actions de modification autorisées
  côté back-office :
  - **annulation totale**, avec libération synchrone des places et envoi
    automatique d'un SMS d'information au client ;
  - **réduction du nombre de passagers**, avec libération des places
    excédentaires — sans ajout de passager ni report de date, et **sans SMS**.
- **Exigences :** REQ-013, REQ-014, REQ-015, REQ-107 (cohérence de la jauge en
  cas d'opérations concurrentes). **Spécification :** SPEC-ADMIN-02.

> **Point de vigilance :** ne pas faire déduire du diagramme que le SMS est
> systématique — il n'accompagne que l'annulation totale (R-17), jamais la
> réduction de passagers (R-18).

### UC-5 — Configurer la disponibilité des créneaux

- **Acteur principal :** Administrateur
- **Résumé :** ajustement de la disponibilité/configuration des créneaux
  depuis le tableau de bord (priorité *Could*).
- **Exigence :** REQ-011.

---

## 3. Tableau de synthèse

| ID | Cas d'utilisation | Acteur principal | Acteur(s) secondaire(s) | Relation | REQ |
|---|---|---|---|---|---|
| UC-1 | Réserver une sortie en mer | Client | Passerelle CB, Service de notification | — | REQ-001→008, REQ-012 |
| UC-2 | Réserver une formule de privatisation | Client | — | `<<extend>>` de UC-1 | REQ-016 |
| UC-3 | Consulter le planning et le remplissage | Administrateur | — | — | REQ-009, REQ-010 |
| UC-4 | Gérer une réservation (annuler / réduire) | Administrateur | Service de notification | — | REQ-013→015, REQ-107 |
| UC-5 | Configurer la disponibilité des créneaux | Administrateur | — | — | REQ-011 |

---

## 4. Rappel — hors périmètre (à ne pas modéliser)

- Le client annule, modifie ou ajoute des passagers en autonomie en ligne.
- Le client reporte la date d'une réservation existante.
- Création de compte / espace membre public.
- Comptes secondaires côté administration (capitaine, vendeur).
- Remboursement bancaire automatisé (reste manuel, hors système).
- Synchronisation avec des agendas externes.
- Notification admin à chaque nouvelle réservation.

---

## 5. Pour construire le diagramme

- 2 acteurs primaires, 2 acteurs secondaires, **5 cas d'utilisation** dans un
  seul système englobant (« Ti'Baleine — plateforme de réservation »).
- Une seule relation `<<extend>>` (UC-2 → UC-1). Pas d'`<<include>>` : à cette
  granularité, chaque cas est autoporteur.
- Une seule note sur le diagramme (le point de vigilance SMS d'UC-4) — le
  détail des REQ reste dans ce document, pas sur le schéma, pour ne pas le
  surcharger.
