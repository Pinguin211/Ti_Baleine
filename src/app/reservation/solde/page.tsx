import { ouvrirPagePaiementSolde } from '../../../services/server/balance-payment.service';
import { SoldePaymentForm } from '../../../components/domain/booking/solde-payment-form';

export default async function PagePaiementSolde({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) {
    return <p className="text-coral-600">Lien de paiement invalide.</p>;
  }

  let page;
  try {
    page = ouvrirPagePaiementSolde(token, new Date());
  } catch {
    return <p className="text-coral-600">Lien de paiement introuvable.</p>;
  }

  return (
    <div className="max-w-md rounded-xl border border-marine-100 bg-white p-6 shadow-marine-sm">
      <h1 className="mb-4 text-xl font-semibold text-marine-900">
        Règlement du solde — {page.referenceReservation}
      </h1>
      {page.formulaireBancaireAffiche ? (
        <SoldePaymentForm token={token} soldeRestantDu={page.soldeRestantDu} />
      ) : (
        <p className="text-marine-600">{page.messageExpiration}</p>
      )}
    </div>
  );
}
