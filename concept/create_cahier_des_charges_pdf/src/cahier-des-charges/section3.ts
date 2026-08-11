/**
 * @file cahier-des-charges/section3.ts
 * @description Section 3 — Règles Métier et Fonctionnement de l'Activité
 */
import type { DocumentSection } from '../types'

export const section3_1: DocumentSection = {
  chapterTitle: "3. Règles Métier et Fonctionnement",
  sectionTitle: "3.1 Flotte, Capacités et Calendrier",
  blocks: [
    {
      type: 'paragraph',
      segments: [
        { text: "Bateaux exploitables : ", bold: true },
        { text: "Tikap" , bold: true, color: '#0284c7' },
        { text: " (capacité max. 12 places) · " },
        { text: "Grand Bleu", bold: true, color: '#0284c7' },
        { text: " (capacité max. 24 places) · Capacité globale cumulée : " },
        { text: "36 places maximum", bold: true },
        { text: " par créneau." },
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "Créneaux horaires fixes : ", bold: true },
        { text: "3 départs par jour" , bold: true },
        { text: " à 7h00, 10h00 et 14h00 — 7 jours sur 7 toute l'année. Fermetures uniquement le 25 décembre et le 1er janvier." },
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "Seuils et sécurité : ", bold: true },
        { text: "Minimum 6 passagers payants par bateau" , bold: true },
        { text: " pour maintenir une sortie. Clôture automatique des réservations " },
        { text: "2 heures avant le départ", bold: true },
        { text: ". Blocage absolu à 36 places par créneau." },
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "Contraintes d'encadrement : ", bold: true },
        { text: "1 seul naturaliste disponible" , bold: true },
        { text: ", dédié et obligatoire pour encadrer les sorties baleines. Séparation stricte des activités : chaque créneau est dédié à une seule activité exclusive." },
      ],
    },
  ],
}

export const section3_2: DocumentSection = {
  chapterTitle: "3. Règles Métier et Fonctionnement",
  sectionTitle: "3.2 Grille Tarifaire et Catégories",
  blocks: [
    {
      type: 'paragraph',
      text: "Les tarifs sont fixes, sans variation saisonnière :",
    },
    {
      type: 'list',
      items: [
        "Sortie Baleines — Adulte (12 ans et plus) : 65 €",
        "Sortie Baleines — Enfant (4 à 11 ans inclus) : 40 €",
        "Sortie Dauphins — Adulte (12 ans et plus) : 50 €",
        "Sortie Dauphins — Enfant (4 à 11 ans inclus) : 30 €",
        "Enfants de moins de 4 ans : Non admis",
        "Privatisation Tikap — Demi-journée (Formula Sunset) : 600 € (Forfait)",
        "Privatisation Grand Bleu — Demi-journée (Formula Sunset) : 1 100 € (Forfait)",
      ],
    },
  ],
}
