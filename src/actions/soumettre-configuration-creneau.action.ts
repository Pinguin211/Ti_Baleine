'use server';

/**
 * Frontières Server Action pour la configuration des créneaux (SPEC-ADMIN-07).
 * Composent l'infrastructure réelle autour des mutations pures testées
 * (fermer/rouvrir-creneau, configurer-(activite-)creneau,
 * affecter-navires-creneau) : chargement d'un instantané synchrone,
 * délégation à la fonction pure, puis persistance des champs réellement
 * modifiés uniquement après un retour positif.
 */

import { fermerCreneau } from './fermer-creneau.action';
import { rouvrirCreneau } from './rouvrir-creneau.action';
import { configurerActiviteCreneau } from './configurer-activite-creneau.action';
import { affecterNaviresCreneau } from './affecter-navires-creneau.action';
import {
  creerDepotCreneauxDepuisInstantane,
  persisterModificationsCreneau,
} from '../services/server/slots/creneaux-config-repository.service';
import type { ActiviteCreneau } from '../schemas/types/slots.types';

export async function soumettreFermetureCreneau(creneauId: string) {
  const { depot } = await creerDepotCreneauxDepuisInstantane();
  const creneau = fermerCreneau({ creneauId }, { depotCreneaux: depot });
  await persisterModificationsCreneau(creneau);
  return creneau;
}

export async function soumettreReouvertureCreneau(creneauId: string) {
  const { depot } = await creerDepotCreneauxDepuisInstantane();
  const creneau = rouvrirCreneau({ creneauId }, { depotCreneaux: depot });
  await persisterModificationsCreneau(creneau);
  return creneau;
}

export async function soumettreConfigurationActivite(creneauId: string, activite: ActiviteCreneau) {
  const { depot } = await creerDepotCreneauxDepuisInstantane();
  const resultat = configurerActiviteCreneau({ creneauId, activite }, { depotCreneaux: depot });
  if (resultat.accepte) {
    await persisterModificationsCreneau(resultat.creneau);
  }
  return resultat;
}

export async function soumettreAffectationNavires(creneauId: string, navires: string[]) {
  const { depot } = await creerDepotCreneauxDepuisInstantane();
  const resultat = affecterNaviresCreneau({ creneauId, navires }, { depotCreneaux: depot });
  if (resultat.accepte) {
    await persisterModificationsCreneau(resultat.creneau);
  }
  return resultat;
}
