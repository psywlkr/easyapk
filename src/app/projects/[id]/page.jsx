import React, { useState } from "react";
import NavLayout from "@/components/NavLayout";
import { api } from "@/lib/api";
import {
  ArrowLeft, Terminal, Download, RefreshCcw, ExternalLink,
  ShieldCheck, CheckCircle2, AlertCircle, Clock, Settings,
  Play, Package, History, Palette, BookOpen, Trash2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function formatBytes(kb) {
  if (!kb) return null;
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return "gerade eben";
  if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`;
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
  return `vor ${Math.floor(diff / 86400)} Tagen`;
}

const STATUS = {
  completed: { icon: CheckCircle2, label: "Erfolgreich", color: "text-emerald-400", bg: "bg-emerald-900/20", border: "border-emerald-800", dot: "bg-emerald-500" },
  failed:    { icon: AlertCircle,  label: "Fehlgeschlagen", color: "text-red-400",   bg: "bg-red-900/20",   border: "border-red-800",   dot: "bg-red-500" },
  processing:{ icon: RefreshCcw,  label: "Wird gebaut…",  color: "text-blue-400",  bg: "bg-blue-900/20",  border: "border-blue-800",  dot: "bg-blue-500", spin: true },
  pending:   { icon: Clock,        label: "Warteschlange", color: "text-zinc-400",  bg: "bg-zinc-800/50",  border: "border-zinc-700",  dot: "bg-zinc-500" },
};

function StatusBadge({ status, small }) {
  const s = STATUS[status] || STATUS.pending;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${s.color} ${s.bg} ${s.border}`}>
      <Icon size={small ? 11 : 13} className={s.spin ? "animate-spin" : ""} />
      {s.label}
    </span>
  );
}

