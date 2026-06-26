import { BlogData } from '@/data/blog';

export default async function sitemap() {
  const baseUrl = 'https://mfocreative.com.tr';

  // Statik Ana Sayfalar ve Hizmetler
  const routes = [
    '',
    '/hakkimizda',
    '/hizmetler',
    '/portfoy',
    '/blog',
    '/iletisim',
    '/baski-hizmetleri',
    '/sosyal-medya-calismalari',
    '/tasarim-hizmetleri',
    '/tanitim-filmi-cekimleri',
    '/kurumsal-kimlik-tasarimi',
    '/reklam-hizmetleri',
    '/web-tasarim-uygulama',
  ];

  const staticRoutes = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dinamik Blog Yazıları
  const blogRoutes = BlogData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Gerçekte blog tarihini ISO formatına çevirebiliriz.
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
