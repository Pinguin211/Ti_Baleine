'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '../../../utils/cn.util';
import type { CreneauDisponible, Port, Activite } from '../../../schemas/types/booking.types';
import type { ContactClient } from '../../../schemas/validation/booking-contact.schema';
import { calculerRecapitulatifTarifaire } from '../../../utils/pricing-rules';
import { PORT_LABELS, ACTIVITE_LABELS } from '../../../utils/slot-rules';
import { obtenirCreneauxDisponibles } from '../../../actions/obtenir-creneaux-disponibles.action';
import { soumettreReservation } from '../../../actions/soumettre-reservation.action';
import { BookingCalendar } from './booking-calendar';
import { SlotPicker } from './slot-picker';
import { PassengerCounter } from './passenger-counter';
import { BookingContactForm } from './booking-contact-form';
import { BookingPriceSummary } from './booking-price-summary';
import { Button } from '../../ui/button';

const PORTS_PROPOSES: Port[] = ['SAINT_GILLES', 'SAINT_LEU'];
const ACTIVITES_PROPOSEES: Activite[] = ['BALEINES', 'DAUPHINS'];

export function BookingWizard() {
  const router = useRouter();
  const [port, setPort] = useState<Port>('SAINT_GILLES');
  const [activite, setActivite] = useState<Activite>('BALEINES');
  const [date, setDate] = useState('');
  const [creneaux, setCreneaux] = useState<CreneauDisponible[]>([]);
  const [heureDepart, setHeureDepart] = useState<string | null>(null);
  const [adultes, setAdultes] = useState(2);
  const [enfants, setEnfants] = useState(0);
  const [etape, setEtape] = useState<'creneau' | 'contact'>('creneau');
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    setHeureDepart(null);
    if (!date) {
      setCreneaux([]);
      return;
    }
    obtenirCreneauxDisponibles(port, new Date(`${date}T00:00:00`)).then(setCreneaux);
  }, [port, date]);

  const recapitulatif = calculerRecapitulatifTarifaire(
    [...Array(adultes).fill({ typeBillet: 'ADULTE' as const }), ...Array(enfants).fill({ typeBillet: 'ENFANT' as const })],
    { port, activite }
  );

  const changerPassagers = (v: { adultes: number; enfants: number }) => {
    setAdultes(v.adultes);
    setEnfants(v.enfants);
  };

  const confirmerContact = async (contact: ContactClient) => {
    if (!heureDepart) return;
    setEnCours(true);
    setErreur(null);
    const resultat = await soumettreReservation({
      client: { ...contact, role: 'CLIENT', motDePasse: null },
      creneau: { port, activite, date: new Date(`${date}T00:00:00`), heureDepart },
      billets: [
        ...Array(adultes).fill({ typeBillet: 'ADULTE' as const }),
        ...Array(enfants).fill({ typeBillet: 'ENFANT' as const }),
      ],
    });
    setEnCours(false);
    if (resultat.reservation) {
      router.push(`/reservation/confirmation?ref=${resultat.reservation.reference}`);
    } else {
      setErreur(resultat.messageErreur ?? 'Échec de la réservation');
    }
  };

  if (etape === 'contact') {
    return (
      <div className="flex max-w-md flex-col gap-4 rounded-xl border border-marine-100 bg-white p-5 shadow-marine-sm">
        <BookingPriceSummary recapitulatif={recapitulatif} adultes={adultes} enfants={enfants} />
        <BookingContactForm onSubmit={confirmerContact} />
        {enCours && <p className="text-sm text-marine-500">Traitement du paiement…</p>}
        {erreur && <p className="text-sm text-coral-600">{erreur}</p>}
      </div>
    );
  }

  return (
    <div className="flex max-w-md flex-col gap-4 rounded-xl border border-marine-100 bg-white p-5 shadow-marine-sm">
      <div className="flex gap-2">
        {PORTS_PROPOSES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPort(p)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm transition-colors',
              port === p
                ? 'bg-gradient-to-r from-marine-800 to-lagoon-600 text-white shadow-marine-sm'
                : 'border border-marine-200 bg-white text-marine-700 hover:bg-marine-50'
            )}
          >
            {PORT_LABELS[p]}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {ACTIVITES_PROPOSEES.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setActivite(a)}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm transition-colors',
              activite === a
                ? 'bg-gradient-to-r from-marine-800 to-lagoon-600 text-white shadow-marine-sm'
                : 'border border-marine-200 bg-white text-marine-700 hover:bg-marine-50'
            )}
          >
            {ACTIVITE_LABELS[a]}
          </button>
        ))}
      </div>
      <BookingCalendar port={port} dateSelectionnee={date} onSelectDate={setDate} />
      {date && <SlotPicker creneaux={creneaux} heureSelectionnee={heureDepart} onSelect={setHeureDepart} />}
      <PassengerCounter adultes={adultes} enfants={enfants} onChange={changerPassagers} />
      <BookingPriceSummary recapitulatif={recapitulatif} adultes={adultes} enfants={enfants} />
      <Button type="button" disabled={!heureDepart} onClick={() => setEtape('contact')}>
        Continuer
      </Button>
    </div>
  );
}
