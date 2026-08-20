# Run — CASE-ADMIN-054

**Fichier de test :** tests/tests-unitaires/admin/case-admin-054.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-054.test.ts
- tests/cases/admin/CASE-ADMIN-054.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-054.test.ts -t "test_CASE_ADMIN_054_personnalisation_ajustement_libre_texte_motif_avant_envoi"

**Emplacement et interface déduits pour le futur code sous src/ :**
- `src/services/server/alerts/templates-alerte.ts` : `preremplirZoneMessageAvecTemplate` puis `modifierZoneMessageAlerte` pour la personnalisation libre du texte.
- `src/actions/envoyer-alerte-groupee.ts` : `envoyerAlerteGroupee` pour vérifier que c'est exactement le texte personnalisé (`zoneModifiee.valeur`) qui est transmis dans `NotificationSmsAlerte.message`.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Le texte de précision « Forte houle australe de 3m prévue » vient littéralement de la section Données (exemple donné). Le template initial servant de base n'étant pas fourni, `preremplirZoneMessageAvecTemplate('METEO_DEFAVORABLE')` a été choisi comme « template générique » de départ.
- Un client et un créneau fictifs minimalistes ont été introduits pour exercer la transmission finale du texte, ces coordonnées n'étant pas données par le CASE (qui porte sur le contenu du texte, non sur l'identité des destinataires).
