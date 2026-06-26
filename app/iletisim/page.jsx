import PageComponent from '@/components/views/Iletisim';

export const metadata = {
  title: "İletişim | MFO Creative",
  description: "Projeleriniz için bizimle iletişime geçin. Sakarya dijital ajans iletişim bilgileri.",
  openGraph: {
    title: "İletişim | MFO Creative",
    description: "Projeleriniz için bizimle iletişime geçin. Sakarya dijital ajans iletişim bilgileri.",
    type: "website",
    url: "https://mfocreative.com.tr/iletisim",
  },
  twitter: {
    card: "summary_large_image",
    title: "İletişim | MFO Creative",
    description: "Projeleriniz için bizimle iletişime geçin. Sakarya dijital ajans iletişim bilgileri.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
