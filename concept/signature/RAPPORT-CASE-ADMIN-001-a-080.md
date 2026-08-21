# Rapport d'exécution consolidé — Prompts de test administration CASE-ADMIN-001 à 080

**Généré le :** 2026-08-20  
**Domaine :** `ADMINISTRATION` — `specs/admin.md` (`SPEC-ADMIN-01` à `SPEC-ADMIN-07`)  
**Prompts traités :** `docs/prompt/test/admin/prompt-ADMIN-001.md` à `prompt-ADMIN-080.md` (80 prompts au total)  
**Portée :** 100 % des cas de test d'administration (001 à 080) sont automatisés sous `tests/tests-unitaires/admin/`, les fiches `tests/cases/admin/` sont renseignées avec leur champ Fichier, et l'ensemble des 80 rapports individuels d'exécution est généré sous `reports/prompt-runs/admin-test/`.

---

## 1. Architecture commune déduite sous `src/`

Conformément à `docs/prompt/prompt-GABARIT-test.md`, `specs/architecture.md` (`SPEC-ARCH-01`, `SPEC-ARCH-02`) et `docs/uml/domain.puml` :
- **Aucun fichier n'a été créé ni modifié sous `src/`** lors de cette phase de test.
- L'arborescence, les modules, les types et les interfaces nécessaires à la future implémentation ont été rigoureusement déduits selon les règles d'étanchéité serveur/client et le modèle métier.

### 1.1 Cartographie des emplacements cibles sous `src/`

| Périmètre fonctionnel | Emplacement déduit | Rôle & Responsabilité |
|---|---|---|
| Types et DTO partagés | `src/schemas/types/planning.types.ts`, `cancellation.types.ts`, `alerts.types.ts`, `admin.types.ts` | Définitions isomorphes des entités du domaine (`Creneau`, `Reservation`, `Billet`, `NotificationSMS`, `ConfigPort`, `ConfigBateau`) |
| Schémas de validation & Guards | `src/schemas/validation/planning/`, `cancellation/`, `alerts/`, `admin/` | Schémas Zod / fonctions pures de validation (`verifierReservationAnnulable`, `validerEnvoiAlerte`, `reductionBilletsSchema`) |
| Services serveur métier & agrégation | `src/services/server/planning/`, `cancellation/`, `alerts/`, `export/`, `security/` | Logique métier pure, calculs tarifaires/remboursement, agrégation multi-sites, contrôle des rotations |
| Server Actions (Orchestration) | `src/actions/annuler-reservation.ts`, `reduire-billets-reservation.action.ts`, `envoyer-alerte-groupee.ts`, `cloturer-journee.action.ts` | Points d'entrée Next.js Server Actions orchestrant mutations, transactions, dépôts et passerelles |
| Composants UI & Tableaux de bord | `src/components/domain/planning/`, `cancellation/`, `alerts/`, `admin/` | Vues d'administration (grille planning desktop, boîte modale d'annulation, sélecteur d'alerte météo) |
| Pages administratives | `src/app/admin/planning/page.tsx`, `reservations/page.tsx`, `alertes/page.tsx` | Routes Next.js App Router protégées avec layout d'administration |

### 1.2 Interfaces clés & Signatures déduites

