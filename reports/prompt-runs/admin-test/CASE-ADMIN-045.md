# Run — CASE-ADMIN-045

**Fichier de test :** tests/tests-unitaires/admin/case-admin-045.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-045.test.ts
- tests/cases/admin/CASE-ADMIN-045.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-045.test.ts -t "test_CASE_ADMIN_045_affichage_creneau_complet_taux_100_pourcent_badge_complet"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/capacity/calculer-remplissage-creneau.ts` — `calculerRemplissageCreneau({ jaugeMax: 12, placesReservees: 12 })`, dont le champ booléen `estComplet` de la valeur de retour porte la décision d'affichage du badge « Complet ». La couche de présentation (`src/components/domain/capacity/`) consommerait ce champ pour rendre le badge, mais n'est pas testable ici : le projet Vitest `admin` tourne en environnement `node` (sans DOM/jsdom, cf. vitest.config.ts), donc seule la donnée calculée (et non le rendu JSX) est vérifiable dans ce fichier.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le domain.puml ne modélise pas de champ « badge » ou « estComplet » sur `Creneau` : c'est un indicateur de présentation calculé, pas un attribut d'entité persistée, donc conforme à la contrainte de ne pas inventer d'attribut de domaine — il est porté par le type de retour du service (DTO), pas par l'entité.
- Le rendu visuel réel du badge (composant `.tsx`) n'est pas couvert par ce test, faute d'environnement DOM dans le projet Vitest `admin` ; seule la donnée `estComplet` qui piloterait ce rendu est vérifiée.
