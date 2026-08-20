# Run — CASE-ADMIN-042

**Fichier de test :** tests/tests-unitaires/admin/case-admin-042.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-042.test.ts
- tests/cases/admin/CASE-ADMIN-042.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-042.test.ts -t "test_CASE_ADMIN_042_calcul_taux_remplissage_mardi_jeudi_matin_saint_gilles_jauge_24"

**Emplacement et interface déduits pour le futur code sous src/ :**
Mêmes deux fonctions que CASE-ADMIN-041 (partagées entre tous les cas de SPEC-ADMIN-05) :
- `src/services/server/planning/determiner-jauge-creneau.ts` — `determinerJaugeCreneau({ port, jourSemaine, heureDepart })`, ici appelée avec `{ port: 'SAINT_GILLES', jourSemaine: 'MARDI', heureDepart: '07:00' }` pour vérifier l'application de la règle R-10 (jauge 24 avec Grand Bleu seul).
- `src/services/server/capacity/calculer-remplissage-creneau.ts` — `calculerRemplissageCreneau({ jaugeMax, placesReservees })` pour le décompte/pourcentage/places restantes.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Même hypothèse de typage `jourSemaine` que CASE-ADMIN-041 (paramètre de service, pas un attribut du domain.puml).
- La règle R-10 n'est explicitée dans domain.puml que via la note de `ConfigBateau` (« Jauge max selon navire(s) mobilisé(s) ») ; le détail précis « mar/jeu 7h et 10h » provient de specs/admin.md SPEC-ADMIN-05, pas du diagramme.
