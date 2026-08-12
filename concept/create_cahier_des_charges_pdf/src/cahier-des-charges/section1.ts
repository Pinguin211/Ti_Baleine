/**
 * @file cahier-des-charges/section1.ts
 * @description Sections 1 & 2 — Contexte et Problème (CDC v2)
 */

export const cdcContext = {
  chapterTitle: "1. Contexte",
  paragraphs: [
    "Ti'Baleine propose des sorties en mer à la journée : observation des baleines et des dauphins, sorties « coucher de soleil » (Sunset), et privatisations de navires. L'entreprise exploite deux bateaux, le Tikap (12 places) et le Grand Bleu (24 places), sur un planning fixe toute l'année (trois créneaux quotidiens à 7h, 10h et 14h).",
    "Aujourd'hui, les réservations et leur suivi ne passent pas par un canal 100 % en ligne. Environ 60 % de la clientèle est étrangère, ce qui impose une interface multilingue. L'entreprise souhaite se doter d'une plateforme web sur-mesure pour moderniser la prise de commande, fiabiliser le suivi des places disponibles, et simplifier son organisation au quotidien, sans complexité inutile pour un usage non informaticien (CR-01/Q01, CR-01/Q02).",
  ],
  kpis: [
    { value: "100%", label: "Canal en ligne" },
    { value: "60%", label: "Clientèle étrangère" },
    { value: "36", label: "Capacité max / créneau" },
    { value: "3", label: "Départs / jour (7j/7)" },
  ],
}

export const cdcProblem = {
  chapterTitle: "2. Problème",
  text: "Ti'Baleine n'a pas de canal de réservation en ligne fiable pour gérer les places limitées de ses deux bateaux sur des créneaux fixes, ce qui complique le suivi du remplissage et l'accueil d'une clientèle majoritairement étrangère. L'entreprise veut un outil sur-mesure — pas une solution SaaS tierce — qui centralise réservation, paiement et facturation, tout en laissant volontairement hors système les opérations qu'elle préfère garder en contact humain direct (annulations, remboursements, manifeste passagers).",
}
