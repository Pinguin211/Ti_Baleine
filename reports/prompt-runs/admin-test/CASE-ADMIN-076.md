# Run — CASE-ADMIN-076

**Fichier de test :** tests/tests-unitaires/admin/case-admin-076.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-076.test.ts
- tests/cases/admin/CASE-ADMIN-076.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-076.test.ts -t "test_CASE_ADMIN_076_rejet_encaissement_especes_cheques_vacances_absent_interface"

Vérifié rouge pour la bonne raison : `Error: Cannot find module '../../../src/services/server/payment/moyens-reglement-solde-sur-place'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/payment/moyens-reglement-solde-sur-place.ts` — règle métier de périmètre :
  exporte `obtenirMoyensReglementSoldeSurPlace(reservation): string[]`, qui retourne
  systématiquement `['CARTE_BANCAIRE']` quel que soit l'état de la réservation, en s'appuyant
  strictement sur `CanalPaiement.SUR_PLACE_CB` (seule valeur d'encaissement sur place définie dans
  docs/uml/domain.puml — aucune valeur « espèces » ou « chèques vacances » n'existe dans
  l'énumération du domaine, ce qui matérialise le périmètre strict du CDC v5 §6).
- Aucun appel à `src/actions/` ni à `src/schemas/validation/payment/` n'est nécessaire pour ce cas :
  c'est une fonction de lecture pure, sans effet de bord ni entrée à valider (elle ne fait
  qu'exposer la liste figée des moyens de règlement autorisés sur place).
- Entités du domaine mobilisées : `Reservation` (paramètre, non altéré), énumération
  `CanalPaiement` (`SUR_PLACE_CB`).

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le format exact du retour (tableau de chaînes `'CARTE_BANCAIRE'`, `'ESPECES'`,
  `'CHEQUES_VACANCES'`) est une hypothèse de test : le domaine (docs/uml/domain.puml) ne définit
  aucune valeur « espèces » ni « chèques vacances » dans l'énumération `CanalPaiement` (seules
  `EN_LIGNE` et `SUR_PLACE_CB` existent), ce qui est cohérent avec le hors-périmètre explicite du
  CDC v5 §6 cité par le CASE. Ces deux libellés ne sont donc pas des entités du domaine, seulement
  des chaînes de test vérifiant leur absence.
- Réservation minimale (référence synthétique, statut, solde dû) : seules les données de la section
  « Données » du CASE sont utilisées (statut « Payée partiellement »), la référence est un
  identifiant synthétique non testé.
