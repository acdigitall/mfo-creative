"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/server";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await adminLogin(username, password);
      router.push("/admin");
    } catch (err) {
      setError("Giriş başarısız. Bilgilerinizi kontrol edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50 animate-pulse"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10">
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white font-black text-3xl shadow-[0_0_30px_rgba(59,130,246,0.5)] mb-6">
              M
            </div>
            <h1 className="text-2xl font-bold text-white tracking-wide">Yönetici Girişi</h1>
            <p className="text-gray-500 text-sm mt-2">MFO Creative kontrol paneline erişin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Kullanıcı Adı</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#111] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="admin"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#111] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-semibold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest py-4 transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50 disabled:active:scale-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <span className="relative z-10 flex items-center justify-center text-sm">
                {loading ? (
                  <><svg className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg> Giriş Yapılıyor...</>
                ) : (
                  "Giriş Yap"
                )}
              </span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">Yetkisiz erişim yasaktır.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
