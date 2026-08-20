# Run — CASE-ADMIN-018

**Fichier de test :** tests/tests-unitaires/admin/case-admin-018.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-018.test.ts
- tests/cases/admin/CASE-ADMIN-018.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-018.test.ts -t "test_CASE_ADMIN_018_rejet_strict_annulation_administrative_creneau_passe"

**Emplacement et interface déduits pour le futur code sous src/ :**
`src/actions/annuler-reservation.ts` exportant `annulerReservation(...)` avec vérification de la date du créneau par rapport à l'horodatage courant fourni par `Horloge`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Une demande d'annulation sur un créneau dont l'heure de départ est passée (H > heureDepart) est strictement rejetée.
- Aucun billet n'est supprimé et aucun SMS n'est émis.
