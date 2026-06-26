import PageComponent from '@/components/services/TasarimHizmetleri';

export const metadata = {
  title: "Tasarım Hizmetleri | MFO Creative",
  description: "Yaratıcı grafik tasarım çözümleri ile markanızı görsel olarak güçlendiriyoruz.",
  openGraph: {
    title: "Tasarım Hizmetleri | MFO Creative",
    description: "Yaratıcı grafik tasarım çözümleri ile markanızı görsel olarak güçlendiriyoruz.",
    type: "website",
    url: "https://mfocreative.com.tr/tasarim-hizmetleri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasarım Hizmetleri | MFO Creative",
    description: "Yaratıcı grafik tasarım çözümleri ile markanızı görsel olarak güçlendiriyoruz.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
