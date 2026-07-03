"use client";
import Head from 'next/head';
import Link from 'next/link';
import CTA from '@/components/CTA';
import { useState, useEffect } from 'react';

import portfoy from "@/data/portfoy.json";
import { getProductsByTur } from '@/server';

export default function TasarimHizmetleri() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [visibleItems, setVisibleItems] = useState(9);
  const [selectedCategory, setSelectedCategory] = useState("tasarim");
  const [filteredData, setFiltredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByTur("tasarim")
      .then(setFiltredData)
      .catch((e) => {
        console.warn("Backend verisi alınamadı, yerel veri kullanılıyor:", e);
        // Hata durumunda yerel JSON verisini kullan
        const localData = portfoy.filter(item => {
          const tur = item?.tur;
          if (Array.isArray(tur)) return tur.includes("tasarim");
          if (typeof tur === "string") return tur.includes("tasarim");
          return false;
        });
        setFiltredData(localData);
      })
      .finally(() => setLoading(false));
  }, []);



  const designServices = [
    {
      title: "Kitap Tasarımı",
      subtitle: "Profesyonel Kitap & Yayın Tasarımı",
      description: "Roman, hikaye, şiir, ansiklopedi ve her türlü yayın için profesyonel kitap tasarımı. Kapak tasarımı, iç sayfa düzeni, tipografi ve baskıya hazırlık hizmetleri sunuyoruz.",
      items: [
        { name: "Kapak Tasarımı", detail: "Etkileyici, satışa yönelik kapak tasarımları" },
        { name: "İç Sayfa Düzeni", detail: "Okunabilir, estetik sayfa tasarımı" },
        { name: "Tipografi & Mizanpaj", detail: "Profesyonel yazı düzeni ve hizalama" },
        { name: "İllüstrasyon", detail: "Özel çizimler ve görseller" },
        { name: "E-Kitap Tasarımı", detail: "Dijital yayınlar için format" },
        { name: "Baskıya Hazırlık", detail: "PDF, CMYK dönüşüm ve kontrol" }
      ],
      images: [
        "/Afis-Hasan-Ekonomi/Kitap-Kasif-1.jpg",
        "/Afis-Hasan-Ekonomi/Kitap-Nuriye-1.jpg",
        "/Afis-Hasan-Ekonomi/Kitap-Kasif-4.jpg"
      ],
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Dergi Tasarımı",
      subtitle: "Modern Dergi & Katalog Tasarımı",
      description: "Kurumsal dergiler, kataloglar, e-dergiler ve periyodik yayınlar için profesyonel tasarım hizmetleri. Marka kimliğinize uygun, estetik ve işlevsel tasarımlar.",
      items: [
        { name: "Dergi Kapak Tasarımı", detail: "Dikkat çekici kapak konseptleri" },
        { name: "İç Sayfa Layoutu", detail: "Grid sistemi ve sayfa düzeni" },
        { name: "Kurumsal Katalog", detail: "Ürün katalogu ve lookbook" },
        { name: "E-Dergi Tasarımı", detail: "İnteraktif dijital dergiler" },
        { name: "İnfografik", detail: "Veri görselleştirme ve grafikler" },
        { name: "Template Oluşturma", detail: "Yeniden kullanılabilir şablonlar" }
      ],
      images: [
        "/Afis-Hasan-Ekonomi/Dergi-Kasif-1.jpg",
        "/Afis-Hasan-Ekonomi/Dergi-Kasif-2.jpg",
        "/Afis-Hasan-Ekonomi/Dergi-Kasif-3.jpg"
      ],
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "İlan – Broşür Tasarımı",
      subtitle: "Tanıtım Materyali Tasarımı",
      description: "Broşür, flyer, afiş, katalog ve her türlü tanıtım materyali için yaratıcı tasarım çözümleri. Markanızı etkili şekilde tanıtan, dikkatleri çeken tasarımlar.",
      items: [
        { name: "Broşür Tasarımı", detail: "2-3-4 katlı broşür tasarımları" },
        { name: "Flyer & El İlanı", detail: "A4, A5 tanıtım materyalleri" },
        { name: "Afiş Tasarımı", detail: "Her boyutta poster tasarımı" },
        { name: "Billboard & Raket", detail: "Açık hava reklam tasarımları" },
        { name: "Roll-Up Banner", detail: "Etkinlik ve fuar banner'ları" },
        { name: "Kartvizit", detail: "Özel kesim, premium kartvizit" }
      ],
      images: [
        "/Afis-Hasan-Ekonomi/Brosur-Robomower.jpg",
        "/Afis-Hasan-Ekonomi/Brosur-Iwise.jpg",
        "/Afis-Hasan-Ekonomi/Brosur-Kitap-Sarayi.jpg"
      ],
      color: "from-green-500 to-emerald-500"
    }
  ];

  const features = [
    {
      icon: "🎨",
      title: "Yaratıcı Tasarım",
      description: "Özgün, markanıza özel tasarım konseptleri"
    },
    {
      icon: "📐",
      title: "Profesyonel Düzen",
      description: "Grid sistemi, tipografi ve görsel hiyerarşi"
    },
    {
      icon: "🖨️",
      title: "Baskıya Hazır",
      description: "CMYK, PDF/X-1a formatında teslim"
    },
    {
      icon: "⚡",
      title: "Hızlı Teslimat",
      description: "Acil işler için 24-48 saat içinde teslim"
    },
    {
      icon: "🔄",
      title: "Sınırsız Revizyon",
      description: "Memnun kalana kadar ücretsiz düzeltme"
    },
    {
      icon: "✨",
      title: "Yüksek Kalite",
      description: "300 DPI, vektörel grafik ve kaliteli görseller"
    }
  ];


  const loadMoreItems = () => {
    setVisibleItems(prev => prev + 9);
  };

  const displayedItems = filteredData.slice(0, visibleItems);
  const hasMore = visibleItems < filteredData.length;

  return (
    <>
      

      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-85"></div>

          <div className="absolute inset-0 bg-[url('/hizmetler-arka-plan/tasarimhizmetleribg.jpeg')] bg-cover bg-center opacity-30"></div>

          <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6">
            <div className="inline-block mb-6 px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-300">
                Tasarım Hizmetleri
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-thin mb-6 leading-tight px-4">
              Profesyonel
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text font-bold text-transparent">
                Grafik Tasarım Ajansı
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Kitap tasarımından dergi layoutuna, broşürden ilana kadar
              tüm yayın ve tanıtım materyalleriniz için profesyonel tasarım hizmetleri
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a
                href="#hizmetler"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">Tasarım Hizmetlerimiz</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Adobe InDesign, Illustrator ve Photoshop ile profesyonel, baskıya hazır tasarımlar
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-12 sm:mb-16 px-4">
              {designServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold cursor-pointer transition-all duration-300 text-xs sm:text-sm md:text-base ${activeCategory === index
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white scale-105 shadow-lg'
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
                  <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${designServices[activeCategory].color} text-white text-xs sm:text-sm font-semibold mb-4`}>
                    {designServices[activeCategory].subtitle}
                  </div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    {designServices[activeCategory].title}
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {designServices[activeCategory].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {designServices[activeCategory].items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 mt-2 flex-shrink-0"></div>
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
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 text-center text-sm sm:text-base"
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
                  {designServices[activeCategory].images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative rounded-xl sm:rounded-2xl overflow-hidden group ${idx === 0 ? 'col-span-2 h-48 sm:h-64 md:h-80' : 'h-40 sm:h-48 md:h-64'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`${designServices[activeCategory].title} ${idx + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
                <div className={`absolute -z-10 -top-10 -right-10 w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 bg-gradient-to-br ${designServices[activeCategory].color} rounded-full blur-3xl opacity-20`}></div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">Çalışmalarımız</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">
                Başarılı tasarım projelerinden örnekler
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
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
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

                        <p className="text-xs sm:text-sm text-gray-300 mb-3 line-clamp-2">{item.description}</p>

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

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <span className="text-xs text-gray-400">{item.client}</span>
                      <span className="text-xs text-gray-400">{item.year}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMoreItems}
                  className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105"
                >
                  Daha Fazla Göster
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Pricing Section - SEO Odaklı */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Grafik Tasarım Fiyatları Neye Göre Belirlenir?
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                İhtiyaçlarınıza ve markanızın büyüklüğüne göre ölçeklenebilen, şeffaf fiyatlandırma politikamızla size en uygun paketi seçin. <strong>Grafik tasarım fiyatları</strong> tasarımın niteliğine, sayfa sayısına ve teslim süresine göre değişmektedir.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
              {/* Başlangıç Paketi */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/50 transition-all">
                <h3 className="text-2xl font-bold mb-2 text-white">Standart Tasarım</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">Etkinlik bazlı veya tekil tasarım ihtiyaçları olanlar için.</p>
                <div className="text-4xl font-bold mb-6 text-amber-400">Teklif Alın</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-amber-400">✓</span> <span>Tekil Afiş / Broşür Tasarımı</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-amber-400">✓</span> <span>Sosyal Medya İçin Tekli Görsel</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-amber-400">✓</span> <span>Temel İllüstrasyon Desteği</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-amber-400">✓</span> <span>Hızlı Teslimat (1-3 İş Günü)</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-amber-400">✓</span> <span>Dijital ve Baskı İçin Format Teslimi</span></li>
                </ul>
                <a href="/iletisim" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-center rounded-lg font-semibold transition-all text-white">İletişime Geç</a>
              </div>

              {/* Profesyonel Paket */}
              <div className="bg-gradient-to-b from-amber-600/20 to-orange-600/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-500 hover:scale-105 transition-all relative mt-8 md:mt-0">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 rounded-full text-sm font-bold">En Çok Tercih Edilen</div>
                <h3 className="text-2xl font-bold mb-2 text-white">Kurumsal Yayın Tasarımı</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">Katalog, dergi ve kitapçık gibi çok sayfalı tasarımlar arayanlar için.</p>
                <div className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Teklif Alın</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Katalog / Dergi / Bülten Mizanpajı</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Özgün İç Sayfa Düzeni (Layout)</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Profesyonel İnfografik Desteği</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Matbaaya Hazır (CMYK) PDF Hazırlığı</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Genişletilmiş Revizyon Hakkı</span></li>
                </ul>
                <a href="/iletisim" className="block w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90 text-center rounded-lg font-semibold transition-all text-white">İletişime Geç</a>
              </div>

              {/* Kurumsal Paket */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-orange-500/50 transition-all mt-8 md:mt-0">
                <h3 className="text-2xl font-bold mb-2 text-white">Aylık Tasarım Desteği</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">Sürekli ve kurumsal standartlara uygun görsel desteğe ihtiyaç duyanlar için.</p>
                <div className="text-4xl font-bold mb-6 text-orange-400">Teklif Alın</div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Aylık Belirlenen Tasarım Kotası (Afiş, İlan vb.)</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Kurumsal Marka Kimliği Tutarlılığı</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Taleplerde Hızlı Önceliklendirme</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>E-bülten / Mailing Tasarımları</span></li>
                  <li className="flex items-start gap-3 text-gray-300"><span className="text-orange-400">✓</span> <span>Tüm Kaynak (Vektörel) Dosya Teslimi</span></li>
                </ul>
                <a href="/iletisim" className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-center rounded-lg font-semibold transition-all text-white">İletişime Geç</a>
              </div>
            </div>
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

        <CTA 
          title="Tasarım Projenize Başlayalım" 
          description="Ücretsiz tasarım danışmanlığı için bizimle iletişime geçin. Profesyonel tasarımlarla fark yaratın!" 
        />
      </div>
    </>
  );
}


