import { a as auth } from './auth-CHx9EKV0.js';
import { s as sql } from './sql-BfhTxwII.js';
import '@auth/core/jwt';
import 'hono/context-storage';
import 'jose';
import '@neondatabase/serverless';

async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({
        error: "Unauthorized"
      }, {
        status: 401
      });
    }

    // Promote the current user to admin
    await sql`UPDATE auth_users SET role = 'admin' WHERE id = ${session.user.id}`;
    return Response.json({
      message: "Success! You are now an admin. Please refresh the page."
    });
  } catch (error) {
    return Response.json({
      error: "Failed to promote user"
    }, {
      status: 500
    });
  }
}

export { POST };
