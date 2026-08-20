# Run — CASE-ADMIN-050

**Fichier de test :** tests/tests-unitaires/admin/case-admin-050.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-050.test.ts
- tests/cases/admin/CASE-ADMIN-050.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-050.test.ts -t "test_CASE_ADMIN_050_envoi_alerte_pre_annulation_canal_email_uniquement"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Même action `src/actions/envoyer-alerte-groupee.ts` que CASE-ADMIN-048/049, appelée avec `canal: 'EMAIL'` : seul `ports.envoiEmail` doit être sollicité, `ports.envoiSms` doit rester inutilisé.
- Types et ports identiques : `src/schemas/types/alerte.types.ts`, `src/schemas/types/alerte-ports.types.ts`.
- La passerelle e-mail concrète sera implémentée sous `src/lib/email/` et consommée via le port `EnvoiEmail` injecté à l'action.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les coordonnées des 2 clients réservataires fictifs du créneau « Lendemain 10h00 Saint-Gilles » ne sont pas fournies par la section Données ; une fixture minimale a été introduite pour exercer la diffusion.
- Le corps du message transmis est un texte bilingue représentatif générique, son contenu exact n'étant pas l'objet de ce cas.
