"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-transparent from-black via-gray-900 to-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[150px] sm:text-[200px] md:text-[250px] font-bold leading-none bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
        </div>

        {/* Error Icon */}
        <div className="text-6xl sm:text-7xl md:text-8xl mb-8 animate-bounce">
          🔍
        </div>

        {/* Error Message */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Sayfa Bulunamadı
        </h2>
        
        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. 
          Endişelenmeyin, sizi doğru yere yönlendirelim!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href="/" 
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            🏠 Ana Sayfaya Dön
          </Link>
          <Link 
            href="/hizmetler" 
            className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            🎨 Hizmetlerimizi İncele
          </Link>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <p className="text-gray-500 text-sm uppercase tracking-wider">Popüler Sayfalar</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Hakkımızda', path: '/hakkimizda', icon: '👥' },
              { name: 'Portföy', path: '/portfoy', icon: '🎨' },
              { name: 'Blog', path: '/blog', icon: '📝' },
              { name: 'İletişim', path: '/iletisim', icon: '📧' },
            ].map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Fun Element */}
        <div className="mt-16 text-gray-600 text-sm">
          <p>Hata Kodu: 404 | Durum: Sayfa kayıp</p>
          <p className="mt-2">💡 İpucu: URL'yi kontrol edin veya arama motorunu kullanın</p>
        </div>
      </div>
    </div>
  );
}

