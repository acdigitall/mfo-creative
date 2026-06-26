// src/api/index.js  (veya senin dosya neredeyse)

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
// örn prod: https://api.mfocreative.com.tr
// örn local: http://localhost:4000

async function safeJson(res) {
  return res.json().catch(() => null);
}

/** -------------------- PRODUCTS -------------------- **/

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`, {
    credentials: "include", // ✅ her ihtimale karşı
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || "Failed to fetch products");
  return data;
  console.log("API_BASE:", API_BASE);

}

export async function getProductsByTur(tur) {
  const res = await fetch(`${API_BASE}/api/products?tur=${encodeURIComponent(tur)}`, {
    credentials: "include",
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || "Failed to fetch products");
  return data;
}

export async function createProduct(form) {
  const fd = new FormData();
  fd.append("title", form.title);

  if (form.category) fd.append("category", form.category);
  if (form.description) fd.append("description", form.description);
  if (form.alt) fd.append("alt", form.alt);
  if (form.client) fd.append("client", form.client);
  if (form.year) fd.append("year", String(form.year));

  fd.append("tags", JSON.stringify(form.tags || []));
  fd.append("tur", JSON.stringify(form.tur || []));

  if (form.imageFile) fd.append("image", form.imageFile);
  if (form.videoFile) fd.append("video", form.videoFile);

  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    body: fd,
    credentials: "include", // ✅ ÇOK ÖNEMLİ
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  if (!data || typeof data !== "object") throw new Error("Server returned empty response.");
  return data;
}

export async function updateProduct(id, form) {
  const fd = new FormData();

  if (form.title !== undefined && form.title !== null) fd.append("title", form.title);
  if (form.category) fd.append("category", form.category);
  if (form.description) fd.append("description", form.description);
  if (form.alt) fd.append("alt", form.alt);
  if (form.client) fd.append("client", form.client);
  if (form.year) fd.append("year", String(form.year));

  fd.append("tags", JSON.stringify(form.tags || []));
  fd.append("tur", JSON.stringify(form.tur || []));

  if (form.imageFile) fd.append("image", form.imageFile);
  if (form.videoFile) fd.append("video", form.videoFile);

  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "PUT",
    body: fd,
    credentials: "include", // ✅ ÇOK ÖNEMLİ
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
  if (!data || typeof data !== "object") throw new Error("Server returned empty response.");
  return data;
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "DELETE",
    credentials: "include", // ✅ ÇOK ÖNEMLİ
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || "Failed to delete product");
  return data;
}

/** -------------------- ADMIN -------------------- **/

export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ cookie al/gönder
    body: JSON.stringify({ username, password }),
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || `Login failed (${res.status})`);
  return data; // { ok: true }
}

export async function adminLogout() {
  const res = await fetch(`${API_BASE}/api/admin/logout`, {
    method: "POST",
    credentials: "include", // ✅ cookie silme için
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || `Logout failed (${res.status})`);
  return data; // { ok: true }
}

export async function adminMe() {
  const res = await fetch(`${API_BASE}/api/admin/me`, {
    credentials: "include", // ✅ session var mı bak
  });

  const data = await safeJson(res);
  if (!res.ok) throw new Error(data?.error || `Me failed (${res.status})`);
  return data; // { admin: true/false }
}
