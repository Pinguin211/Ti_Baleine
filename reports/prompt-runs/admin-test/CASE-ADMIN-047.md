# Run — CASE-ADMIN-047

**Fichier de test :** tests/tests-unitaires/admin/case-admin-047.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-047.test.ts
- tests/cases/admin/CASE-ADMIN-047.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-047.test.ts -t "test_CASE_ADMIN_047_affichage_specifique_creneau_privatise_blocage_jauge"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/capacity/calculer-remplissage-creneau.ts` — `calculerRemplissageCreneau({ jaugeMax: 12, placesReservees: 1, estPrivatise: true })`. Le champ optionnel `estPrivatise` en entrée force la sortie à bloquer l'intégralité de la jauge (`placesRestantes: 0`), porter la mention `libelleAffichage: 'Navire privatisé'` et désactiver `estReservable`, conformément à R-12.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La section Données du CASE ne donne pas de nombre de billets ; le champ `placesReservees: 1` a été fixé à partir de la note de la classe `Reservation` du domain.puml (« Privatisation : regroupe 1 billet forfaitaire (PRIVATISATION) »), et non inventé.
- Le paramètre `estPrivatise` et le champ de sortie `libelleAffichage` ne sont pas des attributs de `Creneau` dans domain.puml (qui n'a que `activite: Activite`, avec les valeurs `PRIVATISATION_TIKAP` / `PRIVATISATION_GRAND_BLEU`) ; ils sont introduits comme entrée/sortie du service de calcul, dérivés de ces valeurs d'énumération, pas comme nouvel attribut d'entité persistée.
