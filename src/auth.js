/**
 * Auth utility — supports two auth methods:
 *  1. @hono/auth-js session JWT (credentials-based, via cookie)
 *  2. Neon Auth JWT (Bearer token in Authorization header)
 */
import CreateAuth from './__create/@auth/create';
import { verifyNeonJWT, extractBearerToken, getUserIdFromPayload } from './app/api/utils/neon-auth';
import { getContext } from 'hono/context-storage';

const { auth: _sessionAuth } = CreateAuth();

/**
 * Returns the authenticated session from either:
 * - Authorization: Bearer <neon_jwt>  (Neon Auth)
 * - authjs.session-token cookie        (@hono/auth-js)
 */
export async function auth() {
  // 1. Try Neon Auth Bearer token first
  try {
    const c = getContext();
    const authHeader = c?.req?.raw?.headers?.get('authorization');
    const token = extractBearerToken(authHeader);
    if (token) {
      const payload = await verifyNeonJWT(token);
      if (payload) {
        const userId = getUserIdFromPayload(payload);
        if (userId) {
          return {
            user: {
              id: userId,
              email: payload.email ?? null,
              name: payload.name ?? null,
              image: payload.picture ?? null,
            },
            expires: new Date(payload.exp * 1000).toISOString(),
            provider: 'neon-auth',
          };
        }
      }
    }
  } catch {
    // Fall through to session auth
  }

  // 2. Fall back to @hono/auth-js session cookie
  return _sessionAuth();
}
