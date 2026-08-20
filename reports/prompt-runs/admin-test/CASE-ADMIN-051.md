# Run — CASE-ADMIN-051

**Fichier de test :** tests/tests-unitaires/admin/case-admin-051.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-051.test.ts
- tests/cases/admin/CASE-ADMIN-051.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-051.test.ts -t "test_CASE_ADMIN_051_envoi_combine_simultane_alerte_sms_email"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Même action `src/actions/envoyer-alerte-groupee.ts`, appelée avec `canal: 'SMS_EMAIL'` : les deux ports `EnvoiSms` et `EnvoiEmail` doivent être sollicités pour chaque réservataire, et le créneau ciblé doit basculer `sousPreAlerte = true` dans le résultat retourné.
- Types et ports identiques aux cas précédents (`src/schemas/types/alerte.types.ts`, `src/schemas/types/alerte-ports.types.ts`).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La section Données ne précise ni le nombre ni l'identité des « clients inscrits sur les créneaux ciblés » ; une fixture de 2 clients avec téléphone et e-mail a été introduite pour vérifier la double réception par chaque client.
- Un seul créneau représentatif a été utilisé (la multiplicité des créneaux étant déjà couverte par CASE-ADMIN-048).
