"use client";
import React from 'react';

export default function GizlilikPolitikasi() {
  return (
    <div className="min-h-screen text-white pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Gizlilik Politikası
        </h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base">
          <p>
            Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Veri Sorumlusu</h2>
          <p>
            MFO Creative (Bundan böyle "Ajans" olarak anılacaktır) olarak, kişisel verilerinizin güvenliğine büyük önem vermekteyiz. Hizmetlerimizden faydalanırken paylaştığınız kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında işlenmekte ve muhafaza edilmektedir.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Toplanan Kişisel Veriler</h2>
          <p>
            Web sitemizi ziyaretiniz sırasında veya iletişim formları aracılığıyla adınız, soyadınız, e-posta adresiniz, telefon numaranız ve IP adresiniz gibi bilgiler toplanabilmektedir. Ayrıca çerezler (cookies) aracılığıyla anonim kullanım verileri elde edilmektedir.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Verilerin İşlenme Amacı</h2>
          <p>
            Toplanan kişisel verileriniz aşağıdaki amaçlarla kullanılmaktadır:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Taleplerinize yanıt vermek ve hizmet teklifleri sunmak,</li>
            <li>Size özel reklam, kampanya ve bültenler göndermek (izniniz dahilinde),</li>
            <li>Web sitesi performansını analiz etmek ve kullanıcı deneyimini iyileştirmek,</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek.</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Verilerin Üçüncü Kişilerle Paylaşımı</h2>
          <p>
            Ajansımız, kişisel verilerinizi kesinlikle satmaz veya yasa dışı yollarla paylaşmaz. Sadece hizmet aldığımız iş ortaklarımızla (sunucu sağlayıcıları, analitik servisleri) ve yasal zorunluluklar gereği resmi makamlarla KVKK kurallarına uygun olarak paylaşılabilir.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Çerez (Cookie) Kullanımı</h2>
          <p>
            Web sitemizin düzgün çalışması ve ziyaretçi istatistiklerinin takibi amacıyla çerezler kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri istediğiniz zaman devre dışı bırakabilirsiniz.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. İletişim</h2>
          <p>
            Gizlilik Politikamız ile ilgili her türlü soru, görüş ve veri silme talepleriniz için bizimle İletişim sayfamız üzerinden bağlantı kurabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
