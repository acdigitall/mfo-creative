"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/server";
import { FolderGit2, CalendarClock, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, loading: true });

  useEffect(() => {
    getProducts()
      .then((data) => {
        setStats({ total: data?.length || 0, loading: false });
      })
      .catch(() => {
        setStats({ total: 0, loading: false });
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight">Hoş Geldiniz</h1>
        <p className="text-gray-400 mt-2 font-medium">MFO Creative portföyünüzü buradan yönetebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl group-hover:bg-blue-600/20 transition-all"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="p-3 bg-blue-600/20 rounded-2xl w-fit text-blue-500 mb-6">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div className="mt-auto">
              <h3 className="text-gray-400 font-medium text-sm mb-1 uppercase tracking-wider">Toplam Proje</h3>
              <p className="text-5xl font-black text-white">
                {stats.loading ? <span className="animate-pulse">...</span> : stats.total}
              </p>
            </div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="p-3 bg-purple-600/20 rounded-2xl w-fit text-purple-500 mb-6">
              <CalendarClock className="w-6 h-6" />
            </div>
            <div className="mt-auto">
              <h3 className="text-gray-400 font-medium text-sm mb-1 uppercase tracking-wider">Son Güncelleme</h3>
              <p className="text-xl font-bold text-white mt-2">Bugün</p>
            </div>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-3xl relative overflow-hidden group hover:border-green-500/50 transition-colors">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-green-600/10 rounded-full blur-2xl group-hover:bg-green-600/20 transition-all"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="p-3 bg-green-600/20 rounded-2xl w-fit text-green-500 mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="mt-auto">
              <h3 className="text-gray-400 font-medium text-sm mb-1 uppercase tracking-wider">Sistem Durumu</h3>
              <p className="text-xl font-bold text-green-400 mt-2 flex items-center">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Aktif & Sorunsuz
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-[#111] border border-gray-800 p-8 rounded-3xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <span className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></span>
          Hızlı Başlangıç
        </h2>
        <p className="text-gray-400 leading-relaxed max-w-3xl">
          Sol menüden <strong>Projeler</strong> sayfasına giderek mevcut eserleri silebilir veya güncelleyebilirsiniz. Yeni bir eser yüklemek isterseniz <strong>Yeni Proje Ekle</strong> butonunu kullanın. Web sitesinin anında güncellenmesi için eklediğiniz veriler doğrudan API'ye yazılır.
        </p>
      </div>
    </div>
  );
}
