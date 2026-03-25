/**
 * Zentraler API-Client
 * Alle Backend-Calls laufen hier durch — Backend-URL aus backend-config.js
 */

import { getBaseUrl } from "./backend-config.js";

async function request(path, options = {}) {
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  // ── Projekte ──────────────────────────────────────────────
  getProjects: () =>
    request("/api/projects"),

  getProject: (id) =>
    request(`/api/projects/${id}`),

  createProject: (data) =>
    request("/api/projects", { method: "POST", body: JSON.stringify(data) }),

  deleteProject: (id) =>
    request(`/api/projects/${id}`, { method: "DELETE" }),

  // ── Builds ────────────────────────────────────────────────
  getBuilds: (projectId) =>
    request(`/api/builds?project_id=${projectId}`),

  createBuild: (data) =>
    request("/api/builds", { method: "POST", body: JSON.stringify(data) }),

  // ── PWA-Validierung ───────────────────────────────────────
  validatePwa: (url) =>
    request("/api/validate-pwa", { method: "POST", body: JSON.stringify({ url }) }),

  // ── Admin ─────────────────────────────────────────────────
  getAdminStats: () =>
    request("/api/admin/stats"),
};
