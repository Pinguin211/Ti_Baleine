/**
 * @file cahier-des-charges/section5.ts
 * @description Section 8 — Règles Métier (R-01 à R-19) et Grille Tarifaire (CDC v2)
 */

export const cdcBusinessRules = [
  { id: "R-01", rule: "Le planning est fixe toute l'année : trois créneaux par jour, à 7h, 10h et 14h.", source: "CR-01/Q09, CR-01/Q10" },
  { id: "R-02", rule: "Le service est ouvert 7 jours sur 7 ; il est fermé uniquement le 25 décembre et le 1er janvier.", source: "CR-01/Q09 (corrigé)" },
  { id: "R-03", rule: "La flotte comprend deux bateaux : Tikap (12 places) et Grand Bleu (24 places).", source: "CR-01/Q12, CR-01/Q15" },
  { id: "R-04", rule: "Tarifs fixes : baleines 65 € adulte / 40 € enfant, dauphins 50 € adulte / 30 € enfant, privatisation Tikap 600 €, Grand Bleu 1 100 €.", source: "CR-01/Q18" },
  { id: "R-05", rule: "Le tarif enfant s'applique de 4 à 11 ans inclus ; à partir de 12 ans, tarif adulte. Les enfants de moins de 4 ans ne sont pas admis à bord, sans exception ni tarif dérogatoire.", source: "CR-02/Q04" },
  { id: "R-06", rule: "Le paiement est intégral et exclusivement en ligne au moment de la réservation, par carte bancaire.", source: "CR-01/Q24, CR-01/Q25" },
  { id: "R-07", rule: "Une facture PDF est générée et envoyée automatiquement à la confirmation de commande.", source: "CR-01/Q47" },
  { id: "R-08", rule: "Le seuil minimum de maintien d'un départ est de 6 passagers payants par bateau.", source: "CR-02/Q01" },
  { id: "R-09", rule: "La jauge maximale absolue est de 36 places par créneau (12 + 24), avec blocage automatique des réservations au-delà.", source: "CR-02/Q01" },
  { id: "R-10", rule: "Les réservations en ligne sont closes 2 heures avant le départ.", source: "CR-01/Q35, CR-02/Q08" },
  { id: "R-11", rule: "Un même créneau et une même embarcation sont dédiés à une seule activité exclusive (pas de mixité de prestations).", source: "CR-02/Q09, CR-02/Q11" },
  { id: "R-12", rule: "L'administrateur peut modifier la disponibilité et la configuration des créneaux depuis le back-office.", source: "CR-02/Q12" },
  { id: "R-13", rule: "Un seul profil administrateur accède au back-office ; pas de sous-comptes capitaine ou vendeur.", source: "CR-02/Q03" },
  { id: "R-14", rule: "Un seul naturaliste est disponible et obligatoire pour encadrer les sorties baleines.", source: "CR-02/Q10" },
  { id: "R-15", rule: "Aucune annulation ni aucun remboursement n'est traité automatiquement par le système ; tout passe par contact direct avec l'entreprise.", source: "CR-01/Q36, CR-02/Q02" },
  { id: "R-16", rule: "L'administrateur reçoit une alerte (SMS et/ou e-mail) uniquement en cas d'annulation, jamais pour une nouvelle réservation.", source: "CR-01/§1 citation, CR-02/Q07" },
  { id: "R-17", rule: "Le manifeste de bord reste un registre papier, hors périmètre du système.", source: "CR-02/Q05" },
  { id: "R-18", rule: "Toutes les réservations grand public passent exclusivement par la plateforme web.", source: "CR-02/Q13" },
  { id: "R-19", rule: "Aucune synchronisation avec un agenda externe (Google Calendar, Outlook…) n'est requise.", source: "CR-01/Q17" },
]

export const cdcTarifs = [
  { prestation: "Sortie Baleines — Adulte", condition: "12 ans et plus", tarif: "65 €", type: "standard" },
  { prestation: "Sortie Baleines — Enfant", condition: "4 à 11 ans inclus", tarif: "40 €", type: "standard" },
  { prestation: "Sortie Dauphins — Adulte", condition: "12 ans et plus", tarif: "50 €", type: "standard" },
  { prestation: "Sortie Dauphins — Enfant", condition: "4 à 11 ans inclus", tarif: "30 €", type: "standard" },
  { prestation: "Enfants de moins de 4 ans", condition: "Moins de 4 ans (Non admis à bord)", tarif: "Non admis", type: "restricted" },
  { prestation: "Privatisation Tikap", condition: "Demi-journée (Formule Sunset)", tarif: "600 € (Forfait)", type: "forfait" },
  { prestation: "Privatisation Grand Bleu", condition: "Demi-journée (Formule Sunset)", tarif: "1 100 € (Forfait)", type: "forfait" },
]
