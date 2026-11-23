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
    let ignore = false; // ⓐ 이 Effect 전용 표시. Effect가 실행될 때마다 새로 만들어져요

    console.log(`설정: ${CATEGORY_LABEL[category]}`);
    fetchProducts(category).then((data) => {
      if (ignore) {
        // ⓒ 이미 정리된 Effect의 응답이면 화면에 반영하지 않아요
        console.log(`무시: ${CATEGORY_LABEL[category]}`);
        return;
      }
      setProducts(data);
    });

    return () => {
      console.log(`정리: ${CATEGORY_LABEL[category]}`);
      ignore = true; // ⓑ 다음 Effect가 실행되기 전에 이 Effect의 응답을 무시하도록 표시해요
    };
  }, [category]); // category에 맞춰 동기화해요
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
