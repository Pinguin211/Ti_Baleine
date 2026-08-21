'use client';

/**
 * Tunnel de réservation publique : critères, créneau, passagers, contact et
 * paiement simulé de l'acompte (SPEC-RESERVATION-03, SPEC-ARCH-01 : mono-composant).
 */
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { obtenirCreneauxDisponibles } from '../../../actions/booking-lookup.action';
import type { CommandeBooking } from '../../../actions/booking.action';
import { calculerRecapitulatifTarifaire } from '../../../utils/pricing-rules';
import { bookingContactSchema } from '../../../schemas/validation/booking-contact.schema';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';

type Port = 'SAINT_GILLES' | 'SAINT_LEU';
type Activite = 'BALEINES' | 'DAUPHINS';
interface CreneauOption {
  heureDepart: string;
  placesRestantes?: number;
  mention?: string;
  estReservable?: boolean;
  mentionAvertissement?: string;
}

export function BookingFlow({ reserverEtFacturer }: { reserverEtFacturer: (commande: CommandeBooking) => Promise<{ reservation: { reference: string } | null; messageErreur: string | null }> }) {
  const router = useRouter();
  const [port, setPort] = useState<Port>('SAINT_GILLES');
  const [activite, setActivite] = useState<Activite>('BALEINES');
  const [date, setDate] = useState('2026-08-22');
  const [creneaux, setCreneaux] = useState<CreneauOption[] | null>(null);
  const [heureDepart, setHeureDepart] = useState<string | null>(null);
  const [adultes, setAdultes] = useState(2);
  const [enfants, setEnfants] = useState(0);
  const [contact, setContact] = useState({ nom: '', prenom: '', email: '', telephone: '+262692' });
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, demarrer] = useTransition();

  const recap = calculerRecapitulatifTarifaire(
    [...Array(adultes).fill({ typeBillet: 'ADULTE' as const }), ...Array(enfants).fill({ typeBillet: 'ENFANT' as const })],
    { port, activite },
  );

  function rechercher() {
    setErreur(null);
    setHeureDepart(null);
    demarrer(async () => setCreneaux(await obtenirCreneauxDisponibles(port, activite, new Date(`${date}T00:00:00`))));
  }

  function reserver() {
    setErreur(null);
    const validation = bookingContactSchema.safeParse(contact);
    if (!validation.success) {
      setErreur('Coordonnées invalides : nom, prénom, e-mail et mobile (+262…) requis.');
      return;
    }
    if (!heureDepart) {
      setErreur('Sélectionnez un créneau.');
      return;
    }
    demarrer(async () => {
      const commande: CommandeBooking = {
        client: contact,
        port,
        activite,
        date: new Date(`${date}T00:00:00`),
        heureDepart,
        billets: [
          ...Array(adultes).fill({ typeBillet: 'ADULTE' as const }),
          ...Array(enfants).fill({ typeBillet: 'ENFANT' as const }),
        ],
      };
      const resultat = await reserverEtFacturer(commande);
      if (!resultat.reservation) {
        setErreur(resultat.messageErreur ?? 'Paiement refusé');
        return;
      }
      router.push(`/reservation/confirmation?ref=${resultat.reservation.reference}`);
    });
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <Card className="p-6">
        <p className="text-sm font-semibold text-ocean-700">1. Port, activité et date</p>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <Select value={port} onChange={(e) => setPort(e.target.value as Port)}>
            <option value="SAINT_GILLES">Saint-Gilles</option>
            <option value="SAINT_LEU">Saint-Leu</option>
          </Select>
          <Select value={activite} onChange={(e) => setActivite(e.target.value as Activite)}>
            <option value="BALEINES">Sortie Baleines</option>
            <option value="DAUPHINS">Sortie Dauphins</option>
          </Select>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <Button className="mt-3" size="sm" variant="secondary" disabled={enCours} onClick={rechercher}>
          Voir les créneaux
        </Button>
      </Card>

      {creneaux && (
        <Card className="p-6">
          <p className="text-sm font-semibold text-ocean-700">2. Créneau</p>
          {creneaux.length === 0 && <p className="mt-2 text-sm text-ocean-400">Aucun créneau ce jour-là.</p>}
          <div className="mt-3 flex flex-wrap gap-2">
            {creneaux.map((creneau) => (
              <Button
                key={creneau.heureDepart}
                size="sm"
                variant={heureDepart === creneau.heureDepart ? 'primary' : 'secondary'}
                disabled={creneau.estReservable === false}
                onClick={() => setHeureDepart(creneau.heureDepart)}
              >
                {creneau.heureDepart} {creneau.mention ? `(${creneau.mention})` : `· ${creneau.placesRestantes} places`}
              </Button>
            ))}
          </div>
          {creneaux.some((c) => c.mentionAvertissement) && (
            <Badge tone="orange" className="mt-3">
              Créneau sous réserve météo
            </Badge>
          )}
        </Card>
      )}

      {heureDepart && (
        <>
          <Card className="p-6">
            <p className="text-sm font-semibold text-ocean-700">3. Passagers</p>
            <div className="mt-3 flex gap-6">
              <label className="text-sm">
                Adultes
                <Input type="number" min={0} value={adultes} onChange={(e) => setAdultes(Number(e.target.value))} className="mt-1 w-24" />
              </label>
              <label className="text-sm">
                Enfants (4-11 ans)
                <Input type="number" min={0} value={enfants} onChange={(e) => setEnfants(Number(e.target.value))} className="mt-1 w-24" />
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold text-ocean-700">4. Coordonnées</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Input placeholder="Nom" value={contact.nom} onChange={(e) => setContact({ ...contact, nom: e.target.value })} />
              <Input placeholder="Prénom" value={contact.prenom} onChange={(e) => setContact({ ...contact, prenom: e.target.value })} />
              <Input placeholder="E-mail" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              <Input placeholder="+262692…" value={contact.telephone} onChange={(e) => setContact({ ...contact, telephone: e.target.value })} />
            </div>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-semibold text-ocean-700">Récapitulatif</p>
            <dl className="mt-2 grid grid-cols-2 gap-1 text-sm">
              <dt className="text-ocean-500">Montant total</dt>
              <dd className="text-right">{recap.montantTotal.toFixed(2)} €</dd>
              <dt className="text-ocean-500">Acompte à régler maintenant</dt>
              <dd className="text-right font-semibold">{recap.montantAcompte.toFixed(2)} €</dd>
              <dt className="text-ocean-500">Solde restant dû</dt>
              <dd className="text-right">{recap.soldeRestantDu.toFixed(2)} €</dd>
            </dl>
            {erreur && <p className="mt-3 text-sm text-coral-600">{erreur}</p>}
            <Button className="mt-4 w-full" disabled={enCours} onClick={reserver}>
              {enCours ? 'Paiement…' : `Payer l'acompte (simulation) — ${recap.montantAcompte.toFixed(2)} €`}
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
