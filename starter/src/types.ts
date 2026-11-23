export type Category = "tops" | "shoes" | "bags";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: Category;
  emoji: string;
};
