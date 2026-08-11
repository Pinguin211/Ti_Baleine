/**
 * @file cahier-des-charges/section2.ts
 * @description Section 2 — Périmètre du Projet (In-Scope / Out-of-Scope)
 */
import type { DocumentSection } from '../types'

export const section2_1: DocumentSection = {
  chapterTitle: '2. Périmètre du Projet',
  sectionTitle: '2.1 Ce que comprend le projet (In-Scope)',
  blocks: [
    {
      type: 'list',
      items: [
        "Un site web public de réservation (optimisé pour ordinateurs, tablettes et smartphones).",
        "Un parcours de commande simple sans création de compte préalable.",
        "Un module de paiement en ligne 100 % sécurisé par Carte Bancaire.",
        "La génération et l'envoi automatique de factures PDF après validation du paiement.",
        "Une interface d'administration unique (sur ordinateur PC/Desktop) pour la consultation du planning des réservations.",
        "Un support multilingue (prise en charge de plusieurs langues) sur l'ensemble du parcours client.",
      ],
    },
  ],
}

export const section2_2: DocumentSection = {
  chapterTitle: '2. Périmètre du Projet',
  sectionTitle: '2.2 Ce qui est exclu du projet (Out-of-Scope)',
  blocks: [
    {
      type: 'list',
      items: [
        "Pas de solution SaaS tierce (développement sur-mesure exclusif).",
        "Pas de compte client (réservation directe en tant qu'invité, sans création de compte ni espace membre client).",
        "Pas d'annulation en ligne par le client (traitement en direct hors système entre le client et l'entreprise).",
        "Pas d'accès multi-utilisateurs ni de sous-comptes (aucun compte spécifique pour les capitaines, les vendeurs ou autres tiers).",
        "Pas de gestion ou modification des créneaux dans le planning (consultation uniquement, planning fixe).",
        "Pas de module de répartition des passagers par bateau (le dispatch s'effectue physiquement avant l'excursion).",
        "Pas de gestion automatisée des remboursements (traité manuellement hors plateforme par l'entreprise).",
        "Pas de gestion du manifeste de bord maritime (registre légal conservé sous format papier/physique).",
        "Pas de synchronisation avec des agendas externes (ex. Google Calendar, Outlook).",
        "Pas de notifications ou alertes automatiques vers l'administrateur (aucun envoi d'e-mail/SMS pour les réservations ou annulations).",
      ],
    },
  ],
}
