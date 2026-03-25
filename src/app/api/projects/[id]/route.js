import { auth } from "@/auth";
import sql from "@/app/api/utils/sql";

export async function GET(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const result = await sql`
      SELECT p.*,
        (SELECT status FROM builds WHERE project_id = p.id ORDER BY created_at DESC LIMIT 1) as last_build_status
      FROM projects p
      WHERE p.id = ${id} AND p.user_id = ${session.user.id}
    `;

    if (!result.length) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, package_name, version, build_type, native_features, icon_url, splash_url } = body;

    // Always store native_features as a JSON string, regardless of whether
    // the client sent a string or an object
    let featuresJson = null;
    if (native_features !== undefined && native_features !== null) {
      featuresJson =
        typeof native_features === "string"
          ? native_features
          : JSON.stringify(native_features);
    }

    const result = await sql`
      UPDATE projects
      SET
        name = COALESCE(${name ?? null}, name),
        package_name = COALESCE(${package_name ?? null}, package_name),
        version = COALESCE(${version ?? null}, version),
        build_type = COALESCE(${build_type ?? null}, build_type),
        native_features = COALESCE(${featuresJson}, native_features),
        icon_url = COALESCE(${icon_url ?? null}, icon_url),
        splash_url = COALESCE(${splash_url ?? null}, splash_url)
      WHERE id = ${id} AND user_id = ${session.user.id}
      RETURNING *
    `;

    if (!result.length) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(result[0]);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Delete builds first (foreign key constraint)
    await sql`DELETE FROM builds WHERE project_id = ${id}`;

    const result = await sql`
      DELETE FROM projects
      WHERE id = ${id} AND user_id = ${session.user.id}
      RETURNING id
    `;

    if (!result.length) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
