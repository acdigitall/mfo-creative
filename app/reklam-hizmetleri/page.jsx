import PageComponent from '@/components/services/ReklamHizmetleri';

export const metadata = {
  title: "Reklam Hizmetleri | MFO Creative",
  description: "Google Ads, Meta Ads ve dijital reklam stratejileri ile satışlarınızı artırın.",
  openGraph: {
    title: "Reklam Hizmetleri | MFO Creative",
    description: "Google Ads, Meta Ads ve dijital reklam stratejileri ile satışlarınızı artırın.",
    type: "website",
    url: "https://mfocreative.com.tr/reklam-hizmetleri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reklam Hizmetleri | MFO Creative",
    description: "Google Ads, Meta Ads ve dijital reklam stratejileri ile satışlarınızı artırın.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
