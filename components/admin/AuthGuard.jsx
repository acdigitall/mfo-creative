"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminMe } from "@/server";

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    adminMe()
      .then((data) => {
        // Assume unauthenticated if data is not present or admin is explicitly false
        if (data && data.admin !== false) {
          setIsAuth(true);
        } else {
          router.replace("/admin/login");
        }
      })
      .catch((err) => {
        router.replace("/admin/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <p className="text-sm tracking-widest uppercase text-gray-500 animate-pulse">Erişim Kontrol Ediliyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuth) return null; // Prevent flicker while redirecting

  return children;
}
