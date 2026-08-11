/**
 * @file cahier-des-charges/section4.ts
 * @description Section 4 — Description des Fonctionnalités
 */
import type { DocumentSection } from '../types'

export const section4_1: DocumentSection = {
  chapterTitle: "4. Description des Fonctionnalités",
  sectionTitle: "4.1 Parcours Public (Client)",
  blocks: [
    {
      type: 'paragraph',
      segments: [
        { text: "1. Consultation et Sélection de la Prestation", bold: true },
      ],
    },
    {
      type: 'list',
      items: [
        "Choix du type de sortie (Baleines, Dauphins, Privatisation).",
        "Bascule de langue à tout moment (sélecteur multilingue avec prise en charge de plusieurs langues).",
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "2. Choix de la Date et du Créneau", bold: true },
      ],
    },
    {
      type: 'list',
      items: [
        "Affichage des créneaux disponibles (7h, 10h, 14h).",
        "Masquage des jours fermés (25 décembre et 1er janvier) et des créneaux complets ou clos (< 2h).",
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "3. Saisie des Participants et Coordonnées", bold: true },
      ],
    },
    {
      type: 'list',
      items: [
        "Sélection du nombre d'adultes et d'enfants.",
        "Formulaire de contact minimal : Nom, Prénom, Adresse e-mail, Numéro de téléphone.",
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "4. Paiement et Confirmation", bold: true },
      ],
    },
    {
      type: 'list',
      items: [
        "Paiement de 100 % du montant par Carte Bancaire via une passerelle de paiement sécurisée.",
        "Validation immédiate à l'écran.",
        "Envoi automatique d'un e-mail de confirmation accompagné de la facture PDF.",
      ],
    },
  ],
}

export const section4_2: DocumentSection = {
  chapterTitle: "4. Description des Fonctionnalités",
  sectionTitle: "4.2 Espace d'Administration (Entreprise)",
  blocks: [
    {
      type: 'paragraph',
      segments: [
        { text: "Accès Sécurisé Unique : ", bold: true },
        { text: "Un seul profil administrateur pour l'entreprise (aucun sous-compte pour les capitaines ou les vendeurs, usage sur ordinateur PC/Desktop)." },
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "Consultation du Planning : ", bold: true },
        { text: "Visualisation synthétique et consultation des réservations par jour et par créneau (consultation uniquement, pas de gestion ni d'ouverture/fermeture manuelle). Suivi du remplissage global selon les capacités d'embarquement (12, 24, 36 places) pour faciliter le dispatch opérationnel avant départ." },
      ],
    },
    {
      type: 'paragraph',
      segments: [
        { text: "Traitement des Annulations et Remboursements : ", bold: true },
        { text: "Aucune annulation en ligne par les clients. Toute demande est effectuée en contact direct avec l'entreprise (téléphone, e-mail, accueil). Traitement financier des remboursements pris en charge directement par l'entreprise avec le client, en dehors du système web." },
      ],
    },
  ],
}
