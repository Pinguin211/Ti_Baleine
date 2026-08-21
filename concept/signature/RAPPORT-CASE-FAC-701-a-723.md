# Rapport d'exécution — Prompts de test facturation CASE-FAC-701 à 723

**Généré le :** 2026-08-20
**Domaine :** `FACTURATION` — `SPEC-FAC-02`
**Prompts traités :** `docs/prompt/test/facturation/prompt-FAC-701.md` à `prompt-FAC-723.md`
**Portée :** `CASE-FAC-700` a été laissé strictement inchangé (déjà automatisé lors d'une session précédente) ; ce rapport couvre uniquement les 23 cas 701 à 723.

---

## 1. Interface commune déduite sous `src/`

Tous les prompts imposent de déduire l'emplacement et l'interface du futur code sous `src/` à partir de `specs/architecture.md` (SPEC-ARCH-01/02) et `docs/uml/domain.puml`, sans écrire ni modifier de fichier sous `src/`. Les 23 tests réutilisent **la même interface**, initialement posée par le test préexistant `CASE-FAC-700.test.ts`, étendue de façon strictement additive pour couvrir les cas 701 à 723.

### 1.1 Emplacements déduits (SPEC-ARCH-02)

| Élément | Emplacement déduit | Justification |
|---|---|---|
| Types DTO de facturation | `src/schemas/types/facturation.types.ts` | `schemas/types/` = types partagés, isomorphes (SPEC-ARCH-02 §Structure imposée) |
| Types des ports (interfaces d'infrastructure) | `src/schemas/types/facturation-ports.types.ts` | idem, séparé des DTO métier pour lisibilité |
| Orchestration acompte | `src/actions/emettre-facture-acompte-apres-paiement.ts` | Server Action déclenchée après confirmation de paiement (SPEC-ARCH-02 : `actions/` importe `services/`, `schemas/`, `env/`) |
| Orchestration solde | `src/actions/emettre-facture-solde-apres-paiement.ts` | idem |
| (Hors périmètre des tests, pour implémentation future) génération PDF / SMTP / persistance | `src/services/server/facturation.service.ts`, `src/lib/server/` | `services/server/` = accès SDK tiers privés (PDF, SMTP), `lib/` encapsulé par `services/` (SPEC-ARCH-02 AC-5) |

### 1.2 Contrat de types (`src/schemas/types/facturation.types.ts`)

```ts
export type PortEmbarquement = 'Saint-Gilles' | 'Saint-Leu'; // Enum Port (domain.puml)

export interface ReservationFacturable {
  id: string;                                  // Reservation.reference
  prestation: string;                           // Creneau.activite (libellé)
  dateDepart: Date;                              // Creneau.date + heureDepart
  portEmbarquement: PortEmbarquement;            // Creneau.port
  emailClient: string;                           // User.email
  nombreAdultes?: number;                        // Billet[typeBillet=ADULTE].count
  nombreEnfants?: number;                        // Billet[typeBillet=ENFANT].count
  tarifUnitaireAdulte?: number;                  // ConfigActivite.tarifBaseAdulte
  tarifUnitaireEnfant?: number;                  // ConfigActivite.tarifBaseEnfant
  majorationGeographiqueParPersonne?: number;    // ConfigPort.majorationIndividuelle
  montantForfaitaire?: number;                   // ConfigActivite.forfait (privatisation)
}

export type StatutPaiement = 'validé avec succès' | 'rejeté' | 'en attente' | 'abandonné';

export interface PaiementAcompteValide { montantRegle: number; statut: StatutPaiement; }
export interface PaiementSoldeValide   { montantRegle: number; statut: StatutPaiement; }

export interface LigneTarifaire {
  libelle: string; quantite: number; montantUnitaire: number; montantLigne: number;
}

export interface FactureAcompte {           // ~ Facture (typeFacture=ACOMPTE)
  identifiantUnique: string;                 // Facture.referenceFacture
  reservationId: string;
  mentionAcompte: 'Acompte acquitté';
  contenu: Uint8Array;                       // flux PDF en mémoire, jamais écrit sur disque
  prestation: string;
  portEmbarquement: PortEmbarquement;
  dateEtHoraire: string;                     // "18/08/2026 9h00"
  lignesTarifaires: LigneTarifaire[];
  montantTotalTtc: number;
  acompteRegle: number;
  soldeRestantDu: number;
}

export interface FactureSolde {              // ~ Facture (typeFacture=SOLDE)
  identifiantUnique: string;
  reservationId: string;
  mentionSolde: 'Acquittée';
  contenu: Uint8Array;
  prestation: string;
  portEmbarquement: PortEmbarquement;
  dateEtHoraire: string;
  lignesTarifaires: LigneTarifaire[];
  rappelAcompte: number;
  montantTotalAcquitte: number;
}
```

### 1.3 Contrat des ports (`src/schemas/types/facturation-ports.types.ts`)

```ts
export interface CourrielFacturation {        // ~ NotificationEmail
  destinataire: string;
  pieceJointe: { nomFichier: string; contenu: Uint8Array; typeMime: 'application/pdf' };
  recapitulatifReservation: string;
}
export interface EnvoiCourriel { envoyer(message: CourrielFacturation): void; }

export type TypeFactureEmise = 'acompte' | 'solde';
export type StatutEmission = 'envoyée avec succès' | "échec d'émission";

export interface StatutEmissionFacture {      // ~ Paiement.statutEmissionFacture / dateEmissionFacture
  reservationId: string;
  typeFacture: TypeFactureEmise;
  statut: StatutEmission;
  horodatage: Date;
}
export interface DepotEmissionFacture {
  enregistrerStatutEmission(entree: StatutEmissionFacture): void;
  obtenirStatutEmission(reservationId: string, typeFacture: TypeFactureEmise): StatutEmissionFacture | undefined;
}

export interface Horloge { maintenant(): Date; }
```

### 1.4 Signatures des actions

```ts
emettreFactureAcompteApresPaiement(
  input: { reservation: ReservationFacturable; paiement: PaiementAcompteValide },
  ports: { envoiCourriel: EnvoiCourriel; depotEmission: DepotEmissionFacture; horloge: Horloge }
): FactureAcompte | null;

emettreFactureSoldeApresPaiement(
  input: { reservation: ReservationFacturable; paiement: PaiementSoldeValide; acompteRegle: number },
  ports: { envoiCourriel: EnvoiCourriel; depotEmission: DepotEmissionFacture; horloge: Horloge }
): FactureSolde | null;
```

Comportement attendu déduit des CASE (guide l'implémentation future, non écrit sous `src/`) :
1. Si `paiement.statut !== 'validé avec succès'` → aucun effet de bord, retourne `null` (AC-7, CASE-720/721/722).
2. Sinon, consulte `depotEmission.obtenirStatutEmission(reservation.id, type)` : si déjà `'envoyée avec succès'`, aucun nouvel appel PDF/SMTP/dépôt, retourne `null` (idempotence, AC-8, CASE-723).
3. Sinon, calcule la facture (lignes tarifaires, totaux — le calcul lui-même n'est jamais simulé dans les tests), tente `envoiCourriel.envoyer(...)`, puis enregistre le statut en base (`'envoyée avec succès'` ou `"échec d'émission"` si l'envoi lève une exception) avec `horloge.maintenant()`.
4. Le flux PDF (`contenu`) est produit en mémoire uniquement ; aucun fichier n'est écrit sur disque.

> ⚠️ **Point de vigilance découvert lors de la vérification (cf. §3)** : ce contrat étend `DepotEmissionFacture` avec `obtenirStatutEmission`, requis par `CASE-FAC-723` (idempotence). Le test préexistant `CASE-FAC-700.test.ts` (hors périmètre de cette session, non modifié) instancie un faux dépôt qui n'implémente **pas** cette méthode. Le jour de l'implémentation réelle sous `src/`, ce test cassera à l'exécution si l'action appelle `obtenirStatutEmission` sans garde. Deux résolutions possibles, à trancher par l'équipe : (a) mettre à jour le faux dépôt de `CASE-FAC-700.test.ts` pour ajouter cette méthode (changement d'une ligne, cohérent avec les 23 autres tests), ou (b) rendre l'appel défensif côté implémentation (`depotEmission.obtenirStatutEmission?.(...)`). Aucune des deux n'a été appliquée ici : modifier `CASE-FAC-700.test.ts` sortait du périmètre autorisé par la contrainte 6 du prompt 700 (déjà traité hors de cette session).

---

## 2. Détail par cas de test

Pour chaque cas : nom du test, fichier produit, commande d'exécution, hypothèses propres au cas. La commande générique est :

```bash
npx vitest run --project facturation tests/tests-unitaires/facturation/CASE-FAC-<NNN>.test.ts
```

| # | Nom du test | Fichier | Hypothèses spécifiques (non fournies explicitement) |
|---|---|---|---|
| 701 | `test_CASE_FAC_701_emission_facture_acompte_puis_solde_privatisation_forfaitaire` | `CASE-FAC-701.test.ts` | Port d'embarquement non donné dans les données du cas 701 ; déduit **Saint-Gilles** par recoupement avec la section « Ce que ce cas ne vérifie pas » de `CASE-FAC-706` qui indique explicitement que la privatisation à Saint-Gilles est couverte par `CASE-FAC-701`. |
| 702 | `test_CASE_FAC_702_facturation_acompte_reservation_standard_saint_gilles_sans_supplement` | `CASE-FAC-702.test.ts` | Email client non fourni par le cas ; valeur de convenance `client.saint-gilles@test.re` (donnée non discriminante pour l'assertion). |
| 703 | `test_CASE_FAC_703_facturation_acompte_sortie_dauphins_tarif_specifique` | `CASE-FAC-703.test.ts` | Idem, email de convenance. |
| 704 | `test_CASE_FAC_704_facturation_acompte_mixte_adultes_enfants_ventilation_detaillee_pdf` | `CASE-FAC-704.test.ts` | Ventilation en 2 lignes distinctes (« Adultes », « Enfants ») supposée à partir de « la facture PDF présente distinctement une ligne pour... » ; libellés exacts non fixés par le cas. |
| 705 | `test_CASE_FAC_705_majoration_saint_leu_sur_profil_enfant_facture_acompte` | `CASE-FAC-705.test.ts` | Ligne de supplément supposée agrégée (2 × 10 €) plutôt que 2 lignes séparées, conforme au libellé du cas (« 2 × 10 € = 20 € »). |
| 706 | `test_CASE_FAC_706_facturation_acompte_solde_privatisation_saint_leu_sans_majoration` | `CASE-FAC-706.test.ts` | Aucune. |
| 707 | `test_CASE_FAC_707_presence_obligatoire_et_unicite_identifiants_facture_acompte_solde` | `CASE-FAC-707.test.ts` | Deuxième réservation (données) inventée pour satisfaire l'exigence explicite du cas de comparer deux réservations distinctes — seules ses propriétés structurelles comptent, aucune valeur métier n'est imposée par le cas. |
| 708 | `test_CASE_FAC_708_mentions_acompte_acquitte_et_acquittee_montants_ttc_sur_pdf` | `CASE-FAC-708.test.ts` | Réservation 150 € reconstituée avec les mêmes paramètres que `CASE-FAC-700` (2 adultes, Saint-Leu) car le cas ne fixe que les montants globaux, pas la composition passagers. |
| 709 | `test_CASE_FAC_709_presence_date_et_creneau_horaire_sur_factures_acompte_et_solde` | `CASE-FAC-709.test.ts` | Idem (composition passagers non fixée par le cas, reprise de la trame 700). |
| 710 | `test_CASE_FAC_710_presence_intitule_exact_prestation_sur_factures_acompte_et_solde` | `CASE-FAC-710.test.ts` | Activité testée fixée à « Sortie Baleines » (le cas propose Baleines/Dauphins/Privatisation en variante ; une seule variante retenue pour rester focalisé, conformément à « une assertion par ligne, aucune de plus »). |
| 711 | `test_CASE_FAC_711_mention_explicite_port_embarquement_sur_factures_acompte_et_solde` | `CASE-FAC-711.test.ts` | Aucune (les deux ports Saint-Leu **et** Saint-Gilles sont explicitement exigés par la checklist de revue du cas). |
| 712 | `test_CASE_FAC_712_ligne_detaillee_supplement_saint_leu_facture_acompte_et_solde` | `CASE-FAC-712.test.ts` | Aucune. |
| 713 | `test_CASE_FAC_713_generation_facture_pdf_exclusivement_en_memoire_sans_persistance_disque` | `CASE-FAC-713.test.ts` | Technique de vérification « aucun fichier disque » : instantané de `os.tmpdir()` avant/après (aucune primitive de ce type n'existe dans le domaine ; c'est un moyen d'observation du test, pas une entité métier). |
| 714 | `test_CASE_FAC_714_expedition_immediate_courriel_transactionnel_adresse_client_acompte_et_solde` | `CASE-FAC-714.test.ts` | Aucune. |
| 715 | `test_CASE_FAC_715_piece_jointe_pdf_facture_valide` | `CASE-FAC-715.test.ts` | Aucune. |
| 716 | `test_CASE_FAC_716_inclusion_recapitulatif_reservation_corps_courriel` | `CASE-FAC-716.test.ts` | Vérification par sous-chaînes (`stringContaining`) sur le récapitulatif texte, le cas ne fixant pas de gabarit exact. |
| 717 | `test_CASE_FAC_717_enregistrement_etat_emission_succes_avec_horodatage_acompte_et_solde` | `CASE-FAC-717.test.ts` | Deux horloges distinctes utilisées (acompte à 9h05, solde à J+7) pour prouver que les deux horodatages sont réellement indépendants, non fournie explicitement par le cas mais nécessaire pour discriminer l'assertion. |
| 718 | `test_CASE_FAC_718_echec_envoi_smtp_passage_statut_echec_emission_acompte_ou_solde` | `CASE-FAC-718.test.ts` | Le faux `EnvoiCourriel` lève une exception pour simuler la panne SMTP ; l'action est supposée intercepter cette exception en interne (« sans bloquer le processus global »), hypothèse de conception non détaillée par le cas. |
| 719 | `test_CASE_FAC_719_rebond_email_boite_pleine_absence_boucle_rattrapage_automatique` | `CASE-FAC-719.test.ts` | **Hypothèse la plus significative du lot** : aucun port de rebond (« Bounce ») ni de canal SMS de secours n'existe dans le domaine déduit (`docs/uml/domain.puml` ne modélise pas de traitement de bounce, et `specs/facturation.md` indique explicitement qu'aucune solution technique n'est prévue). Le test simule le bounce via une méthode de test locale (`simulerRebondAsynchrone`, pur artefact de test) et prouve l'absence de mécanisme de rattrapage par construction (aucun port SMS injecté, un seul appel `envoyer`). Signalé conformément à la contrainte 3 (« si le cas de test l'exige, arrête-toi et dis-le-moi ») plutôt que d'inventer une entité de domaine. |
| 720 | `test_CASE_FAC_720_non_declenchement_facturation_transaction_bancaire_rejetee_acompte_ou_solde` | `CASE-FAC-720.test.ts` | Aucune. |
| 721 | `test_CASE_FAC_721_non_declenchement_facturation_abandon_ou_expiration_session_paiement_acompte_ou_solde` | `CASE-FAC-721.test.ts` | Aucune. |
| 722 | `test_CASE_FAC_722_non_declenchement_facturation_statut_paiement_en_attente_acompte_ou_solde` | `CASE-FAC-722.test.ts` | Aucune. |
| 723 | `test_CASE_FAC_723_traitement_idempotent_notification_paiement_double_acompte_et_solde_independants` | `CASE-FAC-723.test.ts` | Introduit `DepotEmissionFacture.obtenirStatutEmission(...)`, absent du contrat initial de `CASE-FAC-700` — voir avertissement §1.4. |

Pour chaque cas, les fichiers créés/modifiés sont strictement :
- `tests/tests-unitaires/facturation/CASE-FAC-<NNN>.test.ts` (créé)
- `tests/cases/facturation/CASE-FAC-<NNN>.md` (champ « Fichier » renseigné uniquement)

Aucun fichier sous `src/` n'a été créé ni modifié ; aucun autre test existant n'a été touché (vérifié par `git status` — voir §3.3).

---

## 3. Vérification de cohérence effectuée

### 3.1 Non-régression syntaxique (24 fichiers)

```bash
npx vitest run --project facturation
```
Résultat : **24 fichiers, 24 échecs**, tous pour l'unique raison attendue `Cannot find module '.../src/actions/...'` (aucun code source n'existe encore sous `src/`, conformément à la contrainte 2). Aucune erreur de syntaxe, d'accolade non fermée ou d'import cassé — confirmé par le fait que la phase de transformation esbuild aboutit pour les 24 fichiers avant d'échouer sur la résolution de module.

### 3.2 Vérification logique (implémentation jetable, hors `src/`)

Pour vérifier que les assertions sont réellement cohérentes entre elles (calculs, formats, enchaînements acompte→solde) et pas seulement syntaxiquement valides, une implémentation de référence temporaire respectant le contrat du §1 a été écrite **hors du dépôt** (`/tmp/.../scratchpad/facturation-stub/`), puis les 24 tests ont été exécutés contre elle via un alias Vite temporaire (fichier de config temporaire, supprimé immédiatement après, jamais commité — `git status` confirmé propre avant/après, voir §3.3).

Résultat : **23/24 tests passent** contre cette implémentation de référence. Le seul échec est `CASE-FAC-700` (hors périmètre de cette session), pour la raison exposée dans l'avertissement du §1.4 (méthode `obtenirStatutEmission` absente de son faux dépôt local). Les 23 cas 701–723 traités dans cette session sont donc mutuellement cohérents et cohérents avec le contrat déduit.

### 3.3 Respect des contraintes de périmètre

```
$ git status --porcelain
 M tests/cases/facturation/CASE-FAC-701.md   … (champ Fichier uniquement)
 …
?? tests/tests-unitaires/facturation/CASE-FAC-701.test.ts
 …
```
Confirmé : aucune modification hors des fichiers autorisés par chaque prompt (contrainte 6), aucun fichier sous `src/`, aucun autre test existant modifié, aucune trace laissée par la vérification temporaire (§3.2).

---

## 4. Point d'attention à trancher avec l'équipe

Un seul point bloquant pour une implémentation `src/` totalement rétrocompatible avec les 24 tests (700 à 723) : décider comment traiter l'extension du port `DepotEmissionFacture` avec `obtenirStatutEmission` (nécessaire pour l'idempotence de `CASE-FAC-723`) sans casser `CASE-FAC-700.test.ts`. Voir le détail et les deux options proposées au §1.4.
