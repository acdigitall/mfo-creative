"use client";

import { usePathname } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  // If we are on the login page, don't show the sidebar or auth guard
  if (pathname === "/admin/login") {
    return <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">{children}</main>;
  }

  // Otherwise, protect the route and show the layout
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
        <AdminSidebar />
        <main className="flex-1 overflow-x-hidden relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none"></div>
          
          <div className="relative z-10 p-8 h-full">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
