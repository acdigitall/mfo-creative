import { useState } from "react";
import { createProduct } from "@/server";

export default function AddWork() {
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
    tur: [],
    categoryText: "",
    tagsText: "",
    imageFile: null,
    videoFile: null,
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const parseCSV = (s) => (s || "").split(",").map((x) => x.trim()).filter(Boolean);
  const isTurChecked = (v) => (form.tur || []).includes(v);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
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
        category: parseCSV(form.categoryText).join(","),
        tur: form.tur || [],
        tags: parseCSV(form.tagsText),
        imageFile: form.imageFile,
        videoFile: form.videoFile,
      };
      const created = await createProduct(payload);
      setMsg(`✅ Başarıyla Oluşturuldu: #${created.id}`);
      setForm({ title: "", description: "", alt: "", client: "", year: "", tur: [], categoryText: "", tagsText: "", imageFile: null, videoFile: null });
    } catch (err) {
      setMsg(`❌ Hata: ${err.message}`);
    } finally {
      setLoading(false);
    }
    // 👇 BUNU EKLE

  };

  return (
    <div className=" text-gray-200 py-12 px-4 font-sans">
      <div className=" mx-auto">

        <div className="mb-12 border-l-4 border-blue-600 pl-6">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase">Yeni Eser Ekle</h1>
          <p className="text-gray-500 mt-2 font-medium">Stüdyo portföyünüze yeni bir proje dahil edin.</p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-8 space-y-8">
            <div className=" border border-gray-800 rounded-3xl p-8 shadow-2xl">

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2 block">Proje Başlığı *</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={onChange}
                    className="w-full bg-transparent border-b-2 border-gray-800 py-3 text-2xl font-light focus:border-blue-500 outline-none transition-all placeholder:text-gray-700 text-white"
                    placeholder="Eserin adını giriniz..."
                    required
                  />
                </div>

                {/* Açıklama */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 block">Proje Detayları</label>
                  <textarea
                    name="description"
                    rows="5"
                    value={form.description}
                    onChange={onChange}
                    className="w-full  border border-gray-800 rounded-2xl p-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none text-gray-300"
                    placeholder="İşin hikayesini anlatın..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Türler Paneli */}
            <div className="border border-gray-800 rounded-3xl p-8">
              <label className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-6 block text-center lg:text-left">Çalışma Türleri</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {turList.map((t) => (
                  <label key={t.value} className="relative group cursor-pointer">
                    <input
                      type="checkbox"
                      name="tur"
                      value={t.value}
                      checked={isTurChecked(t.value)}
                      onChange={onChange}
                      className="hidden peer"
                    />
                    <div className="p-4 rounded-xl border border-gray-800] text-center transition-all 
                      peer-checked:bg-blue-600 peer-checked:border-blue-400 peer-checked:text-white
                      hover:border-gray-600 group-active:scale-95">
                      <span className="text-sm font-semibold tracking-wide">{t.label}</span>
                    </div>
                  </label>
                ))}
              </div>
              {form.tur.length === 0 && <p className="text-xs text-red-500 mt-4 animate-pulse">Lütfen en az bir tür seçin.</p>}
            </div>

            {/* Medya Yükleme Alanı */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className=" border border-gray-800 rounded-3xl p-6 relative overflow-hidden group">
                <div className="flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-gray-800 rounded-2xl py-8 group-hover:border-blue-500/50 transition-colors">
                  <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white leading-tight">Görsel Seç *</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">WebP, PNG, JPG</p>
                  </div>
                  <input type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, imageFile: e.target.files?.[0] || null }))} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                {form.imageFile && <div className="mt-4 p-2 bg-blue-600/10 rounded text-[10px] text-blue-400 truncate text-center font-mono uppercase tracking-tighter">{form.imageFile.name}</div>}
              </div>

              <div className=" border border-gray-800 rounded-3xl p-6 relative group">
                <div className="flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-gray-800 rounded-2xl py-8 group-hover:border-purple-500/50 transition-colors">
                  <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white leading-tight">Video Ekle</p>
                    <p className="text-[10px] text-gray-500 uppercase mt-1">MP4, WebM (Opsiyonel)</p>
                  </div>
                  <input type="file" accept="video/*" onChange={(e) => setForm((p) => ({ ...p, videoFile: e.target.files?.[0] || null }))} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
                {form.videoFile && <div className="mt-4 p-2 bg-purple-600/10 rounded text-[10px] text-purple-400 truncate text-center font-mono uppercase tracking-tighter">{form.videoFile.name}</div>}
              </div>
            </div>
          </div>

          {/* Sağ Kolon - Detaylar & Submit */}
          <div className="lg:col-span-4 space-y-6">
            <div className=" border border-gray-800 rounded-3xl p-8 space-y-6">

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Yıl</label>
                  <input type="number" name="year" value={form.year} onChange={onChange} className="w-full  border border-gray-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="2024" />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Müşteri</label>
                  <input type="text" name="client" value={form.client} onChange={onChange} className="w-full  border border-gray-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" placeholder="Müşteri Adı" />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Etiketler</label>
                  <input type="text" name="tagsText" value={form.tagsText} onChange={onChange} className="w-full border border-gray-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all text-sm" placeholder="etiket, etiket, ..." />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Kategori</label>
                  <input type="text" name="categoryText" value={form.categoryText} onChange={onChange} className="w-full  border border-gray-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all text-sm" placeholder="logo, kimlik, ..." />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">Görsel Alt Metni</label>
                  <input type="text" name="alt" value={form.alt} onChange={onChange} className="w-full  border border-gray-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all text-sm" placeholder="SEO açıklaması..." />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || form.tur.length === 0}
                  className="cursor-pointer w-full group relative flex items-center justify-center p-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-30 disabled:grayscale shadow-lg shadow-blue-900/20"
                >
                  {loading ? (
                    <span className="flex items-center"><svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg> Yükleniyor...</span>
                  ) : (
                    "Projeyi Yayınla"
                  )}
                </button>
              </div>

              {msg && (
                <div className={`text-center p-4 rounded-xl text-xs font-bold uppercase tracking-tighter ${msg.includes('✅') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {msg}
                </div>
              )}
            </div>

            {/* Bilgi Kutusu */}
            <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10">
              <h4 className="text-blue-500 text-xs font-bold uppercase mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                İpucu
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed italic">
                En iyi SEO sonuçları için etiketleri ve kategorileri virgülle ayırarak giriniz. Görsel boyutunun 5MB'ı geçmemesine özen gösteriniz.
              </p>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
