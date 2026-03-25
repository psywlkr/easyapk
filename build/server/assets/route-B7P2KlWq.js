import { a as auth } from './auth-CHx9EKV0.js';
import { s as sql } from './sql-BfhTxwII.js';
import '@auth/core/jwt';
import 'hono/context-storage';
import 'jose';
import '@neondatabase/serverless';

async function GET(request, {
  params
}) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }
    const {
      id
    } = params;

    // Check ownership of the build via project
    const buildResult = await sql`
      SELECT b.*, p.user_id 
      FROM builds b 
      JOIN projects p ON b.project_id = p.id 
      WHERE b.id = ${id} AND p.user_id = ${session.user.id}
    `;
    if (!buildResult.length) {
      return Response.json({
        error: "Build not found"
      }, {
        status: 404
      });
    }
    return Response.json(buildResult[0]);
  } catch (error) {
    console.error(error);
    return Response.json({
      error: "Internal Server Error"
    }, {
      status: 500
    });
  }
}

export { GET };
