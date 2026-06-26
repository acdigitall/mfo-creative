import HomeClient from '@/components/views/Home';

export const metadata = {
  title: "MFO Creative | Grafik Tasarım, Sosyal Medya, Tanıtım Filmi - Sakarya",
  description: "Sakarya'da grafik tasarım, sosyal medya yönetimi ve tanıtım filmi hizmetleri mi arıyorsunuz? MFO Creative ile markanız parlasın. Hemen teklif alın!",
  keywords: "dijital ajans, web tasarım, grafik tasarım, kurumsal kimlik, sosyal medya yönetimi, tanıtım filmi, baskı hizmetleri, logo tasarımı, sakarya dijital ajans",
  openGraph: {
    title: "MFO Creative | Grafik Tasarım, Sosyal Medya, Tanıtım Filmi - Sakarya",
    description: "Sakarya'da grafik tasarım, sosyal medya yönetimi ve tanıtım filmi hizmetleri mi arıyorsunuz? MFO Creative ile markanız parlasın. Hemen teklif alın!",
    type: "website",
    url: "https://mfocreative.com.tr/",
    images: ["https://mfocreative.com.tr/MFO Creative.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MFO Creative | Grafik Tasarım, Sosyal Medya, Tanıtım Filmi - Sakarya",
    description: "Sakarya'da grafik tasarım, sosyal medya yönetimi ve tanıtım filmi hizmetleri mi arıyorsunuz? MFO Creative ile markanız parlasın. Hemen teklif alın!",
  },
  alternates: {
    canonical: "https://mfocreative.com.tr",
  }
};

export default function Page() {
  return <HomeClient />;
}
