"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import portfolioData from '@/data/portfoy.json';
import data from '@/data/portfoy.json'; 
import CTA from '@/components/CTA';
function TrustedBrandsSwiper({ items }) {
  const [perView, setPerView] = useState(6);
  const [index, setIndex] = useState(0); // 0'dan başlıyoruz, clone yok
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);

  // Drag state
  const [dragging, setDragging] = useState(false);
  const dragRef = useState({ startX: 0, deltaX: 0 })[0];

  // Responsive perView
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(2);
      else if (w < 1024) setPerView(4);
      else setPerView(6);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Clone yok, direkt items kullanıyoruz
  const slides = items;
  const total = slides.length;

  // Autoplay - Normal slide geçişi
  useEffect(() => {
    if (paused || dragging) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        // Son item'a geldiğinde başa dön
        if (prev >= total - perView) {
          return 0;
        }
        return prev + 1;
      });
      setWithTransition(true);
    }, 2000);
    return () => clearInterval(id);
  }, [paused, dragging, total, perView]);

  const gap = 16; // px
  const slideWidthPercent = 100 / perView;

  const translateX = `calc(-${index * slideWidthPercent}% - ${index * gap}px)`;

  const next = () => {
    setIndex((prev) => {
      if (prev >= total - perView) return 0;
      return prev + 1;
    });
    setWithTransition(true);
  };

  const prev = () => {
    setIndex((prev) => {
      if (prev <= 0) return total - perView;
      return prev - 1;
    });
    setWithTransition(true);
  };

  // Drag helpers
  const onPointerDown = (e) => {
    setDragging(true);
    dragRef.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragRef.deltaX = 0;
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragRef.deltaX = x - dragRef.startX;
  };

  const onPointerUp = () => {
    if (!dragging) return;
    setDragging(false);

    // Eşik: 50px
    if (dragRef.deltaX > 50) prev();
    else if (dragRef.deltaX < -50) next();

    dragRef.deltaX = 0;
  };
  
  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft glow background */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 blur-2xl pointer-events-none" />

      {/* Controls */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/10 border border-white/15 backdrop-blur hover:bg-white/15 transition"
      >
        ‹
      </button>

      <button
        onClick={next}
        aria-label="Next"
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-white/10 border border-white/15 backdrop-blur hover:bg-white/15 transition"
      >
        ›
      </button>

      {/* Viewport */}
      <div
        className="overflow-hidden rounded-3xl border border-white/10 bg-transparent backdrop-blur-md"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
        style={{ cursor: "pointer" }}
      >
        {/* Track */}
        <div
          className="flex"
          style={{
            gap: `${gap}px`,
            padding: "18px",
            transform: `translateX(${translateX})`,
            transition: withTransition ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
          }}
        >
          {slides.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="shrink-0"
              style={{ width: `calc(${slideWidthPercent}% - ${gap}px)` }}
            >
              <div className="group relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white hover:bg-white/95 transition cursor-pointer">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 transition`}
                />
                <div className="absolute inset-0">
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl bg-white/10" />
                </div>

                <div className="relative h-full w-full flex items-center justify-center p-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                  />
                </div>

                {/* shine */}
                <div className="pointer-events-none absolute -inset-10 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-120%] group-hover:translate-x-[120%] transition duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      title: "Kurumsal Kimlik Tasarımı",
      description: "Markanıza özgün ve profesyonel kimlik kazandırıyoruz. Logo, kurumsal kılavuz ve görsel dil tasarımı.",
      path: "/kurumsal-kimlik-tasarimi",
      gradient: "from-blue-500 to-cyan-500",
      color: "blue"
    },
    {
      title: "Web Tasarım & Yazılım",
      description: "Modern, kullanıcı dostu ve mobil uyumlu web siteleri ve uygulamalar geliştiriyoruz.",
      path: "https://acdigital.tech/hizmetler/sakarya-web-tasarim",
      gradient: "from-purple-500 to-pink-500",
      color: "purple"
    },
    {
      title: "Sosyal Medya Yönetimi",
      description: "İçerik üretimi, reklam kampanyaları ve sosyal medya stratejileri ile markanızı büyütüyoruz.",
      path: "/sosyal-medya-calismalari",
      gradient: "from-pink-500 to-rose-500",
      color: "pink"
    },
    {
      title: "Tanıtım Filmi Çekimi",
      description: "Profesyonel video prodüksiyon, kurumsal tanıtım filmleri ve reklam çekimleri.",
      path: "/tanitim-filmi-cekimleri",
      gradient: "from-orange-500 to-red-500",
      color: "orange"
    },
    {
      title: "Grafik Tasarım",
      description: "Broşür, katalog, afiş, sosyal medya görselleri ve tüm görsel ihtiyaçlarınız için yaratıcı çözümler.",
      path: "/tasarim-hizmetleri",
      gradient: "from-teal-500 to-green-500",
      color: "teal"
    },
    {
      title: "Baskı Hizmetleri",
      description: "Kartvizit, katalog, broşür, afiş ve tüm tanıtım materyalleriniz için profesyonel baskı çözümleri.",
      path: "/baski-hizmetleri",
      gradient: "from-indigo-500 to-blue-500",
      color: "indigo"
    }
  ];

  const portfolioItems = [
    { id: 1, title: "E-Ticaret Projesi", category: "Web Tasarım", image: "PROJECT_IMAGE_1" },
    { id: 2, title: "Kurumsal Kimlik", category: "Branding", image: "PROJECT_IMAGE_2" },
    { id: 3, title: "Sosyal Medya Kampanyası", category: "Dijital Marketing", image: "PROJECT_IMAGE_3" },
    { id: 4, title: "Tanıtım Filmi", category: "Video Prodüksiyon", image: "PROJECT_IMAGE_4" },
  ];

  const testimonials = [
    {
      text: "MFO Creative ile çalışmak harika bir deneyimdi. Kurumsal kimliğimizi sıfırdan oluşturdular ve beklentilerimizin çok üzerinde bir sonuç aldık.",
      author: "Ahmet Yılmaz",
      company: "TechStart A.Ş.",
      role: "Genel Müdür"
    },
    {
      text: "Web sitemiz modern, hızlı ve kullanıcı dostu. Ekip çok profesyonel ve işini hakkıyla yapıyor. Kesinlikle tavsiye ediyorum.",
      author: "Zeynep Kaya",
      company: "Digital Media",
      role: "Pazarlama Müdürü"
    },
    {
      text: "Sosyal medya yönetimi konusunda harika işler çıkarıyorlar. Etkileşimimiz %200 arttı ve marka bilinirliğimiz katlandı.",
      author: "Mehmet Demir",
      company: "Fashion Brand",
      role: "Kurucu"
    }
  ];

  const colorWords = [
    { text: "Yaratıcı", color: "text-blue-400" },
    { text: "Yenilikçi", color: "text-purple-400" },
    { text: "Renkli", color: "text-pink-400" },
    { text: "Özgün", color: "text-orange-400" },
  ];

  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % colorWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Portfolio'dan logo kategorisindeki görselleri çek
  const logoItems = portfolioData
    .filter(item => item.category === "Logo")
    .map((item, index) => {
      const gradients = [
        "from-blue-500 to-cyan-500",
        "from-purple-500 to-pink-500",
        "from-pink-500 to-rose-500",
        "from-orange-500 to-red-500",
        "from-teal-500 to-green-500",
        "from-indigo-500 to-blue-500",
        "from-violet-500 to-purple-500",
        "from-fuchsia-500 to-pink-500",
        "from-rose-500 to-red-500",
        "from-amber-500 to-yellow-500",
        "from-lime-500 to-green-500",
        "from-emerald-500 to-teal-500",
        "from-sky-500 to-blue-500",
        "from-pink-500 to-purple-500",
        "from-orange-500 to-yellow-500",
        "from-cyan-500 to-blue-500",
        "from-green-500 to-emerald-500",
        "from-red-500 to-pink-500"
      ];
      return {
        id: item.id,
        title: item.title,
        image: item.image,
        gradient: gradients[index % gradients.length]
      };
    });
    const showcaseItems = data
      .filter(item => item.image) // Sadece resmi olanları al
      .slice(0, 4);
  
  return (
    <>
      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: 'relative' }}>

        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center pt-12 px-4 sm:px-6">
  {/* Hero Content */}
  <div className={`enüst_div relative z-10 max-w-7xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

    {/* Logo - Görseldeki gibi EN ÜSTTE ve BÜYÜK */}
    <div className="anasayfa_logoüstü mb-8 sm:mb-10 md:mb-12 absolute">
      <img
        src="/trans_3-8.png"
        alt="MFO Creative"
        className="anasayfa_logo h-20 sm:h-28 md:h-36 lg:h-40 w-auto mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.4))' }}
      />
    </div>

    {/* Başlık - Logo'nun hemen altında */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
      <span className="inline-block transition-all duration-500">
        <span className={`${colorWords[currentWord].color} transition-colors duration-500`}>
          {colorWords[currentWord].text}
        </span>
      </span>
      <br />
      <span className="text-white">Fikirler,</span>
      <br />
      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Güçlü Markalar
      </span>
    </h1>

    {/* Butonlar */}
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2 sm:px-0">
  <Link
    href="/hizmetler"
    className="group w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-white rounded-lg font-medium hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 transition-all duration-300 relative overflow-hidden border border-blue-500/20 hover:border-purple-500/40 active:scale-[0.98]"
  >
    <span className="relative z-10 text-sm sm:text-base flex items-center justify-center gap-2">
      <span>Hizmetlerimizi Keşfedin</span>
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </Link>
  <Link
    href="/portfoy"
    className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 bg-white/5 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/30 active:scale-[0.98]"
  >
    <span className="text-sm sm:text-base flex items-center justify-center gap-2">
      <span>Çalışmalarımızı Görün</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </span>
  </Link>
</div>

    {/* Ekstra bilgi butonlar altında (mobil için) */}
    <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>7/24 Destek</span>
      </div>
      <div className="hidden sm:block">•</div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <span>150+ Mutlu Müşteri</span>
      </div>
      <div className="hidden sm:block">•</div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <span>Profesyonel Ekip</span>
      </div>
    </div>
  </div>

  {/* Scroll Indicator - Colorful */}
  <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-purple-400/50 rounded-full flex items-start justify-center p-1.5 sm:p-2">
      <div className="w-1 h-2.5 sm:h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></div>
    </div>
  </div>
</section>

        {/* Creative Process Banner */}
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="text-4xl">💡</div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Yaratıcılık Bizim İşimiz</h3>
                  <p className="text-white/90">Markanızı öne çıkaran özgün çözümler üretiyoruz</p>
                </div>
              </div>
              <Link
                href="/iletisim"
                className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl whitespace-nowrap"
              >
                Projenize Başlayın →
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section - More Colorful */}
        <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-transparent from-black to-gray-900">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8 sm:mb-16">
      <div className="inline-block mb-3 sm:mb-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-purple-500/30">
        <span className="text-xs sm:text-sm uppercase tracking-wider text-purple-300">
          Ne Yapıyoruz?
        </span>
      </div>
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Renkli Hizmetlerimiz
        </span>
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-0">
        Her hizmetimiz, markanıza değer katan bir sanat eseri
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {services.map((service, index) => (
        <Link
          key={index}
          href={service.path}
          className="group relative bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:border-white/30 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 overflow-hidden"
        >
          {/* Animated Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
          <div className={`absolute -top-12 sm:-top-20 -right-12 sm:-right-20 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br ${service.gradient} rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>

          <div className="relative z-10">
            {/* Color indicator dot */}
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${service.gradient} mb-4 sm:mb-6 group-hover:scale-125 sm:group-hover:scale-150 transition-transform duration-300`}></div>

            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
              {service.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
              {service.description}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-400 group-hover:text-purple-400 transition-colors">
              <span>Detaylı İncele</span>
              <span className="transform group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>

    <div className="text-center mt-8 sm:mt-12">
      <Link
        href="/hizmetler"
        className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md text-white rounded-full font-semibold hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 border border-purple-500/30 hover:border-purple-400/50 text-sm sm:text-base"
      >
        Tüm Hizmetleri Görüntüle
      </Link>
    </div>
  </div>
</section>

        {/* Portfolio Preview Section */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black/70 from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full border border-pink-500/30">
                <span className="text-sm uppercase tracking-wider text-pink-300">Portföyümüz</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Renkli Hikayeler
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Her proje bir başarı hikayesi, her tasarım bir yolculuk
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-12">
            {showcaseItems.map((item, idx) => {
    const gradients = [
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-pink-500 to-rose-500',
      'from-orange-500 to-yellow-500'
    ];

    return (
      <div
        key={item.id}
        className="
        group relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden cursor-pointer
        border border-white/10 hover:border-white/25
        bg-white/5 backdrop-blur-md
        transition-all duration-300 hover:scale-[1.03]
      "
      
      >
        {/* Image */}
        <Image
            src={item.image}
            alt={item.alt || item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />

        {/* Subtle glass overlay (always) */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Gradient fade */}
          <div className={`absolute inset-0 bg-gradient-to-t ${gradients[idx]} opacity-20`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
              {/* Category */}
              <p className="text-xs uppercase tracking-wider text-white/80 font-semibold">
                {item.category}
              </p>

              {/* Title */}
              <h4 className="text-xl font-bold mt-1 text-white">
                {item.title}
              </h4>

              {/* Meta line */}
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-white/80">
                {item.client && (
                  <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">
                    {item.client}
                  </span>
                )}
                {item.year && (
                  <span className="px-2 py-1 rounded-full bg-white/10 border border-white/10">
                    {item.year}
                  </span>
                )}
                {Array.isArray(item.tur) && item.tur.slice(0, 2).map((t) => (
                  <span key={t} className="px-2 py-1 rounded-full bg-white/10 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              {item.description && (
                <p className="mt-3 text-sm text-white/85 line-clamp-3">
                  {item.description}
                </p>
              )}

              {/* Tags */}
              {Array.isArray(item.tags) && item.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-1 rounded-full bg-black/30 border border-white/10 text-white/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional: a tiny top highlight (glass) */}
        <div className="pointer-events-none absolute -top-24 left-0 right-0 h-48 bg-white/10 blur-2xl opacity-50" />
      </div>
    );
  })}
</div>


            <div className="text-center">
              <Link
                href="/portfoy"
                className="inline-block px-8 py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105"
              >
                Tüm Projeleri İncele
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8 sm:mb-16">
      <div className="inline-block mb-4 px-4 sm:px-6 py-2 bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-full border border-teal-500/30">
        <span className="text-xs sm:text-sm uppercase tracking-wider text-teal-300">Neden Biz?</span>
      </div>
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 px-2">
        <span className="bg-gradient-to-r from-teal-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
          MFO Creative Farkı
        </span>
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-2 sm:px-0">
        Yaratıcılık, profesyonellik ve sonuç odaklılık bir arada
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {[
        { icon: "⚡", title: "Hızlı & Profesyonel", desc: "Zamanında teslimat ve kaliteli hizmet garantisi. Projelerinizi eksiksiz ve zamanında teslim ediyoruz.", gradient: "from-blue-500 to-purple-500" },
        { icon: "🎯", title: "Stratejik Yaklaşım", desc: "Her proje için özel strateji geliştiriyoruz. Sektör analizi ve hedef kitle araştırması ile sonuç odaklı çalışıyoruz.", gradient: "from-purple-500 to-pink-500" },
        { icon: "✨", title: "Yaratıcı Çözümler", desc: "Özgün, yenilikçi ve markanıza özel tasarımlar. Sıradanlıktan uzak, akılda kalıcı projeler üretiyoruz.", gradient: "from-pink-500 to-rose-500" },
        { icon: "🤝", title: "Güvenilir İş Ortağı", desc: "150'den fazla mutlu müşterimizle uzun soluklu iş birliklerinizi sürdürüyoruz. Güven ve şeffaflık önceliğimiz.", gradient: "from-orange-500 to-red-500" },
        { icon: "🔄", title: "Sınırsız Revizyon", desc: "Memnun kalana kadar çalışmalarınızı düzeltiyoruz. Müşteri memnuniyeti bizim için en önemli başarı kriteri.", gradient: "from-teal-500 to-green-500" },
        { icon: "💬", title: "7/24 Destek", desc: "Her zaman yanınızdayız. Sorularınıza hızlı yanıt veriyor, projelerinizde sürekli destek sağlıyoruz.", gradient: "from-indigo-500 to-blue-500" }
      ].map((item, index) => (
        <div
          key={index}
          className="group bg-white/5 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 hover:bg-white/10 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-300 relative overflow-hidden"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
          <div className="relative z-10">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${item.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 text-2xl sm:text-3xl group-hover:scale-105 sm:group-hover:scale-110 group-hover:rotate-3 sm:group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
              {item.icon}
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed sm:leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        {/* Testimonials Section */}
        {/* <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-black/70 from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30">
                <span className="text-sm uppercase tracking-wider text-yellow-300">Referanslar</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Müşterilerimizden
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
                Birlikte ürettiğimiz başarı hikayeleri
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => {
                const gradients = [
                  'from-blue-500 to-purple-500',
                  'from-purple-500 to-pink-500',
                  'from-pink-500 to-orange-500'
                ];
                return (
                  <div
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative z-10">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">★</span>
                        ))}
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradients[index]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold">{testimonial.author}</div>
                          <div className="text-sm text-gray-400">{testimonial.role}</div>
                          <div className="text-xs text-gray-500">{testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section> */}
        {/* Trusted Brands Section */}
      {/* Trusted Brands - Modern Swiper */}
      <section className="py-16 px-4 sm:px-6 bg-black/70 from-black to-gray-900">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Güvenilen İş Ortağınız
          </span>
        </h3>
        <p className="text-gray-400">
          Farklı sektörlerden markalarla rengarenk projeler üretiyoruz
        </p>
      </div>

      <TrustedBrandsSwiper
        items={logoItems}
      />
    </div>
  </section>
        {/* Sakarya SEO Bölümü */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-10 text-center text-gray-300">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Sakarya Web Tasarım ve Dijital Çözüm Ortaklığınız
            </h2>
            <p className="text-sm sm:text-base leading-relaxed max-w-4xl mx-auto mb-4">
              Merkezi <strong>Sakarya</strong>'da bulunan <strong>MFO Creative</strong>, başta Serdivan, Adapazarı ve Sapanca olmak üzere tüm Türkiye'ye uçtan uca dijital dönüşüm hizmetleri sunan yaratıcı bir ajanstır. Markanızın dijital dünyada sağlam adımlarla ilerlemesi için profesyonel <em>web tasarım, sosyal medya yönetimi, kurumsal kimlik oluşturma</em> ve <em>tanıtım filmi prodüksiyonu</em> alanlarında stratejik çözümler geliştiriyoruz.
            </p>
            <p className="text-sm sm:text-base leading-relaxed max-w-4xl mx-auto text-gray-400">
              Sadece estetik değil, satış ve dönüşüm odaklı performans pazarlaması (Google Ads, Meta Reklamları) stratejilerimizle Sakarya reklam ajansı arayışınıza yenilikçi bir bakış açısı getiriyoruz. İşinizi büyütmek, doğru hedef kitleye ulaşmak ve sürdürülebilir başarı yakalamak için yanınızdayız.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <CTA />




      </div>
    </>
  );
}
