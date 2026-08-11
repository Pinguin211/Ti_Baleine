/**
 * @file cahier-des-charges/section1.ts
 * @description Section 1 — Contexte et Objectifs du Projet
 */
import type { DocumentSection } from '../types'

export const section1_1: DocumentSection = {
  chapterTitle: '1. Contexte et Objectifs du Projet',
  sectionTitle: '1.1 Présentation de l\'Entreprise et Contexte',
  blocks: [
    {
      type: 'paragraph',
      segments: [
        { text: "L'entreprise " },
        { text: "Ti'Baleine", bold: true },
        {
          text: " propose des sorties en mer à la journée : observation des baleines et des dauphins, ainsi que des sorties « coucher de soleil » (Sunset) et des privatisations de navires.",
        },
      ],
    },
    {
      type: 'paragraph',
      text: "Afin de moderniser la prise de commande, de rationaliser le suivi des places et de simplifier l'organisation au quotidien, l'entreprise souhaite se doter d'une plateforme web sur-mesure dédiée à la réservation en ligne pour le grand public et à la gestion de l'activité.",
    },
  ],
}

export const section1_2: DocumentSection = {
  chapterTitle: '1. Contexte et Objectifs du Projet',
  sectionTitle: '1.2 Objectifs Principaux',
  blocks: [
    {
      type: 'list',
      items: [
        "Ouvrir un canal de réservation 100 % en ligne : Permettre aux clients (locaux et touristes) de réserver et payer leurs sorties directement sur le web.",
        "Offrir une interface multilingue : Répondre aux besoins d'une clientèle majoritairement étrangère (environ 60 %) grâce à la prise en charge de plusieurs langues.",
        "Conserver une gestion simple et accessible : Mettre à disposition un espace administrateur épuré sur ordinateur, adapté aux besoins de l'entreprise sans complexité inutile.",
      ],
    },
  ],
}
