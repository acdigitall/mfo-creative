import PageComponent from '@/components/services/BaskiHizmetleri';

export const metadata = {
  title: "Baskı Hizmetleri | MFO Creative",
  description: "Kartvizit, broşür, katalog ve promosyon ürünleri için profesyonel matbaa ve baskı hizmetleri.",
  openGraph: {
    title: "Baskı Hizmetleri | MFO Creative",
    description: "Kartvizit, broşür, katalog ve promosyon ürünleri için profesyonel matbaa ve baskı hizmetleri.",
    type: "website",
    url: "https://mfocreative.com.tr/baski-hizmetleri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baskı Hizmetleri | MFO Creative",
    description: "Kartvizit, broşür, katalog ve promosyon ürünleri için profesyonel matbaa ve baskı hizmetleri.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
