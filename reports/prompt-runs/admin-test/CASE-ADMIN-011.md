# Run — CASE-ADMIN-011

**Fichier de test :** tests/tests-unitaires/admin/case-admin-011.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-011.test.ts
- tests/cases/admin/CASE-ADMIN-011.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-011.test.ts -t "test_CASE_ADMIN_011_annulation_administrative_office_cause_meteo_technique"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/annuler-reservation.ts` (orchestration de l'annulation administrative, Server Action) exportant :
- `previsualiserAnnulation(commande: { reservation: ReservationAnnulation; bareme?: BaremeAnnulation; regimeDerogatoireAlerte: boolean }): CalculRemboursementIndicatif`
- `annulerReservation(commande: { reservation: ReservationAnnulation; creneau: CreneauAnnulation; motif: string; regimeDerogatoireAlerte: boolean }, ports: { depotReservation: DepotReservationAnnulation; depotCreneau: DepotCreneauAnnulation; passerelleSms: PasserelleSmsAnnulation }): Promise<ResultatAnnulation>`
avec `CalculRemboursementIndicatif.{ sommePayee, remboursementIndicatif, regime }` et `ResultatAnnulation.{ billetsSupprimes }`. Types dérivés de `docs/uml/domain.puml` et placés dans `src/schemas/types/cancellation.types.ts`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le calcul du remboursement dérogatoire à 100 % (R-27) retourne un montant indicatif de remboursement égal à l'intégralité des sommes perçues (acompte de 90,00 €).
- Le SMS transactionnel envoyé au client par la passerelle SMS omet toute référence financière ou calcul de remboursement (règle explicite R-27).
- L'annulation d'office libère la totalité des places sur le créneau de manière synchrone.
