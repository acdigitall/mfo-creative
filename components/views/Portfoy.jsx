"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";

import { getProducts } from "@/server";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr');

export default function Portfoy() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [selectedProject, setSelectedProject] = useState(null);

  const [projects, setProjects] = useState([]); // ✅ backend data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;
  const projectsGridRef = useRef(null);

  // ✅ Backend'den çek, hata olursa JSON'dan al
  useEffect(() => {
    setLoading(true);
    setError("");

    getProducts()
      .then((data) => {
        // tur bazen string olabilir, normalize edelim
        const normalized = (data || []).map((p) => {
          let turArr = p.tur;

          // tur string geldiyse: "{baski,tasarim}" veya "baski,tasarim"
          if (typeof turArr === "string") {
            turArr = turArr
              .replace(/[{}]/g, "")
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean);
          }

          // image url normalize
          const imageUrl = p.image_path ? (p.image_path.startsWith('http') ? p.image_path : `${API_BASE}${p.image_path}`) : p.image;
          const videoUrl = p.video_path ? (p.video_path.startsWith('http') ? p.video_path : `${API_BASE}${p.video_path}`) : p.video;

          return {
            ...p,
            tur: Array.isArray(turArr) ? turArr : [],
            image: imageUrl,
            video: videoUrl,
          };
        });

        setProjects(normalized);
      })
      .catch((e) => {
        console.warn("Backend verisi alınamadı, yerel veri kullanılıyor:", e);
        setError(""); // Hatayı temizle
        // Hata durumunda yerel JSON verisini kullan, finally'nin beklemesi için return et
        return import("@/data/portfoy.json").then((module) => {
          setProjects(module.default || []);
        });
      })
      .finally(() => setLoading(false));
  }, []);

  // Modal açıldığında body scroll kilitle
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [selectedProject]);

  // kategori isimleri
  const getCategoryLabel = (category) => {
    const labels = {
      "Tümü": "Tümü",
      baski: "Baskı Hizmetleri",
      tasarim: "Tasarım",
      kurumsal: "Kurumsal Kimlik",
      sosyal: "Sosyal Medya",
      kimlik: "Kurumsal Kimlik",
      reklam: "Reklam",
      "tanitim-filmi": "Tanıtım Filmi",
      "web-tasarim": "Web Tasarım",
    };
    return labels[category] || category;
  };

  // ✅ Kategorileri DB'deki `tur` alanından çıkar
  const categories = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.tur || []).forEach((t) => set.add(t)));
    return ["Tümü", ...Array.from(set)];
  }, [projects]);

  // ✅ Filtreleme (tur array içinden)
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "Tümü") return projects;
    return projects.filter((p) => (p.tur || []).includes(selectedCategory));
  }, [projects, selectedCategory]);

  // pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // kategori değişince sayfayı sıfırla
  useEffect(() => setCurrentPage(1), [selectedCategory]);

  // sayfa değişince grid'e scroll
  useEffect(() => {
    if (!projectsGridRef.current) return;
    const yOffset = -100;
    const y = projectsGridRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      

      <div className="min-h-screen text-white relative overflow-hidden" style={{ zIndex: 1, position: "relative" }}>
        {/* Hero */}
        <section className="relative min-h-[80vh] sm:min-h-[75vh] flex items-center justify-center pt-24 sm:pt-32 pb-20 sm:pb-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>

          <div className="relative z-10 text-center max-w-5xl mx-auto mb-12">
            <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-300">
                Portföy
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight px-4">
              Başarılı
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Projelerimiz
              </span>
            </h1>
          </div>
        </section>

        <section className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6 sticky top-16 sm:top-20 z-30 backdrop-blur-xl bg-black/80 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="sm:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category} className="bg-gray-900 text-white">
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-center items-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 cursor-pointer py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-xs md:text-sm whitespace-nowrap ${selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white scale-105 shadow-lg"
                    : "bg-white/5 text-white hover:bg-white/10 hover:scale-105"
                    }`}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section ref={projectsGridRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {loading && <p className="text-center text-gray-400">Yükleniyor...</p>}
            {!loading && error && <p className="text-center text-red-400">Hata: {error}</p>}

            {!loading && !error && (
              <>
                <div className="mb-8 text-center">
                  <p className="text-sm sm:text-base text-gray-400">
                    {filteredProjects.length} proje bulundu
                    {totalPages > 1 && (
                      <span className="ml-2">
                        (Sayfa {currentPage} / {totalPages})
                      </span>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {currentProjects.map((project) => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="group rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer"
                      style={{
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                      }}
                    >
                      <div className="h-48 sm:h-56 md:h-64 relative overflow-hidden bg-gray-900">
                        {/* Eğer tur tanitim-filmi ise video göster, değilse görsel */}
                        {project.tur?.includes("tanitim-filmi") && project.video ? (
                          <>
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.alt || project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <video
                                src={project.video}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                muted
                                playsInline
                              />
                            )}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                                <span className="text-2xl ml-1">▶️</span>
                              </div>
                            </div>
                          </>
                        ) : project.image ? (
                          <img
                            src={project.image}
                            alt={project.alt || project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.parentElement.classList.add("flex", "items-center", "justify-center");
                              e.currentTarget.parentElement.innerHTML = '<div class="text-6xl">📁</div>';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-6xl">📁</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10">
                            {(project.tur?.[0] && getCategoryLabel(project.tur[0])) || "Genel"}
                          </span>
                          <span className="text-xs text-gray-400">{project.year || ""}</span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-400 mb-3">{project.client || ""}</p>
                        <p className="text-gray-300 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-3">
                          {project.description || ""}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {(project.tags || []).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${currentPage === 1
                        ? "bg-white/5 text-gray-500 cursor-not-allowed"
                        : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                        }`}
                    >
                      ← Önceki
                    </button>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full font-semibold transition-all duration-300 ${currentPage === pageNumber
                                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white scale-110 shadow-lg"
                                : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                                }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                          return (
                            <span key={pageNumber} className="text-gray-500 px-2">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${currentPage === totalPages
                        ? "bg-white/5 text-gray-500 cursor-not-allowed"
                        : "bg-white/10 text-white hover:bg-white/20 hover:scale-105"
                        }`}
                    >
                      Sonraki →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedProject &&
          createPortal(
            <div
              className="fixed inset-0 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              style={{ zIndex: 999999 }}
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl"
                style={{
                  backdropFilter: "blur(20px)",
                  backgroundColor: "rgba(20, 20, 20, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  zIndex: 1000000,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white text-xl"
                >
                  ✕
                </button>

                <div className="p-6 sm:p-8 md:p-12">
                  <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs sm:text-sm font-semibold mb-4">
                    {(selectedProject.tur?.[0] && getCategoryLabel(selectedProject.tur[0])) || "Genel"}
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">
                    {selectedProject.title}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                    <span>👤 {selectedProject.client || ""}</span>
                    <span>📅 {selectedProject.year || ""}</span>
                  </div>

                  <div className="relative w-full rounded-2xl overflow-hidden mb-8 bg-gray-900">
                    {/* Modal'da da aynı mantık: tanitim-filmi ise video oynat */}
                    {selectedProject.tur?.includes("tanitim-filmi") && selectedProject.video ? (
                      <video
                        src={selectedProject.video}
                        controls
                        autoPlay
                        playsInline
                        className="w-full h-auto max-h-[500px] object-contain"
                      >
                        Tarayıcınız video etiketini desteklemiyor.
                      </video>
                    ) : selectedProject.image ? (
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.alt || selectedProject.title}
                        className="w-full h-auto max-h-[500px] object-contain"
                      />
                    ) : (
                      <div className="text-9xl flex items-center justify-center h-96">📁</div>
                    )}
                  </div>

                  <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                    {selectedProject.description || ""}
                  </p>

                  {(selectedProject.tags || []).length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 text-white">Etiketler</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="/iletisim"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all text-center text-sm sm:text-base"
                    >
                      Benzer Bir Proje İstiyorum
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </>
  );
}

