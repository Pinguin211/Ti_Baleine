/**
 * CASE-ADMIN-060 — Blocage de la validation de l'envoi d'alerte lorsque le
 * corps du message est vide ou effacé
 * SPEC-ADMIN-06 | Cas limite #3
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-060.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seules l'horloge, la passerelle SMS/e-mail, le journal et la persistance du
 * statut créneau sont simulés ; le blocage de la validation à message vide
 * est l'objet du cas.
 */
import { expect, it } from 'vitest';
import { validerEnvoiAlerte } from '../../../src/schemas/validation/alerts/selection-alerte.schema';
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

it('test_CASE_ADMIN_060_blocage_envoi_alerte_corps_message_vide', () => {
  // Étant donné des créneaux sélectionnés pour l'envoi d'une alerte
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
    sousPreAlerte: false,
    reservataires: [client],
  };

  // Quand l'administrateur efface totalement le texte du message («») et
  // tente de valider l'envoi
  const selection = { creneauxSelectionnes: [creneau], message: '' };
  const resultatValidation = validerEnvoiAlerte(selection);

  // Alors le système bloque l'envoi avec le message « Le corps du message ne
  // peut pas être vide »
  expect(resultatValidation).toEqual({
    valide: false,
    motifErreur: 'Le corps du message ne peut pas être vide',
  });

  // Et aucune notification n'est envoyée
  const envoiSms = new EnvoiSmsEnMemoire();
  const envoiEmail = new EnvoiEmailEnMemoire();
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS_EMAIL',
    message: '',
  };
  try {
    envoyerAlerteGroupee(demande, {
      envoiSms,
      envoiEmail,
      depotCreneau: new DepotCreneauAlerteEnMemoire([creneau]),
      journal: new JournalAlerteEnMemoire(),
      horloge: new HorlogeFixe(new Date(2026, 7, 17, 18, 0)),
    });
  } catch {
    // Rejet attendu : le message vide bloque l'envoi.
  }
  expect({ sms: envoiSms.messagesEnvoyes.length, email: envoiEmail.messagesEnvoyes.length }).toEqual(
    { sms: 0, email: 0 }
  );
});
