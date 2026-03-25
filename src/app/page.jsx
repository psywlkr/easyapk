import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowUp, Plus, Smartphone, Globe, Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

function ThemeToggleBtn() {
  const { dark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

const BUILD_TYPES = [
  { id: "webview", label: "WebView App", icon: Smartphone },
  { id: "twa", label: "TWA", icon: Globe },
  { id: "standalone", label: "Standalone", icon: Code2 },
];


export default function LandingPage() {
  const [url, setUrl] = useState("");
  const [buildType, setBuildType] = useState("webview");
  const [mouse, setMouse] = useState({ x: 0.5, y: 0 });
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0.5, y: 0 });
  const currentRef = useRef({ x: 0.5, y: 0 });

  // smooth lerp mouse tracking
  const animate = useCallback(() => {
    const cur = currentRef.current;
    const tgt = targetRef.current;
    cur.x += (tgt.x - cur.x) * 0.06;
    cur.y += (tgt.y - cur.y) * 0.06;
    setMouse({ x: cur.x, y: cur.y });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    window.location.href = `/account/signup?url=${encodeURIComponent(url)}&type=${buildType}`;
  };

  // spotlight origin: fixed at top-center, beam direction follows mouse
  const beamX = 50 + (mouse.x - 0.5) * 60; // shifts ±30% based on mouse X
  const beamY = -10 + mouse.y * 20;          // subtle vertical shift

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Mouse-tracking spotlight */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Main beam — follows mouse */}
        <div
          className="absolute inset-0 transition-none"
          style={{
            background: `radial-gradient(ellipse 70% 55% at ${beamX}% ${beamY}%, rgba(99,102,241,0.22) 0%, rgba(59,130,246,0.12) 35%, transparent 70%)`,
          }}
        />
        {/* Hard cone from very top, narrower */}
        <div
          className="absolute inset-0"
          style={{
            background: `conic-gradient(from ${90 + (mouse.x - 0.5) * 40}deg at ${beamX}% -5%, transparent 80deg, rgba(139,92,246,0.08) 90deg, rgba(99,102,241,0.15) 95deg, rgba(139,92,246,0.08) 100deg, transparent 120deg)`,
          }}
        />
        {/* Ambient glow at beam center */}
        <div
          className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: `${beamX}%`,
            top: `${beamY + 20}%`,
            background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5">
        <a href="/" className="flex items-center gap-2">
          <img src="/easyapk-logo.jpg?v=3" className="h-12 w-12 object-contain" style={{ mixBlendMode: 'screen', clipPath: 'circle(46%)', filter: 'brightness(1.1)' }} alt="EasyApk" />
          <span className="text-sm font-semibold text-white tracking-tight">EasyApk</span>
        </a>

        <div className="flex items-center gap-1">
          <ThemeToggleBtn />
          <a
            href="/account/signin"
            className="px-4 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Anmelden
          </a>
          <a
            href="/account/signup"
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition-colors"
          >
            Kostenlos starten
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-12">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-8 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm">
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wide">
            NEU
          </span>
          PWA zu Android APK — in Minuten →
        </div>

        {/* Headline */}
        <h1 className="text-center text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4 max-w-2xl">
          Denk es nicht
          <br />
          <em className="font-serif italic font-normal text-zinc-300">bau</em>{" "}
          es.
        </h1>
        <p className="text-zinc-500 text-center text-base mb-12 max-w-md">
          Gib deine PWA-URL ein und erhalte in Minuten eine fertige Android-APK.
          Ohne Programmierkenntnisse.
        </p>

        {/* Glass Input Card */}
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit}>
            <div
              className="rounded-2xl border border-white/10 p-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Tabs */}
              <div className="flex gap-1 px-3 pt-3 mb-3">
                {BUILD_TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBuildType(t.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        buildType === t.id
                          ? "bg-white/10 text-white"
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <Icon size={12} />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Input */}
              <div className="px-3 pb-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://deine-pwa.de eingeben…"
                  className="w-full bg-transparent text-white placeholder:text-zinc-600 text-sm outline-none py-2 resize-none"
                />
              </div>

              {/* Bottom Bar */}
              <div className="flex items-center justify-between px-3 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <Plus size={11} />
                    Icon
                  </button>
                  <span className="text-xs text-zinc-600">EasyApk v2.2</span>
                </div>
                <button
                  type="submit"
                  disabled={!url.trim()}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUp size={15} className="text-white" />
                </button>
              </div>
            </div>
          </form>

        </div>
      </section>

      {/* Features strip */}
      <section className="relative z-10 mt-8 px-6 pb-20">
        <div className="mx-auto max-w-3xl grid grid-cols-3 gap-3">
          {[
            { label: "WebView & TWA", sub: "Beide Build-Modi" },
            { label: "Push & Offline", sub: "Native Funktionen" },
            { label: "Play-Store-fertig", sub: "Signierte APK" },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-xl border border-white/8 p-4 text-center"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="text-xs font-semibold text-white mb-0.5">{f.label}</div>
              <div className="text-[11px] text-zinc-600">{f.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-5 px-6 text-center text-xs text-zinc-700">
        © 2026 EasyApk. Alle Rechte vorbehalten.
      </footer>
    </div>
  );
}
