import React, { useState } from "react";
import AppLayout from "@/components/AppLayout";
import { ShieldAlert, Rocket } from "lucide-react";

export default function SetupAdmin() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const promote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/promote-me", { method: "POST" });
      const data = await res.json();
      setStatus(data.message || data.error);
    } catch (e) {
      setStatus("Fehler beim Befördern.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout activeTab="dashboard">
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="h-20 w-20 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-8 border border-[#d4af37]/20">
          <ShieldAlert className="text-[#d4af37]" size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">
          Admin-Zugang <span className="text-[#d4af37]">aktivieren</span>
        </h1>
        <p className="text-gray-400 mb-8">
          Nutzen Sie diese Seite nur einmalig, um Ihren Account zum
          Administrator zu befördern. Löschen Sie diesen Pfad danach aus
          Sicherheitsgründen.
        </p>

        {status ? (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold mb-4">
            {status}
          </div>
        ) : (
          <button
            onClick={promote}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f1c40f] text-black font-extrabold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            <Rocket size={20} /> Jetzt Admin werden
          </button>
        )}

        <a
          href="/dashboard"
          className="block mt-6 text-sm text-gray-500 hover:text-white underline"
        >
          Zurück zum Dashboard
        </a>
      </div>
    </AppLayout>
  );
}
