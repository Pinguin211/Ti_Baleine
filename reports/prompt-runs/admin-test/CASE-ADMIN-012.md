# Run — CASE-ADMIN-012

**Fichier de test :** tests/tests-unitaires/admin/case-admin-012.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-012.test.ts
- tests/cases/admin/CASE-ADMIN-012.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-012.test.ts -t "test_CASE_ADMIN_012_annulation_standard_hors_alerte_motif_sms_client"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/annuler-reservation.ts` exportant :
- `previsualiserAnnulation(commande: { reservation: ReservationAnnulation; regimeDerogatoireAlerte: false }): CalculRemboursementIndicatif`
- `annulerReservation(commande: { reservation: ReservationAnnulation; creneau: CreneauAnnulation; motif: string; regimeDerogatoireAlerte: false }, ports: { depotReservation; depotCreneau; passerelleSms }): Promise<ResultatAnnulation>`
Types dans `src/schemas/types/cancellation.types.ts`. Intégration côté interface d'administration sous `src/components/domain/cancellation/`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- En régime standard (hors alerte), le calcul indicatif de remboursement est assis sur le montant total de la commande (75,00 €) et plafonné aux sommes perçues (22,50 €) selon R-29.
- La passerelle SMS et les dépôts de persistance sont injectés comme dépendances (ports SPEC-ARCH-02).
- Le SMS standard ne contient aucune mention du montant remboursé ni du calcul de pénalité.
