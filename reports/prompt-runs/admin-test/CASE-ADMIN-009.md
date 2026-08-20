# Run — CASE-ADMIN-009

**Fichier de test :** tests/tests-unitaires/admin/case-admin-009.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-009.test.ts
- tests/cases/admin/CASE-ADMIN-009.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-009.test.ts -t "test_CASE_ADMIN_009_maintien_affichage_creneau_sous_seuil_6_passagers_sans_annulation_auto"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/planning/verifier-maintien-creneau-sous-seuil.service.ts` exportant :
`export function verifierMaintienCreneauSousSeuil(params: { billetsActifs: number; seuilMaintien: number; estAHeureMoins2: boolean }): { creneauActif: boolean; creneauAfficheAuPlanning: boolean; annulationAutomatiqueDeclenchee: boolean; billetsActifsRestants: number }`
Traduit la règle R-09 (Portée §3 SPEC-ADMIN-01) : sous le seuil de maintien, aucune annulation automatique n'est déclenchée, quel que soit le moment (y compris à H-2).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` ne porte pas d'attribut « seuil de maintien » ni de champ « billets actifs » directement sur `Creneau` (le nombre de billets se déduit normalement du décompte de l'association `Reservation *-- Billet`, hors périmètre du calcul de jauge couvert par `SPEC-ADMIN-05`). On suppose donc une interface de service dédiée prenant en paramètres le décompte déjà agrégé (`billetsActifs`) plutôt que de recalculer l'agrégation, celle-ci étant l'objet d'un autre cas (`CASE-ADMIN-041`).