```ts
// === ANNULATION & REMBOURSEMENT (SPEC-ADMIN-02) ===
export function previsualiserAnnulation(commande: {
  reservation: ReservationAnnulation;
  bareme?: BaremeAnnulation;
  regimeDerogatoireAlerte: boolean;
}): CalculRemboursementIndicatif;

export async function annulerReservation(
  commande: {
    reservation: ReservationAnnulation;
    creneau: CreneauAnnulation;
    motif: string;
    bareme?: BaremeAnnulation;
    regimeDerogatoireAlerte: boolean;
  },
  ports: {
    depotReservation: DepotReservationAnnulation;
    depotCreneau: DepotCreneauAnnulation;
    passerelleSms: PasserelleSmsAnnulation;
    horloge?: Horloge;
  }
): Promise<ResultatAnnulation>;

// === RÉDUCTION PARTIELLE / DÉLOGEMENT (SPEC-ADMIN-03) ===
export function reduireBilletsReservation(
  commande: {
    reservation: Reservation;
    adultesARetirer: number;
    enfantsARetirer: number;
  },
  ports: {
    depotBillets: DepotBillets;
    depotCreneau: DepotCreneau;
  }
): Promise<ResultatReduction>;

// === CAMPAGNES DE PRÉ-ALERTE MÉTÉO (SPEC-ADMIN-04) ===
export async function envoyerAlerteGroupee(
  commande: {
    creneauxIds: string[];
    message: string;
  },
  ports: {
    depotCreneaux: DepotCreneauxAlertes;
    passerelleSms: PasserelleSmsAlertes;
    journalAudit: JournalAuditAlertes;
  }
): Promise<ResultatCampagneAlerte>;
```

---

## 2. Synthèse d'exécution des 80 cas de test

