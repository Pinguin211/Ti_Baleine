'use client';

import { useState } from 'react';
import type { CanalAlerte, CreneauCibleAlerte } from '../../../schemas/types/alerte.types';
import {
  boutonEnvoiAlerteEstActif,
  validerEnvoiAlerte,
  creneauEstSelectionnablePourAlerte,
} from '../../../schemas/validation/alerts/selection-alerte.schema';
import { soumettreEnvoiAlerteGroupee } from '../../../actions/envoyer-alerte-groupee.action';
import { Button } from '../../ui/button';
import { AlertTemplateSelector, type TemplateAlerteAffiche } from './alert-template-selector';

export interface AlertComposeModalProps {
  creneauxDisponibles: CreneauCibleAlerte[];
  templates: readonly TemplateAlerteAffiche[];
}

export function AlertComposeModal({ creneauxDisponibles, templates }: AlertComposeModalProps) {
  const [idsSelectionnes, setIdsSelectionnes] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState('');
  const [canal, setCanal] = useState<CanalAlerte>('SMS_EMAIL');
  const [envoiEnCours, setEnvoiEnCours] = useState(false);
  const [resultat, setResultat] = useState<string | null>(null);

  const toggleCreneau = (id: string) => {
    setIdsSelectionnes((precedent) => {
      const suivant = new Set(precedent);
      suivant.has(id) ? suivant.delete(id) : suivant.add(id);
      return suivant;
    });
  };

  const creneauxSelectionnes = creneauxDisponibles.filter((c) => idsSelectionnes.has(c.id));
  const validation = validerEnvoiAlerte({ creneauxSelectionnes, message });
  const boutonActif = boutonEnvoiAlerteEstActif({ creneauxSelectionnes, message }) && !envoiEnCours;

  const envoyer = async () => {
    setResultat(null);
    setEnvoiEnCours(true);
    try {
      const campagne = await soumettreEnvoiAlerteGroupee({ creneauxCibles: creneauxSelectionnes, canal, message });
      setResultat(
        `${campagne.notificationsSmsEnvoyees.length} SMS et ${campagne.notificationsEmailEnvoyees.length} e-mail(s) transmis.`
      );
      setIdsSelectionnes(new Set());
    } catch (erreur) {
      setResultat(erreur instanceof Error ? erreur.message : 'Échec de la diffusion');
    } finally {
      setEnvoiEnCours(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-marine-100 bg-white p-4 shadow-marine-sm">
        <h2 className="mb-2 font-medium text-marine-900">Créneaux du lendemain</h2>
        <ul className="flex flex-col gap-1">
          {creneauxDisponibles.map((creneau) => {
            const selectionnable = creneauEstSelectionnablePourAlerte(creneau);
            return (
              <li key={creneau.id}>
                <label className="flex items-center gap-2 text-sm text-marine-800">
                  <input
                    type="checkbox"
                    disabled={!selectionnable}
                    checked={idsSelectionnes.has(creneau.id)}
                    onChange={() => toggleCreneau(creneau.id)}
                    className="accent-lagoon-600"
                  />
                  {creneau.port} — {creneau.heureDepart} — {creneau.activite}
                  {!selectionnable && <span className="text-marine-400">(déjà sous pré-alerte)</span>}
                </label>
              </li>
            );
          })}
        </ul>
      </div>

      <AlertTemplateSelector
        templates={templates}
        onSelectTemplate={(cle) => setMessage(templates.find((t) => t.cle === cle)?.message ?? '')}
      />

      <select
        value={canal}
        onChange={(e) => setCanal(e.target.value as CanalAlerte)}
        className="w-fit rounded-lg border border-marine-200 p-2 text-sm text-marine-800 focus:border-lagoon-500 focus:outline-none"
      >
        <option value="SMS_EMAIL">SMS + E-mail</option>
        <option value="SMS">SMS uniquement</option>
        <option value="EMAIL">E-mail uniquement</option>
      </select>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={5}
        className="rounded-lg border border-marine-200 p-2 text-sm text-marine-900 placeholder:text-marine-400 focus:border-lagoon-500 focus:outline-none focus:ring-2 focus:ring-lagoon-100"
        placeholder="Message bilingue FR / EN"
      />

      {!validation.valide && message.length > 0 && (
        <p className="text-sm text-coral-600">{validation.motifErreur}</p>
      )}
      {resultat && <p className="text-sm text-marine-700">{resultat}</p>}

      <Button type="button" disabled={!boutonActif} onClick={envoyer}>
        {envoiEnCours ? 'Envoi…' : 'Envoyer la pré-alerte'}
      </Button>
    </div>
  );
}
