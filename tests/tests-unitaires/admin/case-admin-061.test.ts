/**
 * CASE-ADMIN-061 — Traitement d'un échec individuel de délivrance lors d'une
 * alerte groupée : journalisation sans blocage de la file
 * SPEC-ADMIN-06 | Cas limite #4, REQ-106
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-061.md :
 * une assertion par ligne « Alors » ou « Et », soit trois.
 *
 * Seules l'horloge et la persistance du statut créneau sont simulées ; la
 * passerelle SMS simule un échec ciblé sur un seul destinataire (ce qui
 * l'entoure), la continuité de la file et sa journalisation sont l'objet du
 * cas.
 */
import { expect, it } from 'vitest';
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

class EnvoiSmsAvecUnEchecCible implements EnvoiSms {
  public messagesEnvoyes: { destinataireTelephone: string; message: string }[] = [];
  constructor(private readonly telephoneEnEchec: string) {}
  envoyer(sms: { destinataireTelephone: string; message: string }): void {
    if (sms.destinataireTelephone === this.telephoneEnEchec) {
      throw new Error('Numéro de mobile invalide');
    }
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

it('test_CASE_ADMIN_061_traitement_echec_individuel_delivrance_alerte_groupee_log', () => {
  // Étant donné une alerte groupée envoyée à 25 clients réservataires
  // Et le 3ème destinataire détenant un numéro de mobile invalide
  const reservataires: ClientReservataire[] = Array.from({ length: 25 }, (_, index) => ({
    nom: `Client${index + 1}`,
    prenom: 'Test',
    email: `client${index + 1}@test.re`,
    telephone: `+26269200${String(index + 1).padStart(4, '0')}`,
  }));
  const telephoneEnEchec = reservataires[2].telephone;

  const creneau: CreneauCibleAlerte = {
    id: 'CRENEAU-SG-0718-0700',
    date: new Date(2026, 7, 18),
    heureDepart: '07:00',
    port: 'SAINT_GILLES',
    activite: 'BALEINES',
    estOuvert: true,
    sousPreAlerte: false,
    reservataires,
  };

  const depotCreneau = new DepotCreneauAlerteEnMemoire([creneau]);
  const journal = new JournalAlerteEnMemoire();
  const envoiSms = new EnvoiSmsAvecUnEchecCible(telephoneEnEchec);

  // Quand la file d'envoi s'exécute
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS',
    message: 'Alerte météo.\n\nWeather alert.',
  };
  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms,
    envoiEmail: new EnvoiEmailEnMemoire(),
    depotCreneau,
    journal,
    horloge: new HorlogeFixe(new Date(2026, 7, 17, 18, 0)),
  });

  // Alors l'échec d'envoi du 3ème destinataire est consigné dans les logs
  // applicatifs (REQ-106)
  expect(journal.echecsConsignes).toEqual([
    { destinataire: telephoneEnEchec, canal: 'SMS', motif: expect.any(String) },
  ]);

  // Et la file continue son traitement et délivre l'alerte avec succès aux 24
  // autres clients réservataires
  expect(resultat.notificationsSmsEnvoyees.map((n) => n.destinataireTelephone).sort()).toEqual(
    reservataires
      .filter((r) => r.telephone !== telephoneEnEchec)
      .map((r) => r.telephone)
      .sort()
  );

  // Et le créneau passe au statut sous pré-alerte
  expect(depotCreneau.estSousPreAlerte(creneau.id)).toBe(true);
});
