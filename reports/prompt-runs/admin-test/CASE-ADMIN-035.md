# Run — CASE-ADMIN-035

**Fichier de test :** tests/tests-unitaires/admin/case-admin-035.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-035.test.ts
- tests/cases/admin/CASE-ADMIN-035.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-035.test.ts -t "test_CASE_ADMIN_035_interception_acces_non_authentifie_redirection_login"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/app/admin/garde-route-protegee.ts` (mapping "garde de route / redirection ->
  src/app/admin/") exportant
  `verifierAccesRouteProtegee(requete: { url: string; session: SessionAdministrateur | null }, ports: { horloge: Horloge }): ResultatGarde`
  où `ResultatGarde = { intercepte: boolean; accesAutorise: boolean; sessionExpiree?: boolean; deconnecte?: boolean; redirection: string | null }`.
  Cette même fonction est réutilisée par CASE-ADMIN-039, 070 et 071 (guard unique pour toutes les
  routes protégées du back-office).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- `docs/uml/domain.puml` n'a pas d'entité « Session » : le paramètre `session` du guard est
  `SessionAdministrateur | null`, un type d'infrastructure (cf. hypothèse notée dans
  CASE-ADMIN-033), pas une entité de domaine.
- Seule l'URL `/admin/planning` (Données) est utilisée ; le Gherkin cite aussi
  `/admin/reservations` à titre d'exemple alternatif, non repris car absent des Données.
- La forme exacte du résultat (`ResultatGarde`) est déduite pour permettre la réutilisation par les
  cas 039/070/071 ; seuls les champs `intercepte`, `accesAutorise` et `redirection` sont vérifiés
  ici, conformément aux 3 lignes Alors/Et du Gherkin.
