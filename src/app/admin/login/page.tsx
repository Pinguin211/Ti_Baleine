import { LoginForm } from '../../../components/domain/admin/login-form';

export default function PageLoginAdmin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-marine-950 to-marine-800 p-6">
      <span className="text-4xl" aria-hidden="true">
        🐋
      </span>
      <h1 className="text-xl font-semibold text-white">Ti&apos;Baleine — Administration</h1>
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-marine-lg">
        <LoginForm />
      </div>
    </main>
  );
}
