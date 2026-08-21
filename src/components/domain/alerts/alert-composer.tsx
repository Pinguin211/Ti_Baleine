'use client';

/**
 * Composeur d'alerte groupée : sélection des créneaux, template bilingue,
 * canal et envoi (SPEC-ADMIN-06, SPEC-ARCH-01 : mono-composant).
 */
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { envoyerAlerte } from '../../../actions/alerte-groupee.action';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { Badge } from '../../ui/badge';

interface CreneauSelectionnable {
  id: string;
  port: string;
  heureDepart: string;
  sousPreAlerte: boolean;
}

interface TemplateAffiche {
  cle: string;
  titre: string;
  message: string;
}

export function AlertComposer({ creneaux, templates }: { creneaux: CreneauSelectionnable[]; templates: TemplateAffiche[] }) {
  const router = useRouter();
  const [selection, setSelection] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [canal, setCanal] = useState<'SMS' | 'EMAIL' | 'SMS_EMAIL'>('SMS_EMAIL');
  const [resultat, setResultat] = useState<string | null>(null);
  const [enCours, demarrer] = useTransition();

  function basculerSelection(id: string) {
    setSelection((precedent) => (precedent.includes(id) ? precedent.filter((x) => x !== id) : [...precedent, id]));
  }

  function envoyer() {
    setResultat(null);
    demarrer(async () => {
      const reponse = await envoyerAlerte(selection, canal, message);
      setResultat(reponse.succes ? `Alerte envoyée à ${reponse.creneauxTraites} créneau(x).` : (reponse.messageErreur ?? 'Échec'));
      if (reponse.succes) {
        setSelection([]);
        router.refresh();
      }
    });
  }

  const boutonActif = selection.length > 0 && message.trim().length > 0 && !enCours;

  return (
    <div className="mt-6 flex flex-col gap-4">
      <Card className="p-4">
        <p className="text-sm font-semibold text-ocean-700">Créneaux ciblés</p>
        <div className="mt-2 flex flex-col gap-2">
          {creneaux.length === 0 && <p className="text-sm text-ocean-400">Aucun créneau disponible pour demain.</p>}
          {creneaux.map((creneau) => (
            <label key={creneau.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selection.includes(creneau.id)} onChange={() => basculerSelection(creneau.id)} />
              {creneau.port} — {creneau.heureDepart}
              {creneau.sousPreAlerte && <Badge tone="orange">Déjà sous pré-alerte</Badge>}
            </label>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <p className="text-sm font-semibold text-ocean-700">Modèle</p>
        <div className="mt-2 flex gap-2">
          {templates.map((template) => (
            <Button key={template.cle} size="sm" variant="secondary" onClick={() => setMessage(template.message)}>
              {template.titre}
            </Button>
          ))}
        </div>
        <textarea
          className="mt-3 w-full rounded-lg border border-ocean-200 p-3 text-sm"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message bilingue FR + EN"
        />
        <label className="mt-3 block text-sm font-medium text-ocean-700">
          Canal
          <Select className="mt-1" value={canal} onChange={(e) => setCanal(e.target.value as typeof canal)}>
            <option value="SMS">SMS</option>
            <option value="EMAIL">E-mail</option>
            <option value="SMS_EMAIL">SMS + E-mail</option>
          </Select>
        </label>
      </Card>

      {resultat && <p className="text-sm text-ocean-700">{resultat}</p>}
      <Button disabled={!boutonActif} onClick={envoyer}>
        {enCours ? 'Envoi…' : "Envoyer l'alerte"}
      </Button>
    </div>
  );
}
