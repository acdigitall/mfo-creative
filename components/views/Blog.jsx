"use client";
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from "react";


import { BlogData } from "@/data/blog"; // yolunu projenize göre düzeltin: "@/data/blog" gibi

export default function Blog() {
  const navigate = useRouter();

  // UI state
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest"); // newest | oldest | readTime

  const categories = useMemo(() => {
    const unique = Array.from(new Set(BlogData.map((p) => p.category))).sort((a, b) =>
      a.localeCompare(b, "tr")
    );
    return ["Tümü", ...unique];
  }, []);

  // helpers
  const parseTurkishDate = (dateStr) => {
    // "15 Ocak 2026" formatını Date’e çevirir (basit TR ay haritası)
    const months = {
      Ocak: 0,
      Şubat: 1,
      Mart: 2,
      Nisan: 3,
      Mayıs: 4,
      Haziran: 5,
      Temmuz: 6,
      Ağustos: 7,
      Eylül: 8,
      Ekim: 9,
      Kasım: 10,
      Aralık: 11,
    };
    const parts = String(dateStr || "").trim().split(" ");
    if (parts.length !== 3) return new Date(0);
    const day = Number(parts[0]);
    const month = months[parts[1]] ?? 0;
    const year = Number(parts[2]);
    return new Date(year, month, day);
  };

  const parseReadTime = (rt) => {
    // "9 dk" -> 9
    const n = parseInt(String(rt || "").replace(/[^\d]/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
  };

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = BlogData.filter((p) => {
      const matchCategory = activeCategory === "Tümü" || p.category === activeCategory;

      const haystack =
        (p.title || "") +
        " " +
        (p.excerpt || "") +
        " " +
        (p.metaDescription || "") +
        " " +
        (Array.isArray(p.tags) ? p.tags.join(" ") : "");

      const matchSearch = !q || haystack.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });

    if (sort === "newest") {
      list = list.sort((a, b) => parseTurkishDate(b.date) - parseTurkishDate(a.date));
    } else if (sort === "oldest") {
      list = list.sort((a, b) => parseTurkishDate(a.date) - parseTurkishDate(b.date));
    } else if (sort === "readTime") {
      list = list.sort((a, b) => parseReadTime(b.readTime) - parseReadTime(a.readTime));
    }

    return list;
  }, [activeCategory, search, sort]);

  const totalCount = BlogData.length;
  const shownCount = filteredPosts.length;

  return (
    <>
      

      <div className="min-h-screen text-white relative" style={{ zIndex: 1, position: "relative", paddingTop: "80px" }}>
        <main className="max-w-7xl mx-auto px-6 py-20">
          {/* Hero */}
          <section className="mb-14 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Blog / Haberler</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">Blog & Haberler</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Baskı hizmetleri, sosyal medya içerik üretimi, web tasarım, SEO ve reklam yönetimi hakkında
              pratik rehberler, kontrol listeleri ve güncel ipuçları.
            </p>

            {/* quick stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div
                className="px-4 py-2 rounded-full text-sm text-gray-200"
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Toplam içerik: <strong className="text-white">{totalCount}</strong>
              </div>
              <div
                className="px-4 py-2 rounded-full text-sm text-gray-200"
                style={{
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Gösterilen: <strong className="text-white">{shownCount}</strong>
              </div>
            </div>
          </section>

          {/* Controls */}
          <section className="mb-10">
            <div
              className="rounded-2xl p-5 md:p-6"
              style={{
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              }}
            >
              <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                {/* search */}
                <div className="flex-1">
                  <label className="text-xs text-gray-400">Ara</label>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Örn: SEO, broşür, drone, Google Ads..."
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "white",
                    }}
                  />
                </div>

                {/* sort */}
                <div className="w-full lg:w-64">
                  <label className="text-xs text-gray-400">Sırala</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="mt-2 w-full rounded-xl px-4 py-3 text-sm outline-none"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "white",
                    }}
                  >
                    <option value="newest">En yeni</option>
                    <option value="oldest">En eski</option>
                    <option value="readTime">Okuma süresi (uzun → kısa)</option>
                  </select>
                </div>
              </div>

              {/* categories */}
              <div className="mt-5 flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => {
                  const isActive = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="px-5 py-2 text-sm font-medium rounded-full transition-all hover:scale-105"
                      style={{
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        backgroundColor: isActive ? "rgba(255, 255, 255, 0.14)" : "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Grid */}
          <section className="mb-20">
            {filteredPosts.length === 0 ? (
              <div className="text-center text-gray-300 py-20">
                <div className="text-2xl font-bold mb-3">Sonuç bulunamadı</div>
                <p className="text-sm text-gray-400">
                  Farklı bir anahtar kelime deneyin veya kategori filtresini “Tümü” yapın.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="group rounded-2xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer"
                    style={{
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />

                      {/* badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.35)",
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
                              backgroundColor: "rgba(0,0,0,0.35)",
                              border: "1px solid rgba(255,255,255,0.18)",
                              backdropFilter: "blur(10px)",
                              WebkitBackdropFilter: "blur(10px)",
                            }}
                          >
                            {post.readTime}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-gray-400">{post.date}</span>
                        <div className="flex items-center gap-2">
                          {/* author image (optional) */}
                          {post.author && (
                            <img
                              src={post.author}
                              alt="author"
                              className="w-7 h-7 rounded-full border"
                              style={{ borderColor: "rgba(255,255,255,0.18)" }}
                              loading="lazy"
                            />
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 leading-snug">{post.title}</h3>

                      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {(post.tags || []).slice(0, 4).map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {(post.tags || []).length > 4 && (
                          <span className="text-xs text-gray-400">+{post.tags.length - 4}</span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-300 group-hover:gap-4 transition-all">
                          Devamını Oku <span>→</span>
                        </div>
                        <span className="text-xs text-gray-500">/{post.slug}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
}
