# Run — CASE-ADMIN-020

**Fichier de test :** tests/tests-unitaires/admin/case-admin-020.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-020.test.ts
- tests/cases/admin/CASE-ADMIN-020.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-020.test.ts -t "test_CASE_ADMIN_020_gestion_echec_temporaire_passerelle_sms_annulation"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/services/server/cancellation/annuler-reservation.service.ts` exportant `annulerReservationService(...)` encapsulant l'appel à `PasserelleSmsAnnulation` dans un bloc de gestion d'erreur résilient.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Une exception réseau ou un code d'erreur levé par la passerelle SMS externe est intercepté sans impacter l'intégrité de la transaction de base de données.
- La réservation reste annulée et l'incident SMS est journalisé.
