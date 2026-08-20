# Run — CASE-ADMIN-044

**Fichier de test :** tests/tests-unitaires/admin/case-admin-044.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-044.test.ts
- tests/cases/admin/CASE-ADMIN-044.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-044.test.ts -t "test_CASE_ADMIN_044_affichage_creneau_0_billet_actif_taux_0_pourcent"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/capacity/calculer-remplissage-creneau.ts` — `calculerRemplissageCreneau({ jaugeMax: 36, placesReservees: 0 })`. Ce cas n'a pas besoin de `determiner-jauge-creneau` car la section Données du CASE donne directement la jauge (36 places), sans jour/heure à résoudre — seule la division par la jauge (cas 0 billet, sans division par zéro) est sous test.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La section Données de CASE-ADMIN-044 ne précise ni jour ni heure du créneau (seulement « 36 places — 0 billet actif ») ; la jauge de 36 est donc injectée directement dans `calculerRemplissageCreneau` sans passer par `determinerJaugeCreneau`, ce qui est cohérent avec le fait que ce cas ne teste pas la règle de jauge dynamique mais le cas limite « 0 billet ».
