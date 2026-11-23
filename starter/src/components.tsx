import { DELAY_MS } from "./api";
import { CATEGORIES, CATEGORY_LABEL } from "./data";
import type { Category, Product } from "./types";

type CategoryTabsProps = {
  selected: Category;
  onSelect: (category: Category) => void;
};

export function CategoryTabs({ selected, onSelect }: CategoryTabsProps) {
  return (
    <nav className="tabs">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={category === selected ? "tab tab--selected" : "tab"}
          onClick={() => onSelect(category)}
        >
          {CATEGORY_LABEL[category]}
          <span className="tab__delay">{DELAY_MS[category] / 1000}초</span>
        </button>
      ))}
    </nav>
  );
}

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  return (
    <ul className="products">
      {products.map((product) => (
        <li key={product.id} className="product">
          <span className="product__emoji">{product.emoji}</span>
          <span className="product__name">{product.name}</span>
          {/* 배지는 받아 온 데이터에서 나와요. 제목과 다르면 선택한 값과 데이터가 어긋난 거예요 */}
          <span className="product__badge">{CATEGORY_LABEL[product.category]}</span>
          <span className="product__price">{product.price.toLocaleString()}원</span>
        </li>
      ))}
    </ul>
  );
}
