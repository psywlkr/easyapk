import sql from "@/app/api/utils/sql";
import { hash } from "argon2";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email und Passwort sind erforderlich" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: "Passwort muss mindestens 8 Zeichen lang sein" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return Response.json(
        { error: "Diese E-Mail ist bereits registriert" },
        { status: 400 },
      );
    }

    // Hash password
    const passwordHash = await hash(password);

    // Create user
    const newUser = await sql`
      INSERT INTO users (email, password_hash, role)
      VALUES (${email}, ${passwordHash}, 'user')
      RETURNING id, email, role
    `;

    // Create session (simplified - in production use proper session management)
    const sessionToken = crypto.randomUUID();
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    await sql`
      INSERT INTO auth_sessions ("userId", "sessionToken", expires)
      VALUES (${newUser[0].id}, ${sessionToken}, ${expires})
    `;

    const response = Response.json({
      success: true,
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        role: newUser[0].role,
      },
    });

    // Set session cookie
    response.headers.set(
      "Set-Cookie",
      `session=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`,
    );

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return Response.json(
      { error: "Registrierung fehlgeschlagen" },
      { status: 500 },
    );
  }
}
