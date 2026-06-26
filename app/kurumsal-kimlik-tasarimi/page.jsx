import PageComponent from '@/components/services/KurumsalKimlikTasarimi';

export const metadata = {
  title: "Kurumsal Kimlik Tasarımı | MFO Creative",
  description: "Logo tasarımı ve tüm kurumsal kimlik öğelerinizle markanızı akılda kalıcı hale getiriyoruz.",
  openGraph: {
    title: "Kurumsal Kimlik Tasarımı | MFO Creative",
    description: "Logo tasarımı ve tüm kurumsal kimlik öğelerinizle markanızı akılda kalıcı hale getiriyoruz.",
    type: "website",
    url: "https://mfocreative.com.tr/kurumsal-kimlik-tasarimi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurumsal Kimlik Tasarımı | MFO Creative",
    description: "Logo tasarımı ve tüm kurumsal kimlik öğelerinizle markanızı akılda kalıcı hale getiriyoruz.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
