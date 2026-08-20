/**
 * CASE-ADMIN-049 — Envoi d'une alerte de pré-annulation via le canal SMS uniquement
 * SPEC-ADMIN-06 | Portée §2, AC-1, REQ-017
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-049.md :
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

it('test_CASE_ADMIN_049_envoi_alerte_pre_annulation_canal_sms_uniquement', () => {
  // Étant donné l'administrateur configurant une alerte de pré-annulation sur
  // un créneau du lendemain (Sortie Baleines lendemain 07h00)
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

  // Quand il sélectionne le canal de diffusion « SMS uniquement » et confirme
  // l'envoi
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS',
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

  // Alors des SMS transactionnels sont expédiés aux numéros de téléphone de
  // tous les clients réservataires
  expect(resultat.notificationsSmsEnvoyees.map((n) => n.destinataireTelephone).sort()).toEqual(
    [clientA.telephone, clientB.telephone].sort()
  );

  // Et aucun courriel électronique n'est émis sur le serveur SMTP
  expect(resultat.notificationsEmailEnvoyees).toEqual([]);
});
