import PageComponent from '@/components/views/Hakkimizda';

export const metadata = {
  title: "Hakkımızda | MFO Creative",
  description: "MFO Creative dijital ajansımızın misyonu, vizyonu ve yaratıcı ekibi hakkında bilgi alın.",
  openGraph: {
    title: "Hakkımızda | MFO Creative",
    description: "MFO Creative dijital ajansımızın misyonu, vizyonu ve yaratıcı ekibi hakkında bilgi alın.",
    type: "website",
    url: "https://mfocreative.com.tr/hakkimizda",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakkımızda | MFO Creative",
    description: "MFO Creative dijital ajansımızın misyonu, vizyonu ve yaratıcı ekibi hakkında bilgi alın.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
