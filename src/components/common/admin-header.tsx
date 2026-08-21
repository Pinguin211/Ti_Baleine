/**
 * En-tête back-office avec profil et déconnexion (SPEC-ARCH-01 : mono-composant).
 */
import { deconnecterAdmin } from '../../actions/authentifier-admin.action';
import { Button } from '../ui/button';

export function AdminHeader({ email }: { email: string }) {
  return (
    <header className="flex items-center justify-between border-b border-ocean-100 bg-white px-8 py-4">
      <p className="text-sm text-ocean-600">
        Connecté en tant que <span className="font-semibold text-ocean-950">{email}</span>
      </p>
      <form action={deconnecterAdmin}>
        <Button type="submit" variant="ghost" size="sm">
          Se déconnecter
        </Button>
      </form>
    </header>
  );
}
