import { useEffect, useState } from "react";
import { getProducts, deleteProduct, updateProduct } from "@/server";
import { Pencil, Trash2, Search, Image as ImageIcon, Calendar, Tag, X } from "lucide-react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr');

export default function EditWork() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Edit modal state
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError("");

        getProducts()
            .then((data) => {
                const normalized = (data || []).map((p) => {
                    let turArr = p.tur;

                    if (typeof turArr === "string") {
                        turArr = turArr
                            .replace(/[{}]/g, "")
                            .split(",")
                            .map((x) => x.trim())
                            .filter(Boolean);
                    }

                    const imageUrl = p.image_path ? `${API_BASE}${p.image_path}` : null;

                    return {
                        ...p,
                        tur: Array.isArray(turArr) ? turArr : [],
                        image: imageUrl,
                    };
                });

                setProjects(normalized);
            })
            .catch((e) => {
                console.error(e);
                setError(e?.message || "Bir hata oluştu");
            })
            .finally(() => setLoading(false));
    }, []);

    const filteredProjects = projects.filter((project) =>
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProjects = filteredProjects.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const handleDelete = async (id) => {
        if (window.confirm("Bu işi silmek istediğinize emin misiniz?")) {
            try {
                await deleteProduct(id);
                setProjects(projects.filter(p => p.id !== id));
            } catch (error) {
                console.error("Silme hatası:", error);
                alert("İş silinirken bir hata oluştu: " + error.message);
            }
        }
    };

    const handleEdit = (id) => {
        const project = projects.find(p => p.id === id);
        if (!project) return;

        setEditingProject(project);
        setEditForm({
            title: project.title || "",
            category: project.category || "",
            description: project.description || "",
            alt: project.alt || "",
            client: project.client || "",
            year: project.year || "",
            tags: project.tags || [],
            tur: project.tur || [],
            imageFile: null,
            videoFile: null,
        });
        setIsEditModalOpen(true);

        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.style.overflow = 'hidden';
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editingProject) return;

        setSaving(true);
        try {
            const updated = await updateProduct(editingProject.id, editForm);

            setProjects(projects.map(p => {
                if (p.id === editingProject.id) {
                    const imageUrl = updated.image_path ? `${API_BASE}${updated.image_path}` : p.image;
                    return { ...updated, image: imageUrl };
                }
                return p;
            }));

            setIsEditModalOpen(false);
            setEditingProject(null);
            document.body.style.overflow = 'auto';
        } catch (err) {
            console.error("Güncelleme hatası:", err);
            alert("İş güncellenirken bir hata oluştu: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleEditFormChange = (field, value) => {
        setEditForm(prev => ({ ...prev, [field]: value }));
    };

    const handleTurToggle = (turValue) => {
        setEditForm(prev => {
            const currentTur = prev.tur || [];
            const newTur = currentTur.includes(turValue)
                ? currentTur.filter(t => t !== turValue)
                : [...currentTur, turValue];
            return { ...prev, tur: newTur };
        });
    };

    const closeModal = () => {
        setIsEditModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">İşleri Yönet</h1>
                    <p className="text-gray-400 mt-1">{filteredProjects.length} iş listeleniyor</p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="İş ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800/40 border border-gray-700/50 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-400">Yükleniyor...</p>
                    </div>
                </div>
            ) : error ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                    <p className="text-red-400 font-semibold">Hata: {error}</p>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-12 text-center">
                    <p className="text-gray-400">Hiç iş bulunamadı</p>
                </div>
            ) : (
                <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700/50">
                                    <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Görsel
                                    </th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Başlık
                                    </th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">
                                        Açıklama
                                    </th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                                        Türler
                                    </th>
                                    <th className="text-right p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentProjects.map((project, index) => (
                                    <tr
                                        key={project.id}
                                        className="border-b border-gray-700/30 last:border-0 hover:bg-gray-700/20 transition-colors group"
                                    >
                                        {/* Image */}
                                        <td className="p-4">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon size={24} className="text-gray-600" />
                                                )}
                                            </div>
                                        </td>

                                        {/* Title */}
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-semibold">
                                                    {project.title}
                                                </span>
                                                {project.client && (
                                                    <span className="text-xs text-gray-500 mt-1">
                                                        {project.client}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        {/* Description */}
                                        <td className="p-4 hidden md:table-cell">
                                            <p className="text-sm text-gray-400 line-clamp-2 max-w-xs">
                                                {project.description}
                                            </p>
                                        </td>

                                        {/* Tags */}
                                        <td className="p-4 hidden lg:table-cell">
                                            <div className="flex flex-wrap gap-1">
                                                {project.tur?.slice(0, 2).map((t, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded text-xs text-blue-300"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                                {project.tur?.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-400">
                                                        +{project.tur.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(project.id)}
                                                    className="cursor-pointer p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="cursor-pointer p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700/50">
                            <div className="text-sm text-gray-400">
                                Sayfa {currentPage} / {totalPages} ({filteredProjects.length} toplam iş)
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                >
                                    Önceki
                                </button>

                                {/* Page Numbers */}
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${currentPage === page
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                                >
                                    Sonraki
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isEditModalOpen && editingProject && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-700/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-gray-900 border-b border-gray-700/50 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">İşi Düzenle</h2>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                        Başlık *
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.title || ""}
                                        onChange={(e) => handleEditFormChange("title", e.target.value)}
                                        className="w-full bg-gray-800/40 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                        Kategori
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.category || ""}
                                        onChange={(e) => handleEditFormChange("category", e.target.value)}
                                        className="w-full bg-gray-800/40 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                    Açıklama
                                </label>
                                <textarea
                                    value={editForm.description || ""}
                                    onChange={(e) => handleEditFormChange("description", e.target.value)}
                                    rows={3}
                                    className="w-full bg-gray-800/40 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                        Müşteri
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.client || ""}
                                        onChange={(e) => handleEditFormChange("client", e.target.value)}
                                        className="w-full bg-gray-800/40 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                        Yıl
                                    </label>
                                    <input
                                        type="number"
                                        value={editForm.year || ""}
                                        onChange={(e) => handleEditFormChange("year", e.target.value)}
                                        className="w-full bg-gray-800/40 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                        Alt Text
                                    </label>
                                    <input
                                        type="text"
                                        value={editForm.alt || ""}
                                        onChange={(e) => handleEditFormChange("alt", e.target.value)}
                                        className="w-full bg-gray-800/40 border border-gray-700/50 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                    Türler
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {["baski", "tasarim", "kmlik", "sosyal"].map((tur) => (
                                        <button
                                            key={tur}
                                            type="button"
                                            onClick={() => handleTurToggle(tur)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${(editForm.tur || []).includes(tur)
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-800/40 text-gray-400 hover:bg-gray-700/40"
                                                }`}
                                        >
                                            {tur}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Görsel & Video Yükleme - Yan Yana */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Mevcut Görsel + Yeni Yükleme */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                        Görsel
                                    </label>
                                    {editingProject.image && (
                                        <img
                                            src={editingProject.image}
                                            alt={editingProject.title}
                                            className="w-full h-32 object-cover rounded-lg border border-gray-700/50 mb-2"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleEditFormChange("imageFile", e.target.files?.[0] || null)}
                                        className="w-full text-xs bg-gray-800/40 border border-gray-700/50 rounded-lg px-2 py-1.5 text-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-500 file:text-white file:text-xs file:cursor-pointer hover:file:bg-blue-600 transition-colors"
                                    />
                                </div>

                                {/* Video Yükleme */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                                        Video
                                    </label>
                                    <div className="h-32 bg-gray-800/40 rounded-lg border border-gray-700/50 mb-2 flex items-center justify-center">
                                        <span className="text-xs text-gray-500">Video önizleme yok</span>
                                    </div>
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => handleEditFormChange("videoFile", e.target.files?.[0] || null)}
                                        className="w-full text-xs bg-gray-800/40 border border-gray-700/50 rounded-lg px-2 py-1.5 text-white file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-500 file:text-white file:text-xs file:cursor-pointer hover:file:bg-blue-600 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors"
                                >
                                    {saving ? "Kaydediliyor..." : "Kaydet"}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="px-6 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
                                >
                                    İptal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
