# Gabarit de prompt — faire écrire le test automatisé

À recopier dans l'agent, **une fois par tâche de test**. Ce fichier ne se remplit pas : il se recopie.

> Le pendant de ce gabarit est `prompt-gabarit-code.md`, qui sert à faire écrire le code de production. La direction s'inverse : ici le cas de test (`CASE-*.md`) est le contrat et l'agent produit le test automatisé ; là-bas le test automatisé est le contrat et l'agent produit le code.

---

## Le gabarit

```text
CONTEXTE
Stack : <ADR-001 §5>
Commande de test : <ADR-001 §1>
Emplacement des tests : <tests/tests-unitaires/... ou tests/cases/...>
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/<domaine>/CASE-<DOM>-nnn.md
- La spécification métier : specs/<domaine>.md, section SPEC-<DOM>-nn
- Les exigences d'architecture : specs/architecture.md (règles SPEC-ARCH-01 et SPEC-ARCH-02)
- Le modèle du domaine : docs/uml/domain.puml

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-<DOM>-nnn.

CONTRAINTES
1. Nom du test : exactement celui écrit dans la section « Test automatisé » du
   fichier CASE. Ne le reformule pas.
2. Interdiction formelle d'écrire ou de modifier des fichiers sous src/. N'écris
   aucune règle métier, aucune signature et ne crée aucun fichier dans src/.
3. Déduis dans le test où sera le code cible sous src/ en t'appuyant strictement
   sur specs/architecture.md (SPEC-ARCH-01 pour les conventions de nommage,
   SPEC-ARCH-02 pour l'arborescence modulaire et le flux d'imports :
   ex. src/services/server/, src/schemas/, src/utils/) et sur docs/uml/domain.puml
   pour les noms de classes, d'attributs et de relations. N'invente aucune
   entité absente du diagramme ; si le cas de test l'exige, arrête-toi et
   dis-le-moi.
4. Les valeurs sont celles de la section « Données ». N'en invente aucune.
5. Les assertions correspondent exactement aux lignes « Alors » et « Et » du
   Gherkin : une assertion par ligne, aucune de plus.
6. Ne modifie aucun fichier en dehors de :
   - <chemin du fichier de test à créer sous tests/>
   - tests/cases/<domaine>/CASE-<DOM>-nnn.md (uniquement le champ « Fichier »)
   Ne touche à aucun fichier sous src/ ni à aucun autre test existant.
7. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test.
- L'emplacement et l'interface déduits pour le futur code sous src/ selon specs/architecture.md et docs/uml/domain.puml.
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.
```

---

## Comment le remplir

| Champ | Où le trouver |
|---|---|
| Stack | `docs/adr/ADR-001-stack.md` §5 |
| Commande de test | `ADR-001` §1, contrainte « runner exécutable en une commande » |
| Emplacement des tests | Dossier de test cible (ex: `tests/tests-unitaires/<domaine>/spec-<domaine>-nn/`) |
| Cas de test | `tests/cases/<domaine>/CASE-<DOM>-nnn.md` |
| Spécification métier | `specs/<domaine>.md`, la section citée dans le cas de test |
| Exigences d'architecture | `specs/architecture.md` (règles `SPEC-ARCH-01` et `SPEC-ARCH-02`) |
| Modèle du domaine | `docs/uml/domain.puml` (classes, attributs, relations validés en équipe) |
| Fichier de test à créer | Chemin cible du test (nommé d'après le `CASE`) |

---

## Pourquoi ces contraintes

**Interdiction formelle d'écrire sous `src/` lors de la rédaction des tests :**  
La phase d'écriture des tests ne doit en aucun cas pré-implémenter ou créer de signatures sous `src/`. L'écriture du code de production relève exclusivement de la phase suivante (`prompt-gabarit-code.md`).

**Déduction du code cible via `specs/architecture.md` :**  
L'agent qui écrit le test doit déduire précisément où résidera la future fonction, le futur service ou le schéma sous `src/` (dans `src/services/server/`, `src/schemas/validation/`, `src/utils/`, etc.) en respectant l'arborescence, l'étanchéité serveur/client et les conventions de nommage imposées par `SPEC-ARCH-01` et `SPEC-ARCH-02`.

**Ancrage sur `docs/uml/domain.puml` :**  
Le diagramme de classes du domaine a été relu en équipe (voir `docs/uml/README.md`) : c'est lui qui fixe le vocabulaire, les entités et les relations validés, pas l'agent au moment du prompt. Le test doit nommer ses objets et champs d'après ce diagramme plutôt que d'en inventer de nouveaux, faute de quoi le code écrit en phase suivante (`prompt-gabarit-code.md`) hérite d'un vocabulaire qui diverge silencieusement du modèle censé le documenter.