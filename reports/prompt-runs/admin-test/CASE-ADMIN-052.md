# Run — CASE-ADMIN-052

**Fichier de test :** tests/tests-unitaires/admin/case-admin-052.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-052.test.ts
- tests/cases/admin/CASE-ADMIN-052.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-052.test.ts -t "test_CASE_ADMIN_052_preremplissage_instantane_template_meteo_defavorable"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/alerts/templates-alerte.ts` exportera :
  - `obtenirTemplateAlerte(id: 'METEO_DEFAVORABLE' | 'INCIDENT_TECHNIQUE'): { id, texteFr, texteEn }` — lecture du catalogue de templates codés en dur (SPEC-ADMIN-06, portée §3 : « propositions de templates bilingues codées en dur »).
  - `composerMessageBilingue(texteFr: string, texteEn: string): string` — règle R-26 de composition FR puis EN.
  - `preremplirZoneMessageAvecTemplate(id): { valeur: string; modifiable: boolean }` — préremplissage instantané de la zone de texte éditable.
- Placement sous `services/server/alerts/` conforme au mapping fixé pour ce domaine (« composition/bascule de statut/journalisation »).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le contenu littéral du template « Météo défavorable » (texte FR et EN exacts) n'est pas fourni par le CASE ni par la spec (les templates sont « codés en dur dans l'interface », détail d'implémentation future) ; le test ne fixe donc pas de texte en dur mais vérifie la cohérence structurelle entre `obtenirTemplateAlerte` + `composerMessageBilingue` et `preremplirZoneMessageAvecTemplate`, sans préjuger du contenu final.
- Une structure `ZoneMessageAlerte { valeur, modifiable }` a été introduite pour représenter l'état de la zone de texte éditable ; cette structure n'est pas une entité du domain.puml (elle représente un état d'interface, pas une entité persistée) et est traitée comme relevant de ce qui « entoure » le cas testé.
