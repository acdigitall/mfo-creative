import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: 'Baskı Hizmetleri', path: '/baski-hizmetleri' },
    { name: 'Sosyal Medya Çalışmaları', path: '/sosyal-medya-calismalari' },
    { name: 'Tasarım Hizmetleri', path: '/tasarim-hizmetleri' },
    { name: 'Tanıtım Filmi Çekimleri', path: '/tanitim-filmi-cekimleri' },   
     { name: 'Kurumsal Kimlik Tasarımı', path: '/kurumsal-kimlik-tasarimi' },
     { name: 'Reklam Hizmetleri', path: 'https://acdigital.tech/hizmetler/meta-ads' },
     { name: 'Web Tasarım ve Uygulama', path: 'https://acdigital.tech/hizmetler/sakarya-web-tasarim' }



  ];

  const quickLinks = [
    { name: 'Hakkımızda', path: '/hakkimizda' },
    { name: 'Hizmetler', path: '/hizmetler' },
    { name: 'Portföy', path: '/portfoy' },
    { name: 'İletişim', path: '/iletisim' }
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden" style={{ zIndex: 1 }}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            {/* Logos Section */}
            <div className="flex items-center gap-4 mb-6">
              {/* MFO Creative Logo */}
              <Link href="/" className="relative group">
                <img 
                  src="/MFO Creative.png" 
                  alt="MFO Creative" 
                  className="h-12 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </Link>
              
              {/* Separator */}
              <div className="h-10 w-[2px] bg-gradient-to-b from-transparent via-white/50 to-transparent shadow-lg"></div>
              
              {/* Partner Logo */}
              <a 
                href="https://acdigital.tech/" 
                target="_blank"
                rel="noopener noreferrer"
                className="relative group"
              >
                <img 
                  src="/A&C@3x-8-2.png" 
                  alt="A&C Digital" 
                  className="h-12 w-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
              </a>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-6">
              Beynin renkli tarafı. Yaratıcılık ve teknolojiyi birleştirerek markanızı dijital dünyada öne çıkarıyoruz.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/mustafaik/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
             
            
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Hızlı Linkler
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-150 transition-transform duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hizmetlerimiz
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 group-hover:scale-150 transition-transform duration-300"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
              İletişim
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">E-posta</p>
                  <a href="mailto:info@mfocreative.com.tr" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    info@mfocreative.com.tr
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Telefon</p>
                  <a href="tel:+905322558980" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                    +90 (532) 255 89 80
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5 flex-shrink-0">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Adres</p>
                  <p className="text-gray-400">
                    Sakarya, Türkiye
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} MFO Creative. Tüm hakları saklıdır.-<a href="https://acdigital.tech/">A&C DIGITAL</a>
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/gizlilik-politikasi" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

