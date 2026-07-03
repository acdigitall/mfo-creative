"use client";
import Head from 'next/head';
import Link from 'next/link';
import CTA from '@/components/CTA';
import { useState, useEffect } from 'react';

import portfoy from "@/data/portfoy.json";
import { getProductsByTur } from '@/server';

export default function SosyalMedyaCalismalari() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("sosyal");
  const [filteredData, setFiltredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByTur("sosyal")
      .then(setFiltredData)
      .catch((e) => {
        console.warn("Backend verisi alınamadı, yerel veri kullanılıyor:", e);
        // Hata durumunda yerel JSON verisini kullan
        const localData = portfoy.filter(item => {
          const tur = item?.tur;
          if (Array.isArray(tur)) return tur.includes("sosyal");
          if (typeof tur === "string") return tur.includes("sosyal");
          return false;
        });
        setFiltredData(localData);
      })
      .finally(() => setLoading(false));
  }, []);




  const socialMediaServices = [
    {
      title: "Video Çekimi",
      subtitle: "Profesyonel Video Prodüksiyon",
      description:
        "Kurumsal tanıtım filmleri, reklam çekimleri, etkinlik videoları ve her türlü video prodüksiyon hizmeti. 4K kalitesinde, profesyonel ekipman ve deneyimli ekiple çalışıyoruz.",
      items: [
        { name: "Kurumsal Tanıtım Filmi", detail: "Firmanızı en iyi şekilde anlatan videolar" },
        { name: "Ürün Tanıtım Videosu", detail: "Ürünlerinizi öne çıkaran çekimler" },
        { name: "Etkinlik & Organizasyon", detail: "Canlı yayın ve kayıt hizmetleri" },
        { name: "Röportaj & Mülakat", detail: "Profesyonel röportaj çekimleri" },
        { name: "Reklam Filmi", detail: "Yaratıcı reklam konseptleri" },
        { name: "Sosyal Medya İçerik", detail: "Instagram, TikTok, YouTube için videolar" }
      ],
      images: [
        "/Afis-Hasan-Ekonomi/Sosyal-Medya-FormCure.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Dives.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Ebruli.jpg"
      ],
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Drone Çekimi",
      subtitle: "Havadan Görüntüleme Hizmetleri",
      description:
        "Havadan profesyonel video ve fotoğraf çekimi hizmetleri. İnşaat takibi, tanıtım filmleri, etkinlik çekimleri ve daha fazlası için drone çözümleri sunuyoruz.",
      items: [
        { name: "Havadan Tanıtım Filmi", detail: "Geniş açı, etkileyici görüntüler" },
        { name: "İnşaat & Arazi Takibi", detail: "Düzenli ilerleme kayıtları" },
        { name: "Otel & Tesis Çekimi", detail: "360° tespit panoramik görüntüleme" },
        { name: "Etkinlik & Düğün", detail: "Özel anlarınızı havadan ölümsüzleştirin" },
        { name: "Emlak Tanıtım", detail: "Gayrimenkul için etkileyici çekimler" },
        { name: "Spor & Yarış", detail: "Dinamik havadan takip çekimleri" }
      ],
      images: [
        "/Afis-Hasan-Ekonomi/Sosyal-Medya-FormCure.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Dives.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Ebruli.jpg"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "YouTube / Instagram Editleri",
      subtitle: "Profesyonel Video Düzenleme",
      description:
        "Sosyal medya platformları için optimize edilmiş, etkileyici video düzenleme hizmetleri. Renklendirme, ses düzenleme, efektler ve motion graphics ile içeriklerinizi öne çıkarın.",
      items: [
        { name: "YouTube Video Edit", detail: "Uzun format, intro/outro, altyazı" },
        { name: "Instagram Reels & Stories", detail: "Kısa, dinamik, trend içerikler" },
        { name: "TikTok Video Düzenleme", detail: "Viral içerik optimizasyonu" },
        { name: "Podcast Düzenleme", detail: "Ses düzenleme, görsel ekleme" },
        { name: "Motion Graphics", detail: "Animasyonlu grafikler ve efektler" },
        { name: "Renklendirme & Ses", detail: "Color grading ve ses mastering" }
      ],
      images: [
        "/Afis-Hasan-Ekonomi/Sosyal-Medya-FormCure.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Dives.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Ebruli.jpg"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Sosyal Medya Yönetimi",
      subtitle: "360° Dijital Medya Çözümleri",
      description:
        "Sosyal medya hesaplarınızın profesyonel yönetimi, içerik stratejisi, tasarım, paylaşım planlama ve raporlama hizmetleri. Markanızı dijital dünyada büyütüyoruz.",
      items: [
        { name: "İçerik Stratejisi", detail: "Marka odaklı içerik planlama" },
        { name: "Grafik Tasarım", detail: "Post, story, reel görselleri" },
        { name: "Düzenli Paylaşım", detail: "Planlı içerik yönetimi" },
        { name: "Community Management", detail: "Yorum ve mesaj yönetimi" },
        { name: "Reklam Kampanyaları", detail: "Instagram, Facebook, TikTok ads" },
        { name: "Analiz & Raporlama", detail: "Aylık performans raporları" }
      ],
      images: [
        "/Afis-Hasan-Ekonomi/Sosyal-Medya-FormCure.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Dives.jpg",
        "/A5-Tek-kırım-1/Sosyal-Medya-Ebruli.jpg"
      ],
      color: "from-green-500 to-teal-500"
    }
  ];

  const features = [
    { icon: "📱", title: "Tüm Platformlar", description: "Instagram, TikTok, YouTube, Facebook, LinkedIn için optimize içerik" },
    { icon: "🎬", title: "Profesyonel Ekipman", description: "4K kamera, drone, gimbal ve profesyonel aydınlatma ekipmanları" },
    { icon: "✨", title: "Yaratıcı İçerik", description: "Trend takibi ve özgün konseptlerle öne çıkan içerikler" },
    { icon: "📊", title: "Analiz & Strateji", description: "Veri odaklı içerik stratejisi ve performans takibi" },
    { icon: "⚡", title: "Hızlı Teslimat", description: "Acil içerikler için 24 saat içinde teslimat" },
    { icon: "🎯", title: "Hedef Kitle", description: "Doğru kitleye, doğru zamanda ulaşma garantisi" }
  ];

  return (
    <>
      

      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: "relative" }}>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-85"></div>
          <div className="absolute inset-0 bg-[url('/hizmetler-arka-plan/Sosyal-Medya.jpg')] bg-cover bg-center opacity-30"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
            <div className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-pink-600/20 to-purple-600/20 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-200">
                Sosyal Medya Çalışmaları
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin mb-8 leading-tight px-4">
              Profesyonel
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 font-bold bg-clip-text text-transparent">
                Sosyal Medya Ajansı
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Video çekiminden drone görüntülerine, profesyonel editten sosyal medya yönetimine kadar
              dijital dünyadaki tüm ihtiyaçlarınız için yanınızdayız
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a
                href="#hizmetler"
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Hizmetleri İncele
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Çalışmalarımızı Gör
              </a>
            </div>
          </div>
        </section>

        <section id="hizmetler" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
                Sosyal Medya Hizmetlerimiz
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Profesyonel ekip ve son teknoloji ekipmanlarla markanızı dijital dünyada zirveye taşıyoruz
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 sm:mb-16 px-4">
              {socialMediaServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 cursor-pointer rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${activeCategory === index
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white scale-105 shadow-lg"
                    : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                <div>
                  <div
                    className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${socialMediaServices[activeCategory].color} text-white text-xs sm:text-sm font-semibold mb-4`}
                  >
                    {socialMediaServices[activeCategory].subtitle}
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    {socialMediaServices[activeCategory].title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {socialMediaServices[activeCategory].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {socialMediaServices[activeCategory].items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 mt-2 flex-shrink-0"></div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{item.name}</h4>
                          <p className="text-xs sm:text-sm text-gray-400 break-words">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="/iletisim"
                    className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center text-sm sm:text-base"
                  >
                    Teklif Al
                  </a>
                  <a
                    href="#portfolio"
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 text-center text-sm sm:text-base"
                  >
                    Örnekleri Gör
                  </a>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {socialMediaServices[activeCategory].images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-xl sm:rounded-2xl overflow-hidden group ${idx === 0 ? "col-span-2 h-48 sm:h-64 md:h-80" : "h-40 sm:h-48 md:h-64"
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${socialMediaServices[activeCategory].title} görsel ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.nextElementSibling;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />

                      <div className={`absolute inset-0 hidden items-center justify-center bg-gradient-to-br ${socialMediaServices[activeCategory].color} opacity-30`}>
                        <div className="text-center p-4">
                          <div className="text-3xl sm:text-4xl md:text-5xl mb-3">🖼️</div>
                          <p className="text-sm text-gray-300">Görsel bulunamadı</p>
                          <p className="text-xs text-gray-400 mt-1">{img}</p>
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>

                <div
                  className={`absolute -z-10 -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-br ${socialMediaServices[activeCategory].color} rounded-full blur-3xl opacity-20`}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
                Çalışmalarımız
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">
                Başarılı sosyal medya projelerinden örnekler
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.image_path ? `${(process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr')}${item.image_path}` : item.image}
                      alt={item.alt || item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.nextElementSibling;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />

                    <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                      <div className="text-center p-4">
                        <div className="text-3xl sm:text-4xl md:text-5xl mb-3">📄</div>
                        <p className="text-sm text-gray-400">Görsel Yükleniyor...</p>
                      </div>
                    </div>

                    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex-col justify-end p-4 sm:p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.category && (
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                            {item.category}
                          </span>
                        )}
                        <h4 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-300 mb-3 line-clamp-2">
                          {item.description}
                        </p>

                        {Array.isArray(item.tags) && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {(item.client || item.year) && (
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                            <span className="text-xs text-gray-400">{item.client || ""}</span>
                            <span className="text-xs text-gray-400">{item.year || ""}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="md:hidden p-4 bg-gray-900/95 backdrop-blur-sm">
                    {item.category && (
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                        {item.category}
                      </span>
                    )}
                    <h4 className="text-base font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-gray-300 mb-2 line-clamp-2">{item.description}</p>

                    {Array.isArray(item.tags) && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {(item.client || item.year) && (
                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <span className="text-xs text-gray-400">{item.client || ""}</span>
                        <span className="text-xs text-gray-400">{item.year || ""}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - SEO Odaklı */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Sosyal Medya Yönetimi Fiyatları Neye Göre Belirlenir?
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                İhtiyaçlarınıza ve markanızın büyüklüğüne göre ölçeklenebilen, şeffaf fiyatlandırma politikamızla size en uygun paketi seçin. <strong>Sosyal medya yönetimi fiyatları</strong> hedef kitlenize ulaşmak için oluşturulacak içerik planının kapsamına göre değişmektedir.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
              {/* Başlangıç Paketi */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-pink-500/50 transition-all">
                <h3 className="text-2xl font-bold mb-2 text-white">Başlangıç Paketi</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">Temel marka bilinirliği ve düzenli sosyal medya varlığı arayanlar için.</p>
                <div className="text-4xl font-bold mb-6 text-pink-400">Teklif Alın</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-pink-400">✓</span> <span>Haftalık Belirli Post/Gönderi Sayısı</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-pink-400">✓</span> <span>Standart Hikaye (Story) Tasarımları</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-pink-400">✓</span> <span>Sayfa Düzeni ve Optimizasyonu</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-pink-400">✓</span> <span>Temel Düzey Takipçi Etkileşimi</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-pink-400">✓</span> <span>Aylık Performans Özeti</span></li>
                </ul>
                <a href="/iletisim" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-center rounded-lg font-semibold transition-all text-white">İletişime Geç</a>
              </div>

              {/* Profesyonel Paket */}
              <div className="bg-gradient-to-b from-pink-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-pink-500 hover:scale-105 transition-all relative mt-8 md:mt-0">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 rounded-full text-sm font-bold">En Çok Tercih Edilen</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Profesyonel Paket</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">Etkileşim ve büyüme odaklı, düzenli içerik üretimi isteyen markalar için.</p>
                <div className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Teklif Alın</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-purple-400">✓</span> <span>Profesyonel Görsel ve Video/Reels Üretimi</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-purple-400">✓</span> <span>Kapsamlı İçerik ve Takvim Planlaması</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-purple-400">✓</span> <span>Rakip Analizi ve Strateji Geliştirme</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-purple-400">✓</span> <span>Özel Kampanya Yönetimi (Çekiliş vs.)</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-purple-400">✓</span> <span>Detaylı Aylık Raporlama</span></li>
                </ul>
                <a href="/iletisim" className="block w-full py-3 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 text-center rounded-lg font-semibold transition-all text-white">İletişime Geç</a>
              </div>

              {/* Kurumsal Paket */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all mt-8 md:mt-0">
                <h3 className="text-2xl font-bold mb-2 text-white">Kapsamlı Ajans Hizmeti</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">Tam entegre dijital iletişim ve reklam yönetimine ihtiyaç duyanlar için.</p>
                <div className="text-4xl font-bold mb-6 text-blue-400">Teklif Alın</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-blue-400">✓</span> <span>Sınırsız Kreatif Tasarım ve Paylaşım</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-blue-400">✓</span> <span>Sponsorlu Reklam (Ads) Bütçe Yönetimi</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-blue-400">✓</span> <span>Gelişmiş Etkileşim ve Kriz Yönetimi</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-blue-400">✓</span> <span>Tüm Sosyal Mecraların Eşzamanlı Yönetimi</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-blue-400">✓</span> <span>Yerinde Fotoğraf ve Video Prodüksiyon Desteği</span></li>
                </ul>
                <a href="/iletisim" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-center rounded-lg font-semibold transition-all text-white">İletişime Geç</a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
                Neden MFO Creative?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 sm:p-8 bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-105"
                >
                  <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTA 
          title="Sosyal Medyada Fark Yaratın" 
          description="Ücretsiz sosyal medya danışmanlığı için bizimle iletişime geçin. Dijital dünyada markanızı birlikte büyütelim!" 
        />
      </div>
    </>
  );
}

