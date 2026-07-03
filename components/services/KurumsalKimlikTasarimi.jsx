"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CTA from '@/components/CTA';

import portfoyData from '@/data/portfoy.json';
import { getProductsByTur } from '@/server';

export default function KurumsalKimlikTasarimi() {
  const [activeTab, setActiveTab] = useState(0);
  const [visibleItems, setVisibleItems] = useState(9);
  const [filteredData, setFiltredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const kimlikPortfolio = (portfoyData ?? []).filter((item) => {
    const tur = item?.tur;
    if (Array.isArray(tur)) return tur.includes("kimlik");
    if (typeof tur === "string") return tur.includes("kimlik");
    return false;
  });

  useEffect(() => {
    getProductsByTur("kimlik")
      .then(setFiltredData)
      .catch((e) => {
        console.warn("Backend verisi alınamadı, yerel veri kullanılıyor:", e);
        // Hata durumunda yerel JSON verisini kullan
        const localData = (portfoyData ?? []).filter((item) => {
          const tur = item?.tur;
          if (Array.isArray(tur)) return tur.includes("kimlik");
          if (typeof tur === "string") return tur.includes("kimlik");
          return false;
        });
        setFiltredData(localData);
      })
      .finally(() => setLoading(false));
  }, []);
  const brandingServices = [
    {
      icon: "🎨",
      title: "Logo Tasarımı",
      description: "Markanızı en iyi temsil eden, özgün ve akılda kalıcı logo tasarımları"
    },
    {
      icon: "📋",
      title: "Kurumsal Kimlik Kılavuzu",
      description: "Marka kullanım standartları, renkler, tipografi ve uygulama örnekleri"
    },
    {
      icon: "📄",
      title: "Kırtasiye Tasarımı",
      description: "Kartvizit, antetli kağıt, zarf, klasör ve tüm ofis malzemeleri"
    },
    {
      icon: "🎯",
      title: "Marka Rehberi",
      description: "Logo kullanımı, renk paleti, font seçimi ve görsel dil standartları"
    },
    {
      icon: "🖼️",
      title: "Sosyal Medya Kimlikleri",
      description: "Profil görselleri, kapak fotoğrafları ve post şablonları"
    },
    {
      icon: "📦",
      title: "Ambalaj Tasarımı",
      description: "Ürün ambalajı, etiket ve paket tasarım çözümleri"
    }
  ];

  const portfolioCategories = [
    { id: 0, name: "Tümü" },
    { id: 1, name: "Logo" },
    { id: 2, name: "Kırtasiye" },
    { id: 3, name: "Marka Kimligi" }
  ];

  const brandElements = [
    {
      category: "Logo & Sembol",
      items: [
        "Ana Logo Tasarımı",
        "Logo Varyasyonları",
        "Sembol/İkon Tasarımı",
        "Favicon",
        "Mühür/Damga"
      ]
    },
    {
      category: "Renk & Tipografi",
      items: [
        "Kurumsal Renk Paleti",
        "Yardımcı Renkler",
        "Tipografi Seçimi",
        "Font Hiyerarşisi",
        "Renk Kullanım Kuralları"
      ]
    },
    {
      category: "Kırtasiye & Dokümanlar",
      items: [
        "Kartvizit Tasarımı",
        "Antetli Kağıt",
        "Zarf Tasarımı",
        "Klasör & Dosya",
        "Teklif Dosyası"
      ]
    },
    {
      category: "Dijital Kimlik",
      items: [
        "Web Sitesi Kimligi",
        "Sosyal Medya Görselleri",
        "E-posta İmzası",
        "Dijital Kartvizit",
        "Prezentasyon Şablonu"
      ]
    }
  ];

  const designProcess = [
    {
      step: "01",
      title: "Keşif & Analiz",
      description: "Markanızı, sektörünüzü ve hedef kitlenizi derinlemesine analiz ediyoruz",
      icon: "🔍"
    },
    {
      step: "02",
      title: "Konsept Geliştirme",
      description: "Farklı konseptler ve yaratıcı fikirler sunuyoruz",
      icon: "💡"
    },
    {
      step: "03",
      title: "Tasarım & Uygulama",
      description: "Seçilen konsepti detaylı şekilde tasarlıyoruz",
      icon: "🎨"
    },
    {
      step: "04",
      title: "Kılavuz & Teslim",
      description: "Kullanım kılavuzu ile birlikte tüm dosyaları teslim ediyoruz",
      icon: "📦"
    }
  ];

  const filteredPortfolio = activeTab === 0
    ? kimlikPortfolio
    : kimlikPortfolio.filter(item => {
      if (activeTab === 1) return item.title.toLowerCase().includes('logo');
      if (activeTab === 2) return item.title.toLowerCase().includes('kartvizit') ||
        item.title.toLowerCase().includes('kırtasiye');
      if (activeTab === 3) return item.category === 'Kurumsal Kimlik';
      return true;
    });

  const displayedItems = filteredPortfolio.slice(0, visibleItems);
  const hasMore = visibleItems < filteredPortfolio.length;

  const loadMoreItems = () => {
    setVisibleItems(prev => prev + 9);
  };

  return (
    <>
      

      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>
        <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-85"></div>

          <div className="absolute inset-0 bg-[url('/hizmetler-arka-plan/kurumsalkimlikbg.jpeg')] bg-cover bg-center opacity-30"></div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 border-4 border-blue-500 rotate-45"></div>
            <div className="absolute top-40 right-20 w-24 h-24 border-4 border-purple-500 rounded-full"></div>
            <div className="absolute bottom-20 left-1/4 w-20 h-20 border-4 border-pink-500"></div>
          </div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
            <div className="inline-block mb-8 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-full border border-blue-500/30">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-blue-400">
                Kurumsal Kimlik Tasarımı
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-thin mb-8 leading-tight px-4">
              Profesyonel
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 font-bold bg-clip-text text-transparent">
                Kurumsal Kimlik Tasarımı
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Logo tasarımından kurumsal kimlik kılavuzuna, kırtasiye tasarımından dijital kimliklere kadar
              markanızı güçlendirecek profesyonel tasarım hizmetleri
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <a
                href="#hizmetler"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Hizmetlerimizi İnceleyin
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Portföyümüzü Görün
              </a>
            </div>
          </div>
        </section>


        <section id="hizmetler" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Kurumsal Kimlik Hizmetlerimiz
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Markanızı güçlendirecek kapsamlı kimlik tasarım çözümleri
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brandingServices.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Kurumsal Kimlik Paketinde Neler Var?
              </h2>
              <p className="text-lg sm:text-xl text-gray-400">
                Kapsamlı kimlik tasarımı ile markanızı her alanda temsil edin
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandElements.map((element, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-xl font-bold mb-4 text-blue-400">
                    {element.category}
                  </h3>
                  <ul className="space-y-3">
                    {element.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <span className="text-purple-400 mt-1">✓</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Tasarım Sürecimiz
              </h2>
              <p className="text-lg sm:text-xl text-gray-400">
                4 adımda profesyonel kurumsal kimlik tasarımı
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {designProcess.map((process, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-500/50 to-purple-500/50"></div>
                  )}

                  <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:scale-105 transition-all duration-300">
                    <div className="text-5xl mb-4">{process.icon}</div>
                    <div className="text-4xl font-bold mb-2 text-blue-400">{process.step}</div>
                    <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{process.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Kimlik Tasarım Portföyümüz
              </h2>
              <p className="text-lg sm:text-xl text-gray-400">
                Başarılı kurumsal kimlik projelerinden örnekler
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedItems.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer bg-gray-900"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={item.image_path ? `${(process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr')}${item.image_path}` : item.image}
                        alt={item.alt || item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
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
                          {item.category && (
                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                              {item.category}
                            </span>
                          )}

                          <h4 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h4>

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

                    <div className="md:hidden p-4 bg-gray-900/95 backdrop-blur-sm">
                      {item.category && (
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full mb-2">
                          {item.category}
                        </span>
                      )}

                      <h4 className="text-base font-bold mb-2">{item.title}</h4>

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
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">
                    Bu kategoride henüz çalışma bulunmamaktadır.
                  </p>
                </div>
              )}
            </div>

            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreItems}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Daha Fazla Gör
                </button>
              </div>
            )}
          </div>
        </section>


        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Neden Bizimle Çalışmalısınız?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🎯",
                  title: "Stratejik Yaklaşım",
                  description: "Sektör analizi ve hedef kitle araştırması ile stratejik tasarım"
                },
                {
                  icon: "✨",
                  title: "Özgün Tasarım",
                  description: "Markanıza özel, benzersiz ve akılda kalıcı kimlik çözümleri"
                },
                {
                  icon: "📐",
                  title: "Profesyonel Standartlar",
                  description: "Vektörel, yüksek çözünürlüklü ve baskıya hazır dosyalar"
                },
                {
                  icon: "📖",
                  title: "Detaylı Kılavuz",
                  description: "Kapsamlı kullanım kılavuzu ve uygulama örnekleri"
                },
                {
                  icon: "🔄",
                  title: "Sınırsız Revizyon",
                  description: "Memnun kalana kadar ücretsiz revizyon hakkı"
                },
                {
                  icon: "🎁",
                  title: "Ek Dosyalar",
                  description: "Tüm format seçenekleri ve kaynak dosyalar dahil"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl hover:from-blue-600/20 hover:to-purple-600/20 transition-all duration-300 border border-blue-500/20 hover:scale-105"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA 
          title="Markanıza Güçlü Bir Kimlik Kazandırın" 
          description="Ücretsiz danışmanlık ve kurumsal kimlik teklifi için bizimle iletişime geçin. Markanızı birlikte inşa edelim!" 
        />
      </div>
    </>
  );
}


