# Run — CASE-ADMIN-075

**Fichier de test :** tests/tests-unitaires/admin/case-admin-075.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-075.test.ts
- tests/cases/admin/CASE-ADMIN-075.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-075.test.ts -t "test_CASE_ADMIN_075_blocage_encaissement_solde_reservation_deja_payee_completement"

Vérifié rouge pour la bonne raison : `Error: Cannot find module '/src/services/server/payment/etat-encaissement-solde-sur-place'` (aucune erreur de syntaxe TypeScript dans le test).

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/payment/etat-encaissement-solde-sur-place.ts` — règle métier de lecture
  d'écran : exporte `obtenirEtatEncaissementSoldeSurPlace(reservation): { boutonEncaisserActif:
  boolean; mentionStatut: string }`, dérivée exclusivement du `StatutReservation` de la réservation
  (docs/uml/domain.puml) : bouton désactivé et mention « Solde déjà réglé » dès que le statut vaut
  `PAYEE_COMPLETEMENT`.
- `src/actions/encaisser-solde-cb-sur-place.ts` — même action que CASE-ADMIN-074 : doit rejeter
  (throw) toute tentative d'encaissement lorsque la réservation chargée est déjà à l'état
  `PAYEE_COMPLETEMENT`, avant tout appel à la passerelle CB ou à l'émission de facture. Le blocage
  effectif (le « garde-fou ») vit dans `src/services/server/payment/` (vérification du statut),
  l'action se contente de la déléguer et de propager le rejet.
- `src/schemas/validation/payment/` — inchangé par rapport à CASE-ADMIN-074 ; non exercé
  directement par ce test.
- Entités du domaine mobilisées : `Reservation.statut` (`StatutReservation.PAYEE_COMPLETEMENT`),
  `Reservation.soldeRestantDu()`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le libellé exact « Solde déjà réglé » est repris tel quel de l'énoncé du cas limite #1 de
  SPEC-ADMIN-08 (« le bouton d'encaissement du solde est désactivé et le statut indique "Solde déjà
  réglé" ») et du Gherkin du CASE ; ce n'est pas une valeur inventée mais une reprise littérale.
- La vérification « aucune action d'encaissement supplémentaire n'est réalisable » est traduite
  comme un rejet (`rejects.toThrow()`) de l'action d'encaissement elle-même plutôt qu'une simple
  assertion sur un flag, afin de vérifier l'application réelle de la règle et pas seulement son
  affichage — le CASE ne précise pas le mécanisme technique exact (exception vs retour d'échec),
  c'est une hypothèse d'implémentation raisonnable et non testée dans son détail (aucune assertion
  sur le message d'erreur ici, contrairement à CASE-ADMIN-080).
- Identifiants synthétiques (référence, e-mail) : même hypothèse que CASE-ADMIN-074.
- Réutilisation du mock d'`emettre-facture-apres-paiement` uniquement pour permettre l'appel de
  `encaisserSoldeCbSurPlace` sans erreur de résolution de module intermédiaire ; son
  non-déclenchement n'est volontairement pas testé ici pour respecter la règle « une assertion par
  ligne Alors/Et » (3 lignes Gherkin, 3 assertions, pas plus).
