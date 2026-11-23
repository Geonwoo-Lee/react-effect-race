import { CATEGORY_LABEL, PRODUCTS } from "./data";
import type { Category, Product } from "./types";

// 카테고리별 응답 시간(밀리초). 응답 순서 문제를 매번 같은 조작으로 재현하려고 고정해 두었어요.
// 실습 중에는 바꾸지 않아요.
export const DELAY_MS: Record<Category, number> = {
  tops: 2000, // 상의: 상품이 많아 오래 걸려요
  shoes: 300, // 신발: 상품이 적어 금방 끝나요
  bags: 1000, // 가방: 보통이에요
};

// 서버의 GET /api/products?category=… 요청을 흉내 낸 함수예요.
// 실제 서버라면 fetch(`/api/products?category=${category}`).then((res) => res.json())처럼 요청해요.
export function fetchProducts(category: Category): Promise<Product[]> {
  const label = CATEGORY_LABEL[category];
  console.log(`요청: ${label}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`응답: ${label}`);
      resolve(PRODUCTS.filter((product) => product.category === category));
    }, DELAY_MS[category]);
  });
}
