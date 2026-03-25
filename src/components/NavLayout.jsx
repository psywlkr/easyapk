import React from "react";
import { LayoutDashboard, PlusCircle, Settings, ShieldCheck, LogOut } from "lucide-react";
import useUser from "@/utils/useUser";
import { ThemeToggle } from "@/components/ThemeProvider";

export default function NavLayout({ children, activeTab = "dashboard" }) {
  const { data: user, loading } = useUser();

  const navLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { id: "new",       label: "Neues Projekt", icon: PlusCircle,    href: "/projects/new" },
    { id: "settings",  label: "Einstellungen", icon: Settings,      href: "/settings" },
    ...(user?.role === "admin"
      ? [{ id: "admin", label: "Admin", icon: ShieldCheck, href: "/admin" }]
      : []),
  ];

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-800 border-t-blue-500" />
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Spotlight */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(29,78,216,0.15) 0%, rgba(109,40,217,0.06) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Top Nav */}
      <nav className="relative z-10 flex items-center gap-4 px-8 py-4 border-b border-white/5">
        {/* Logo */}
        <a href="/dashboard" className="flex items-center gap-2 mr-4">
          <img
            src="/easyapk-logo.jpg?v=3"
            className="h-8 w-8 object-contain"
            style={{ mixBlendMode: "screen", clipPath: "circle(46%)", filter: "brightness(1.1)" }}
            alt="EasyApk"
          />
          <span className="text-sm font-semibold tracking-tight text-white">EasyApk</span>
        </a>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                activeTab === id
                  ? "bg-white/8 text-white font-medium"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <span className="text-xs text-zinc-400 hidden sm:block max-w-[140px] truncate">
              {user?.email}
            </span>
          </div>
          <a
            href="/account/logout"
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-colors"
            title="Abmelden"
          >
            <LogOut size={15} />
          </a>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
