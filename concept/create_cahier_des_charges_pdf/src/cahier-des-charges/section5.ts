/**
 * @file cahier-des-charges/section5.ts
 * @description Section 5 — Exigences Générales et Ergonomie
 */
import type { DocumentSection } from '../types'

export const section5_1: DocumentSection = {
  chapterTitle: "5. Exigences Générales et Ergonomie",
  sectionTitle: "5.1 Ergonomie et Langues",
  blocks: [
    {
      type: 'list',
      items: [
        "Simplicité d'utilisation : L'interface doit être claire, directe et accessible pour des utilisateurs non informaticiens.",
        "Multilinguisme : Intégration native d'un support multilingue (plusieurs langues disponibles) sur l'ensemble du parcours client.",
        "Design Adaptatif : Navigation fluide aussi bien sur mobile pour les clients que sur ordinateur de bureau pour l'administrateur.",
      ],
    },
  ],
}

export const section5_2: DocumentSection = {
  chapterTitle: "5. Exigences Générales et Ergonomie",
  sectionTitle: "5.2 Sécurité et Données",
  blocks: [
    {
      type: 'list',
      items: [
        "Paiement Sécurisé : Transactions par carte bancaire répondant aux normes de sécurité bancaire en vigueur (contrat monétique direct).",
        "Protection des Données Personnelles (RGPD) : Saisie limitée aux données strictement nécessaires pour l'excursion et la facturation (nom, e-mail, téléphone).",
      ],
    },
  ],
}
