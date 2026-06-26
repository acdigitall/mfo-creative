"use client";
import { useState } from "react";
import { createProduct } from "@/server";

export default function AddProduct() {
  // ❗️Bu kutucuklar artık TUR olacak
  const turList = [
    { value: "tasarim", label: "Tasarım" },
    { value: "baski", label: "Baskı" },
    { value: "sosyal", label: "Sosyal Medya" },
    { value: "tanitim-filmi", label: "Tanıtım Filmi" },
    { value: "kimlik", label: "Kurumsal Kimlik" },
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
    alt: "",
    client: "",
    year: "",

    // checkbox -> tur olacak
    tur: [],

    // text input -> category olacak (virgülle)
    categoryText: "",

    tagsText: "",

    imageFile: null,
    videoFile: null,
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const parseCSV = (s) =>
    (s || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

  const isTurChecked = (v) => (form.tur || []).includes(v);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    // TUR checkbox
    if (type === "checkbox" && name === "tur") {
      setForm((prev) => {
        const current = prev.tur || [];
        return {
          ...prev,
          tur: checked ? [...current, value] : current.filter((x) => x !== value),
        };
      });
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const payload = {
        title: form.title,
        description: form.description,
        alt: form.alt,
        client: form.client,
        year: form.year ? Number(form.year) : null,

        // ✅ category artık text inputtan gelecek (CSV -> string)
        category: parseCSV(form.categoryText).join(","),

        // ✅ tur checkbox'tan array olarak gidiyor
        tur: form.tur || [],

        // tags yine csv -> array
        tags: parseCSV(form.tagsText),

        imageFile: form.imageFile,
        videoFile: form.videoFile,
      };

      const created = await createProduct(payload);
      setMsg(`✅ Oluşturuldu: #${created.id}`);

      setForm({
        title: "",
        description: "",
        alt: "",
        client: "",
        year: "",
        tur: [],
        categoryText: "",
        tagsText: "",
        imageFile: null,
        videoFile: null,
      });
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Yapılan İş Yükleme Sayfası
            </h1>
          </div>

          <form className="space-y-8" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700 font-medium mb-1 block">İşin Başlığı *</span>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Örn: Logo Tasarım Projesi"
                    required
                  />
                </label>
              </div>
            </div>

            {/* TUR (çoklu) - eskiden categories idi */}
            <div className="space-y-2">
              <span className="text-gray-700 font-medium mb-2 block">
                Türler *
                {form.tur.length > 0 && (
                  <span className="text-sm text-gray-500 font-normal ml-2">
                    ({form.tur.length} seçili)
                  </span>
                )}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {turList.map((t) => (
                  <div key={t.value} className="relative">
                    <input
                      type="checkbox"
                      id={`tur-${t.value}`}
                      name="tur"
                      value={t.value}
                      checked={isTurChecked(t.value)}
                      onChange={onChange}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={`tur-${t.value}`}
                      className="flex items-center p-3 border rounded-lg cursor-pointer transition-all
                        peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-600
                        hover:bg-gray-50 border-gray-300"
                    >
                      <div
                        className="w-5 h-5 border border-gray-400 rounded mr-2 flex items-center justify-center"
                        style={{
                          background: isTurChecked(t.value) ? "white" : "transparent",
                          borderColor: isTurChecked(t.value) ? "#2563eb" : undefined,
                        }}
                      >
                        <svg
                          className="w-3 h-3 text-blue-600"
                          style={{ display: isTurChecked(t.value) ? "block" : "none" }}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span className="text-sm">{t.label}</span>
                    </label>
                  </div>
                ))}
              </div>

              {form.tur.length === 0 && (
                <p className="text-sm text-red-500">En az 1 tür seçmelisin.</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block">
                <span className="text-gray-700 font-medium mb-1 block">İşin Açıklaması *</span>
                <textarea
                  name="description"
                  rows="4"
                  value={form.description}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                  placeholder="Proje hakkında detaylı açıklama..."
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700 font-medium mb-1 block">İşin Yılı</span>
                  <input
                    type="number"
                    name="year"
                    min="1900"
                    max="2100"
                    value={form.year}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="2024"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700 font-medium mb-1 block">İşin Müşterisi</span>
                  <input
                    type="text"
                    name="client"
                    value={form.client}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="Müşteri adı"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <label className="block">
                  <span className="text-gray-700 font-medium mb-1 block">Etiketler (virgülle ayırın)</span>
                  <input
                    type="text"
                    name="tagsText"
                    value={form.tagsText}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                    placeholder="logo, tasarım, branding"
                  />
                </label>
              </div>
            </div>

            {/* CATEGORY (virgülle) - eskiden turText idi */}
            <div className="space-y-2">
              <label className="block">
                <span className="text-gray-700 font-medium mb-1 block">Kategori (virgülle ayırın)</span>
                <input
                  type="text"
                  name="categoryText"
                  value={form.categoryText}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="katalog, afis, logo"
                />
              </label>
            </div>

            <div className="space-y-2">
              <label className="block">
                <span className="text-gray-700 font-medium mb-1 block">Yüklenecek görselin alt açıklaması</span>
                <input
                  type="text"
                  name="alt"
                  value={form.alt}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  placeholder="Alt açıklama..."
                />
              </label>
            </div>

            <div className="space-y-2">
              <span className="text-gray-700 font-medium mb-1 block">Görsel Yükle *</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageFile: e.target.files?.[0] || null }))
                }
                required
              />
              {form.imageFile && <p className="text-sm text-gray-500">Seçilen: {form.imageFile.name}</p>}
            </div>

            <div className="space-y-2">
              <span className="text-gray-700 font-medium mb-1 block">Video (opsiyonel)</span>
              <input
                type="file"
                accept="video/mp4,video/webm"
                onChange={(e) =>
                  setForm((p) => ({ ...p, videoFile: e.target.files?.[0] || null }))
                }
              />
              {form.videoFile && <p className="text-sm text-gray-500">Seçilen: {form.videoFile.name}</p>}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading || form.tur.length === 0}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg disabled:opacity-60"
              >
                {loading ? "Yükleniyor..." : "İşi Kaydet ve Yükle"}
              </button>
            </div>

            {msg && <p className="pt-2">{msg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

