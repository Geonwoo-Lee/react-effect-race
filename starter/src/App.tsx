import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import { CategoryTabs, ProductList } from "./components";
import { CATEGORY_LABEL } from "./data";
import type { Category, Product } from "./types";
import "./App.css";

export default function App() {
  const [category, setCategory] = useState<Category>("bags");
  const [products, setProducts] = useState<Product[]>([]);

  // ✏️ ─────────── 수정 범위 시작 ───────────
  useEffect(() => {
    console.log(`설정: ${CATEGORY_LABEL[category]}`);
    fetchProducts(category).then((data) => {
      setProducts(data);
    });

    return () => {
      console.log(`정리: ${CATEGORY_LABEL[category]}`);
    };
  }, []);
  // ✏️ ─────────── 수정 범위 끝 ───────────

  return (
    <main className="app">
      <h1>🛍️ 이펙트몰</h1>
      <CategoryTabs selected={category} onSelect={setCategory} />
      <h2>{CATEGORY_LABEL[category]} 카테고리</h2>
      <ProductList products={products} />
    </main>
  );
}
