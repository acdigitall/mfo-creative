import PageComponent from '@/components/views/Blog';

export const metadata = {
  title: "Blog | MFO Creative",
  description: "Dijital pazarlama, web tasarım trendleri ve marka yönetimi hakkında güncel blog yazılarımız.",
  openGraph: {
    title: "Blog | MFO Creative",
    description: "Dijital pazarlama, web tasarım trendleri ve marka yönetimi hakkında güncel blog yazılarımız.",
    type: "website",
    url: "https://mfocreative.com.tr/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | MFO Creative",
    description: "Dijital pazarlama, web tasarım trendleri ve marka yönetimi hakkında güncel blog yazılarımız.",
  },
};

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
