import type { EnvoiCourriel } from '../../schemas/types/facturation-ports.types';

declare global {
  var dernierEnvoiCourrielFactureEnEchec: boolean | undefined;
}

/**
 * Transmet le courriel transactionnel de facturation avec la facture PDF
 * générée en pièce jointe et son récapitulatif textuel (dérivé du contenu
 * de la facture elle-même) au client. Intercepte toute panne d'expédition
 * (SMTP indisponible) sans interrompre le processus global, et publie
 * l'issue de la tentative pour le suivi du statut d'émission (SPEC-FAC-02,
 * AC-6, cas limite #1).
 */
export function envoyerCourrielFacture(
  envoiCourriel: EnvoiCourriel,
  destinataire: string,
  nomFichier: string,
  contenu: Uint8Array,
): void {
  const recapitulatifReservation = new TextDecoder().decode(contenu);
  try {
    envoiCourriel.envoyer({
      destinataire,
      pieceJointe: { nomFichier, contenu, typeMime: 'application/pdf' },
      recapitulatifReservation,
    });
    globalThis.dernierEnvoiCourrielFactureEnEchec = false;
  } catch {
    globalThis.dernierEnvoiCourrielFactureEnEchec = true;
  }
}
