# Run — CASE-ADMIN-013

**Fichier de test :** tests/tests-unitaires/admin/case-admin-013.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-013.test.ts
- tests/cases/admin/CASE-ADMIN-013.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-013.test.ts -t "test_CASE_ADMIN_013_non_persistance_motif_annulation_table_bookings"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/annuler-reservation.service.ts` exportant :
- `annulerReservationService(commande: { reservation; creneau; motif: string; regimeDerogatoireAlerte: boolean }, ports: { depotReservation; depotCreneau; passerelleSms }): Promise<void>`
et `src/lib/sms/composer-message-annulation-reservation.ts` exportant :
- `composerMessageAnnulationReservation(params: { motif: string }): string`

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le motif d'annulation saisi à la volée par l'administrateur sert exclusivement à la composition du SMS d'information transmis à la passerelle SMS et n'est jamais persisté comme colonne ou attribut sur l'entité `Reservation` / table `BOOKINGS` (REQ-020).
- La vérification en base confirme l'absence de propriété `motif_annulation` sur l'enregistrement de la table.
