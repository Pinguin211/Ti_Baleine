/**
 * CASE-ADMIN-056 — Basculement automatique du statut des créneaux ciblés à
 * « sous pré-alerte » dès confirmation d'envoi
 * SPEC-ADMIN-06 | Scénario 1, AC-4, REQ-019, R-25
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-056.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seules l'horloge, la passerelle SMS/e-mail et le journal sont simulés ; la
 * bascule d'état du créneau et sa répercussion immédiate en dépôt sont
 * l'objet du cas.
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

it('test_CASE_ADMIN_056_basculement_automatique_statut_creneau_sous_pre_alerte', () => {
  // Étant donné un créneau du lendemain initialement à l'état « ouvert »
  // (statut standard)
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
  const depotCreneau = new DepotCreneauAlerteEnMemoire([creneau]);

  // Quand l'administrateur confirme l'envoi de l'alerte sur ce créneau
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS',
    message: 'Alerte météo.\n\nWeather alert.',
  };
  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms: new EnvoiSmsEnMemoire(),
    envoiEmail: new EnvoiEmailEnMemoire(),
    depotCreneau,
    journal: new JournalAlerteEnMemoire(),
    horloge: new HorlogeFixe(new Date(2026, 7, 17, 18, 0)),
  });

  // Alors le statut du créneau en base de données passe automatiquement à
  // « SOUS_PRE_ALERTE »
  expect(resultat.creneauxMisAJour[0]).toEqual({ id: creneau.id, sousPreAlerte: true });

  // Et ce nouveau statut est répercuté immédiatement sur le planning et le
  // site de réservation
  expect(depotCreneau.estSousPreAlerte(creneau.id)).toBe(true);
});
