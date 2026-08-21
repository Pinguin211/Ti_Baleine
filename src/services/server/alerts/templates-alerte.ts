/**
 * Catalogue des modèles types bilingues codés en dur et fonctions de composition.
 * SPEC-ADMIN-06 | CASE-ADMIN-052 à CASE-ADMIN-055
 */

export type TypeTemplateAlerte = 'METEO_DEFAVORABLE' | 'INCIDENT_TECHNIQUE';

export interface TemplateAlerte {
  cle: TypeTemplateAlerte;
  titre: string;
  texteFr: string;
  texteEn: string;
}

export interface ZoneMessageAlerte {
  valeur: string;
  modifiable: boolean;
}

export const CATALOGUE_TEMPLATES_ALERTE: Record<TypeTemplateAlerte, TemplateAlerte> = {
  METEO_DEFAVORABLE: {
    cle: 'METEO_DEFAVORABLE',
    titre: 'Météo défavorable',
    texteFr:
      'Sortie potentiellement annulée en raison de conditions météorologiques défavorables.',
    texteEn:
      'Trip potentially cancelled due to unfavorable weather conditions.',
  },
  INCIDENT_TECHNIQUE: {
    cle: 'INCIDENT_TECHNIQUE',
    titre: 'Incident technique',
    texteFr:
      "Sortie potentiellement annulée en raison d'un incident technique sur le navire.",
    texteEn:
      'Trip potentially cancelled due to a technical issue on the vessel.',
  },
};

export function composerMessageBilingue(texteFr: string, texteEn: string): string {
  return `${texteFr}\n\n${texteEn}`;
}

export function obtenirTemplateAlerte(cle: TypeTemplateAlerte): TemplateAlerte {
  const template = CATALOGUE_TEMPLATES_ALERTE[cle];
  if (!template) {
    throw new Error(`Template d'alerte inconnu : ${cle}`);
  }
  return template;
}

export function preremplirZoneMessageAvecTemplate(
  cle: TypeTemplateAlerte
): ZoneMessageAlerte {
  const template = obtenirTemplateAlerte(cle);
  return {
    valeur: composerMessageBilingue(template.texteFr, template.texteEn),
    modifiable: true,
  };
}

export function modifierZoneMessageAlerte(
  zone: ZoneMessageAlerte,
  nouveauTexte: string
): ZoneMessageAlerte {
  return {
    ...zone,
    valeur: nouveauTexte,
  };
}
