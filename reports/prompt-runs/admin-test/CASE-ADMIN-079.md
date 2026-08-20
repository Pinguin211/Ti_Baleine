# Run — CASE-ADMIN-079

**Fichier de test :** tests/tests-unitaires/admin/case-admin-079.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-079.test.ts
- tests/cases/admin/CASE-ADMIN-079.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-079.test.ts -t "test_CASE_ADMIN_079_remboursement_indicatif_nul_montant_paye_insuffisant_penalite"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/annuler-reservation.ts` exportant :
- `previsualiserAnnulation(commande: { reservation; bareme: { pourcentagePenalite: number }; regimeDerogatoireAlerte: false }): CalculRemboursementIndicatif`
- `annulerReservation(commande: { reservation; creneau; motif; bareme; regimeDerogatoireAlerte }, ports): Promise<void>`

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Lorsque le montant payé (ex: 30,00 €) est inférieur au montant de la pénalité calculée selon le barème (ex: 50 % de 100 € = 50,00 €), le remboursement indicatif est plafonné à 0,00 €.
- Aucun complément de paiement n'est réclamé au client et le SMS d'information n'indique aucun solde débiteur.
