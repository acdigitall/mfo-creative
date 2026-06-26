import './globals.css';
import LiquidEtherWrapper from '@/components/LiquidEtherWrapper';
import Layout from '@/components/Layout';

export const metadata = {
  metadataBase: new URL("https://mfocreative.com.tr"),
  title: "MFO Creative | Dijital Çözümler",
  description: "MFO Creative ile markanızı dijital dünyada öne çıkarın. Web tasarım, SEO, sosyal medya yönetimi ve daha fazlası.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
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
