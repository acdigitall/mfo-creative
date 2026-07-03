"use client";
import React from 'react';

export default function KullanimKosullari() {
  return (
    <div className="min-h-screen text-white pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Kullanım Koşulları
        </h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base">
          <p>
            Son güncellenme tarihi: {new Date().toLocaleDateString('tr-TR')}
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Taraflar ve Kabul</h2>
          <p>
            Bu web sitesine (mfocreative.com) erişim sağlayarak veya sitemizi kullanarak, burada belirtilen Kullanım Koşulları'nı, tüm geçerli yasa ve düzenlemeleri kabul etmiş sayılırsınız. Bu koşulların herhangi birini kabul etmiyorsanız, bu siteyi kullanmanız veya erişmeniz yasaktır.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Fikri Mülkiyet Hakları</h2>
          <p>
            Bu web sitesinde yer alan tüm içerikler, metinler, grafikler, logolar, görseller, video klipler ve yazılımlar MFO Creative'in mülkiyetindedir veya lisanslı olarak kullanılmaktadır. Önceden yazılı izin alınmaksızın bu içeriklerin kopyalanması, çoğaltılması veya ticari amaçla kullanılması kesinlikle yasaktır.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Hizmet Kullanımı</h2>
          <p>
            Web sitemiz üzerinden sunulan hizmetleri yalnızca yasal amaçlar doğrultusunda kullanabilirsiniz. Siteye veya diğer kullanıcılara zarar verecek, haksız rekabete yol açacak her türlü yasa dışı ve kötü niyetli faaliyet yasaktır.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Sorumluluk Reddi</h2>
          <p>
            MFO Creative, web sitesindeki içeriklerin güncelliğini, doğruluğunu ve eksiksizliğini sağlamak için makul çabayı gösterir. Ancak, sitedeki bilgilerin kullanımından doğabilecek doğrudan veya dolaylı zararlardan ajansımız sorumlu tutulamaz. Site kesintisiz ve hatasız çalışma garantisi vermemektedir.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Bağlantılar (Linkler)</h2>
          <p>
            Sitemiz, üçüncü taraf web sitelerine bağlantılar içerebilir. MFO Creative, bu sitelerin içeriklerinden, gizlilik uygulamalarından veya güvenliğinden sorumlu değildir. Dış bağlantılara tıklanması sonucu doğabilecek riskler kullanıcının kendisine aittir.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Değişiklikler</h2>
          <p>
            MFO Creative, bu kullanım koşullarını önceden haber vermeksizin dilediği zaman değiştirme veya güncelleme hakkını saklı tutar. Sitemizi kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.
          </p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. İletişim</h2>
          <p>
            Bu kullanım koşulları hakkında sorularınız varsa, lütfen İletişim sayfamızdaki bilgiler üzerinden bize ulaşın.
          </p>
        </div>
      </div>
    </div>
  );
}
