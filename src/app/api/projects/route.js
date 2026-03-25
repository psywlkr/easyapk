import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const projects = await sql`
      SELECT p.*, 
        (SELECT status FROM builds WHERE project_id = p.id ORDER BY created_at DESC LIMIT 1) as last_build_status
      FROM projects p 
      WHERE user_id = ${userId} 
      ORDER BY created_at DESC
    `;

    return Response.json(projects);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const {
      name,
      pwa_url,
      package_name,
      build_type,
      native_features,
      icon_url,
      splash_url,
    } = body;

    const result = await sql`
      INSERT INTO projects (user_id, name, pwa_url, package_name, build_type, native_features, icon_url, splash_url)
      VALUES (${userId}, ${name}, ${pwa_url}, ${package_name}, ${build_type}, ${JSON.stringify(native_features)}, ${icon_url}, ${splash_url})
      RETURNING *
    `;

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
