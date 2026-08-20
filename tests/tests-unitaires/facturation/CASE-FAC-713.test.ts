/**
 * CASE-FAC-713 — Génération de la facture PDF exclusivement en mémoire sans persistance de
 * fichier physique sur le disque du serveur
 * SPEC-FAC-02 | AC-1, AC-2, Règle, Portée §5
 */
import { readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
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

it('test_CASE_FAC_713_generation_facture_pdf_exclusivement_en_memoire_sans_persistance_disque', () => {
  // Étant donné une réservation dont l'acompte ou le solde vient d'être validé
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-713',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'client.disque@test.re',
  };

  const envoiCourriel = new EnvoiCourrielEnMemoire();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));

  const fichiersAvant = readdirSync(tmpdir());

  // Quand le moteur de facturation génère la facture d'acompte PDF (ou la facture de solde PDF)
  // et l'expédie par courriel
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  const factureAcompte = emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );

  const paiementSolde: PaiementSoldeValide = { montantRegle: 105, statut: 'validé avec succès' };
  const factureSolde = emettreFactureSoldeApresPaiement(
    { reservation, paiement: paiementSolde, acompteRegle: factureAcompte.acompteRegle },
    { envoiCourriel, depotEmission, horloge }
  );

  // Alors le flux binaire du PDF est produit exclusivement en mémoire vive (ou via un fichier
  // temporaire en mémoire détruit immédiatement)
  expect(factureAcompte.contenu).toBeInstanceOf(Uint8Array);
  expect(factureAcompte.contenu.byteLength).toBeGreaterThan(0);
  expect(factureSolde.contenu).toBeInstanceOf(Uint8Array);
  expect(factureSolde.contenu.byteLength).toBeGreaterThan(0);

  // Et aucun nouveau fichier PDF persistant n'est présent sur le système de fichiers du serveur à
  // l'issue de l'opération
  const fichiersApres = readdirSync(tmpdir());
  const nouveauxFichiersPdf = fichiersApres.filter(
    (fichier) => !fichiersAvant.includes(fichier) && fichier.endsWith('.pdf')
  );
  expect(nouveauxFichiersPdf).toHaveLength(0);
});
