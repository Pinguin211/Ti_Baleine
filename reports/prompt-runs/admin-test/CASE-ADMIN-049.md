# Run — CASE-ADMIN-049

**Fichier de test :** tests/tests-unitaires/admin/case-admin-049.test.ts
**Fichiers créés/modifiés :**
- tests/tests-unitaires/admin/case-admin-049.test.ts
- tests/cases/admin/CASE-ADMIN-049.md (champ Fichier)

**Commande pour ce seul test :**
npx vitest run --project admin tests/tests-unitaires/admin/case-admin-049.test.ts -t "test_CASE_ADMIN_049_envoi_alerte_pre_annulation_canal_sms_uniquement"

**Emplacement et interface déduits pour le futur code sous src/ :**
- Même action `src/actions/envoyer-alerte-groupee.ts` que CASE-ADMIN-048, appelée avec `canal: 'SMS'`. La logique de filtrage par canal (n'appeler `ports.envoiSms` et ignorer totalement `ports.envoiEmail`) est interne à cette action.
- Types et ports identiques : `src/schemas/types/alerte.types.ts`, `src/schemas/types/alerte-ports.types.ts`.
- La passerelle SMS concrète sera implémentée sous `src/lib/sms/` et consommée via le port `EnvoiSms` injecté à l'action.

**Hypothèses (ce qui n'était ni dans le CASE ni dans la spec) :**
- Les coordonnées (téléphone, email) des 2 clients réservataires fictifs du créneau ne sont pas fournies par la section Données (« Sortie Baleines lendemain 07h00 » sans liste nominative) ; une fixture minimale de 2 clients a été introduite pour exercer la diffusion sans inventer de grandeur calculée.
- Le corps du message transmis est un texte bilingue représentatif générique, son contenu exact n'étant pas l'objet de ce cas (couvert par CASE-ADMIN-052/053/055).
