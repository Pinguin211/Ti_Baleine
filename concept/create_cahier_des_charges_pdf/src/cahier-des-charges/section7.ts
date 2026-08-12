/**
 * @file cahier-des-charges/section7.ts
 * @description Sections 11 & 12 — Questions Ouvertes et Validation Client (CDC v2)
 */

export const cdcOpenQuestions = [
  { id: "1", question: "Quel est le nom de domaine définitif retenu pour la plateforme ?", source: "CR-02/§8 Q1", status: "en attente", hypothesis: "Nom de domaine provisoire à définir par l'équipe, à valider avant mise en production" },
  { id: "2", question: "Quel hébergeur / type de serveur souhaité pour la mise en production ?", source: "CR-02/§8 Q2", status: "en attente", hypothesis: "Hébergement cloud standard, à ajuster selon budget client" },
  { id: "3", question: "Qui fournit et valide les textes des CGV et mentions légales ?", source: "CR-02/§8 Q3", status: "en attente", hypothesis: "L'entreprise fournit les textes légaux avant mise en ligne" },
  { id: "4", question: "Quelles cases à cocher obligatoires au checkout (CGV, décharge, newsletter…) ?", source: "CR-02/§8 Q4", status: "en attente", hypothesis: "Case CGV obligatoire uniquement, sans newsletter" },
  { id: "5", question: "Quelle durée de conservation des données personnelles au titre du RGPD ?", source: "CR-02/§8 Q5", status: "en attente", hypothesis: "Durée minimale légale par défaut (3 ans après le dernier contact), à confirmer" },
  { id: "6", question: "Les privatisations sont-elles possibles le matin, ou uniquement l'après-midi (Sunset) ?", source: "CR-02/§9", status: "en attente", hypothesis: "Créneaux de privatisation limités à l'après-midi (14h) jusqu'à confirmation" },
  { id: "7", question: "Quel budget est alloué à la création et à l'hébergement mensuel de l'outil ?", source: "CR-01/Q53, CR-01/Q55", status: "sans réponse", hypothesis: "Aucune hypothèse chiffrée retenue ; à clarifier avant choix technique" },
  { id: "8", question: "Quelle est la date cible de mise en service ?", source: "CR-01/Q54", status: "sans réponse", hypothesis: "Mise en service visée avant la prochaine saison des baleines" },
  { id: "9", question: "Quel identifiant et quelle politique de mot de passe (regex) pour l'accès à l'interface administrateur ?", source: "point-relevés.md", status: "en attente", hypothesis: "Identifiant e-mail + mot de passe respectant un minimum de 12 caractères, majuscule, chiffre et caractère spécial, à valider avec le client" },
  { id: "10", question: "Une fois le calendrier fixé, peut-il être modifié, et par quel moyen l'administrateur y accède-t-il ?", source: "point-relevés.md", status: "en attente", hypothesis: "Modification possible depuis le back-office par l'administrateur uniquement (cf. R-12) ; spec détaillée à proposer par l'équipe" },
]

export const cdcValidations = [
  { version: "v1", date: "11/08/2026", presented: "non", feedback: "à planifier" },
]
