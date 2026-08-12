/**
 * @file cahier-des-charges/section4.ts
 * @description Sections 6 & 7 — Périmètre et Contraintes (CDC v2)
 */

export const cdcScopeIn = [
  {
    title: "Un site web public de réservation",
    description: "Optimisé pour ordinateurs, tablettes et smartphones (CR-02/Q06).",
  },
  {
    title: "Un parcours de commande sans création de compte préalable",
    description: "Réservation en tant qu'invité (CR-02/§3).",
  },
  {
    title: "Un module de paiement en ligne 100 % sécurisé",
    description: "Par carte bancaire (CR-01/Q24, CR-01/Q25).",
  },
  {
    title: "Génération et envoi automatique de factures PDF",
    description: "Après validation du paiement (CR-01/Q47).",
  },
  {
    title: "Une interface d'administration unique",
    description: "Sur ordinateur PC/Desktop pour la consultation du planning et la modification des créneaux (CR-02/Q12).",
  },
  {
    title: "Un support bilingue français/anglais",
    description: "Sur l'ensemble du parcours client (CR-01/Q07, CR-02/§3).",
  },
]

export const cdcScopeOut = [
  {
    element: "Solution SaaS tierce (Bokun, Resagenda…)",
    reason: "Le client a répondu « sur-mesure » — CR-01/Q01",
  },
  {
    element: "Compte client / espace membre",
    reason: "Réservation en tant qu'invité uniquement — CR-02/§3",
  },
  {
    element: "Annulation en ligne par le client",
    reason: "Annulations traitées en direct par téléphone/e-mail/appel — CR-01/Q36",
  },
  {
    element: "Remboursement automatisé",
    reason: "« Pas de remboursement automatique : géré directement par l'entreprise » — CR-02/Q02",
  },
  {
    element: "Comptes secondaires (capitaine, vendeur)",
    reason: "« Un seul profil administrateur : l'entreprise » — CR-02/Q03",
  },
  {
    element: "Répartition des passagers par bateau",
    reason: "Dispatch effectué physiquement avant l'excursion — CR-01/§8 Q1",
  },
  {
    element: "Manifeste de bord maritime",
    reason: "« Le manifeste de bord reste hors système, rien d'informatique » — CR-02/Q05",
  },
  {
    element: "Synchronisation avec agendas externes",
    reason: "« Non » — CR-01/Q17",
  },
  {
    element: "Notifications admin à chaque nouvelle réservation",
    reason: "« Pas nécessaire pour les nouvelles réservations » (alertes annulations conservées) — CR-02/Q07",
  },
]

export const cdcConstraints = [
  { id: "1", constraint: "Solution sur-mesure exclusivement, aucun SaaS tiers", nature: "stratégique", source: "CR-01/Q01" },
  { id: "2", constraint: "Ouverture 7 jours sur 7 ; fermeture uniquement le 25 décembre et le 1er janvier, aucune réservation ni sortie ces deux jours", nature: "métier", source: "CR-01/Q09 (corrigé)" },
  { id: "3", constraint: "Créneaux figés à 7h, 10h et 14h, pas d'horaires ad hoc", nature: "métier", source: "CR-01/Q09, CR-01/Q10" },
  { id: "4", constraint: "Capacité bornée par bateau : 12 places (Tikap) ou 24 places (Grand Bleu), 36 places cumulées par créneau", nature: "métier / physique", source: "CR-01/Q12, CR-01/Q15, CR-02/Q01" },
  { id: "5", constraint: "Paiement intégral et 100 % en ligne à la réservation, aucun acompte ni règlement partiel", nature: "métier", source: "CR-01/Q24, CR-01/Q25" },
  { id: "6", constraint: "Clôture des réservations en ligne 2 heures avant le départ", nature: "métier", source: "CR-01/Q35, CR-02/Q08" },
  { id: "7", constraint: "Annulations et remboursements entièrement manuels, aucun flux automatique côté système", nature: "opérationnelle", source: "CR-01/Q36, CR-02/Q02" },
  { id: "8", constraint: "Aucune synchronisation avec des agendas externes", nature: "technique", source: "CR-01/Q17" },
  { id: "9", constraint: "Interface multilingue (FR/EN) dès le lancement", nature: "métier", source: "CR-01/Q07, CR-02/§3" },
  { id: "10", constraint: "Facture PDF émise automatiquement à chaque confirmation de commande", nature: "métier / légale", source: "CR-01/Q47" },
  { id: "11", constraint: "Manifeste passagers hors périmètre applicatif (obligation capitainerie gérée sur papier)", nature: "réglementaire", source: "CR-02/Q05" },
  { id: "12", constraint: "Un seul profil back-office, pas de sous-comptes", nature: "technique / organisationnelle", source: "CR-02/Q03" },
  { id: "13", constraint: "Seuil de maintien d'un créneau : minimum 6 réservations payantes", nature: "métier", source: "CR-02/Q01" },
  { id: "14", constraint: "Aucune mixité de types de sortie sur un même créneau ni une même embarcation", nature: "métier", source: "CR-02/Q09, CR-02/Q11" },
  { id: "15", constraint: "Un seul naturaliste disponible (contrainte d'encadrement sur les sorties baleines)", nature: "ressource / physique", source: "CR-02/Q10" },
  { id: "16", constraint: "Réservations uniquement via le site web, aucun autre canal dans le système", nature: "métier", source: "CR-02/Q13" },
]
