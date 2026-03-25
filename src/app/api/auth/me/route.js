import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const cookie = request.headers.get("cookie");
    if (!cookie) {
      return Response.json({ error: "Nicht authentifiziert" }, { status: 401 });
    }

    const sessionToken = cookie
      .split("; ")
      .find((row) => row.startsWith("session="))
      ?.split("=")[1];

    if (!sessionToken) {
      return Response.json({ error: "Nicht authentifiziert" }, { status: 401 });
    }

    // Find session
    const sessions = await sql`
      SELECT s."userId", s.expires, u.email, u.role
      FROM auth_sessions s
      JOIN users u ON u.id = s."userId"
      WHERE s."sessionToken" = ${sessionToken}
        AND s.expires > NOW()
    `;

    if (sessions.length === 0) {
      return Response.json({ error: "Sitzung abgelaufen" }, { status: 401 });
    }

    const session = sessions[0];

    return Response.json({
      id: session.userId,
      email: session.email,
      role: session.role,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return Response.json(
      { error: "Authentifizierung fehlgeschlagen" },
      { status: 500 },
    );
  }
}
