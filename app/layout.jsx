import './globals.css';
import LiquidEtherWrapper from '@/components/LiquidEtherWrapper';
import Layout from '@/components/Layout';

export const metadata = {
  metadataBase: new URL("https://mfocreative.com.tr"),
  title: "MFO Creative | Sakarya Reklam Ajansı & Dijital Çözümler",
  description: "MFO Creative ile markanızı dijital dünyada öne çıkarın. Sakarya web tasarım, SEO, kurumsal kimlik ve sosyal medya yönetimi ajansı.",
  keywords: [
    "Sakarya reklam ajansı", "Sakarya web tasarım", "dijital pazarlama", "sosyal medya yönetimi", "kurumsal kimlik", 
    "MFO Creative", "Serdivan reklam ajansı", "Adapazarı web tasarım", "tanıtım filmi çekimi", 
    "Kocaeli reklam ajansı", "İzmit web tasarım", "Düzce reklam ajansı", "Sakarya SEO uzmanı", 
    "e-ticaret sitesi tasarımı", "profesyonel logo tasarımı", "Sakarya yazılım firmaları", 
    "katalog tasarımı Sakarya", "sosyal medya danışmanlığı", "dijital reklam ajansı", "Türkiye dijital ajans"
  ],
  openGraph: {
    title: "MFO Creative | Sakarya Reklam Ajansı",
    description: "Sakarya merkezli reklam ajansımızla markanızı dijital dünyada büyütün. Profesyonel web tasarım, sosyal medya ve prodüksiyon hizmetleri.",
    url: "https://mfocreative.com.tr",
    siteName: "MFO Creative",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MFO Creative | Sakarya Reklam Ajansı",
    description: "Sakarya merkezli yaratıcı dijital reklam ajansı.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MFO Creative",
    "image": "https://mfocreative.com.tr/beyin.png",
    "@id": "https://mfocreative.com.tr",
    "url": "https://mfocreative.com.tr",
    "telephone": "+905322558980",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sakarya",
      "addressCountry": "TR"
    }
  };

  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, backgroundColor: '#000000' }}>
          <LiquidEtherWrapper />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Layout>
            {children}
          </Layout>
        </div>
      </body>
    </html>
  );
}
