/**
 * CASE-ADMIN-040 — Respect de la contrainte d'administrateur unique : accès restreint
 * sans mécanisme de sous-comptes
 * SPEC-ADMIN-04 | Portée §3, Contrainte C-16
 */
import { it, expect } from 'vitest';
import {
  ELEMENTS_MENU_ADMIN,
  ADMINISTRATEUR_UNIQUE,
} from '../../../src/app/admin/configuration-menu-admin';

it('test_CASE_ADMIN_040_respect_contrainte_administrateur_unique_sans_sous_comptes', () => {
  // Étant donné l'administrateur connecté au back-office
  // Quand il parcourt l'ensemble des menus et paramètres de configuration

  // Alors aucun menu de création de compte ni de gestion de rôles multi-utilisateurs n'est présent
  const menusInterditsMultiComptes = ELEMENTS_MENU_ADMIN.filter((element) =>
    /compte|role|utilisateur/i.test(`${element.libelle} ${element.route}`)
  );
  expect(menusInterditsMultiComptes).toHaveLength(0);

  // Et le système fonctionne exclusivement sur la base de l'administrateur unique défini
  expect(ADMINISTRATEUR_UNIQUE).toEqual({ profilUnique: true });
});