export default function ProjectDetails({ params }) {
  const { id } = params;
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("build");

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.getProject(id),
  });

  const { data: builds = [] } = useQuery({
    queryKey: ["builds", id],
    queryFn: () => api.getBuilds(id).catch(() => []),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data === undefined) return 2000;
      const latest = data[0];
      return latest?.status === "processing" || latest?.status === "pending" ? 2000 : false;
    },
    refetchIntervalInBackground: true,
  });

  const latestBuild = builds[0] || null;
  const nativeFeatures =
    typeof project?.native_features === "string"
      ? JSON.parse(project.native_features)
      : project?.native_features || {};

  const startBuildMutation = useMutation({
    mutationFn: () => api.createBuild({ project_id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["builds", id] });
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: () => api.deleteProject(id),
    onSuccess: () => { window.location.href = "/dashboard"; },
  });

  const isBuilding = latestBuild?.status === "processing" || latestBuild?.status === "pending" || startBuildMutation.isPending;

  if (projectLoading) {
    return (
      <NavLayout activeTab="dashboard">
        <div className="p-8 max-w-6xl mx-auto space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-zinc-800 rounded-lg" />
          <div className="h-32 w-full bg-zinc-900 rounded-2xl" />
          <div className="h-64 w-full bg-zinc-900 rounded-2xl" />
        </div>
      </NavLayout>
    );
  }

  if (!project) {
    return (
      <NavLayout activeTab="dashboard">
        <div className="p-8 text-center text-zinc-500">Projekt nicht gefunden.</div>
      </NavLayout>
    );
  }

  return (
    <NavLayout activeTab="dashboard">
      <div className="max-w-6xl mx-auto p-8">
        <a href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors text-sm">
          <ArrowLeft size={16} /> Dashboard
        </a>

        {/* Project Header */}
        <div className="flex items-start gap-5 p-6 rounded-2xl border border-zinc-800 bg-zinc-900 mb-6">
          <div className="h-16 w-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl font-bold text-blue-500 overflow-hidden shrink-0">
            {project.icon_url
              ? <img src={project.icon_url} className="h-full w-full object-cover" alt={project.name} />
              : <span>{project.name?.charAt(0)}</span>}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-white">{project.name}</h1>
              {latestBuild && <StatusBadge status={latestBuild.status} />}
            </div>
            <p className="text-sm text-zinc-500 font-mono mb-2">{project.package_name}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
              <a href={project.pwa_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-400 hover:underline">
                <ExternalLink size={12} /> {project.pwa_url}
              </a>
              <span className="uppercase font-semibold bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-zinc-400">
                {project.build_type}
              </span>
              <span>v{project.version || "1.0.0"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => startBuildMutation.mutate()}
              disabled={isBuilding}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center gap-2 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <RefreshCcw size={16} className={isBuilding ? "animate-spin" : ""} />
              {isBuilding ? "Baut…" : "Neu bauen"}
            </button>
            <button
              onClick={() => { if (window.confirm(`Projekt "${project.name}" wirklich löschen?`)) deleteProjectMutation.mutate(); }}
              disabled={deleteProjectMutation.isPending}
              title="Projekt löschen"
              className="p-2.5 rounded-xl border border-zinc-700 text-zinc-500 hover:text-red-400 hover:border-red-800 hover:bg-red-900/20 disabled:opacity-50 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 border border-zinc-800">
              {[{ id: "build", label: "Build", icon: Terminal }, { id: "history", label: "Verlauf", icon: History }].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                >
                  <tab.icon size={15} />{tab.label}
                </button>
              ))}
            </div>

            {/* Build Tab */}
            {activeTab === "build" && (
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
                {latestBuild ? (
                  <>
                    <div className={`flex items-center justify-between px-6 py-4 border-b ${STATUS[latestBuild.status]?.bg || "bg-zinc-800/50"} ${STATUS[latestBuild.status]?.border || "border-zinc-700"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`h-2.5 w-2.5 rounded-full ${STATUS[latestBuild.status]?.dot || "bg-zinc-500"} ${latestBuild.status === "processing" || latestBuild.status === "pending" ? "animate-pulse" : ""}`} />
                        <span className={`font-semibold text-sm ${STATUS[latestBuild.status]?.color || ""}`}>
                          {STATUS[latestBuild.status]?.label || "Unbekannt"}
                        </span>
                        <span className="text-xs text-zinc-600">{timeAgo(latestBuild.created_at)}</span>
                      </div>
                      {latestBuild.status === "completed" && (
                        <a href={latestBuild.apk_url} download className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all">
                          <Download size={13} /> APK herunterladen
                        </a>
                      )}
                      {latestBuild.status === "failed" && (
                        <button onClick={() => startBuildMutation.mutate()} className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all">
                          <RefreshCcw size={13} /> Erneut versuchen
                        </button>
                      )}
                    </div>

                    {latestBuild.status === "completed" && (
                      <div className="mx-6 mt-6 p-5 rounded-xl border border-blue-800 bg-blue-900/20">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                              <Package size={24} className="text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-white">{project.package_name}-release.apk</p>
                              <p className="text-xs text-zinc-500 mt-0.5">Android APK • Signiert • {timeAgo(latestBuild.created_at)}</p>
                            </div>
                          </div>
                          <a href={latestBuild.apk_url} download className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap">
                            <Download size={16} /> Download
                          </a>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-800 grid grid-cols-3 gap-3 text-xs text-center">
                          {[["Format", "APK"], ["Min. Android", "5.0+"], ["Build-ID", `#${latestBuild.id}`]].map(([l, v]) => (
                            <div key={l}>
                              <p className="text-zinc-500">{l}</p>
                              <p className="font-semibold text-zinc-300 mt-0.5 font-mono">{v}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Build-Logs</p>
                      <div className="bg-black rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-y-auto max-h-72 border border-zinc-800">
                        {latestBuild.log_text?.split("\n").map((line, i) => (
                          <div key={i} className="leading-6">{line || "\u00A0"}</div>
                        ))}
                        {(latestBuild.status === "processing" || latestBuild.status === "pending") && (
                          <span className="animate-pulse text-blue-400">▊</span>
                        )}
                        {latestBuild.error_message && (
                          <div className="mt-3 p-3 rounded-lg bg-red-900/30 text-red-400 border border-red-800">
                            ✗ {latestBuild.error_message}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                    <div className="h-14 w-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
                      <Terminal size={26} className="text-zinc-500" />
                    </div>
                    <p className="font-semibold text-zinc-300 mb-1">Noch kein Build</p>
                    <p className="text-sm text-zinc-500 mb-6">Starte den ersten Build, um deine APK zu generieren.</p>
                    <button
                      onClick={() => startBuildMutation.mutate()}
                      disabled={startBuildMutation.isPending}
                      className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition-all"
                    >
                      <Play size={16} /> Build starten
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-zinc-800">
                  <h3 className="font-semibold text-white flex items-center gap-2"><History size={16} /> Build-Verlauf</h3>
                </div>
                {builds.length === 0 ? (
                  <p className="text-sm text-zinc-500 text-center py-12">Noch keine Builds vorhanden.</p>
                ) : (
                  <div className="divide-y divide-zinc-800">
                    {builds.map((build, i) => (
                      <div key={build.id} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/50 transition-colors">
                        <div className={`h-2.5 w-2.5 rounded-full shrink-0 ${STATUS[build.status]?.dot || "bg-zinc-500"}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-white">Build #{build.id}</span>
                            {i === 0 && <span className="text-[10px] bg-blue-900/40 text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-800">Neuester</span>}
                            <StatusBadge status={build.status} small />
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">{timeAgo(build.created_at)}</p>
                        </div>
                        {build.status === "completed" && (
                          <a href={build.apk_url} download className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold border border-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-900/20 transition-all">
                            <Download size={12} /> APK
                          </a>
                        )}
                        {build.status === "failed" && (
                          <span className="text-xs text-red-400 truncate max-w-[140px]" title={build.error_message}>
                            {build.error_message?.slice(0, 40)}…
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
              <h4 className="font-semibold text-white mb-4 flex items-center gap-2 text-sm"><Settings size={15} /> Konfiguration</h4>
              <div className="space-y-3 text-xs">
                {[["Version", project.version || "1.0.0"], ["Build-Typ", project.build_type?.toUpperCase()], ["Display", nativeFeatures.display || "standalone"], ["Ausrichtung", nativeFeatures.orientation || "any"]].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-zinc-500">{label}</span>
                    <span className="font-mono text-white font-semibold">{val}</span>
                  </div>
                ))}
                {nativeFeatures.theme_color && (
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 flex items-center gap-1"><Palette size={11} /> Theme</span>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-zinc-700" style={{ backgroundColor: nativeFeatures.theme_color }} />
                      <span className="font-mono text-white">{nativeFeatures.theme_color}</span>
                    </div>
                  </div>
                )}
                {(() => {
                  const active = ["push", "camera", "location", "biometrics"].filter((k) => nativeFeatures[k] === true);
                  if (!active.length) return null;
                  return (
                    <div>
                      <p className="text-zinc-500 mb-1.5">Native Features</p>
                      <div className="flex flex-wrap gap-1.5">
                        {active.map((k) => <span key={k} className="px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 text-[10px] font-bold uppercase border border-blue-800">{k}</span>)}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm"><ShieldCheck size={15} className="text-blue-400" /> Keystore</h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-3">Debug-Keystore automatisch generiert. Für Play-Store eigenen Keystore hochladen.</p>
              <button className="w-full py-2 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-semibold hover:bg-zinc-800 transition-all">
                Eigenen Keystore hochladen
              </button>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
              <h4 className="font-semibold text-white mb-3 flex items-center gap-2 text-sm"><BookOpen size={15} /> Installation</h4>
              <ol className="space-y-2.5 text-xs text-zinc-500">
                {["APK auf Android-Gerät übertragen", '"Unbekannte Quellen" in Einstellungen aktivieren', "APK-Datei öffnen und installieren", "App starten und testen"].map((step, i) => (
                  <li key={i} className="flex gap-2.5">
                    <span className="h-4 w-4 rounded-full bg-blue-900/30 text-blue-400 border border-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-4 pt-4 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-600 mb-2 font-semibold uppercase tracking-wider">Hilfe</p>
                <ul className="space-y-1.5">
                  {["Im Play Store veröffentlichen", "Push-Benachrichtigungen einrichten", "Asset Links (TWA) validieren"].map((item) => (
                    <li key={item} className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer flex items-center gap-1">
                      <span>→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLayout>
  );
}
