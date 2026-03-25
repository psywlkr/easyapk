/**
 * Neon Auth — JWKS-based JWT verification
 *
 * Uses the Neon Auth JWKS endpoint to verify JWTs (EdDSA/Ed25519).
 * Works both as a standalone auth method and alongside @hono/auth-js sessions.
 */
import { createRemoteJWKSet, jwtVerify } from 'jose';

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
export async function verifyNeonJWT(token) {
  const jwks = getJWKS();
  if (!jwks || !token) return null;
  try {
    const { payload } = await jwtVerify(token, jwks);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Extract a Bearer token from an Authorization header value.
 */
export function extractBearerToken(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7).trim() || null;
}

/**
 * Get the user ID from a Neon Auth JWT payload.
 * Neon Auth stores the user ID in the `sub` claim.
 */
export function getUserIdFromPayload(payload) {
  return payload?.sub ?? null;
}

export const isNeonAuthConfigured = !!JWKS_URL;
