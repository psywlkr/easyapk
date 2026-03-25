/**
 * Backend-Konfiguration — hier den Server wechseln
 * Gespeichert in localStorage damit Admin es live umschalten kann
 */

export const PRESET_BACKENDS = [
  { id: "local",      name: "Lokal (Dev)",     url: "",                         description: "Gleicher Server, relative URLs" },
  { id: "production", name: "Produktion",       url: "https://api.easyapk.de",   description: "Live-Backend" },
  { id: "staging",    name: "Staging",          url: "https://staging.easyapk.de", description: "Test-Umgebung" },
  { id: "custom",     name: "Benutzerdefiniert",url: "",                         description: "Eigene URL" },
];

const STORAGE_KEY = "easyapk_backend";

export function getBackendConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { id: "local", url: "" };
}

export function setBackendConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  // Seite neu laden damit alle Queries den neuen Backend nutzen
  window.location.reload();
}

export function getBaseUrl() {
  try {
    const config = getBackendConfig();
    return config.url || "";
  } catch {
    return "";
  }
}

export async function testBackendConnection(url) {
  try {
    const base = url || "";
    const res = await fetch(`${base}/api/admin/stats`, {
      signal: AbortSignal.timeout(5000),
    });
    return { ok: true, status: res.status };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}
