import React, { useState } from "react";
import NavLayout from "@/components/NavLayout";
import { api } from "@/lib/api";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Rocket,
  Smartphone,
  Monitor,
  RefreshCcw,
  Palette,
  RotateCcw,
  BellRing,
  MapPin,
  Fingerprint,
  Camera,
  Zap,
} from "lucide-react";

export default function NewProject() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    pwa_url: "",
    package_name: "com.example.pwa",
    version: "1.0.0",
    build_type: "twa",
    icon_url: "",
    splash_url: "",
    native_features: {
      push: false,
      camera: false,
      location: false,
      biometrics: false,
      theme_color: "#2563eb",
      background_color: "#000000",
      orientation: "any",
      display: "standalone",
    },
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [manifestData, setManifestData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (key, val) => setFormData((f) => ({ ...f, [key]: val }));
  const updateFeature = (key, val) =>
    setFormData((f) => ({ ...f, native_features: { ...f.native_features, [key]: val } }));

  const validatePWA = async () => {
    setIsValidating(true);
    try {
      const data = await api.validatePwa(formData.pwa_url);
      setValidationResult(data);
      if (data.valid && data.manifest) {
        const m = data.manifest;
        setManifestData(m);
        setFormData((f) => ({
          ...f,
          name: f.name || m.name || "",
          icon_url: f.icon_url || m.bestIconUrl || "",
          native_features: {
            ...f.native_features,
            theme_color: m.theme_color || f.native_features.theme_color,
            background_color: m.background_color || f.native_features.background_color,
            orientation: m.orientation !== "any" ? m.orientation : f.native_features.orientation,
            display: m.display || f.native_features.display,
          },
        }));
        setTimeout(() => setStep(2), 800);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const project = await api.createProject(formData);
      await api.createBuild({ project_id: project.id });
      window.location.href = `/projects/${project.id}`;
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["URL validieren", "App konfigurieren", "Features & Build"];

  const inputClass =
    "w-full border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm bg-zinc-800/50 text-white placeholder:text-zinc-600";

  return (
    <NavLayout activeTab="new">
      <div className="max-w-3xl mx-auto p-8">
        <a href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm">
          <ArrowLeft size={16} /> Dashboard
        </a>

        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white mb-6">Neues Projekt anlegen</h1>

          {/* Progress Steps */}
          <div className="flex items-center">
            {stepLabels.map((label, i) => {
              const idx = i + 1;
              const done = step > idx;
              const active = step === idx;
              return (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${done ? "bg-emerald-500 text-white" : active ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-500"}`}>
                      {done ? <CheckCircle2 size={16} /> : idx}
                    </div>
                    <span className={`text-sm font-medium hidden sm:block whitespace-nowrap ${active ? "text-white" : "text-zinc-600"}`}>
                      {label}
                    </span>
                  </div>
                  {i < 2 && <div className={`flex-1 h-0.5 mx-3 ${step > idx ? "bg-emerald-500" : "bg-zinc-800"}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
          {/* ── Step 1 ── */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">PWA-URL eingeben</h2>
                <p className="text-sm text-zinc-500">Gib die öffentlich erreichbare HTTPS-URL deiner Progressive Web App ein.</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">PWA URL</label>
                <div className="flex gap-3">
                  <div className="flex-1 flex items-center gap-3 border border-zinc-700 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all bg-zinc-800/50">
                    <Globe size={18} className="text-zinc-600 shrink-0" />
                    <input
                      type="url"
                      placeholder="https://meine-pwa.de"
                      value={formData.pwa_url}
                      onChange={(e) => update("pwa_url", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && formData.pwa_url && validatePWA()}
                      className="flex-1 outline-none text-white placeholder:text-zinc-600 bg-transparent text-sm"
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={validatePWA}
                    disabled={isValidating || !formData.pwa_url}
                    className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    {isValidating ? <RefreshCcw size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    {isValidating ? "Prüft…" : "Validieren"}
                  </button>
                </div>
              </div>

              {validationResult && (
                <div className={`p-4 rounded-xl border ${validationResult.valid ? "bg-emerald-900/20 border-emerald-800" : "bg-red-900/20 border-red-800"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    {validationResult.valid ? <CheckCircle2 size={16} className="text-emerald-400" /> : <AlertTriangle size={16} className="text-red-400" />}
                    <span className={`font-semibold text-sm ${validationResult.valid ? "text-emerald-400" : "text-red-400"}`}>
                      {validationResult.valid ? "PWA validiert – wird weitergeleitet…" : "Validierung fehlgeschlagen"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.entries(validationResult.checks || {}).map(([key, ok]) => (
                      <div key={key} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg ${ok ? "bg-emerald-900/30 text-emerald-400" : "bg-red-900/30 text-red-400"}`}>
                        {ok ? <CheckCircle2 size={11} /> : <AlertTriangle size={11} />}
                        {key === "https" ? "HTTPS" : key === "manifest" ? "Manifest" : key === "serviceWorker" ? "Service Worker" : key === "installability" ? "Installierbar" : "Icons"}
                      </div>
                    ))}
                  </div>
                  {validationResult.error && <p className="text-xs text-red-400 mt-2">{validationResult.error}</p>}
                  {!validationResult.valid && validationResult.checks?.https && (
                    <div className="mt-3 pt-3 border-t border-red-800">
                      <p className="text-xs text-zinc-400 mb-2">URL ist erreichbar. Du kannst trotzdem als WebView-App fortfahren.</p>
                      <button
                        onClick={() => { update("build_type", "webview"); update("name", formData.name || new URL(formData.pwa_url).hostname); setStep(2); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-xs font-semibold hover:bg-orange-500 transition-colors"
                      >
                        <Smartphone size={13} /> Als WebView-App fortfahren
                      </button>
                    </div>
                  )}
                  {validationResult.valid && manifestData && (
                    <div className="mt-3 pt-3 border-t border-emerald-800 flex items-center gap-3">
                      {manifestData.bestIconUrl && (
                        <img src={manifestData.bestIconUrl} alt="Icon" className="h-10 w-10 rounded-xl object-cover border border-emerald-700 shrink-0" onError={(e) => (e.target.style.display = "none")} />
                      )}
                      <div>
                        <p className="font-semibold text-emerald-400 text-sm">{manifestData.name || "App erkannt"}</p>
                        {manifestData.description && <p className="text-xs text-emerald-600 line-clamp-1">{manifestData.description}</p>}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <h4 className="text-sm font-semibold text-zinc-300 mb-2.5">Anforderungen</h4>
                <ul className="space-y-1.5 text-xs text-zinc-500">
                  {["HTTPS-URL (kein HTTP oder localhost)", "Web App Manifest (manifest.json) verknüpft", "Mindestens ein App-Icon (192×192 oder 512×512)", "Öffentlich erreichbar (kein VPN/Intranet)"].map((req) => (
                    <li key={req} className="flex items-center gap-2"><CheckCircle2 size={11} className="text-blue-500 shrink-0" />{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">App konfigurieren</h2>
                <p className="text-sm text-zinc-500">{manifestData ? "Daten wurden aus dem Manifest übernommen." : "Konfiguriere deine Android-App."}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-400">App-Name *</label>
                  <input type="text" placeholder="Meine App" value={formData.name} onChange={(e) => update("name", e.target.value)} className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-400">Package-Name *</label>
                  <input type="text" placeholder="com.firma.app" value={formData.package_name} onChange={(e) => update("package_name", e.target.value)} className={inputClass + " font-mono"} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-400">Version</label>
                  <input type="text" placeholder="1.0.0" value={formData.version} onChange={(e) => update("version", e.target.value)} className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-400">Display-Modus</label>
                  <select value={formData.native_features.display} onChange={(e) => updateFeature("display", e.target.value)} className={inputClass}>
                    <option value="standalone">Standalone (empfohlen)</option>
                    <option value="fullscreen">Vollbild</option>
                    <option value="minimal-ui">Minimal UI</option>
                    <option value="browser">Browser-Tab</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400">App-Icon URL</label>
                <div className="flex gap-3 items-center">
                  <div className="flex-1 flex items-center gap-3 border border-zinc-700 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all bg-zinc-800/50">
                    <ImageIcon size={16} className="text-zinc-600 shrink-0" />
                    <input type="url" placeholder="https://meine-pwa.de/icon-512.png" value={formData.icon_url} onChange={(e) => update("icon_url", e.target.value)} className="flex-1 outline-none text-sm text-white placeholder:text-zinc-600 bg-transparent" />
                  </div>
                  {formData.icon_url ? (
                    <img src={formData.icon_url} alt="Icon" className="h-12 w-12 rounded-xl border border-zinc-700 object-cover shrink-0" onError={(e) => (e.target.style.display = "none")} />
                  ) : (
                    <div className="h-12 w-12 rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center shrink-0">
                      <Smartphone size={18} className="text-zinc-600" />
                    </div>
                  )}
                </div>
                {manifestData?.icons?.length > 1 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs text-zinc-500 self-center">Aus Manifest:</span>
                    {manifestData.icons.slice(0, 6).map((icon, i) => (
                      <button key={i} onClick={() => update("icon_url", icon.src)} title={icon.sizes || ""} className={`p-0.5 rounded-lg border-2 transition-all ${formData.icon_url === icon.src ? "border-blue-500" : "border-zinc-700 hover:border-zinc-500"}`}>
                        <img src={icon.src} alt="" className="h-8 w-8 rounded object-cover" onError={(e) => (e.target.style.display = "none")} />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[["theme_color", "Theme-Farbe"], ["background_color", "Hintergrundfarbe"]].map(([key, label]) => (
                  <div key={key} className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-400 flex items-center gap-1.5"><Palette size={13} />{label}</label>
                    <div className="flex gap-2 items-center border border-zinc-700 rounded-xl px-3 py-2 bg-zinc-800/50 focus-within:border-blue-500 transition-all">
                      <input type="color" value={formData.native_features[key]} onChange={(e) => updateFeature(key, e.target.value)} className="h-8 w-8 rounded cursor-pointer border-0 bg-transparent p-0" />
                      <input type="text" value={formData.native_features[key]} onChange={(e) => updateFeature(key, e.target.value)} className="flex-1 outline-none text-sm font-mono text-zinc-300 bg-transparent" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-1.5"><RotateCcw size={13} />Bildschirmausrichtung</label>
                <div className="grid grid-cols-3 gap-3">
                  {[{ value: "any", label: "Automatisch", icon: Monitor }, { value: "portrait", label: "Hochformat", icon: Smartphone }, { value: "landscape", label: "Querformat", icon: Monitor }].map((opt) => (
                    <button key={opt.value} onClick={() => updateFeature("orientation", opt.value)} className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${formData.native_features.orientation === opt.value ? "border-blue-500 bg-blue-600/10 text-blue-400" : "border-zinc-700 hover:border-zinc-600 text-zinc-500"}`}>
                      <opt.icon size={20} />{opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-all text-sm font-semibold text-zinc-300">Zurück</button>
                <button onClick={() => setStep(3)} disabled={!formData.name || !formData.package_name} className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  Features & Build <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3 ── */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Build-Typ & Native Features</h2>
                <p className="text-sm text-zinc-500">Wähle die Integrationsmethode und aktiviere optionale native Funktionen.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Build-Typ</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "twa", title: "Trusted Web Activity", desc: "Beste Performance & Play-Store-Optimierung", icon: Zap, recommended: true },
                    { id: "webview", title: "Standard WebView", desc: "Maximale Kontrolle & Kompatibilität", icon: Globe },
                    { id: "hybrid", title: "Hybrid Native", desc: "Native Bridge für erweiterte APIs", icon: Smartphone },
                  ].map((type) => (
                    <button key={type.id} onClick={() => update("build_type", type.id)} className={`relative p-4 rounded-xl border text-left transition-all ${formData.build_type === type.id ? "border-blue-500 bg-blue-600/10" : "border-zinc-700 hover:border-zinc-600"}`}>
                      {type.recommended && <span className="absolute top-2 right-2 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">Empfohlen</span>}
                      <type.icon size={18} className={`mb-2 ${formData.build_type === type.id ? "text-blue-400" : "text-zinc-500"}`} />
                      <p className={`font-semibold text-sm mb-1 ${formData.build_type === type.id ? "text-white" : "text-zinc-300"}`}>{type.title}</p>
                      <p className="text-[11px] text-zinc-500 leading-relaxed">{type.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Native Features <span className="text-zinc-600 font-normal">(optional)</span></label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "push", label: "Push-Benachrichtigungen", icon: BellRing, desc: "FCM-Benachrichtigungen" },
                    { id: "camera", label: "Kamera & Galerie", icon: Camera, desc: "Foto- und Videozugriff" },
                    { id: "location", label: "Geolocation", icon: MapPin, desc: "Echtzeit-Standortzugriff" },
                    { id: "biometrics", label: "Biometrie", icon: Fingerprint, desc: "Fingerabdruck & Face-ID" },
                  ].map((f) => (
                    <button key={f.id} onClick={() => updateFeature(f.id, !formData.native_features[f.id])} className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${formData.native_features[f.id] ? "border-blue-500 bg-blue-600/10" : "border-zinc-700 hover:border-zinc-600"}`}>
                      <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${formData.native_features[f.id] ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-500"}`}>
                        <f.icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white">{f.label}</p>
                        <p className="text-[10px] text-zinc-500">{f.desc}</p>
                      </div>
                      {formData.native_features[f.id] && <CheckCircle2 size={15} className="ml-auto text-blue-500 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-800/50 rounded-xl p-4 border border-zinc-700">
                <h4 className="text-sm font-semibold text-zinc-300 mb-3">Build-Zusammenfassung</h4>
                <div className="space-y-2 text-xs">
                  {[["App-Name", formData.name], ["Package", formData.package_name], ["Version", formData.version], ["URL", formData.pwa_url], ["Build-Typ", formData.build_type.toUpperCase()], ["Display", formData.native_features.display], ["Ausrichtung", formData.native_features.orientation]].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-zinc-500 shrink-0">{label}</span>
                      <span className="font-mono text-white truncate text-right">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-zinc-500 shrink-0">Theme</span>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-zinc-600 shrink-0" style={{ backgroundColor: formData.native_features.theme_color }} />
                      <span className="font-mono text-white">{formData.native_features.theme_color}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-all text-sm font-semibold text-zinc-300">Zurück</button>
                <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-500 disabled:opacity-60 transition-all">
                  {isSubmitting ? <RefreshCcw size={18} className="animate-spin" /> : <Rocket size={18} />}
                  {isSubmitting ? "Projekt wird erstellt…" : "Projekt erstellen & Build starten"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </NavLayout>
  );
}
