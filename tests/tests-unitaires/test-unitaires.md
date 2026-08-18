# Tests unitaires — stratégie

**Statut :** décision prise — Vitest retenu et configuré
**Date :** 2026-08-13 · mis à jour 2026-08-18

Ce document ne décrit pas des tests déjà écrits — aucun n'existe encore. Il cadre
ce que seront les tests unitaires du projet, pour que leur écriture (déléguée à
l'IA, comme l'automatisation des tests en général) parte d'une décision et non
d'un réflexe.

---

## 1. Pourquoi des tests unitaires, en plus de Playwright

Playwright ([tests/e2e/](../e2e/)) pilote un vrai navigateur sur un parcours
complet : il valide que le système se comporte bien *dans son ensemble*, mais
chaque exécution est lente et coûteuse, et un cas limite métier isolé (un calcul,
une règle, une condition) y est noyé dans le reste du parcours.

Les tests unitaires visent l'inverse : isoler une règle métier — une fonction, une
classe — de tout le reste (pas de navigateur, pas de base de données, pas de
réseau), pour vérifier rapidement et exhaustivement ses cas limites. Les deux sont
complémentaires, pas redondants :

| | Tests unitaires | Playwright (E2E) |
|---|---|---|
| Ce qu'ils valident | une règle métier isolée | un parcours utilisateur bout en bout |
| Vitesse | millisecondes | secondes |
| Dépendances | aucune (pas de DB, pas de réseau, pas d'UI) | application démarrée, navigateur réel |
| Où ils vivent | à côté du code métier | [tests/e2e/](../e2e/) |

## 2. Portée envisagée

Ce projet n'a pas encore de code (`src/` est vide) : la liste ci-dessous vient des
règles déjà écrites dans les specs, à titre d'exemples de ce qui *devrait* être
couvert unitairement une fois le code correspondant écrit. Elle se complète au fil
de l'implémentation, pas d'un coup.

- [SPEC-RESERVATION-03](../../specs/reservation.md) — calcul du montant dû
  (participants × prix du créneau), et son rejet en cas d'écart (AC-7) ;
- [SPEC-RESERVATION-03](../../specs/reservation.md) — décompte des places
  restantes d'un créneau, y compris les bornes (dernière place, groupe = places
  restantes, groupe > places restantes, 0 ou nombre négatif de participants) ;
- [SPEC-FAC-02](../../specs/facturation.md) — idempotence de l'émission de
  facture (AC-6 : un webhook de paiement reçu en double ne doit produire ni
  deuxième facture, ni deuxième courriel) ;
- toute règle de calcul ou de décision **pure** (ne dépendant que de ses
  entrées, sans effet de bord) introduite par une future spec — notamment celles
  d'annulation (`CANCEL`), une fois écrites.

Ce que les tests unitaires **ne couvrent pas** : l'affichage, la navigation, la
soumission d'un vrai formulaire, l'envoi réel d'un SMS ou d'un paiement — ça
reste le rôle de Playwright et de [tests/cases/](../cases/).

## 3. Outillage — décision prise : Vitest + jsdom + React

**Vitest** a été retenu (2026-08-18). Installé en `devDependency` (`vitest ^4.1.10`)
et configuré dans [`vitest.config.ts`](../../vitest.config.ts) à la racine du projet.

Packages installés :

| Package | Rôle |
|---|---|
| `vitest` | runner de tests |
| `jsdom` | émulation DOM dans Node |
| `@vitejs/plugin-react` | transformation JSX pour les tests React |
| `@testing-library/react` | utilitaires de rendu de composants React |
| `@testing-library/jest-dom` | matchers DOM (`toBeInTheDocument`, `toHaveTextContent`…) |

Points clés de la configuration :

| Paramètre | Valeur | Raison |
|---|---|---|
| `environment` | `jsdom` | DOM disponible, tests de composants React possibles |
| `include` | `tests/tests-unitaires/**/*.test.{ts,tsx}` | dossier dédié, non colocalisé |
| `setupFiles` | `tests/tests-unitaires/setup.ts` | charge `@testing-library/jest-dom` pour tous les tests |
| `globals` | `false` | imports explicites (`import { describe, it, expect } from 'vitest'`) |

Scripts disponibles :

```bash
npm test           # vitest run — exécution unique (CI)
npm run test:watch # vitest     — mode watch (développement)
```

## 4. Convention

- Même règle de traçabilité que le reste du projet : l'ID `CASE-<DOM>-nn` dans le
  nom du test, ex. `CASE_RESERVATION_07_montant_egal_participants_fois_prix`.
- **Emplacement : dossier dédié** `tests/tests-unitaires/`, organisé en
  sous-dossiers par domaine (ex. `reservation/`, `facturation/`).
- Extension : `.test.ts` pour la logique pure, `.test.tsx` pour les composants React.
- Un test unitaire ne remplace pas un cas de test défini dans
  [tests/cases/](../cases/) : il en est une déclinaison technique, pas une source
  supplémentaire de vérité métier.

## 5. Ce qui n'est pas défini

- ~~*2026-08-13* — Outil retenu (Vitest ou Jest) : en attente de décision d'équipe.~~
  → *2026-08-18* — **Vitest retenu et configuré.**
- ~~*2026-08-13* — Emplacement définitif des fichiers de test unitaires
  (colocalisés vs dossier dédié) : proposition à confirmer une fois `src/`
  scaffoldé.~~
  → *2026-08-18* — **Dossier dédié** `tests/tests-unitaires/`, organisé par domaine.
