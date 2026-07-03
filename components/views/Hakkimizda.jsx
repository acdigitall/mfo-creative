"use client";
import Head from 'next/head';
import Link from 'next/link';
import CTA from '@/components/CTA';


export default function Hakkimizda() {
  const values = [
    {
      title: 'Yaratıcılık',
      description: 'Her projede yenilikçi ve özgün çözümler üretiyoruz. Sıradanlıktan uzak, akılda kalıcı işler yapıyoruz.',
      icon: '✨',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Kalite',
      description: 'En yüksek standartlarda iş çıkarıyor, mükemmellik peşinde koşuyoruz. Detaylara önem veriyoruz.',
      icon: '🎯',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'İnovasyon',
      description: 'Teknolojinin en son imkanlarını kullanarak geleceği şekillendiriyoruz. Sürekli yeniliğe açığız.',
      icon: '🚀',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      title: 'Güven',
      description: 'Müşterilerimizle uzun vadeli, güvenilir ilişkiler kuruyoruz. Şeffaflık ve dürüstlük önceliğimiz.',
      icon: '🤝',
      gradient: 'from-orange-500 to-red-500'
    },
  ];

  const team = [
    {
      role: 'Tasarım Ekibi',
      description: 'Grafik tasarım, marka kimliği ve görsel iletişim konularında uzman yaratıcı ekibimiz.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      role: 'Yazılım Ekibi',
      description: 'Modern teknolojilerle web ve mobil uygulama geliştiren deneyimli yazılımcılarımız.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      role: 'Prodüksiyon Ekibi',
      description: 'Video çekimi, kurgu ve post-prodüksiyon süreçlerini yöneten profesyonel ekibimiz.',
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      role: 'Dijital Pazarlama',
      description: 'Sosyal medya yönetimi ve dijital strateji konusunda uzman pazarlama ekibimiz.',
      gradient: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <>
      

      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>
        
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-black/70 from-black via-gray-900 to-black">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
              <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-20 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-purple-500/30">
              <span className="text-sm uppercase tracking-wider text-purple-300">Hakkımızda</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Beynin Renkli Tarafı
              </span>
              <br />
              <span className="text-white">ile Tanışın</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              2014 yılından beri markaları renkli fikirlerle güçlendiriyoruz. 
              Yaratıcılık, teknoloji ve stratejiyi birleştirerek işinizi dijital dünyada öne çıkarıyoruz.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-transparent from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full border border-pink-500/30">
                  <span className="text-sm uppercase tracking-wider text-pink-300">Hikayemiz</span>
                </div>
                
                <h2 className="text-4xl sm:text-5xl font-bold">
                  <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                    10+ Yıllık Deneyim
                  </span>
                </h2>
                
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    2014 yılında, dijital dünyayı daha renkli ve yaratıcı hale getirme hayaliyle yola çıktık. 
                    <strong>Sakarya</strong> merkezli olarak kurulan ajansımızda küçük bir ekiple başladığımız bu yolculuk, bugün başta 
                    Serdivan, Adapazarı, <strong>Kocaeli (İzmit)</strong> ve <strong>Düzce</strong> olmak üzere tüm Türkiye'de 150'den fazla mutlu müşteriye 
                    hizmet veren saygın bir dijital reklam ajansına dönüştü.
                  </p>
                  <p>
                    Başlangıçta sadece grafik tasarım hizmeti verirken, zamanla dijital pazarlama, 
                    web geliştirme, kurumsal kimlik ve video prodüksiyon hizmetlerini de portföyümüze ekledik. 
                    MFO Creative olarak her geçen gün büyüyor, gelişiyor ve markanızı dijitalde parlatmak için çabalıyoruz.
                  </p>
                  <p>
                    Ekibimiz, her biri kendi alanında uzman, tutkulu profesyonellerden oluşuyor. 
                    Ortak hedefimiz: Müşterilerimizin markalarını öne çıkaran, yenilikçi projeler üretmek ve yerel pazarın yanı sıra global arenada da rekabet güçlerini artırmaktır.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="text-5xl mb-4">🎨</div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    500+
                  </h3>
                  <p className="text-sm text-gray-400">Tamamlanan Proje</p>
                </div>

                <div className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 mt-12">
                  <div className="text-5xl mb-4">😊</div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    150+
                  </h3>
                  <p className="text-sm text-gray-400">Mutlu Müşteri</p>
                </div>

                <div className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 -mt-6">
                  <div className="text-5xl mb-4">⚡</div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                    10+
                  </h3>
                  <p className="text-sm text-gray-400">Yıllık Deneyim</p>
                </div>

                <div className="group bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 mt-6">
                  <div className="text-5xl mb-4">🏆</div>
                  <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    %98
                  </h3>
                  <p className="text-sm text-gray-400">Memnuniyet</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black/70 from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6">🎯</div>
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Vizyonumuz
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Türkiye'nin en yaratıcı ve yenilikçi tasarım ajansı olmak. 
                    Markaların dijital dönüşümünde öncü rol oynamak ve her projede 
                    sınırları zorlamak. Yerel pazarda lider konumda olmanın yanı sıra, 
                    global projelerde de adımızdan söz ettirmek.
                  </p>
                </div>
              </div>

              <div className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-6xl mb-6">🚀</div>
                  <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                    Misyonumuz
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Müşterilerimize en kaliteli, özgün ve etkili çözümleri sunmak. 
                    Her projede mükemmellik standartlarını koruyarak, markaların 
                    hedef kitleleriyle güçlü bağlar kurmasını sağlamak. Yaratıcılığı, 
                    teknolojiyi ve stratejik düşünceyi birleştirerek değer yaratmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-transparent from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-full border border-teal-500/30">
                <span className="text-sm uppercase tracking-wider text-teal-300">Değerlerimiz</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Bizi Biz Yapan Değerler
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Her projede rehberimiz olan temel prensiplerimiz
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-6 text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-black/70 from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                <span className="text-sm uppercase tracking-wider text-yellow-300">Ekibimiz</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Uzman Ekibimiz
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Tutkulu, deneyimli ve yaratıcı profesyonellerden oluşan ekibimiz
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${member.gradient} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}></div>
                    <h3 className="text-xl font-bold mb-3">{member.role}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTA />

      </div>
    </>
  );
}


