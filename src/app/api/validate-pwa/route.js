import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await request.json();

    if (!url || !url.startsWith("https://")) {
      return Response.json({
        valid: false,
        checks: {
          https: false,
          manifest: false,
          serviceWorker: false,
          installability: false,
          icons: false,
        },
        error: "URL muss mit https:// beginnen.",
      });
    }

    // Fetch the page HTML
    let htmlText = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      const pageRes = await fetch(url, {
        headers: { "User-Agent": "EasyApk/1.0 PWA-Validator" },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!pageRes.ok) {
        return Response.json({
          valid: false,
          checks: {
            https: true,
            manifest: false,
            serviceWorker: false,
            installability: false,
            icons: false,
          },
          error: `Seite antwortete mit HTTP ${pageRes.status}. Bitte prüfe die URL.`,
        });
      }
      htmlText = await pageRes.text();
    } catch (e) {
      return Response.json({
        valid: false,
        checks: {
          https: true,
          manifest: false,
          serviceWorker: false,
          installability: false,
          icons: false,
        },
        error:
          "URL nicht erreichbar. Stelle sicher, dass sie öffentlich zugänglich ist.",
      });
    }

    // Find manifest link in HTML
    let manifestUrl = null;
    const patterns = [
      /<link[^>]+rel=["']manifest["'][^>]*href=["']([^"']+)["']/i,
      /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']manifest["']/i,
    ];
    for (const pattern of patterns) {
      const m = htmlText.match(pattern);
      if (m) {
        const href = m[1];
        try {
          manifestUrl = href.startsWith("http")
            ? href
            : new URL(href, new URL(url).origin).toString();
        } catch {}
        break;
      }
    }

    // Fetch manifest
    let manifest = null;
    if (manifestUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const mRes = await fetch(manifestUrl, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (mRes.ok) {
          manifest = await mRes.json();
        }
      } catch {}
    }

    const hasManifest = !!manifest;
    const hasIcons =
      hasManifest && Array.isArray(manifest.icons) && manifest.icons.length > 0;
    const hasName =
      hasManifest && !!(manifest.name || manifest.short_name);
    const hasServiceWorker =
      htmlText.includes("serviceWorker") ||
      htmlText.includes("service-worker");
    const valid = hasManifest && hasIcons && hasName;

    // Resolve absolute icon URLs
    const resolvedIcons = hasIcons
      ? manifest.icons.map((icon) => ({
          ...icon,
          src: icon.src.startsWith("http")
            ? icon.src
            : (() => {
                try {
                  return new URL(icon.src, new URL(url).origin).toString();
                } catch {
                  return icon.src;
                }
              })(),
        }))
      : [];

    // Pick best icon (largest or 512px)
    const bestIcon =
      resolvedIcons.find((i) => i.sizes?.includes("512")) ||
      resolvedIcons.find((i) => i.sizes?.includes("192")) ||
      resolvedIcons[0] ||
      null;

    return Response.json({
      valid,
      checks: {
        https: true,
        manifest: hasManifest,
        serviceWorker: hasServiceWorker,
        installability: hasManifest && hasIcons,
        icons: hasIcons,
      },
      manifest: manifest
        ? {
            name: manifest.name || manifest.short_name || "",
            short_name: manifest.short_name || manifest.name || "",
            description: manifest.description || "",
            theme_color: manifest.theme_color || "#2563eb",
            background_color: manifest.background_color || "#ffffff",
            orientation: manifest.orientation || "any",
            display: manifest.display || "standalone",
            start_url: manifest.start_url || "/",
            icons: resolvedIcons,
            bestIconUrl: bestIcon?.src || null,
            manifestUrl,
          }
        : null,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Validierung fehlgeschlagen" }, { status: 500 });
  }
}
