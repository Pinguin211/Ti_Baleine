/**
 * @file cahier-des-charges/section3.ts
 * @description Section 5 — Personas (CDC v2)
 */

export const cdcPersonas = [
  {
    name: "Sophie",
    role: "Cliente touriste étrangère",
    tag: "Touriste anglophone",
    usageContext: "Réserve depuis son téléphone, souvent à l'hôtel, ne parle pas français.",
    goal: "Trouver un créneau disponible pour une sortie baleines et payer immédiatement par carte bancaire.",
    blocker: "Absence d'interface dans sa langue et de paiement en ligne direct.",
  },
  {
    name: "Marc",
    role: "Client local",
    tag: "Résident réunionnais",
    usageContext: "Réserve depuis un ordinateur ou un mobile, connaît déjà l'offre de Ti'Baleine.",
    goal: "Réserver rapidement une sortie « coucher de soleil » pour un groupe (adultes et enfants).",
    blocker: "Pas de vision claire des créneaux encore disponibles avant d'appeler par téléphone.",
  },
  {
    name: "L'administrateur",
    role: "Gérant de Ti'Baleine",
    tag: "Back-office PC",
    usageContext: "Ordinateur de bureau (Desktop/PC), consultation quotidienne du planning d'excursions.",
    goal: "Voir en un coup d'œil le remplissage de chaque créneau pour organiser le dispatch opérationnel avant le départ.",
    blocker: "Pas d'outil centralisé, gestion probablement dispersée entre appels et notes manuelles (CR-02/Q03).",
  },
]
