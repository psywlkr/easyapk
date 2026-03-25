import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { ThemeToggle } from "@/components/ThemeProvider";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Bitte alle Felder ausfüllen");
      setLoading(false);
      return;
    }

    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (err) {
      setError("Registrierung fehlgeschlagen. Bitte erneut versuchen.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <form noValidate onSubmit={onSubmit} className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <img src="/easyapk-logo.jpg?v=3" className="h-16 w-16 object-contain" style={{ mixBlendMode: 'screen', clipPath: 'circle(46%)', filter: 'brightness(1.1)' }} alt="EasyApk" />
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7">
          <div className="mb-6 text-center">
            <h1 className="text-lg font-bold text-white mb-1">Konto erstellen</h1>
            <p className="text-zinc-500 text-sm">Kostenloses Konto anlegen</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                E-Mail
              </label>
              <input
                required
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.de"
                className="w-full px-3 py-2.5 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                Passwort
              </label>
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2.5 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <p className="mt-1.5 text-[11px] text-zinc-600">Mindestens 8 Zeichen</p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-900/20 border border-red-800/50 px-3 py-2.5 text-xs text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold disabled:opacity-50 transition-colors"
            >
              {loading ? "Konto wird erstellt…" : "Konto erstellen"}
            </button>

            <p className="text-center text-xs text-zinc-500">
              Bereits ein Konto?{" "}
              <a
                href="/account/signin"
                className="text-zinc-300 hover:text-white font-medium transition-colors"
              >
                Anmelden
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MainComponent;
