import { notFound } from 'next/navigation';
import { obtenirDetailCreneau } from '../../../../services/server/planning/obtenir-detail-creneau.service';
import { obtenirEtatEncaissementSoldeSurPlace } from '../../../../services/server/payment/etat-encaissement-solde-sur-place';
import { emettreFactureAcompteApresPaiement } from '../../../../actions/emettre-facture-acompte-apres-paiement';
import { emettreFactureSoldeApresPaiement } from '../../../../actions/emettre-facture-solde-apres-paiement';
import { encaisserSoldeCbSurPlace } from '../../../../actions/encaisser-solde-cb-sur-place';
import { exigerSessionAdmin } from '../../../../actions/authentifier-admin.action';
import {
  chargerDetailReservation,
  versCreneauPlanningPersiste,
  soldeRestantDu,
  depuisHeureSql,
} from '../../../../services/server/db/db-ports-planning';
import {
  versReservationFacturable,
  versPaiementAcompteValide,
  versPaiementSoldeValide,
  construirePortsFacturationDb,
} from '../../../../services/server/db/db-ports-facturation';
import {
  construireDepotReservationSoldeDb,
  construirePasserelleCbSurPlaceDb,
  construireHorlogeSlotsDb,
} from '../../../../services/server/db/db-ports-slots';
import { AdminShell } from '../../../../components/common/admin-shell';
import { Card } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { ReservationDetailActions } from '../../../../components/domain/cancellation/reservation-detail-actions';

export default async function ReservationDetailPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const session = await exigerSessionAdmin();
  const { ref } = await searchParams;
  const detailReservation = ref ? await chargerDetailReservation(ref) : undefined;
  if (!detailReservation) notFound();
  const reservation = detailReservation;
  const creneau = detailReservation.creneau;
  const reference = reservation.reference;

  const creneauAffiche = versCreneauPlanningPersiste(creneau);
  const detail = obtenirDetailCreneau({ creneau: { ...creneauAffiche, activite: creneauAffiche.activite ?? 'type non renseigné' } });
  const solde = soldeRestantDu(reservation.montant_total, reservation.paiements);
  const etatSolde = obtenirEtatEncaissementSoldeSurPlace({ statut: reservation.statut, soldeRestantDu: solde });
  const factures = reservation.paiements
    .filter((paiement) => paiement.statut_emission_facture === 'ENVOYEE_SUCCES')
    .map((paiement) => ({
      type: paiement.type_paiement === 'ACOMPTE' ? 'acompte' : 'solde',
      identifiantUnique: paiement.reference_facture,
    }));

  async function emettreFactureAcompte() {
    'use server';
    const detail2 = await chargerDetailReservation(reference);
    if (!detail2) return;
    const { ports, persister } = await construirePortsFacturationDb(detail2.id);
    const facture = emettreFactureAcompteApresPaiement(
      {
        reservation: versReservationFacturable(detail2, detail2.creneau, detail2.user, detail2.billets),
        paiement: versPaiementAcompteValide(detail2.paiements),
      },
      ports,
    );
    if (facture) await persister();
  }

  async function emettreFactureSolde() {
    'use server';
    const detail2 = await chargerDetailReservation(reference);
    if (!detail2) return;
    const { ports, persister } = await construirePortsFacturationDb(detail2.id);
    const facture = emettreFactureSoldeApresPaiement(
      {
        reservation: versReservationFacturable(detail2, detail2.creneau, detail2.user, detail2.billets),
        paiement: versPaiementSoldeValide(detail2.paiements),
        acompteRegle: Number(detail2.montant_acompte),
      },
      ports,
    );
    if (facture) await persister();
  }

  async function encaisserSolde() {
    'use server';
    const depot = await construireDepotReservationSoldeDb(reference);
    const montantDu = depot.chargerReservation(reference).soldeRestantDu;
    await encaisserSoldeCbSurPlace(
      { referenceReservation: reference, montant: montantDu },
      {
        depotReservation: depot,
        passerelleCb: construirePasserelleCbSurPlaceDb(),
        horloge: construireHorlogeSlotsDb(),
      },
    );
    await depot.persister();
    await emettreFactureSolde();
  }

  return (
    <AdminShell email={session.email}>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-ocean-950">{reservation.reference}</h1>
        <p className="mt-1 text-sm text-ocean-600">
          {reservation.user.prenom} {reservation.user.nom} — {reservation.user.email} — {reservation.user.telephone}
        </p>

        <Card className="mt-6 p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="ocean">{detail.port}</Badge>
            <Badge tone="sand">{detail.activite ?? 'type non renseigné'}</Badge>
            <Badge tone="ocean">{depuisHeureSql(creneau.heure_depart)}</Badge>
            {detail.navires.map((navire) => (
              <Badge key={navire} tone="sand">
                {navire}
              </Badge>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-ocean-500">Billets</dt>
              <dd className="font-medium text-ocean-950">{reservation.billets.length}</dd>
            </div>
            <div>
              <dt className="text-ocean-500">Montant total</dt>
              <dd className="font-medium text-ocean-950">{Number(reservation.montant_total).toFixed(2)} €</dd>
            </div>
            <div>
              <dt className="text-ocean-500">Acompte réglé</dt>
              <dd className="font-medium text-ocean-950">{Number(reservation.montant_acompte).toFixed(2)} €</dd>
            </div>
            <div>
              <dt className="text-ocean-500">Solde restant dû</dt>
              <dd className="font-medium text-ocean-950">{solde.toFixed(2)} €</dd>
            </div>
          </dl>
        </Card>

        <ReservationDetailActions
          reference={reservation.reference}
          billets={reservation.billets.map((billet) => ({ typeBillet: billet.type_billet }))}
          solde={solde}
          boutonEncaisserActif={etatSolde.boutonEncaisserActif}
          mentionStatutSolde={etatSolde.mentionStatut}
          factures={factures}
          emettreFactureAcompte={emettreFactureAcompte}
          emettreFactureSolde={emettreFactureSolde}
          encaisserSolde={encaisserSolde}
        />
      </div>
    </AdminShell>
  );
}
