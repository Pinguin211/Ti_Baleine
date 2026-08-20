# Run — CASE-ADMIN-078

**Fichier de test :** tests/tests-unitaires/admin/case-admin-078.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-078.test.ts
- tests/cases/admin/CASE-ADMIN-078.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-078.test.ts -t "test_CASE_ADMIN_078_bascule_payee_completement_webhook_bancaire_solde_en_ligne"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/planning/traiter-webhook-solde-paiement.service.ts` exportant :
`export function traiterWebhookSoldePaiement(params: { reservation: { reference: string; statut: 'PAYEE_PARTIELLEMENT'; soldeRestantDu: number }; paiementSolde: { montant: number; statut: 'validé' } }): { statutFinancier: string; soldeDu: number; interventionAdministrateurRequise: boolean }`
S'appuie sur `Reservation.statut: StatutReservation` et `Paiement.typePaiement: SOLDE` / `canalPaiement: EN_LIGNE` de `docs/uml/domain.puml` : le service bascule le statut à `PAYEE_COMPLETEMENT` dès validation du webhook, sans action administrateur.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le type de retour `{ statutFinancier, soldeDu, interventionAdministrateurRequise }` est une interface de service déduite des trois lignes Alors/Et du CASE, et non un type du diagramme de domaine (qui décrit `Paiement` et `Reservation` comme entités persistées mais pas ce DTO de résultat de traitement webhook).
- Le traitement technique interne de validation du webhook bancaire lui-même (signature, authenticité) est explicitement hors périmètre de ce cas (« couvert par SPEC-PAY ») ; le paramètre `paiementSolde` est donc fourni déjà validé (`statut: 'validé'`), conformément à la donnée « Moyen de règlement : paiement en ligne à distance (webhook bancaire) ».
