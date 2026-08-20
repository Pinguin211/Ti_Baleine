# Run — CASE-ADMIN-041

**Fichier de test :** tests/tests-unitaires/admin/case-admin-041.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-041.test.ts
- tests/cases/admin/CASE-ADMIN-041.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-041.test.ts -t "test_CASE_ADMIN_041_calcul_taux_remplissage_creneau_standard_saint_gilles_jauge_36"

**Emplacement et interface déduits pour le futur code sous src/ :**
Deux fonctions distinctes, conformes à SPEC-ARCH-02 (services/server/, node-only, aucune dépendance DOM) :
- `src/services/server/planning/determiner-jauge-creneau.ts` — `determinerJaugeCreneau(creneau: { port: 'SAINT_GILLES' | 'SAINT_LEU'; jourSemaine: 'LUNDI'|'MARDI'|'MERCREDI'|'JEUDI'|'VENDREDI'|'SAMEDI'|'DIMANCHE'; heureDepart: string }): number` — traduit la règle dynamique de mobilisation des navires (note `ConfigBateau`/`Creneau.calculerJauge()` du domain.puml : 36 standard, 24 mar/jeu matin Saint-Gilles, 12 Saint-Leu).
- `src/services/server/capacity/calculer-remplissage-creneau.ts` — `calculerRemplissageCreneau({ jaugeMax, placesReservees }): { placesReservees, jaugeMax, tauxRemplissagePourcent, placesRestantes, estComplet, estPrivatise, libelleAffichage, estReservable }` — traduit `Creneau.calculerPlacesReservees()` / `Creneau.placesRestantes()` du domain.puml.
Le nom du fichier cible respecte la convention kebab-case.ts (SPEC-ARCH-01) ; les fonctions sont en camelCase.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le domain.puml ne fournit pas de type `JourSemaine` explicite (l'attribut `Creneau.date` est un `Date` complet) ; un type littéral `jourSemaine` a été introduit comme paramètre de service (et non comme attribut d'entité) pour rester fidèle aux données du CASE, qui donnent le jour de la semaine et l'heure mais aucune date calendaire précise.
- Séparation en deux services (`planning/` pour la détermination de la jauge, `capacity/` pour le calcul du taux) déduite du découpage de dossiers imposé par la consigne ; non explicitement tranchée par specs/architecture.md qui ne mentionne pas ce découpage métier précis.
