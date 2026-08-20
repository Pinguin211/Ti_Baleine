# Run — CASE-ADMIN-072

**Fichier de test :** tests/tests-unitaires/admin/case-admin-072.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-072.test.ts
- tests/cases/admin/CASE-ADMIN-072.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-072.test.ts -t "test_CASE_ADMIN_072_calcul_taux_remplissage_mardi_jeudi_apres_midi_saint_gilles_jauge_36"

**Emplacement et interface déduits pour le futur code sous src/ :**
Mêmes deux fonctions que CASE-ADMIN-041/042/043 :
- `src/services/server/planning/determiner-jauge-creneau.ts` — `determinerJaugeCreneau({ port: 'SAINT_GILLES', jourSemaine: 'MARDI', heureDepart: '14:00' })` pour vérifier le retour à la jauge pleine de 36 places l'après-midi (retour du Tikap, R-01 + R-10 combinées).
- `src/services/server/capacity/calculer-remplissage-creneau.ts` — `calculerRemplissageCreneau({ jaugeMax, placesReservees })`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Même hypothèse de typage `jourSemaine` que CASE-ADMIN-041.
- Le taux attendu 83,33 % (30 ÷ 36 × 100 = 83,333...) est vérifié avec une tolérance à 2 décimales (`toBeCloseTo(83.33, 2)`), la valeur exacte de la Donnée du CASE étant déjà arrondie à 2 décimales dans son énoncé.
