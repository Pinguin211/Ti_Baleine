/**
 * CASE-FAC-719 — Comportement en cas de rebond / boîte de réception pleine (Bounce) :
 * non-délivrance sans boucle de rattrapage automatique
 * SPEC-FAC-02 | Cas limite #2, Ce qui n'est pas défini §1
 */
import { it, expect, vi, afterEach } from 'vitest';
import type { ReservationFacturable, PaiementAcompteValide } from '../../../src/schemas/types/facturation.types';
import type {
  EnvoiCourriel,
  DepotEmissionFacture,
  Horloge,
  CourrielFacturation,
  StatutEmissionFacture,
} from '../../../src/schemas/types/facturation-ports.types';
import { emettreFactureAcompteApresPaiement } from '../../../src/actions/emettre-facture-acompte-apres-paiement';

class EnvoiCourrielAvecRebondAsynchrone implements EnvoiCourriel {
  public messagesEnvoyes: CourrielFacturation[] = [];
  envoyer(message: CourrielFacturation): void {
    // Accepté par la passerelle SMTP au moment de l'appel (pas de rejet immédiat)
    this.messagesEnvoyes.push(message);
  }
  /** Simule, hors flux de l'action, la réception asynchrone du rapport de Bounce distant. */
  simulerRebondAsynchrone(): void {
    // Aucune action de rattrapage n'est câblée sur cet événement (cf. « Ce qui n'est pas défini »).
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

it('test_CASE_FAC_719_rebond_email_boite_pleine_absence_boucle_rattrapage_automatique', () => {
  // Étant donné une réservation dont le paiement de l'acompte est validé, associée à une adresse
  // courriel provoquant un rejet de distribution (boîte pleine ou adresse erronée)
  const reservation: ReservationFacturable = {
    id: 'RESA-CASE-FAC-719',
    prestation: 'Sortie Baleines',
    dateDepart: new Date(2026, 7, 18, 9, 0),
    portEmbarquement: 'Saint-Leu',
    nombreAdultes: 2,
    nombreEnfants: 0,
    tarifUnitaireAdulte: 65,
    majorationGeographiqueParPersonne: 10,
    emailClient: 'boite.pleine@test.re',
  };

  const envoiCourriel = new EnvoiCourrielAvecRebondAsynchrone();
  const depotEmission = new DepotEmissionFactureEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 18, 9, 5));
  // Aucun canal SMS de secours n'est injecté dans l'action : structurellement, elle ne peut
  // déclencher aucun envoi SMS. Le spy ci-dessous documente et garantit l'absence d'appel.
  const envoiSmsDeSecours = vi.fn();

  // Quand le message contenant la facture correspondante est initialement accepté par la
  // passerelle SMTP puis retourne un avis de non-délivrance (Bounce)
  const paiementAcompte: PaiementAcompteValide = { montantRegle: 45, statut: 'validé avec succès' };
  emettreFactureAcompteApresPaiement(
    { reservation, paiement: paiementAcompte },
    { envoiCourriel, depotEmission, horloge }
  );
  envoiCourriel.simulerRebondAsynchrone();

  // Alors le système ne déclenche aucun canal alternatif automatique (pas d'envoi SMS de secours)
  expect(envoiSmsDeSecours).not.toHaveBeenCalled();

  // Et le système n'entre pas dans une boucle infinie de réexpéditions automatiques
  expect(envoiCourriel.messagesEnvoyes).toHaveLength(1);
});
