import React from "react";
import NavLayout from "@/components/NavLayout";
import {
  Plus,
  Package,
  ExternalLink,
  Play,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

function safeHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url || "";
  }
}

const STATUS_LABEL = {
  completed: "Erfolgreich",
  failed: "Fehlgeschlagen",
  processing: "Wird gebaut",
  pending: "Warteschlange",
};

export default function Dashboard() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.getProjects(),
  });

  const getStatusDot = (status) => {
    switch (status) {
      case "completed":
        return <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />;
      case "failed":
        return <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />;
      case "processing":
        return <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block animate-pulse" />;
      default:
        return <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block" />;
    }
  };

  return (
    <NavLayout activeTab="dashboard">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-white mb-1">Dashboard</h1>
            <p className="text-sm text-zinc-500">Deine Android-App-Projekte</p>
          </div>
          <a
            href="/projects/new"
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            <Plus size={15} /> Neues Projekt
          </a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-44 rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse"
              />
            ))}
          </div>
        ) : projects?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-zinc-900 rounded-xl border border-zinc-800 border-dashed">
            <div className="h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4">
              <Package size={24} className="text-zinc-500" />
            </div>
            <h3 className="text-sm font-medium text-white mb-1">Noch keine Projekte</h3>
            <p className="text-xs text-zinc-500 mb-6">
              Erstelle dein erstes Projekt, um eine APK zu generieren
            </p>
            <a
              href="/projects/new"
              className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              <Plus size={13} /> Projekt erstellen
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects?.map((project) => (
              <a
                key={project.id}
                href={`/projects/${project.id}`}
                className="group p-5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-10 w-10 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                    {project.icon_url ? (
                      <img
                        src={project.icon_url}
                        alt={project.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-blue-400 font-semibold text-sm">
                        {project.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    {getStatusDot(project.last_build_status)}
                    {STATUS_LABEL[project.last_build_status] || "Kein Build"}
                  </div>
                </div>

                <h3 className="text-sm font-medium text-white mb-0.5 group-hover:text-blue-300 transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-zinc-600 mb-4 font-mono truncate">
                  {project.package_name}
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
                  <div className="flex items-center gap-1 text-[11px] text-zinc-600">
                    <ExternalLink size={11} />
                    {safeHostname(project.pwa_url)}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-zinc-600 ml-auto uppercase tracking-wide">
                    <Play size={10} /> {project.build_type}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </NavLayout>
  );
}
