import { getToken } from '@auth/core/jwt';
import { getContext } from 'hono/context-storage';
import { jwtVerify, createRemoteJWKSet } from 'jose';

function CreateAuth() {
  const auth = async () => {
    const c = getContext();
    const token = await getToken({
      req: c.req.raw,
      secret: process.env.AUTH_SECRET,
      secureCookie: process.env.AUTH_URL.startsWith('https')
    });
    if (token) {
      return {
        user: {
          id: token.sub,
          email: token.email,
          name: token.name,
          image: token.picture
        },
        expires: token.exp.toString()
      };
    }
  };
  return {
    auth
  };
}

/**
 * Neon Auth — JWKS-based JWT verification
 *
 * Uses the Neon Auth JWKS endpoint to verify JWTs (EdDSA/Ed25519).
 * Works both as a standalone auth method and alongside @hono/auth-js sessions.
 */
const JWKS_URL = process.env.NEON_AUTH_JWKS_URL;

// Cache the JWKS fetcher (jose caches it internally with auto-refresh)
let _jwks = null;
function getJWKS() {
  if (!_jwks && JWKS_URL) {
    _jwks = createRemoteJWKSet(new URL(JWKS_URL));
  }
  return _jwks;
}

/**
 * Verify a Neon Auth JWT and return the decoded payload.
 * Returns null if invalid or JWKS not configured.
 */
async function verifyNeonJWT(token) {
  const jwks = getJWKS();
  if (!jwks || !token) return null;
  try {
    const {
      payload
    } = await jwtVerify(token, jwks);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Extract a Bearer token from an Authorization header value.
 */
function extractBearerToken(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7).trim() || null;
}

/**
 * Get the user ID from a Neon Auth JWT payload.
 * Neon Auth stores the user ID in the `sub` claim.
 */
function getUserIdFromPayload(payload) {
  return payload?.sub ?? null;
}

/**
 * Auth utility — supports two auth methods:
 *  1. @hono/auth-js session JWT (credentials-based, via cookie)
 *  2. Neon Auth JWT (Bearer token in Authorization header)
 */
const {
  auth: _sessionAuth
} = CreateAuth();

/**
 * Returns the authenticated session from either:
 * - Authorization: Bearer <neon_jwt>  (Neon Auth)
 * - authjs.session-token cookie        (@hono/auth-js)
 */
async function auth() {
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
              image: payload.picture ?? null
            },
            expires: new Date(payload.exp * 1000).toISOString(),
            provider: 'neon-auth'
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

export { auth as a };
