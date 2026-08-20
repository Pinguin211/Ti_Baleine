/**
 * CASE-ADMIN-055 — Présence obligatoire du message bilingue combiné FR + EN
 * dans le corps unique de message
 * SPEC-ADMIN-06 | Scénario 1, AC-3, REQ-018, R-26
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-055.md :
 * une assertion par ligne « Alors » ou « Et », soit trois.
 *
 * Seules l'horloge, la passerelle SMS/e-mail et la persistance du statut
 * créneau sont simulées ; la composition bilingue et la diffusion d'un
 * message unique indistinct sont l'objet du cas.
 */
import { expect, it } from 'vitest';
import { composerMessageBilingue } from '../../../src/services/server/alerts/templates-alerte';
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

it('test_CASE_ADMIN_055_presence_obligatoire_message_bilingue_combine_fr_en', () => {
  // Étant donné le message d'alerte prêt pour diffusion
  const texteFr = 'Sortie annulée en raison de conditions météorologiques défavorables.';
  const texteEn = 'Trip cancelled due to unfavorable weather conditions.';

  // Quand le message est généré pour expédition
  const messageCombine = composerMessageBilingue(texteFr, texteEn);

  // Alors le corps unique du message contient la section en langue française
  expect(messageCombine.startsWith(texteFr)).toBe(true);

  // Et le corps unique du message contient immédiatement à la suite la
  // section en langue anglaise
  expect(messageCombine.endsWith(texteEn)).toBe(true);

  // Et un seul et même message bilingue est expédié à tous les destinataires
  // indistinctement
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
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS_EMAIL',
    message: messageCombine,
  };
  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms: new EnvoiSmsEnMemoire(),
    envoiEmail: new EnvoiEmailEnMemoire(),
    depotCreneau: new DepotCreneauAlerteEnMemoire([creneau]),
    journal: new JournalAlerteEnMemoire(),
    horloge: new HorlogeFixe(new Date(2026, 7, 17, 18, 0)),
  });
  const messagesDistincts = new Set([
    ...resultat.notificationsSmsEnvoyees.map((n) => n.message),
    ...resultat.notificationsEmailEnvoyees.map((n) => n.corpsMessage),
  ]);
  expect(messagesDistincts).toEqual(new Set([messageCombine]));
});
