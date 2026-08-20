# Run — CASE-ADMIN-074

**Fichier de test :** tests/tests-unitaires/admin/case-admin-074.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-074.test.ts
- tests/cases/admin/CASE-ADMIN-074.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-074.test.ts -t "test_CASE_ADMIN_074_encaissement_solde_cb_sur_place_bascule_payee_completement"

Vérifié rouge pour la bonne raison : `Error: Cannot find module '/src/actions/encaisser-solde-cb-sur-place'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/encaisser-solde-cb-sur-place.ts` — orchestration (Server Action) : exporte
  `encaisserSoldeCbSurPlace(input: { referenceReservation: string; montant: number }, deps: { depotReservation, passerelleCb, horloge }): Promise<{ reservation: {...} }>`.
  Orchestre : chargement de la réservation, validation de l'encaissement via la passerelle CB,
  bascule du statut (déléguée au service métier), puis appel du code existant réutilisable en
  lecture seule `src/actions/emettre-facture-apres-paiement.ts` (SPEC-FAC-02) pour générer et
  envoyer la facture de solde — importé à ce niveau (`src/actions/`) car SPEC-ARCH-02 autorise
  `actions/` à importer d'autres `actions/`/`services/`.
- `src/services/server/payment/` — règle métier de bascule du statut `PAYEE_PARTIELLEMENT` →
  `PAYEE_COMPLETEMENT` (StatutReservation dans docs/uml/domain.puml) et calcul du solde restant dû
  ramené à 0,00 € (`Reservation.soldeRestantDu()`), consommée par l'action ci-dessus.
- `src/schemas/validation/payment/` — schéma Zod de validation de l'entrée brute de l'action
  (référence de réservation non vide, montant positif) avant appel du service métier ; non
  directement exercé par ce test (aucune donnée invalide dans le CASE), mais requis par le flux
  d'imports SPEC-ARCH-02 (`actions/` → `schemas/`).
- Entités du domaine mobilisées (docs/uml/domain.puml) : `Reservation` (statut, soldeRestantDu()),
  `Paiement` (typePaiement=SOLDE, canalPaiement=SUR_PLACE_CB), `StatutReservation.PAYEE_COMPLETEMENT`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- La référence de réservation (`RESA-CASE-ADMIN-074`) et l'adresse e-mail client
  (`client.case-admin-074@test.re`) sont des identifiants synthétiques nécessaires à la
  construction de l'objet de test ; ils ne figurent pas dans la section « Données » du CASE, qui ne
  donne aucune valeur de ce type. Les assertions ne dépendent jamais de leur valeur littérale, mais
  vérifient une correspondance structurelle avec l'entrée fournie.
- Le code réutilisable `src/actions/emettre-facture-apres-paiement.ts` est simulé (`vi.mock`) sans
  jamais être créé ni lu réellement, conformément à la consigne — sa forme exacte (nom exporté
  `emettreFactureApresPaiement`, signature `({ reservation, paiement })`) est une hypothèse
  raisonnable déduite du chemin de fichier fourni, l'implémentation réelle n'existant pas encore.
- Les interfaces de ports (`DepotReservationSolde`, `PasserelleCbSurPlace`, `Horloge`) sont
  déclarées localement dans le test (jamais sous `src/`) : elles n'apparaissent dans aucun fichier
  `src/` autorisé par la consigne (seuls `actions/`, `services/server/payment/`,
  `schemas/validation/payment/` sont mentionnés, sans dossier `schemas/types/` dédié pour ce
  domaine), donc elles restent un contrat de test, pas une spécification imposée au futur code.
- Injection de dépendances (deps: { depotReservation, passerelleCb, horloge }) choisie pour rendre
  le test déterministe et sans réseau/persistance réels, conformément à la contrainte 7 du prompt
  (simuler ce qui entoure le calcul, pas le calcul lui-même).
