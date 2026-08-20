/**
 * CASE-ADMIN-051 — Envoi combiné simultané d'une alerte de pré-annulation par
 * SMS et E-mail
 * SPEC-ADMIN-06 | Scénario 1, AC-1, REQ-017
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-051.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seules l'horloge, la passerelle SMS, la passerelle e-mail et la persistance
 * du statut créneau sont simulées.
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

it('test_CASE_ADMIN_051_envoi_combine_simultane_alerte_sms_email', () => {
  // Étant donné l'administrateur émettant une alerte de pré-annulation aux
  // clients inscrits sur les créneaux ciblés
  const clientA: ClientReservataire = {
    nom: 'Payet',
    prenom: 'Marie',
    email: 'marie.payet@test.re',
    telephone: '+262692000001',
  };
  const clientB: ClientReservataire = {
    nom: 'Hoarau',
    prenom: 'Paul',
    email: 'paul.hoarau@test.re',
    telephone: '+262692000002',
  };

  const creneau: CreneauCibleAlerte = {
    id: 'CRENEAU-SG-0718-0700',
    date: new Date(2026, 7, 18),
    heureDepart: '07:00',
    port: 'SAINT_GILLES',
    activite: 'BALEINES',
    estOuvert: true,
    sousPreAlerte: false,
    reservataires: [clientA, clientB],
  };

  // Quand il sélectionne l'option combinée « SMS et E-mail » et clique sur
  // « Envoyer l'alerte »
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS_EMAIL',
    message: 'Alerte météo.\n\nWeather alert.',
  };

  const envoiSms = new EnvoiSmsEnMemoire();
  const envoiEmail = new EnvoiEmailEnMemoire();
  const depotCreneau = new DepotCreneauAlerteEnMemoire([creneau]);
  const journal = new JournalAlerteEnMemoire();
  const horloge = new HorlogeFixe(new Date(2026, 7, 17, 18, 0));

  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms,
    envoiEmail,
    depotCreneau,
    journal,
    horloge,
  });

  // Alors chaque client réservataire reçoit un SMS sur son numéro mobile ET un
  // courriel à son adresse e-mail
  expect({
    telephonesNotifies: resultat.notificationsSmsEnvoyees.map((n) => n.destinataireTelephone).sort(),
    emailsNotifies: resultat.notificationsEmailEnvoyees.map((n) => n.destinataireEmail).sort(),
  }).toEqual({
    telephonesNotifies: [clientA.telephone, clientB.telephone].sort(),
    emailsNotifies: [clientA.email, clientB.email].sort(),
  });

  // Et les créneaux ciblés passent à l'état sous pré-alerte
  expect(resultat.creneauxMisAJour.map((c) => c.sousPreAlerte)).toEqual([true]);
});
