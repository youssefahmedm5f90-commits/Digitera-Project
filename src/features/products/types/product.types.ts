export type ProductId = string;

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
  /** Optional per-value price overrides (e.g. for bottle sizes). */
  prices?: Record<string, number>;
};

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  notes: string;
  price: number;
  images: string[];
  category: string;
  scentFamily: string;
  occasion: string;
  /** Top-note ingredients (e.g. "Bergamot, Pink Pepper"). */
  topNotes?: string;
  /** Heart-note ingredients. */
  heartNotes?: string;
  /** Base-note ingredients. */
  baseNotes?: string;
  options: ProductOption[];
};

export type ProductSort =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

export type ProductListQuery = {
  search?: string;
  category?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
};

export type ProductListResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductSearchParams = Record<
  string,
  string | string[] | undefined
>;
