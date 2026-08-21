export default async function PageConfirmationReservation({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <div className="max-w-md rounded-xl border border-marine-100 bg-white p-6 shadow-marine-sm">
      <h1 className="mb-4 flex items-center gap-2 text-xl font-semibold text-marine-900">
        <span aria-hidden="true">🐋</span>
        Réservation confirmée
      </h1>
      {ref ? (
        <p className="text-marine-700">
          Votre réservation <strong className="text-marine-900">{ref}</strong> est enregistrée. Un SMS vous sera
          envoyé la veille du départ pour régler le solde en ligne, ou réglez-le sur place le jour J.
        </p>
      ) : (
        <p className="text-coral-600">Référence de réservation introuvable.</p>
      )}
    </div>
  );
}
