/**
 * @file cahier-des-charges/section2.ts
 * @description Sections 3 & 4 — Objectifs et Parties Prenantes (CDC v2)
 */

export const cdcObjectives = [
  {
    id: "1",
    objective: "Ouvrir un canal de réservation 100 % en ligne",
    criteria: "Un client peut réserver et payer une sortie de bout en bout sur le site, sans appel ni e-mail (CR-01/Q01, CR-01/Q24)",
  },
  {
    id: "2",
    objective: "Offrir une interface multilingue (FR/EN)",
    criteria: "Le parcours public complet (sélection, paiement, confirmation) est disponible en français et en anglais (CR-01/Q07, CR-02/§3)",
  },
  {
    id: "3",
    objective: "Conserver une gestion simple et accessible pour l'entreprise",
    criteria: "L'administrateur consulte le planning et le remplissage par créneau depuis un espace unique, sans formation poussée (CR-02/Q03, CR-02/Q12)",
  },
]

export const cdcStakeholders = [
  {
    name: "Administrateur (Ti'Baleine)",
    role: "Profil unique de back-office : consultation du planning, gestion des créneaux, suivi du remplissage",
    expectation: "Un espace simple, épuré, sur ordinateur",
    usesApp: "oui",
  },
  {
    name: "Client final (touriste ou local)",
    role: "Réserve et paie une sortie en ligne, sans création de compte",
    expectation: "Un parcours rapide, clair, dans sa langue",
    usesApp: "oui",
  },
  {
    name: "Naturaliste",
    role: "Encadre obligatoirement les sorties baleines (ressource unique)",
    expectation: "Aucune interaction directe avec le système",
    usesApp: "non",
  },
  {
    name: "Capitainerie / Affaires Maritimes",
    role: "Autorité réglementaire sur le manifeste de bord",
    expectation: "Rien du système : le manifeste reste papier",
    usesApp: "non",
  },
]
