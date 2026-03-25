import React from "react";
import NavLayout from "@/components/NavLayout";
import ServerManager from "@/components/ServerManager";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <NavLayout activeTab="settings">
      <div className="max-w-2xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
            <Settings size={18} className="text-zinc-400" /> Einstellungen
          </h1>
          <p className="text-sm text-zinc-500">App-Konfiguration und Server-Verwaltung</p>
        </div>

        <ServerManager />
      </div>
    </NavLayout>
  );
}
