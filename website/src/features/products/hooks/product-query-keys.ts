import type {
  ProductId,
  ProductListQuery,
} from "@/features/products/types/product.types";
import { DEFAULT_PRODUCT_SORT } from "@/features/products/utils/product.utils";

export const productQueryKeys = {
  all: ["products"] as const,
  list: (query: ProductListQuery) =>
    [
      "products",
      query.page ?? 1,
      {
        categories: [...(query.categories ?? [])].sort(),
        scentFamilies: [...(query.scentFamilies ?? [])].sort(),
        occasions: [...(query.occasions ?? [])].sort(),
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
        pageSize: query.pageSize,
      },
      query.sort ?? DEFAULT_PRODUCT_SORT,
      query.search?.trim() ?? "",
    ] as const,
  detail: (id: ProductId) => ["products", "detail", id] as const,
};
