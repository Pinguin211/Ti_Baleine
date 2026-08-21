/**
 * CASE-ADMIN-059 — Déclenchement d'une alerte sur un créneau sans aucune
 * réservation : passage sous pré-alerte sans message sortant
 * SPEC-ADMIN-06 | Cas limite #2
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-059.md :
 * une assertion par ligne « Alors » ou « Et », soit trois.
 *
 * Seules l'horloge, la passerelle SMS/e-mail et la persistance du statut
 * créneau sont simulées ; la gestion sans erreur d'une file de destinataires
 * vide est l'objet du cas.
 */
import { expect, it } from 'vitest';
import type {
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
import { obtenirAffichagePublicCreneauAlerte } from '../../../src/services/server/alerts/avertissement-public';

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

it('test_CASE_ADMIN_059_alerte_creneau_sans_reservation_statut_pre_alerte_sans_message', () => {
  // Étant donné un créneau du lendemain sans aucun passager réservé (0 client)
  const creneau: CreneauCibleAlerte = {
    id: 'CRENEAU-SG-0718-1400',
    date: new Date(2026, 7, 18),
    heureDepart: '14:00',
    port: 'SAINT_GILLES',
    activite: 'BALEINES',
    estOuvert: true,
    sousPreAlerte: false,
    reservataires: [],
  };
  const depotCreneau = new DepotCreneauAlerteEnMemoire([creneau]);
  const envoiSms = new EnvoiSmsEnMemoire();
  const envoiEmail = new EnvoiEmailEnMemoire();

  // Quand l'administrateur déclenche l'alerte sur ce créneau
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS_EMAIL',
    message: 'Alerte météo.\n\nWeather alert.',
  };
  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms,
    envoiEmail,
    depotCreneau,
    journal: new JournalAlerteEnMemoire(),
    horloge: new HorlogeFixe(new Date(2026, 7, 17, 18, 0)),
  });

  // Alors le créneau passe au statut « sous pré-alerte »
  expect(depotCreneau.estSousPreAlerte(creneau.id)).toBe(true);

  // Et 0 SMS et 0 E-mail ne sont émis (liste de destinataires vide gérée sans
  // erreur)
  expect({
    sms: resultat.notificationsSmsEnvoyees.length,
    email: resultat.notificationsEmailEnvoyees.length,
  }).toEqual({ sms: 0, email: 0 });

  // Et la mention d'avertissement est activée pour les futures réservations
  const creneauApresAlerte = {
    ...creneau,
    sousPreAlerte: depotCreneau.estSousPreAlerte(creneau.id),
  };
  expect(obtenirAffichagePublicCreneauAlerte(creneauApresAlerte, 36).mention).not.toBeNull();
});
