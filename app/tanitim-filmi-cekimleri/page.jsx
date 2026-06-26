import PageComponent from '@/components/services/TanitimFilmiCekimleri';

export const metadata = {
  title: "Tanıtım Filmi Çekimleri | MFO Creative",
  description: "Kurumsal tanıtım filmleri, drone çekimleri ve profesyonel video prodüksiyon hizmetleri.",
  openGraph: {
    title: "Tanıtım Filmi Çekimleri | MFO Creative",
    description: "Kurumsal tanıtım filmleri, drone çekimleri ve profesyonel video prodüksiyon hizmetleri.",
    type: "website",
    url: "https://mfocreative.com.tr/tanitim-filmi-cekimleri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanıtım Filmi Çekimleri | MFO Creative",
    description: "Kurumsal tanıtım filmleri, drone çekimleri ve profesyonel video prodüksiyon hizmetleri.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
