"use client";

import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Instagram,
  ArrowRight,
} from 'lucide-react';

export default function Iletisim() {
  const mailToLink = `mailto:info@mfocreative.com.tr?subject=${encodeURIComponent(
    "MFO Creative - İletişim"
  )}&body=${encodeURIComponent(
    `Merhaba MFO Creative ekibi,

Projem hakkında görüşmek istiyorum.

Ad Soyad:
Telefon:
Web Sitesi (varsa):

Mesaj:
`
  )}`;

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adres',
      info: 'Serdivan, Sakarya',
      detail: 'Türkiye',
      link: 'https://maps.google.com/?q=Serdivan,Sakarya',
      color: 'text-blue-400'
    },
    {
      icon: Mail,
      title: 'E-Posta',
      info: 'info@mfocreative.com.tr',
      detail: 'destek@mfocreative.com.tr',
      link: 'mailto:info@mfocreative.com.tr',
      color: 'text-purple-400'
    },
    {
      icon: Phone,
      title: 'Telefon',
      phones: [
        { label: '+90 532 255 89 80', link: 'tel:+905322558980' }
      ],
      detail: 'Hafta içi 09:00 - 18:00',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      info: 'Pazartesi - Cuma',
      detail: '09:00 - 18:00',
      link: null,
      color: 'text-pink-400'
    }
  ];

  return (
    <>
      

      <div className="min-h-screen text-white bg-transparent">
        {/* HERO - Minimal */}
        <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-sm font-medium text-gray-300 tracking-wide">
                İletişim
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white">Projeniz için</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Hızlı Çözüm
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              24 saat içinde dönüş garantisi ile projenizi değerlendiriyoruz.
            </p>

            {/* HERO CTA - Minimal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={mailToLink}
                className="group w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
              >
                <Mail className="w-5 h-5" />
                <span className="text-base">E-Posta Gönder</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="tel:+905322558980"
                className="w-full sm:w-auto px-7 py-3.5 bg-transparent text-white rounded-lg font-medium hover:bg-white/5 transition-all duration-300 border border-white/20 active:scale-95 flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                <span className="text-base">Hemen Ara</span>
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT INFO - Minimal Grid */}
        <section className="pb-20 sm:pb-28 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Contact Cards - Modern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white/5 backdrop-blur-sm rounded-xl p-5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/25"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color.replace('text', 'from')}/10 ${item.color.replace('text', 'to')}/5 border ${item.color.replace('text', 'border')}/20 flex items-center justify-center mb-4`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>

                    <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                      {item.title}
                    </h3>

                    {item.phones ? (
                      <>
                        <div className="space-y-2">
                          {item.phones.map((p, i) => (
                            <a
                              key={i}
                              href={p.link}
                              className="block text-base font-medium text-white hover:text-blue-300 transition-colors"
                            >
                              {p.label}
                            </a>
                          ))}
                        </div>
                        {item.detail && (
                          <p className="text-sm text-gray-400 mt-2">{item.detail}</p>
                        )}
                      </>
                    ) : item.link ? (
                      <a href={item.link} className="block">
                        <p className="text-base font-medium text-white group-hover:text-blue-300 transition-colors">
                          {item.info}
                        </p>
                        {item.detail && (
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mt-1">
                            {item.detail}
                          </p>
                        )}
                      </a>
                    ) : (
                      <>
                        <p className="text-base font-medium text-white">{item.info}</p>
                        {item.detail && (
                          <p className="text-sm text-gray-400 mt-1">{item.detail}</p>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* MAP & SOCIAL - Minimal Layout */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Map Section */}
              <div className="space-y-5">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/10 to-purple-400/10 border border-blue-400/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Konumumuz</h3>
                      <p className="text-sm text-gray-400">Serdivan, Sakarya</p>
                    </div>
                  </div>
                  
                  <div className="relative rounded-lg overflow-hidden h-[250px] sm:h-[300px] bg-white/5 border border-white/10">
                    <iframe
                      title="MFO Creative Konum"
                      src="https://www.google.com/maps?q=Serdivan,Sakarya&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>
                </div>
              </div>

              {/* Contact & Social Section */}
              <div className="space-y-5">
                {/* Quick Contact */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4">Hızlı İletişim</h3>
                  
                  <div className="space-y-4">
                    <a
                      href="mailto:info@mfocreative.com.tr"
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 group active:scale-95"
                    >
                      <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-300">E-Posta</p>
                        <p className="text-base font-medium text-white">info@mfocreative.com.tr</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </a>

                    <a
                      href="tel:+905322558980"
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 border border-white/10 group active:scale-95"
                    >
                      <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-gray-300">Telefon</p>
                        <p className="text-base font-medium text-white">+90 532 255 89 80</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <h3 className="text-lg font-semibold mb-4">Sosyal Medya</h3>
                  
                  <a
                    href="https://www.instagram.com/mustafaik/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-lg hover:from-pink-500/20 hover:to-rose-500/20 transition-all duration-300 border border-pink-500/20 group active:scale-95"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-base font-medium text-white">Instagram</p>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300">@mustafaik</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
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

