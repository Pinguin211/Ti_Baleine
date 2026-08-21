/**
 * Validation des identifiants et soumission du formulaire de connexion back-office.
 * SPEC-ADMIN-04 | CASE-ADMIN-037
 */

export interface DonneesFormulaireConnexion {
  email: string;
  motDePasse: string;
}

export interface ResultatValidationFormulaireConnexion {
  bloque: boolean;
  erreursChamps: Record<string, string>;
}

export function traiterSoumissionFormulaireConnexion(
  donnees: DonneesFormulaireConnexion,
  callbacks?: { transmettreConnexion?: () => void }
): ResultatValidationFormulaireConnexion {
  const erreursChamps: Record<string, string> = {};

  if (!donnees.email || donnees.email.trim().length === 0) {
    erreursChamps.email = 'L’adresse e-mail est obligatoire';
  }

  if (!donnees.motDePasse || donnees.motDePasse.trim().length === 0) {
    erreursChamps.motDePasse = 'Le mot de passe est obligatoire';
  }

  const bloque = Object.keys(erreursChamps).length > 0;

  if (!bloque && callbacks?.transmettreConnexion) {
    callbacks.transmettreConnexion();
  }

  return {
    bloque,
    erreursChamps,
  };
}
