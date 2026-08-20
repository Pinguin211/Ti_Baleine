# Run — CASE-ADMIN-043

**Fichier de test :** tests/tests-unitaires/admin/case-admin-043.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-043.test.ts
- tests/cases/admin/CASE-ADMIN-043.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-043.test.ts -t "test_CASE_ADMIN_043_calcul_taux_remplissage_mardi_jeudi_matin_saint_leu_jauge_12"

**Emplacement et interface déduits pour le futur code sous src/ :**
Mêmes deux fonctions que CASE-ADMIN-041/042 :
- `src/services/server/planning/determiner-jauge-creneau.ts` — `determinerJaugeCreneau({ port: 'SAINT_LEU', jourSemaine: 'JEUDI', heureDepart: '09:00' })` pour vérifier la règle R-01 (jauge fixe 12 places, navire Tikap).
- `src/services/server/capacity/calculer-remplissage-creneau.ts` — `calculerRemplissageCreneau({ jaugeMax, placesReservees })`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Même hypothèse de typage `jourSemaine` que CASE-ADMIN-041.
- Le domain.puml établit Saint-Leu = Tikap 12 places via la note de `ConfigBateau`/`ConfigPort`, mais ne code pas explicitement R-01 comme règle ; l'association port/navire/jauge est déduite de ces notes.
