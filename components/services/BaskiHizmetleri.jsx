"use client";
import { useState, useEffect } from 'react';

import portfoy from "@/data/portfoy.json";

import { log } from 'three';
import { getProductsByTur } from '@/server';

export default function BaskiHizmetleri() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleItems, setVisibleItems] = useState(8);
  const [filteredData, setFiltredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByTur("baski")
      .then(setFiltredData)
      .catch((e) => {
        console.warn("Backend verisi alınamadı, yerel veri kullanılıyor:", e);
        // Hata durumunda yerel JSON verisini kullan, finally'nin beklemesi için return et
        const localData = portfoy.filter(item => {
          const tur = item?.tur;
          if (Array.isArray(tur)) return tur.includes("baski");
          if (typeof tur === "string") return tur.includes("baski");
          return false;
        });
        setFiltredData(localData);
      })
      .finally(() => setLoading(false));
  }, []);

  const printServices = [
    {
      title: "Tanıtım Materyali Baskıları",
      subtitle: "Markanızı En İyi Şekilde Yansıtın",
      description: "Kurumsal kimliğinizi güçlendiren, profesyonel tasarım ve yüksek kaliteli baskı çözümleri. Broşürden kataloga, afişten amerikan servise kadar tüm tanıtım materyallerinizi üretiyoruz.",
      items: [
        { name: "Broşür Tasarım & Baskı", detail: "Katlamalı, kapsamlı ürün tanıtımları" },
        { name: "Katalog Baskı", detail: "Profesyonel ciltli, yüksek gramajlı" },
        { name: "Afiş & Poster", detail: "Her boyutta, mat veya parlak" },
        { name: "Amerikan Servis", detail: "Restoranlar için özel tasarım" },
        { name: "Kartvizit", detail: "Premium kağıt, özel kesim" },
        { name: "Flyer & El İlanı", detail: "Hızlı üretim, uygun fiyat" }
      ],
      images: [
        "/A5-Tek-kırım-1/Bro焷r-Dr-Burcu.jpg",
        "/A5-Tek-kırım-1/Katalog-Capsule-3.jpg",
        "/A5-Tek-kırım-1/Katalog-Zenyat.jpg",
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Promosyon Ürünleri",
      subtitle: "Markanızı Hayatın Her Alanına Taşıyın",
      description: "Kurumsal hediye ve promosyon ürünlerinde özel baskı ve tasarım hizmetleri. Kaliteli malzemeler, dayanıklı baskı teknolojileri ile markanızı öne çıkarın.",
      items: [
        { name: "T-shirt & Tekstil Baskı", detail: "DTG, Serigrafi, Transfer" },
        { name: "Kupa & Bardak Baskı", detail: "Seramik, cam, termos" },
        { name: "Kalem & Ajanda", detail: "Metal, plastik, deri seçenekler" },
        { name: "Çanta & Bez Torba", detail: "Pamuk, kanvas, non-woven" },
      ],
      images: [
        "/A5-Tek-kırım-1/Cepli-Dosya-Erenler-Anaokulu.jpg",
        "/A5-Tek-kırım-1/Cepli-Dosya-Dr-Nur焌h.jpg",
        "/A5-Tek-kırım-1/Kurumsal Kimlik-Eva Stote-2.png",
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Kitap & Yayın Baskıları",
      subtitle: "Eserlerinize Profesyonel Dokunuş",
      description: "Kitap, dergi, ansiklopedi ve kurumsal yayınlarınız için profesyonel ofset ve dijital baskı hizmetleri. Cilt seçenekleri, kaliteli kağıt ve renk kalitesiyle fark yaratın.",
      items: [
        { name: "Ciltli Kitap", detail: "Sert kapak, iplik dikiş" },
        { name: "Karton Kapak Kitap", detail: "Ekonomik, dayanıklı" },
        { name: "Dergi & Broşür", detail: "Periyodik yayınlar" },
        { name: "Ansiklopedi", detail: "Çok ciltli, lüks cilt" },
        { name: "Kurumsal Katalog", detail: "Premium kağıt, özel cilt" },
        { name: "Yıllık & Rapor", detail: "Profesyonel sunum" }
      ],
      images: [
        "/A5-Tek-kırım-1/Bro焷r-Dr-Burcu.jpg",
        "/A5-Tek-kırım-1/Katalog-Capsule-4.jpg",
        "/A5-Tek-kırım-1/Bro焷r-1.jpg"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Günlük Tüketim Ürünleri",
      subtitle: "Paketleme & Ambalaj Çözümleri",
      description: "Restoranlar, kafeler, butikler için özel tasarım ambalaj ve paketleme ürünleri. Kumaş baskıdan kağıt çantaya, tüm günlük ihtiyaçlarınız için çözümler.",
      items: [
        { name: "Kumaş Baskı", detail: "Dijital tekstil, serigrafi" },
        { name: "Kağıt Çanta", detail: "Kraft, beyaz, özel boyut" },
        { name: "Hamburger Kağıdı", detail: "Yağ geçirmez, özel baskı" },
        { name: "Paketleme Kağıtları", detail: "Fast-food, market, butik" },
        { name: "Peçete & Mendil", detail: "Logo baskılı, renkli" },
        { name: "Karton Bardak", detail: "Sıcak-soğuk içecek" }
      ],
      images: [
        "/baskihizmetleri/kitap-yayin/brosur3.jpeg",
        "/baskihizmetleri/kitap-yayin/brosur4.jpeg",
        "/baskihizmetleri/kitap-yayin/brosur.jpeg",
      ],
      color: "from-green-500 to-teal-500"
    }
  ];



  const features = [
    {
      icon: "🚀",
      title: "Hızlı Üretim",
      description: "Acil işleriniz için 24-48 saat express üretim"
    },
    {
      icon: "🎨",
      title: "Tasarım Desteği",
      description: "Profesyonel grafik tasarım ekibimizle ücretsiz tasarım desteği"
    },
    {
      icon: "⚡",
      title: "Son Teknoloji",
      description: "Dijital ofset, UV baskı, laminasyon ve özel kesim teknolojileri"
    },
    {
      icon: "✓",
      title: "Kalite Garantisi",
      description: "ISO sertifikalı üretim, %100 müşteri memnuniyeti"
    },
    {
      icon: "💰",
      title: "Uygun Fiyat",
      description: "Toplu sipariş indirimleri, esnek ödeme seçenekleri"
    },
    {
      icon: "🌍",
      title: "Tüm Türkiye'ye",
      description: "Hızlı ve güvenli kargo, ücretsiz teslimat seçenekleri"
    }
  ];



  // Filtrelenmiş items
  const filteredItems = filteredData.filter(item =>
    activeFilter === 'all' ||
    item.category.toLowerCase().includes(activeFilter.toLowerCase())
  );

  // Gösterilecek items
  const displayedItems = filteredItems.slice(0, visibleItems);

  // Daha fazla göster fonksiyonu
  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 8);
  };

  // Filtre değiştiğinde visible items'ı sıfırla
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setVisibleItems(8);
  };
  console.log("PORTFOY:", portfoy);

  const broken = portfoy.filter(x => x?.tur === undefined);
  console.log("TUR EKSİK:", broken.length, broken);

  return (
    <>
      

      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-85"></div>
          <div className="absolute inset-0 bg-[url('/hizmetler-arka-plan/baskihizmetleri__Arka.jpeg')] bg-cover bg-center opacity-30"></div>
          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
            <div className="inline-block mb-6 px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-300">
                Baskı Hizmetleri
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thin mb-6 leading-tight px-4">
              Kaliteli Baskı
              <br />
              <span className="bg-gradient-to-r font-bold from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Güçlü Marka
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Tanıtım materyallerinden promosyon ürünlerine, kitap baskısından ambalaj çözümlerine kadar
              tüm ihtiyaçlarınız için profesyonel baskı hizmetleri
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a
                href="#hizmetler"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover:scale-105 shadow-2xl text-sm sm:text-base"
              >
                Hizmetleri İncele
              </a>
              <a
                href="#portfolio"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm sm:text-base"
              >
                Çalışmalarımızı Gör
              </a>
            </div>
          </div>
        </section>

        <section id="hizmetler" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">Baskı Hizmetlerimiz</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Modern teknoloji, uzman ekip ve kaliteli malzemelerle hayalinizdeki çalışmaları hayata geçiriyoruz
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 sm:mb-16 px-4">
              {printServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`px-4 cursor-pointer sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${activeCategory === index
                    ? 'bg-white text-black scale-105 shadow-lg'
                    : 'bg-white/5 text-white hover:bg-white/10'
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                <div>
                  <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${printServices[activeCategory].color} text-white text-xs sm:text-sm font-semibold mb-4`}>
                    {printServices[activeCategory].subtitle}
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    {printServices[activeCategory].title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {printServices[activeCategory].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {printServices[activeCategory].items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mt-2 flex-shrink-0"></div>
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
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center text-sm sm:text-base"
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
                  {printServices[activeCategory].images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-xl sm:rounded-2xl overflow-hidden group ${idx === 0 ? 'col-span-2 h-48 sm:h-64 md:h-80' : 'h-40 sm:h-48 md:h-64'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${printServices[activeCategory].title} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Image failed to load:', img);
                          e.target.style.display = 'none';
                          if (e.target.nextElementSibling) {
                            e.target.nextElementSibling.style.display = 'flex';
                          }
                        }}
                        onLoad={(e) => {
                          console.log('Image loaded successfully:', img);
                        }}
                      />
                      <div
                        className={`absolute inset-0 w-full h-full bg-gradient-to-br ${printServices[activeCategory].color} opacity-20 hidden items-center justify-center`}
                      >
                        <div className="text-center">
                          <div className="text-2xl sm:text-3xl md:text-4xl mb-2">📸</div>
                          <p className="text-xs sm:text-sm text-gray-400">Çalışma {idx + 1}</p>
                          <p className="text-[10px] text-gray-500 mt-1">{img}</p>
                        </div>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
                <div className={`absolute -z-10 -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-br ${printServices[activeCategory].color} rounded-full blur-3xl opacity-20`}></div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
                Çalışmalarımız
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">
                Gerçekleştirdiğimiz bazı başarılı projelerden örnekler
              </p>


            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.image_path ? `${(process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr')}${item.image_path}` : item.image}
                      alt={item.alt || item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextElementSibling.style.display = "flex";
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
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                          {item.category}
                        </span>

                        <h4 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h4>

                        <p className="text-xs sm:text-sm text-gray-300 mb-3 line-clamp-2">
                          {item.description}
                        </p>

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

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                          <span className="text-xs text-gray-400">{item.client}</span>
                          <span className="text-xs text-gray-400">{item.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:hidden p-4 bg-gray-900/95 backdrop-blur-sm">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                      {item.category}
                    </span>

                    <h4 className="text-base font-bold mb-2">{item.title}</h4>

                    <p className="text-xs text-gray-300 mb-2 line-clamp-2">{item.description}</p>

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

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-xs text-gray-400">{item.client}</span>
                      <span className="text-xs text-gray-400">{item.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleItems < filteredItems.length && (
              <div className="text-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  Daha Fazla Çalışma Gör
                </button>
              </div>
            )}
          </div>
        </section>


        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">Neden MFO Creative?</h2>
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

        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>

              <div className="relative p-8 sm:p-12 md:p-16 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                  Projenize Hemen Başlayalım
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Ücretsiz danışmanlık ve fiyat teklifi için bizimle iletişime geçin.
                  Ekibimiz size en uygun çözümü sunmak için hazır.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/iletisim"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl text-sm sm:text-base"
                  >
                    İletişime Geç
                  </a>
                  <a
                    href="tel:+905322558980"
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 text-sm sm:text-base"
                  >
                    📞 Hemen Ara
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


