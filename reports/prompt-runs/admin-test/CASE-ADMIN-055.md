# Run — CASE-ADMIN-055

**Fichier de test :** tests/tests-unitaires/admin/case-admin-055.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-055.test.ts
- tests/cases/admin/CASE-ADMIN-055.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-055.test.ts -t "test_CASE_ADMIN_055_presence_obligatoire_message_bilingue_combine_fr_en"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/alerts/templates-alerte.ts` : `composerMessageBilingue(texteFr, texteEn): string` pour la règle R-26 (FR puis EN dans un corps unique).
- `src/actions/envoyer-alerte-groupee.ts` : `envoyerAlerteGroupee` pour vérifier qu'un seul et même message combiné est diffusé indistinctement par SMS et par e-mail à tous les destinataires.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les textes FR/EN utilisés (« Sortie annulée en raison de conditions météorologiques défavorables. » / « Trip cancelled due to unfavorable weather conditions. ») sont des exemples représentatifs introduits pour exercer `composerMessageBilingue`, le CASE ne fournissant pas de texte précis (il porte sur la structure FR+EN, non sur le contenu).
- Deux clients fictifs et un créneau minimaliste ont été introduits pour vérifier que le message combiné est bien identique pour tous les destinataires (« indistinctement »).
