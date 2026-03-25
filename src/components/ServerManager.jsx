import React, { useState, useEffect } from "react";
import {
  Server, CheckCircle2, AlertCircle, RefreshCcw,
  Globe, Edit3, Zap, Save,
} from "lucide-react";
import {
  PRESET_BACKENDS,
  getBackendConfig,
  setBackendConfig,
  getBaseUrl,
  testBackendConnection,
} from "@/lib/backend-config";

export default function ServerManager() {
  const [config, setConfig] = useState(getBackendConfig());
  const [customUrl, setCustomUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const c = getBackendConfig();
    setConfig(c);
    if (c.id === "custom") setCustomUrl(c.url || "");
  }, []);

  const activePreset = PRESET_BACKENDS.find((b) => b.id === config.id) || PRESET_BACKENDS[0];

  const handleSelect = (preset) => {
    setTestResult(null);
    if (preset.id === "custom") {
      setConfig({ id: "custom", url: customUrl });
    } else {
      setConfig({ id: preset.id, url: preset.url });
    }
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const url = config.id === "custom" ? customUrl : config.url;
    const result = await testBackendConnection(url);
    setTestResult(result);
    setTesting(false);
  };

  const handleSave = () => {
    setSaving(true);
    const url = config.id === "custom" ? customUrl : config.url;
    setBackendConfig({ id: config.id, url });
    // reload happens inside setBackendConfig
  };

  const currentUrl = getBaseUrl() || "/ (lokal, relativ)";

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Server size={16} className="text-blue-400" />
        <h3 className="font-semibold text-white text-sm">Server-Verwaltung</h3>
        <span className="ml-auto text-[10px] text-zinc-600 font-mono truncate max-w-[200px]">
          Aktiv: {currentUrl}
        </span>
      </div>

      {/* Presets */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {PRESET_BACKENDS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelect(preset)}
            className={`p-3 rounded-xl border text-left transition-all ${
              config.id === preset.id
                ? "border-blue-500 bg-blue-600/10"
                : "border-zinc-700 hover:border-zinc-600"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {preset.id === "local" ? (
                <Zap size={12} className={config.id === preset.id ? "text-blue-400" : "text-zinc-500"} />
              ) : preset.id === "custom" ? (
                <Edit3 size={12} className={config.id === preset.id ? "text-blue-400" : "text-zinc-500"} />
              ) : (
                <Globe size={12} className={config.id === preset.id ? "text-blue-400" : "text-zinc-500"} />
              )}
              <span className={`text-xs font-semibold ${config.id === preset.id ? "text-white" : "text-zinc-400"}`}>
                {preset.name}
              </span>
            </div>
            <p className="text-[10px] text-zinc-600">{preset.description}</p>
            {preset.url && (
              <p className="text-[10px] text-zinc-700 font-mono mt-0.5 truncate">{preset.url}</p>
            )}
          </button>
        ))}
      </div>

      {/* Custom URL Input */}
      {config.id === "custom" && (
        <div className="mb-4">
          <label className="text-xs text-zinc-400 mb-1.5 block">Backend-URL</label>
          <input
            type="url"
            value={customUrl}
            onChange={(e) => { setCustomUrl(e.target.value); setTestResult(null); }}
            placeholder="https://dein-backend.de"
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 font-mono"
          />
        </div>
      )}

      {/* Test Result */}
      {testResult && (
        <div className={`flex items-center gap-2 p-3 rounded-lg border mb-4 text-xs ${
          testResult.ok
            ? "bg-emerald-900/20 border-emerald-800 text-emerald-400"
            : "bg-red-900/20 border-red-800 text-red-400"
        }`}>
          {testResult.ok
            ? <><CheckCircle2 size={13} /> Verbindung erfolgreich (HTTP {testResult.status})</>
            : <><AlertCircle size={13} /> Verbindung fehlgeschlagen: {testResult.error}</>
          }
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleTest}
          disabled={testing}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCcw size={12} className={testing ? "animate-spin" : ""} />
          {testing ? "Teste…" : "Verbindung testen"}
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold transition-all disabled:opacity-50"
        >
          <Save size={12} />
          Speichern & Neu laden
        </button>
      </div>
    </div>
  );
}
