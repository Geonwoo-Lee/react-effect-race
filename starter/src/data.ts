import type { Category, Product } from "./types";

export const CATEGORIES: Category[] = ["tops", "shoes", "bags"];

export const CATEGORY_LABEL: Record<Category, string> = {
  tops: "상의",
  shoes: "신발",
  bags: "가방",
};

export const PRODUCTS: Product[] = [
  { id: 1, name: "오버핏 반팔 티셔츠", price: 19000, category: "tops", emoji: "👕" },
  { id: 2, name: "스트라이프 셔츠", price: 32000, category: "tops", emoji: "👔" },
  { id: 3, name: "후드 집업", price: 45000, category: "tops", emoji: "🧥" },
  { id: 4, name: "니트 스웨터", price: 39000, category: "tops", emoji: "🧶" },
  { id: 5, name: "러닝화", price: 89000, category: "shoes", emoji: "👟" },
  { id: 6, name: "첼시 부츠", price: 119000, category: "shoes", emoji: "🥾" },
  { id: 7, name: "슬리퍼", price: 15000, category: "shoes", emoji: "🩴" },
  { id: 8, name: "백팩", price: 59000, category: "bags", emoji: "🎒" },
  { id: 9, name: "토트백", price: 72000, category: "bags", emoji: "👜" },
  { id: 10, name: "크로스백", price: 48000, category: "bags", emoji: "👝" },
];
