import { a as auth } from './auth-CHx9EKV0.js';
import { s as sql } from './sql-BfhTxwII.js';
import '@auth/core/jwt';
import 'hono/context-storage';
import 'jose';
import '@neondatabase/serverless';

async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }

    // Check admin role using the correct users table
    const userResult = await sql`
      SELECT role FROM users WHERE id = ${session.user.id}
    `;
    if (!userResult.length || userResult[0].role !== "admin") {
      return Response.json({
        error: "Forbidden"
      }, {
        status: 403
      });
    }

    // Run stats queries in parallel (no transaction needed for reads)
    const [usersResult, projectsResult, buildsResult, buildStatusResult] = await Promise.all([sql`SELECT COUNT(*) AS total FROM users`, sql`SELECT COUNT(*) AS total FROM projects`, sql`SELECT COUNT(*) AS total FROM builds`, sql`SELECT status, COUNT(*) AS count FROM builds GROUP BY status ORDER BY status`]);
    return Response.json({
      users: Number(usersResult[0]?.total ?? 0),
      projects: Number(projectsResult[0]?.total ?? 0),
      builds: Number(buildsResult[0]?.total ?? 0),
      buildStatusCounts: buildStatusResult.map(r => ({
        status: r.status,
        count: Number(r.count)
      }))
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

export { GET };
