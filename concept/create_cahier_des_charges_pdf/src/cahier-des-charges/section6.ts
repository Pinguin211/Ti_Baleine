/**
 * @file cahier-des-charges/section6.ts
 * @description Section 6 — Modalités d'Organisation et Livrables
 */
import type { DocumentSection } from '../types'

export const section6_1: DocumentSection = {
  chapterTitle: "6. Modalités d'Organisation et Livrables",
  sectionTitle: "6.1 Livrables Attendus",
  blocks: [
    {
      type: 'paragraph',
      segments: [
        { text: "La Plateforme Web Fonctionnelle :", bold: true },
      ],
    },
    {
      type: 'list',
      items: [
        "Module de réservation en ligne public multilingue (plusieurs langues).",
        "Module d'administration Desktop/PC.",
        "Module d'émission automatique des factures PDF.",
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "La Documentation & Prise en Main :", bold: true },
      ],
    },
    {
      type: 'list',
      items: [
        "Guide d'utilisation simplifié à destination de l'administrateur.",
      ],
    },
  ],
}

export const section6_2: DocumentSection = {
  chapterTitle: "6. Modalités d'Organisation et Livrables",
  sectionTitle: "6.2 Points à Finaliser lors de la Mise en Œuvre",
  blocks: [
    {
      type: 'list',
      items: [
        "Choix final du nom de domaine et de la solution d'hébergement.",
        "Fourniture des textes légaux (CGV, mentions légales) par l'entreprise.",
        "Validation des contenus et traductions dans les différentes langues retenues (textes d'accueil, fiches descriptives, etc.).",
      ],
    },
  ],
}
