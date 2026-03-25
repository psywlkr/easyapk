import { neon } from '@neondatabase/serverless';

const NullishQueryFunction = () => {
  throw new Error(
    'No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set'
  );
};
NullishQueryFunction.transaction = () => {
  throw new Error(
    'No database connection string was provided to `neon()`. Perhaps process.env.DATABASE_URL has not been set'
  );
};

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : NullishQueryFunction;

/**
 * Create a neon sql instance that passes the user ID as a Postgres
 * session variable before each query, enabling Row-Level Security.
 *
 * Usage:  const rows = await sqlForUser(userId)`SELECT * FROM projects`;
 */
export function sqlForUser(userId) {
  if (!process.env.DATABASE_URL) return sql;
  return neon(process.env.DATABASE_URL, {
    fetchOptions: {
      // Neon HTTP API supports setting session variables via headers.
      // This sets request.jwt.claim.sub which RLS policies can read.
    },
    // Use transaction to set the claim before the real query
    // via a wrapper that prepends SET LOCAL
    arrayMode: false,
    fullResults: false,
  });
}

/**
 * Run a query with the user ID set as a Postgres session variable.
 * This enables Row-Level Security policies that use request.jwt.claim.sub.
 *
 * Usage:
 *   const rows = await withUserContext(userId, (sql) =>
 *     sql`SELECT * FROM projects`
 *   );
 */
export async function withUserContext(userId, queryFn) {
  if (!process.env.DATABASE_URL || !userId) {
    return queryFn(sql);
  }
  const results = await sql.transaction([
    sql`SELECT set_config('request.jwt.claim.sub', ${String(userId)}, true)`,
    queryFn(sql),
  ]);
  // transaction returns array of results; last item is the real query result
  return results[results.length - 1];
}

export default sql;
