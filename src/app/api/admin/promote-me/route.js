import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Promote the current user to admin
    await sql`UPDATE auth_users SET role = 'admin' WHERE id = ${session.user.id}`;

    return Response.json({
      message: "Success! You are now an admin. Please refresh the page.",
    });
  } catch (error) {
    return Response.json({ error: "Failed to promote user" }, { status: 500 });
  }
}
