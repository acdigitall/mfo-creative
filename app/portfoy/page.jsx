import PageComponent from '@/components/views/Portfoy';

export const metadata = {
  title: "Portföy | MFO Creative",
  description: "Başarıyla tamamladığımız web tasarım, kurumsal kimlik ve dijital pazarlama projelerimizi inceleyin.",
  openGraph: {
    title: "Portföy | MFO Creative",
    description: "Başarıyla tamamladığımız web tasarım, kurumsal kimlik ve dijital pazarlama projelerimizi inceleyin.",
    type: "website",
    url: "https://mfocreative.com.tr/portfoy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portföy | MFO Creative",
    description: "Başarıyla tamamladığımız web tasarım, kurumsal kimlik ve dijital pazarlama projelerimizi inceleyin.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
