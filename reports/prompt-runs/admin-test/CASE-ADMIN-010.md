# Run — CASE-ADMIN-010

**Fichier de test :** tests/tests-unitaires/admin/case-admin-010.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-010.test.ts
- tests/cases/admin/CASE-ADMIN-010.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-010.test.ts -t "test_CASE_ADMIN_010_annulation_complete_reservation_demande_client_suite_pre_alerte"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/annuler-reservation.ts` (orchestration de la mutation, Server Action) exportant :
  - `previsualiserAnnulation(commande: { reservation, bareme?, regimeDerogatoireAlerte }): CalculRemboursementIndicatif` — calcul pur, sans ports, retournant `{ sommePayee, penaliteBareme, remboursementIndicatif, regime }`.
  - `annulerReservation(commande: { reservation, creneau, motif, bareme?, regimeDerogatoireAlerte }, ports: { depotReservation, depotCreneau, passerelleSms, horloge? }): Promise<{ billetsSupprimes, jaugePlacesLiberees, sms, ... }>` — exécute la suppression des billets, la libération des places et l'envoi du SMS.
- Types de domaine (`Reservation`, `Billet`, `Creneau`, `NotificationSMS`) alignés sur `docs/uml/domain.puml`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le nom exact du fichier d'action (`annuler-reservation.ts`) et la séparation en deux fonctions exportées (`previsualiserAnnulation` / `annulerReservation`) ne sont pas imposés par la spec ; ils sont déduits de la structure en deux temps du gherkin (« Alors affiche le calcul » puis « Quand confirme »).
- La signature exacte des ports (`depotReservation`, `depotCreneau`, `passerelleSms`) est une déduction raisonnable de SPEC-ARCH-02 (injection de dépendances côté service/action), non prescrite littéralement par le CASE.
