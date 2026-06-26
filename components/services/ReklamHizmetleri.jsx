"use client";


export default function ReklamHizmetleri() {
  return (
    <>
      

      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
            <div className="inline-block mb-6 px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-300">Reklam Hizmetleri</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thinmb-6 leading-tight px-4">
              Dijital Dünyada
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text font-bold text-transparent">
                Görünür Olun
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Google Ads, sosyal medya reklamları ve dijital pazarlama kampanyaları ile hedef kitlenize ulaşın
            </p>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 py-20">
          <section className="mb-20 text-center">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Detaylı içerik yakında eklenecek...
            </p>
          </section>
        </main>
      </div>
    </>
  );
}


