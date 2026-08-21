/**
 * CASE-ADMIN-054 — Personnalisation et ajustement libre du texte/motif par
 * l'administrateur dans le champ éditable
 * SPEC-ADMIN-06 | Scénario 1, Portée §4
 *
 * Traduction directe du gherkin de tests/cases/admin/CASE-ADMIN-054.md :
 * une assertion par ligne « Alors » ou « Et », soit deux.
 *
 * Seules l'horloge, la passerelle SMS/e-mail et la persistance du statut
 * créneau sont simulées ; la prise en compte de la personnalisation du texte
 * et sa transmission exacte sont l'objet du cas.
 */
import { expect, it } from 'vitest';
import {
  preremplirZoneMessageAvecTemplate,
  modifierZoneMessageAlerte,
} from '../../../src/services/server/alerts/templates-alerte';
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

it('test_CASE_ADMIN_054_personnalisation_ajustement_libre_texte_motif_avant_envoi', () => {
  // Étant donné un template prérempli dans la zone de texte (texte initial :
  // template générique)
  const zoneInitiale = preremplirZoneMessageAvecTemplate('METEO_DEFAVORABLE');

  // Quand l'administrateur ajoute des précisions personnalisées (ex: « Forte
  // houle australe de 3m prévue »)
  const zoneModifiee = modifierZoneMessageAlerte(
    zoneInitiale,
    `${zoneInitiale.valeur}\n\nForte houle australe de 3m prévue.`
  );

  // Alors le texte modifié est pris en compte dans sa totalité
  expect(zoneModifiee.valeur).toBe(
    `${zoneInitiale.valeur}\n\nForte houle australe de 3m prévue.`
  );

  // Et c'est exactement la version personnalisée qui est transmise aux
  // destinataires
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
  const demande: DemandeEnvoiAlerteGroupee = {
    creneauxCibles: [creneau],
    canal: 'SMS',
    message: zoneModifiee.valeur,
  };
  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms: new EnvoiSmsEnMemoire(),
    envoiEmail: new EnvoiEmailEnMemoire(),
    depotCreneau: new DepotCreneauAlerteEnMemoire([creneau]),
    journal: new JournalAlerteEnMemoire(),
    horloge: new HorlogeFixe(new Date(2026, 7, 17, 18, 0)),
  });
  expect(resultat.notificationsSmsEnvoyees[0]?.message).toBe(zoneModifiee.valeur);
});
