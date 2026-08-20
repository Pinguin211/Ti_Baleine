CONTEXTE
Stack : <ADR-001 §5>
Commande de test : <ADR-001 §1>
Emplacement des tests : tests/tests-unitaires/facturation
Convention : le nom du test contient l'identifiant CASE.

CE QUE JE TE DONNE
- Le cas de test : tests/cases/facturation/CASE-FAC-722.md
- La spécification métier : specs/facturation.md, section SPEC-FAC-02
- Les exigences d'architecture : specs/architecture.md (règles SPEC-ARCH-01 et SPEC-ARCH-02)
- Le modèle du domaine : docs/uml/domain.puml

TA TÂCHE
Écris UN test automatisé, et un seul, qui traduit CASE-FAC-722.

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
   - tests/tests-unitaires/facturation/CASE-FAC-722.test.ts
   - tests/cases/facturation/CASE-FAC-722.md (uniquement le champ « Fichier »)
   Ne touche à aucun fichier sous src/ ni à aucun autre test existant.
7. Ne simule pas le calcul qui est l'objet du cas. Tu peux simuler ce qui
   l'entoure — horloge, envoi de message, persistance.

RENDS
- Le fichier de test.
- La liste des fichiers créés ou modifiés.
- La commande exacte pour lancer ce seul test.
- L'emplacement et l'interface déduits pour le futur code sous src/ selon specs/architecture.md et docs/uml/domain.puml.
- Ce que tu as dû supposer et qui n'était pas dans ce que je t'ai donné.
