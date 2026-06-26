"use client";
import { useEffect, useMemo, useState } from "react";

import { createPortal } from "react-dom";
import { getProductsByTur } from "@/server";

export default function TanitimFilmiCekimleri() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filteredData, setFiltredData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Thumbnail yoksa videodan otomatik thumbnail üretmek için
  const [generatedThumbs, setGeneratedThumbs] = useState({});

  // ✅ İlk etapta 9 göster, "Daha Fazla Gör" ile 9'ar 9'ar arttır
  const PAGE_SIZE = 9;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    getProductsByTur("tanitim-filmi")
      .then((data) => {
        setFiltredData(data || []);
      })
      .catch((e) => {
        console.warn("Backend verisi alınamadı, yerel veri kullanılıyor:", e);
        import("@/data/portfoy.json").then((module) => {
          const localData = (module.default || []).filter((item) => {
            const tur = item?.tur;
            if (Array.isArray(tur)) return tur.includes("tanitim-filmi");
            if (typeof tur === "string") return tur.includes("tanitim-filmi");
            return false;
          });
          setFiltredData(localData);
        });
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Data değişince (yeniden fetch vs) görünür sayıyı resetle
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filteredData.length]);

  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedVideo]);

  const services = useMemo(
    () => [
      {
        icon: "🎬",
        title: "Kurumsal Tanıtım Filmi",
        description:
          "Şirketinizi, ürünlerinizi ve hizmetlerinizi en iyi şekilde anlatan profesyonel tanıtım filmleri",
      },
      {
        icon: "📹",
        title: "Reklam Filmi Çekimi",
        description:
          "TV, sinema ve dijital platformlar için etkileyici reklam film prodüksiyonu",
      },
      {
        icon: "🎥",
        title: "Ürün Tanıtım Videosu",
        description:
          "Ürünlerinizi öne çıkaran, detaylı ve profesyonel çekim ve kurgu",
      },
      {
        icon: "🎯",
        title: "Sosyal Medya İçerikleri",
        description:
          "Instagram, TikTok, YouTube için optimize edilmiş kısa videolar",
      },
      {
        icon: "🏢",
        title: "Etkinlik Çekimi",
        description:
          "Konferans, seminer, fuar ve organizasyonlarınızın profesyonel kaydı",
      },
      {
        icon: "👔",
        title: "Röportaj & Mülakat",
        description:
          "Yönetici görüşleri, çalışan röportajları ve testimonial videoları",
      },
    ],
    []
  );

  const productionSteps = useMemo(
    () => [
      {
        number: "01",
        title: "Ön Prodüksiyon",
        items: [
          "Konsept Geliştirme",
          "Senaryo Yazımı",
          "Storyboard Hazırlama",
          "Lokasyon Keşfi",
          "Oyuncu Seçimi",
        ],
        icon: "📝",
      },
      {
        number: "02",
        title: "Prodüksiyon",
        items: [
          "4K Video Çekim",
          "Profesyonel Ekipman",
          "Deneyimli Ekip",
          "Aydınlatma & Ses",
          "Drone Çekimi",
        ],
        icon: "🎬",
      },
      {
        number: "03",
        title: "Post Prodüksiyon",
        items: [
          "Video Düzenleme",
          "Renk Düzeltme",
          "Ses Düzenleme",
          "Motion Graphics",
          "Müzik & Efekt",
        ],
        icon: "✂️",
      },
      {
        number: "04",
        title: "Teslimat",
        items: [
          "Format Çeşitliliği",
          "Platform Optimizasyonu",
          "Revizyon Hakları",
          "Arşiv Yedekleme",
          "Teknik Destek",
        ],
        icon: "✓",
      },
    ],
    []
  );

  // ✅ Kaynakları tek yerden hesaplayan yardımcılar
  const getVideoSrc = (video) => {
    const raw = video?.video_path
      ? `${(process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr')}${video.video_path}`
      : video?.video;

    return raw && String(raw).trim().length > 0 ? raw : null;
  };

  const getThumbSrc = (video) => {
    const raw = video?.image_path
      ? `${(process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr')}${video.image_path}`
      : video?.image;

    return raw && String(raw).trim().length > 0 ? raw : null;
  };

  // ✅ Thumbnail yoksa videodan frame yakalayıp base64 thumbnail üretir
  const captureVideoFrame = (src, seekTo = 0.1) =>
    new Promise((resolve) => {
      try {
        const v = document.createElement("video");
        v.src = src;
        v.muted = true;
        v.playsInline = true;
        v.preload = "auto";
        v.crossOrigin = "anonymous";

        const cleanup = () => {
          v.pause();
          v.removeAttribute("src");
          v.load();
        };

        const fail = () => {
          cleanup();
          resolve(null);
        };

        v.addEventListener("error", fail, { once: true });

        v.addEventListener(
          "loadedmetadata",
          () => {
            const t = Math.min(
              Math.max(seekTo, 0),
              isFinite(v.duration) ? Math.max(v.duration - 0.05, 0) : seekTo
            );

            const onSeeked = () => {
              try {
                const canvas = document.createElement("canvas");
                canvas.width = v.videoWidth || 1280;
                canvas.height = v.videoHeight || 720;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

                const dataUrl = canvas.toDataURL("image/jpeg", 0.82);
                cleanup();
                resolve(dataUrl);
              } catch (e) {
                cleanup();
                resolve(null);
              }
            };

            v.addEventListener("seeked", onSeeked, { once: true });

            try {
              v.currentTime = t;
            } catch {
              v.play()
                .then(() => {
                  v.pause();
                  v.currentTime = t;
                })
                .catch(() => fail());
            }
          },
          { once: true }
        );
      } catch {
        resolve(null);
      }
    });

  // ✅ Data geldiğinde, thumbnail olmayan videolar için otomatik thumbnail üret
  useEffect(() => {
    if (!filteredData?.length) return;

    let cancelled = false;

    (async () => {
      for (const item of filteredData) {
        if (cancelled) return;

        const id = item?.id ?? item?._id ?? item?.slug ?? item?.title;
        if (!id) continue;

        const videoSrc = getVideoSrc(item);
        const thumbSrc = getThumbSrc(item);

        if (!videoSrc || thumbSrc) continue;
        if (generatedThumbs[id]) continue;

        const frame = await captureVideoFrame(videoSrc, 0.1);
        if (cancelled) return;

        if (frame) {
          setGeneratedThumbs((prev) => ({ ...prev, [id]: frame }));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  const equipment = useMemo(
    () => [
      { name: "4K Kamera", icon: "📷" },
      { name: "Drone", icon: "🚁" },
      { name: "Gimbal", icon: "📹" },
      { name: "Profesyonel Aydınlatma", icon: "💡" },
      { name: "Ses Ekipmanları", icon: "🎤" },
      { name: "Editing Suite", icon: "💻" },
    ],
    []
  );

  // ✅ Ekranda gösterilecek liste
  const visibleVideos = useMemo(() => {
    const arr = Array.isArray(filteredData) ? filteredData : [];
    return arr.slice(0, visibleCount);
  }, [filteredData, visibleCount]);

  const hasMore = filteredData.length > visibleCount;

  return (
    <>
      

      <div
        className="min-h-screen text-white relative overflow-hidden"
        style={{ zIndex: 1, position: "relative" }}
      >
        {/* HERO */}
        <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-85"></div>
          <div className="absolute inset-0 bg-[url('/hizmetler-arka-plan/tanıtımfilmibg.jpeg')] bg-cover bg-center opacity-30"></div>

          <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6">
            <div className="inline-block mb-8 px-4 sm:px-6 py-2 bg-red-600/20 backdrop-blur-md rounded-full border border-red-500/30">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-red-400">
                ● REC Tanıtım Filmi Çekimleri
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-8 leading-tight px-4 font-thin">
              Hikayenizi
              <br />
              <span className="bg-gradient-to-r font-bold from-rose-700 via-red-400 to-pink-800 bg-clip-text text-transparent">
                Sinemaya Dönüştürün
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              4K profesyonel kamera ekipmanları, deneyimli prodüksiyon ekibi ve
              yaratıcı kurgu ile markanızı unutulmaz bir hikaye haline
              getiriyoruz
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 mb-12">
              <a
                href="#hizmetler"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                🎬 Hizmetlerimizi Keşfedin
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 text-sm sm:text-base"
              >
                ▶️ Çalışmalarımızı İzleyin
              </a>
            </div>
          </div>
        </section>

        {/* HİZMETLER */}
        <section
          id="hizmetler"
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 px-4">
                Video Prodüksiyon Hizmetlerimiz
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Her türlü video ihtiyacınız için profesyonel çözümler
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="text-5xl sm:text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-red-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODÜKSİYON SÜRECİ */}
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 px-4">
                Prodüksiyon Sürecimiz
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Fikirden teslimata kadar profesyonel 4 aşamalı süreç
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productionSteps.map((step, index) => (
                <div key={index} className="relative group">
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-20 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-red-500/50 to-orange-500/50"></div>
                  )}

                  <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <div className="text-3xl font-bold mb-2 text-gray-600">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <ul className="space-y-2">
                      {step.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-400"
                        >
                          <span className="text-red-400 mt-1">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLYO */}
        <section
          id="portfolio"
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 px-4">
                Video Portföyümüz
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 px-4">
                Gerçekleştirdiğimiz bazı başarılı video projeler
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                  <p className="text-gray-400 mt-4">Videolar yükleniyor...</p>
                </div>
              ) : filteredData.length > 0 ? (
                visibleVideos.map((video) => {
                  const id =
                    video?.id ?? video?._id ?? video?.slug ?? video?.title;
                  const videoSrc = getVideoSrc(video);
                  const thumbSrc = getThumbSrc(video);
                  const genThumb = id ? generatedThumbs[id] : null;

                  const hasVideo = Boolean(videoSrc);
                  const displayThumb = thumbSrc || genThumb;

                  return (
                    <div
                      key={id || video?.id}
                      className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-gradient-to-br from-red-500/20 to-orange-500/20"
                      onClick={() => hasVideo && setSelectedVideo(videoSrc)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (!hasVideo) return;
                        if (e.key === "Enter" || e.key === " ")
                          setSelectedVideo(videoSrc);
                      }}
                      aria-label={
                        video?.title ? `${video.title} videosunu aç` : "Video aç"
                      }
                    >
                      {hasVideo ? (
                        <>
                          {displayThumb ? (
                            <img
                              src={displayThumb}
                              alt={video.alt || video.title || "Video görseli"}
                              className="absolute inset-0 w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <video
                              src={videoSrc}
                              className="absolute inset-0 w-full h-full object-cover"
                              muted
                              playsInline
                              preload="metadata"
                            />
                          )}

                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <span className="text-4xl">▶️</span>
                            </div>
                            <p className="text-sm text-gray-400">
                              Video Eklenecek
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {video.category && (
                            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full mb-2">
                              {video.category}
                            </span>
                          )}

                          <h4 className="text-lg sm:text-xl font-bold mb-2">
                            {video.title}
                          </h4>

                          {video.description && (
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                              {video.description}
                            </p>
                          )}

                          {Array.isArray(video.tags) && video.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {video.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded text-xs text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {(video.client || video.year) && (
                            <div className="flex items-center justify-between pt-3 border-t border-white/20">
                              {video.client && (
                                <span className="text-xs text-gray-400">
                                  📹 {video.client}
                                </span>
                              )}
                              {video.year && (
                                <span className="text-xs text-gray-400">
                                  📅 {video.year}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                            <span className="text-2xl ml-1">▶️</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-400 text-lg">
                    Henüz tanıtım filmi eklenmemiş.
                  </p>
                </div>
              )}
            </div>

            {/* ✅ DAHA FAZLA GÖR BUTONU */}
            {!loading && filteredData.length > 0 && hasMore && (
              <div className="flex justify-center mt-10">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(prev + PAGE_SIZE, filteredData.length)
                    )
                  }
                  className="px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  Daha Fazla Gör ({Math.min(visibleCount, filteredData.length)}/
                  {filteredData.length})
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ✅ PORTAL MODAL */}
        {selectedVideo &&
          createPortal(
            <div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
              onClick={() => setSelectedVideo(null)}
            >
              <div
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors text-4xl z-[10000]"
                >
                  ✕
                </button>

                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  playsInline
                  className="w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl bg-black"
                >
                  Tarayıcınız video etiketini desteklemiyor.
                </video>
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
}

