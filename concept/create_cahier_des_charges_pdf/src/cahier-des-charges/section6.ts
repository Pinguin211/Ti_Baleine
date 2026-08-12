/**
 * @file cahier-des-charges/section6.ts
 * @description Sections 9 & 10 — Exigences Fonctionnelles et Non Fonctionnelles (CDC v2)
 */

export const cdcFunctionalReqs = [
  { id: "REQ-001", requirement: "Le client peut choisir un type de sortie (Baleines, Dauphins, Privatisation)", priority: "Must", persona: "Sophie / Marc", source: "CR-01/Q02" },
  { id: "REQ-002", requirement: "Le client peut basculer entre français et anglais à tout moment du parcours", priority: "Must", persona: "Sophie", source: "CR-01/Q07" },
  { id: "REQ-003", requirement: "Le client voit uniquement les créneaux disponibles (masquage des 2 jours de fermeture annuelle — 25 décembre et 1er janvier — et des créneaux complets ou clos à moins de 2h)", priority: "Must", persona: "Sophie / Marc", source: "CR-01/Q09, CR-01/Q35" },
  { id: "REQ-004", requirement: "Le client saisit le nombre d'adultes et d'enfants pour sa réservation", priority: "Should", persona: "Marc", source: "déduit — nécessaire au calcul du tarif (R-04, R-05)" },
  { id: "REQ-005", requirement: "Le client renseigne un formulaire de contact minimal (nom, prénom, e-mail, téléphone) sans création de compte", priority: "Should", persona: "Sophie / Marc", source: "CR-02/§3" },
  { id: "REQ-006", requirement: "Le client paie 100 % du montant par carte bancaire via une passerelle sécurisée", priority: "Must", persona: "Sophie / Marc", source: "CR-01/Q24, CR-01/Q25" },
  { id: "REQ-007", requirement: "Le système affiche une confirmation immédiate à l'écran après paiement", priority: "Should", persona: "Sophie / Marc", source: "déduit — nécessaire pour clore le parcours de paiement (CR-01/Q24)" },
  { id: "REQ-008", requirement: "Le système envoie automatiquement un e-mail de confirmation accompagné de la facture PDF", priority: "Should", persona: "Sophie / Marc", source: "CR-01/Q47" },
  { id: "REQ-009", requirement: "L'administrateur consulte le planning des réservations par jour et par créneau", priority: "Should", persona: "Administrateur", source: "CR-02/Q03" },
  { id: "REQ-010", requirement: "L'administrateur voit le taux de remplissage de chaque créneau selon les capacités des bateaux (12, 24, 36 places)", priority: "Should", persona: "Administrateur", source: "CR-02/Q01" },
  { id: "REQ-011", requirement: "L'administrateur peut modifier la configuration des créneaux depuis le back-office", priority: "Could", persona: "Administrateur", source: "CR-02/Q12" },
  { id: "REQ-012", requirement: "Le système bloque automatiquement toute nouvelle réservation dès qu'un créneau atteint sa capacité maximale (12, 24 ou 36 places)", priority: "Must", persona: "—", source: "CR-02/Q01" },
]

export const cdcNonFunctionalReqs = [
  { id: "REQ-101", requirement: "L'interface publique est intégralement disponible en français et en anglais", verification: "Chaque écran du parcours client existe dans les deux langues, sans texte non traduit", source: "CR-01/Q07, CR-02/§3" },
  { id: "REQ-102", requirement: "Le site est utilisable sur ordinateur, tablette et smartphone pour le parcours client", verification: "Le parcours de réservation complet est testé et fonctionnel sur les trois formats", source: "CR-02/Q06" },
  { id: "REQ-103", requirement: "L'espace d'administration est conçu pour un usage sur ordinateur de bureau uniquement", verification: "Les écrans admin sont validés en résolution desktop, sans adaptation mobile requise", source: "CR-02/Q06" },
  { id: "REQ-104", requirement: "Les transactions par carte bancaire respectent les normes de sécurité bancaire en vigueur", verification: "Le prestataire de paiement retenu est certifié conforme (ex. PCI-DSS)", source: "déduit — obligation légale liée à REQ-006" },
  { id: "REQ-105", requirement: "Les données personnelles collectées sont limitées au strict nécessaire (nom, e-mail, téléphone)", verification: "Revue du formulaire de réservation : aucun champ superflu", source: "CR-02/§3" },
  { id: "REQ-106", requirement: "La durée de conservation des données personnelles est définie et appliquée", verification: "Politique de conservation documentée et vérifiable", source: "CR-02/§8, Q5 — en attente de réponse" },
  { id: "REQ-107", requirement: "Le système reste disponible sans interruption notable pendant les 3 créneaux quotidiens (7h, 10h, 14h)", verification: "Suivi de disponibilité sur les plages de réservation actives", source: "déduit — activité commerciale continue toute l'année (R-01)" },
]
