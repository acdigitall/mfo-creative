"use client";
import { useRouter, useParams } from 'next/navigation';
import React, { useMemo } from "react";
import Image from "next/image";


import { BlogData } from "@/data/blog"; // yolunu düzelt: "@/data/blog" vs.

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = useParams();

  const postsSorted = useMemo(() => {
    // Detay sayfasında önce/sonra için date’e göre sıralama
    const months = {
      Ocak: 0, Şubat: 1, Mart: 2, Nisan: 3, Mayıs: 4, Haziran: 5,
      Temmuz: 6, Ağustos: 7, Eylül: 8, Ekim: 9, Kasım: 10, Aralık: 11,
    };
    const parseTurkishDate = (dateStr) => {
      const parts = String(dateStr || "").trim().split(" ");
      if (parts.length !== 3) return new Date(0);
      const day = Number(parts[0]);
      const month = months[parts[1]] ?? 0;
      const year = Number(parts[2]);
      return new Date(year, month, day);
    };

    return [...BlogData].sort((a, b) => parseTurkishDate(b.date) - parseTurkishDate(a.date));
  }, []);

  const post = useMemo(() => BlogData.find((p) => p.slug === slug), [slug]);
  const currentIndex = useMemo(
    () => (post ? postsSorted.findIndex((p) => p.slug === post.slug) : -1),
    [post, postsSorted]
  );

  const prevPost = useMemo(() => {
    if (currentIndex === -1) return null;
    return postsSorted[currentIndex + 1] || null; // daha eski
  }, [currentIndex, postsSorted]);

  const nextPost = useMemo(() => {
    if (currentIndex === -1) return null;
    return postsSorted[currentIndex - 1] || null; // daha yeni
  }, [currentIndex, postsSorted]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const tags = new Set(post.tags || []);
    const list = BlogData
      .filter((p) => p.slug !== post.slug)
      .map((p) => {
        let score = 0;
        if (p.category === post.category) score += 3;
        (p.tags || []).forEach((t) => {
          if (tags.has(t)) score += 1;
        });
        return { ...p, _score: score };
      })
      .sort((a, b) => b._score - a._score)
      .slice(0, 3);

    return list;
  }, [post]);

  const siteUrl = "https://mfocreative.com.tr";
  const canonicalUrl = `${siteUrl}/blog/${slug || ""}`;

  // Slug bulunamadı
  if (!post) {
    return (
      <>
        

        <div className="min-h-screen text-white relative" style={{ zIndex: 1, position: "relative", paddingTop: "80px" }}>
          <main className="max-w-4xl mx-auto px-6 py-20">
            <div
              className="rounded-2xl p-10 text-center"
              style={{
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">404</p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Bu blog yazısı bulunamadı</h1>
              <p className="text-gray-300 mb-8">
                Bağlantı yanlış olabilir veya içerik kaldırılmış olabilir. Blog sayfasına dönüp diğer içeriklere göz atabilirsin.
              </p>

              <button
                onClick={() => router.push("/blog")}
                className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(82, 39, 255, 0.35) 0%, rgba(255, 159, 252, 0.25) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                }}
              >
                Blog’a Geri Dön
              </button>
            </div>
          </main>
        </div>
      </>
    );
  }

  // JSON-LD (Article)
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: post.date, // TR format; istersen ISO’ya çevirebiliriz
    author: {
      "@type": "Organization",
      name: "MFO Creative",
    },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <>
      

      <div className="min-h-screen text-white relative" style={{ zIndex: 1, position: "relative", paddingTop: "80px" }}>
        <main className="max-w-5xl mx-auto px-6 py-16">
          {/* Top Nav */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <button
              onClick={() => router.push("/blog")}
              className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              ← Blog’a Dön
            </button>

            <div className="flex items-center gap-2">
              {prevPost && (
                <button
                  onClick={() => router.push(`/blog/${prevPost.slug}`)}
                  className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                >
                  ← Önceki
                </button>
              )}
              {nextPost && (
                <button
                  onClick={() => router.push(`/blog/${nextPost.slug}`)}
                  className="px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                >
                  Sonraki →
                </button>
              )}
            </div>
          </div>

          {/* Header Card */}
          <section
            className="rounded-2xl overflow-hidden mb-8"
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
          >
            {/* Cover */}
            <div className="relative h-72 md:h-96 w-full">
              <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" />

              {/* overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.85) 100%)",
                }}
              />

              {/* meta */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    {post.category}
                  </span>

                  {post.readTime && (
                    <span
                      className="text-xs px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                      }}
                    >
                      {post.readTime}
                    </span>
                  )}

                  <span className="text-xs text-gray-200 opacity-90">{post.date}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold leading-tight">{post.title}</h1>
                <p className="text-gray-200 mt-4 max-w-3xl leading-relaxed">{post.excerpt}</p>

                {/* author */}
                <div className="flex items-center gap-3 mt-6">
                  {post.author && (
                    <img
                      src={post.author}
                      alt="author"
                      className="w-10 h-10 rounded-full border"
                      style={{ borderColor: "rgba(255,255,255,0.2)" }}
                    />
                  )}
                  <div className="text-sm">
                    <div className="text-gray-200">MFO Creative</div>
                    <div className="text-gray-400 text-xs">Blog & Haberler</div>
                  </div>
                </div>
              </div>
            </div>

            {/* tags row */}
            <div className="p-6 md:p-8 border-t" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
              <div className="flex flex-wrap gap-2">
                {(post.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Content */}
          <section
            className="rounded-2xl p-6 md:p-10 mb-10"
            style={{
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            }}
          >
            {/* HTML content from data */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </section>

          {/* Related */}
          {relatedPosts.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">Benzer Yazılar</h2>
                <button
                  onClick={() => router.push("/blog")}
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Tümünü Gör →
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((p) => (
                  <article
                    key={p.id}
                    onClick={() => router.push(`/blog/${p.slug}`)}
                    className="group rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
                    style={{
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                    }}
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">{p.date}</span>
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.10)",
                          }}
                        >
                          {p.category}
                        </span>
                      </div>
                      <h3 className="text-base font-bold leading-snug mb-2 line-clamp-2">{p.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{p.excerpt}</p>

                      <div className="mt-4 text-sm text-gray-300 group-hover:gap-3 transition-all flex items-center gap-2">
                        Devamını Oku <span>→</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Bottom nav */}
          <section className="flex flex-col md:flex-row gap-4 justify-between">
            <button
              onClick={() => router.push("/blog")}
              className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              ← Blog’a Geri Dön
            </button>

            <div className="flex gap-3 justify-end">
              {prevPost && (
                <button
                  onClick={() => router.push(`/blog/${prevPost.slug}`)}
                  className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                  }}
                >
                  ← Önceki Yazı
                </button>
              )}
              {nextPost && (
                <button
                  onClick={() => router.push(`/blog/${nextPost.slug}`)}
                  className="px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(82, 39, 255, 0.35) 0%, rgba(255, 159, 252, 0.25) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                  }}
                >
                  Sonraki Yazı →
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
