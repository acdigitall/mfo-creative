import PageComponent from '@/components/services/SosyalMedyaCalismalari';

export const metadata = {
  title: "Sosyal Medya Yönetimi | MFO Creative",
  description: "Markanızın sosyal medya hesaplarını profesyonelce yönetiyor, etkileşiminizi artırıyoruz.",
  openGraph: {
    title: "Sosyal Medya Yönetimi | MFO Creative",
    description: "Markanızın sosyal medya hesaplarını profesyonelce yönetiyor, etkileşiminizi artırıyoruz.",
    type: "website",
    url: "https://mfocreative.com.tr/sosyal-medya-calismalari",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sosyal Medya Yönetimi | MFO Creative",
    description: "Markanızın sosyal medya hesaplarını profesyonelce yönetiyor, etkileşiminizi artırıyoruz.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
