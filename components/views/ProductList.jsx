"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/server";

export default function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getProducts()
      .then((data) => setItems(data)) // ✅ res.json yok
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  
  return (
    <div>
      <h1>Product List</h1>
      {items.map((p) => (
        <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 12 }}>
          <b>{p.title}</b>
          {p.image_path && (
            <div>
              <img
                src={`${(process.env.NEXT_PUBLIC_API_URL || 'https://api.mfocreative.com.tr')}${p.image_path}`}
                alt={p.alt || p.title}
                style={{ width: 240, height: "auto", borderRadius: 8 }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

