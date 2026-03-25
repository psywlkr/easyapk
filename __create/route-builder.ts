import { Hono } from 'hono';
import type { Handler } from 'hono/types';
import updatedFetch from '../src/__create/fetch';

const API_BASENAME = '/api';
const api = new Hono();

// Base prefix used in glob keys — relative to this file's location
const GLOB_PREFIX = '../src/app/api/';

if (globalThis.fetch) {
  globalThis.fetch = updatedFetch;
}

// Use import.meta.glob for Vite-native file discovery (works reliably on all platforms)
const routeModules = import.meta.glob('../src/app/api/**/route.js');

/** Convert a glob key like '../src/app/api/projects/[id]/route.js' → Hono path '/projects/:id' */
function globKeyToHonoPath(key: string): string {
  // Remove prefix and trailing '/route.js'
  const inner = key.slice(GLOB_PREFIX.length).replace(/\/route\.js$/, '');
  if (!inner) return '/';
  const parts = inner.split('/').map((segment) => {
    const match = segment.match(/^\[(\.{3})?([^\]]+)\]$/);
    if (match) {
      const [, dots, param] = match;
      return dots === '...' ? `:${param}{.+}` : `:${param}`;
    }
    return segment;
  });
  return '/' + parts.join('/');
}

// Register all routes from glob
async function registerRoutes() {
  // Clear existing routes
  api.routes = [];

  // Sort by path length descending so specific routes register before wildcards
  const entries = Object.entries(routeModules).sort((a, b) => b[0].length - a[0].length);

  for (const [key, loader] of entries) {
    try {
      const route = await loader() as Record<string, unknown>;
      const honoPath = globKeyToHonoPath(key);

      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;
      for (const method of methods) {
        if (typeof route[method] === 'function') {
          // Capture key for hot-reload re-import
          const routeKey = key;
          const handler: Handler = async (c) => {
            const params = c.req.param();
            if (import.meta.env.DEV) {
              // Re-import on every request in dev for HMR
              const fresh = await routeModules[routeKey]() as Record<string, unknown>;
              return await (fresh[method] as Function)(c.req.raw, { params });
            }
            return await (route[method] as Function)(c.req.raw, { params });
          };

          switch (method) {
            case 'GET':    api.get(honoPath, handler);    break;
            case 'POST':   api.post(honoPath, handler);   break;
            case 'PUT':    api.put(honoPath, handler);    break;
            case 'DELETE': api.delete(honoPath, handler); break;
            case 'PATCH':  api.patch(honoPath, handler);  break;
          }
        }
      }
    } catch (error) {
      console.error(`[route-builder] Error registering ${key}:`, error);
    }
  }
}

// Initial route registration
await registerRoutes();

// Hot reload in development
if (import.meta.env.DEV && import.meta.hot) {
  import.meta.hot.accept((newSelf) => {
    registerRoutes().catch((err) => {
      console.error('[route-builder] Error reloading routes:', err);
    });
  });
}

export { api, API_BASENAME };
