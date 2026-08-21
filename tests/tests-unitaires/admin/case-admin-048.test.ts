/**
 * CASE-ADMIN-048 — Envoi groupé d'une alerte météo bilingue la veille à 18h sur
 * plusieurs créneaux ciblés du lendemain
 * SPEC-ADMIN-06 | Scénario 1, AC-1, Cas limite #5, REQ-017, R-22, R-24
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-048.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seules l'horloge, la passerelle SMS, la passerelle e-mail et la persistance
 * du statut créneau sont simulées — ce qui entoure le cas. La diffusion
 * groupée elle-même (consolidation des destinataires des 3 créneaux et
 * bascule d'état) est l'objet du cas et n'est pas simulée.
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

it('test_CASE_ADMIN_048_envoi_groupe_alerte_meteo_veille_18h_multi_creneaux', () => {
  // Étant donné l'administrateur sur l'écran d'envoi d'alerte le lundi à 18h00
  const horloge = new HorlogeFixe(new Date(2026, 7, 17, 18, 0));

  const clientSaintGilles7h: ClientReservataire = {
    nom: 'Payet',
    prenom: 'Marie',
    email: 'marie.payet@test.re',
    telephone: '+262692000001',
  };
  const clientSaintGilles10h: ClientReservataire = {
    nom: 'Hoarau',
    prenom: 'Paul',
    email: 'paul.hoarau@test.re',
    telephone: '+262692000002',
  };
  const clientSaintLeu9h: ClientReservataire = {
    nom: 'Fontaine',
    prenom: 'Julie',
    email: 'julie.fontaine@test.re',
    telephone: '+262692000003',
  };

  // Quand il sélectionne simultanément les créneaux du mardi 7h00 et 10h00 à
  // Saint-Gilles et 9h00 à Saint-Leu
  const creneauxCibles: CreneauCibleAlerte[] = [
    {
      id: 'CRENEAU-SG-0718-0700',
      date: new Date(2026, 7, 18),
      heureDepart: '07:00',
      port: 'SAINT_GILLES',
      activite: 'BALEINES',
      estOuvert: true,
      sousPreAlerte: false,
      reservataires: [clientSaintGilles7h],
    },
    {
      id: 'CRENEAU-SG-0718-1000',
      date: new Date(2026, 7, 18),
      heureDepart: '10:00',
      port: 'SAINT_GILLES',
      activite: 'DAUPHINS',
      estOuvert: true,
      sousPreAlerte: false,
      reservataires: [clientSaintGilles10h],
    },
    {
      id: 'CRENEAU-SL-0718-0900',
      date: new Date(2026, 7, 18),
      heureDepart: '09:00',
      port: 'SAINT_LEU',
      activite: 'BALEINES',
      estOuvert: true,
      sousPreAlerte: false,
      reservataires: [clientSaintLeu9h],
    },
  ];

  // Et sélectionne le motif météo prérempli avec le message bilingue
  // Et valide l'envoi groupé
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles,
    canal: 'SMS_EMAIL',
    message:
      'Sortie potentiellement annulée en raison de conditions météorologiques défavorables.\n\nTrip potentially cancelled due to unfavorable weather conditions.',
  };

  const envoiSms = new EnvoiSmsEnMemoire();
  const envoiEmail = new EnvoiEmailEnMemoire();
  const depotCreneau = new DepotCreneauAlerteEnMemoire(creneauxCibles);
  const journal = new JournalAlerteEnMemoire();

  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms,
    envoiEmail,
    depotCreneau,
    journal,
    horloge,
  });

  // Alors le système diffuse en une seule opération le message d'alerte à
  // l'ensemble des clients réservataires des 3 créneaux
  expect({
    telephonesNotifies: resultat.notificationsSmsEnvoyees.map((n) => n.destinataireTelephone).sort(),
    emailsNotifies: resultat.notificationsEmailEnvoyees.map((n) => n.destinataireEmail).sort(),
  }).toEqual({
    telephonesNotifies: [
      clientSaintGilles7h.telephone,
      clientSaintGilles10h.telephone,
      clientSaintLeu9h.telephone,
    ].sort(),
    emailsNotifies: [clientSaintGilles7h.email, clientSaintGilles10h.email, clientSaintLeu9h.email].sort(),
  });

  // Et les 3 créneaux basculent immédiatement à l'état « sous pré-alerte »
  expect(resultat.creneauxMisAJour.map((c) => c.sousPreAlerte)).toEqual([true, true, true]);
});
