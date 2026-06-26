import PageComponent from '@/components/services/WebTasarimUygulama';

export const metadata = {
  title: "Web Tasarım ve Uygulama | MFO Creative",
  description: "Modern, SEO uyumlu ve mobil öncelikli profesyonel web sitesi tasarımı hizmetleri.",
  openGraph: {
    title: "Web Tasarım ve Uygulama | MFO Creative",
    description: "Modern, SEO uyumlu ve mobil öncelikli profesyonel web sitesi tasarımı hizmetleri.",
    type: "website",
    url: "https://mfocreative.com.tr/web-tasarim-uygulama",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Tasarım ve Uygulama | MFO Creative",
    description: "Modern, SEO uyumlu ve mobil öncelikli profesyonel web sitesi tasarımı hizmetleri.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