| # | Identifiant | Spécification | Nom du test Vitest | Fichier de test |
|---|---|---|---|---|
| 001 | `CASE-ADMIN-001` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_001_affichage_consolide_grille_planning_multisites_desktop` | `case-admin-001.test.ts` |
| 002 | `CASE-ADMIN-002` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_002_consultation_detail_creneau_activite_navires_mobilises` | `case-admin-002.test.ts` |
| 003 | `CASE-ADMIN-003` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_003_presence_indicateur_badge_sous_pre_alerte_sur_creneau` | `case-admin-003.test.ts` |
| 004 | `CASE-ADMIN-004` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_004_affichage_etat_vide_explicite_aucun_creneau_programme` | `case-admin-004.test.ts` |
| 005 | `CASE-ADMIN-005` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_005_affichage_distinctif_creneau_sans_navire_non_affecte` | `case-admin-005.test.ts` |
| 006 | `CASE-ADMIN-006` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_006_affichage_creneau_sans_activite_type_non_renseigne` | `case-admin-006.test.ts` |
| 007 | `CASE-ADMIN-007` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_007_consultation_planning_continu_24h_24_sans_restriction` | `case-admin-007.test.ts` |
| 008 | `CASE-ADMIN-008` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_008_gestion_perte_reseau_chargement_planning_erreur_retry` | `case-admin-008.test.ts` |
| 009 | `CASE-ADMIN-009` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_009_maintien_affichage_creneau_sous_seuil_6_passagers_sans_annulation_auto` | `case-admin-009.test.ts` |
| 010 | `CASE-ADMIN-010` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_010_annulation_complete_reservation_demande_client_suite_pre_alerte` | `case-admin-010.test.ts` |
| 011 | `CASE-ADMIN-011` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_011_annulation_administrative_office_cause_meteo_technique` | `case-admin-011.test.ts` |
| 012 | `CASE-ADMIN-012` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_012_annulation_standard_hors_alerte_motif_sms_client` | `case-admin-012.test.ts` |
| 013 | `CASE-ADMIN-013` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_013_non_persistance_motif_annulation_table_bookings` | `case-admin-013.test.ts` |
| 014 | `CASE-ADMIN-014` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_014_conservation_fiche_reservation_bdd_historique_0_billet` | `case-admin-014.test.ts` |
| 015 | `CASE-ADMIN-015` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_015_remise_a_disposition_immediate_places_interface_publique` | `case-admin-015.test.ts` |
| 016 | `CASE-ADMIN-016` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_016_annulation_administrative_autorisee_jusqua_heure_depart_h0` | `case-admin-016.test.ts` |
| 017 | `CASE-ADMIN-017` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_017_blocage_desactivation_bouton_annulation_reservation_0_billet` | `case-admin-017.test.ts` |
| 018 | `CASE-ADMIN-018` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_018_rejet_strict_annulation_administrative_creneau_passe` | `case-admin-018.test.ts` |
| 019 | `CASE-ADMIN-019` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_019_traitement_numero_mobile_invalide_annulation_log_echec` | `case-admin-019.test.ts` |
| 020 | `CASE-ADMIN-020` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_020_gestion_echec_temporaire_passerelle_sms_annulation` | `case-admin-020.test.ts` |
| 021 | `CASE-ADMIN-021` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_021_coherence_transactionnelle_annulation_rollback_reseau` | `case-admin-021.test.ts` |
| 022 | `CASE-ADMIN-022` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_022_absence_flux_financier_sortant_automatique_annulation` | `case-admin-022.test.ts` |
| 023 | `CASE-ADMIN-023` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_023_reduction_partielle_passagers_suppression_billet_adulte` | `case-admin-023.test.ts` |
| 024 | `CASE-ADMIN-024` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_024_reduction_partielle_passagers_suppression_billet_enfant` | `case-admin-024.test.ts` |
| 025 | `CASE-ADMIN-025` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_025_reduction_mixte_adultes_enfants_recalcul_audit` | `case-admin-025.test.ts` |
| 026 | `CASE-ADMIN-026` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_026_reduction_a_0_billet_bascule_automatique_annulation_sms` | `case-admin-026.test.ts` |
| 027 | `CASE-ADMIN-027` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_027_rejet_strict_tentative_ajout_billet_reservation_existante` | `case-admin-027.test.ts` |
| 028 | `CASE-ADMIN-028` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_028_rejet_strict_modification_date_port_lors_reduction` | `case-admin-028.test.ts` |
| 029 | `CASE-ADMIN-029` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_029_blocage_action_reduction_reservation_0_billet_actif` | `case-admin-029.test.ts` |
| 030 | `CASE-ADMIN-030` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_030_rejet_strict_reduction_passagers_creneau_deja_passe` | `case-admin-030.test.ts` |
| 031 | `CASE-ADMIN-031` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_031_coherence_transactionnelle_jauge_billets_reduction_partielle` | `case-admin-031.test.ts` |
| 032 | `CASE-ADMIN-032` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_032_absence_remboursement_financier_automatique_reduction_partielle` | `case-admin-032.test.ts` |
| 033 | `CASE-ADMIN-033` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_033_connexion_reussie_administrateur_identifiants_valides_desktop` | `case-admin-033.test.ts` |
| 034 | `CASE-ADMIN-034` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_034_redirection_automatique_planning_apres_authentification` | `case-admin-034.test.ts` |
| 035 | `CASE-ADMIN-035` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_035_interception_acces_non_authentifie_redirection_login` | `case-admin-035.test.ts` |
| 036 | `CASE-ADMIN-036` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_036_refus_connexion_identifiant_invalide_message_generique` | `case-admin-036.test.ts` |
| 037 | `CASE-ADMIN-037` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_037_blocage_validation_formulaire_connexion_champs_vides` | `case-admin-037.test.ts` |
| 038 | `CASE-ADMIN-038` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_038_protection_anti_bruteforce_blocage_temporaire_tentatives_repetees` | `case-admin-038.test.ts` |
| 039 | `CASE-ADMIN-039` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_039_expiration_session_inactivite_prolongee_deconnexion_auto` | `case-admin-039.test.ts` |
| 040 | `CASE-ADMIN-040` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_040_respect_contrainte_administrateur_unique_sans_sous_comptes` | `case-admin-040.test.ts` |
| 041 | `CASE-ADMIN-041` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_041_calcul_taux_remplissage_creneau_standard_saint_gilles_jauge_36` | `case-admin-041.test.ts` |
| 042 | `CASE-ADMIN-042` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_042_calcul_taux_remplissage_mardi_jeudi_matin_saint_gilles_jauge_24` | `case-admin-042.test.ts` |
| 043 | `CASE-ADMIN-043` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_043_calcul_taux_remplissage_mardi_jeudi_matin_saint_leu_jauge_12` | `case-admin-043.test.ts` |
| 044 | `CASE-ADMIN-044` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_044_affichage_creneau_0_billet_actif_taux_0_pourcent` | `case-admin-044.test.ts` |
| 045 | `CASE-ADMIN-045` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_045_affichage_creneau_complet_taux_100_pourcent_badge_complet` | `case-admin-045.test.ts` |
| 046 | `CASE-ADMIN-046` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_046_recalcul_instantane_temps_reel_remplissage_apres_annulation` | `case-admin-046.test.ts` |
| 047 | `CASE-ADMIN-047` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_047_affichage_specifique_creneau_privatise_blocage_jauge` | `case-admin-047.test.ts` |
| 048 | `CASE-ADMIN-048` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_048_envoi_groupe_alerte_meteo_veille_18h_multi_creneaux` | `case-admin-048.test.ts` |
| 049 | `CASE-ADMIN-049` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_049_envoi_alerte_pre_annulation_canal_sms_uniquement` | `case-admin-049.test.ts` |
| 050 | `CASE-ADMIN-050` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_050_envoi_alerte_pre_annulation_canal_email_uniquement` | `case-admin-050.test.ts` |
| 051 | `CASE-ADMIN-051` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_051_envoi_combine_simultane_alerte_sms_email` | `case-admin-051.test.ts` |
| 052 | `CASE-ADMIN-052` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_052_preremplissage_instantane_template_meteo_defavorable` | `case-admin-052.test.ts` |
| 053 | `CASE-ADMIN-053` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_053_preremplissage_instantane_template_incident_technique` | `case-admin-053.test.ts` |
| 054 | `CASE-ADMIN-054` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_054_personnalisation_ajustement_libre_texte_motif_avant_envoi` | `case-admin-054.test.ts` |
| 055 | `CASE-ADMIN-055` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_055_presence_obligatoire_message_bilingue_combine_fr_en` | `case-admin-055.test.ts` |
| 056 | `CASE-ADMIN-056` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_056_basculement_automatique_statut_creneau_sous_pre_alerte` | `case-admin-056.test.ts` |
| 057 | `CASE-ADMIN-057` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_057_activation_mention_avertissement_site_public_creneau_pre_alerte` | `case-admin-057.test.ts` |
| 058 | `CASE-ADMIN-058` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_058_desactivation_bouton_envoi_aucun_creneau_selectionne` | `case-admin-058.test.ts` |
| 059 | `CASE-ADMIN-059` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_059_alerte_creneau_sans_reservation_statut_pre_alerte_sans_message` | `case-admin-059.test.ts` |
| 060 | `CASE-ADMIN-060` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_060_blocage_envoi_alerte_corps_message_vide` | `case-admin-060.test.ts` |
| 061 | `CASE-ADMIN-061` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_061_traitement_echec_individuel_delivrance_alerte_groupee_log` | `case-admin-061.test.ts` |
| 062 | `CASE-ADMIN-062` | `SPEC-ADMIN-07` | `test_CASE_ADMIN_062_fermeture_administrative_manuelle_creneau_sans_passager` | `case-admin-062.test.ts` |
| 063 | `CASE-ADMIN-063` | `SPEC-ADMIN-07` | `test_CASE_ADMIN_063_reouverture_manuelle_exceptionnelle_creneau_ferme` | `case-admin-063.test.ts` |
| 064 | `CASE-ADMIN-064` | `SPEC-ADMIN-07` | `test_CASE_ADMIN_064_configuration_modification_affectation_activite_creneau` | `case-admin-064.test.ts` |
| 065 | `CASE-ADMIN-065` | `SPEC-ADMIN-07` | `test_CASE_ADMIN_065_configuration_affectation_navires_mobilises_creneau` | `case-admin-065.test.ts` |
| 066 | `CASE-ADMIN-066` | `SPEC-ADMIN-07` | `test_CASE_ADMIN_066_blocage_mixite_activites_meme_navire_creneau_exclusivite` | `case-admin-066.test.ts` |
| 067 | `CASE-ADMIN-067` | `SPEC-ADMIN-07` | `test_CASE_ADMIN_067_blocage_conflit_naturaliste_unique_deux_sorties_baleines_simultanees` | `case-admin-067.test.ts` |
| 068 | `CASE-ADMIN-068` | `SPEC-ADMIN-07` | `test_CASE_ADMIN_068_cloisonnement_securite_interdiction_acces_configuration_creneaux_public` | `case-admin-068.test.ts` |
| 069 | `CASE-ADMIN-069` | `SPEC-ADMIN-03` | `test_CASE_ADMIN_069_rejet_suppression_nombre_billets_superieur_solde_actif` | `case-admin-069.test.ts` |
| 070 | `CASE-ADMIN-070` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_070_deconnexion_manuelle_destruction_session_redirection_login` | `case-admin-070.test.ts` |
| 071 | `CASE-ADMIN-071` | `SPEC-ADMIN-04` | `test_CASE_ADMIN_071_maintien_etat_authentifie_navigation_rafraichissement_f5` | `case-admin-071.test.ts` |
| 072 | `CASE-ADMIN-072` | `SPEC-ADMIN-05` | `test_CASE_ADMIN_072_calcul_taux_remplissage_mardi_jeudi_apres_midi_saint_gilles_jauge_36` | `case-admin-072.test.ts` |
| 073 | `CASE-ADMIN-073` | `SPEC-ADMIN-06` | `test_CASE_ADMIN_073_rejet_reemission_alerte_creneau_deja_sous_pre_alerte` | `case-admin-073.test.ts` |
| 074 | `CASE-ADMIN-074` | `SPEC-ADMIN-08` | `test_CASE_ADMIN_074_encaissement_solde_cb_sur_place_bascule_payee_completement` | `case-admin-074.test.ts` |
| 075 | `CASE-ADMIN-075` | `SPEC-ADMIN-08` | `test_CASE_ADMIN_075_blocage_encaissement_solde_reservation_deja_payee_completement` | `case-admin-075.test.ts` |
| 076 | `CASE-ADMIN-076` | `SPEC-ADMIN-08` | `test_CASE_ADMIN_076_rejet_encaissement_especes_cheques_vacances_absent_interface` | `case-admin-076.test.ts` |
| 077 | `CASE-ADMIN-077` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_077_affichage_statuts_financiers_reservations_detail_creneau_jour_j` | `case-admin-077.test.ts` |
| 078 | `CASE-ADMIN-078` | `SPEC-ADMIN-01` | `test_CASE_ADMIN_078_bascule_payee_completement_webhook_bancaire_solde_en_ligne` | `case-admin-078.test.ts` |
| 079 | `CASE-ADMIN-079` | `SPEC-ADMIN-02` | `test_CASE_ADMIN_079_remboursement_indicatif_nul_montant_paye_insuffisant_penalite` | `case-admin-079.test.ts` |
| 080 | `CASE-ADMIN-080` | `SPEC-ADMIN-08` | `test_CASE_ADMIN_080_perte_connexion_pointage_encaissement_solde_sur_place` | `case-admin-080.test.ts` |

---

## 3. Conformité et respect des contraintes

1. **Règle absolue d'étanchéité sous `src/` :** Aucun fichier n'a été créé ni modifié dans le répertoire `src/`.
2. **Nommage et fidélité au contrat :** 100 % des tests portent exactement le nom prescrit par la section « Test automatisé » du fichier `CASE-ADMIN-XXX.md`.
3. **Mise à jour des fiches de test :** Les 80 fiches `tests/cases/admin/CASE-ADMIN-XXX.md` ont leur champ `Fichier :` correctement renseigné avec le chemin du test unitaire correspondant.
4. **Couverture des rapports individuels :** Les 80 fichiers de compte-rendu d'exécution sous `reports/prompt-runs/admin-test/CASE-ADMIN-XXX.md` sont générés et détaillent les interfaces déduites et hypothèses.
