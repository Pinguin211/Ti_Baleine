/**
 * CASE-ADMIN-050 — Envoi d'une alerte de pré-annulation via le canal E-mail uniquement
 * SPEC-ADMIN-06 | Portée §2, AC-1, REQ-017
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-050.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seules l'horloge, la passerelle SMS, la passerelle e-mail et la persistance
 * du statut créneau sont simulées. Le filtrage du canal de diffusion est
 * l'objet du cas et n'est pas simulé.
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

it('test_CASE_ADMIN_050_envoi_alerte_pre_annulation_canal_email_uniquement', () => {
  // Étant donné l'administrateur configurant une alerte sur un créneau du
  // lendemain (Lendemain 10h00 Saint-Gilles)
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
    id: 'CRENEAU-SG-0718-1000',
    date: new Date(2026, 7, 18),
    heureDepart: '10:00',
    port: 'SAINT_GILLES',
    activite: 'DAUPHINS',
    estOuvert: true,
    sousPreAlerte: false,
    reservataires: [clientA, clientB],
  };

  // Quand il sélectionne le canal « E-mail uniquement » et valide l'envoi
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'EMAIL',
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

  // Alors des courriels contenant le message d'alerte bilingue sont émis vers
  // les adresses des clients réservataires
  expect(resultat.notificationsEmailEnvoyees.map((n) => n.destinataireEmail).sort()).toEqual(
    [clientA.email, clientB.email].sort()
  );

  // Et aucun SMS n'est émis par la passerelle téléphonique
  expect(resultat.notificationsSmsEnvoyees).toEqual([]);
});
