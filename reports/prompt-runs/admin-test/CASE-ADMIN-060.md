# Run — CASE-ADMIN-060

**Fichier de test :** tests/tests-unitaires/admin/case-admin-060.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-060.test.ts
- tests/cases/admin/CASE-ADMIN-060.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-060.test.ts -t "test_CASE_ADMIN_060_blocage_envoi_alerte_corps_message_vide"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/schemas/validation/alerts/selection-alerte.schema.ts` exportant `validerEnvoiAlerte(...)` et `src/actions/envoyer-alerte-groupee.ts`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Un corps de message d'alerte vide ou composé uniquement d'espaces est rejeté par la validation de schéma.
- Aucun SMS n'est transmis à la passerelle et le statut des créneaux cibles n'est pas altéré.
