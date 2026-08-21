'use server';

/**
 * Frontière Server Action pour l'envoi groupé d'alertes météo (SPEC-ADMIN-06).
 * Compose l'infrastructure réelle et délègue la décision à
 * `envoyerAlerteGroupee` (fonction pure, contrat testé CASE-ADMIN-048 à 061).
 * Fichier séparé (même raison que `connecter-administrateur.action.ts`) :
 * `'use server'` exige des exports async, incompatible avec la fonction pure.
 */

import { envoyerAlerteGroupee } from './envoyer-alerte-groupee';
import {
  chargerStatutsPreAlerte,
  creerDepotCreneauAlerteReel,
} from '../services/server/alerts/depot-creneau-alerte.service';
import { creerEnvoiSmsReel, creerEnvoiEmailReel, creerJournalAlerteReel } from '../services/server/alerts/passerelles-alerte.service';
import type { DemandeEnvoiAlerteGroupee, ResultatCampagneAlerte } from '../schemas/types/alerte.types';

export async function soumettreEnvoiAlerteGroupee(
  demande: DemandeEnvoiAlerteGroupee
): Promise<ResultatCampagneAlerte> {
  const ecrituresEnCours: Promise<unknown>[] = [];
  const statutsPreAlerte = await chargerStatutsPreAlerte(demande.creneauxCibles.map((c) => c.id));

  const resultat = envoyerAlerteGroupee(demande, {
    envoiSms: creerEnvoiSmsReel(),
    envoiEmail: creerEnvoiEmailReel(),
    depotCreneau: creerDepotCreneauAlerteReel(statutsPreAlerte, ecrituresEnCours),
    journal: creerJournalAlerteReel(),
    horloge: { maintenant: () => new Date() },
  });

  await Promise.allSettled(ecrituresEnCours);

  return resultat;
}
