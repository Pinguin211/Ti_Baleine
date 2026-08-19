/**
 * CASE-FAC-700 — Envoi de la facture PDF acquittée après paiement d'une réservation
 * individuelle à Saint-Leu
 * SPEC-FAC-02 | AC-1, AC-2, AC-3, AC-5
 */
import { it, expect, vi, afterEach } from 'vitest';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import type { ReservationFacturable, PaiementValide } from '../../../src/domain/facturation/facture.types';
import type {
  EnvoiCourriel,
  DepotEmissionFacture,
  Horloge,
  CourrielFacturation,
  StatutEmissionFacture,
} from '../../../src/domain/facturation/ports';
import { emettreFactureApresPaiement } from '../../../src/domain/facturation/emettreFactureApresPaiement';

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

it('test_CASE_FAC_700_envoi_facture_pdf_acquittee_reservation_individuelle_saint_leu', () => {
  // Étant donné une réservation individuelle pour une sortie « Baleines » le 18/08/2026 à 9h00
  // Et un port d'embarquement situé à « Saint-Leu »
  // Et un groupe composé de 2 adultes
  // Et un tarif de base de 65 € par adulte et un supplément géographique de 10 € par personne
  // Et une adresse courriel client renseignée « client.exemple@test.re »
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-700',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.exemple@test.re',
  };

  const paiement: PaiementValide = {
    montantRegle: 150,
    statut: 'validé avec succès',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  const ecritureDisqueSync = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined);
  const ecritureDisqueAsync = vi.spyOn(fsPromises, 'writeFile').mockResolvedValue(undefined);

  // Quand le paiement en ligne d'un montant total de 150 € est validé avec succès
  const facture = emettreFactureApresPaiement(
    { reservation, paiement },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors une facture acquittée est générée à la volée en mémoire au format PDF
  expect(facture).toMatchObject({ format: 'pdf', contenu: expect.any(Uint8Array) });

  // Et la facture PDF mentionne l'identifiant unique, la mention explicite « Acquittée », la date
  // « 18/08/2026 9h00 », le port « Saint-Leu » et la ligne de supplément
  // (« Majoration / Supplément Saint-Leu » ou « 2 × 10 € »)
  expect(facture).toMatchObject({
    identifiantUnique: expect.stringMatching(/.+/),
    mentionAcquittement: 'Acquittée',
    dateDepartFormatee: '18/08/2026 9h00',
    portEmbarquement: 'Saint-Leu',
    ligneSupplement: expect.stringMatching(/Majoration \/ Supplément Saint-Leu|2 × 10 €/),
  });

  // Et un courriel transactionnel contenant la facture PDF en pièce jointe et le récapitulatif de
  // la réservation est envoyé à « client.exemple@test.re »
  expect(envoiCourriel.messagesEnvoyes).toEqual([
    {
      destinataire: 'client.exemple@test.re',
      pieceJointe: { nomFichier: expect.any(String), contenu: facture.contenu, typeMime: 'application/pdf' },
      recapitulatifReservation: expect.stringContaining('Baleines'),
    },
  ]);

  // Et aucun fichier PDF physique n'est stocké sur le disque du serveur
  expect(ecritureDisqueSync.mock.calls.length + ecritureDisqueAsync.mock.calls.length).toBe(0);

  // Et l'état d'émission de la facture est persisté en base de données à « envoyée avec succès »
  // avec son horodatage
  expect(depotEmission.statutsEnregistres).toEqual([
    { reservationId: reservation.id, statut: 'envoyée avec succès', horodatage: horloge.maintenant() },
  ]);
});
