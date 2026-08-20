# Run — CASE-ADMIN-048

**Fichier de test :** tests/tests-unitaires/admin/case-admin-048.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-048.test.ts
- tests/cases/admin/CASE-ADMIN-048.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-048.test.ts -t "test_CASE_ADMIN_048_envoi_groupe_alerte_meteo_veille_18h_multi_creneaux"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/actions/envoyer-alerte-groupee.ts` exportera `envoyerAlerteGroupee(demande: DemandeEnvoiAlerteGroupee, ports: { envoiSms, envoiEmail, depotCreneau, journal, horloge }): ResultatEnvoiAlerteGroupee` — orchestration serveur de l'envoi groupé multi-créneaux (SPEC-ARCH-02 : `actions/` orchestre `services/`, `lib/` via ports).
- Types métier dans `src/schemas/types/alerte.types.ts` (`ClientReservataire`, `CreneauCibleAlerte`, `DemandeEnvoiAlerteGroupee`, `ResultatEnvoiAlerteGroupee`) construits sur les attributs réels de `Creneau` (date, heureDepart, port, activite, estOuvert, sousPreAlerte) et `User` (nom, prenom, email, telephone) du domain.puml.
- Ports d'infrastructure (SMS, e-mail, dépôt de statut créneau, journal, horloge) dans `src/schemas/types/alerte-ports.types.ts`, injectés dans l'action — reflète `src/lib/sms/`, `src/lib/email/` et `src/services/server/alerts/` pour les implémentations concrètes.
- L'action bascule `sousPreAlerte = true` sur chacun des 3 créneaux ciblés en une seule opération, conformément à la relation `Alerte "0..1" -> "1..*" Creneau` du domain.puml.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le canal de diffusion utilisé pour ce cas générique est « SMS_EMAIL » (combiné), la Donnée « Mode d'envoi » ne précisant pas de canal et le scénario nominal de SPEC-ADMIN-06 illustrant lui-même un envoi combiné « SMS et E-mail ». Le choix exclusif d'un canal est couvert séparément par CASE-ADMIN-049/050.
- Les réservataires nominatifs (nom, prénom, email, téléphone) des 3 créneaux ne sont pas fournis par la section Données ; un client fictif par créneau a été introduit comme fixture minimale de test (précondition « créneaux avec passagers inscrits » du point de revue), sans invention de valeur métier calculée.
- Le format du corps du message reprend la structure bilingue FR puis EN décrite par R-26, avec un texte météo représentatif (le contenu exact des templates codés en dur n'étant pas spécifié dans le CASE).
