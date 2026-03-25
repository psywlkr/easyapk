import React from "react";
import NavLayout from "@/components/NavLayout";
import { api } from "@/lib/api";
import ServerManager from "@/components/ServerManager";
import {
  Users,
  Package,
  Terminal,
  ShieldAlert,
  TrendingUp,
  Activity,
  User as UserIcon,
  AlertCircle,
  Info,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => api.getAdminStats(),
  });

  if (isLoading)
    return (
      <NavLayout activeTab="admin">
        <div className="animate-pulse space-y-8 p-8">
          <div className="h-10 w-64 bg-white/5 rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white/5 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </NavLayout>
    );

  if (!stats)
    return (
      <NavLayout activeTab="admin">
        <div className="p-8 text-center text-zinc-400">
          Keine Daten verfügbar oder fehlende Berechtigung.
        </div>
      </NavLayout>
    );

  return (
    <NavLayout activeTab="admin">
      <div className="p-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-white">
          Admin <span className="text-blue-400">Control Panel</span>
        </h1>
        <p className="text-zinc-500 text-sm">
          Systemweite Metriken und Benutzerverwaltung
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Benutzer",
            value: stats.users,
            icon: Users,
            color: "text-blue-400",
          },
          {
            label: "Projekte",
            value: stats.projects,
            icon: Package,
            color: "text-purple-400",
          },
          {
            label: "Builds Gesamt",
            value: stats.builds,
            icon: Terminal,
            color: "text-blue-400",
          },
          {
            label: "System Status",
            value: "Online",
            icon: Activity,
            color: "text-green-400",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <stat.icon className={stat.color} size={24} />
              <TrendingUp size={14} className="text-green-500" />
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Server Manager */}
      <div className="mb-8">
        <ServerManager />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Build Status Breakdown */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue-400" /> Build-Verteilung
          </h3>
          <div className="space-y-4">
            {stats.buildStatusCounts?.map((row, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-grow">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="capitalize text-zinc-400 font-bold">
                      {row.status}
                    </span>
                    <span className="font-mono text-blue-400">
                      {row.count}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#d4af37] rounded-full"
                      style={{ width: `${(row.count / stats.builds) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Logs / Security */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-red-400">
            <ShieldAlert size={20} /> System Warnungen
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex gap-3">
              <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-400">
                  Keystore-Limit erreicht
                </p>
                <p className="text-[10px] text-zinc-500 mt-1">
                  3 Benutzer haben das Keystore-Limit für kostenlose Konten
                  überschritten.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex gap-3">
              <Info size={18} className="text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-400">
                  Build-Server Auslastung
                </p>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Die aktuelle Warteschlange beträgt 2 Builds. Durchschnittliche
                  Dauer: 4.2m.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </NavLayout>
  );
}
