# Run — CASE-ADMIN-058

**Fichier de test :** tests/tests-unitaires/admin/case-admin-058.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-058.test.ts
- tests/cases/admin/CASE-ADMIN-058.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-058.test.ts -t "test_CASE_ADMIN_058_desactivation_bouton_envoi_aucun_creneau_selectionne"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/schemas/validation/alerts/selection-alerte.schema.ts` exportant :
- `verifierSelectionCreneauxAlerte(selection: { creneauxSelectionnesIds: string[] }): { valide: boolean; boutonActif: boolean }`
Composant UI sous `src/components/domain/alerts/`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Lorsque l'administrateur ne sélectionne aucun créneau pour l'envoi d'alerte météo, le bouton d'action est désactivé (`boutonActif: false`) et la soumission est invalidée.
