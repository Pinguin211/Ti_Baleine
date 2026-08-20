/**
 * CASE-FAC-715 — Facture d'acompte ou de solde transmise en pièce jointe PDF valide du courriel
 * SPEC-FAC-02 | AC-6, Portée §4
 */
import { it, expect, vi, afterEach } from 'vitest';
import type {
  ReservationFacturable,
  PaiementAcompteValide,
  PaiementSoldeValide,
} from '../../../src/schemas/types/facturation.types';
import type {
  EnvoiCourriel,
  DepotEmissionFacture,
  Horloge,
  CourrielFacturation,
  StatutEmissionFacture,
} from '../../../src/schemas/types/facturation-ports.types';
import { emettreFactureAcompteApresPaiement } from '../../../src/actions/emettre-facture-acompte-apres-paiement';
import { emettreFactureSoldeApresPaiement } from '../../../src/actions/emettre-facture-solde-apres-paiement';

class EnvoiCourrielEnMemoire implements EnvoiCourriel {
  public messagesEnvoyes: CourrielFacturation[] = [];
  envoyer(message: CourrielFacturation): void {
    this.messagesEnvoyes.push(message);
  }
}

class DepotEmissionFactureEnMemoire implements DepotEmissionFacture {
  public statutsEnregistres: StatutEmissionFacture[] = [];
  enregistrerStatutEmission(entree: StatutEmissionFacture): void {
    this.statutsEnregistres.push(entree);
  }
  obtenirStatutEmission(
    reservationId: string,
    typeFacture: 'acompte' | 'solde'
  ): StatutEmissionFacture | undefined {
    return this.statutsEnregistres.find(
      (s) => s.reservationId === reservationId && s.typeFacture === typeFacture
    );
  }
}

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

afterEach(() => {
  vi.restoreAllMocks();
});

it('test_CASE_FAC_715_piece_jointe_pdf_facture_valide', () => {
  // Étant donné une confirmation de paiement réussie (acompte ou solde) déclenchant l'envoi du
  // courriel transactionnel correspondant
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-715',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.piece-jointe@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  // Quand le courriel est reçu par le client
  // Alors le courriel contient une pièce jointe au format PDF
  // Et la pièce jointe correspond à la facture d'acompte si l'événement déclencheur est le
  // paiement de l'acompte
  expect(envoiCourriel.messagesEnvoyes[0].pieceJointe).toMatchObject({
    nomFichier: expect.stringMatching(/\.pdf$/i),
    typeMime: 'application/pdf',
    contenu: factureAcompte.contenu,
  });

  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };
  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Ou à la facture de solde si l'événement déclencheur est le règlement du solde
  expect(envoiCourriel.messagesEnvoyes[1].pieceJointe).toMatchObject({
    nomFichier: expect.stringMatching(/\.pdf$/i),
    typeMime: 'application/pdf',
    contenu: factureSolde.contenu,
  });
  expect(envoiCourriel.messagesEnvoyes[1].pieceJointe.contenu).not.toBe(
    envoiCourriel.messagesEnvoyes[0].pieceJointe.contenu
  );
});
