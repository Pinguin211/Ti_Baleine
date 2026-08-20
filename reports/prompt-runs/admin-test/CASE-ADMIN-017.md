# Run — CASE-ADMIN-017

**Fichier de test :** tests/tests-unitaires/admin/case-admin-017.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-017.test.ts
- tests/cases/admin/CASE-ADMIN-017.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-017.test.ts -t "test_CASE_ADMIN_017_blocage_desactivation_bouton_annulation_reservation_0_billet"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/schemas/validation/cancellation/annuler-reservation.schema.ts` exportant :
- `verifierReservationAnnulable(reservation: { billetsActifs: unknown[] }): boolean`
et `src/actions/annuler-reservation.ts` exportant `annulerReservation(...)` avec garde préventive.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Toute tentative d'annulation sur une réservation ayant déjà 0 billet actif est bloquée par l'interface (bouton désactivé) et rejetée par l'API/Action serveur avec un code d'erreur.
- Aucun appel au dépôt ou à la passerelle SMS n'est déclenché dans ce cas.
