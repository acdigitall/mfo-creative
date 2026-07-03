"use client";
import React from 'react';
import Link from 'next/link';

export default function CTA({ title, description }) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="relative p-8 sm:p-12 md:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white tracking-tight">
              {title || "Fikirleriniz Hayata Geçmeyi Bekliyor"}
            </h2>
            
            <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              {description || "Ücretsiz danışmanlık ve proje teklifi için bizimle iletişime geçin."}
              <br className="hidden sm:block" />
              <span className="font-medium text-gray-300 block sm:inline mt-2 sm:mt-0">
                Markanızı birlikte geleceğe taşıyalım.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/iletisim"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 shadow-lg text-sm sm:text-base uppercase tracking-wider"
              >
                Hemen İletişime Geçin
              </Link>
              
              <Link
                href="/hakkimizda"
                className="w-full sm:w-auto px-8 py-4 bg-transparent text-white rounded-lg font-medium border border-white/20 hover:bg-white/5 transition-colors duration-300 text-sm sm:text-base uppercase tracking-wider"
              >
                Bizi Tanıyın
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
