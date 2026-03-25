import sql from "@/app/api/utils/sql";
import { verify } from "argon2";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email und Passwort sind erforderlich" },
        { status: 400 },
      );
    }

    // Find user
    const users = await sql`
      SELECT id, email, password_hash, role
      FROM users
      WHERE email = ${email}
    `;

    if (users.length === 0) {
      return Response.json(
        { error: "Ungültige Anmeldedaten" },
        { status: 401 },
      );
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await verify(user.password_hash, password);

    if (!isValidPassword) {
      return Response.json(
        { error: "Ungültige Anmeldedaten" },
        { status: 401 },
      );
    }

    // Create session
    const sessionToken = crypto.randomUUID();
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await sql`
      INSERT INTO auth_sessions ("userId", "sessionToken", expires)
      VALUES (${user.id}, ${sessionToken}, ${expires})
    `;

    const response = Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

    // Set session cookie
    response.headers.set(
      "Set-Cookie",
      `session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
    );

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return Response.json(
      { error: "Anmeldung fehlgeschlagen" },
      { status: 500 },
    );
  }
}
