"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { adminLogout } from "@/server";
import { LayoutDashboard, Images, PlusSquare, LogOut } from "lucide-react";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await adminLogout();
      router.replace("/admin/login");
    } catch (err) {
      console.error("Logout failed", err);
      // Even if API fails, clear client side and force redirect
      router.replace("/admin/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projeler", href: "/admin/projects", icon: Images },
    { name: "Yeni Proje Ekle", href: "/admin/projects/new", icon: PlusSquare },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#0a0a0a] border-r border-gray-800 flex flex-col relative z-20">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
            M
          </div>
          <span className="text-white font-bold tracking-widest uppercase text-sm">MFO Panel</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive
                  ? "bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
                  : "text-gray-400 hover:bg-gray-900 hover:text-gray-200 border border-transparent"
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 transition-colors ${
                  isActive ? "text-blue-500" : "text-gray-500 group-hover:text-gray-300"
                }`}
              />
              <span className="text-sm font-medium tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center px-4 py-3 text-red-500/80 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 group disabled:opacity-50"
        >
          <LogOut className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">
            {isLoggingOut ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
          </span>
        </button>
      </div>
    </div>
  );
}
