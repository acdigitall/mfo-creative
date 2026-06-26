import PageComponent from '@/components/views/BlogDetail';
import { BlogData } from '@/data/blog';

export async function generateMetadata({ params }) {
  const post = BlogData.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Sayfa Bulunamadı | MFO Creative",
      description: "Aradığınız sayfa bulunamadı.",
    };
  }

  return {
    title: `${post.title} | MFO Creative`,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags?.join(", ") || "",
    openGraph: {
      title: `${post.title} | MFO Creative`,
      description: post.metaDescription || post.excerpt,
      type: "article",
      url: `https://mfocreative.com.tr/blog/${post.slug}`,
      images: post.image ? [
        {
          url: post.image,
          alt: post.title,
        },
      ] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export async function generateStaticParams() {
  return BlogData.map((post) => ({
    slug: post.slug,
  }));
}

export default function Page({ params }) {
  return <PageComponent params={params} />;
}
