// src/api/index.js (MOCK DATA VERSION)

const MOCK_DELAY = 500;
const delay = (ms) => new Promise(r => setTimeout(r, ms));

let mockProducts = [
  { id: "1", title: "Örnek Web Tasarım", category: "Web", description: "Kurumsal web sitesi tasarımı", tur: ["tasarim", "sosyal"], image_path: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80", client: "Acme Corp", year: 2024 },
  { id: "2", title: "Örnek Logo Tasarımı", category: "Kimlik", description: "Yeni marka kimliği", tur: ["kmlik", "tasarim"], image_path: "https://images.unsplash.com/photo-1626785773985-9a8c0811e5a5?w=500&q=80", client: "XYZ Lojistik", year: 2023 },
  { id: "3", title: "Örnek Katalog", category: "Baskı", description: "2024 Ürün Kataloğu", tur: ["baski"], image_path: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&q=80", client: "ABC Mobilya", year: 2024 }
];

/** -------------------- PRODUCTS -------------------- **/

export async function getProducts() {
  await delay(MOCK_DELAY);
  return [...mockProducts];
}

export async function getProductsByTur(tur) {
  await delay(MOCK_DELAY);
  return mockProducts.filter(p => (p.tur || []).includes(tur));
}

export async function createProduct(form) {
  await delay(MOCK_DELAY);
  const newProduct = {
    id: Math.random().toString(36).substr(2, 9),
    title: form.title,
    category: form.category,
    description: form.description,
    alt: form.alt,
    client: form.client,
    year: form.year,
    tur: form.tur || [],
    tags: form.tags || [],
    image_path: form.imageFile ? URL.createObjectURL(form.imageFile) : null
  };
  mockProducts.unshift(newProduct);
  return newProduct;
}

export async function updateProduct(id, form) {
  await delay(MOCK_DELAY);
  const index = mockProducts.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Product not found");
  
  if (form.title !== undefined && form.title !== null) mockProducts[index].title = form.title;
  if (form.category !== undefined) mockProducts[index].category = form.category;
  if (form.description !== undefined) mockProducts[index].description = form.description;
  if (form.alt !== undefined) mockProducts[index].alt = form.alt;
  if (form.client !== undefined) mockProducts[index].client = form.client;
  if (form.year !== undefined) mockProducts[index].year = form.year;
  if (form.tur !== undefined) mockProducts[index].tur = form.tur;
  if (form.tags !== undefined) mockProducts[index].tags = form.tags;
  
  if (form.imageFile) {
    mockProducts[index].image_path = URL.createObjectURL(form.imageFile);
  }
  
  return { ...mockProducts[index] };
}

export async function deleteProduct(id) {
  await delay(MOCK_DELAY);
  mockProducts = mockProducts.filter(p => p.id !== id);
  return { ok: true };
}

/** -------------------- ADMIN -------------------- **/

export async function adminLogin(username, password) {
  await delay(MOCK_DELAY);
  // Her şifreyle girişe izin ver:
  if (typeof window !== "undefined") {
    localStorage.setItem("mock_admin_auth", "true");
  }
  return { ok: true };
}

export async function adminLogout() {
  await delay(MOCK_DELAY);
  if (typeof window !== "undefined") {
    localStorage.removeItem("mock_admin_auth");
  }
  return { ok: true };
}

export async function adminMe() {
  await delay(MOCK_DELAY);
  let isAuth = false;
  if (typeof window !== "undefined") {
    isAuth = localStorage.getItem("mock_admin_auth") === "true";
  }
  return { admin: isAuth };
}
