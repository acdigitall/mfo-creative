import portfoy from "@/data/portfoy.json";

const MOCK_DELAY = 500;
const delay = (ms) => new Promise(r => setTimeout(r, ms));

let mockProducts = portfoy;

/** -------------------- PRODUCTS -------------------- **/

export async function getProducts() {
  await delay(MOCK_DELAY);
  return [...mockProducts];
}

export async function getProductsByTur(tur) {
  await delay(MOCK_DELAY);
  return mockProducts.filter(p => {
    const pTur = p.tur || [];
    if (Array.isArray(pTur)) return pTur.includes(tur);
    if (typeof pTur === "string") return pTur.includes(tur);
    return false;
  });
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
