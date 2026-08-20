/**
 * CASE-ADMIN-073 — Rejet strict de la ré-émission d'une alerte sur un créneau
 * déjà sous statut « sous pré-alerte »
 * SPEC-ADMIN-06 | Portée §2, Cas limite #6, AC-1, REQ-017, R-22, R-24, R-25
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-073.md :
 * une assertion par ligne « Alors » ou « Et », soit quatre.
 *
 * Seules l'horloge, la passerelle SMS/e-mail, le journal et la persistance du
 * statut créneau sont simulées ; le rejet de la ré-émission (idempotence) est
 * l'objet du cas.
 */
import { expect, it } from 'vitest';
import { creneauEstSelectionnablePourAlerte } from '../../../src/schemas/validation/alerts/selection-alerte.schema';
import type {
  ClientReservataire,
  CreneauCibleAlerte,
  DemandeEnvoiAlerteGroupee,
} from '../../../src/schemas/types/alerte.types';
import type {
  EnvoiSms,
  EnvoiEmail,
  DepotCreneauAlerte,
  JournalAlerte,
  Horloge,
} from '../../../src/schemas/types/alerte-ports.types';
import { envoyerAlerteGroupee } from '../../../src/actions/envoyer-alerte-groupee';

class EnvoiSmsEnMemoire implements EnvoiSms {
  public messagesEnvoyes: { destinataireTelephone: string; message: string }[] = [];
  envoyer(sms: { destinataireTelephone: string; message: string }): void {
    this.messagesEnvoyes.push(sms);
  }
}

class EnvoiEmailEnMemoire implements EnvoiEmail {
  public messagesEnvoyes: { destinataireEmail: string; sujet: string; corpsMessage: string }[] =
    [];
  envoyer(email: { destinataireEmail: string; sujet: string; corpsMessage: string }): void {
    this.messagesEnvoyes.push(email);
  }
}

class DepotCreneauAlerteEnMemoire implements DepotCreneauAlerte {
  private readonly statuts = new Map<string, boolean>();
  constructor(creneaux: CreneauCibleAlerte[]) {
    creneaux.forEach((creneau) => this.statuts.set(creneau.id, creneau.sousPreAlerte));
  }
  basculerSousPreAlerte(creneauId: string): void {
    this.statuts.set(creneauId, true);
  }
  estSousPreAlerte(creneauId: string): boolean {
    return this.statuts.get(creneauId) ?? false;
  }
}

class JournalAlerteEnMemoire implements JournalAlerte {
  public echecsConsignes: { destinataire: string; canal: 'SMS' | 'EMAIL'; motif: string }[] = [];
  consignerEchec(echec: { destinataire: string; canal: 'SMS' | 'EMAIL'; motif: string }): void {
    this.echecsConsignes.push(echec);
  }
}

class HorlogeFixe implements Horloge {
  constructor(private readonly instant: Date) {}
  maintenant(): Date {
    return this.instant;
  }
}

it('test_CASE_ADMIN_073_rejet_reemission_alerte_creneau_deja_sous_pre_alerte', () => {
  // Étant donné un créneau déjà placé à l'état « sous pré-alerte »
  const client: ClientReservataire = {
    nom: 'Payet',
    prenom: 'Marie',
    email: 'marie.payet@test.re',
    telephone: '+262692000001',
  };
  const creneau: CreneauCibleAlerte = {
    id: 'CRENEAU-SG-0718-0700',
    date: new Date(2026, 7, 18),
    heureDepart: '07:00',
    port: 'SAINT_GILLES',
    activite: 'BALEINES',
    estOuvert: true,
    sousPreAlerte: true,
    reservataires: [client],
  };
  const depotCreneau = new DepotCreneauAlerteEnMemoire([creneau]);
  const envoiSms = new EnvoiSmsEnMemoire();
  const envoiEmail = new EnvoiEmailEnMemoire();

  // Quand l'administrateur tente de sélectionner de nouveau ce créneau pour
  // lui envoyer une alerte

  // Alors le créneau n'est plus sélectionnable pour un nouvel envoi
  expect(creneauEstSelectionnablePourAlerte(creneau)).toBe(false);

  // Et toute tentative de validation de l'envoi est bloquée / rejetée
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS_EMAIL',
    message: 'Alerte météo.\n\nWeather alert.',
  };
  expect(() =>
    envoyerAlerteGroupee(demande, {
      envoiSms,
      envoiEmail,
      depotCreneau,
      journal: new JournalAlerteEnMemoire(),
      horloge: new HorlogeFixe(new Date(2026, 7, 17, 18, 0)),
    })
  ).toThrow();

  // Et aucun nouveau message n'est expédié aux clients réservataires
  expect({ sms: envoiSms.messagesEnvoyes.length, email: envoiEmail.messagesEnvoyes.length }).toEqual(
    { sms: 0, email: 0 }
  );

  // Et le créneau demeure stable à l'état « sous pré-alerte »
  expect(depotCreneau.estSousPreAlerte(creneau.id)).toBe(true);
});
