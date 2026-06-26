import PageComponent from '@/components/views/Hizmetler';

export const metadata = {
  title: "Hizmetlerimiz | MFO Creative",
  description: "Web tasarım, grafik tasarım, SEO, sosyal medya yönetimi ve tanıtım filmi çekimleri gibi dijital ajans hizmetlerimiz.",
  openGraph: {
    title: "Hizmetlerimiz | MFO Creative",
    description: "Web tasarım, grafik tasarım, SEO, sosyal medya yönetimi ve tanıtım filmi çekimleri gibi dijital ajans hizmetlerimiz.",
    type: "website",
    url: "https://mfocreative.com.tr/hizmetler",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hizmetlerimiz | MFO Creative",
    description: "Web tasarım, grafik tasarım, SEO, sosyal medya yönetimi ve tanıtım filmi çekimleri gibi dijital ajans hizmetlerimiz.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
