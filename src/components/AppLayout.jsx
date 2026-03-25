import React from "react";
import {
  LayoutDashboard,
  PlusCircle,
  ShieldCheck,
  LogOut,
  Settings,
} from "lucide-react";
import useUser from "@/utils/useUser";
import { ThemeToggle } from "@/components/ThemeProvider";

export default function AppLayout({ children, activeTab = "dashboard" }) {
  const { data: user, loading } = useUser();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "new",
      label: "Neues Projekt",
      icon: PlusCircle,
      href: "/projects/new",
    },
    {
      id: "settings",
      label: "Einstellungen",
      icon: Settings,
      href: "/settings",
    },
    {
      id: "admin",
      label: "Admin",
      icon: ShieldCheck,
      href: "/admin",
      adminOnly: true,
    },
  ];

  if (loading)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-700 border-t-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-950 flex text-zinc-100">
      {/* Sidebar */}
      <aside className="w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-4 h-14 flex items-center border-b border-zinc-800">
          <a href="/dashboard" className="flex items-center gap-2.5">
            <img src="/easyapk-logo.jpg?v=3" className="h-12 w-12 object-contain" style={{ mixBlendMode: 'screen', clipPath: 'circle(46%)', filter: 'brightness(1.1)' }} alt="EasyApk" />
            <span className="text-sm font-semibold text-white tracking-tight">EasyApk</span>
          </a>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {menuItems
            .filter((item) => !item.adminOnly || user?.role === "admin")
            .map((item) => {
              const Icon = item.icon;
              const isActive =
                typeof window !== "undefined" &&
                (window.location.pathname === item.href ||
                  (item.id === "dashboard" && window.location.pathname === "/dashboard"));
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all ${
                    isActive
                      ? "bg-zinc-800 text-white font-medium"
                      : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-blue-400" : ""} />
                  {item.label}
                </a>
              );
            })}
        </nav>

        {/* User */}
        <div className="px-2 py-3 border-t border-zinc-800 space-y-0.5">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-md">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-semibold shrink-0">
              {user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-zinc-300 truncate">{user?.email}</div>
              <div className="text-[10px] text-zinc-600 capitalize">{user?.role || "Benutzer"}</div>
            </div>
            <ThemeToggle />
          </div>
          <a
            href="/account/logout"
            className="flex items-center gap-2.5 px-3 py-2 text-zinc-500 hover:text-zinc-300 text-xs rounded-md hover:bg-zinc-800/60 transition-colors w-full"
          >
            <LogOut size={13} />
            <span>Abmelden</span>
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-zinc-950">{children}</main>
    </div>
  );
}
